// SwiftLift client journey — one function, several actions.
//   list / send             → admin (/admin/send), needs admin_send_key
//   ingest_lead             → n8n (Meta Instant Form), needs ingest_secret
//   reminders               → pg_cron hourly, needs cron_secret
//   golive_get / golive_submit → public /go-live page, keyed by project id
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import {
  ADMIN_TO,
  adminHtml,
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
) {
  const { subject, html } = render(template, data);
  try {
    const resendId = await sendEmail(to, subject, html);
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

async function notifyAdmin(title: string, rows: Record<string, unknown>) {
  try {
    await sendEmail(ADMIN_TO, title, adminHtml(title, rows));
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
    db.from("projects").select("id,lead_id,client_name,client_email,business_name,source_url,status,preview_a_url,preview_b_url,preview_a_image,preview_b_image,previews_sent_at,paid_at,live_url,selected_plan,selected_preview,created_at").order("created_at", { ascending: false }).limit(40),
    db.from("client_emails").select("project_id,lead_id,template,to_email,status,created_at").order("created_at", { ascending: false }).limit(100),
  ]);
  return { leads: leads.data ?? [], projects: projects.data ?? [], emails: emails.data ?? [] };
}

async function actionSend(b: Record<string, any>) {
  const template = b.template as TemplateKey;
  const allowed: TemplateKey[] = ["previews_ready", "revision_done", "site_live", "nudge_24h", "expired_72h", "payment_confirmed", "confirm"];
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
  const patch: Record<string, any> = {
    client_email: to,
    client_name: b.name || project?.client_name || null,
    business_name: b.business || project?.business_name || null,
    source_url: b.website || project?.source_url || null,
    brand: "swiftlift",
    updated_at: new Date().toISOString(),
  };
  if (b.leadId && UUID_RE.test(b.leadId)) patch.lead_id = b.leadId;
  if (template === "previews_ready") {
    if (!b.linkA || !b.linkB) throw new HttpError(400, "Preview A and B links are required");
    Object.assign(patch, {
      preview_a_url: b.linkA,
      preview_b_url: b.linkB,
      preview_a_image: b.imgA || null,
      preview_b_image: b.imgB || null,
      status: "previews_sent",
      previews_sent_at: new Date().toISOString(),
      nudge_sent_at: null,
      expired_sent_at: null,
    });
  }
  if (template === "site_live") {
    if (!b.liveUrl) throw new HttpError(400, "Live URL is required");
    Object.assign(patch, { live_url: b.liveUrl, live_at: new Date().toISOString(), status: "live" });
  }
  if (template === "revision_done") patch.status = "revision_review";

  if (project) {
    project = (await db.from("projects").update(patch).eq("id", project.id).select("*").single()).data;
  } else {
    project = (await db.from("projects").insert({ ...patch, source_app: "swiftlift_admin", project_type: "redesign" }).select("*").single()).data;
  }
  if (!project) throw new Error("could not save project");
  if (patch.lead_id) await db.from("leads").update({ status: patch.status || "in_progress" }).eq("id", patch.lead_id);

  const data: TemplateData = {
    ...projectData(project),
    previewUrl: b.previewUrl,
    roundsLeft: typeof b.roundsLeft === "number" ? b.roundsLeft : Number(b.roundsLeft || 0),
    note: b.note,
  };
  if (template === "site_live") data.golive = await latestGoLive(project.id);
  const sent = await sendAndLog(template, to, data, { projectId: project.id, leadId: project.lead_id });
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

async function actionReminders() {
  const now = Date.now();
  const h24 = new Date(now - 24 * 3600e3).toISOString();
  const h72 = new Date(now - 72 * 3600e3).toISOString();
  const done: string[] = [];

  const { data: nudge } = await db
    .from("projects")
    .select("*")
    .eq("status", "previews_sent")
    .is("paid_at", null)
    .is("nudge_sent_at", null)
    .lt("previews_sent_at", h24)
    .gt("previews_sent_at", h72);
  for (const p of nudge ?? []) {
    try {
      await sendAndLog("nudge_24h", p.client_email, projectData(p), { projectId: p.id, leadId: p.lead_id });
      await db.from("projects").update({ nudge_sent_at: new Date().toISOString() }).eq("id", p.id);
      done.push(`nudge:${p.id}`);
    } catch (e) {
      console.error("nudge failed", p.id, e);
    }
  }

  const { data: expire } = await db
    .from("projects")
    .select("*")
    .eq("status", "previews_sent")
    .is("paid_at", null)
    .is("expired_sent_at", null)
    .lt("previews_sent_at", h72);
  for (const p of expire ?? []) {
    try {
      await sendAndLog("expired_72h", p.client_email, projectData(p), { projectId: p.id, leadId: p.lead_id });
      await db.from("projects").update({ expired_sent_at: new Date().toISOString(), status: "previews_expired" }).eq("id", p.id);
      done.push(`expired:${p.id}`);
      await notifyAdmin(`Previews expired: ${p.business_name || p.client_email}`, {
        Client: p.client_name,
        Email: p.client_email,
        "Preview A": p.preview_a_url,
        "Preview B": p.preview_b_url,
        "To do": "You can take the two preview sites offline now.",
      });
    } catch (e) {
      console.error("expire failed", p.id, e);
    }
  }
  return { ok: true, done };
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

  const data: TemplateData = { ...(project ? projectData(project) : { name: a.contactName }), golive: a };
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const b = await req.json();
    switch (b.action) {
      case "list":
        await requireSecret("admin_send_key", b.key);
        return json(await actionList());
      case "send":
        await requireSecret("admin_send_key", b.key);
        return json(await actionSend(b));
      case "check_key":
        await requireSecret("admin_send_key", b.key);
        return json({ ok: true });
      case "ingest_lead":
        await requireSecret("ingest_secret", b.secret ?? req.headers.get("x-ingest-secret"));
        return json(await actionIngestLead(b));
      case "reminders":
        await requireSecret("cron_secret", b.secret);
        return json(await actionReminders());
      case "golive_get":
        return json(await actionGoLiveGet(b));
      case "golive_submit":
        return json(await actionGoLiveSubmit(b));
      default:
        return json({ error: "unknown action" }, 400);
    }
  } catch (e) {
    const status = e instanceof HttpError ? e.status : 500;
    console.error("[client-journey]", e);
    return json({ error: e instanceof Error ? e.message : String(e) }, status);
  }
});
