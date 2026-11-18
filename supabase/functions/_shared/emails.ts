// SwiftLift client email templates — single source of truth.
// Prices follow Stripe (do not change here without changing Stripe):
//   Starter build $299 · Growth build $499 · Hosting free or $15/mo · $135/yr
//   Extra revision $45 · Onsite SEO $99 · Performance Optimization $99

export const SITE = "https://swiftlift.app";
export const FROM = "SwiftLift <support@swiftlift.app>";
export const REPLY_TO = "support@swiftlift.app";
export const ADMIN_TO = "support@swiftlift.app";
const LOGO_URL = `${SITE}/swiftsite-logo.png`;
const ACCENT = "#337DAF";

export function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function firstName(name?: string): string {
  const n = String(name || "").trim().split(/\s+/)[0];
  return n || "there";
}

// ---------- building blocks ----------
const p = (html: string) => `<p style="margin:0 0 16px 0;">${html}</p>`;
const h2 = (t: string) => `<h2 style="font-size:18px;font-weight:700;margin:28px 0 12px 0;">${t}</h2>`;
const btn = (href: string, label: string) =>
  `<p style="margin:0 0 16px 0;"><a href="${esc(href)}" style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px;">${esc(label)}</a></p>`;
const ul = (items: string[]) =>
  `<ul style="margin:0 0 16px 0;padding-left:20px;">${items.map((i) => `<li style="margin:0 0 8px 0;">${i}</li>`).join("")}</ul>`;
const box = (html: string, bg = "#F3F7FA") =>
  `<div style="background:${bg};border-radius:10px;padding:16px 18px;margin:0 0 16px 0;">${html}</div>`;
const link = (href: string, label?: string) =>
  `<a href="${esc(href)}" style="color:${ACCENT};">${esc(label || href)}</a>`;

function layout(title: string, body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#111111;max-width:600px;margin:0 auto;padding:20px;">
  <div style="text-align:center;margin-bottom:20px;"><img src="${LOGO_URL}" alt="SwiftLift" width="140" style="width:140px;height:auto;display:inline-block;" /></div>
  <h1 style="font-size:26px;font-weight:700;margin:0 0 16px 0;">${esc(title)}</h1>
  ${body}
  <hr style="border:none;border-top:1px solid ${ACCENT};margin:28px 0 16px 0;" />
  <p style="margin:0 0 4px 0;">The SwiftLift Team</p>
  <p style="margin:0;">${link("mailto:support@swiftlift.app", "support@swiftlift.app")} · just reply to this email</p>
</div></body></html>`;
}

export function payBuildUrl(tier: "starter" | "growth", d: TemplateData): string {
  const u = new URL(`${SITE}/pay-build`);
  u.searchParams.set("tier", tier);
  if (d.linkA) u.searchParams.set("linkA", d.linkA);
  if (d.linkB) u.searchParams.set("linkB", d.linkB);
  if (d.imgA) u.searchParams.set("imgA", d.imgA);
  if (d.imgB) u.searchParams.set("imgB", d.imgB);
  return u.toString();
}

export function goLiveUrl(projectId?: string): string {
  return projectId ? `${SITE}/go-live?p=${encodeURIComponent(projectId)}` : `${SITE}/go-live`;
}

export interface TemplateData {
  name?: string;
  business?: string;
  email?: string;
  website?: string;
  projectId?: string;
  linkA?: string;
  linkB?: string;
  imgA?: string;
  imgB?: string;
  previewUrl?: string;
  liveUrl?: string;
  packageLabel?: string;
  amount?: string;
  selectedPreview?: string;
  roundsLeft?: number;
  note?: string;
  golive?: GoLiveAnswers;
}

export interface GoLiveAnswers {
  domain?: string;
  registrar?: string;
  registrarLogin?: string; // yes | no | unsure
  connectMethod?: string; // we_do_it | self | call
  emailProvider?: string; // google | microsoft | zoho | old_host | none | other | unsure
  emailProviderDetected?: string;
  currentHost?: string;
  hostingPlan?: string; // free | monthly | yearly
  notes?: string;
}

// ---------- shared explanations (used by go-live summary + site-live) ----------
export const REGISTRAR_LABEL: Record<string, string> = {
  godaddy: "GoDaddy",
  namecheap: "Namecheap",
  squarespace: "Squarespace (incl. former Google Domains)",
  wix: "Wix",
  cloudflare: "Cloudflare",
  shopify: "Shopify",
  other: "another registrar",
  unsure: "not sure yet",
};

export const HOST_LABEL: Record<string, string> = {
  wix: "Wix",
  squarespace: "Squarespace",
  godaddy: "GoDaddy (Website Builder or hosting)",
  wordpress: "WordPress hosting (Bluehost, SiteGround, HostGator…)",
  shopify: "Shopify",
  weebly: "Weebly / Square Online",
  other: "another host",
  unsure: "not sure",
  none: "no current website",
};

export const EMAIL_LABEL: Record<string, string> = {
  google: "Google Workspace (Gmail with your domain)",
  microsoft: "Microsoft 365 / Outlook",
  zoho: "Zoho Mail",
  old_host: "the same company that hosts your current website",
  none: "no email on your domain",
  other: "another email provider",
  unsure: "not sure",
};

function domainSection(g: GoLiveAnswers): string {
  const reg = REGISTRAR_LABEL[g.registrar || "unsure"] || "your registrar";
  const method =
    g.connectMethod === "self"
      ? p(`You chose to update it yourself. We'll send you a step-by-step guide for <b>${esc(reg)}</b> with the exact two name server values to paste in. It takes about 5 minutes.`)
      : g.connectMethod === "call"
      ? p(`You asked for a quick call. Reply with two times that work for you and we'll do it together in about 15 minutes.`)
      : p(`You chose to let us handle it. We'll send instructions for adding us as a delegate user at <b>${esc(reg)}</b>, so you never have to share your password.`);
  return (
    h2("1. Your domain") +
    p(`Your domain stays registered in <b>your name</b>, in <b>your account</b>. You keep paying the yearly renewal there, the same as today. We never take ownership of it.`) +
    p(`What changes: we point the domain's <b>name servers</b> to our Cloudflare account, which is where your new site runs. Before we switch, we copy every existing DNS record over, so nothing else breaks.`) +
    method
  );
}

