import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const { projectCode, planTier } = await req.json();

    if (!projectCode || !projectCode.trim()) {
      throw new Error("Project code is required");
    }

    const origin =
      req.headers.get("origin") || "https://preview--swift-rebuild-master.lovable.app";

    const metadata: Record<string, string> = {
      payment_type: "revision_payment",
      project_code: projectCode,
      plan_tier: planTier || "unknown",
      site_name: "SwiftLift",
      mode: "revision_payment",
      timestamp: new Date().toISOString(),
    };

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Additional Revision Request" },
            unit_amount: 4500,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/revision-payment?paid=true&code=${encodeURIComponent(projectCode)}`,
      cancel_url: `${origin}/revision-payment?cancelled=true&code=${encodeURIComponent(projectCode)}&plan=${planTier || ""}`,
      metadata,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-REVISION-PAYMENT-CHECKOUT] Error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
