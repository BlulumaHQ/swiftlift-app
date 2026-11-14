import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const FROM = "SwiftLift <support@swiftlift.app>";
const REPLY_TO = "support@swiftlift.app";
const ADMIN_TO = "support@swiftlift.app";
const LOGO_URL = "https://swiftlift.app/swiftsite-logo.png";
const N8N_LEAD_WEBHOOK = "https://n8n-production-69d1bdd4.up.railway.app/webhook/lead?brand=SwiftLift";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type FormType = "preview" | "custom_quote" | "revision" | "support" | "designer";

interface EmailContent {
  subject: string;
  internalSubject: string;
  title: string;
  lines: string[];
}

function getEmailContent(formType: FormType, clientName: string, clientEmail: string): EmailContent {
  switch (formType) {
    case "custom_quote":
      return {
        subject: "We received your project request – SwiftLift",
        internalSubject: `New Custom Quote Request: ${clientName || clientEmail}`,
        title: "Thanks for your project request",
        lines: [
          "We've received your submission successfully.",
          "Our team is now reviewing your project details and requested features.",
          "We'll follow up with the next step within 24–48 hours.",
          "If you'd like to send more references or materials, simply reply to this email.",
        ],
      };
    case "revision":
      return {
        subject: "We received your revision request – SwiftLift",
        internalSubject: `New Revision Request: ${clientName || clientEmail}`,
        title: "Revision request received",
        lines: [
          "We've received your revision details successfully.",
          "Our team will review your requested changes and continue with the update process.",
          "If you need to send additional files or notes, simply reply to this email and include your project details.",
        ],
      };
    case "support":
      return {
        subject: "We received your support request – SwiftLift",
        internalSubject: `New Support Request: ${clientName || clientEmail}`,
        title: "Support request received",
        lines: [
          "We've received your message successfully.",
          "Our team will review the issue and get back to you as soon as possible.",
          "If you need to send additional details, simply reply to this email.",
        ],
      };
    case "designer":
      return {
        subject: "We received your inquiry – SwiftLift",
        internalSubject: `New Designer Inquiry: ${clientName || clientEmail}`,
        title: "Thanks for reaching out",
        lines: [
          "We've received your information successfully.",
          "Our team will review your inquiry and reach out if there is a fit.",
          "If you would like to add anything else, simply reply to this email.",
        ],
      };
    case "preview":
    default:
      return {
        subject: "We received your request – SwiftLift",
        internalSubject: `New Preview Request: ${clientName || clientEmail}`,
        title: "Thanks for your request",
        lines: [
          "We've received your submission successfully.",
          "Our team is now preparing your website preview.",
          "You will receive your preview within 24–48 hours.",
          "If you have additional details or references, simply reply to this email.",
        ],
      };
  }
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

function buildClientConfirmation(title: string, lines: string[]): string {
  const bodyLines = lines.map(l => `  <p style="margin:0 0 16px 0;">${escapeHtml(l)}</p>`).join("\n");
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#111111;max-width:600px;margin:0 auto;padding:20px;">
  <div style="text-align:center;margin-bottom:20px;">
    <img src="${LOGO_URL}" alt="SwiftLift" width="140" style="width:140px;height:auto;display:inline-block;" />
  </div>
  <h1 style="font-size:28px;font-weight:700;margin:0 0 16px 0;">${escapeHtml(title)}</h1>
${bodyLines}
  <hr style="border:none;border-top:1px solid #337DAF;margin:24px 0;" />
  <p style="margin:0 0 4px 0;">SwiftLift</p>
  <p style="margin:0;"><a href="mailto:support@swiftlift.app" style="color:#337DAF;text-decoration:none;">support@swiftlift.app</a></p>
</div>
</body>
</html>`;
}

function resolveFormType(formType?: string, service?: string): FormType {
  if (formType && ["preview", "custom_quote", "revision", "support", "designer"].includes(formType)) {
    return formType as FormType;
  }
  // Fallback: infer from service field
  const s = (service || "").toLowerCase();
  if (s.includes("revision")) return "revision";
  if (s.includes("support")) return "support";
  if (s.includes("designer") || s.includes("inquiry")) return "designer";
  if (s.includes("custom quote") || s.includes("custom brief")) return "custom_quote";
  return "preview";
}

const MIN_FILL_MS = 3000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

function looksLikeGibberish(name: unknown): boolean {
  const value = String(name || "").trim();
  if (value.length < 10 || /\s/.test(value)) return false;
  // Only apply Latin-letter heuristics to Latin names.
  if (!/^[a-zA-Z]+$/.test(value)) return false;
  const innerCaps = (value.slice(1).match(/[A-Z]/g) || []).length;
  const vowels = (value.match(/[aeiou]/gi) || []).length;
  return innerCaps >= 2 || vowels / value.length < 0.2;
}

function spamReason(body: Record<string, unknown>, name: unknown): string | null {
  if (String(body.website_hp || "").trim()) return "honeypot";
  if (typeof body._t !== "number" || !Number.isFinite(body._t) || body._t <= 0) return "no_timestamp";
  const elapsed = Date.now() - body._t;
  if (elapsed < MIN_FILL_MS) return "too_fast";
  if (elapsed > MAX_FORM_AGE_MS) return "stale_form";
  if (looksLikeGibberish(name)) return "gibberish_name";
  return null;
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
      form_type,
      // Legacy field mapping
      email,
      businessName,
      websiteUrl,
      timeline,
      inspiration,
    } = body;

    const finalEmail = client_email || email || "";
    const finalName = client_name || businessName || "";
    const finalBusiness = business_name || businessName || "";
    const finalWebsite = website || websiteUrl || "";
    const finalService = service || (timeline ? `Timeline: ${timeline}` : "Preview Request");
    const finalMessage = message || (inspiration ? `Inspiration: ${inspiration}` : "");
    const finalPhone = phone || "";

    if (!finalEmail) throw new Error("Missing email");

    const blocked = spamReason(body, finalName);
    if (blocked) {
      console.log(`[SEND-INTAKE-CONFIRMATION] Blocked spam (${blocked})`);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const RESEND_API_KEY = (Deno.env.get("RESEND_KEY_SWIFTLIFT") ?? Deno.env.get("RESEND_API_KEY"));
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const timestamp = new Date().toISOString();
    const resolvedType = resolveFormType(form_type, finalService);
    const content = getEmailContent(resolvedType, finalName, finalEmail);

    // Log new leads (not revisions/support/designer applications) to the n8n lead sheet.
    // This function keeps sending its own branded emails, so n8n is told to send none.
    if (resolvedType === "preview" || resolvedType === "custom_quote") {
      try {
        const details = [
          finalBusiness && `Business: ${finalBusiness}`,
          finalWebsite && `Website: ${finalWebsite}`,
          finalService && `Service: ${finalService}`,
          finalMessage,
        ].filter(Boolean).join("\n");
        const n8n = await fetch(N8N_LEAD_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: finalName, email: finalEmail, phone: finalPhone, message: details,
            page: `swiftlift.app (${resolvedType})`, emails: false,
          }),
          signal: AbortSignal.timeout(5000),
        });
        if (!n8n.ok) console.error("[SEND-INTAKE-CONFIRMATION] n8n lead log failed:", n8n.status);
      } catch (err) {
        console.error("[SEND-INTAKE-CONFIRMATION] n8n lead log error:", err);
      }
    }

    // EMAIL 1 — Internal notification
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
        subject: content.internalSubject,
        html: internalHtml,
      }),
    });

    if (!internalRes.ok) {
      const errText = await internalRes.text();
      console.error("Internal notification email error:", errText);
      throw new Error(`Internal email failed: ${errText}`);
    }

    // EMAIL 2 — Client confirmation (branded)
    const clientHtml = buildClientConfirmation(content.title, content.lines);

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
        subject: content.subject,
        html: clientHtml,
      }),
    });

    if (!clientRes.ok) {
      const errText = await clientRes.text();
      console.error("Client confirmation email error:", errText);
      throw new Error(`Client email failed: ${errText}`);
    }

    console.log(`[SEND-INTAKE-CONFIRMATION] Both emails sent (type=${resolvedType}) for: ${finalEmail}`);

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
