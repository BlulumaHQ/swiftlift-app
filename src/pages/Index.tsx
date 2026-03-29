import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PRICING, formatPrice } from "@/lib/pricing";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { Check, Plus, Star, ChevronLeft, ChevronRight as ChevronRightIcon, Shield, Loader2, CheckCircle2, Clock, Mail, Copy, Palette, Globe, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { externalSupabase } from "@/lib/externalSupabase";
import { getOrCreateProjectId } from "@/lib/projectId";

function generateClientId(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `CL-${yyyy}${mm}${dd}-${rand}`;
}

import heroDesktopBg from "@/assets/hero-bg-desktop.webp";
import reviewSlideGenes from "@/assets/swiftlift-review-slide-genes.webp";
import reviewSlideMuttpuddles from "@/assets/swiftlift-review-slide-muttpuddles.webp";
import reviewSlideChicagoboxing from "@/assets/swiftlift-review-slide-chicagoboxing.webp";

const PRELOADER_KEY = "swiftlift_visited";

const portfolioImages = [reviewSlideGenes, reviewSlideMuttpuddles, reviewSlideChicagoboxing];

const portfolioLinks = [
  { a: "https://genes-sausage-a.netlify.app/", b: "https://genes-sausage-b.netlify.app/" },
  { a: "https://mutt-puddles-dog-wash-preview-01.lovable.app/", b: "https://mutt-puddles-dog-wash-preview-02.lovable.app/" },
  { a: "https://chicagoboxingclub-preveiw-01.lovable.app/", b: "https://chicagoboxingclub-preveiw-02.lovable.app/" },
];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/* ── Inline Success Section ── */
const SuccessSection = ({ email, clientId, isDark }: { email: string; clientId?: string; isDark?: boolean }) => {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [cloudLink, setCloudLink] = useState("");
  const fallbackProjectId = useMemo(() => getOrCreateProjectId(), []);
  const projectId = clientId || fallbackProjectId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: "hsl(275 51% 46% / 0.15)" }}
        >
          <CheckCircle2 size={32} style={{ color: "hsl(275 51% 46%)" }} />
        </div>
        <h2 className={`text-2xl md:text-3xl font-black font-display leading-tight ${isDark ? "text-white" : "text-foreground"}`}>
          {lang === "en" ? "Your Preview Request Is In" : "您的預覽請求已收到"}
        </h2>
        <p className={`mt-3 text-base leading-relaxed max-w-md mx-auto ${isDark ? "text-white/70" : "text-muted-foreground"}`}>
          {lang === "en"
            ? "We've received your website details and we're preparing your 2 preview directions now."
            : "我們已收到您的網站詳情，正在為您準備2個預覽方向。"}
        </p>
        <div className={`mt-4 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 ${isDark ? "border-white/20 bg-white/10" : "border-border bg-secondary/50"}`}>
          <span className={`text-sm font-medium ${isDark ? "text-white/70" : "text-muted-foreground"}`}>
            {lang === "en" ? "Project ID:" : "專案編號："}
          </span>
          <span className={`font-bold text-base tracking-wide font-mono ${isDark ? "text-white" : "text-foreground"}`}>{projectId}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(projectId);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className={`ml-1 transition-colors ${isDark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
            title="Copy"
          >
            {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border p-6 space-y-4 ${isDark ? "border-white/15 bg-white/5" : "border-border bg-background"}`}>
        <div className="flex items-center gap-3 text-sm">
          <Mail size={16} style={{ color: "hsl(275 51% 46%)" }} className="flex-shrink-0" />
          <span className={isDark ? "text-white/70" : "text-muted-foreground"}>
            {lang === "en" ? "Previews will be sent to:" : "預覽將發送至："}{" "}
            <span className={`font-medium ${isDark ? "text-white" : "text-foreground"}`}>{email}</span>
          </span>
        </div>
        <div className="space-y-2">
          {[
            lang === "en" ? "Version A — Clean & Professional" : "版本A — 簡潔專業",
            lang === "en" ? "Version B — Conversion Focused" : "版本B — 轉化導向",
          ].map((label, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
              <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-foreground"}`}>{label}</p>
            </div>
          ))}
        </div>
        <div className={`pt-3 border-t flex items-center gap-3 ${isDark ? "border-white/10" : "border-border"}`}>
          <Clock size={16} className={`flex-shrink-0 ${isDark ? "text-white/50" : "text-muted-foreground"}`} />
          <p className={`text-sm ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
            {lang === "en" ? "Estimated delivery: Within 24–48 hours" : "預計交付：24–48小時內"}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "hsl(275 51% 46%)" }}
        >
          {lang === "en" ? "Back to Home" : "返回首頁"}
        </a>
      </div>

      <div className={`mt-8 rounded-2xl border p-6 ${isDark ? "border-white/10 bg-white/5" : "border-border bg-secondary/30"}`}>
        <h3 className={`text-base font-bold font-display mb-3 ${isDark ? "text-white" : "text-foreground"}`}>
          {lang === "en" ? "Want even better previews?" : "想要更精準的預覽？"}
        </h3>
        <ul className="space-y-2 mb-4">
          {[
            { icon: Palette, text: lang === "en" ? "Share your logo (SVG/PNG) and brand colors" : "分享您的標誌（SVG/PNG）和品牌顏色" },
            { icon: Globe, text: lang === "en" ? "Send 2–3 websites you like" : "發送2–3個您喜歡的網站" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={i} className={`flex items-start gap-3 text-sm ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
                <Icon size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                {item.text}
              </li>
            );
          })}
        </ul>
        <div className="space-y-1.5">
          <label className={`text-sm font-medium ${isDark ? "text-white/80" : "text-foreground"}`}>
            {lang === "en" ? "Optional: Paste a cloud folder link (Google Drive / Dropbox)" : "選填：貼上雲端資料夾連結"}
          </label>
          <input
            type="url"
            value={cloudLink}
            onChange={(e) => setCloudLink(e.target.value)}
            placeholder="https://drive.google.com/..."
            className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${isDark ? "border-white/15 bg-white/5 text-white placeholder:text-white/30 focus:ring-[hsl(275_51%_46%)]/40" : "border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:ring-[hsl(275,51%,46%)]/40"}`}
          />
        </div>
        <p className={`mt-3 text-xs text-center italic ${isDark ? "text-white/30" : "text-muted-foreground"}`}>
          {lang === "en" ? "All fields above are optional — you can skip this step." : "以上所有欄位均為選填——您可以跳過此步驟。"}
        </p>
      </div>

      <div className={`mt-6 rounded-xl border p-5 flex items-start gap-3 ${isDark ? "border-white/10 bg-white/5" : "border-border bg-background"}`}>
        <Mail size={18} className={`flex-shrink-0 mt-0.5 ${isDark ? "text-white/50" : "text-muted-foreground"}`} />
        <div>
          <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-foreground"}`}>
            {lang === "en" ? "Need to update something?" : "需要更新內容？"}
          </p>
          <p className={`text-sm mt-1 ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
            {lang === "en" ? "Reply to " : "回覆 "}
            <a href="mailto:support@swiftlift.app" className="hover:underline" style={{ color: "#337DAF" }}>support@swiftlift.app</a>
            {lang === "en"
              ? " and include your Project ID so we can quickly locate your request."
              : " 並附上您的專案編號以便快速找到您的請求。"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Multi-Step Intake Form ── */
const MultiStepIntake = ({ variant = "hero" }: { variant?: "hero" | "cta" }) => {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedClientId, setSubmittedClientId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const isDark = variant === "cta";

  const inputBase = isDark
    ? "w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(275_51%_46%)]/40 focus:border-white/30 transition-all"
    : "w-full rounded-xl border border-border bg-background px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(275_51%_46%)]/30 focus:border-[hsl(275_51%_46%)] transition-all";

  const selectBase = isDark
    ? "w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(275_51%_46%)]/40 focus:border-white/30 transition-all [&>option]:bg-[hsl(209_66%_18%)] [&>option]:text-white"
    : "w-full rounded-xl border border-border bg-background px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(275_51%_46%)]/30 focus:border-[hsl(275_51%_46%)] transition-all";

  const normalizeUrl = (val: string): string => {
    let v = val.trim().toLowerCase();
    if (!v) return "";
    if (!v.startsWith("http://") && !v.startsWith("https://")) {
      v = "https://" + v;
    }
    return v;
  };

  const isValidUrl = (val: string): boolean => {
    try {
      const u = new URL(val);
      return u.hostname.includes(".");
    } catch {
      return false;
    }
  };

  const [urlError, setUrlError] = useState("");

  const submitStep1 = () => {
    setUrlError("");
    const trimmed = url.trim();
    if (!trimmed) {
      setUrlError(lang === "en" ? "Please enter a valid website URL." : "請輸入有效的網站網址。");
      return;
    }
    const normalized = normalizeUrl(trimmed);
    if (!isValidUrl(normalized)) {
      setUrlError(lang === "en" ? "Please enter a valid website URL." : "請輸入有效的網站網址。");
      return;
    }
    setUrl(normalized);
    setStep(2);
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    submitStep1();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    const businessName = fd.get("businessName") as string;
    const websiteYouLike = fd.get("websiteYouLike") as string;
    const timeline = fd.get("timeline") as string;

    setShowProcessing(true);
    const processingSteps = [0, 1, 2];
    for (const s of processingSteps) {
      setProcessingStep(s);
      await new Promise(r => setTimeout(r, 1200));
    }

    try {
      const clientId = generateClientId();

      const leadsPayload = {
        client_id: clientId,
        name: businessName,
        email,
        company_name: businessName,
        website_url: url,
        timeline: timeline || null,
        notes: websiteYouLike ? `Inspiration: ${websiteYouLike}` : null,
        source_app: "landing_page",
      };

      const { error: leadsError } = await externalSupabase.from("leads").insert(leadsPayload).select();
      if (leadsError) {
        const debugMsg = [
          `message: ${leadsError.message || "N/A"}`,
          `details: ${leadsError.details || "N/A"}`,
          `hint: ${leadsError.hint || "N/A"}`,
          `code: ${leadsError.code || "N/A"}`,
        ].join("\n");
        throw new Error(debugMsg);
      }

      try {
        const serializedPayload = JSON.parse(
          JSON.stringify({
            name: businessName || null,
            email: email || null,
            company_name: businessName || null,
            website_url: url || null,
            timeline: timeline || null,
          }),
        );
        await externalSupabase.from("form_submissions").insert([{
          client_id: clientId,
          payload: serializedPayload,
          source_app: "landing_page",
        }]);
      } catch (fsErr) {
        console.error("form_submissions error:", fsErr);
      }

      try {
        await supabase.functions.invoke("send-intake-confirmation", {
          body: {
            client_name: businessName,
            business_name: businessName,
            client_email: email,
            website: url,
            service: timeline ? `Timeline: ${timeline}` : "Preview Request",
            message: websiteYouLike ? `Inspiration: ${websiteYouLike}` : "",
            form_type: "preview",
          },
        });
      } catch (emailErr) {
        console.warn("Email send failed (non-critical):", emailErr);
      }

      if (typeof window.fbq !== "undefined") {
        window.fbq("track", "Lead");
      }

      try { sessionStorage.setItem("swiftlift_email", email); } catch {}
      setSubmittedEmail(email);
      setSubmittedClientId(clientId);
      setSubmitted(true);
      setShowProcessing(false);
    } catch (err) {
      console.error("Submission error:", err);
      setShowProcessing(false);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const processingMessages = [
    lang === "en" ? "Reviewing your website..." : "正在審查您的網站...",
    lang === "en" ? "Preparing your preview request..." : "正在準備您的預覽請求...",
    lang === "en" ? "Organizing your project details..." : "正在整理您的項目細節...",
  ];

  if (submitted) {
    return <SuccessSection email={submittedEmail} clientId={submittedClientId} isDark={isDark} />;
  }

  if (showProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 size={32} className="animate-spin" style={{ color: "hsl(275 51% 46%)" }} />
        <AnimatePresence mode="wait">
          <motion.p
            key={processingStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm font-medium ${isDark ? "text-white/80" : "text-muted-foreground"}`}
          >
            {processingMessages[processingStep]}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  if (step === 1) {
    return (
      <form onSubmit={handleStep1} className="w-full">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            inputMode="url"
            value={url}
            onChange={e => { setUrl(e.target.value); setUrlError(""); }}
            placeholder={lang === "en" ? "Enter your website URL (e.g. yourbusiness.com)" : "輸入您的網站網址（例如 yourbusiness.com）"}
            className={`${inputBase}${urlError ? " border-red-400 focus:ring-red-400/30" : ""}`}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); submitStep1(); } }}
          />
          {urlError && <p className={`text-xs ${isDark ? "text-red-300" : "text-destructive"}`}>{urlError}</p>}
          <button
            type="submit"
            className="w-full rounded-full py-4 px-8 text-sm font-bold text-white whitespace-nowrap transition-all hover:opacity-90 hover:scale-[1.01]"
            style={{ background: "hsl(275 51% 46%)" }}
          >
            {lang === "en" ? "Get My 2 Free Website Versions" : "獲取我的2個免費網站版本"}
          </button>
          <p className={`text-[11px] text-center mt-2 ${isDark ? "text-white/35" : "text-muted-foreground/60"}`}>
            {lang === "en"
              ? "No payment required · No commitment · Just enter your URL"
              : "無需付款 · 無需承諾 · 只需輸入網址"}
          </p>
        </div>
      </form>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className={`text-sm mb-5 ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
        {lang === "en"
          ? "Tell us where to send your previews and what style direction you like so we can create a more tailored result for your business."
          : "告訴我們將預覽發送到哪裡以及您喜歡的風格方向，以便我們為您的業務創建更量身定制的結果。"}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-white/70" : "text-foreground"}`}>
              {lang === "en" ? "Business Name" : "企業名稱"} <span className="text-destructive">*</span>
            </label>
            <input type="text" name="businessName" required placeholder={lang === "en" ? "Your business name" : "您的企業名稱"} className={inputBase} />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-white/70" : "text-foreground"}`}>
              {lang === "en" ? "Email Address" : "電子郵箱"} <span className="text-destructive">*</span>
            </label>
            <input type="email" name="email" required placeholder="you@email.com" className={inputBase} />
          </div>
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-white/70" : "text-foreground"}`}>
            {lang === "en" ? "Website You Like" : "您喜歡的網站"} <span className={`text-[10px] ${isDark ? "text-white/30" : "text-muted-foreground"}`}>{lang === "en" ? "(Optional)" : "（選填）"}</span>
          </label>
          <input type="text" inputMode="url" name="websiteYouLike" placeholder="https://example.com" className={inputBase} onBlur={e => { if (e.target.value) e.target.value = normalizeUrl(e.target.value); }} />
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-white/70" : "text-foreground"}`}>
            {lang === "en" ? "When do you need your website?" : "您何時需要網站？"} <span className="text-destructive">*</span>
          </label>
          <select name="timeline" required className={selectBase}>
            <option value="">{lang === "en" ? "Select an option" : "請選擇"}</option>
            <option value="asap">{lang === "en" ? "As soon as possible" : "盡快"}</option>
            <option value="1week">{lang === "en" ? "Within 1 week" : "1週內"}</option>
            <option value="2weeks">{lang === "en" ? "Within 2 weeks" : "2週內"}</option>
            <option value="1month">{lang === "en" ? "Within 1 month" : "1個月內"}</option>
            <option value="exploring">{lang === "en" ? "Just exploring for now" : "目前只是探索"}</option>
          </select>
        </div>
        {submitError && (
          <pre className={`text-xs font-mono whitespace-pre-wrap break-all p-3 rounded border ${isDark ? "text-red-300 bg-red-900/30 border-red-500/30" : "text-destructive bg-destructive/10 border-destructive/30"}`}>{submitError}</pre>
        )}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`rounded-full py-3.5 px-6 text-sm font-medium border transition-all ${isDark ? "border-white/20 text-white/60 hover:text-white" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {lang === "en" ? "Back" : "返回"}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 rounded-full py-3.5 px-8 text-sm font-bold text-white transition-all hover:opacity-90 ${submitting ? "opacity-70 pointer-events-none" : ""}`}
            style={{ background: "hsl(275 51% 46%)" }}
          >
            {submitting ? (lang === "en" ? "Sending..." : "發送中...") : (lang === "en" ? "Get My 2 Free Website Versions" : "獲取我的2個免費網站版本")}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

