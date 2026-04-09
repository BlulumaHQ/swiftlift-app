import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CheckoutItem {
  service_key?: string | null;
  name: string;
  stripe_name?: string | null;
  price_usd: number;
  currency?: string;
  billing_type?: string | null;
  service_type?: string | null;
  id?: string | null;
  type?: string | null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Connect to EXTERNAL Supabase only
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: "External database not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const {
      token,
      project_id,
      client_uuid,
      organization_id,
      access_link_id,
      items,
    } = body as {
      token: string;
      project_id: string;
      client_uuid: string;
      organization_id: string;
      access_link_id: string;
      items: CheckoutItem[];
    };

    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "No items selected" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (!token || !project_id || !client_uuid || !organization_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Validate organization exists in external DB
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .select("id")
      .eq("id", organization_id)
      .maybeSingle();

    if (orgError || !org) {
      console.error("[UPGRADE-CHECKOUT] Organization not found:", organization_id, orgError);
      return new Response(
        JSON.stringify({ error: "Organization not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    // Validate project exists in external DB
    const { data: project, error: projError } = await supabase
      .from("projects")
      .select("id")
      .eq("id", project_id)
      .maybeSingle();

    if (projError || !project) {
      console.error("[UPGRADE-CHECKOUT] Project not found:", project_id, projError);
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    // Determine checkout mode
    const hasRecurring = items.some(
      (i) => i.billing_type === "recurring_monthly" || i.billing_type === "recurring_yearly"
    );
    const mode = hasRecurring ? "subscription" : "payment";

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const unitAmount = Math.round((item.price_usd || 0) * 100);
      const displayName = item.stripe_name || item.name;

      if (item.billing_type === "recurring_monthly") {
        return {
          price_data: {
            currency: "usd",
            product_data: { name: displayName },
            recurring: { interval: "month" as const },
            unit_amount: unitAmount,
          },
          quantity: 1,
        };
      }

      if (item.billing_type === "recurring_yearly") {
        return {
          price_data: {
            currency: "usd",
            product_data: { name: displayName },
            recurring: { interval: "year" as const },
            unit_amount: unitAmount,
          },
          quantity: 1,
        };
      }

      return {
        price_data: {
          currency: "usd",
          product_data: { name: displayName },
          unit_amount: unitAmount,
        },
        quantity: 1,
      };
    });

    // Insert pending purchases into EXTERNAL Supabase
    const purchaseRows = items.map((item) => ({
      project_id,
      client_uuid,
      organization_id,
      access_link_id,
      item_category: item.type || item.service_type || "addon",
      selected_price: item.price_usd || 0,
      currency: "USD",
      status: "pending",
      addon_id: item.type === "addon" ? item.id : null,
      bundle_id: item.type === "bundle" ? item.id : null,
      service_item_id: item.type === "service_item" ? item.id : null,
      metadata_json: {
        stripe_name: item.stripe_name || item.name,
        item_name: item.name,
        billing_type: item.billing_type || "one_time",
        token,
        service_key: item.service_key || null,
      },
    }));

    const { error: insertError } = await supabase
      .from("project_purchases")
      .insert(purchaseRows);

    if (insertError) {
      console.error("[UPGRADE-CHECKOUT] Purchase insert error:", insertError);
    }

    // Build success/cancel URLs
    const origin = req.headers.get("origin") || Deno.env.get("PUBLIC_SITE_URL") || "https://swiftlift-conversion-version.lovable.app";
    const successUrl = `${origin}/client-upgrades?token=${encodeURIComponent(token)}&success=true`;
    const cancelUrl = `${origin}/client-upgrades?token=${encodeURIComponent(token)}&canceled=true`;

    const selectedNames = items.map((i) => i.name).join(", ");

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        token,
        project_id,
        client_uuid,
        organization_id,
        selected_names: selectedNames.substring(0, 500),
        source: "client-upgrades",
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-UPGRADE-CHECKOUT] Error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
