// Stripe webhook (live endpoint we_1TEQiY…):
//  - verifies the signature (required)
//  - records the payment once per checkout session
//  - build payments: marks the project paid (stops preview reminders) and emails the client E1
//  - every payment: emails Sony a summary
import Stripe from "https://esm.sh/stripe@13.10.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { ADMIN_TO, adminHtml, render, sendEmail } from "../_shared/emails.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});

const TIER_LABEL: Record<string, string> = {
  starter: "Version A – Launch Ready",
  growth: "Version B – Sales Focused",
  version_a: "Version A – Launch Ready",
  version_b: "Version B – Sales Focused",
};
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function money(cents: number | null | undefined, currency?: string | null) {
  if (cents == null) return "";
  return `$${(cents / 100).toFixed(2)} ${(currency || "usd").toUpperCase()}`;
}

async function handleCheckout(session: Stripe.Checkout.Session) {
  const meta = (session.metadata || {}) as Record<string, string>;
  const email = (meta.client_email || meta.customer_email || session.customer_details?.email || session.customer_email || "").toLowerCase();
  const paymentType = meta.payment_type || "other";

  // 1) record once
  const { data: existing } = await db.from("payments").select("id").eq("stripe_session_id", session.id).maybeSingle();
  if (existing) return; // Stripe retry — already processed

  // 2) match a project (build payments)
  let project: Record<string, any> | null = null;
  if (meta.project_id && UUID_RE.test(meta.project_id)) {
    project = (await db.from("projects").select("*").eq("id", meta.project_id).maybeSingle()).data;
  }
  if (!project && email) {
    project = (
      await db.from("projects").select("*").ilike("client_email", email).order("created_at", { ascending: false }).limit(1).maybeSingle()
    ).data;
  }

  const { error } = await db.from("payments").insert({
    client_id: project?.client_id || "stripe-direct",
    project_id: project?.id ?? null,
    email: email || null,
    amount: session.amount_total != null ? session.amount_total / 100 : null,
    currency: session.currency || "usd",
    status: session.payment_status || "paid",
    stripe_session_id: session.id,
    stripe_payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
    stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
    stripe_customer_email: session.customer_details?.email || session.customer_email || null,
    selected_plan: meta.tier || meta.hosting_plan || null,
    source_app: "stripe_webhook",
    payment_type: paymentType,
    paid_at: new Date().toISOString(),
    metadata_json: meta,
  });
  if (error) throw new Error(`payments insert: ${error.message}`);

  const amount = money(session.amount_total, session.currency);

  // 3) build payment → mark paid + E1 to the client
  if (paymentType === "build") {
    if (project) {
      await db
        .from("projects")
        .update({
          paid_at: new Date().toISOString(),
          status: "paid",
          selected_plan: meta.tier || null,
          selected_preview: meta.selected_preview || null,
          client_name: project.client_name || meta.client_name || null,
          business_name: project.business_name || meta.business_name || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", project.id);
    } else if (email) {
      project = (
        await db
          .from("projects")
          .insert({
            client_email: email,
            client_name: meta.client_name || null,
            business_name: meta.business_name || null,
            status: "paid",
            paid_at: new Date().toISOString(),
            selected_plan: meta.tier || null,
            selected_preview: meta.selected_preview || null,
            brand: "swiftlift",
            source_app: "stripe_webhook",
            project_type: "redesign",
          })
          .select("*")
          .single()
      ).data;
    }
    if (email) {
      const { subject, html } = render("payment_confirmed", {
        name: meta.client_name || project?.client_name,
        business: meta.business_name || project?.business_name,
        projectId: project?.id,
        amount,
        packageLabel: TIER_LABEL[meta.tier] || undefined,
        selectedPreview: meta.selected_preview,
      });
      try {
        const id = await sendEmail(email, subject, html);
        await db.from("client_emails").insert({ project_id: project?.id ?? null, to_email: email, template: "payment_confirmed", subject, resend_id: id });
      } catch (e) {
        await db.from("client_emails").insert({ project_id: project?.id ?? null, to_email: email, template: "payment_confirmed", subject, status: "failed", error: String(e) });
        console.error("[stripe-webhook] E1 failed", e);
      }
    }
  }

  // 4) Sony gets every payment
  const title =
    paymentType === "build"
      ? `💰 Website paid: ${meta.business_name || email} — ${TIER_LABEL[meta.tier] || ""} ${amount}`
      : paymentType === "deployment"
      ? `🚀 Hosting / deployment paid: ${meta.business_name || email} — ${amount}`
      : `💳 Payment received: ${email} — ${amount}`;
  try {
    await sendEmail(
      ADMIN_TO,
      title,
      adminHtml(title, {
        Type: paymentType,
        Client: meta.client_name,
        Business: meta.business_name,
        Email: email,
        Amount: amount,
        Package: meta.tier,
        "Picked preview": meta.selected_preview,
        "Preview link": meta.preview_link,
        "Hosting plan": meta.hosting_plan,
        "Add-ons": meta.selected_addons,
        Domain: meta.domain_name,
        "Matched project": project?.id || "none (check admin page)",
        "Stripe session": session.id,
      }),
    );
  } catch (e) {
    console.error("[stripe-webhook] admin email failed", e);
  }
}

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("No signature", { status: 400 });
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, Deno.env.get("STRIPE_WEBHOOK_SECRET")!);
  } catch (err) {
    return new Response(`Webhook Error: ${err instanceof Error ? err.message : err}`, { status: 400 });
  }
  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckout(event.data.object as Stripe.Checkout.Session);
    }
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("[stripe-webhook]", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), { status: 500 });
  }
});
