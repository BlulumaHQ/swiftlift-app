// SwiftLift client journey — one function, several actions.
//   list / send / preview   → admin (/admin/send), needs admin_send_key (preview renders without sending)
//   ingest_lead             → n8n (Meta Instant Form), needs ingest_secret
//   reminders               → pg_cron hourly, needs cron_secret
//   golive_get / golive_submit → public /go-live page, keyed by project id
//   review_get / review_upload_url / review_submit / review_approve → public /review page, keyed by project id
//   report_upload_url       → admin, signed upload URL for the preview report PDF
//   send template "checkin" (B4) → admin, previews reopen 7 days for a client who went quiet
//   mark_replied            → admin, client replied but hasn't decided → previews stay open 7 days
//   preview_gate / preview_reopen / preview_message → public /preview page (open → redirect, closed → reopen or message us)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import {
  ADMIN_TO,
  BRANDS,
  PRICE,
  SS_PRICE,
  brandOf,
  brandSite,
  type Brand,
  reviewUrl,
  siteFrom,
  adminHtml,
  type AdminAction,
  previewGateUrl,
  render,
  sendEmail,
  type GoLiveAnswers,
  type TemplateData,
  type TemplateKey,
} from "../_shared/emails.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
const N8N_LEAD_WEBHOOK = "https://n8n-production-69d1bdd4.up.railway.app/webhook/lead?brand=SwiftLift";
const N8N_LEAD_WEBHOOK_SS = "https://n8n-production-69d1bdd4.up.railway.app/webhook/lead?brand=SwiftSite";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

async function config(key: string): Promise<string | null> {
  const { data } = await db.from("app_config").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

async function requireSecret(key: string, given: unknown) {
  const expected = await config(key);
  if (!expected || typeof given !== "string" || given !== expected) throw new HttpError(401, "unauthorized");
}

class HttpError extends Error {
  constructor(public status: number, msg: string) {
    super(msg);
  }
}

async function sendAndLog(
  template: TemplateKey,
  to: string,
  data: TemplateData,
  ids: { projectId?: string | null; leadId?: string | null } = {},
  attachments?: { filename: string; path: string }[],
) {
  const { subject, html } = render(template, data);
  try {
    const resendId = await sendEmail(to, subject, html, attachments, brandOf(data.brand));
    await db.from("client_emails").insert({
      project_id: ids.projectId ?? null,
      lead_id: ids.leadId ?? null,
      to_email: to,
      template,
      subject,
      resend_id: resendId,
    });
    return { subject, resendId };
  } catch (e) {
    await db.from("client_emails").insert({
      project_id: ids.projectId ?? null,
      lead_id: ids.leadId ?? null,
      to_email: to,
      template,
      subject,
      status: "failed",
      error: String(e),
    });
    throw e;
  }
}

// Phone push to Sony via Pushover (app_config: pushover_token, pushover_user).
// Tapping the push opens the client's current website when known, else the admin pipeline.
async function pushAdmin(title: string, rows: Record<string, unknown>): Promise<string> {
  try {
    const [token, user] = await Promise.all([config("pushover_token"), config("pushover_user")]);
    if (!token || !user) return "missing pushover config";
    const lines = Object.entries(rows)
      .filter(([, v]) => v !== null && v !== undefined && v !== "")
      .slice(0, 6)
      .map(([k, v]) => `${k}: ${String(v)}`);
    const site = String(rows.Website || rows["Current site"] || rows.Site || "").trim();
    const url = site ? (site.startsWith("http") ? site : `https://${site}`) : "https://swiftlift.app/admin";
    const form = new URLSearchParams({
      token,
      user,
      title: title.slice(0, 250),
      message: (lines.join("\n") || title).slice(0, 1000),
      url,
      url_title: site ? "Open their website" : "Open SwiftLift admin",
    });
    const r = await fetch("https://api.pushover.net/1/messages.json", { method: "POST", body: form });
    const out = `${r.status} ${await r.text()}`;
    if (!r.ok) console.error("[client-journey] push failed", out);
    return out;
  } catch (e) {
    console.error("[client-journey] push failed", e);
    return `error ${String(e)}`;
  }
}

async function notifyAdmin(title: string, rows: Record<string, unknown>, actions: AdminAction[] = []) {
  await pushAdmin(title, rows);
  try {
    await sendEmail(ADMIN_TO, title, adminHtml(title, rows, actions));
  } catch (e) {
    console.error("[client-journey] admin notify failed", e);
  }
}

function projectData(p: Record<string, any>): TemplateData {
  return {
    name: p.client_name,
    business: p.business_name || p.project_name,
    email: p.client_email,
    website: p.source_url,
    projectId: p.id,
    linkA: p.preview_a_url,
    linkB: p.preview_b_url,
    imgA: p.preview_a_image,
    imgB: p.preview_b_image,
    liveUrl: p.live_url,
    reportUrl: p.report_url,
    oldHost: p.old_host,
    selectedPreview: p.selected_preview,
    brand: brandOf(p.brand),
    site: brandSite(brandOf(p.brand)),
  };
}

async function latestGoLive(projectId: string): Promise<GoLiveAnswers | undefined> {
  const { data } = await db
    .from("golive_responses")
    .select("answers")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.answers as GoLiveAnswers) ?? undefined;
}

// ---------------- actions ----------------
async function actionList() {
  const [leads, projects, emails] = await Promise.all([
    db.from("leads").select("id,name,email,company_name,website_url,status,source_app,created_at").order("created_at", { ascending: false }).limit(40),
    db.from("projects").select("id,brand,lead_id,client_name,client_email,business_name,source_url,status,preview_a_url,preview_b_url,preview_a_image,preview_b_image,previews_sent_at,paid_at,live_url,selected_plan,selected_preview,report_url,review_pages,old_host,revision_rounds_used,preview_expires_at,replied_at,reopened_at,created_at").order("created_at", { ascending: false }).limit(40),
    db.from("client_emails").select("project_id,lead_id,template,to_email,status,created_at").order("created_at", { ascending: false }).limit(100),
  ]);
  return { leads: leads.data ?? [], projects: projects.data ?? [], emails: emails.data ?? [] };
}

