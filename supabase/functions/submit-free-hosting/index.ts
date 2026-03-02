import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientName, businessName, clientEmail, selectedAddons } = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");

    if (!RESEND_API_KEY || !ADMIN_EMAIL) {
      throw new Error("Missing email configuration");
    }

    const timestamp = new Date().toISOString();

    const data: Record<string, string> = {
      "Client Name": clientName || "",
      "Business Name": businessName || "",
      "Client Email": clientEmail || "",
      "Hosting Plan": "Free Hosting Selected",
      "Selected Add-ons": selectedAddons?.length ? selectedAddons.join(", ") : "None",
      "Total Amount": "$0.00",
      "Stripe Payment ID": "N/A — Free Hosting",
      "Project Source": "SwiftLift Deployment",
      "Timestamp": timestamp,
    };

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #7F37AE; border-bottom: 2px solid #7F37AE; padding-bottom: 10px;">
          📋 Free Hosting Submission
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
        from: "SwiftLift <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `Free Hosting Submission: ${clientName || "Unknown Client"}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      throw new Error("Failed to send notification email");
    }

    console.log("Free hosting admin email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Free hosting submitted successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[SUBMIT-FREE-HOSTING] Error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
