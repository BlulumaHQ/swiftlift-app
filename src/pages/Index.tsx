import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PRICING, formatPrice } from "@/lib/pricing";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { Check, ChevronDown, ArrowRight, ArrowDown, Plus, Star, ChevronLeft, ChevronRight as ChevronRightIcon, Quote, Shield, Zap, Target, Users, Loader2, CheckCircle2, Clock, Mail, Copy, Palette, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { getOrCreateProjectId } from "@/lib/projectId";

import portfolioTrade from "@/assets/portfolio-trade.jpg";
import portfolioWellness from "@/assets/portfolio-wellness-new.jpg";
import portfolioLaw from "@/assets/portfolio-law.jpg";
import portfolioConstruction from "@/assets/portfolio-construction.jpg";
import portfolioWholesale from "@/assets/portfolio-wholesale.jpg";
import portfolioLogistics from "@/assets/portfolio-logistics.jpg";

const PRELOADER_KEY = "swiftlift_visited";

const portfolioImages = [portfolioTrade, portfolioWellness, portfolioLaw, portfolioConstruction, portfolioWholesale, portfolioLogistics];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/* ── Inline Success Section ── */
const SuccessSection = ({ email, isDark }: { email: string; isDark?: boolean }) => {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [cloudLink, setCloudLink] = useState("");
  const projectId = useMemo(() => getOrCreateProjectId(), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
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

        {/* Project ID Badge */}
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

      {/* What You'll Receive */}
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

      {/* Back to Home */}
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

      {/* Optional Improvement */}
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

      {/* Support section */}
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

    // Show processing animation
    setShowProcessing(true);
    const processingSteps = [0, 1, 2];
    for (const s of processingSteps) {
      setProcessingStep(s);
      await new Promise(r => setTimeout(r, 1200));
    }

    try {
      // Send emails via Resend edge function (ONLY email system)
      const { error } = await supabase.functions.invoke("send-intake-confirmation", {
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

      if (error) throw new Error(error.message || "Email sending failed");

      // Facebook Lead tracking — only after confirmed success
      if (typeof window.fbq !== "undefined") {
        window.fbq("track", "Lead");
      }

      // Store email and show inline success
      try { sessionStorage.setItem("swiftlift_email", email); } catch {}
      setSubmittedEmail(email);
      setSubmitted(true);
      setShowProcessing(false);
    } catch (err) {
      console.error("Submission error:", err);
      setShowProcessing(false);
      setSubmitError(lang === "en" ? "Something went wrong. Please try again." : "出了點問題。請重試。");
    } finally {
      setSubmitting(false);
    }
  };

  const processingMessages = [
    lang === "en" ? "Reviewing your website..." : "正在審查您的網站...",
    lang === "en" ? "Preparing your preview request..." : "正在準備您的預覽請求...",
    lang === "en" ? "Organizing your project details..." : "正在整理您的項目細節...",
  ];

  // Show inline success state
  if (submitted) {
    return <SuccessSection email={submittedEmail} isDark={isDark} />;
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
            {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
          </button>
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
          <p className={`text-sm font-medium ${isDark ? "text-red-300" : "text-destructive"}`}>{submitError}</p>
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
            {submitting ? (lang === "en" ? "Sending..." : "發送中...") : (lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽")}
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
  const [proofIdx, setProofIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    document.title = "SwiftLift — See Your Website Before You Pay";
  }, []);

  const prevProof = () => setProofIdx((i) => (i === 0 ? home.portfolioItems.length - 1 : i - 1));
  const nextProof = () => setProofIdx((i) => (i === home.portfolioItems.length - 1 ? 0 : i + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextProof();
      else prevProof();
    }
  };

  const scrollToIntake = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const whyCards = [
    { icon: Shield, title: lang === "en" ? "No Risk" : "零風險", desc: lang === "en" ? "See your previews first. Move forward only if it feels right." : "先看預覽。感覺對了再繼續。" },
    { icon: Zap, title: lang === "en" ? "Fast Turnaround" : "快速交付", desc: lang === "en" ? "Get a stronger website direction without waiting through a long agency process." : "無需漫長等待即可獲得更強的網站方向。" },
    { icon: Target, title: lang === "en" ? "Built for Results" : "注重成效", desc: lang === "en" ? "We redesign with clearer messaging, better structure, and stronger conversion intent." : "我們以更清晰的訊息、更好的結構和更強的轉化意圖進行重新設計。" },
    { icon: Users, title: lang === "en" ? "Done for You" : "為您完成", desc: lang === "en" ? "You share your website. We handle the strategy, design direction, and heavy lifting." : "您分享您的網站。我們處理策略、設計方向和繁重工作。" },
  ];

  const faqItems = [
    { q: lang === "en" ? "Is the preview really free?" : "預覽真的免費嗎？", a: lang === "en" ? "Yes. We create your preview directions first so you can review the concept before deciding whether to move forward." : "是的。我們先創建您的預覽方向，讓您在決定是否繼續之前審查概念。" },
    { q: lang === "en" ? "How long does it take to receive my previews?" : "收到預覽需要多長時間？", a: lang === "en" ? "Most preview requests are prepared within 24 to 48 hours depending on project volume and urgency." : "大多數預覽請求會根據項目量和緊急程度在24至48小時內準備好。" },
    { q: lang === "en" ? "What if I need changes after choosing a version?" : "選擇版本後需要修改怎麼辦？", a: lang === "en" ? "Once you move forward with a paid package, we refine the chosen direction and prepare it for launch." : "一旦您選擇付費套餐繼續，我們將完善所選方向並準備上線。" },
    { q: lang === "en" ? "What if I don't have a website yet?" : "如果我還沒有網站怎麼辦？", a: lang === "en" ? "SwiftLift is currently optimized for businesses with an existing website. If you need a brand new site, you can explore our custom build options." : "SwiftLift 目前針對已有網站的企業進行了優化。如果您需要全新網站，可以探索我們的定制建設選項。" },
  ];

  const multiPagePlans = [
    {
      name: lang === "en" ? "Preview Access" : "預覽版",
      price: formatPrice(PRICING.websitePackages.multiPage[0].price),
      features: lang === "en"
        ? ["Live website preview", "Clean professional layout", "Delivered with no risk", "Up to 7 pages", "Mobile responsive design", "SEO-friendly structure"]
        : ["即時網站預覽", "簡潔專業版面", "零風險交付", "最多7頁", "移動端響應式設計", "SEO友好結構"],
      highlighted: false,
    },
    {
      name: lang === "en" ? "Launch Ready" : "上線版",
      price: formatPrice(PRICING.websitePackages.multiPage[1].price),
      badge: lang === "en" ? "Most Popular" : "最受歡迎",
      features: lang === "en"
        ? ["Fully polished website", "Bug fixes and final content refinement", "Ready for real business use", "Up to 7 pages", "Mobile responsive design", "SEO-friendly structure"]
        : ["完全打磨的網站", "修復和最終內容優化", "適合實際商業使用", "最多7頁", "移動端響應式設計", "SEO友好結構"],
      highlighted: true,
    },
    {
      name: lang === "en" ? "Growth Optimized" : "成長版",
      price: formatPrice(PRICING.websitePackages.multiPage[2].price),
      features: lang === "en"
        ? ["Conversion-focused layout", "Optimized structure and stronger content flow", "Designed to generate more leads", "Up to 7 pages", "Mobile responsive design", "SEO-friendly structure"]
        : ["轉化導向版面", "優化結構和更強的內容流程", "設計以產生更多潛在客戶", "最多7頁", "移動端響應式設計", "SEO友好結構"],
      highlighted: false,
    },
  ];

  const singlePagePlans = [
    { name: lang === "en" ? "Preview" : "預覽版", price: formatPrice(PRICING.websitePackages.singlePage[0].price) },
    { name: lang === "en" ? "Launch" : "上線版", price: formatPrice(PRICING.websitePackages.singlePage[1].price) },
    { name: lang === "en" ? "Growth" : "成長版", price: formatPrice(PRICING.websitePackages.singlePage[2].price) },
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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(275 51% 46% / 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, hsl(214 58% 60% / 0.04) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start">
            {/* Left: Copy */}
            <div className="text-white pt-2 lg:pt-6">
              <h1 className="text-[2.4rem] md:text-[clamp(2.8rem,5.5vw,4.2rem)] font-black leading-[1.08] font-display tracking-tight whitespace-pre-line">
                {lang === "en" ? "No Calls. No Waiting.\nJust 2 Live Website Previews." : "無需電話。無需等待。\n直接獲得2個即時網站預覽。"}
              </h1>

              <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-lg">
                {lang === "en"
                  ? "Get 2 fully working websites before you pay anything."
                  : "在支付任何費用之前，獲得2個完全可運行的網站。"}
              </p>
              <p className="mt-2 text-sm md:text-base text-white/60 leading-relaxed max-w-lg">
                {lang === "en"
                  ? "If you like it → we launch in 3 days. If not → you pay nothing."
                  : "滿意 → 3天內上線。不滿意 → 您不用付費。"}
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  lang === "en" ? "2 live website previews to compare" : "2個即時網站預覽可比較",
                  lang === "en" ? "No upfront payment required" : "無需預付款",
                  lang === "en" ? "Launch in 3 days if you love it" : "滿意的話3天內上線",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm md:text-base text-white/85">
                    <Check size={16} className="flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs text-white/40">
                {lang === "en" ? "Limited preview slots available today" : "今日預覽名額有限"}
              </p>
            </div>

            {/* Right: Intake Form — stronger visual weight */}
            <div className="bg-background rounded-2xl p-7 md:p-10 border border-border/50 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] lg:mt-2">
              <h3 className="text-base font-bold text-foreground font-display mb-1">
                {lang === "en" ? "Get Your 2 Free Website Previews" : "獲取您的2個免費網站預覽"}
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
      <section id="process" className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display">
            {lang === "en" ? "How It Works" : "如何運作"}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            {lang === "en" ? "No calls. No meetings. No back-and-forth." : "無需電話。無需會議。無需來回溝通。"}
          </p>

          {/* Desktop */}
          <div className="mt-14 hidden md:flex items-start justify-center gap-0">
            {[
              { title: lang === "en" ? "Enter Your Website" : "輸入您的網站", desc: lang === "en" ? "Share your current URL. Takes 30 seconds." : "分享您的網站URL。僅需30秒。" },
              { title: lang === "en" ? "Receive 2 Live Previews" : "收到2個即時預覽", desc: lang === "en" ? "We build two fully working website directions within 48 hours." : "48小時內我們建好兩個完全可運行的網站方向。" },
              { title: lang === "en" ? "Choose & Launch" : "選擇並上線", desc: lang === "en" ? "Pick your favorite. We launch it in 3 days." : "選擇您喜歡的。3天內上線。" },
            ].map((s, i) => (
              <div key={i} className="flex items-start">
                <div className="flex flex-col items-center text-center max-w-[200px]">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "hsl(275 51% 46%)" }}>
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-foreground font-display">{s.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
                {i < 2 && (
                  <div className="flex items-center px-3 pt-4">
                    <ArrowRight size={20} className="text-muted-foreground/25" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="mt-10 md:hidden space-y-6">
            {[
              { title: lang === "en" ? "Enter Your Website" : "輸入您的網站", desc: lang === "en" ? "Share your current URL. Takes 30 seconds." : "分享您的網站URL。僅需30秒。" },
              { title: lang === "en" ? "Receive 2 Live Previews" : "收到2個即時預覽", desc: lang === "en" ? "We build two fully working website directions within 48 hours." : "48小時內建好兩個可運行的網站方向。" },
              { title: lang === "en" ? "Choose & Launch" : "選擇並上線", desc: lang === "en" ? "Pick your favorite. We launch it in 3 days." : "選擇您喜歡的。3天內上線。" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "hsl(275 51% 46%)" }}>
                  {i + 1}
                </span>
                <h3 className="mt-3 text-sm font-bold text-foreground font-display">{s.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. VALUE / BRAND POSITIONING ═══ */}
      <section className="py-20 md:py-28" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-black text-foreground font-display leading-tight">
            {lang === "en" ? "Let SwiftLift Do the Heavy Lifting for You" : "讓 SwiftLift 為您承擔繁重工作"}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground/80 font-medium">
            {lang === "en" ? "Create a Website That Your Customers Will Actually Love." : "創建一個您的客戶真正喜歡的網站。"}
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {lang === "en" ? "No guesswork. No wasted money. Just real results you can see before you commit." : "不用猜測。不浪費錢。只有在承諾之前就能看到的真實成果。"}
          </p>
          <button
            onClick={scrollToIntake}
            className="mt-8 rounded-full py-3.5 px-10 text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "hsl(275 51% 46%)" }}
          >
            {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
          </button>
        </div>
      </section>

      {/* ═══ 4. REAL BUSINESS TRANSFORMATIONS — 2-col carousel ═══ */}
      <section id="portfolio" className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display text-center">
            {lang === "en" ? "Real Businesses. Reimagined with SwiftLift." : "真實企業。SwiftLift 重新構想。"}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm text-center">
            {lang === "en" ? "See how an outdated website can become two stronger directions before you decide." : "看看過時的網站如何在您決定之前變成兩個更強的方向。"}
          </p>

          <div
            className="mt-10 relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={proofIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden border border-border bg-secondary/30 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left — Feature image */}
                  <div className="overflow-hidden rounded-l-2xl md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none">
                    <img
                      src={portfolioImages[proofIdx]}
                      alt={t(home.portfolioItems[proofIdx].name, lang)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Right — Testimonial card */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-lg md:text-xl font-bold text-foreground font-display">
                      {t(home.portfolioItems[proofIdx].name, lang)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t(home.portfolioItems[proofIdx].desc, lang)}
                    </p>

                    {/* Testimonial quote */}
                    <div className="mt-5">
                      <span className="text-3xl text-muted-foreground/30 leading-none font-serif">"</span>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        "{t(home.testimonialItems[proofIdx].text, lang)}"
                      </p>
                      <div className="mt-4">
                        <p className="text-sm font-bold text-foreground">{t(home.testimonialItems[proofIdx].name, lang)}</p>
                        <p className="text-xs text-muted-foreground">{t(home.testimonialItems[proofIdx].company, lang)}</p>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href="#"
                        className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: "hsl(199 89% 58%)" }}
                      >
                        Open Live Preview A
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: "hsl(199 89% 58%)" }}
                      >
                        Open Live Preview B
                      </a>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                      {t(home.builtWith, lang)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center mt-6 gap-4">
              <button onClick={prevProof} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
                <ChevronLeft size={16} className="text-muted-foreground" />
              </button>
              <div className="flex gap-1.5">
                {home.portfolioItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setProofIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === proofIdx ? "scale-125" : "opacity-30"}`}
                    style={{ background: i === proofIdx ? "hsl(0 0% 20%)" : "hsl(var(--muted-foreground))" }}
                  />
                ))}
              </div>
              <button onClick={nextProof} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
                <ChevronRightIcon size={16} className="text-muted-foreground" />
              </button>
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

      {/* ═══ 5. WHY SWIFTLIFT ═══ */}
      <section className="py-16 md:py-24" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display text-center">
            {lang === "en" ? "Why SwiftLift?" : "為什麼選擇 SwiftLift？"}
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-background p-6 md:p-7 hover:border-[hsl(275_51%_46%)]/20 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "hsl(275 51% 46% / 0.08)" }}
                  >
                    <Icon size={20} style={{ color: "hsl(275 51% 46%)" }} />
                  </div>
                  <h3 className="font-bold text-foreground font-display">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 6. PRICING ═══ */}
      <section id="pricing" className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display text-center">
            {lang === "en" ? "Simple, Transparent Pricing" : "簡單透明的定價"}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm text-center">
            {lang === "en" ? "Only upgrade once you've seen the preview and feel confident." : "只有在看過預覽並有信心後才升級。"}
          </p>

          {/* Single page note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              {lang === "en" ? "Need a single-page website? " : "需要單頁網站？ "}
              <span className="font-semibold text-foreground">
                {singlePagePlans.map((p, i) => (
                  <span key={i}>
                    {p.name}: {p.price}
                    {i < singlePagePlans.length - 1 ? " · " : ""}
                  </span>
                ))}
              </span>
            </p>
          </div>

          {/* Multi-page cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {multiPagePlans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border p-6 flex flex-col ${
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
                <h3 className="font-bold text-foreground font-display">{plan.name}</h3>
                <p className="text-3xl font-black text-foreground font-display mt-2">{plan.price}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToIntake}
                  className="mt-4 w-full rounded-full py-2.5 px-4 text-xs font-bold border-2 transition-all hover:opacity-80"
                  style={{ borderColor: "hsl(275 51% 46%)", color: "hsl(275 51% 46%)" }}
                >
                  {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
                </button>
              </div>
            ))}
          </div>

          {/* Secondary path */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              {lang === "en" ? "Need a brand new website instead?" : "需要全新網站嗎？"}{" "}
              <Link to="/custom-brief" className="font-semibold hover:underline" style={{ color: "hsl(275 51% 46%)" }}>
                {lang === "en" ? "Explore custom new website options" : "探索定制新網站選項"}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 7. FAQ ═══ */}
      <section className="py-16 md:py-24" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display text-center">
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
                    <span className="font-semibold text-foreground pr-4">{item.q}</span>
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
                        <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
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

      {/* ═══ 8. FINAL CTA ═══ */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, hsl(213 55% 22%) 0%, hsl(215 60% 16%) 50%, hsl(217 65% 12%) 100%)",
        }}
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(209 70% 30% / 0.25), transparent)" }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.7rem,4.5vw,2.8rem)] font-black text-white font-display leading-tight">
            {lang === "en" ? "See What Your Website Could Become" : "看看您的網站可以變成什麼樣"}
          </h2>
          <p className="mt-4 text-white/55 text-base max-w-md mx-auto leading-relaxed">
            {lang === "en"
              ? "Get 2 free design previews and decide with confidence — before spending a dollar."
              : "獲取2個免費設計預覽，在花一分錢之前自信決策。"}
          </p>
          <div className="mt-10 max-w-xl mx-auto text-left">
            <MultiStepIntake variant="cta" />
          </div>
          <p className="mt-8 text-xs text-white/35 tracking-wide">
            {lang === "en"
              ? "No upfront payment · No obligation · Built for real business results"
              : "無預付款 · 無義務 · 為真實商業成果而構建"}
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
