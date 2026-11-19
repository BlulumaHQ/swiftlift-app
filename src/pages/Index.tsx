import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PRICING, formatPrice } from "@/lib/pricing";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Portfolio from "@/components/Portfolio";
import { Check, Plus, Star, ChevronLeft, ChevronRight as ChevronRightIcon, Shield, Loader2, CheckCircle2, Clock, Mail, Copy, Palette, Globe, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { externalSupabase as supabase } from "@/lib/externalSupabase";
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


import { SEO_ROUTES } from "@/lib/seoRoutes";
import { HOME_FAQS } from "@/lib/faqContent";

const PRELOADER_KEY = "swiftlift_visited";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
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
            lang === "en" ? "Classic Facelift — Clean & Professional" : "Classic Facelift — 簡潔專業",
            lang === "en" ? "Growth Facelift — Conversion Focused" : "Growth Facelift — 轉化導向",
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
  const [formLoadedAt] = useState(() => Date.now());
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedClientId, setSubmittedClientId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const isDark = variant === "cta";

  const isNarrow = typeof window !== "undefined" && window.innerWidth < 640;
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
    const em = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setEmailError(lang === "en" ? "Please enter a valid email address." : "請輸入有效的電子郵箱。");
      return;
    }
    setUrl(normalized);
    setEmail(em);
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
    const websiteHp = String(fd.get("website_hp") || "");
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

      const { error: leadsError } = await externalSupabase.from("leads").insert(leadsPayload);
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
            _t: formLoadedAt,
            website_hp: websiteHp,
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

      try {
        window.fbq?.("track", "Lead");
        window.gtag?.("event", "generate_lead", { form: "preview_request", source: variant });
        window.clarity?.("event", "lead_submitted");
      } catch { /* tracking is best-effort */ }

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
            placeholder={isNarrow ? (lang === "en" ? "yourbusiness.com" : "您的網址，如 yourbusiness.com") : (lang === "en" ? "Enter your website URL (e.g. yourbusiness.com)" : "輸入您的網站網址（例如 yourbusiness.com）")}
            className={`${inputBase}${urlError ? " border-red-400 focus:ring-red-400/30" : ""}`}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); submitStep1(); } }}
          />
          {urlError && <p className={`text-xs ${isDark ? "text-red-300" : "text-destructive"}`}>{urlError}</p>}
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setEmailError(""); }}
            placeholder={lang === "en" ? "Your email (where we send your previews)" : "您的電子郵箱（預覽寄送地址）"}
            className={`${inputBase}${emailError ? " border-red-400 focus:ring-red-400/30" : ""}`}
          />
          {emailError && <p className={`text-xs ${isDark ? "text-red-300" : "text-destructive"}`}>{emailError}</p>}
          <button
            type="submit"
            className="w-full rounded-full py-4 px-5 sm:px-8 text-sm font-bold leading-snug text-white text-balance transition-all hover:opacity-90 hover:scale-[1.01]"
            style={{ background: "hsl(275 51% 46%)" }}
          >
            {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
          </button>
          <p className={`text-[11px] text-center mt-2 ${isDark ? "text-white/35" : "text-muted-foreground/60"}`}>
            {lang === "en"
              ? "No credit card · No calls · Just your URL & email"
              : "無需信用卡 · 無需通話 · 只需網址和郵箱"}
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
          ? `Almost done. Your previews will go to ${email}. Tell us a bit about your business so we can tailor them.`
          : `快完成了。預覽將寄到 ${email}。告訴我們一些業務資訊，讓預覽更貼合您。`}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor="website_hp">Leave this field empty</label>
          <input type="text" id="website_hp" name="website_hp" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-white/70" : "text-foreground"}`}>
            {lang === "en" ? "Business Name" : "企業名稱"} <span className="text-destructive">*</span>
          </label>
          <input type="text" name="businessName" required placeholder={lang === "en" ? "Your business name" : "您的企業名稱"} className={inputBase} />
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
            className={`flex-1 rounded-full py-3.5 px-4 sm:px-8 text-sm font-bold leading-snug text-white transition-all hover:opacity-90 ${submitting ? "opacity-70 pointer-events-none" : ""}`}
            style={{ background: "hsl(275 51% 46%)" }}
          >
            {submitting ? (lang === "en" ? "Sending..." : "發送中...") : (lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽")}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

/* ── Guarantee badge ── */
const GuaranteeBadge = ({ lang, dark, className = "" }: { lang: string; dark?: boolean; className?: string }) => (
  <div className={`flex items-center justify-center gap-3 text-left ${className}`}>
    <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${dark ? "border-[hsl(275_51%_60%)]" : "border-[hsl(275_51%_46%)]"}`}>
      <Shield size={20} style={{ color: dark ? "hsl(275 51% 70%)" : "hsl(275 51% 46%)" }} />
    </div>
    <div>
      <p className={`text-sm font-bold ${dark ? "text-white" : "text-foreground"}`}>
        {lang === "en" ? "100% Satisfaction Guarantee" : "100% 滿意保證"}
      </p>
      <p className={`text-xs ${dark ? "text-white/60" : "text-muted-foreground"}`}>
        {lang === "en" ? "Preview first. Pay only if you love it." : "先看預覽。喜歡才付款。"}
      </p>
    </div>
  </div>
);

/* ── Founder photo (falls back to initials until /images/sony-lin.jpg is added) ── */
const FounderPhoto = () => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div
      className="w-28 h-28 rounded-full flex items-center justify-center text-2xl font-black text-white flex-shrink-0"
      style={{ background: "linear-gradient(135deg, hsl(275 51% 46%), hsl(214 58% 50%))" }}
    >
      SL
    </div>
  ) : (
    <img
      src="/images/sony-lin.jpg"
      alt="Sony Lin, founder of SwiftLift"
      width={112}
      height={112}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-28 h-28 rounded-full object-cover flex-shrink-0 shadow-md"
    />
  );
};

/* ── Sticky mobile CTA ── */
const StickyMobileCta = () => {
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("contact");
      const finalCta = document.getElementById("final-cta");
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      const atFinal = finalCta ? finalCta.getBoundingClientRect().top < window.innerHeight : false;
      setShow(pastHero && !atFinal);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 bg-background/95 backdrop-blur border-t border-border transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <button
        type="button"
        tabIndex={show ? 0 : -1}
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        className="w-full rounded-full py-3.5 px-5 text-sm font-bold text-white leading-snug"
        style={{ background: "hsl(275 51% 46%)" }}
      >
        {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
      </button>
    </div>
  );
};

/* ── Before → After (drop images into /public/images/before-after/before.jpg & after.jpg) ── */
const BeforeAfterImage = ({ src, label, after }: { src: string; label: string; after?: boolean }) => {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="flex-1 min-w-0">
      <div
        className={`relative aspect-[4/3] rounded-2xl overflow-hidden border ${after ? "border-[hsl(275_51%_46%)] shadow-xl" : "border-border"}`}
        style={{ background: after ? "hsl(275 51% 46% / 0.08)" : "#E5E7EB" }}
      >
        {!failed && (
          <img
            src={src}
            alt={label}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`absolute inset-0 w-full h-full object-cover object-top ${after ? "" : "grayscale-[60%]"}`}
          />
        )}
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${after ? "text-white" : "text-foreground bg-white/90"}`}
          style={after ? { background: "hsl(275 51% 46%)" } : {}}
        >
          {label}
        </span>
      </div>
    </figure>
  );
};