function emailSection(g: GoLiveAnswers): string {
  const prov = g.emailProvider || "unsure";
  let body = "";
  if (prov === "google" || prov === "microsoft" || prov === "zoho" || prov === "other") {
    body = p(`Your email runs on <b>${esc(EMAIL_LABEL[prov])}</b>. We copy its records (MX, SPF, DKIM) exactly as they are, so your inbox keeps working with no interruption. You don't need to do anything.`);
  } else if (prov === "old_host") {
    body =
      p(`Your email is provided by <b>the same company that hosts your current website</b>. This is the one thing to be careful with:`) +
      box(`<b>Do not cancel your whole account at the old host.</b> If you do, your mailboxes and old emails can be deleted. Cancel only the <b>website</b> plan, keep the <b>email</b> plan — or let us help you move your email to Google Workspace or Zoho first.`, "#FFF4E5");
  } else if (prov === "none") {
    body = p(`You don't have email on your domain yet. If you'd like one, we can set up free forwarding so <b>info@${esc(g.domain || "yourdomain.com")}</b> lands in the inbox you already use. Just reply "yes, set up forwarding".`);
  } else {
    body = p(`We'll check your email setup ourselves before we switch anything, and confirm with you first.`);
  }
  return h2("2. Your email") + body;
}

function oldHostSection(g: GoLiveAnswers, live: boolean): string {
  const host = HOST_LABEL[g.currentHost || "unsure"] || "your old host";
  if (g.currentHost === "none") return "";
  const keep: string[] = [`Your <b>domain registration</b> (keep it renewing every year)`];
  if (g.emailProvider === "old_host") keep.push(`Your <b>email</b> plan at ${esc(host)}`);
  const intro = live
    ? p(`Your new site is now live, so you no longer need your website plan at <b>${esc(host)}</b>. Please wait <b>3 days</b> (so the switch has fully spread across the internet), then:`)
    : p(`Once your new site is live, you won't need your website plan at <b>${esc(host)}</b> anymore. <b>Don't cancel anything yet</b> — we'll tell you when it's safe (about 3 days after launch).`);
  return (
    h2(live ? "Turn off your old website plan" : "3. Your old website hosting") +
    intro +
    (live ? ul([`Turn off <b>auto-renew</b> for the website / hosting plan at ${esc(host)}`, `Download anything you want to keep (old photos, blog posts) before it expires`]) : "") +
    box(`<b>Do NOT cancel:</b>${ul(keep)}`, "#FFF4E5")
  );
}

// ---------- templates ----------
export type TemplateKey =
  | "confirm"
  | "previews_ready"
  | "nudge_24h"
  | "expired_72h"
  | "payment_confirmed"
  | "golive_received"
  | "revision_done"
  | "site_live";

