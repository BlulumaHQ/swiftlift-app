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
    // One-time add-ons, priced to match src/lib/pricing.ts (USD cents)
    const ADDONS: Record<string, { name: string; amount: number }> = {
      performance: { name: "SwiftLift – Add-On – Performance Optimization", amount: 19900 },
      seo: { name: "SwiftLift – Add-On – SEO Optimization", amount: 29900 },
      social: { name: "SwiftLift – Add-On – Social Media Launch Kit", amount: 29900 },
      brand: { name: "SwiftLift – Add-On – Brand Identity Package", amount: 49900 },
    };

    const HOSTING_PRICES: Record<string, string> = {
      monthly: "price_1TEIOoAAeDDkmZmN8nWCNODo", // SwiftLift – Hosting – Managed Monthly $15
      yearly: "price_1TEIPlAAeDDkmZmNf03uuZg2", // SwiftLift – Hosting – Managed Yearly $135
    };

    const origin = req.headers.get("origin") || "https://swiftlift.app";
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
      .filter((id: string) => ADDONS[id])
      .map((id: string) => ({
        price_data: {
          currency: "usd",
          product_data: { name: ADDONS[id].name },
          unit_amount: ADDONS[id].amount,
        },
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