/* ── Main Page ── */
const IndexContent = () => {
  const { lang } = useLanguage();
  const home = translations.home;
  const [reviewIdx, setReviewIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const touchStartX = useRef(0);
  const reviewAutoRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    document.title = "SwiftLift — Website Makeover & Upgrade Service";
  }, []);

  // Auto-slide reviews — cycles through all 6 items (on mobile shows 1, on desktop pages of 3)
  const totalReviews = 6;
  useEffect(() => {
    reviewAutoRef.current = setInterval(() => {
      setReviewIdx((i) => (i + 1) % totalReviews);
    }, 5000);
    return () => clearInterval(reviewAutoRef.current);
  }, []);

  const handleReviewTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleReviewTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setReviewIdx((i) => (i + 1) % totalReviews);
      else setReviewIdx((i) => (i === 0 ? totalReviews - 1 : i - 1));
      clearInterval(reviewAutoRef.current);
      reviewAutoRef.current = setInterval(() => setReviewIdx((i) => (i + 1) % totalReviews), 5000);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const multiPagePlans = [
    {
      name: lang === "en" ? "Growth Upgrade" : "成長升級版",
      price: formatPrice(PRICING.websitePackages.multiPage[2].price),
      features: lang === "en"
        ? ["Conversion-focused layout built to generate leads", "Completely different design approach from Makeover", "Stronger content flow and business positioning", "Free hosting included — built to turn visitors into enquiries"]
        : ["轉換導向版面，專為產生詢問而設計", "與改造版完全不同的設計策略", "更強的內容架構與商業定位", "免費代管，將訪客轉換為詢問"],
      highlighted: false,
    },
    {
      name: lang === "en" ? "Website Makeover" : "網站改造版",
      price: formatPrice(PRICING.websitePackages.multiPage[1].price),
      badge: lang === "en" ? "Most Popular" : "最受歡迎",
      features: lang === "en"
        ? ["Everything in Facelift Starter, fully polished", "Optimized to show up better on Google searches", "Looks great when shared on social media and messaging apps", "Fine-tuned for a stronger first impression", "Free hosting included — launch-ready in 3 days"]
        : ["包含入門版的所有內容，全面精修", "優化後在 Google 搜尋中更容易被找到", "在社群媒體和通訊軟體分享時呈現最佳效果", "細節調校，打造更強烈的第一印象", "免費代管，3天內上線"],
      highlighted: true,
    },
    {
      name: lang === "en" ? "Facelift Starter" : "入門改版",
      price: formatPrice(PRICING.websitePackages.multiPage[0].price),
      features: lang === "en"
        ? ["Clean, modern redesign of your existing site", "Mobile responsive & SEO-friendly structure", "Up to 7 pages", "Free hosting included — no monthly fees required"]
        : ["現有網站的簡潔現代重新設計", "手機響應式與SEO友善架構", "最多7頁", "免費代管，無需月費"],
      highlighted: false,
    },
  ];

  const singlePagePlans = [
    { name: lang === "en" ? "Facelift Starter" : "入門改版", price: formatPrice(PRICING.websitePackages.singlePage[0].price) },
    { name: lang === "en" ? "Website Makeover" : "網站改造版", price: formatPrice(PRICING.websitePackages.singlePage[1].price) },
    { name: lang === "en" ? "Growth Upgrade" : "成長優化版", price: formatPrice(PRICING.websitePackages.singlePage[2].price) },
  ];

  const reviewItems = [
    {
      text: lang === "en"
        ? "We got two versions within a day. Picked one and moved forward. Way easier than freelancers."
        : "我們一天之內就收到了兩個版本。選了一個就開始了。比自由職業者容易得多。",
      name: "David Chen",
      company: lang === "en" ? "Realtor" : "房地產經紀人",
    },
    {
      text: lang === "en"
        ? "I was embarrassed by my old site for years. SwiftLift had two new versions ready in 48 hours — I picked one and launched the same week."
        : "多年來我一直為舊網站感到尷尬。SwiftLift在48小時內準備好了兩個新版本——我選了一個，同一週就上線了。",
      name: "Sarah Mitchell",
      company: lang === "en" ? "Independent Realtor · Austin, TX" : "獨立房地產經紀人 · 德州奧斯汀",
    },
    {
      text: lang === "en"
        ? "I already had a website but it felt outdated. They showed two upgraded versions and handled everything after that. Didn't need to deal with any tech stuff."
        : "我已經有網站了，但感覺很過時。他們展示了兩個升級版本，之後處理了一切。不需要處理任何技術問題。",
      name: "Melissa Wong",
      company: lang === "en" ? "Clinic Owner" : "診所老闆",
    },
    {
      text: lang === "en"
        ? "Honestly didn't think a dental office website could look this good without spending thousands. They showed me two completely different designs before I paid a single dollar. The whole process was smooth and way faster than I expected. My front desk staff actually said the new site looks more professional than our clinic interior!"
        : "老實說沒想到牙科診所的網站不花幾千美金也能做得這麼好。在我付一分錢之前他們就展示了兩個完全不同的設計。整個過程很順利，比我預期的快得多。前台工作人員甚至說新網站看起來比我們診所內部還專業！",
      name: "Dr. James Kowalski",
      company: lang === "en" ? "Family Dentistry · Columbus, OH" : "家庭牙科 · 俄亥俄州哥倫布",
    },
    {
      text: lang === "en"
        ? "Honestly wasn't expecting much at first, but the two versions were actual working websites, not mockups. You can click through everything. We chose one, made a few adjustments, and it was ready to go. Much smoother than hiring freelancers."
        : "老實說一開始沒抱太大期望，但兩個版本都是真正可運行的網站，不是模型。你可以點擊所有內容。我們選了一個，做了一些調整，就準備好了。比僱用自由職業者順暢得多。",
      name: "Jason Liu",
      company: lang === "en" ? "Restaurant Owner" : "餐廳老闆",
    },
    {
      text: lang === "en"
        ? "I've been in construction for 22 years and my website looked like it was built in 2005 — because it was. A buddy told me about SwiftLift and I figured I'd try it since I didn't have to pay upfront. They sent me two live website versions to browse on my phone, and I could actually click through everything. Picked the one that felt more like my brand, requested a couple small changes, and it was live within days. I've already had two new clients mention they found me online, which never happened before. Wish I did this years ago."
        : "我做建築22年了，我的網站看起來像2005年建的——因為確實是。一個朋友告訴我SwiftLift，我想既然不用先付錢就試試。他們發了兩個即時網站版本讓我在手機上瀏覽，我真的可以點擊所有內容。選了那個更符合我品牌的，提了幾個小修改，幾天內就上線了。已經有兩個新客戶說他們在網上找到我的，以前從沒發生過。真希望幾年前就這樣做了。",
      name: "Mike Hartwell",
      company: lang === "en" ? "Hartwell General Contracting · Boise, ID" : "Hartwell 綜合承包 · 愛達荷州博伊西",
    },
  ];

  const faqItems = [
    {
      q: lang === "en" ? "Do I have to pay monthly hosting fees?" : "需要每月支付託管費嗎？",
      a: lang === "en"
        ? "No. There are no required monthly hosting fees. You are not locked into our hosting."
        : "不需要。沒有強制的每月託管費。您不會被鎖定在我們的託管中。",
    },
    {
      q: lang === "en" ? "What if I already have a website?" : "如果我已有網站怎麼辦？",
      a: lang === "en"
        ? "That's exactly what we specialize in. We rebuild and upgrade your existing website into something better."
        : "這正是我們的專長。我們將您現有的網站重建升級為更好的版本。",
    },
    {
      q: lang === "en" ? "Is this really free?" : "這真的免費嗎？",
      a: lang === "en"
        ? "Yes. You can review both website versions before paying. You only pay if you choose to use one of them."
        : "是的。您可以在付款前審核兩個網站版本。只有在您選擇使用其中之一時才需付款。",
    },
  ];

  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section
        id="contact"
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(209 66% 16%) 0%, hsl(209 66% 12%) 100%)",
        }}
      >
        <img
          src={heroDesktopBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0 hidden lg:block"
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none hidden lg:block"
          style={{ background: "rgba(10, 15, 30, 0.4)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(275 51% 46% / 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, hsl(214 58% 60% / 0.04) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-center">
            {/* Left: Copy */}
            <div className="text-white pt-2 lg:pt-6">
              <h1 className="text-[1.85rem] md:text-[clamp(2.8rem,5.5vw,4.2rem)] lg:text-[clamp(2.8rem,4.5vw,3.6rem)] font-black leading-[1.08] lg:leading-[1.15] font-display tracking-tight">
                {lang === "en" ? (<>Turn Your Outdated<br />Website Into a<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">Conversion&nbsp;Machine.</span></>) : (<>將您過時的網站，<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">變成自動帶客的業績引擎。</span></>)}
              </h1>

              <p className="mt-5 lg:mt-7 text-lg md:text-xl lg:text-[1.25rem] font-medium text-white leading-[1.5] lg:leading-[1.6] max-w-lg">
                {lang === "en"
                  ? "We redesign your existing site and deliver 2 live previews in 48 hours — you only pay if you love it."
                  : "我們重新設計您現有的網站，48小時內交付2個即時預覽——滿意才付款。"}
              </p>

              <p className="mt-3 text-sm text-white/50 lg:text-left text-center">
                {lang === "en"
                  ? "500+ websites built · See yours before you pay"
                  : "已建設500+網站 · 付款前先看成果"}
              </p>

              <div className="mt-6 space-y-2">
                <p className="text-base md:text-lg text-white/90 font-semibold">
                  {lang === "en"
                    ? "Free to review. Packages start at $299."
                    : "免費審閱。方案起價 $299。無需代管月費。"}
                </p>
              </div>

              <p className="mt-5 text-sm text-white/50">
                {lang === "en"
                  ? "We specialize in website makeovers — we rebuild and upgrade your existing site into something better."
                  : "我們專注於網站改版——將您現有的網站升級為更好的版本。"}
              </p>

              {/* Mobile: hide bullets for shorter scroll */}
              <ul className="mt-6 space-y-2.5 hidden md:block">
                {[
                  lang === "en" ? "See 2 live redesigns before paying anything" : "付款前先看2個即時重新設計",
                  lang === "en" ? "Built for small businesses ready to grow" : "專為準備成長的小型企業打造",
                  lang === "en" ? "Launch in 3 days if you love it" : "滿意的話3天內上線",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <Check size={16} className="flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Intake Form */}
            <div className="bg-background rounded-2xl p-7 md:p-10 border border-border/50 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] lg:mt-2">
              <h3 className="text-base font-bold text-foreground font-display mb-1">
                {lang === "en" ? "Get Your 2 Free Website Versions" : "獲取您的2個免費網站版本"}
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                {lang === "en" ? "Takes less than 30 seconds. No commitment." : "不到30秒。無需承諾。"}
              </p>
              <MultiStepIntake variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. HOW IT WORKS ═══ */}
      <section id="process" className="py-16 md:py-24 lg:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] lg:text-[2rem] font-black text-foreground font-display">
            {lang === "en" ? "How It Works" : "如何運作"}
          </h2>

          <p className="mt-6 text-muted-foreground text-sm md:text-base text-center max-w-2xl mx-auto leading-relaxed">
            {lang === "en"
              ? "Other services charge upfront for a few pages and add surprise fees later. We build 2 complete website previews first — you only pay if you love them."
              : "其他服務先收費做幾頁，之後再加額外費用。我們先建好 2 個完整網站預覽——滿意才付款。"}
          </p>

          {/* Desktop: horizontal steps */}
          <div className="mt-16 hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-0">
            {[
              { num: "1", title: lang === "en" ? "Share Your Current Website" : "分享您的現有網站", desc: lang === "en" ? "Already have a site? Perfect — paste your URL and we handle the rest." : "已有網站？完美——貼上您的網址，我們處理其餘的。" },
              { num: "2", title: lang === "en" ? "We Build 2 Live Previews" : "我們建2個即時預覽", desc: lang === "en" ? "You receive two real, working website versions you can click through." : "您收到兩個真實可點擊瀏覽的網站版本。" },
              { num: "3", title: lang === "en" ? "You Choose & We Launch" : "您選擇，我們上線", desc: lang === "en" ? "Pick the version you like within 48 hours — we finalize and launch it." : "48小時內選擇您喜歡的版本——我們完善並上線。" },
            ].map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center text-center px-4">
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg"
                    style={{ background: "linear-gradient(135deg, hsl(275 51% 46%), hsl(214 58% 50%))" }}
                  >
                    {s.num}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground font-display leading-snug">{s.title}</h3>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-[240px]">{s.desc}</p>
                </div>
                {i < 2 && (
                  <div className="flex items-center pt-6 px-2">
                    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`arrow-grad-${i}`} x1="0" y1="12" x2="48" y2="12" gradientUnits="userSpaceOnUse">
                          <stop stopColor="hsl(275 51% 46%)" />
                          <stop offset="1" stopColor="hsl(214 58% 50%)" />
                        </linearGradient>
                      </defs>
                      <path d="M0 12H40M40 12L30 4M40 12L30 20" stroke={`url(#arrow-grad-${i})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: vertical steps */}
          <div className="mt-12 md:hidden space-y-2">
            {[
              { num: "1", title: lang === "en" ? "Share Your Current Website" : "分享您的現有網站", desc: lang === "en" ? "Already have a site? Perfect — paste your URL and we handle the rest." : "已有網站？完美——貼上您的網址，我們處理其餘的。" },
              { num: "2", title: lang === "en" ? "We Build 2 Live Previews" : "我們建2個即時預覽", desc: lang === "en" ? "You receive two real, working website versions you can click through." : "您收到兩個真實可點擊瀏覽的網站版本。" },
              { num: "3", title: lang === "en" ? "You Choose & We Launch" : "您選擇，我們上線", desc: lang === "en" ? "Pick the version you like within 48 hours — we finalize and launch it." : "48小時內選擇您喜歡的版本——我們完善並上線。" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex items-start gap-4 text-left w-full max-w-sm">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-base font-black text-white flex-shrink-0 shadow-md"
                    style={{ background: "linear-gradient(135deg, hsl(275 51% 46%), hsl(214 58% 50%))" }}
                  >
                    {s.num}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-[17px] font-bold text-foreground font-display leading-snug">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                {i < 2 && (
                  <div className="py-2 pl-6 self-start ml-[18px]">
                    <svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`arrow-grad-m-${i}`} x1="10" y1="0" x2="10" y2="32" gradientUnits="userSpaceOnUse">
                          <stop stopColor="hsl(275 51% 46%)" />
                          <stop offset="1" stopColor="hsl(214 58% 50%)" />
                        </linearGradient>
                      </defs>
                      <path d="M10 0V24M10 24L4 16M10 24L16 16" stroke={`url(#arrow-grad-m-${i})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. PRICING ═══ */}
      <section id="pricing" className="py-16 md:py-24 lg:py-28" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] lg:text-[2rem] font-black text-foreground font-display text-center">
            {lang === "en" ? "Simple, Transparent Pricing" : "簡單透明的定價"}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm text-center max-w-lg mx-auto">
            {lang === "en" ? "You only pay after you've seen your previews and feel confident." : "只有在看過預覽並有信心後才付款。"}
          </p>
          <p className="mt-3 text-muted-foreground text-xs text-center max-w-2xl mx-auto">
            {lang === "en"
              ? "Other services charge upfront for a few pages and add surprise fees later. We build 2 complete website previews first — you only pay if you love them."
              : "其他服務先收費做幾頁，之後再加額外費用。我們先建好 2 個完整網站預覽——滿意才付款。"}
          </p>

          {/* Pricing cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {multiPagePlans.map((plan, i) => {
              // Mobile order: Facelift Starter(2) top, Website Makeover(1) mid, Growth Upgrade(0) bottom
              // Mobile order: $499 Makeover(1) top, $299 Facelift(2) mid, $799 Growth(0) bottom
              const mobileOrder = i === 0 ? "order-3" : i === 1 ? "order-1" : "order-2";
              return (
              <div
                key={i}
                className={`relative rounded-2xl border p-6 md:p-7 flex flex-col ${mobileOrder} md:order-none ${
                  plan.highlighted
                    ? "border-[hsl(275_51%_46%)] bg-background shadow-xl"
                    : "border-border bg-background"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white px-3 py-1 rounded-full" style={{ background: "hsl(275 51% 46%)" }}>
                    {plan.badge}
                  </span>
                )}
                <h3 className="font-bold text-foreground font-display text-lg">{plan.name}</h3>
                <p className="text-3xl md:text-4xl lg:text-3xl font-black text-foreground font-display mt-2">{plan.price}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToForm}
                  className="mt-6 w-full rounded-full py-3 px-4 text-sm font-bold border-2 transition-all hover:opacity-80"
                  style={{ borderColor: "hsl(275 51% 46%)", color: "hsl(275 51% 46%)" }}
                >
                  {lang === "en" ? "Get My 2 Free Website Versions" : "獲取我的2個免費網站版本"}
                </button>
              </div>
            );
            })}

          </div>

          {/* Single-page note */}
          <div className="mt-8 text-center space-y-1">
            <p className="text-sm text-muted-foreground">
              {lang === "en" ? "Need a simple landing / one-page website?" : "需要簡單的著陸頁/單頁網站？"}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {lang === "en" ? (
                <>Growth Upgrade — {singlePagePlans[2]?.price} · Website Makeover — {singlePagePlans[1]?.price} · Facelift Starter — {singlePagePlans[0]?.price}</>
              ) : (
                <>{singlePagePlans[2]?.name} — {singlePagePlans[2]?.price} · {singlePagePlans[1]?.name} — {singlePagePlans[1]?.price} · {singlePagePlans[0]?.name} — {singlePagePlans[0]?.price}</>
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {lang === "en" ? "Custom projects — E-commerce, brand new websites — also available. " : "客製化專案——電商、全新網站——也可提供。"}
              <Link to="/custom-brief" className="font-semibold hover:underline" style={{ color: "hsl(275 51% 46%)" }}>
                {lang === "en" ? "Learn more →" : "了解更多 →"}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 4. TURN YOUR CURRENT WEBSITE INTO SOMETHING BETTER ═══ */}
      <section className="py-16 md:py-24 lg:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] lg:text-[2rem] font-black text-foreground font-display">
            {lang === "en" ? (<>We Work With What<br className="md:hidden" /> You Already Have</>) : "我們在您現有的基礎上改版"}
          </h2>
          <p className="mt-3 text-base md:text-lg lg:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {lang === "en"
              ? "No need to start from scratch — we upgrade what's already there."
              : "無需從頭開始——我們升級您已有的內容。"}
          </p>
          <p className="mt-4 text-base md:text-lg lg:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {lang === "en"
              ? "Wix and Squarespace give you a template and leave you to figure it out. We don't. We build a custom website for you — no templates, no guesswork. You just choose."
              : "Wix 和 Squarespace 給你一個模板，然後讓你自己摸索。我們不一樣。我們為您量身打造網站——沒有模板、沒有猜測。您只需選擇。"}
          </p>

          <ul className="mt-8 space-y-4 text-left max-w-xl mx-auto">
            {[
              {
                en: "We rebuild your existing site into a better version",
                zh: "將您現有的網站重建為更好的版本",
              },
              {
                en: "No complicated migration or technical hassle",
                zh: "無複雜的搬遷或技術問題",
              },
              {
                en: "No hidden hosting fees — ever",
                zh: "永遠不收隱藏代管費用",
              },
              {
                en: "We guide the full setup, launch, and transition",
                zh: "全程協助設定、上線與切換",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check size={18} className="flex-shrink-0 mt-1" style={{ color: "hsl(275 51% 46%)" }} />
                <span className="text-base md:text-lg text-foreground leading-relaxed">
                  {lang === "en" ? item.en : item.zh}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 5. REVIEWS ═══ */}
      <section className="py-16 md:py-24 lg:py-28" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] lg:text-[2rem] font-black text-foreground font-display text-center mb-10">
            {lang === "en" ? "What Our Clients Say" : "客戶評價"}
          </h2>

          {/* Desktop: show 3 at a time */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-5 items-start">
              {(() => {
                const startIdx = reviewIdx * 3;
                const visible = reviewItems.slice(startIdx, startIdx + 3);
                // If not enough items for a full page, wrap around
                const cards = visible.length === 3 ? visible : [...visible, ...reviewItems.slice(0, 3 - visible.length)];
                return cards.map((item, ci) => (
                  <motion.div
                    key={`${reviewIdx}-${ci}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: ci * 0.1 }}
                    className="rounded-2xl border border-border bg-background p-7 shadow-sm"
                  >
                    <p className="text-base text-foreground leading-relaxed font-medium">
                      "{item.text}"
                    </p>
                    <div className="mt-5">
                      <p className="text-sm font-bold text-foreground inline-flex items-center gap-2">
                        {item.name}
                        <span className="inline-flex gap-0.5">
                          {[...Array(5)].map((_, si) => (
                            <Star key={si} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.company}</p>
                    </div>
                  </motion.div>
                ));
              })()}
            </div>
            {/* Dots for desktop pages */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(reviewItems.length / 3) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setReviewIdx(i);
                    clearInterval(reviewAutoRef.current);
                    reviewAutoRef.current = setInterval(() => setReviewIdx((j) => (j + 1) % Math.ceil(reviewItems.length / 3)), 5000);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === reviewIdx ? "scale-125" : "opacity-30"}`}
                  style={{ background: i === reviewIdx ? "hsl(275 51% 46%)" : "hsl(var(--muted-foreground))" }}
                />
              ))}
            </div>
          </div>

          {/* Mobile: 1 at a time with swipe */}
          <div
            className="md:hidden"
            onTouchStart={handleReviewTouchStart}
            onTouchEnd={handleReviewTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIdx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-border bg-background p-7 shadow-sm"
              >
                <p className="text-base text-foreground leading-relaxed font-medium">
                  "{reviewItems[reviewIdx % reviewItems.length].text}"
                </p>
                <div className="mt-5">
                  <p className="text-sm font-bold text-foreground inline-flex items-center gap-2">
                    {reviewItems[reviewIdx % reviewItems.length].name}
                    <span className="inline-flex gap-0.5">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{reviewItems[reviewIdx % reviewItems.length].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Dots for mobile */}
            <div className="flex justify-center gap-2 mt-6">
              {reviewItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setReviewIdx(i);
                    clearInterval(reviewAutoRef.current);
                    reviewAutoRef.current = setInterval(() => setReviewIdx((j) => (j + 1) % reviewItems.length), 5000);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${i === reviewIdx ? "scale-125" : "opacity-30"}`}
                  style={{ background: i === reviewIdx ? "hsl(275 51% 46%)" : "hsl(var(--muted-foreground))" }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. FEATURED PORTFOLIO ═══ */}
      <section className="py-16 md:py-24 lg:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] lg:text-[2rem] font-black text-foreground font-display text-center">
            {lang === "en" ? "Real Website Transformations" : "真實網站改造"}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm text-center">
            {lang === "en" ? "Built from real businesses like yours." : "為像您一樣的真實企業而建。"}
          </p>

          {/* Desktop: 3 cards in a row */}
          <div className="mt-10 hidden md:grid grid-cols-3 gap-5 items-stretch">
            {home.portfolioItems.map((item, i) => (
              <div key={i} className="rounded-2xl border border-border overflow-hidden bg-background shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={portfolioImages[i]}
                    alt={t(item.name, lang)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{t(item.desc, lang)}</p>
                  <h3 className="mt-1 text-base font-bold text-foreground font-display">
                    {lang === "en" ? "Website Transformation" : "網站改造"}
                  </h3>
                  <div className="mt-auto pt-4 flex gap-2">
                    <a
                      href={portfolioLinks[i].a}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:opacity-80"
                      style={{ borderColor: "hsl(275 51% 46%)", color: "hsl(275 51% 46%)" }}
                    >
                      Version A
                    </a>
                    <a
                      href={portfolioLinks[i].b}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:opacity-80"
                      style={{ borderColor: "hsl(275 51% 46%)", color: "hsl(275 51% 46%)" }}
                    >
                      Version B
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll carousel */}
          <div className="mt-10 md:hidden overflow-x-auto scrollbar-none -mx-6 px-6">
            <div className="flex gap-4" style={{ width: "max-content" }}>
              {home.portfolioItems.map((item, i) => (
                <div key={i} className="rounded-2xl border border-border overflow-hidden bg-background shadow-sm w-[280px] flex-shrink-0 flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={portfolioImages[i]}
                      alt={t(item.name, lang)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{t(item.desc, lang)}</p>
                    <h3 className="mt-1 text-base font-bold text-foreground font-display">
                      {lang === "en" ? "Website Transformation" : "網站改造"}
                    </h3>
                    <div className="mt-auto pt-3 flex gap-2">
                      <a
                        href={portfolioLinks[i].a}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:opacity-80"
                        style={{ borderColor: "hsl(275 51% 46%)", color: "hsl(275 51% 46%)" }}
                      >
                        Version A
                      </a>
                      <a
                        href={portfolioLinks[i].b}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:opacity-80"
                        style={{ borderColor: "hsl(275 51% 46%)", color: "hsl(275 51% 46%)" }}
                      >
                        Version B
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/portfolio"
              className="text-sm font-semibold hover:underline transition-all"
              style={{ color: "hsl(275 51% 46%)" }}
            >
              {lang === "en" ? "View Full Portfolio →" : "查看完整作品集 →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 7. FAQ ═══ */}
      <section className="py-16 md:py-24 lg:py-28" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] lg:text-[2rem] font-black text-foreground font-display text-center">
            {lang === "en" ? "Still Have Questions?" : "還有疑問？"}
          </h2>
          <div className="mt-10 space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = faqOpen === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border border-border overflow-hidden bg-background transition-all ${isOpen ? "border-l-4 faq-expanded-bg" : ""}`}
                  style={isOpen ? { borderLeftColor: "hsl(275 51% 46%)" } : {}}
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-foreground pr-4 text-base">{item.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                      className="flex-shrink-0"
                    >
                      <Plus size={18} style={{ color: "hsl(275 51% 46%)" }} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <div className="px-5 pb-5 text-muted-foreground text-base leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/faq"
              className="text-sm font-semibold hover:underline transition-all"
              style={{ color: "hsl(275 51% 46%)" }}
            >
              {lang === "en" ? "View Full FAQ →" : "查看完整FAQ →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, hsl(213 55% 22%) 0%, hsl(215 60% 16%) 50%, hsl(217 65% 12%) 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(209 70% 30% / 0.25), transparent)" }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.7rem,4.5vw,2.8rem)] lg:text-[2rem] font-black text-white font-display leading-tight">
            {lang === "en" ? "We Build First. You Decide After." : "我們先建站。您再決定。"}
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg lg:text-base max-w-md mx-auto leading-relaxed">
            {lang === "en"
              ? "Get 2 free website versions and decide with confidence — before spending a dollar."
              : "獲取2個免費網站版本，在花一分錢之前自信決策。"}
          </p>
          <div className="mt-10 max-w-xl mx-auto text-left">
            <MultiStepIntake variant="cta" />
          </div>
          <p className="mt-8 text-xs text-white/35 tracking-wide">
            {lang === "en"
              ? "No upfront payment · No obligation · Faster than agencies · Easier than freelancers"
              : "無預付款 · 無義務 · 比機構更快 · 比自由職業者更簡單"}
          </p>
        </div>
      </section>
    </main>
  );
};

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(() => !sessionStorage.getItem(PRELOADER_KEY));

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    sessionStorage.setItem(PRELOADER_KEY, "1");
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background scroll-smooth">
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        <CustomCursor />
        <Header />
        <IndexContent />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
