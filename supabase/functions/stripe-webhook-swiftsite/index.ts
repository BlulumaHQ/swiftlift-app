// Stripe webhook for the SwiftSite Stripe account (swiftsite.ca, CAD).
//  - verifies the signature with STRIPE_WEBHOOK_SECRET_SWIFTSITE
//  - checkout.session.completed with payment_type "ss_launch": records the payment once,
//    marks the project paid (stops preview reminders), emails the client "You're all set" and emails Sony.
// Monthly / yearly renewals are charged by Stripe itself; Stripe emails the receipt.
import Stripe from "https://esm.sh/stripe@13.10.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { ADMIN_TO, adminHtml, render, sendEmail } from "../_shared/emails.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY_SWIFTSITE") || "sk_missing", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function money(cents: number | null | undefined, currency?: string | null) {
  if (cents == null) return "";
  return `$${(cents / 100).toFixed(2)} ${(currency || "cad").toUpperCase()}`;
}

async function handleCheckout(session: Stripe.Checkout.Session) {
  const meta = (session.metadata || {}) as Record<string, string>;
  const email = (meta.client_email || session.customer_details?.email || session.customer_email || "").toLowerCase();

  const { data: existing } = await db.from("payments").select("id").eq("stripe_session_id", session.id).maybeSingle();
  if (existing) return; // Stripe retry — already processed

  let project: Record<string, any> | null = null;
  if (meta.project_id && UUID_RE.test(meta.project_id)) {
    project = (await db.from("projects").select("*").eq("id", meta.project_id).maybeSingle()).data;
  }

  const { error } = await db.from("payments").insert({
    client_id: project?.client_id || "stripe-direct",
    project_id: project?.id ?? null,
    email: email || null,
    amount: session.amount_total != null ? session.amount_total / 100 : null,
    currency: session.currency || "cad",
    status: session.payment_status || "paid",
    stripe_session_id: session.id,
    stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
    stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
    stripe_customer_email: session.customer_details?.email || session.customer_email || null,
    selected_plan: meta.hosting_plan || null,
    source_app: "stripe_webhook_swiftsite",
    payment_type: meta.payment_type || "other",
    paid_at: new Date().toISOString(),
    metadata_json: { ...meta, subscription: typeof session.subscription === "string" ? session.subscription : null },
  });
  if (error) throw new Error(`payments insert: ${error.message}`);

  const amount = money(session.amount_total, session.currency);
  if (meta.payment_type === "ss_launch" && project) {
    await db
      .from("projects")
      .update({ paid_at: new Date().toISOString(), status: "paid", selected_plan: meta.hosting_plan || null, selected_preview: "A", updated_at: new Date().toISOString() })
      .eq("id", project.id);
    if (email) {
      const { subject, html } = render("payment_confirmed", {
        brand: "swiftsite",
        name: project.client_name || meta.client_name,
        business: project.business_name || meta.business_name,
        projectId: project.id,
        amount,
      });
      try {
        const id = await sendEmail(email, subject, html, undefined, "swiftsite");
        await db.from("client_emails").insert({ project_id: project.id, lead_id: project.lead_id ?? null, to_email: email, template: "payment_confirmed", subject, resend_id: id });
      } catch (e) {
        await db.from("client_emails").insert({ project_id: project.id, lead_id: project.lead_id ?? null, to_email: email, template: "payment_confirmed", subject, status: "failed", error: String(e) });
        console.error("[stripe-webhook-swiftsite] payment email failed", e);
      }
    }
  }

  const title = `💰 SwiftSite launched: ${meta.business_name || email} — ${amount} (${meta.hosting_plan || "plan?"})`;
  try {
    await sendEmail(
      ADMIN_TO,
      title,
      adminHtml(title, {
        Client: meta.client_name,
        Business: meta.business_name,
        Email: email,
        Amount: amount,
        "Hosting plan": meta.hosting_plan,
        Preview: meta.preview_link,
        "Matched project": project?.id || "none (check admin page)",
        "Next step": "Wait for their round-1 changes and the go-live form",
        "Stripe session": session.id,
      }),
    );
  } catch (e) {
    console.error("[stripe-webhook-swiftsite] admin email failed", e);
  }
}

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("No signature", { status: 400 });
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, Deno.env.get("STRIPE_WEBHOOK_SECRET_SWIFTSITE")!);
  } catch (err) {
    return new Response(`Webhook Error: ${err instanceof Error ? err.message : err}`, { status: 400 });
  }
  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckout(event.data.object as Stripe.Checkout.Session);
    }
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("[stripe-webhook-swiftsite]", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), { status: 500 });
  }
});
