import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FROM = "SwiftLift <support@swiftlift.app>";
const REPLY_TO = "support@swiftlift.app";
const ADMIN_TO = "support@swiftlift.app";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildInternalNotification(data: {
  client_name: string;
  business_name: string;
  client_email: string;
  phone: string;
  website: string;
  service: string;
  message: string;
  timestamp: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#111111;max-width:600px;margin:0 auto;padding:20px;">
  <h1 style="font-size:28px;font-weight:700;margin:0 0 16px 0;">New Request Received</h1>
  <p style="margin:0 0 16px 0;"><strong>Client Name:</strong> ${escapeHtml(data.client_name)}</p>
  <p style="margin:0 0 16px 0;"><strong>Business Name:</strong> ${escapeHtml(data.business_name)}</p>
  <p style="margin:0 0 16px 0;"><strong>Email:</strong> ${escapeHtml(data.client_email)}</p>
  <p style="margin:0 0 16px 0;"><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
  <p style="margin:0 0 16px 0;"><strong>Website:</strong> ${escapeHtml(data.website)}</p>
  <p style="margin:0 0 16px 0;"><strong>Service Requested:</strong> ${escapeHtml(data.service)}</p>
  <p style="margin:0 0 16px 0;"><strong>Message:</strong> ${escapeHtml(data.message)}</p>
  <p style="margin:0 0 16px 0;"><strong>Submitted Time:</strong> ${escapeHtml(data.timestamp)}</p>
</div>
</body>
</html>`;
}

function buildClientConfirmation(): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#111111;max-width:600px;margin:0 auto;padding:20px;">
  <h1 style="font-size:28px;font-weight:700;margin:0 0 16px 0;">Thanks for your request</h1>
  <p style="margin:0 0 16px 0;">We've received your submission successfully.</p>
  <p style="margin:0 0 16px 0;">Our team is now preparing your website preview.</p>
  <p style="margin:0 0 16px 0;">You will receive your preview within 24–48 hours.</p>
  <p style="margin:0 0 16px 0;">If you have additional details or references, simply reply to this email.</p>
  <br/>
  <p style="margin:0 0 4px 0;">SwiftLift</p>
  <p style="margin:0;">support@swiftlift.app</p>
</div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      client_name = "",
      business_name = "",
      client_email = "",
      phone = "",
      website = "",
      service = "",
      message = "",
      // Legacy field mapping from older callers
      email,
      businessName,
      websiteUrl,
      timeline,
      inspiration,
    } = body;

    // Support both new and legacy field names
    const finalEmail = client_email || email || "";
    const finalName = client_name || businessName || "";
    const finalBusiness = business_name || businessName || "";
    const finalWebsite = website || websiteUrl || "";
    const finalService = service || (timeline ? `Timeline: ${timeline}` : "Preview Request");
    const finalMessage = message || (inspiration ? `Inspiration: ${inspiration}` : "");
    const finalPhone = phone || "";

    if (!finalEmail) throw new Error("Missing email");

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const timestamp = new Date().toISOString();

    // EMAIL 1 — Internal notification to support@swiftlift.app
    const internalHtml = buildInternalNotification({
      client_name: finalName,
      business_name: finalBusiness,
      client_email: finalEmail,
      phone: finalPhone,
      website: finalWebsite,
      service: finalService,
      message: finalMessage,
      timestamp,
    });

    const internalRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        reply_to: REPLY_TO,
        to: [ADMIN_TO],
        subject: `New Preview Request: ${finalName || finalEmail}`,
        html: internalHtml,
      }),
    });

    if (!internalRes.ok) {
      const errText = await internalRes.text();
      console.error("Internal notification email error:", errText);
      throw new Error(`Internal email failed: ${errText}`);
    }

    // EMAIL 2 — Client confirmation
    const clientHtml = buildClientConfirmation();

    const clientRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        reply_to: REPLY_TO,
        to: [finalEmail],
        subject: "We received your request – SwiftLift",
        html: clientHtml,
      }),
    });

    if (!clientRes.ok) {
      const errText = await clientRes.text();
      console.error("Client confirmation email error:", errText);
      throw new Error(`Client email failed: ${errText}`);
    }

    console.log(`[SEND-INTAKE-CONFIRMATION] Both emails sent successfully for: ${finalEmail}`);

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
