import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEFAULT_ADMIN_EMAIL = "support@swiftlift.app";

function getAdminEmail(): string {
  const envEmail = Deno.env.get("ADMIN_EMAIL");
  if (envEmail && envEmail.includes("@")) {
    return envEmail;
  }
  console.warn(`[STRIPE-WEBHOOK] ADMIN_EMAIL env missing or invalid ("${envEmail}"), using fallback: ${DEFAULT_ADMIN_EMAIL}`);
  return DEFAULT_ADMIN_EMAIL;
}

async function sendAdminEmail(data: Record<string, string>) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const ADMIN_EMAIL = getAdminEmail();

  console.log("[STRIPE-WEBHOOK] Admin notification recipient:", ADMIN_EMAIL);

  if (!RESEND_API_KEY) {
    console.error("[STRIPE-WEBHOOK] Missing RESEND_API_KEY — cannot send admin email");
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #7F37AE; border-bottom: 2px solid #7F37AE; padding-bottom: 10px;">
        🚀 New Deployment Checkout Completed
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        ${Object.entries(data).map(([key, val]) => `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 40%;">${key}</td>
            <td style="padding: 8px 12px; color: #222;">${val || "N/A"}</td>
          </tr>
        `).join("")}
      </table>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        This is an automated notification from SwiftLift Deployment.
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "SwiftLift <support@swiftlift.app>",
      to: [ADMIN_EMAIL],
      subject: `New Deployment: ${data["Client Name"] || "Unknown"} — ${data["Hosting Plan"] || ""}`,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend error:", errText);
  } else {
    console.log("Admin email sent successfully");
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    // If we have a webhook secret, verify signature; otherwise parse raw
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    let event: Stripe.Event;

    if (webhookSecret && sig) {
      event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
    } else {
      // Fallback: parse the body directly (for development/testing)
      event = JSON.parse(body) as Stripe.Event;
    }

    console.log("[STRIPE-WEBHOOK] Event received:", event.type);

    if (event.type === "checkout.session.completed") {
      console.log("[STRIPE-WEBHOOK] Checkout session completed — preparing admin notification");
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata || {};

      // Fallback email: metadata → session.customer_email → customer_details.email
      const customerEmail = meta.client_email || meta.customer_email || session.customer_email || (session as any).customer_details?.email || "";

      // Fallback add-ons: metadata or summarize from line items
      const addonsDisplay = meta.selected_addons || "None";

      await sendAdminEmail({
        "Client Name": meta.client_name || "N/A",
        "Business Name": meta.business_name || "N/A",
        "Client Email": customerEmail || "N/A",
        "Domain Name": meta.domain_name || "Not provided",
        "Hosting Plan": meta.hosting_plan || "N/A",
        "Billing Interval": meta.billing_interval || "N/A",
        "Selected Add-ons": addonsDisplay,
        "Total Amount": session.amount_total
          ? `$${(session.amount_total / 100).toFixed(2)} ${(session.currency || "usd").toUpperCase()}`
          : "N/A",
        "Stripe Payment ID": session.payment_intent as string || session.subscription as string || session.id,
        "Project Source": "SwiftLift Deployment",
        "Timestamp": meta.timestamp || new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[STRIPE-WEBHOOK] Error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
