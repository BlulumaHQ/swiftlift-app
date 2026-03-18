import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { Check, ChevronDown, ArrowRight, ArrowDown, Plus, Star, ChevronLeft, ChevronRight as ChevronRightIcon, Quote, Shield, Zap, Target, Users, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

import portfolioTrade from "@/assets/portfolio-trade.jpg";
import portfolioWellness from "@/assets/portfolio-wellness-new.jpg";
import portfolioLaw from "@/assets/portfolio-law.jpg";
import portfolioConstruction from "@/assets/portfolio-construction.jpg";
import portfolioWholesale from "@/assets/portfolio-wholesale.jpg";
import portfolioLogistics from "@/assets/portfolio-logistics.jpg";

const PRELOADER_KEY = "swiftlift_visited";

const portfolioImages = [portfolioTrade, portfolioWellness, portfolioLaw, portfolioConstruction, portfolioWholesale, portfolioLogistics];

/* ── Multi-Step Intake Form ── */
const MultiStepIntake = ({ variant = "hero" }: { variant?: "hero" | "cta" }) => {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

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
      // Must have a dot in hostname (reject "https://abc")
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
      // 1) Submit to Formspree
      const res = await fetch("https://formspree.io/f/mbdabbql", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: businessName,
          email: email,
          subject: businessName,
          message: `Business: ${businessName}\nWebsite: ${url}\nInspiration: ${websiteYouLike || "N/A"}\nTimeline: ${timeline || "N/A"}\nEmail: ${email}`,
        }),
      });

      // 2) Send Resend confirmation email via edge function (fire and forget)
      try {
        await supabase.functions.invoke("send-intake-confirmation", {
          body: {
            email,
            businessName,
            websiteUrl: url,
            timeline: timeline || "N/A",
            inspiration: websiteYouLike || "N/A",
          },
        });
      } catch (emailErr) {
        console.error("Email confirmation error:", emailErr);
      }

      if (res.ok) {
        try { sessionStorage.setItem("swiftlift_email", email); } catch {}
        window.location.assign("/thank-you");
      }
    } catch {
      // silent
    } finally {
      setSubmitting(false);
      setShowProcessing(false);
    }
  };

  const processingMessages = [
    lang === "en" ? "Reviewing your website..." : "正在審查您的網站...",
    lang === "en" ? "Preparing your preview request..." : "正在準備您的預覽請求...",
    lang === "en" ? "Organizing your project details..." : "正在整理您的項目細節...",
  ];

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
      price: "$299",
      features: lang === "en"
        ? ["Live website preview", "Clean professional layout", "Delivered with no risk", "Up to 7 pages", "Mobile responsive design", "SEO-friendly structure"]
        : ["即時網站預覽", "簡潔專業版面", "零風險交付", "最多7頁", "移動端響應式設計", "SEO友好結構"],
      highlighted: false,
    },
    {
      name: lang === "en" ? "Launch Ready" : "上線版",
      price: "$499",
      badge: lang === "en" ? "Most Popular" : "最受歡迎",
      features: lang === "en"
        ? ["Fully polished website", "Bug fixes and final content refinement", "Ready for real business use", "Up to 7 pages", "Mobile responsive design", "SEO-friendly structure"]
        : ["完全打磨的網站", "修復和最終內容優化", "適合實際商業使用", "最多7頁", "移動端響應式設計", "SEO友好結構"],
      highlighted: true,
    },
    {
      name: lang === "en" ? "Growth Optimized" : "成長版",
      price: "$799",
      features: lang === "en"
        ? ["Conversion-focused layout", "Optimized structure and stronger content flow", "Designed to generate more leads", "Up to 7 pages", "Mobile responsive design", "SEO-friendly structure"]
        : ["轉化導向版面", "優化結構和更強的內容流程", "設計以產生更多潛在客戶", "最多7頁", "移動端響應式設計", "SEO友好結構"],
      highlighted: false,
    },
  ];

  const singlePagePlans = [
    { name: lang === "en" ? "Preview" : "預覽版", price: "$199" },
    { name: lang === "en" ? "Launch" : "上線版", price: "$349" },
    { name: lang === "en" ? "Growth" : "成長版", price: "$549" },
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
              <h1 className="text-[2.4rem] md:text-[clamp(2.8rem,5.5vw,4.2rem)] font-black leading-[1.08] font-display tracking-tight">
                {lang === "en" ? "See Your New Website\nBefore You Pay" : "先看您的\n新網站\n再付款"}
              </h1>

              <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-lg">
                {lang === "en"
                  ? "Get 2 free website previews for your business before making any decision."
                  : "在做任何決定之前，獲取2個免費網站預覽。"}
              </p>
              <p className="mt-2 text-sm md:text-base text-white/60 leading-relaxed max-w-lg">
                {lang === "en"
                  ? "Compare two different design directions and choose what actually works for your customers."
                  : "比較兩個不同的設計方向，選擇真正適合您客戶的方案。"}
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  lang === "en" ? "2 preview versions to compare" : "2個預覽版本可比較",
                  lang === "en" ? "No upfront payment required" : "無需預付款",
                  lang === "en" ? "Upgrade only when you're ready" : "準備好了再升級",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm md:text-base text-white/85">
                    <Check size={16} className="flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Intake Form — stronger visual weight */}
            <div className="bg-background rounded-2xl p-7 md:p-10 border border-border/50 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] lg:mt-2">
              <h3 className="text-base font-bold text-foreground font-display mb-1">
                {lang === "en" ? "Start Your Free Preview" : "開始您的免費預覽"}
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                {lang === "en" ? "Enter your current website to get started." : "輸入您目前的網站以開始。"}
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
            {lang === "en" ? "A simple, low-risk way to upgrade your website." : "一種簡單、低風險的網站升級方式。"}
          </p>

          {/* Desktop */}
          <div className="mt-14 hidden md:flex items-start justify-center gap-0">
            {[
              { title: lang === "en" ? "Submit Your Current Website" : "提交您的當前網站", desc: lang === "en" ? "Enter your website URL to start your free preview request." : "輸入您的網站URL以開始免費預覽請求。" },
              { title: lang === "en" ? "Receive 2 Preview Directions" : "收到2個預覽方向", desc: lang === "en" ? "We create two homepage concepts so you can compare different directions before making any decision." : "我們創建兩個主頁概念，讓您在做任何決定前比較不同方向。" },
              { title: lang === "en" ? "Choose What Fits Best" : "選擇最適合的", desc: lang === "en" ? "Pick the version that feels right for your business, your audience, and your goals." : "選擇最適合您的業務、受眾和目標的版本。" },
              { title: lang === "en" ? "Upgrade When You're Ready" : "準備好了再升級", desc: lang === "en" ? "Move forward only when you're confident in the direction." : "只有在對方向有信心時才繼續。" },
            ].map((s, i) => (
              <div key={i} className="flex items-start">
                <div className="flex flex-col items-center text-center max-w-[200px]">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "hsl(275 51% 46%)" }}>
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-foreground font-display">{s.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
                {i < 3 && (
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
              { title: lang === "en" ? "Submit Your Current Website" : "提交您的當前網站", desc: lang === "en" ? "Enter your website URL to start your free preview request." : "輸入您的網站URL以開始免費預覽請求。" },
              { title: lang === "en" ? "Receive 2 Preview Directions" : "收到2個預覽方向", desc: lang === "en" ? "We create two homepage concepts so you can compare different directions." : "我們創建兩個主頁概念供您比較。" },
              { title: lang === "en" ? "Choose What Fits Best" : "選擇最適合的", desc: lang === "en" ? "Pick the version that feels right for your business." : "選擇最適合您業務的版本。" },
              { title: lang === "en" ? "Upgrade When You're Ready" : "準備好了再升級", desc: lang === "en" ? "Move forward only when you're confident." : "有信心時再繼續。" },
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

      {/* ═══ 4. REAL BUSINESS TRANSFORMATIONS — swipeable carousel ═══ */}
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-background rounded-2xl border border-border shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={portfolioImages[proofIdx]}
                    alt={home.portfolioItems[proofIdx].name.en}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <h3 className="text-lg font-bold text-foreground font-display">
                      {t(home.portfolioItems[proofIdx].name, lang)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(home.portfolioItems[proofIdx].desc, lang)}
                    </p>

                    <div className="mt-5">
                      <Quote size={20} className="text-muted-foreground/20 mb-2" />
                      <p className="text-foreground text-sm leading-relaxed">
                        "{t(home.testimonialItems[proofIdx].text, lang)}"
                      </p>
                      <p className="mt-2 text-xs font-semibold text-foreground">{t(home.testimonialItems[proofIdx].name, lang)}</p>
                      <p className="text-xs text-muted-foreground">{t(home.testimonialItems[proofIdx].company, lang)}</p>
                    </div>

                    {/* Open Live Preview links */}
                    <div className="mt-5 flex gap-3">
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: "#2DA8FF" }}
                      >
                        {lang === "en" ? "Open Live Preview A" : "打開即時預覽A"}
                      </a>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: "#2DA8FF" }}
                      >
                        {lang === "en" ? "Open Live Preview B" : "打開即時預覽B"}
                      </a>
                    </div>
                  </div>

                  <p className="mt-4 text-[11px] text-muted-foreground">
                    {lang === "en" ? "Built with the SwiftLift System." : "使用 SwiftLift 系統構建。"}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevProof}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {home.portfolioItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setProofIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === proofIdx ? "bg-foreground scale-125" : "bg-foreground/20"}`}
                  />
                ))}
              </div>
              <button
                onClick={nextProof}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Next project"
              >
                <ChevronRightIcon size={18} />
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground md:hidden">
              {lang === "en" ? "← Swipe to explore →" : "← 滑動查看 →"}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 5. WHY SWIFTLIFT ═══ */}
      <section className="py-16 md:py-24" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display text-center">
            {lang === "en" ? "Why SwiftLift" : "為什麼選擇 SwiftLift"}
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-background p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "hsl(275 51% 46% / 0.08)" }}
                  >
                    <Icon size={20} style={{ color: "hsl(275 51% 46%)" }} />
                  </div>
                  <h3 className="font-bold text-foreground font-display text-base">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 6. PRICING ═══ */}
      <section id="pricing" className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display">
            {lang === "en" ? "Simple Pricing. Start with a Preview." : "簡單定價。從預覽開始。"}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            {lang === "en" ? "See your direction first. Upgrade only when you're ready." : "先看方向。準備好了再升級。"}
          </p>

          {/* Multi-page label */}
          <p className="mt-12 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {lang === "en" ? "Multi-Page Website" : "多頁面網站"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "en" ? "Best for businesses that need a complete website presence" : "最適合需要完整網站形象的企業"}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {multiPagePlans.map((p, idx) => (
              <div
                key={idx}
                className={`rounded-2xl flex flex-col border p-6 md:p-8 text-left relative h-full ${
                  p.highlighted
                    ? "bg-background border-border shadow-2xl border-t-4 md:-translate-y-2"
                    : "bg-background border-border shadow-sm"
                }`}
                style={p.highlighted ? { borderTopColor: "hsl(275 51% 46%)" } : {}}
              >
                {p.badge && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 whitespace-nowrap"
                    style={{ background: "hsl(275 51% 46%)" }}
                  >
                    <Star size={13} className="fill-current" /> {p.badge}
                  </div>
                )}
                <h3 className="text-lg font-bold text-foreground font-display">{p.name}</h3>
                <p className="mt-1 text-3xl font-black text-foreground font-display">{p.price}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToIntake}
                  className={`mt-6 w-full rounded-full py-3 px-6 text-sm font-bold transition-all ${
                    p.highlighted
                      ? "text-white hover:opacity-90"
                      : "border-2 hover:opacity-80"
                  }`}
                  style={p.highlighted
                    ? { background: "hsl(275 51% 46%)" }
                    : { borderColor: "hsl(275 51% 46%)", color: "hsl(275 51% 46%)" }
                  }
                >
                  {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
                </button>
              </div>
            ))}
          </div>

          {/* One Page / Landing Page */}
          <div className="mt-16 pt-10 border-t border-border">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {lang === "en" ? "One Page Website / Landing Page" : "單頁面網站 / 登陸頁"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {lang === "en" ? "Best for simple businesses or quick online presentations." : "最適合簡單企業或快速線上展示。"}
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {singlePagePlans.map((sp, idx) => (
                <div key={idx} className="rounded-xl border border-border p-5 bg-background text-left">
                  <h4 className="text-base font-bold text-foreground font-display">{sp.name}</h4>
                  <p className="mt-1 text-xl font-black text-foreground font-display">{sp.price}</p>
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
