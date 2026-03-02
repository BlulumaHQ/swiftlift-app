import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TIER_PRICES: Record<string, string> = {
  starter: "price_1T4mJHAshElS4tkS4wn6RUDG",
  growth: "price_1T56IAAshElS4tkSqFngKtYR",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const { clientEmail, businessName, clientName, tier, selectedPreview, previewLink } = await req.json();

    const resolvedTier = tier === "starter" ? "starter" : "growth";
    const priceId = TIER_PRICES[resolvedTier];

    const origin = req.headers.get("origin") || "https://preview--swift-rebuild-master.lovable.app";

    const metadata: Record<string, string> = {
      payment_type: "build",
      tier: resolvedTier,
      client_email: clientEmail || "",
      business_name: businessName || "",
      client_name: clientName || "",
      timestamp: new Date().toISOString(),
    };

    if (selectedPreview) metadata.selected_preview = selectedPreview;
    if (previewLink) metadata.preview_link = previewLink;

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/payment-success?type=build&tier=${resolvedTier}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pay-build?canceled=1`,
      customer_email: clientEmail || undefined,
      metadata,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-BUILD-CHECKOUT] Error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
