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

    const { hostingPlan, selectedAddons, clientName, businessName, clientEmail, projectType, domainName } =
      await req.json();

    // If no hosting plan, treat as one-time payment (e.g. revision add-ons)
    const effectiveHostingPlan = hostingPlan || "free";

    // Price mappings
    const ADDON_PRICES: Record<string, string> = {
      brand: "price_1T4mVXAshElS4tkSnY5dpg7L",
      seo: "price_1T4mVsAshElS4tkS2J8V3KQn",
      performance: "price_1T4mWWAshElS4tkS3pywho2F",
    };

    const HOSTING_PRICES: Record<string, string> = {
      monthly: "price_1T4mUwAshElS4tkSnm6D8ndo",
      yearly: "price_1T4mVDAshElS4tkSNlGoTPei",
    };

    const origin = req.headers.get("origin") || "https://preview--swift-rebuild-master.lovable.app";
    const billingInterval = effectiveHostingPlan === "monthly" ? "monthly" : effectiveHostingPlan === "yearly" ? "yearly" : "none";

    // ✅ Use one dynamic success page
    const SUCCESS_DEPLOYMENT = `${origin}/payment-success?type=deployment&session_id={CHECKOUT_SESSION_ID}`;

    // Base metadata
    const metadata = {
      client_name: clientName || "",
      business_name: businessName || "",
      client_email: clientEmail || "",
      customer_email: clientEmail || "",
      project_type: projectType || "",
      domain_name: domainName || "",
      hosting_plan: effectiveHostingPlan,
      billing_interval: billingInterval,
      selected_addons: (selectedAddons || []).join(","),
      timestamp: new Date().toISOString(),

      // ✅ helpful flags for webhook + success page
      payment_type: "deployment",
    };

    // Build line items for one-time add-ons
    const addonLineItems = (selectedAddons || [])
      .filter((id: string) => ADDON_PRICES[id])
      .map((id: string) => ({
        price: ADDON_PRICES[id],
        quantity: 1,
      }));

    if (effectiveHostingPlan === "free") {
      // One-time payment for add-ons only
      if (addonLineItems.length === 0) {
        // Nothing to charge — just redirect to success
        return new Response(JSON.stringify({ url: `${origin}/payment-success?type=deployment` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      const session = await stripe.checkout.sessions.create({
        line_items: addonLineItems,
        mode: "payment",
        success_url: SUCCESS_DEPLOYMENT,
        cancel_url: `${origin}/deployment`,
        customer_email: clientEmail || undefined,
        metadata,
      });

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Subscription mode (monthly or yearly)
    const subscriptionPrice = HOSTING_PRICES[effectiveHostingPlan];
    if (!subscriptionPrice) {
      throw new Error("Invalid hosting plan");
    }

    const subscriptionLineItems = [{ price: subscriptionPrice, quantity: 1 }];

    const allLineItems = [...subscriptionLineItems, ...addonLineItems];

    const session = await stripe.checkout.sessions.create({
      line_items: allLineItems,
      mode: "subscription",
      success_url: SUCCESS_DEPLOYMENT,
      cancel_url: `${origin}/deployment`,
      customer_email: clientEmail || undefined,
      metadata,
      subscription_data: {
        metadata,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-DEPLOYMENT-CHECKOUT] Error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
