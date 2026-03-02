import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Revision add-on pricing (cents)
const REVISION_ADDON_PRICES: Record<string, { name: string; amount: number }> = {
  booking: { name: "Booking Integration", amount: 30000 },
  blog: { name: "Blog Setup", amount: 25000 },
  ecommerce: { name: "E-commerce Integration", amount: 50000 },
  idx: { name: "IDX / MLS Integration", amount: 45000 },
  multilingual: { name: "Multilingual Setup", amount: 35000 },
  calculator: { name: "Custom Calculator / Tool", amount: 40000 },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const { selectedAddons, clientName, businessName, clientEmail } = await req.json();

    const addonIds = (selectedAddons || []).filter((id: string) => REVISION_ADDON_PRICES[id]);

    if (addonIds.length === 0) {
      throw new Error("No valid add-ons selected");
    }

    const origin = req.headers.get("origin") || "https://preview--swift-rebuild-master.lovable.app";

    const metadata = {
      payment_type: "revision",
      client_email: clientEmail || "",
      client_name: clientName || "",
      business_name: businessName || "",
      selected_addons: addonIds.join(","),
      timestamp: new Date().toISOString(),
    };

    const lineItems = addonIds.map((id: string) => ({
      price_data: {
        currency: "usd",
        product_data: { name: REVISION_ADDON_PRICES[id].name },
        unit_amount: REVISION_ADDON_PRICES[id].amount,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/payment-success?type=build&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/revision-request?canceled=1`,
      customer_email: clientEmail || undefined,
      metadata,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-REVISION-CHECKOUT] Error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
