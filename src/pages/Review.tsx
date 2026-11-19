import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Check, ExternalLink, FileText, ImagePlus, Info, Loader2, X } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { externalSupabase as supabase } from "@/lib/externalSupabase";
import { JOURNEY_FN } from "@/lib/journey";

// Public, project-keyed page (link in the previews email): pick A or B, send changes per page, or approve and pay.
// Everything goes through the client-journey edge function; files go to the private revision-uploads bucket.

type Pick = "A" | "B";
type ReviewInfo = {
  firstName: string;
  business: string;
  linkA: string;
  linkB: string;
  imgA?: string | null;
  imgB?: string | null;
  reportUrl?: string | null;
  pages: string[];
  selectedPreview?: Pick | null;
  roundsUsed: number;
  includedRounds: number;
  price: { A: number; B: number; extraRound: number };
  status: string;
  paid: boolean;
  pending: { round: number; selected_preview: Pick; created_at: string } | null;
};
type Upload = { name: string; path?: string; state: "uploading" | "done" | "error"; preview?: string };

const VERSION = {
  A: { title: "A · Classic Facelift", blurb: "Clean, modern design, mobile-friendly, SEO-ready, contact form, free hosting." },
  B: { title: "B · Growth Facelift", blurb: "Everything in Classic, plus a conversion-focused layout, strategic call-to-action placement and trust-building sections." },
} as const;

const OVERALL: { key: "colors" | "fonts" | "photos" | "logo" | "other"; label: string; placeholder: string }[] = [
  { key: "colors", label: "Colors", placeholder: "e.g. Keep these colors / use the colors of the other version / more lavender" },
  { key: "fonts", label: "Fonts", placeholder: "e.g. The headline font feels too bold — something softer please" },
  { key: "photos", label: "Photos", placeholder: "e.g. Swap the second hero photo for one of our storefront (attached)" },
  { key: "logo", label: "Logo", placeholder: "e.g. Make the logo bigger in the header" },
  { key: "other", label: "Anything else", placeholder: "e.g. Add our Instagram link, change the opening hours on Saturday" },
];

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/30";

