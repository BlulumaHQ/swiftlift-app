import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, ExternalLink, Loader2, RotateCcw, Send } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { externalSupabase as supabase } from "@/lib/externalSupabase";
import { JOURNEY_FN } from "@/lib/journey";

// Public, project-keyed gate for preview links in client emails (/preview?p=<project>&v=A|B).
// Open → redirect to the live preview. Closed → "reopen" button (48h, Sony is notified) or a short message to us.

type Gate = {
  open: boolean;
  business: string;
  firstName: string;
  hasB: boolean;
  imgA?: string | null;
  imgB?: string | null;
  expiresAt?: string | null;
  url?: string;
  urlA?: string;
  urlB?: string;
};

const REASONS = [
  { key: "time", label: "I need more time to decide" },
  { key: "price", label: "I have a question about the price" },
  { key: "changes", label: "I'd like some changes" },
  { key: "not_now", label: "Not interested right now" },
] as const;

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(JOURNEY_FN, { body });
  if (data?.error) throw new Error(data.error);
  if (error) {
    try {
      const j = await (error as { context?: Response }).context?.json();
      if (j?.error) throw new Error(j.error);
    } catch (e) {
      if (e instanceof Error && e.message) throw e;
    }
    throw new Error("Something went wrong. Please try again.");
  }
  return data as T;
}

const PreviewContent = () => {
  const [params] = useSearchParams();
  const projectId = params.get("p") || "";
  const v = params.get("v") === "B" ? "B" : "A";
  const [gate, setGate] = useState<Gate | null>(null);
  const [loadError, setLoadError] = useState("");
  const [busy, setBusy] = useState<"" | "reopen" | "message">("");
  const [error, setError] = useState("");
  const [reasons, setReasons] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [thanks, setThanks] = useState<Gate | null>(null);

  useEffect(() => {
    document.title = "Your website preview — SwiftLift";
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
      setLoadError("This link isn't complete. Please open it again from our email.");
      return;
    }
    call<Gate>({ action: "preview_gate", projectId, v })
      .then((g) => {
        if (g.open && g.url) window.location.replace(g.url);
        else setGate(g);
      })
      .catch((e) => setLoadError(e.message));
  }, [projectId, v]);

  const reopen = async () => {
    setBusy("reopen");
    setError("");
    try {
      const g = await call<Gate>({ action: "preview_reopen", projectId, v });
      if (g.url) window.location.replace(g.url);
      else throw new Error("Something went wrong. Please try again.");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy("");
    }
  };

  const sendMessage = async () => {
    setBusy("message");
    setError("");
    try {
      const g = await call<Gate & { ok: boolean }>({ action: "preview_message", projectId, v, reasons, message, website_hp: hp });
      setThanks(g);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy("");
    }
  };

  if (loadError) {
    return <p className="mx-auto max-w-xl px-5 py-24 text-center text-muted-foreground">{loadError}</p>;
  }
  if (!gate) {
    return (
      <div className="flex flex-col items-center gap-3 px-5 py-32 text-muted-foreground">
        <Loader2 className="animate-spin" />
        <p className="text-sm">Opening your preview…</p>
      </div>
    );
  }

  const plural = gate.hasB;
  const thumb = (v === "B" && gate.imgB) || gate.imgA || gate.imgB;

  if (thanks) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20">
        <div className="rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Thank you — we got your message</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A real person from our team will get back to you shortly.
            {thanks.open && ` Your preview${plural ? "s are" : " is"} back online for the next 7 days.`}
          </p>
          {thanks.open && (
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {thanks.urlA && (
                <a href={thanks.urlA} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white">
                  {plural ? "Open Version A" : "Open my new website"} <ExternalLink size={14} />
                </a>
              )}
              {plural && thanks.urlB && (
                <a href={thanks.urlB} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground">
                  Open Version B <ExternalLink size={14} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 pb-20 pt-28 md:pt-32">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {thumb && (
          <div className="relative">
            <img src={thumb} alt="" className="aspect-[16/10] w-full object-cover object-top opacity-60 blur-[2px]" />
            <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">Preview closed</span>
          </div>
        )}
        <div className="p-6 md:p-8">
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            {gate.firstName ? `${gate.firstName}, your` : "Your"} preview{plural ? "s are" : " is"} closed
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The new website{plural ? " designs" : ""} we made{gate.business ? ` for ${gate.business}` : ""} {plural ? "are" : "is"} still here. Want another look?
          </p>
          <button
            onClick={reopen}
            disabled={!!busy}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-semibold text-white disabled:opacity-60"
          >
            {busy === "reopen" ? <Loader2 size={18} className="animate-spin" /> : <RotateCcw size={18} />}
            Reopen my preview{plural ? "s" : ""}
          </button>
          <p className="mt-2 text-center text-xs text-muted-foreground">Opens right away for 48 hours. Nothing to pay.</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-card p-6 md:p-8">
        <h2 className="font-display text-lg font-bold text-foreground">Have a question or concern? Let us know</h2>
        <div className="mt-4 space-y-2">
          {REASONS.map((r) => {
            const on = reasons.includes(r.key);
            return (
              <button
                key={r.key}
                type="button"
                aria-pressed={on}
                onClick={() => setReasons((s) => (on ? s.filter((x) => x !== r.key) : [...s, r.key]))}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${on ? "border-primary bg-primary/5 font-semibold text-foreground" : "border-border text-foreground"}`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${on ? "border-primary bg-primary text-white" : "border-border"}`}>
                  {on && <Check size={13} />}
                </span>
                {r.label}
              </button>
            );
          })}
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Anything else you'd like to tell us (optional)"
          className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input value={hp} onChange={(e) => setHp(e.target.value)} name="website_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          onClick={sendMessage}
          disabled={!!busy || (!reasons.length && !message.trim())}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-foreground px-5 py-3 text-sm font-semibold text-foreground disabled:opacity-40"
        >
          {busy === "message" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          Send
        </button>
      </div>
    </div>
  );
};

const Preview = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Header />
      <PreviewContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default Preview;
