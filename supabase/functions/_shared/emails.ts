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

// ---------- brands ----------
// One email system, two brands. SwiftSite (swiftsite.ca, Canada): 1 preview, pay at preview, then 2 rounds of changes.
export type Brand = "swiftlift" | "swiftsite";
export const SS_PRICE = { setup: 199, monthly: 25, yearly: 250, includedRounds: 2, seo: 199 } as const;
export const BRANDS = {
  swiftlift: {
    name: "SwiftLift",
    site: SITE,
    from: FROM,
    replyTo: REPLY_TO,
    support: "support@swiftlift.app",
    logo: LOGO_URL,
    logoWidth: 140,
    accent: ACCENT,
    team: "The SwiftLift Team",
    resendEnv: "RESEND_KEY_SWIFTLIFT",
  },
  swiftsite: {
    name: "SwiftSite",
    site: "https://swiftsite.ca",
    from: "SwiftSite <info@swiftsite.ca>",
    replyTo: "info@swiftsite.ca",
    support: "info@swiftsite.ca",
    logo: "https://swiftsite.ca/images/swiftsite-logo-email.png",
    logoWidth: 160,
    accent: "#0A5CF5",
    team: "Sony Lin & the SwiftSite team",
    resendEnv: "RESEND_KEY_SWIFTSITE",
  },
} as const;
export const brandOf = (b: unknown): Brand => (b === "swiftsite" ? "swiftsite" : "swiftlift");

// Colours and footer follow the brand being rendered (render() sets this; rendering is synchronous).
let CUR: (typeof BRANDS)[Brand] = BRANDS.swiftlift;

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
  `<p style="margin:0 0 16px 0;"><a href="${esc(href)}" style="display:inline-block;background:${CUR.accent};color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px;">${esc(label)}</a></p>`;
const ul = (items: string[]) =>
  `<ul style="margin:0 0 16px 0;padding-left:20px;">${items.map((i) => `<li style="margin:0 0 8px 0;">${i}</li>`).join("")}</ul>`;
const box = (html: string, bg = "#F3F7FA") =>
  `<div style="background:${bg};border-radius:10px;padding:16px 18px;margin:0 0 16px 0;">${html}</div>`;
const link = (href: string, label?: string) =>
  `<a href="${esc(href)}" style="color:${CUR.accent};">${esc(label || href)}</a>`;