const Note = ({ tone = "info", children }: { tone?: "info" | "warn" | "ok"; children: React.ReactNode }) => {
  const styles =
    tone === "warn"
      ? "bg-amber-50 border-amber-200 text-amber-900"
      : tone === "ok"
      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
      : "bg-sky-50 border-sky-200 text-sky-900";
  const Icon = tone === "warn" ? AlertTriangle : tone === "ok" ? Check : Info;
  return (
    <div className={`flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${styles}`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
};

const Card = ({ title, children, n }: { title: string; children: React.ReactNode; n?: number }) => (
  <section className="rounded-2xl border border-border bg-card p-5 md:p-7">
    <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-foreground font-display">
      {n != null && <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-white">{n}</span>}
      {title}
    </h2>
    {children}
  </section>
);

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(JOURNEY_FN, { body });
  if (data?.error) throw new Error(data.error);
  if (error) {
    // functions-js puts the JSON body on error.context for non-2xx
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

const ReviewContent = () => {
  const [params] = useSearchParams();
  const projectId = params.get("p") || "";
  const canceled = params.get("canceled") === "1";
  const [info, setInfo] = useState<ReviewInfo | null>(null);
  const [loadError, setLoadError] = useState("");

  const [pick, setPick] = useState<Pick | null>(null);
  const [mode, setMode] = useState<"changes" | "approve" | null>(null);
  const [pageNotes, setPageNotes] = useState<Record<string, { note: string; useOther: boolean }>>({});
  const [overall, setOverall] = useState<Record<string, string>>({});
  const [uploads, setUploads] = useState<Upload[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<{ round: number; paidRound: boolean } | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    document.title = "Review your website — SwiftLift";
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
      setLoadError("This page needs the personal link from your previews email.");
      return;
    }
    call<ReviewInfo>({ action: "review_get", projectId })
      .then((d) => {
        setInfo(d);
        if (d.selectedPreview) setPick(d.selectedPreview);
      })
      .catch((e) => setLoadError(e.message || "We couldn't find your project. Please use the link in your email, or reply to it."));
  }, [projectId]);

  const nextRound = (info?.roundsUsed ?? 0) + 1;
  const nextIsPaid = info ? nextRound > info.includedRounds : false;
  const extraRounds = info ? Math.max(0, info.roundsUsed - info.includedRounds) : 0;
  const total = info && pick ? info.price[pick] + extraRounds * info.price.extraRound : 0;
  const other: Pick = pick === "A" ? "B" : "A";
  const uploading = uploads.some((u) => u.state === "uploading");

  const hasChanges = useMemo(
    () =>
      Object.values(pageNotes).some((x) => x.note.trim() || x.useOther) ||
      Object.values(overall).some((v) => v.trim()) ||
      uploads.some((u) => u.state === "done"),
    [pageNotes, overall, uploads],
  );

  const setPage = (page: string, patch: Partial<{ note: string; useOther: boolean }>) =>
    setPageNotes((s) => ({ ...s, [page]: { note: "", useOther: false, ...s[page], ...patch } }));

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const list = Array.from(files).slice(0, 10 - uploads.length);
    for (const file of list) {
      const idx = uploads.length + list.indexOf(file);
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
      setUploads((u) => [...u, { name: file.name, state: "uploading", preview }]);
      try {
        if (file.size > 15 * 1024 * 1024) throw new Error("too big");
        const { path, token } = await call<{ path: string; token: string }>({ action: "review_upload_url", projectId, name: file.name });
        const { error } = await supabase.storage.from("revision-uploads").uploadToSignedUrl(path, token, file, { contentType: file.type });
        if (error) throw error;
        setUploads((u) => u.map((x, i) => (i === idx ? { ...x, path, state: "done" } : x)));
      } catch {
        setUploads((u) => u.map((x, i) => (i === idx ? { ...x, state: "error" } : x)));
      }
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const askConfirm = () => {
    if (!pick) return setError("Please choose A (Classic) or B (Growth) first.");
    if (!hasChanges) return setError("Please tell us at least one thing you'd like changed.");
    setError("");
    setConfirming(true);
  };

  const submitChanges = async () => {
    setConfirming(false);
    setBusy(true);
    try {
      const res = await call<{ round: number; paidRound: boolean }>({
        action: "review_submit",
        projectId,
        preview: pick,
        pages: (info?.pages || []).map((page) => ({ page, note: pageNotes[page]?.note || "", useOther: !!pageNotes[page]?.useOther })),
        overall,
        files: uploads.filter((u) => u.state === "done").map((u) => ({ path: u.path, name: u.name })),
      });
      setSent(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const approve = async () => {
    if (!pick) return setError("Please choose A (Classic) or B (Growth) first.");
    setError("");
    setBusy(true);
    try {
      const { url } = await call<{ url: string }>({ action: "review_approve", projectId, preview: pick });
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  const reviewing = info && !info.paid && !info.pending && !sent;

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
            {info?.firstName ? `${info.firstName}, which one do you love?` : "Which one do you love?"}
          </motion.h1>
          <p className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Pick your favorite{info?.business ? ` for ${info.business}` : ""}, then tell us what to change — or approve it as it is.
            Nothing to pay until you approve.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-2xl mx-auto px-5 space-y-5">
          {loadError && <Note tone="warn">{loadError}</Note>}
          {!info && !loadError && (
            <div className="flex justify-center py-16 text-muted-foreground">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {info && sent && (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground font-display">Thank you — we're on it!</h2>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
                We've received your changes for Version {pick} and sent you a confirmation email. You'll get the updated site within
                1–2 business days.
                {sent.paidRound
                  ? ` This is revision round ${sent.round}, so $${info.price.extraRound} will be added to your final payment — nothing to pay now.`
                  : ` This was revision round ${sent.round} of ${info.includedRounds} included.`}
              </p>
            </div>
          )}

          {info?.paid && <Note tone="ok">Your website is approved and paid — thank you! Check your email for the go-live form.</Note>}

          {info?.pending && !sent && (
            <Note>
              We're working on your revision round {info.pending.round} (Version {info.pending.selected_preview}). You'll get an email as soon as
              it's ready — then you can review it here again. Need to add something? Just reply to our email.
            </Note>
          )}

          {reviewing && (
            <>
              {canceled && <Note tone="warn">Your payment wasn't completed. You can try again below whenever you're ready.</Note>}

              <Card n={1} title="Choose your favorite">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(["A", "B"] as Pick[]).map((v) => {
                    const on = pick === v;
                    const img = v === "A" ? info.imgA : info.imgB;
                    const href = v === "A" ? info.linkA : info.linkB;
                    return (
                      <div
                        key={v}
                        className={`rounded-xl border p-3 transition-all ${on ? "border-primary ring-2 ring-primary/30 bg-primary/5" : "border-border"}`}
                      >
                        {img && <img src={img} alt={VERSION[v].title} className="mb-3 aspect-[16/10] w-full rounded-lg object-cover object-top" />}
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-sm font-bold text-foreground">{VERSION[v].title}</p>
                          <p className="text-sm font-bold text-foreground">${info.price[v]}</p>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{VERSION[v].blurb}</p>
                        <div className="mt-3 flex gap-2">
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:border-primary"
                          >
                            Open site <ExternalLink size={12} />
                          </a>
                          <button
                            type="button"
                            onClick={() => setPick(v)}
                            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                              on ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
                            }`}
                          >
                            {on ? <><Check size={12} /> Selected</> : `Choose ${v}`}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {info.reportUrl && (
                  <a href={info.reportUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <FileText size={16} /> Read the Website Preview Report (PDF)
                  </a>
                )}
              </Card>

              {pick && (
                <Card n={2} title="Happy with it, or want changes?">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      { v: "changes" as const, label: "I'd like some changes", hint: `${Math.max(0, info.includedRounds - info.roundsUsed)} of ${info.includedRounds} revision rounds left` },
                      { v: "approve" as const, label: "I love it — let's launch", hint: `Approve Version ${pick} and pay $${total}` },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => setMode(o.v)}
                        className={`text-left rounded-xl border px-4 py-3 transition-all ${
                          mode === o.v ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-foreground">{o.label}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">{o.hint}</span>
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {pick && mode === "changes" && (
                <>
                  <Card n={3} title={`Changes to Version ${pick}, page by page`}>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Go through every page on your phone and computer and write down everything at once. Leave a page empty if it's fine as it is.
                    </p>
                    <div className="space-y-5">
                      {info.pages.map((page) => (
                        <div key={page}>
                          <label className="mb-1.5 block text-sm font-semibold text-foreground">{page}</label>
                          <textarea
                            rows={3}
                            value={pageNotes[page]?.note || ""}
                            onChange={(e) => setPage(page, { note: e.target.value })}
                            placeholder={`What would you change on ${page}?`}
                            className={field}
                          />
                          <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <input
                              type="checkbox"
                              checked={!!pageNotes[page]?.useOther}
                              onChange={(e) => setPage(page, { useOther: e.target.checked })}
                              className="h-4 w-4 accent-[hsl(var(--primary))]"
                            />
                            Use Version {other}'s layout for this page instead
                          </label>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card n={4} title="Overall look (optional)">
                    <p className="mb-4 text-sm text-muted-foreground">
                      Mix and match is welcome — for example "the colors of {other} with the layout of {pick}".
                    </p>
                    <div className="space-y-4">
                      {OVERALL.map((o) => (
                        <div key={o.key}>
                          <label className="mb-1.5 block text-sm font-semibold text-foreground">{o.label}</label>
                          <textarea
                            rows={2}
                            value={overall[o.key] || ""}
                            onChange={(e) => setOverall((s) => ({ ...s, [o.key]: e.target.value }))}
                            placeholder={o.placeholder}
                            className={field}
                          />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card n={5} title="Screenshots or files (optional)">
                    <p className="mb-4 text-sm text-muted-foreground">
                      Circle what you mean on a screenshot, or add new photos and your logo. Up to 10 files, 15 MB each.
                    </p>
                    <input
                      ref={fileRef}
                      id="revision-files"
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
                      onChange={(e) => addFiles(e.target.files)}
                      className="hidden"
                    />
                    <label
                      htmlFor="revision-files"
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border px-4 py-8 text-sm text-muted-foreground hover:border-primary/50"
                    >
                      <ImagePlus size={24} />
                      Tap to add screenshots or photos
                    </label>
                    {uploads.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {uploads.map((u, i) => (
                          <div key={i} className="relative overflow-hidden rounded-lg border border-border bg-muted">
                            {u.preview ? (
                              <img src={u.preview} alt={u.name} className="aspect-square w-full object-cover" />
                            ) : (
                              <div className="flex aspect-square items-center justify-center p-2 text-center text-[10px] text-muted-foreground">{u.name}</div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-black/60 px-1.5 py-1 text-[10px] text-white">
                              {u.state === "uploading" ? "Uploading…" : u.state === "error" ? "Failed — try again" : "Added"}
                            </div>
                            <button
                              type="button"
                              onClick={() => setUploads((s) => s.filter((_, j) => j !== i))}
                              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
                              aria-label="Remove"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>

                  {nextIsPaid ? (
                    <Note tone="warn">
                      You've used your {info.includedRounds} included revision rounds. This round is ${info.price.extraRound} and will be added to
                      your final payment — nothing to pay now. Please list <b>everything</b> you'd like changed.
                    </Note>
                  ) : (
                    <Note tone="warn">
                      <b>This is round {nextRound} of {info.includedRounds}.</b> Please list <b>everything</b> you'd like changed — every page, colors,
                      fonts and photos. Small changes sent separately each use up a full round.
                    </Note>
                  )}

                  {error && <Note tone="warn">{error}</Note>}

                  {confirming ? (
                    <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5">
                      <p className="text-base font-bold text-amber-950">Have you included everything?</p>
                      <p className="mt-1 text-sm leading-relaxed text-amber-900">
                        {nextIsPaid
                          ? `This round adds $${info.price.extraRound} to your final payment.`
                          : `After this, you'll have ${Math.max(0, info.includedRounds - nextRound)} free revision round${info.includedRounds - nextRound === 1 ? "" : "s"} left.`}{" "}
                        Take one more look at every page before you send.
                      </p>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setConfirming(false)}
                          className="rounded-full border border-amber-400 bg-white px-6 py-3 text-sm font-semibold text-amber-950"
                        >
                          Let me add more
                        </button>
                        <button
                          type="button"
                          onClick={submitChanges}
                          className="rounded-full px-6 py-3 text-sm font-semibold text-white"
                          style={{ backgroundColor: "#7F37AE" }}
                        >
                          Yes, send it
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={askConfirm}
                      disabled={busy || uploading}
                      className="w-full rounded-full px-8 py-4 text-base font-semibold text-white disabled:opacity-50"
                      style={{ backgroundColor: "#7F37AE" }}
                    >
                      {busy ? <Loader2 size={18} className="mx-auto animate-spin" /> : uploading ? "Uploading files…" : "Send my changes"}
                    </button>
                  )}
                </>
              )}

              {pick && mode === "approve" && (
                <Card n={3} title="Approve and pay">
                  <div className="rounded-xl bg-muted/60 p-4 text-sm">
                    <div className="flex justify-between">
                      <span>{VERSION[pick].title}</span>
                      <span className="font-semibold">${info.price[pick]}</span>
                    </div>
                    {extraRounds > 0 && (
                      <div className="mt-1 flex justify-between">
                        <span>
                          Extra revision round{extraRounds > 1 ? "s" : ""} × {extraRounds}
                        </span>
                        <span className="font-semibold">${extraRounds * info.price.extraRound}</span>
                      </div>
                    )}
                    <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold">
                      <span>Total (USD)</span>
                      <span>${total}</span>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    <li>• Secure payment by Stripe.</li>
                    <li>• Right after, we'll ask about your domain, email and current host — so we can switch you over safely.</li>
                    <li>• Hosting is free. Your domain stays in your name.</li>
                  </ul>
                  {error && <div className="mt-4"><Note tone="warn">{error}</Note></div>}
                  <button
                    type="button"
                    onClick={approve}
                    disabled={busy}
                    className="mt-5 w-full rounded-full px-8 py-4 text-base font-semibold text-white disabled:opacity-50"
                    style={{ backgroundColor: "#7F37AE" }}
                  >
                    {busy ? <Loader2 size={18} className="mx-auto animate-spin" /> : `Approve Version ${pick} & pay $${total}`}
                  </button>
                </Card>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

const Review = () => (
  <LanguageProvider>
    <Header />
    <ReviewContent />
    <Footer />
  </LanguageProvider>
);

export default Review;
