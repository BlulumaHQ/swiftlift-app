import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Info, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { externalSupabase as supabase } from "@/lib/externalSupabase";
import { JOURNEY_FN } from "@/lib/journey";

type Option = { value: string; label: string; hint?: string };

const REGISTRARS: Option[] = [
  { value: "godaddy", label: "GoDaddy" },
  { value: "namecheap", label: "Namecheap" },
  { value: "squarespace", label: "Squarespace", hint: "Includes domains that used to be on Google Domains" },
  { value: "wix", label: "Wix" },
  { value: "cloudflare", label: "Cloudflare" },
  { value: "shopify", label: "Shopify" },
  { value: "other", label: "Somewhere else" },
  { value: "unsure", label: "I'm not sure" },
];

const CONNECT: Option[] = [
  { value: "we_do_it", label: "You do it for me", hint: "I'll add you as a delegate user — no password sharing" },
  { value: "self", label: "I'll do it myself", hint: "Send me a 5-minute step-by-step guide" },
  { value: "call", label: "Let's do it together", hint: "A quick 15-minute call" },
];

const EMAILS: Option[] = [
  { value: "google", label: "Google Workspace", hint: "Gmail with my business domain" },
  { value: "microsoft", label: "Microsoft 365 / Outlook" },
  { value: "zoho", label: "Zoho Mail" },
  { value: "old_host", label: "Same company as my current website", hint: "e.g. GoDaddy, Bluehost or cPanel email" },
  { value: "other", label: "Another email provider" },
  { value: "none", label: "I don't have email on my domain" },
  { value: "unsure", label: "I'm not sure" },
];

const HOSTS: Option[] = [
  { value: "wix", label: "Wix" },
  { value: "squarespace", label: "Squarespace" },
  { value: "godaddy", label: "GoDaddy", hint: "Website Builder or hosting" },
  { value: "wordpress", label: "WordPress hosting", hint: "Bluehost, SiteGround, HostGator…" },
  { value: "shopify", label: "Shopify" },
  { value: "weebly", label: "Weebly / Square Online" },
  { value: "other", label: "Something else" },
  { value: "unsure", label: "I'm not sure" },
];

const PLANS: Option[] = [
  { value: "free", label: "Free hosting", hint: "$0 forever — send us changes when you need them ($45 per edit)" },
  { value: "yearly", label: "Care Plan — $135/year", hint: "Up to 2 small edits every month, handled for you" },
  { value: "self", label: "I'll host it myself", hint: "We send the full site as a .zip — needs Cloudflare Pages, Netlify or Vercel (not cPanel / shared hosting)" },
];

function classifyMx(hosts: string[]): string {
  const h = hosts.join(" ").toLowerCase();
  if (!hosts.length) return "none";
  if (h.includes("google.com") || h.includes("googlemail.com")) return "google";
  if (h.includes("outlook.com") || h.includes("office365") || h.includes("microsoft")) return "microsoft";
  if (h.includes("zoho")) return "zoho";
  if (h.includes("secureserver.net") || h.includes("bluehost") || h.includes("hostgator") || h.includes("siteground") || h.includes("websitewelcome")) return "old_host";
  return "other";
}

function classifyNs(hosts: string[]): string {
  const h = hosts.join(" ").toLowerCase();
  if (h.includes("domaincontrol.com")) return "godaddy";
  if (h.includes("registrar-servers.com")) return "namecheap";
  if (h.includes("wixdns.net")) return "wix";
  if (h.includes("squarespacedns") || h.includes("googledomains")) return "squarespace";
  if (h.includes("cloudflare.com")) return "cloudflare";
  if (h.includes("shopify")) return "shopify";
  return "";
}

async function dohLookup(name: string, type: "MX" | "NS"): Promise<string[]> {
  const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, {
    headers: { accept: "application/dns-json" },
  });
  if (!res.ok) return [];
  const j = await res.json();
  return (j.Answer || [])
    .filter((a: { type: number }) => a.type === (type === "MX" ? 15 : 2))
    .map((a: { data: string }) => a.data.replace(/^\d+\s+/, "").replace(/\.$/, ""));
}

const cleanDomain = (v: string) =>
  v.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");