export interface RenderedEmail {
  subject: string;
  html: string;
}

export function render(key: TemplateKey, d: TemplateData): RenderedEmail {
  const hi = `Hi ${esc(firstName(d.name))},`;
  const biz = esc(d.business || "your business");
  switch (key) {
    case "confirm":
      return {
        subject: "Your 2 website previews are on the way – SwiftLift",
        html: layout(
          "We got your request",
          p(hi) +
            p(`Thanks for sending us ${d.website ? `<b>${esc(d.website)}</b>` : "your website"}. We're now building <b>2 different redesigns</b> of your site for ${biz}, using the content and photos you already have.`) +
            h2("What happens next") +
            ul([
              `Within <b>24–48 hours</b>, you'll get an email with links to both live previews.`,
              `Open them on your phone and computer. Pick the one you love.`,
              `Only then do you pay. Don't love either? You owe nothing.`,
            ]) +
            p(`Want us to use a new logo or specific photos? Just reply to this email and attach them.`),
        ),
      };

    case "previews_ready":
      return {
        subject: `Your 2 website previews for ${d.business || "your business"} are ready`,
        html: layout(
          "Your previews are ready",
          p(hi) +
            p(`We built 2 versions of a new website for ${biz}. Both are live, so you can click around them like a real site:`) +
            box(
              `<b>Preview A</b><br>${d.imgA ? `<a href="${esc(d.linkA)}"><img src="${esc(d.imgA)}" width="520" style="width:100%;max-width:520px;border-radius:8px;margin:8px 0;" alt="Preview A"></a><br>` : ""}${link(d.linkA || "")}` +
                `<br><br><b>Preview B</b><br>${d.imgB ? `<a href="${esc(d.linkB)}"><img src="${esc(d.imgB)}" width="520" style="width:100%;max-width:520px;border-radius:8px;margin:8px 0;" alt="Preview B"></a><br>` : ""}${link(d.linkB || "")}`,
            ) +
            p(`Please check them on <b>both your phone and your computer</b>.`) +
            h2("Pick your favorite, then choose a package") +
            ul([
              `<b>Starter — $299</b>: 1–2 pages, mobile-friendly, SEO-ready, contact form.`,
              `<b>Growth — $499</b>: up to 7 pages, everything in Starter, plus 1 round of revisions.`,
            ]) +
            btn(payBuildUrl("growth", d), "Choose Growth – $499") +
            p(`Prefer Starter? ${link(payBuildUrl("starter", d), "Choose Starter – $299")}`) +
            p(`Hosting is free with SwiftLift. These previews stay online for <b>72 hours</b>.`) +
            p(`Questions or small changes in mind? Just reply — we'll take care of them after you pick.`),
        ),
      };

    case "nudge_24h":
      return {
        subject: `Did you get a chance to look at your previews?`,
        html: layout(
          "Quick reminder",
          p(hi) +
            p(`Just making sure our last email didn't get buried. Your 2 website previews for ${biz} are still live:`) +
            ul([`Preview A: ${link(d.linkA || "")}`, `Preview B: ${link(d.linkB || "")}`]) +
            btn(payBuildUrl("growth", d), "Pick my favorite") +
            p(`They'll be taken down in about <b>48 hours</b>. Not quite right? Reply and tell us what you'd change — happy to adjust.`),
        ),
      };

    case "expired_72h":
      return {
        subject: `Your website previews have expired — want them back?`,
        html: layout(
          "Your previews are offline",
          p(hi) +
            p(`Your 2 preview sites for ${biz} were only available for 72 hours, so they're now offline.`) +
            p(`No problem — if you're still interested, just reply "bring them back" and we'll put them up again. Or tell us what you'd like to see differently and we'll try a new direction.`),
        ),
      };

    case "payment_confirmed":
      return {
        subject: `Payment received — let's get ${d.business || "your site"} live`,
        html: layout(
          "Thank you — you're in!",
          p(hi) +
            p(`We received your payment${d.amount ? ` of <b>${esc(d.amount)}</b>` : ""}${d.packageLabel ? ` for the <b>${esc(d.packageLabel)}</b> package` : ""}${d.selectedPreview ? ` (Preview ${esc(d.selectedPreview)})` : ""}. Thank you!`) +
            h2("2 quick steps from you") +
            p(`<b>Step 1 — Tell us about your domain and email</b> (about 3 minutes).<br>Every business is set up a little differently, so this short form tells us exactly how to switch your site over safely, without touching your email.`) +
            btn(goLiveUrl(d.projectId), "Start the go-live form") +
            p(`<b>Step 2 — Send your changes</b> (optional).<br>Want to adjust text, photos or colors on the version you picked? ${link(`${SITE}/revision-request`, "Submit your changes here")}. Please send everything in one go.`) +
            h2("What happens after that") +
            ul([
              `We finish your site and send you a final link to approve.`,
              `We connect your domain. Your site is live within <b>3–5 business days</b> after we have your form.`,
              `Your email keeps working the whole time.`,
            ]),
        ),
      };

    case "golive_received": {
      const g = d.golive || {};
      return {
        subject: `Here's how we'll take ${g.domain || "your site"} live`,
        html: layout(
          "Your go-live plan",
          p(hi) +
            p(`Thanks — we have everything we need. Here's exactly what will happen, in plain English. Keep this email for reference.`) +
            domainSection(g) +
            emailSection(g) +
            oldHostSection(g, false) +
            h2("4. Hosting") +
            p(
              g.hostingPlan === "monthly" || g.hostingPlan === "yearly"
                ? `You chose <b>Managed Hosting</b> (${g.hostingPlan === "monthly" ? "$15/month" : "$135/year"}): we host your site and handle small updates for you. ${link(`${SITE}/deployment`, "Complete your hosting setup here")} if you haven't yet.`
                : `Your site is hosted <b>free</b> on SwiftLift. If you'd ever like us to handle updates for you, Managed Hosting is $15/month or $135/year.`,
            ) +
            p(`If anything here looks wrong, just reply and tell us.`),
        ),
      };
    }

    case "revision_done":
      return {
        subject: `Your changes are done — take a look`,
        html: layout(
          "Your changes are ready",
          p(hi) +
            p(`We've made the changes you asked for. Please take another look on both your phone and computer:`) +
            btn(d.previewUrl || d.liveUrl || SITE, "View your updated site") +
            (d.note ? box(esc(d.note)) : "") +
            p(
              (d.roundsLeft ?? 0) > 0
                ? `You have <b>${d.roundsLeft} more free round</b> of changes. ${link(`${SITE}/revision-request`, "Send more changes")}`
                : `If it all looks good, just reply <b>"Approved"</b> and we'll take it live. Any further changes are $45 per round (${link(`${SITE}/revision-payment`, "request one here")}).`,
            ),
        ),
      };

    case "site_live": {
      const g = d.golive || {};
      return {
        subject: `${d.business || "Your site"} is live! 🎉`,
        html: layout(
          "Your new website is live",
          p(hi) +
            p(`Your new site is officially live:`) +
            btn(d.liveUrl || SITE, d.liveUrl ? d.liveUrl.replace(/^https?:\/\//, "") : "View your site") +
            p(`<b>Heads up:</b> it can take <b>2–72 hours</b> for every phone and computer to see the new site. If you still see the old one, that's normal — try again later or on mobile data.`) +
            oldHostSection(g, true) +
            h2("Want more customers from it?") +
            ul([
              `<b>Onsite SEO Optimization — $99</b>: help Google understand and rank your pages.`,
              `<b>Performance Optimization — $99</b>: make it load even faster.`,
              `<b>Managed Hosting — $15/month or $135/year</b>: we handle updates for you.`,
            ]) +
            p(`Interested in any of these? Just reply. Thank you so much for choosing SwiftLift — we hope your new site brings you plenty of new business.`),
        ),
      };
    }
  }
}

// ---------- admin notification ----------
export function adminHtml(title: string, rows: Record<string, unknown>): string {
  const tr = Object.entries(rows)
    .map(([k, v]) => `<tr><td style="padding:6px 10px;font-weight:bold;color:#555;vertical-align:top;">${esc(k)}</td><td style="padding:6px 10px;">${esc(v ?? "—")}</td></tr>`)
    .join("");
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;"><h2 style="margin:0 0 12px 0;">${esc(title)}</h2><table style="border-collapse:collapse;width:100%;">${tr}</table></div>`;
}

// ---------- sending ----------
export function resendKey(): string {
  const k = Deno.env.get("RESEND_KEY_SWIFTLIFT") ?? Deno.env.get("RESEND_API_KEY");
  if (!k) throw new Error("RESEND key not configured");
  return k;
}

export async function sendEmail(to: string | string[], subject: string, html: string): Promise<string | null> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey()}` },
    body: JSON.stringify({ from: FROM, reply_to: REPLY_TO, to: Array.isArray(to) ? to : [to], subject, html }),
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${txt}`);
  try {
    return JSON.parse(txt).id ?? null;
  } catch {
    return null;
  }
}
