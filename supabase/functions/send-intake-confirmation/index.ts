import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
    const { email, businessName, websiteUrl, timeline, inspiration } = await req.json();

    if (!email) throw new Error("Missing email");

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");

    // 1) Send confirmation email to the client
    const clientHtml = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1a2332;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 800; color: #1a2332; margin: 0;">Your Previews Are Being Prepared</h1>
        </div>
        <p style="font-size: 15px; line-height: 1.7; color: #4a5568;">
          Hi${businessName ? ` ${businessName}` : ""} team,
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #4a5568;">
          We've received your website details and our team is now preparing <strong>2 preview directions</strong> for your business.
        </p>
        <div style="background: #f7f8fa; border-radius: 12px; padding: 20px 24px; margin: 24px 0;">
          <p style="font-size: 14px; color: #4a5568; margin: 0 0 12px 0;"><strong>What you'll receive:</strong></p>
          <p style="font-size: 14px; color: #4a5568; margin: 0 0 6px 0;">✓ Version A — Clean &amp; Professional</p>
          <p style="font-size: 14px; color: #4a5568; margin: 0 0 6px 0;">✓ Version B — Conversion Focused</p>
          <p style="font-size: 14px; color: #4a5568; margin: 16px 0 0 0;">
            <strong>Estimated delivery:</strong> Within 24–48 hours
          </p>
        </div>
        <p style="font-size: 15px; line-height: 1.7; color: #4a5568;">
          We'll send your previews to <strong>${email}</strong> as soon as they're ready. No payment is required at this stage.
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #4a5568;">
          If you have any questions, reply to this email or contact us at <a href="mailto:support@swiftlift.app" style="color: #7F37AE;">support@swiftlift.app</a>.
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
        <p style="font-size: 12px; color: #a0aec0; text-align: center;">
          SwiftLift — Faster, cleaner website upgrades for small businesses.
        </p>
      </div>
    `;

    const clientRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SwiftLift <support@swiftlift.app>",
        to: [email],
        subject: "Your SwiftLift Previews Are Being Prepared",
        html: clientHtml,
      }),
    });

    if (!clientRes.ok) {
      const errText = await clientRes.text();
      console.error("Resend client email error:", errText);
    }

    // 2) Send admin notification
    if (ADMIN_EMAIL) {
      const adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7F37AE; border-bottom: 2px solid #7F37AE; padding-bottom: 10px;">
            🚀 New Preview Request
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 40%;">Business Name</td>
              <td style="padding: 8px 12px; color: #222;">${businessName || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px 12px; color: #222;">${email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Current Website</td>
              <td style="padding: 8px 12px; color: #222;">${websiteUrl || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Inspiration</td>
              <td style="padding: 8px 12px; color: #222;">${inspiration || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Timeline</td>
              <td style="padding: 8px 12px; color: #222;">${timeline || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Timestamp</td>
              <td style="padding: 8px 12px; color: #222;">${new Date().toISOString()}</td>
            </tr>
          </table>
        </div>
      `;

      const adminRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "SwiftLift <support@swiftlift.app>",
          to: [ADMIN_EMAIL],
          subject: `New Preview Request: ${businessName || email}`,
          html: adminHtml,
        }),
      });

      if (!adminRes.ok) {
        const errText = await adminRes.text();
        console.error("Resend admin email error:", errText);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[SEND-INTAKE-CONFIRMATION] Error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