const Explain = ({ tone = "info", children }: { tone?: "info" | "warn" | "ok"; children: React.ReactNode }) => {
  const styles =
    tone === "warn"
      ? "bg-amber-50 border-amber-200 text-amber-900"
      : tone === "ok"
      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
      : "bg-sky-50 border-sky-200 text-sky-900";
  const Icon = tone === "warn" ? AlertTriangle : tone === "ok" ? ShieldCheck : Info;
  return (
    <div className={`mt-4 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${styles}`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
};

const Choice = ({ options, value, onChange }: { options: Option[]; value: string; onChange: (v: string) => void }) => (
  <div className="grid gap-2 sm:grid-cols-2">
    {options.map((o) => {
      const on = value === o.value;
      return (
        <button
          type="button"
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`text-left rounded-xl border px-4 py-3 transition-all ${
            on ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-border bg-background hover:border-primary/50"
          }`}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${on ? "border-primary bg-primary" : "border-muted-foreground/40"}`}>
              {on && <Check size={10} className="text-white" />}
            </span>
            {o.label}
          </span>
          {o.hint && <span className="mt-1 block pl-6 text-xs text-muted-foreground">{o.hint}</span>}
        </button>
      );
    })}
  </div>
);

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-border bg-card p-5 md:p-7">
    <h2 className="mb-1 flex items-center gap-3 text-lg font-bold text-foreground font-display">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm text-white">{n}</span>
      {title}
    </h2>
    <div className="mt-4">{children}</div>
  </section>
);

const GoLiveContent = () => {
  const [params] = useSearchParams();
  const projectId = params.get("p") || "";
  const [info, setInfo] = useState<{ firstName: string; business: string; website: string; submitted: boolean } | null>(null);
  const [loadError, setLoadError] = useState("");

  const [domain, setDomain] = useState("");
  const [registrar, setRegistrar] = useState("");
  const [registrarLogin, setRegistrarLogin] = useState("");
  const [connectMethod, setConnectMethod] = useState("");
  const [emailProvider, setEmailProvider] = useState("");
  const [currentHost, setCurrentHost] = useState("");
  const [hostingPlan, setHostingPlan] = useState("free");
  const [notes, setNotes] = useState("");

  const [mx, setMx] = useState<string[] | null>(null);
  const [detected, setDetected] = useState<{ email: string; registrar: string } | null>(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Go-live form — SwiftLift";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    if (!projectId) {
      setLoadError("This page needs the personal link from your payment email.");
      return;
    }
    supabase.functions
      .invoke(JOURNEY_FN, { body: { action: "golive_get", projectId } })
      .then(({ data, error }) => {
        if (error || !data || data.error) {
          setLoadError("We couldn't find your project. Please use the link in your payment email, or reply to it.");
          return;
        }
        setInfo(data);
        if (data.website) setDomain(cleanDomain(data.website));
      });
  }, [projectId]);

  const domainOk = useMemo(() => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(cleanDomain(domain)), [domain]);

  const runCheck = async () => {
    const d = cleanDomain(domain);
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d)) return;
    setChecking(true);
    try {
      const [mxHosts, nsHosts] = await Promise.all([dohLookup(d, "MX"), dohLookup(d, "NS")]);
      setMx(mxHosts);
      const email = classifyMx(mxHosts);
      const reg = classifyNs(nsHosts);
      setDetected({ email, registrar: reg });
      if (!emailProvider) setEmailProvider(email);
      if (!registrar && reg) setRegistrar(reg);
    } catch {
      setMx([]);
    } finally {
      setChecking(false);
    }
  };

  const canSubmit = domainOk && registrar && connectMethod && emailProvider && currentHost && hostingPlan;

  const submit = async () => {
    if (!canSubmit) {
      setError("Please answer every question above.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke(JOURNEY_FN, {
        body: {
          action: "golive_submit",
          projectId,
          mx,
          answers: {
            domain: cleanDomain(domain),
            registrar,
            registrarLogin,
            connectMethod,
            emailProvider,
            emailProviderDetected: detected?.email || "",
            currentHost,
            hostingPlan,
            notes,
          },
        },
      });
      if (error || data?.error) throw new Error(data?.error || error?.message);
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const d = cleanDomain(domain) || "your domain";

  return (
    <main>
      <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white font-display leading-tight"
          >
            {info?.firstName ? `${info.firstName}, let's get your site live` : "Let's get your site live"}
          </motion.h1>
          <p className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            5 quick questions, about 3 minutes. Every business is set up differently — your answers tell us how to switch
            {info?.business ? ` ${info.business}` : " your site"} over safely, without touching your email.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-2xl mx-auto px-5 space-y-5">
          {loadError && <Explain tone="warn">{loadError}</Explain>}

          {done ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground font-display">Got it — thank you!</h2>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                We just emailed you your go-live plan, written out step by step. Keep it handy. We'll be in touch before we switch anything.
              </p>
              {(hostingPlan === "monthly" || hostingPlan === "yearly") && (
                <a
                  href="/deployment"
                  className="sl-cta font-display mt-8 inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-base font-extrabold text-white"
                  
                >
                  Set up Care Plan
                </a>
              )}
            </div>
          ) : (
            !loadError && (
              <>
                {info?.submitted && (
                  <Explain>You've already sent this form. Sending it again will replace your earlier answers.</Explain>
                )}

                <Step n={1} title="What's your domain name?">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      onBlur={runCheck}
                      placeholder="yourbusiness.com"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button
                      type="button"
                      onClick={runCheck}
                      disabled={!domainOk || checking}
                      className="rounded-xl border border-primary px-4 py-3 text-sm font-semibold text-primary disabled:opacity-40"
                    >
                      {checking ? <Loader2 size={16} className="animate-spin" /> : "Check"}
                    </button>
                  </div>
                  <Explain>
                    Your domain stays <b>registered in your name, in your own account</b>. You keep paying its yearly renewal
                    there, like today. We never take ownership of it.
                  </Explain>
                </Step>

                <Step n={2} title="Where did you buy (register) your domain?">
                  {detected?.registrar && (
                    <p className="mb-3 text-sm text-muted-foreground">
                      We checked {d}: its settings are currently managed at{" "}
                      <b>{REGISTRARS.find((r) => r.value === detected.registrar)?.label}</b>. We've pre-selected it — change it if that's wrong.
                    </p>
                  )}
                  <Choice options={REGISTRARS} value={registrar} onChange={setRegistrar} />
                  {(registrar === "wix" || registrar === "squarespace" || registrar === "shopify") && (
                    <Explain tone="warn">
                      Domains bought through a website builder are sometimes tied to its website plan. Before you cancel anything there,
                      we'll confirm with you that the <b>domain renews on its own</b>. If it doesn't, we'll help you move it first.
                    </Explain>
                  )}
                  {registrar === "unsure" && (
                    <Explain>No problem — we'll look it up for you and confirm by email.</Explain>
                  )}

                  <p className="mt-5 mb-2 text-sm font-semibold text-foreground">Can you log in to that account?</p>
                  <Choice
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No / I forgot the password" },
                      { value: "unsure", label: "Not sure" },
                    ]}
                    value={registrarLogin}
                    onChange={setRegistrarLogin}
                  />
                  {registrarLogin === "no" && (
                    <Explain>
                      That's common. Use the registrar's "forgot password" link with the email you used to buy the domain. If that email no longer works,
                      reply to us and we'll walk you through account recovery.
                    </Explain>
                  )}
                </Step>

                <Step n={3} title="How should we connect your domain?">
                  <Choice options={CONNECT} value={connectMethod} onChange={setConnectMethod} />
                  <Explain>
                    Your new site runs on our fast Cloudflare network. To switch over, the domain's <b>name servers</b> (2 short lines in your
                    registrar account) are pointed to us. Before we switch, we copy every existing setting, so your email and anything else keep working.
                  </Explain>
                </Step>

                <Step n={4} title="Who provides your business email?">
                  {mx && (
                    <p className="mb-3 text-sm text-muted-foreground">
                      {mx.length ? (
                        <>
                          We checked {d}: it looks like you use <b>{EMAILS.find((e) => e.value === detected?.email)?.label}</b>. Change it below if that's wrong.
                        </>
                      ) : (
                        <>We checked {d}: we didn't find any email set up on this domain.</>
                      )}
                    </p>
                  )}
                  <Choice options={EMAILS} value={emailProvider} onChange={setEmailProvider} />
                  {["google", "microsoft", "zoho", "other"].includes(emailProvider) && (
                    <Explain tone="ok">
                      Your email won't be touched. We copy its records exactly as they are, so your inbox keeps working with no interruption.
                    </Explain>
                  )}
                  {emailProvider === "old_host" && (
                    <Explain tone="warn">
                      <b>Important:</b> your mailboxes live at your current website company. Later, when you cancel your old website plan,{" "}
                      <b>don't cancel the email plan</b> or your whole account — or your emails can be deleted. We'll remind you, or we can help
                      you move email to Google Workspace or Zoho first.
                    </Explain>
                  )}
                  {emailProvider === "none" && (
                    <Explain>
                      Want one? We can set up <b>free forwarding</b> so info@{d} lands in the inbox you already use. Mention it in the notes below.
                    </Explain>
                  )}
                  {emailProvider === "unsure" && <Explain>No problem — we'll check before we switch anything, and confirm with you first.</Explain>}
                </Step>

                <Step n={5} title="Where is your current website hosted?">
                  <Choice options={HOSTS} value={currentHost} onChange={setCurrentHost} />
                  {currentHost && currentHost !== "unsure" && (
                    <Explain>
                      Once your new site is live, you won't need that website plan anymore. <b>Don't cancel anything yet</b> — about 3 days after
                      launch we'll email you exactly what to turn off (auto-renew) and what to keep (your domain{emailProvider === "old_host" ? " and your email" : ""}).
                    </Explain>
                  )}

                  <p className="mt-6 mb-2 text-sm font-semibold text-foreground">Hosting for your new site</p>
                  <Choice options={PLANS} value={hostingPlan} onChange={setHostingPlan} />

                  <p className="mt-6 mb-2 text-sm font-semibold text-foreground">Anything else we should know? (optional)</p>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="e.g. my web guy set up the domain years ago, I also have a Shopify store…"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </Step>

                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="sl-cta font-display w-full inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-extrabold text-white disabled:opacity-50"
                  
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                  {submitting ? "Sending…" : "Send my answers"}
                </button>
                <p className="text-center text-xs text-muted-foreground">We'll never change anything without telling you first.</p>
              </>
            )
          )}
        </div>
      </section>
    </main>
  );
};

const GoLive = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Header />
      <GoLiveContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default GoLive;