const BeforeAfter = () => {
  const { lang } = useLanguage();
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-center text-[clamp(1.6rem,3.5vw,2.4rem)] lg:text-[2rem] font-black text-foreground font-display">
          {lang === "en" ? "Same Business. Brand-New Website." : "同一家店，全新的網站。"}
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          {lang === "en" ? "We keep your content and give your site the facelift it deserves." : "保留您的內容，給網站應有的改頭換面。"}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <BeforeAfterImage src="/images/before-after/before.jpg" label={lang === "en" ? "BEFORE" : "改版前"} />
          <ArrowRight size={28} className="flex-shrink-0 rotate-90 sm:rotate-0" style={{ color: "hsl(275 51% 46%)" }} />
          <BeforeAfterImage src="/images/before-after/after.jpg" label={lang === "en" ? "AFTER" : "改版後"} after />
        </div>
      </div>
    </section>
  );
};

/* ── Main Page ── */
const IndexContent = ({ variant = "home" }: { variant?: "home" | "start" }) => {
  const { lang } = useLanguage();
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    document.title = SEO_ROUTES["/"].title;
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Version A & B plans (non-selection, informational only)
  const versionA = {
    title: "Classic Facelift",
    price: "$299 USD",
    description: lang === "en"
      ? "A clean, professional website designed to help you launch quickly and confidently."
      : "簡潔、專業的網站，幫助您快速自信地上線。",
    features: lang === "en"
      ? [
          "Clean, modern design",
          "Mobile responsive across all devices",
          "Up to 7 pages",
          "Basic SEO-ready structure",
          "Contact form included",
          "Live within 7 days of approval",
          "Free hosting (no monthly fees)",
          "2 rounds of revisions included",
        ]
      : [
          "簡潔、現代的設計",
          "所有裝置的行動響應式設計",
          "最多 7 個頁面",
          "基本 SEO 就緒結構",
          "包含聯絡表單",
          "確認後 7 天內上線",
          "免費託管（無月費）",
          "包含 2 輪修改",
        ],
  };

  const versionB = {
    title: "Growth Facelift",
    price: "$499 USD",
    description: lang === "en"
      ? "Designed to increase inquiries and turn more visitors into real customers."
      : "專為增加詢問並將更多訪客轉化為真正客戶而設計。",
    features: lang === "en"
      ? [
          "Everything in Classic Facelift",
          "Conversion-focused layout structure",
          "Strategic CTA placement for lead generation",
          "Optimized section flow to improve engagement",
          "Trust-building sections (reviews, credibility blocks)",
          "Clear, high-impact messaging structure",
          "Improved user journey and content hierarchy",
          "More refined and premium visual polish",
          "Stronger business positioning",
          "Priority build slot",
          "2 rounds of revisions included",
        ]
      : [
          "包含 Classic Facelift 的所有內容",
          "以轉化為重點的佈局結構",
          "策略性 CTA 佈置以產生潛在客戶",
          "優化的區塊流程以提升參與度",
          "信任建立區塊（評論、可信度區塊）",
          "清晰、高影響力的訊息結構",
          "改善的用戶旅程和內容層次",
          "更精緻和高端的視覺效果",
          "更強的商業定位",
          "優先建構時段",
          "包含 2 輪修改",
        ],
  };

  const reviewItems = [
    {
      text: lang === "en"
        ? <>We got two complete directions for our site before committing to anything. <strong>Seeing them side by side made it obvious which one fit how we talk to landowners and investors.</strong> The version we picked is the one live today.</>
        : <>在做任何決定之前，我們就收到了兩個完整的網站方向。<strong>並排比較之後，哪一個更適合我們跟地主和投資人溝通的方式，一目了然。</strong>我們選的那個版本就是現在上線的網站。</>,
      name: "Thomas Chen",
      company: "BTN Real Estate Services · Vancouver, BC",
      url: "https://btnpro.ca/",
      domain: "btnpro.ca",
    },
    {
      text: lang === "en"
        ? <>Our family business covers a lot — craftsmanship, art education, events — and I worried it would feel scattered online. <strong>The two versions showed me two clear ways to tell our story, and choosing was easy.</strong></>
        : <>我們的家族事業涵蓋很多面向——工藝、藝術教育、活動——我原本擔心放到網路上會顯得很雜亂。<strong>兩個版本給了我兩種清楚的說故事方式，選擇起來很容易。</strong></>,
      name: "Emily Lin",
      company: "HSIN HSIN · Vancouver, BC",
      url: "https://hsinhsin.ca/",
      domain: "hsinhsin.ca",
    },
    {
      text: lang === "en"
        ? <>Homeowners judge a builder by the photos. <strong>I compared two layouts on my phone, picked the one that showed off our houses best,</strong> and it went live without me having to deal with anything technical.</>
        : <>屋主都是看照片來判斷建商的。<strong>我直接在手機上比較兩個版面，選了最能展現我們房子的那一個，</strong>上線過程完全不用我處理任何技術問題。</>,
      name: "Kevin Chen",
      company: "K. Chen Construction Management · Vancouver, BC",
      url: "https://kchencm.com/",
      domain: "kchencm.com",
    },
    {
      text: lang === "en"
        ? <>Since the new website launched, <strong>our customers keep telling us how good it looks.</strong> Hearing that from them made me really happy — thank you for the professional design.</>
        : <>新網站上線之後，<strong>我們的客戶一直跟我們說網站很好看。</strong>聽到他們這樣說，我真的超開心——謝謝你專業的設計。</>,
      name: "Golden Chen",
      company: "NuEra Nutraceuticals",
      url: "https://nueranutra.com/",
      domain: "nueranutra.com",
    },
  ];

  const howSteps = [
    {
      title: lang === "en" ? "Submit your website" : "提交您的網站",
      desc: lang === "en" ? "Paste your current URL and email. Takes 30 seconds." : "貼上您現有的網址和郵箱，只需 30 秒。",
    },
    {
      title: lang === "en" ? "Get 2 live previews in 48 hours" : "48 小時內收到 2 個即時預覽",
      desc: lang === "en" ? "A Classic Facelift and a Growth Facelift — real sites you can click through. Preview links stay open for 72 hours." : "一個 Classic Facelift、一個 Growth Facelift——可以點擊瀏覽的真實網站。預覽連結開放 72 小時。",
    },
    {
      title: lang === "en" ? "Pick your favorite" : "選出您最喜歡的",
      desc: lang === "en" ? "One click. No payment yet." : "一鍵選擇，還不用付款。",
    },
    {
      title: lang === "en" ? "2 rounds of revisions" : "2 輪修改",
      desc: lang === "en" ? "Send all your changes through a simple online form." : "透過簡單的線上表單一次送出所有修改。",
    },
    {
      title: lang === "en" ? "Approve & pay" : "確認並付款",
      desc: lang === "en" ? "Pay only once you're happy. Then fill in a quick launch form (domain, hosting, email)." : "滿意了才付款，接著填一張簡短的上線表單（網域、主機、郵箱）。",
      highlight: true,
    },
    {
      title: lang === "en" ? "Go live" : "正式上線",
      desc: lang === "en" ? "Your new website is usually live within 7 days." : "新網站通常 7 天內上線。",
    },
  ];

  const faqItems = HOME_FAQS.map((f) => ({ q: f.q[lang], a: f.a[lang] }));


  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section
        id="contact"
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
        style={{ background: "#0f172a" }}
      >

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-center">
            {/* Left: Copy */}
            <div className="text-white pt-2 lg:pt-6">
              <h1 className="text-[1.85rem] md:text-[clamp(2.8rem,5.5vw,4.2rem)] lg:text-[clamp(2.8rem,4.5vw,3.6rem)] font-black leading-[1.08] lg:leading-[1.15] font-display tracking-tight">
                {variant === "start"
                  ? (lang === "en" ? (<>Your Website Exists.<br />Your Phone Should Be<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">Ringing More.</span></>) : (<>您的網站已存在。<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">您的電話應該響更多。</span></>))
                  : (lang === "en" ? (<>Your Old Website Is Costing You Customers.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">Get a Facelift in 48 Hours.</span></>) : (<>您的舊網站正在讓您流失客戶。<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">48 小時幫您改頭換面。</span></>))
                }
              </h1>

              <div className="mt-5 lg:mt-7 space-y-4 max-w-lg">
                <p className="text-lg md:text-xl lg:text-[1.25rem] font-medium text-white leading-[1.5] lg:leading-[1.6]">
                  {variant === "start"
                    ? (lang === "en"
                      ? "If your website isn't bringing in new customers every week, it's not doing its job. We rebuild what you already have — 2 complete, live versions ready in 48 hours. You pick the one you love. You only pay then."
                      : "如果您的網站沒有每週帶來新客戶，那它就沒有發揮作用。我們重建您已有的網站——48小時內準備好2個完整的即時版本。您選擇喜歡的那個。然後才付款。")
                    : (lang === "en"
                      ? "We rebuild your outdated site into 2 new versions. Love one? Pay. Don't? Walk away free."
                      : "我們把您過時的網站重建成 2 個全新版本。喜歡就付款，不喜歡就免費離開。")
                  }
                </p>
              </div>

              <p className="mt-4 text-sm text-white/50 lg:text-left text-center">
                {lang === "en"
                  ? "Built by a designer with 500+ websites and 20 years of experience"
                  : "由打造過500+個網站、擁有20年經驗的設計師親手製作"}
              </p>

            </div>

            {/* Right: Intake Form */}
            <div className="bg-background rounded-2xl p-7 md:p-10 border border-border/50 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] lg:mt-2">
              <h3 className="text-lg font-bold text-foreground font-display mb-1">
                {lang === "en" ? "Your 2 free previews — in 48 hours" : "48小時內收到您的2個免費預覽"}
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                {lang === "en" ? "See your new website before you pay. Takes 30 seconds." : "付款前先看到新網站。只需30秒。"}
              </p>
              <MultiStepIntake variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BEFORE → AFTER ═══ */}
      <BeforeAfter />

      {/* ═══ 2. HOW IT WORKS ═══ */}
      <section id="process" className="py-16 md:py-24 lg:py-28" style={{ background: "#F5F5F5" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] lg:text-[2rem] font-black text-foreground font-display">
            {lang === "en" ? "How It Works" : "如何運作"}
          </h2>
          <p className="mt-6 text-muted-foreground text-sm md:text-base text-center max-w-2xl mx-auto leading-relaxed">
            {lang === "en"
              ? "6 simple steps. You only pay at step 5 — once you're happy."
              : "6 個簡單步驟。您只在第 5 步、滿意之後才付款。"}
          </p>

          <ol className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-left">
            {howSteps.map((s, i) => (
              <li
                key={i}
                className={`rounded-2xl border bg-background p-5 md:p-6 flex items-start gap-4 ${s.highlight ? "border-[hsl(275_51%_46%)] shadow-md" : "border-border"}`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-black text-white flex-shrink-0 shadow-md"
                  style={{ background: "linear-gradient(135deg, hsl(275 51% 46%), hsl(214 58% 50%))" }}
                >
                  {i + 1}
                </div>
                <div className="pt-0.5">
                  <h3 className="text-[17px] md:text-lg font-bold text-foreground font-display leading-snug">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Portfolio variant="home" />

      {/* ═══ PRICING SECTION ═══ */}
      <section id="pricing" className="py-16 md:py-24 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Headline */}
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] lg:text-[2rem] font-black text-foreground font-display text-center">
            {lang === "en" ? "Simple, Transparent Pricing" : "簡單透明的定價"}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
            {lang === "en"
              ? "You'll see both versions. Pick one — pay only that price, only when you're happy."
              : "兩個版本您都會看到。選一個——只付那個價格，而且滿意了才付。"}
          </p>
          <p className="mt-3 text-sm text-muted-foreground text-center">
            {lang === "en" ? "Typical agency redesign: " : "一般 agency 改版："}
            <span className="line-through">$1,500–3,000</span>
          </p>

          {/* 2-column pricing table */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">

            {/* Version A */}
            <div className="order-1 rounded-2xl border border-border bg-background p-6 md:p-8 flex flex-col transition-shadow duration-300 hover:shadow-md">
              <h3 className="font-bold text-foreground font-display text-xl">{versionA.title}</h3>
              <p className="text-sm font-medium mt-2" style={{ color: "hsl(275 51% 46%)" }}>{versionA.description}</p>
              <p className="text-4xl font-black text-foreground font-display mt-3">{versionA.price}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {(showAllFeatures ? versionA.features : versionA.features.slice(0, 5)).map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
                    <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Version B — Most Popular */}
            <div className="order-2 relative rounded-2xl border border-border bg-background p-6 md:p-8 flex flex-col transition-shadow duration-300 hover:shadow-md">
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white tracking-wide"
                style={{ backgroundColor: "hsl(275 51% 46%)" }}
              >
                {lang === "en" ? "MOST POPULAR" : "最受歡迎"}
              </div>
              <h3 className="font-bold text-foreground font-display text-xl mt-2">{versionB.title}</h3>
              <p className="text-sm font-medium mt-2" style={{ color: "hsl(275 51% 46%)" }}>{versionB.description}</p>
              <p className="text-4xl font-black text-foreground font-display mt-3">{versionB.price}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {(showAllFeatures ? versionB.features : versionB.features.slice(0, 5)).map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
                    <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Show all features toggle */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllFeatures((v) => !v)}
              className="text-sm font-semibold hover:underline py-2 px-3"
              style={{ color: "hsl(275 51% 46%)" }}
            >
              {showAllFeatures
                ? (lang === "en" ? "Show fewer features" : "收起")
                : (lang === "en" ? "See all features" : "查看全部功能")}
            </button>
          </div>

          {/* Bottom Note */}
          <p className="text-center text-muted-foreground mt-10 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {lang === "en"
              ? "Both versions are included in your free preview. Pay only for the one you launch — after your revisions."
              : "兩個版本都包含在免費預覽中。只為您上線的版本付費——而且是修改完之後。"}
          </p>

          {/* Single centered CTA */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-200 active:scale-[0.97]"
              style={{ backgroundColor: "hsl(275 51% 46%)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(275 51% 38%)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsl(275 51% 46%)")}
            >
              {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
            </button>
          </div>
          <GuaranteeBadge lang={lang} className="mt-8" />



          {/* Hosting */}
          <div className="mt-16 pt-12 border-t border-border">
            <h3 className="text-center text-2xl md:text-[1.75rem] font-black text-foreground font-display">
              {lang === "en" ? "Free Hosting. Forever." : "主機託管，永久免費。"}
            </h3>
            <p className="mt-3 text-center text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              {lang === "en" ? "No monthly fees. No lock-in. Need a change? We make it for you." : "沒有月費，不綁約。需要修改？我們幫您改。"}
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              <div className="rounded-2xl border border-border bg-background p-6 flex flex-col">
                <h4 className="font-bold text-foreground font-display text-lg">{lang === "en" ? "Free Hosting" : "免費託管"}</h4>
                <p className="text-3xl font-black text-foreground font-display mt-2">$0</p>
                <ul className="mt-4 space-y-2 flex-1">
                  {(lang === "en"
                    ? ["Fast, secure hosting with SSL", "Edits: $45 each, whenever you need them", "Want your files? We'll send the full site"]
                    : ["快速、安全、含 SSL", "修改：每次 $45，需要時再付", "想要檔案？我們交付完整網站"]
                  ).map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-[15px] text-muted-foreground">
                      <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative rounded-2xl border-2 bg-background p-6 flex flex-col" style={{ borderColor: "hsl(275 51% 46%)" }}>
                <h4 className="font-bold text-foreground font-display text-lg">Care Plan</h4>
                <p className="text-3xl font-black text-foreground font-display mt-2">
                  $135<span className="text-base font-medium text-muted-foreground">/{lang === "en" ? "year" : "年"}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {lang === "en" ? "or $15/month · yearly saves $45" : "或 $15/月 · 年付省 $45"}
                </p>
                <ul className="mt-4 space-y-2 flex-1">
                  {(lang === "en"
                    ? ["Everything in Free Hosting", "Up to 2 small edits every month", "Swap photos, update text, change your hero style, re-layout existing pages", "Pays for itself after 3 edits"]
                    : ["包含免費託管的所有內容", "每月最多 2 次小修改", "換照片、改文字、換 Hero 樣式、重新排版現有頁面", "改 3 次就回本"]
                  ).map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-[15px] text-muted-foreground">
                      <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  {lang === "en" ? "Not included: new pages, new features, blog posts." : "不包含：新頁面、新功能、blog 文章。"}
                </p>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              {lang === "en" ? "Need something custom? Our Lead Designer takes custom projects at " : "需要客製化？我們的首席設計師在 "}
              <a href="https://sonykundesign.com/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: "hsl(275 51% 46%)" }}>
                Sonykun Design →
              </a>
              {lang === "en" ? "" : " 接客製化專案。"}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 4. TURN YOUR CURRENT WEBSITE INTO SOMETHING BETTER ═══ */}
      <section className="pt-4 pb-16 md:pt-8 md:pb-24 lg:pb-28" style={{ background: "#FFFFFF" }}>
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
      <section className="py-16 md:py-24 lg:py-28" style={{ background: "#F5F5F5" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] lg:text-[2rem] font-black text-foreground font-display text-center mb-10">
            {lang === "en" ? "What Our Clients Say" : "客戶評價"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch max-w-4xl mx-auto">
            {reviewItems.map((item, ci) => (
              <div key={ci} className="rounded-2xl border border-border bg-background p-6 md:p-7 shadow-sm flex flex-col">
                <p className="text-base text-foreground leading-relaxed font-medium flex-1">
                  "{item.text}"
                </p>
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-sm font-bold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.company}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline py-1"
                    style={{ color: "hsl(275 51% 46%)" }}
                  >
                    {lang === "en" ? `See the live site · ${item.domain}` : `查看上線網站 · ${item.domain}`}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. FOUNDER ═══ */}
      <section className="py-16 md:py-20" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <FounderPhoto />
            <div>
              <p className="text-xl md:text-2xl font-bold text-foreground font-display leading-snug">
                {lang === "en"
                  ? "\u201CI personally review every website before you see it.\u201D"
                  : "「每一個網站在您看到之前，我都會親自檢查。」"}
              </p>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                {lang === "en"
                  ? "SwiftLift is run by a real designer, not a template factory. I've built 500+ websites over 20 years for small businesses, clinics, contractors and restaurants — every SwiftLift preview gets the same care."
                  : "SwiftLift 由真正的設計師經營，不是模板工廠。20年來我為小企業、診所、營造商和餐廳打造了500+個網站——每一個 SwiftLift 預覽都用同樣的用心製作。"}
              </p>
              <p className="mt-4 text-sm font-bold text-foreground">Sony Lin <span className="font-normal text-muted-foreground">· {lang === "en" ? "Founder & Lead Designer" : "創辦人暨首席設計師"}</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. FAQ ═══ */}
      <section className="py-16 md:py-24 lg:py-28" style={{ background: "#FFFFFF" }}>
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
        id="final-cta"
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: "#0f172a" }}
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
          <GuaranteeBadge lang={lang} dark className="mt-10" />
        </div>
      </section>
      <StickyMobileCta />
    </main>
  );
};

export { IndexContent };

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
        <Header />
        <IndexContent />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