function layout(title: string, body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#111111;max-width:600px;margin:0 auto;padding:20px;">
  <div style="text-align:center;margin-bottom:20px;"><img src="${CUR.logo}" alt="${CUR.name}" width="${CUR.logoWidth}" style="width:${CUR.logoWidth}px;height:auto;display:inline-block;" /></div>
  <h1 style="font-size:26px;font-weight:700;margin:0 0 16px 0;">${esc(title)}</h1>
  ${body}
  <hr style="border:none;border-top:1px solid ${CUR.accent};margin:28px 0 16px 0;" />
  <p style="margin:0 0 4px 0;">${CUR.team}</p>
  <p style="margin:0;">${link(`mailto:${CUR.support}`, CUR.support)} · just reply to this email</p>
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
// Client pages for a brand: SwiftLift pages follow the request origin (deploy previews); SwiftSite always swiftsite.ca.
export function brandSite(brand: Brand, origin?: string | null): string {
  return brand === "swiftsite" ? BRANDS.swiftsite.site : siteFrom(origin);
}

export function reviewUrl(projectId?: string, site = SITE): string {
  return projectId ? `${site}/review?p=${encodeURIComponent(projectId)}` : `${site}/review`;
}

// Client-facing preview links go through swiftlift.app/preview, which redirects while the preview is open
// and shows the "preview is closed — reopen?" page after it closes.
export function previewGateUrl(projectId: string | undefined, v: "A" | "B", fallback = "", site = SITE): string {
  return projectId ? `${site}/preview?p=${encodeURIComponent(projectId)}&v=${v}` : fallback;
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
  brand?: Brand;
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
  | "final_6h"
  | "expired_72h"
  | "checkin"
  | "revision_received"
  | "revision_done"
  | "payment_confirmed"
  | "golive_received"
  | "site_live";

export interface RenderedEmail {
  subject: string;
  html: string;
}

const previewCards = (d: TemplateData) => {
  const S = d.site || SITE;
  const a = previewGateUrl(d.projectId, "A", d.linkA || "", S);
  const b = previewGateUrl(d.projectId, "B", d.linkB || "", S);
  return box(
    `<b>Version A · Launch Ready</b> — $${PRICE.A}<br>${d.imgA ? `<a href="${esc(a)}"><img src="${esc(d.imgA)}" width="520" style="width:100%;max-width:520px;border-radius:8px;margin:8px 0;" alt="Version A"></a><br>` : ""}${link(a, "Open Version A")}` +
      `<br><br><b>Version B · Sales Focused</b> — $${PRICE.B}<br>${d.imgB ? `<a href="${esc(b)}"><img src="${esc(d.imgB)}" width="520" style="width:100%;max-width:520px;border-radius:8px;margin:8px 0;" alt="Version B"></a><br>` : ""}${link(b, "Open Version B")}`,
  );
};

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

// Sony's own words, written in /admin/send. Shown right under "Hi {name}," so the email reads as personal.
function personal(d: TemplateData): string {
  const t = String(d.note || "").trim();
  if (!t) return "";
  return t
    .split(/\n\s*\n/)
    .map((para) => p(esc(para.trim()).replace(/\n/g, "<br>")))
    .join("");
}

export function render(key: TemplateKey, d: TemplateData): RenderedEmail {
  CUR = BRANDS[brandOf(d.brand)];
  if (d.brand === "swiftsite") return renderSwiftSite(key, d);
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
          p(hi) + personal(d) +
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
          p(hi) + personal(d) +
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
            p(`These previews stay online for <b>72 hours</b>. As soon as you reply, or send us your choice or changes, we'll keep them up for you.`) +
            p(`Any questions at all? Just reply — a real person on our team will get back to you.`),
        ),
      };

    case "nudge_24h":
      return {
        subject: `Did you get a chance to look at your previews?`,
        html: layout(
          "A quick reminder",
          p(hi) + personal(d) +
            p(`Just checking in, in case our last email got buried. Your 2 website previews for ${biz} are still live:`) +
            ul([`Version A · Launch Ready: ${link(previewGateUrl(d.projectId, "A", d.linkA || "", S), "Open Version A")}`, `Version B · Sales Focused: ${link(previewGateUrl(d.projectId, "B", d.linkB || "", S), "Open Version B")}`]) +
            p(`If one of them feels close but not quite right, that's completely normal — that's what revisions are for. Tell us what you'd change and we'll adjust it for you, at no cost until you approve.`) +
            btn(review, "Pick my favorite or request changes") +
            p(`The previews will be taken down in about <b>48 hours</b>. Simply reply if you have any questions.`),
        ),
      };

    case "final_6h":
      return {
        subject: `Your new website for ${d.business || "your business"} goes offline today`,
        html: layout(
          "Last day to see your new website",
          p(hi) + personal(d) +
            p(`Your 2 new website designs for ${biz} go offline <b>in a few hours</b>. After that, the links will close.`) +
            previewCards(d) +
            p(`If one of them is close, pick it and tell us what you'd change — your previews stay online while we work on it, and there's <b>nothing to pay</b> until you're happy.`) +
            btn(review, "Pick my favorite") +
            p(`Need more time, or have a question? Just reply to this email and we'll keep them up for you.`),
        ),
      };

    case "expired_72h":
      return {
        subject: `Your website previews are closed — want them back?`,
        html: layout(
          "Your previews are closed",
          p(hi) + personal(d) +
            p(`Your 2 preview sites for ${biz} were available for 72 hours, so we've closed them for now.`) +
            p(`Changed your mind, or just didn't get to it yet? You can reopen them yourself with one click:`) +
            btn(previewGateUrl(d.projectId, "A", review, S), "Reopen my previews") +
            p(`If neither direction felt right, reply and tell us what you had in mind — a different style, colors, or a site you like — and we'll try a fresh approach. There's still nothing to pay until you're happy.`),
        ),
      };

    case "checkin": {
      const fn = firstName(d.name);
      return {
        subject: fn && fn !== "there" ? `Still thinking about your new website, ${fn}?` : `Still thinking about your new website?`,
        html: layout(
          "Your previews are open again",
          p(hi) + personal(d) +
            p(`We've reopened your 2 website designs for ${biz} for the next <b>7 days</b>, so you can take another look:`) +
            previewCards(d) +
            p(`If one of them is close, pick it and tell us what you'd change. There's <b>nothing to pay</b> while we refine it — you only pay once you're happy.`) +
            btn(review, "Pick my favorite or request changes") +
            p(`Not quite what you had in mind? Reply and tell us what you'd like instead, and we'll take another look.`),
        ),
      };
    }

    case "revision_received":
      return {
        subject: `We got your changes for ${d.business || "your website"}`,
        html: layout(
          "Thank you — we're on it",
          p(hi) + personal(d) +
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
          p(hi) + personal(d) +
            p(`Good news — we've made the changes you asked for on ${biz}. Please take another look on both your phone and computer:`) +
            btn(d.previewUrl || d.liveUrl || S, "View your updated site") +
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
          p(hi) + personal(d) +
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
          p(hi) + personal(d) +
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
          p(hi) + personal(d) +
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

// ---------- SwiftSite (swiftsite.ca) ----------
// 1 preview · pay when you love the preview ($199 setup + Hosting & Care) · then 2 rounds of changes · go live.
function renderSwiftSite(key: TemplateKey, d: TemplateData): RenderedEmail {
  const hi = `Hi ${esc(firstName(d.name))},`;
  const biz = esc(d.business || "your business");
  const S = BRANDS.swiftsite.site;
  const review = reviewUrl(d.projectId, S);
  const P = SS_PRICE;
  const plan = `$${P.monthly}/month, or $${P.yearly}/year (2 months free)`;
  const link1 = d.linkA || d.previewUrl || "";
  const gate = previewGateUrl(d.projectId, "A", link1, S); // opens while live, "closed — reopen?" page after
  switch (key) {
    case "confirm":
      return {
        subject: "Your new website is on the way – SwiftSite",
        html: layout(
          "We got your request",
          p(hi) + personal(d) +
            p(`Thank you for sending us ${d.website ? `<b>${esc(d.website)}</b>` : "your website"}. We're rebuilding ${biz} into a brand-new design, using your own words, services and photos.`) +
            h2("What happens next") +
            ul([
              `Within <b>48 hours</b>, you'll get a link to your new website. It's a real, clickable site, checked by our lead designer before it reaches you.`,
              `Love it? Launch it for a <b>$${P.setup} setup</b> plus Hosting &amp; Care at ${plan}.`,
              `Not for you? You pay nothing.`,
            ]) +
            p(`Have a new logo or photos you'd like us to use? Just reply and attach them.`) +
            p(`Talk soon,`),
        ),
      };

    case "previews_ready":
      return {
        subject: `Your new website for ${d.business || "your business"} is ready`,
        html: layout(
          "Your new website is ready",
          p(hi) + personal(d) +
            p(`Your brand-new website for ${biz} is ready. It's fully live, so click through every page on both your phone and your computer:`) +
            btn(gate, "See my new website") +
            p(`Or open it here: ${link(gate)}`) +
            (d.reportUrl ? p(`We've also attached a short report on what we changed and why.`) : "") +
            h2("Love it? Launch it") +
            p(`Click below to launch your new website. You'll pay the one-time <b>$${P.setup} setup</b> and start your Hosting &amp; Care plan: <b>${plan}</b>. Hosting, backups, security updates and small edits are all included.`) +
            btn(review, "Launch my new website") +
            h2("Then we fine-tune it with you") +
            ul([
              `You get <b>${P.includedRounds} rounds of changes</b> before we go live. Please send all your changes for each round together in one list.`,
              `We connect it to your domain. Your domain and email stay yours, and your email keeps working.`,
              `After launch, your plan includes <b>up to 2 small edits every month</b>.`,
            ]) +
            p(`Not quite what you had in mind? You pay nothing. Just reply and tell us what you'd like different.`) +
            p(`Your new website stays online for <b>72 hours</b>. Just reply if you need more time, and we'll keep it up for you.`),
        ),
      };

    case "final_6h":
      return {
        subject: `Your new website for ${d.business || "your business"} goes offline today`,
        html: layout(
          "Last day to see your new website",
          p(hi) + personal(d) +
            p(`Your new website for ${biz} goes offline <b>in a few hours</b>. After that, the link will close.`) +
            btn(gate, "See my new website") +
            p(`Love it? Launch it now — then you get <b>${P.includedRounds} rounds of changes</b> before we go live.`) +
            btn(review, "Launch my new website") +
            p(`Need more time, or have a question? Just reply to this email and we'll keep it up for you.`),
        ),
      };

    case "nudge_24h":
      return {
        subject: `Did you get a chance to look at your new website?`,
        html: layout(
          "A quick reminder",
          p(hi) + personal(d) +
            p(`Just checking in, in case our last email got buried. Your new website for ${biz} is still live: ${link(gate)}`) +
            p(`Close, but not quite right? That's what your <b>${P.includedRounds} rounds of changes</b> are for, right after you launch.`) +
            btn(review, "Launch my new website") +
            p(`It will be taken offline in about <b>48 hours</b>. Simply reply if you have any questions.`),
        ),
      };

    case "expired_72h":
      return {
        subject: `Your new website preview is closed — want it back?`,
        html: layout(
          "Your preview is closed",
          p(hi) + personal(d) +
            p(`Your new website for ${biz} was online for 72 hours, so we've closed it for now.`) +
            p(`Changed your mind, or just didn't get to it yet? You can reopen it yourself with one click:`) +
            btn(gate, "Reopen my new website") +
            p(`If the direction wasn't right, reply and tell us what you had in mind and we'll take another look.`),
        ),
      };

    case "checkin": {
      const fn = firstName(d.name);
      return {
        subject: fn && fn !== "there" ? `Still thinking about your new website, ${fn}?` : `Still thinking about your new website?`,
        html: layout(
          "Your new website is open again",
          p(hi) + personal(d) +
            p(`We've reopened your new website for ${biz} for the next <b>7 days</b>, so you can take another look:`) +
            btn(gate, "See my new website") +
            p(`Love it? Launch it — then you get <b>${P.includedRounds} rounds of changes</b> before we go live.`) +
            btn(review, "Launch my new website") +
            p(`Not quite what you had in mind? You pay nothing. Just reply and tell us what you'd like different.`),
        ),
      };
    }

    case "payment_confirmed":
      return {
        subject: `You're all set — let's get ${d.business || "your site"} live`,
        html: layout(
          "Thank you — you're all set!",
          p(hi) + personal(d) +
            p(`We received your payment${d.amount ? ` of <b>${esc(d.amount)}</b>` : ""}. Thank you for choosing SwiftSite! Your receipt comes in a separate email.`) +
            h2(`1. Send your changes (round 1 of ${P.includedRounds})`) +
            p(`Look through every page and send <b>all</b> your changes together in one list: text, photos, colours, anything. Screenshots are welcome. Happy with it as it is? You can tell us on the same page.`) +
            btn(review, "Send my changes") +
            h2("2. Tell us about your domain (about 3 minutes)") +
            p(`This short form tells us how to switch your new site over safely: your domain, your email and your current host. Nothing changes until we've checked it.`) +
            btn(goLiveUrl(d.projectId, S), "Start the go-live form") +
            p(`After launch, your Hosting &amp; Care plan includes <b>up to 2 small edits every month</b>. Just email ${link(`mailto:${BRANDS.swiftsite.support}`, BRANDS.swiftsite.support)}.`),
        ),
      };

    case "revision_received":
      return {
        subject: `We got your changes for ${d.business || "your website"}`,
        html: layout(
          "Thank you — we're on it",
          p(hi) + personal(d) +
            p(`We've received your changes and we're working on them now.`) +
            ul([
              `You'll get an email with the updated site within <b>1–2 business days</b>.`,
              d.paidRound
                ? `This is change round ${d.round}. Your launch includes ${P.includedRounds} rounds, so we'll confirm any cost with you before we start.`
                : `This is round <b>${d.round} of ${P.includedRounds}</b> included before launch.`,
            ]) +
            p(`Forgot something? ${link(review, "Open your review page")} or simply reply to this email.`),
        ),
      };

    case "revision_done":
      return {
        subject: `Your changes are done — take a look`,
        html: layout(
          "Your updated site is ready",
          p(hi) + personal(d) +
            p(`We've made your changes to ${biz}. Please take another look on both your phone and computer:`) +
            btn(d.previewUrl || link1 || S, "View your updated site") +
            p(
              (d.roundsLeft ?? 0) > 0
                ? `You have <b>${d.roundsLeft} more round${d.roundsLeft === 1 ? "" : "s"} of changes</b> before launch.`
                : `That was your last included round before launch. After launch, your plan still includes up to 2 small edits every month.`,
            ) +
            p(`Happy with it? Approve it on your review page and we'll take it live.`) +
            btn(review, "Approve or send more changes"),
        ),
      };

    case "golive_received": {
      const g = d.golive || {};
      return {
        subject: `Here's how we'll take ${g.domain || "your site"} live`,
        html: layout(
          "Your go-live plan",
          p(hi) + personal(d) +
            p(`Thank you, we have everything we need. Here's exactly what will happen. Please keep this email for reference.`) +
            domainSection(g) +
            emailSection(g) +
            oldHostSection(g, false) +
            h2("4. Hosting") +
            p(`Your SwiftSite Hosting &amp; Care plan is active: secure hosting, backups, security updates and up to 2 small edits every month.`) +
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
          p(hi) + personal(d) +
            p(`Congratulations, your new website is officially live:`) +
            btn(d.liveUrl || S, d.liveUrl ? d.liveUrl.replace(/^https?:\/\//, "") : "View your site") +
            p(`<b>Heads up:</b> it can take <b>2–72 hours</b> for every phone and computer to see the new site. If you still see the old one, that's normal. Try again later or on mobile data.`) +
            oldHostSection(g, true) +
            h2("Need a change?") +
            p(`Your plan includes <b>up to 2 small edits every month</b> (text, photos). Just email ${link(`mailto:${BRANDS.swiftsite.support}`, BRANDS.swiftsite.support)}.`) +
            h2("Want more customers from it?") +
            p(`<b>SEO Starter ($${P.seo})</b>: on-page SEO plus Google Business Profile setup, so more local customers find you. Interested? Just reply.`) +
            p(`Thank you for choosing SwiftSite. If you're happy with your new site, a quick Google review would mean a lot to our small team.`),
        ),
      };
    }
  }
}

// ---------- admin notification ----------
export type AdminAction = { label: string; href: string };
export function adminHtml(title: string, rows: Record<string, unknown>, actions: AdminAction[] = []): string {
  const tr = Object.entries(rows)
    .map(([k, v]) => `<tr><td style="padding:6px 10px;font-weight:bold;color:#555;vertical-align:top;">${esc(k)}</td><td style="padding:6px 10px;white-space:pre-wrap;word-break:break-word;">${esc(v ?? "—")}</td></tr>`)
    .join("");
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;"><h2 style="margin:0 0 12px 0;">${esc(title)}</h2>${actions.map((a) => `<a href="${esc(a.href)}" style="display:inline-block;background:#337DAF;color:#fff;text-decoration:none;font-weight:700;padding:10px 16px;border-radius:8px;margin:0 8px 12px 0;">${esc(a.label)}</a>`).join("")}<table style="border-collapse:collapse;width:100%;">${tr}</table></div>`;
}

// ---------- sending ----------
export function resendKey(brand: Brand = "swiftlift"): string {
  const k = brand === "swiftsite" ? Deno.env.get(BRANDS.swiftsite.resendEnv) : Deno.env.get("RESEND_KEY_SWIFTLIFT") ?? Deno.env.get("RESEND_API_KEY");
  if (!k) throw new Error("RESEND key not configured");
  return k;
}

export type Attachment = { filename: string; path: string };

export async function sendEmail(to: string | string[], subject: string, html: string, attachments?: Attachment[], brand: Brand = "swiftlift"): Promise<string | null> {
  const B = BRANDS[brand];
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey(brand)}` },
    body: JSON.stringify({
      from: B.from,
      reply_to: B.replyTo,
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