// Extra files Sony attaches in /admin/send (SEO proposal etc.). Only files uploaded to our own storage bucket.
const MAX_FILES = 5;
function extraFiles(files: unknown): { filename: string; path: string }[] {
  if (!Array.isArray(files)) return [];
  const base = `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/client-reports/`;
  return files
    .filter((f) => f && typeof f.url === "string" && f.url.startsWith(base))
    .slice(0, MAX_FILES)
    .map((f) => ({ filename: String(f.name || "Attachment").replace(/[\r\n"]+/g, " ").slice(0, 120), path: f.url }));
}

async function actionSend(b: Record<string, any>, dryRun = false) {
  const template = b.template as TemplateKey;
  const allowed: TemplateKey[] = ["previews_ready", "checkin", "revision_done", "site_live", "nudge_24h", "expired_72h", "payment_confirmed", "confirm"];
  if (!allowed.includes(template)) throw new HttpError(400, "unknown template");
  const to = String(b.to || "").trim().toLowerCase();
  if (!to.includes("@")) throw new HttpError(400, "missing client email");

  // Find or create the project for this client.
  let project: Record<string, any> | null = null;
  if (b.projectId && UUID_RE.test(b.projectId)) {
    project = (await db.from("projects").select("*").eq("id", b.projectId).maybeSingle()).data;
  }
  if (!project) {
    project = (await db.from("projects").select("*").ilike("client_email", to).order("created_at", { ascending: false }).limit(1).maybeSingle()).data;
  }
  const brand: Brand = brandOf(b.brand || project?.brand);
  const patch: Record<string, any> = {
    client_email: to,
    client_name: b.name || project?.client_name || null,
    business_name: b.business || project?.business_name || null,
    source_url: b.website || project?.source_url || null,
    brand,
    updated_at: new Date().toISOString(),
  };
  if (b.leadId && UUID_RE.test(b.leadId)) patch.lead_id = b.leadId;
  if (template === "previews_ready") {
    if (!b.linkA || (brand === "swiftlift" && !b.linkB)) throw new HttpError(400, brand === "swiftsite" ? "Preview link is required" : "Preview A and B links are required");
    const pages = String(b.pages || "")
      .split(/[,\n]/)
      .map((x: string) => x.trim())
      .filter(Boolean);
    Object.assign(patch, {
      report_url: b.reportUrl || project?.report_url || null,
      review_pages: pages.length ? pages : project?.review_pages || null,
      old_host: b.oldHost || project?.old_host || (await detectHost(patch.source_url)) || null,
      selected_preview: null,
      revision_rounds_used: project?.paid_at ? project.revision_rounds_used || 0 : 0,
      approved_at: null,
      preview_a_url: b.linkA,
      preview_b_url: brand === "swiftsite" ? null : b.linkB,
      preview_a_image: b.imgA || null,
      preview_b_image: b.imgB || null,
      status: project?.paid_at ? project.status : "previews_sent",
      previews_sent_at: new Date().toISOString(),
      preview_expires_at: inHours(NO_REPLY_HOURS),
      replied_at: null,
      reopened_at: null,
      final_sent_at: null,
      nudge_sent_at: null,
      expired_sent_at: null,
    });
  }
  if (template === "checkin") {
    // B4 · Check-in: client went quiet. Reopen the previews 7 days, no automatic client reminders; Sony gets a heads-up 24h before they close.
    if (!project?.preview_a_url) throw new HttpError(400, "This client has no previews yet — send B1 first.");
    if (project.paid_at || !PREVIEW_STATES.includes(project.status)) throw new HttpError(400, "This client is past the preview stage — no check-in needed.");
    Object.assign(patch, { status: "previews_checkin", preview_expires_at: inHours(CHECKIN_HOURS), final_sent_at: null });
  }
  if (template === "site_live") {
    if (!b.liveUrl) throw new HttpError(400, "Live URL is required");
    Object.assign(patch, { live_url: b.liveUrl, live_at: new Date().toISOString(), status: "live" });
  }
  if (template === "revision_done") {
    patch.status = "revision_review";
    if (b.previewUrl) {
      // keep the updated link on the picked version so the review page shows it
      const pick = project?.selected_preview === "B" ? "preview_b_url" : "preview_a_url";
      patch[pick] = b.previewUrl;
    }
  }

  if (dryRun) {
    // Preview only: show the email exactly as it would go out, without saving or sending anything.
    project = { ...(project || {}), ...patch };
  } else if (project) {
    project = (await db.from("projects").update(patch).eq("id", project.id).select("*").single()).data;
  } else {
    project = (await db.from("projects").insert({ ...patch, source_app: `${brand}_admin`, project_type: "redesign" }).select("*").single()).data;
  }
  if (!project) throw new Error("could not save project");
  if (patch.lead_id && !dryRun) await db.from("leads").update({ status: patch.status || "in_progress" }).eq("id", patch.lead_id);

  const used = Number(project.revision_rounds_used || 0);
  const data: TemplateData = {
    ...projectData(project),
    brand,
    previewUrl: b.previewUrl,
    site: brandSite(brand, b._origin),
    roundsLeft: Math.max(0, (brand === "swiftsite" ? SS_PRICE.includedRounds : PRICE.includedRounds) - used),
    note: b.note,
  };
  if (template === "site_live" && project.id) data.golive = await latestGoLive(project.id);
  if (template === "revision_done" && !dryRun) {
    await db.from("revision_requests").update({ status: "done", completed_at: new Date().toISOString() }).eq("project_id", project.id).neq("status", "done");
  }
  const reportFile =
    (template === "previews_ready" || (template === "checkin" && b.attachReport)) && project.report_url
      ? [{ filename: `${(project.business_name || "Website").replace(/[^\w\- ]+/g, "")} - Website Preview Report.pdf`, path: project.report_url }]
      : [];
  const attachments = [...reportFile, ...extraFiles(b.files)];
  if (dryRun) {
    const { subject, html } = render(template, data);
    return { ok: true, subject, html, to, attachments: attachments.map((a) => a.filename) };
  }
  const sent = await sendAndLog(template, to, data, { projectId: project.id, leadId: project.lead_id }, attachments.length ? attachments : undefined);
  return { ok: true, projectId: project.id, ...sent };
}

async function actionIngestLead(b: Record<string, any>) {
  const email = String(b.email || "").trim().toLowerCase();
  if (!email.includes("@")) throw new HttpError(400, "missing email");
  const source = String(b.source || "meta_lead_ads");
  const externalId = b.externalId ? String(b.externalId) : null;

  if (externalId) {
    const { data: dup } = await db.from("leads").select("id").eq("referral_code", externalId).maybeSingle();
    if (dup) return { ok: true, duplicate: true, leadId: dup.id };
  }
  const { data: lead, error } = await db
    .from("leads")
    .insert({
      client_id: `meta-${externalId ?? crypto.randomUUID()}`,
      name: b.name || null,
      email,
      company_name: b.business || null,
      website_url: b.website || null,
      notes: b.phone ? `Phone: ${b.phone}` : null,
      status: "new",
      source_app: source,
      referral_code: externalId, // Meta leadgen id, used for de-duplication
    })
    .select("id")
    .single();
  if (error) throw error;

  await sendAndLog("confirm", email, { name: b.name, business: b.business, website: b.website }, { leadId: lead.id });
  await notifyAdmin(`New SwiftLift lead (${source === "meta_lead_ads" ? "Meta ad" : source}): ${b.business || b.name || email}`, {
    Name: b.name,
    Business: b.business,
    Email: email,
    Website: b.website,
    Phone: b.phone,
    Source: source,
    "Next step": "Build 2 previews, then send them from swiftlift.app/admin/send",
  });
  try {
    await fetch(N8N_LEAD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: b.name || "",
        email,
        phone: b.phone || "",
        message: [b.business && `Business: ${b.business}`, b.website && `Website: ${b.website}`].filter(Boolean).join("\n"),
        page: `swiftlift (${source})`,
        emails: false,
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (e) {
    console.error("[client-journey] n8n sheet log failed", e);
  }
  return { ok: true, leadId: lead.id };
}

// ---------------- preview access rules ----------------
// No reply: open 72h (reminder at 24h, final reminder 6h before closing, closed email at 72h).
// Client replied but hasn't decided: open 7 days from the reply, no automatic client emails; Sony gets a heads-up 24h before.
// Client reopened a closed preview: open 48h, Sony is told right away. Paid / in revisions: always open.
// Sony sent a B4 check-in: open 7 days, no automatic client emails; Sony gets a heads-up 24h before.
const NO_REPLY_HOURS = 72;
const REPLIED_HOURS = 7 * 24;
const REOPEN_HOURS = 48;
const CHECKIN_HOURS = 7 * 24;
const FINAL_BEFORE_HOURS = 6;
const PREVIEW_STATES = ["previews_sent", "previews_replied", "previews_reopened", "previews_checkin", "previews_expired"];
const inHours = (h: number) => new Date(Date.now() + h * 3600e3).toISOString();

function previewOpen(p: Record<string, any>): boolean {
  if (p.paid_at || !PREVIEW_STATES.includes(p.status)) return true; // paid, in revisions, approved, live…
  if (p.status === "previews_expired") return false;
  const exp = p.preview_expires_at ? new Date(p.preview_expires_at).getTime() : new Date(p.previews_sent_at || 0).getTime() + NO_REPLY_HOURS * 3600e3;
  return exp > Date.now();
}

// Gmail compose window (sony@bluluma.com) prefilled with a short follow-up, so Sony only edits and sends.
function followUpLink(p: Record<string, any>, subject: string, body: string): string {
  const u = new URL("https://mail.google.com/mail/");
  u.searchParams.set("authuser", "sony@bluluma.com");
  u.searchParams.set("view", "cm");
  u.searchParams.set("fs", "1");
  u.searchParams.set("to", p.client_email || "");
  u.searchParams.set("su", subject);
  u.searchParams.set("body", body);
  return u.toString();
}
function linksText(p: Record<string, any>): string {
  const S = brandSite(brandOf(p.brand));
  return brandOf(p.brand) === "swiftsite" || !p.preview_b_url
    ? `Your website: ${previewGateUrl(p.id, "A", "", S)}`
    : `Version A: ${previewGateUrl(p.id, "A", "", S)}\nVersion B: ${previewGateUrl(p.id, "B", "", S)}`;
}
const hiName = (p: Record<string, any>) => String(p.client_name || "").split(/\s+/)[0] || "there";

async function markReplied(p: Record<string, any>, how: string) {
  if (p.paid_at || !PREVIEW_STATES.includes(p.status)) return p; // already past the preview stage
  const { data } = await db
    .from("projects")
    .update({ status: "previews_replied", replied_at: new Date().toISOString(), preview_expires_at: inHours(REPLIED_HOURS), final_sent_at: null, updated_at: new Date().toISOString() })
    .eq("id", p.id)
    .select("*")
    .single();
  console.log(`[client-journey] replied (${how})`, p.id);
  return data ?? p;
}

async function actionMarkReplied(b: Record<string, any>) {
  if (!UUID_RE.test(String(b.projectId || ""))) throw new HttpError(400, "pick a client first");
  const { data: p } = await db.from("projects").select("*").eq("id", b.projectId).maybeSingle();
  if (!p) throw new HttpError(404, "project not found");
  if (p.paid_at || !PREVIEW_STATES.includes(p.status)) throw new HttpError(400, "This client is past the preview stage — previews already stay open.");
  const next = await markReplied(p, "admin");
  return { ok: true, expiresAt: next.preview_expires_at };
}

async function actionReminders() {
  const now = Date.now();
  const iso = (ms: number) => new Date(ms).toISOString();
  const h24 = iso(now - 24 * 3600e3);
  const done: string[] = [];

  // ---- no reply yet (SwiftLift + SwiftSite) ----
  const finalAt = iso(now + FINAL_BEFORE_HOURS * 3600e3);
  const { data: nudge } = await db.from("projects").select("*").eq("status", "previews_sent").is("paid_at", null).is("nudge_sent_at", null).lt("previews_sent_at", h24).gt("preview_expires_at", finalAt);
  for (const p of nudge ?? []) {
    try {
      await sendAndLog("nudge_24h", p.client_email, projectData(p), { projectId: p.id, leadId: p.lead_id });
      await db.from("projects").update({ nudge_sent_at: iso(Date.now()) }).eq("id", p.id);
      done.push(`nudge:${p.id}`);
    } catch (e) {
      console.error("nudge failed", p.id, e);
    }
  }
  const { data: finals } = await db.from("projects").select("*").eq("status", "previews_sent").is("paid_at", null).is("final_sent_at", null).lte("preview_expires_at", finalAt).gt("preview_expires_at", iso(now));
  for (const p of finals ?? []) {
    try {
      await sendAndLog("final_6h", p.client_email, projectData(p), { projectId: p.id, leadId: p.lead_id });
      await db.from("projects").update({ final_sent_at: iso(Date.now()) }).eq("id", p.id);
      done.push(`final:${p.id}`);
    } catch (e) {
      console.error("final failed", p.id, e);
    }
  }
  const { data: expire } = await db.from("projects").select("*").eq("status", "previews_sent").is("paid_at", null).lte("preview_expires_at", iso(now));
  for (const p of expire ?? []) {
    try {
      await db.from("projects").update({ expired_sent_at: iso(Date.now()), status: "previews_expired" }).eq("id", p.id);
      await sendAndLog("expired_72h", p.client_email, projectData(p), { projectId: p.id, leadId: p.lead_id });
      done.push(`expired:${p.id}`);
      await notifyAdmin(`Previews closed (no reply): ${p.business_name || p.client_email}`, {
        Client: p.client_name,
        Email: p.client_email,
        "What the client sees now": "The preview links show a 'preview closed' page with a Reopen button and a message box. You'll be emailed if they use either.",
        "Preview A": p.preview_a_url,
        "Preview B": p.preview_b_url,
      });
    } catch (e) {
      console.error("expire failed", p.id, e);
    }
  }

  // ---- replied or reopened: no automatic client emails, Sony gets the heads-up ----
  const { data: warn } = await db.from("projects").select("*").in("status", ["previews_replied", "previews_checkin"]).is("paid_at", null).is("final_sent_at", null).lte("preview_expires_at", iso(now + 24 * 3600e3)).gt("preview_expires_at", iso(now));
  for (const p of warn ?? []) {
    await db.from("projects").update({ final_sent_at: iso(Date.now()) }).eq("id", p.id);
    const biz = p.business_name || "your business";
    await notifyAdmin(
      `⏰ ${p.business_name || p.client_email}: previews close in 24h`,
      { Client: p.client_name, Email: p.client_email, ...(p.status === "previews_checkin" ? { "Check-in sent": p.updated_at } : { Replied: p.replied_at }), "Closes at": p.preview_expires_at, "To do": "Send them a short last-call email (button below opens it in Gmail, ready to edit)." },
      [{ label: "Write the last-call email in Gmail", href: followUpLink(p, `Your website previews for ${biz} close tomorrow`, `Hi ${hiName(p)},\n\nJust a quick heads-up: your website preview${p.preview_b_url ? "s" : ""} for ${biz} close${p.preview_b_url ? "" : "s"} tomorrow. If you'd like more time, simply reply and I'll keep them up for you.\n\n${linksText(p)}\n\nSony`) }],
    );
    done.push(`warn:${p.id}`);
  }
  const { data: close } = await db.from("projects").select("*").in("status", ["previews_replied", "previews_reopened", "previews_checkin"]).is("paid_at", null).lte("preview_expires_at", iso(now));
  for (const p of close ?? []) {
    await db.from("projects").update({ status: "previews_expired", expired_sent_at: iso(Date.now()) }).eq("id", p.id);
    await notifyAdmin(`Previews closed: ${p.business_name || p.client_email}`, {
      Client: p.client_name,
      Email: p.client_email,
      Was: p.status === "previews_reopened" ? "Reopened by the client (48h)" : p.status === "previews_checkin" ? "B4 check-in sent (7 days)" : "Client replied (7 days)",
      Note: "No email went to the client. Their links now show the 'preview closed' page with Reopen + message.",
    });
    done.push(`closed:${p.id}`);
  }
  return { ok: true, done };
}

// ---------------- public /preview page ----------------
async function gateProject(b: Record<string, any>) {
  if (!UUID_RE.test(String(b.projectId || ""))) throw new HttpError(404, "This link isn't valid. Please reply to our email and we'll send a new one.");
  const { data: p } = await db.from("projects").select("*").eq("id", b.projectId).maybeSingle();
  if (!p || !p.preview_a_url) throw new HttpError(404, "This link isn't valid. Please reply to our email and we'll send a new one.");
  return p as Record<string, any>;
}
const pickUrl = (p: Record<string, any>, v: unknown) => (v === "B" && p.preview_b_url ? p.preview_b_url : p.preview_a_url);
const gateInfo = (p: Record<string, any>, b: Record<string, any>) => ({
  open: previewOpen(p),
  business: p.business_name || "",
  firstName: hiName(p) === "there" ? "" : hiName(p),
  brand: brandOf(p.brand),
  hasB: !!p.preview_b_url,
  imgA: p.preview_a_image,
  imgB: p.preview_b_image,
  expiresAt: p.preview_expires_at,
  url: previewOpen(p) ? pickUrl(p, b.v) : undefined,
  urlA: previewOpen(p) ? p.preview_a_url : undefined,
  urlB: previewOpen(p) ? p.preview_b_url : undefined,
});

async function actionPreviewGate(b: Record<string, any>) {
  return gateInfo(await gateProject(b), b);
}

async function actionPreviewReopen(b: Record<string, any>) {
  let p = await gateProject(b);
  if (previewOpen(p)) return gateInfo(p, b);
  const recent = p.reopened_at && Date.now() - new Date(p.reopened_at).getTime() < 5 * 60e3;
  p = (await db
    .from("projects")
    .update({ status: "previews_reopened", reopened_at: new Date().toISOString(), preview_expires_at: inHours(REOPEN_HOURS), final_sent_at: null, updated_at: new Date().toISOString() })
    .eq("id", p.id)
    .select("*")
    .single()).data ?? p;
  if (!recent) {
    const biz = p.business_name || "your business";
    await notifyAdmin(
      `🔁 ${p.business_name || p.client_email} reopened their previews`,
      { Client: p.client_name, Email: p.client_email, Opened: `Version ${b.v === "B" ? "B" : "A"}`, "Open until": p.preview_expires_at, "Why this matters": "They came back on their own — a personal email now works best." },
      [{ label: "Write a follow-up in Gmail", href: followUpLink(p, `Your website previews for ${biz}`, `Hi ${hiName(p)},\n\nI saw you took another look at your new website designs for ${biz} — great to have you back! They're open for the next 2 days.\n\n${linksText(p)}\n\nAny questions, or anything you'd like changed? Just reply and I'll take care of it.\n\nSony`) }],
    );
  }
  return gateInfo(p, b);
}

const REASONS: Record<string, string> = {
  time: "Need more time to decide",
  price: "Price question",
  changes: "Want some changes",
  not_now: "Not interested right now",
};

async function actionPreviewMessage(b: Record<string, any>) {
  if (b.website_hp) return { ok: true };
  let p = await gateProject(b);
  const reasons = (Array.isArray(b.reasons) ? b.reasons : []).filter((r: string) => r in REASONS).slice(0, 4);
  const message = String(b.message || "").trim().slice(0, 4000);
  if (!reasons.length && !message) throw new HttpError(400, "Please pick an option or write us a message");
  const { data: recent } = await db.from("preview_messages").select("id").eq("project_id", p.id).gt("created_at", new Date(Date.now() - 60e3).toISOString()).limit(1).maybeSingle();
  if (recent) throw new HttpError(429, "We already got your message — thank you!");
  await db.from("preview_messages").insert({ project_id: p.id, reasons, message: message || null });
  const notInterested = reasons.length === 1 && reasons[0] === "not_now";
  if (!notInterested) p = await markReplied(p, "message");
  const biz = p.business_name || "your business";
  await notifyAdmin(
    `💬 ${p.business_name || p.client_email} sent a message from the preview page`,
    {
      Client: p.client_name,
      Email: p.client_email,
      Picked: reasons.map((r: string) => REASONS[r]).join(", ") || "—",
      Message: message || "—",
      Previews: notInterested ? "Left closed (not interested right now)" : `Open again until ${p.preview_expires_at} (7 days)`,
    },
    [{ label: "Reply in Gmail", href: followUpLink(p, `Re: your website previews for ${biz}`, `Hi ${hiName(p)},\n\nThanks for getting back to me!\n\n\n\nSony`) }],
  );
  return { ok: true, ...gateInfo(p, b) };
}

async function actionGoLiveGet(b: Record<string, any>) {
  if (!UUID_RE.test(String(b.projectId || ""))) throw new HttpError(404, "not found");
  const { data: p } = await db
    .from("projects")
    .select("id,client_name,business_name,source_url,domain,selected_plan")
    .eq("id", b.projectId)
    .maybeSingle();
  if (!p) throw new HttpError(404, "not found");
  const submitted = !!(await db.from("golive_responses").select("id").eq("project_id", p.id).limit(1).maybeSingle()).data;
  return {
    firstName: String(p.client_name || "").split(/\s+/)[0] || "",
    business: p.business_name || "",
    website: p.domain || p.source_url || "",
    submitted,
  };
}

async function actionGoLiveSubmit(b: Record<string, any>) {
  const a = (b.answers || {}) as GoLiveAnswers & { contactEmail?: string; contactName?: string };
  const domain = String(a.domain || "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");
  if (!domain || !domain.includes(".")) throw new HttpError(400, "Please enter your domain name");
  a.domain = domain;

  let project: Record<string, any> | null = null;
  if (UUID_RE.test(String(b.projectId || ""))) {
    project = (await db.from("projects").select("*").eq("id", b.projectId).maybeSingle()).data;
  }
  // Only known projects can submit, so this public form can't be used to email strangers.
  if (!project) throw new HttpError(404, "This link has expired. Please reply to our email and we'll send a new one.");
  if (project.status === "golive_received" && (await db.from("golive_responses").select("id").eq("project_id", project.id).gt("created_at", new Date(Date.now() - 60e3).toISOString()).limit(1).maybeSingle()).data) {
    throw new HttpError(429, "Already received — thank you!");
  }
  const email = String(project.client_email || "").trim().toLowerCase();
  if (!email.includes("@")) throw new HttpError(400, "Missing client email on this project");

  await db.from("golive_responses").insert({
    project_id: project?.id ?? null,
    client_email: email,
    domain,
    answers: a,
    mx_records: b.mx ?? null,
  });
  if (project) await db.from("projects").update({ domain, status: "golive_received", updated_at: new Date().toISOString() }).eq("id", project.id);

  const data: TemplateData = { ...(project ? projectData(project) : { name: a.contactName }), golive: a, site: brandSite(brandOf(project?.brand), b._origin) };
  await sendAndLog("golive_received", email, data, { projectId: project?.id, leadId: project?.lead_id });
  await notifyAdmin(`Go-live form: ${domain}`, {
    Client: project?.client_name || a.contactName,
    Email: email,
    Domain: domain,
    Registrar: a.registrar,
    "Has registrar login": a.registrarLogin,
    "Connect method": a.connectMethod,
    "Email provider (client)": a.emailProvider,
    "Email provider (detected)": a.emailProviderDetected,
    "MX records": Array.isArray(b.mx) ? b.mx.join(", ") : "—",
    "Current host": a.currentHost,
    "Hosting plan": a.hostingPlan,
    Notes: a.notes,
  });
  return { ok: true };
}

// ---------------- review flow (client picks A/B, sends changes, approves → pays) ----------------
const STRIPE_PRICE = {
  A: "price_1TDtS2AAeDDkmZmNXkqRAqOA", // SwiftLift – Version A Launch Ready Website $299
  B: "price_1TDtS1AAeDDkmZmNFtiteVM4", // SwiftLift – Version B Sales Focused Website $499
  extraRound: "price_1TEIQQAAeDDkmZmNLBR0gmtZ", // SwiftLift – Fee – Additional Revision $45
};
const DEFAULT_PAGES = ["Home", "Other pages"];

// Best-effort: which website builder/host the client's current site runs on.
async function detectHost(url?: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url.startsWith("http") ? url : `https://${url}`, {
      redirect: "follow",
      signal: AbortSignal.timeout(6000),
      headers: { "user-agent": "Mozilla/5.0 SwiftLift preview bot" },
    });
    const html = (await res.text()).slice(0, 300_000).toLowerCase();
    const h = [...res.headers.entries()].map(([k, v]) => `${k}:${v}`).join(" ").toLowerCase();
    if (h.includes("x-wix") || html.includes("static.wixstatic.com") || html.includes("wix.com website builder")) return "Wix";
    if (html.includes("squarespace.com") || html.includes("static1.squarespace")) return "Squarespace";
    if (html.includes("img1.wsimg.com") || html.includes("godaddy")) return "GoDaddy";
    if (html.includes("cdn.shopify.com")) return "Shopify";
    if (html.includes("weebly") || html.includes("editmysite.com")) return "Weebly / Square Online";
    if (html.includes("wp-content") || html.includes("wordpress")) return "WordPress hosting";
    return null;
  } catch {
    return null;
  }
}

async function reviewProject(projectId: unknown) {
  if (!UUID_RE.test(String(projectId || ""))) throw new HttpError(404, "This link isn't valid. Please reply to our email and we'll send a new one.");
  const { data: p } = await db.from("projects").select("*").eq("id", projectId).maybeSingle();
  if (!p || !p.preview_a_url || (brandOf(p.brand) === "swiftlift" && !p.preview_b_url)) throw new HttpError(404, "This link isn't valid. Please reply to our email and we'll send a new one.");
  return p as Record<string, any>;
}

async function actionReviewGet(b: Record<string, any>) {
  const p = await reviewProject(b.projectId);
  const { data: last } = await db
    .from("revision_requests")
    .select("round,status,selected_preview,created_at")
    .eq("project_id", p.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const brand = brandOf(p.brand);
  return {
    brand,
    ssPrice: brand === "swiftsite" ? SS_PRICE : undefined,
    approved: !!p.approved_at,
    firstName: String(p.client_name || "").split(/\s+/)[0] || "",
    business: p.business_name || "",
    linkA: p.preview_a_url,
    linkB: p.preview_b_url,
    imgA: p.preview_a_image,
    imgB: p.preview_b_image,
    reportUrl: p.report_url,
    pages: Array.isArray(p.review_pages) && p.review_pages.length ? p.review_pages : DEFAULT_PAGES,
    selectedPreview: p.selected_preview,
    roundsUsed: Number(p.revision_rounds_used || 0),
    includedRounds: brand === "swiftsite" ? SS_PRICE.includedRounds : PRICE.includedRounds,
    price: { A: PRICE.A, B: PRICE.B, extraRound: PRICE.extraRound },
    status: p.status,
    paid: !!p.paid_at,
    pending: last && last.status !== "done" ? last : null,
  };
}

async function actionReviewUploadUrl(b: Record<string, any>) {
  const p = await reviewProject(b.projectId);
  const name = String(b.name || "file").replace(/[^\w.\-]+/g, "_").slice(-80);
  const path = `${p.id}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${name}`;
  const { data, error } = await db.storage.from("revision-uploads").createSignedUploadUrl(path);
  if (error || !data) throw new Error(`upload url: ${error?.message}`);
  return { path, token: data.token, signedUrl: data.signedUrl };
}

async function actionReportUploadUrl(b: Record<string, any>) {
  const slug = String(b.name || "report").replace(/[^\w.\-]+/g, "_").slice(-80);
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID().slice(0, 8)}-${slug}`;
  const { data, error } = await db.storage.from("client-reports").createSignedUploadUrl(path);
  if (error || !data) throw new Error(`upload url: ${error?.message}`);
  const publicUrl = db.storage.from("client-reports").getPublicUrl(path).data.publicUrl;
  return { path, token: data.token, signedUrl: data.signedUrl, publicUrl };
}

type PageNote = { page: string; note?: string; useOther?: boolean };

async function actionReviewSubmit(b: Record<string, any>) {
  const p = await reviewProject(b.projectId);
  const ss = brandOf(p.brand) === "swiftsite";
  // SwiftLift: changes before paying. SwiftSite: launch (pay) first, then 2 rounds of changes.
  if (ss && !p.paid_at) throw new HttpError(400, "Please launch your website first. Your 2 rounds of changes start right after.");
  if (ss && p.approved_at) throw new HttpError(400, "You've approved your website and we're taking it live. For further edits, just email info@swiftsite.ca.");
  if (!ss && p.paid_at) throw new HttpError(400, "Your site is already approved and paid. Please reply to our email for any further changes.");
  const pick = ss ? "A" : b.preview === "B" ? "B" : b.preview === "A" ? "A" : null;
  if (!pick) throw new HttpError(400, "Please choose Version A or Version B");

  const pages: PageNote[] = (Array.isArray(b.pages) ? b.pages : [])
    .map((x: PageNote) => ({ page: String(x.page || "").slice(0, 80), note: String(x.note || "").slice(0, 4000), useOther: !!x.useOther }))
    .filter((x: PageNote) => x.note || x.useOther);
  const o = (b.overall || {}) as Record<string, string>;
  const overall: Record<string, string> = {};
  for (const k of ["colors", "fonts", "photos", "logo", "other"]) if (o[k]) overall[k] = String(o[k]).slice(0, 4000);
  const files = (Array.isArray(b.files) ? b.files : [])
    .filter((f: { path?: string }) => typeof f?.path === "string" && f.path.startsWith(`${p.id}/`))
    .slice(0, 10)
    .map((f: { path: string; name?: string }) => ({ path: f.path, name: String(f.name || "").slice(0, 120) }));
  if (!pages.length && !Object.keys(overall).length && !files.length) throw new HttpError(400, "Please tell us at least one thing you'd like changed");

  // one submission per minute (double-clicks / bots)
  const { data: recent } = await db.from("revision_requests").select("id").eq("project_id", p.id).gt("created_at", new Date(Date.now() - 60e3).toISOString()).limit(1).maybeSingle();
  if (recent) throw new HttpError(429, "We already received your changes — thank you!");

  const round = Number(p.revision_rounds_used || 0) + 1;
  const isPaid = round > (ss ? SS_PRICE.includedRounds : PRICE.includedRounds);
  const { data: rr, error } = await db
    .from("revision_requests")
    .insert({ project_id: p.id, round, selected_preview: pick, pages, overall, files, is_paid_round: isPaid })
    .select("id")
    .single();
  if (error) throw error;
  await db
    .from("projects")
    .update({ selected_preview: pick, revision_rounds_used: round, status: "revision_requested", updated_at: new Date().toISOString() })
    .eq("id", p.id);

  await sendAndLog("revision_received", p.client_email, { ...projectData({ ...p, selected_preview: pick }), round, paidRound: isPaid, site: brandSite(brandOf(p.brand), b._origin) }, { projectId: p.id, leadId: p.lead_id });

  const signed = await Promise.all(
    files.map(async (f: { path: string; name: string }) => {
      const { data } = await db.storage.from("revision-uploads").createSignedUrl(f.path, 60 * 60 * 24 * 7);
      return `${f.name || f.path}: ${data?.signedUrl || f.path}`;
    }),
  );
  const rows: Record<string, unknown> = {
    Client: p.client_name,
    Email: p.client_email,
    Business: p.business_name,
    Brand: ss ? "SwiftSite" : "SwiftLift",
    "Picked version": ss ? "SwiftSite (1 preview)" : `Version ${pick} ($${pick === "A" ? PRICE.A : PRICE.B})`,
    Round: ss
      ? `${round} of ${SS_PRICE.includedRounds} included${isPaid ? " — EXTRA round, confirm cost with client" : ""}`
      : `${round} of ${PRICE.includedRounds} included${isPaid ? ` — PAID round (+$${PRICE.extraRound} at checkout)` : ""}`,
    "Preview link": pick === "A" ? p.preview_a_url : p.preview_b_url,
  };
  for (const x of pages) rows[`Page · ${x.page}`] = `${x.useOther ? `[use Version ${pick === "A" ? "B" : "A"}'s look] ` : ""}${x.note || ""}`;
  for (const [k, v] of Object.entries(overall)) rows[`Overall · ${k}`] = v;
  if (signed.length) rows["Screenshots (links valid 7 days)"] = signed.join("\n");
  rows["Revision id"] = rr.id;
  rows["When done"] = "Send E2 'Changes are done' from swiftlift.app/admin/send";
  await notifyAdmin(`✏️ ${ss ? "SwiftSite " : ""}Revision round ${round}: ${p.business_name || p.client_email}${ss ? "" : ` (Version ${pick})`}`, rows);
  return { ok: true, round, paidRound: isPaid };
}

async function actionReviewApprove(b: Record<string, any>, req: Request) {
  const p = await reviewProject(b.projectId);
  if (brandOf(p.brand) === "swiftsite") return swiftSiteApprove(p, b);
  if (p.paid_at) throw new HttpError(400, "This site is already paid — thank you!");
  const pick = b.preview === "B" ? "B" : b.preview === "A" ? "A" : null;
  if (!pick) throw new HttpError(400, "Please choose Version A or Version B");
  const extra = Math.max(0, Number(p.revision_rounds_used || 0) - PRICE.includedRounds);
  const origin = req.headers.get("origin") || "https://swiftlift.app";

  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("line_items[0][price]", STRIPE_PRICE[pick]);
  form.set("line_items[0][quantity]", "1");
  if (extra > 0) {
    form.set("line_items[1][price]", STRIPE_PRICE.extraRound);
    form.set("line_items[1][quantity]", String(extra));
  }
  form.set("success_url", `${origin}/payment-success?type=build&tier=version_${pick.toLowerCase()}&session_id={CHECKOUT_SESSION_ID}`);
  form.set("cancel_url", `${reviewUrl(p.id, b._site)}&canceled=1`);
  if (p.client_email) form.set("customer_email", p.client_email);
  const meta: Record<string, string> = {
    payment_type: "build",
    tier: `version_${pick.toLowerCase()}`,
    project_id: p.id,
    client_email: p.client_email || "",
    client_name: p.client_name || "",
    business_name: p.business_name || "",
    selected_preview: pick,
    preview_link: (pick === "A" ? p.preview_a_url : p.preview_b_url) || "",
    extra_revision_rounds: String(extra),
  };
  for (const [k, v] of Object.entries(meta)) form.set(`metadata[${k}]`, v);

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("STRIPE_SECRET_KEY")}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`stripe: ${j?.error?.message || res.status}`);
  await db.from("projects").update({ selected_preview: pick, approved_at: new Date().toISOString(), status: "approved", updated_at: new Date().toISOString() }).eq("id", p.id);
  await notifyAdmin(`👍 Approved: ${p.business_name || p.client_email} picked Version ${pick} — checkout opened`, {
    Client: p.client_name,
    Email: p.client_email,
    Total: `$${(pick === "A" ? PRICE.A : PRICE.B) + extra * PRICE.extraRound}${extra ? ` (incl. ${extra} extra round${extra > 1 ? "s" : ""})` : ""}`,
    Note: "You'll get a second email once the payment actually goes through.",
  });
  return { url: j.url };
}

// ---------------- SwiftSite: launch (pay) at preview, approve final before go-live ----------------
const SS_STRIPE_PRICE = {
  setup: "price_1UdaGOAfYSE2nzTBYU9lQ7G9", // SwiftSite Website Setup $99 CAD (one-time)
  monthly: "price_1UdaHFAfYSE2nzTBc1hAy9zw", // SwiftSite Hosting & Care $25/month
  yearly: "price_1UdaHFAfYSE2nzTBfQCj7jvc", // SwiftSite Hosting & Care $250/year
};

async function swiftSiteApprove(p: Record<string, any>, b: Record<string, any>) {
  const S = BRANDS.swiftsite.site;
  // Already paid → this is "my website is perfect, take it live".
  if (p.paid_at) {
    if (p.approved_at) return { ok: true, approved: true };
    await db.from("projects").update({ approved_at: new Date().toISOString(), status: "approved", updated_at: new Date().toISOString() }).eq("id", p.id);
    await notifyAdmin(`✅ SwiftSite approved — ready to go live: ${p.business_name || p.client_email}`, {
      Client: p.client_name,
      Email: p.client_email,
      Preview: p.preview_a_url,
      "Rounds used": `${p.revision_rounds_used || 0} of ${SS_PRICE.includedRounds}`,
      "Next step": "Take it live, then send E3 'Site is live' from swiftlift.app/admin/send",
    });
    return { ok: true, approved: true };
  }
  // Not paid yet → Stripe Checkout: $99 setup + Hosting & Care subscription (card saved for renewals).
  const key = Deno.env.get("STRIPE_SECRET_KEY_SWIFTSITE");
  if (!key) throw new Error("SwiftSite payments are not set up yet");
  const yearly = b.plan === "yearly";
  const form = new URLSearchParams();
  form.set("mode", "subscription");
  form.set("line_items[0][price]", yearly ? SS_STRIPE_PRICE.yearly : SS_STRIPE_PRICE.monthly);
  form.set("line_items[0][quantity]", "1");
  form.set("line_items[1][price]", SS_STRIPE_PRICE.setup);
  form.set("line_items[1][quantity]", "1");
  form.set("success_url", `${S}/review?p=${encodeURIComponent(p.id)}&paid=1`);
  form.set("cancel_url", `${S}/review?p=${encodeURIComponent(p.id)}&canceled=1`);
  if (p.client_email) form.set("customer_email", p.client_email);
  form.set("billing_address_collection", "auto");
  const meta: Record<string, string> = {
    payment_type: "ss_launch",
    brand: "swiftsite",
    project_id: p.id,
    client_email: p.client_email || "",
    client_name: p.client_name || "",
    business_name: p.business_name || "",
    hosting_plan: yearly ? "yearly" : "monthly",
    preview_link: p.preview_a_url || "",
  };
  for (const [k, v] of Object.entries(meta)) {
    form.set(`metadata[${k}]`, v);
    form.set(`subscription_data[metadata][${k}]`, v);
  }
  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`stripe: ${j?.error?.message || res.status}`);
  await db.from("projects").update({ selected_plan: meta.hosting_plan, updated_at: new Date().toISOString() }).eq("id", p.id);
  await notifyAdmin(`🛒 SwiftSite checkout opened: ${p.business_name || p.client_email}`, {
    Client: p.client_name,
    Email: p.client_email,
    Plan: `$${SS_PRICE.setup} setup + ${yearly ? `$${SS_PRICE.yearly}/year` : `$${SS_PRICE.monthly}/month`}`,
    Note: "You'll get a second email once the payment actually goes through.",
  });
  return { url: j.url };
}

// swiftsite.ca "Get my free preview" form (via the swiftsite Worker). Public: honeypot + timing + one request per email per 10 min.
async function actionSwiftSiteLead(b: Record<string, any>) {
  if (b.website_hp || (Number(b._t) && Date.now() - Number(b._t) < 1500)) return { ok: true };
  const email = String(b.email || "").trim().toLowerCase().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new HttpError(400, "Please enter a valid email");
  const website = String(b.url || "").trim().slice(0, 300);
  if (!website) throw new HttpError(400, "Please enter your website");

  const { data: recent } = await db.from("leads").select("id").eq("email", email).eq("source_app", "swiftsite_form").gt("created_at", new Date(Date.now() - 10 * 60e3).toISOString()).limit(1).maybeSingle();
  if (recent) return { ok: true, duplicate: true };

  const { data: lead, error } = await db
    .from("leads")
    .insert({
      client_id: `swiftsite-${crypto.randomUUID()}`,
      email,
      website_url: website,
      status: "new",
      source_app: "swiftsite_form",
    })
    .select("id")
    .single();
  if (error) throw error;

  // Keep the lead (and the project's brand) so the admin page shows it as SwiftSite.
  await db.from("projects").insert({ lead_id: lead.id, client_email: email, source_url: website, brand: "swiftsite", status: "new", source_app: "swiftsite_form", project_type: "redesign" });

  await sendAndLog("confirm", email, { brand: "swiftsite", website }, { leadId: lead.id });
  await notifyAdmin(`New SwiftSite lead: ${website}`, {
    Email: email,
    Website: website,
    "Next step": "Build the preview, then send it from swiftlift.app/admin/send (SwiftSite)",
  });
  try {
    await fetch(N8N_LEAD_WEBHOOK_SS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: email.split("@")[0], email: "", phone: "", message: `Current website: ${website}\nEmail: ${email}`, page: "swiftsite.ca" }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (e) {
    console.error("[client-journey] n8n sheet log failed", e);
  }
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const b = await req.json();
    b._origin = req.headers.get("origin");
    b._site = siteFrom(b._origin);
    switch (b.action) {
      case "list":
        await requireSecret("admin_send_key", b.key);
        return json(await actionList());
      case "send":
        await requireSecret("admin_send_key", b.key);
        return json(await actionSend(b));
      case "preview":
        await requireSecret("admin_send_key", b.key);
        return json(await actionSend(b, true));
      case "check_key":
        await requireSecret("admin_send_key", b.key);
        return json({ ok: true });
      case "push_test":
        await requireSecret("admin_send_key", b.key);
        return json({ ok: true, push: await pushAdmin("SwiftLift 推播測試", { Status: "推播接好了，新 lead 會這樣通知你", Website: b.website || "" }) });
      case "ingest_lead":
        await requireSecret("ingest_secret", b.secret ?? req.headers.get("x-ingest-secret"));
        return json(await actionIngestLead(b));
      case "reminders":
        await requireSecret("cron_secret", b.secret);
        return json(await actionReminders());
      case "swiftsite_lead":
        return json(await actionSwiftSiteLead(b));
      case "golive_get":
        return json(await actionGoLiveGet(b));
      case "golive_submit":
        return json(await actionGoLiveSubmit(b));
      case "review_get":
        return json(await actionReviewGet(b));
      case "review_upload_url":
        return json(await actionReviewUploadUrl(b));
      case "review_submit":
        return json(await actionReviewSubmit(b));
      case "review_approve":
        return json(await actionReviewApprove(b, req));
      case "mark_replied":
        await requireSecret("admin_send_key", b.key);
        return json(await actionMarkReplied(b));
      case "preview_gate":
        return json(await actionPreviewGate(b));
      case "preview_reopen":
        return json(await actionPreviewReopen(b));
      case "preview_message":
        return json(await actionPreviewMessage(b));
      case "report_upload_url":
        await requireSecret("admin_send_key", b.key);
        return json(await actionReportUploadUrl(b));
      default:
        return json({ error: "unknown action" }, 400);
    }
  } catch (e) {
    const status = e instanceof HttpError ? e.status : 500;
    console.error("[client-journey]", e);
    return json({ error: e instanceof Error ? e.message : String(e) }, status);
  }
});
