// SwiftLift client email templates — single source of truth.
// Prices follow Stripe (Stripe is the source of truth — change Stripe first):
//   Version A Launch Ready $299 · Version B Sales Focused $499 · each includes 2 rounds of revisions
//   Extra revision round $45 · Hosting free, or Managed $15/mo · $135/yr
//   Onsite SEO $99 · Performance Optimization $99
export const PRICE = { A: 299, B: 499, extraRound: 45, includedRounds: 2 } as const;

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

// Links point at the site the request came from (swiftlift.app, or a Netlify deploy preview while testing).
const SITE_RE = /^https:\/\/((www\.)?swiftlift\.app|[a-z0-9-]+--swiftlift\.netlify\.app)$/i;
export function siteFrom(origin?: string | null): string {
  return origin && SITE_RE.test(origin) ? origin.replace(/^https:\/\/www\./i, "https://") : SITE;
}

export function reviewUrl(projectId?: string, site = SITE): string {
  return projectId ? `${site}/review?p=${encodeURIComponent(projectId)}` : `${site}/review`;
}

export function goLiveUrl(projectId?: string, site = SITE): string {
  return projectId ? `${site}/go-live?p=${encodeURIComponent(projectId)}` : `${site}/go-live`;
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
  reportUrl?: string;
  oldHost?: string;
  round?: number;
  paidRound?: boolean;
  site?: string;
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
  hostingPlan?: string; // free | monthly | yearly | self
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
  | "revision_received"
  | "revision_done"
  | "payment_confirmed"
  | "golive_received"
  | "site_live";

export interface RenderedEmail {
  subject: string;
  html: string;
}

const previewCards = (d: TemplateData) =>
  box(
    `<b>Version A · Launch Ready</b> — $${PRICE.A}<br>${d.imgA ? `<a href="${esc(d.linkA)}"><img src="${esc(d.imgA)}" width="520" style="width:100%;max-width:520px;border-radius:8px;margin:8px 0;" alt="Version A"></a><br>` : ""}${link(d.linkA || "")}` +
      `<br><br><b>Version B · Sales Focused</b> — $${PRICE.B}<br>${d.imgB ? `<a href="${esc(d.linkB)}"><img src="${esc(d.imgB)}" width="520" style="width:100%;max-width:520px;border-radius:8px;margin:8px 0;" alt="Version B"></a><br>` : ""}${link(d.linkB || "")}`,
  );

function hostingNote(d: TemplateData): string {
  const host = d.oldHost ? esc(d.oldHost) : "";
  return (
    p(`<b>Hosting is free.</b> Once you're happy, we host your new site on our fast, secure servers at no monthly cost. Your domain stays in your name, and your email keeps working.`) +
    p(
      host
        ? `Your current site runs on <b>${host}</b>. You don't need to cancel anything now — after your new site is live, we'll remind you to turn off <b>auto-renewal</b> for your ${host} website plan, so you stop paying for it.`
        : `After your new site is live, we'll tell you exactly when it's safe to turn off auto-renewal at your current website host, so you stop paying twice.`,
    )
  );
}

export function render(key: TemplateKey, d: TemplateData): RenderedEmail {
  const hi = `Hi ${esc(firstName(d.name))},`;
  const biz = esc(d.business || "your business");
  const S = d.site || SITE;
  const review = reviewUrl(d.projectId, S);
  switch (key) {
    case "confirm":
      return {
        subject: "Your 2 website previews are on the way – SwiftLift",
        html: layout(
          "We got your request",
          p(hi) +
            p(`Thank you for sending us ${d.website ? `<b>${esc(d.website)}</b>` : "your website"}. We're excited to work on ${biz}.`) +
            p(`Our team is now going through <b>every page</b> of your current site and building <b>2 different redesigns</b>, using the content, prices and photos you already have — so both versions feel like your business from day one.`) +
            h2("What happens next") +
            ul([
              `Within <b>24–48 hours</b>, you'll receive links to both live previews, plus a short report explaining what we designed and why.`,
              `Open them on your phone and computer, pick your favorite, and tell us anything you'd like changed.`,
              `You only pay once you're happy with it. Don't love either? You owe nothing.`,
            ]) +
            p(`Have a new logo or specific photos you'd like us to use? Simply reply to this email and attach them.`) +
            p(`Talk soon,`),
        ),
      };

    case "previews_ready":
      return {
        subject: `Your 2 website previews for ${d.business || "your business"} are ready`,
        html: layout(
          "Your previews are ready",
          p(hi) +
            p(`Thank you for your patience — your two new website designs for ${biz} are ready. Both are fully live, so you can click through every page, button and photo just like a real site:`) +
            previewCards(d) +
            p(`Please take a look on <b>both your phone and your computer</b>.`) +
            (d.reportUrl
              ? p(`We've also attached a short <b>Website Preview Report</b> (PDF). It walks you through what each version does for your customers and why we designed it that way.`)
              : "") +
            h2("Pick your favorite and tell us what to change") +
            p(`When you're ready, click the button below. You'll choose Version A or B, and you can tell us — page by page — anything you'd like adjusted. You can even mix and match, for example <i>"the colors of A with the layout of B"</i>, a different font, or new photos. Screenshots are welcome.`) +
            box(`<b>Please take your time.</b> Your plan includes ${PRICE.includedRounds} revision rounds, so review <b>every page</b> on your phone and computer first, then send <b>all</b> your changes together in one go. Small changes sent one at a time each use up a full round.`, "#FFF4E5") +
            btn(review, "Choose my favorite") +
            p(`Both versions include <b>${PRICE.includedRounds} rounds of revisions</b>. There's <b>nothing to pay</b> while we refine it — you only pay once you approve the final design.`) +
            ul([
              `<b>Version A · Launch Ready — $${PRICE.A}</b>: clean, modern design, mobile-friendly, SEO-ready structure, contact form, free hosting.`,
              `<b>Version B · Sales Focused — $${PRICE.B}</b>: everything in A, plus a conversion-focused layout, strategic call-to-action placement and trust-building sections designed to turn visitors into customers.`,
            ]) +
            hostingNote(d) +
            p(`These previews stay online for <b>72 hours</b>. As soon as you send us your choice or your changes, we'll keep them up while we work on it.`) +
            p(`Any questions at all? Just reply — a real person on our team will get back to you.`),
        ),
      };

    case "nudge_24h":
      return {
        subject: `Did you get a chance to look at your previews?`,
        html: layout(
          "A quick reminder",
          p(hi) +
            p(`Just checking in, in case our last email got buried. Your 2 website previews for ${biz} are still live:`) +
            ul([`Version A · Launch Ready: ${link(d.linkA || "")}`, `Version B · Sales Focused: ${link(d.linkB || "")}`]) +
            p(`If one of them feels close but not quite right, that's completely normal — that's what revisions are for. Tell us what you'd change and we'll adjust it for you, at no cost until you approve.`) +
            btn(review, "Pick my favorite or request changes") +
            p(`The previews will be taken down in about <b>48 hours</b>. Simply reply if you have any questions.`),
        ),
      };

    case "expired_72h":
      return {
        subject: `Your website previews have expired — want them back?`,
        html: layout(
          "Your previews are offline",
          p(hi) +
            p(`Your 2 preview sites for ${biz} were available for 72 hours, so we've taken them offline for now.`) +
            p(`We'd still love to help you get a website that brings in more customers. If you're interested, just reply <b>"bring them back"</b> and we'll put them up again within a day.`) +
            p(`If neither direction felt right, reply and tell us what you had in mind — a different style, colors, or a site you like — and we'll try a fresh approach. There's still nothing to pay until you're happy.`),
        ),
      };

    case "revision_received":
      return {
        subject: `We got your changes for ${d.business || "your website"}`,
        html: layout(
          "Thank you — we're on it",
          p(hi) +
            p(`Thank you for your feedback on <b>Version ${esc(d.selectedPreview || "")}</b>. We've received your changes and our team is working on them now.`) +
            ul([
              `You'll get an email with the updated site within <b>1–2 business days</b>.`,
              d.paidRound
                ? `This is revision round ${d.round}. Your plan includes ${PRICE.includedRounds} rounds, so this round is <b>$${PRICE.extraRound}</b> — it will simply be added to your final payment. Nothing to pay now.`
                : `This is revision round <b>${d.round} of ${PRICE.includedRounds}</b> included in your plan. Nothing to pay now.`,
              `Your preview will stay online while we work on it.`,
            ]) +
            p(`Forgot something? ${link(review, "Open your review page")} or simply reply to this email.`),
        ),
      };

    case "revision_done":
      return {
        subject: `Your changes are done — take a look`,
        html: layout(
          "Your updated site is ready",
          p(hi) +
            p(`Good news — we've made the changes you asked for on ${biz}. Please take another look on both your phone and computer:`) +
            btn(d.previewUrl || d.liveUrl || S, "View your updated site") +
            (d.note ? box(esc(d.note)) : "") +
            p(
              (d.roundsLeft ?? 0) > 0
                ? `You have <b>${d.roundsLeft} more free revision round${d.roundsLeft === 1 ? "" : "s"}</b> left.`
                : `You've used your ${PRICE.includedRounds} included revision rounds. Any further round is $${PRICE.extraRound}, added to your final payment.`,
            ) +
            p(`On your review page you can either send more changes, or <b>approve the design</b> — that's when you pay, and then we'll get your site live.`) +
            btn(review, "Approve or send more changes"),
        ),
      };

    case "payment_confirmed":
      return {
        subject: `Payment received — let's get ${d.business || "your site"} live`,
        html: layout(
          "Thank you — you're all set!",
          p(hi) +
            p(`We received your payment${d.amount ? ` of <b>${esc(d.amount)}</b>` : ""}${d.packageLabel ? ` for <b>${esc(d.packageLabel)}</b>` : ""}. Thank you so much for choosing SwiftLift!`) +
            h2("One last step from you (about 3 minutes)") +
            p(`Every business is set up a little differently, so this short form tells us exactly how to switch your new site over <b>safely</b> — your domain, your email, and your current website host. We'll explain everything in plain English, and nothing changes until we've checked it.`) +
            btn(goLiveUrl(d.projectId, S), "Start the go-live form") +
            h2("What happens after that") +
            ul([
              `We send you a personalized go-live plan, so you know exactly what will happen.`,
              `We connect your domain. Your site is live within <b>3–5 business days</b> after we receive your form.`,
              `Your email keeps working the whole time.`,
            ]) +
            p(`Questions? Just reply — we're happy to help.`),
        ),
      };

    case "golive_received": {
      const g = d.golive || {};
      return {
        subject: `Here's how we'll take ${g.domain || "your site"} live`,
        html: layout(
          "Your go-live plan",
          p(hi) +
            p(`Thank you — we have everything we need. Here's exactly what will happen, in plain English. Please keep this email for reference.`) +
            domainSection(g) +
            emailSection(g) +
            oldHostSection(g, false) +
            h2("4. Hosting") +
            p(
              g.hostingPlan === "self"
                ? `You'd like to host the site yourself. Your site is built in React, so we'll send you the <b>complete website files as a .zip</b>. It runs on modern static hosts like <b>Cloudflare Pages, Netlify or Vercel</b> (all have free plans). Traditional cPanel or shared hosting isn't supported for this type of site. Changes after handover are $45 per round.`
                : g.hostingPlan === "monthly" || g.hostingPlan === "yearly"
                ? `You chose <b>Managed Hosting</b> (${g.hostingPlan === "monthly" ? "$15/month" : "$135/year"}): we host your site and handle small updates for you. ${link(`${S}/deployment`, "Complete your hosting setup here")} if you haven't yet.`
                : `Your site is hosted <b>free</b> on SwiftLift. If you'd ever like us to handle updates for you, Managed Hosting is $15/month or $135/year.`,
            ) +
            p(`If anything here looks wrong, just reply and let us know.`),
        ),
      };
    }

    case "site_live": {
      const g = d.golive || {};
      return {
        subject: `${d.business || "Your site"} is live! 🎉`,
        html: layout(
          "Your new website is live",
          p(hi) +
            p(`Congratulations — your new website is officially live:`) +
            btn(d.liveUrl || S, d.liveUrl ? d.liveUrl.replace(/^https?:\/\//, "") : "View your site") +
            p(`<b>Heads up:</b> it can take <b>2–72 hours</b> for every phone and computer to see the new site. If you still see the old one, that's normal — please try again later or on mobile data.`) +
            oldHostSection(g, true) +
            h2("Want more customers from it?") +
            ul([
              `<b>Onsite SEO Optimization — $99</b>: help Google understand and rank your pages.`,
              `<b>Performance Optimization — $99</b>: make it load even faster.`,
              `<b>Managed Hosting — $15/month or $135/year</b>: we handle updates for you.`,
            ]) +
            p(`Interested in any of these? Just reply.`) +
            p(`Thank you so much for choosing SwiftLift. If you're happy with your new site, a quick review would mean a lot to our small team — and we hope your new website brings you plenty of new business.`),
        ),
      };
    }
  }
}

// ---------- admin notification ----------
export function adminHtml(title: string, rows: Record<string, unknown>): string {
  const tr = Object.entries(rows)
    .map(([k, v]) => `<tr><td style="padding:6px 10px;font-weight:bold;color:#555;vertical-align:top;">${esc(k)}</td><td style="padding:6px 10px;white-space:pre-wrap;word-break:break-word;">${esc(v ?? "—")}</td></tr>`)
    .join("");
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;"><h2 style="margin:0 0 12px 0;">${esc(title)}</h2><table style="border-collapse:collapse;width:100%;">${tr}</table></div>`;
}

// ---------- sending ----------
export function resendKey(): string {
  const k = Deno.env.get("RESEND_KEY_SWIFTLIFT") ?? Deno.env.get("RESEND_API_KEY");
  if (!k) throw new Error("RESEND key not configured");
  return k;
}

export type Attachment = { filename: string; path: string };

export async function sendEmail(to: string | string[], subject: string, html: string, attachments?: Attachment[]): Promise<string | null> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey()}` },
    body: JSON.stringify({
      from: FROM,
      reply_to: REPLY_TO,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(attachments?.length ? { attachments } : {}),
    }),
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${txt}`);
  try {
    return JSON.parse(txt).id ?? null;
  } catch {
    return null;
  }
}
