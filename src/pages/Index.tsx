import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PRICING, formatPrice } from "@/lib/pricing";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Portfolio from "@/components/Portfolio";
import { ScrollShot } from "@/components/ScrollShot";
import genesBefore from "@/assets/portfolio-genes-before.webp";
import genesAfter from "@/assets/portfolio-genes-b.webp";
import a57Before from "@/assets/portfolio-architect57-before.webp";
import a57After from "@/assets/portfolio-architect57-b.webp";
import beforeKchen from "@/assets/before-kchen.webp";
import beforeLittleMountain from "@/assets/before-little-mountain.webp";
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
    oaiq?: (...args: unknown[]) => void;
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
          style={{ background: "hsl(267 55% 45% / 0.15)" }}
        >
          <CheckCircle2 size={32} style={{ color: "hsl(267 55% 45%)" }} />
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
          <Mail size={16} style={{ color: "hsl(267 55% 45%)" }} className="flex-shrink-0" />
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
              <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(267 55% 45%)" }} />
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
          className="sl-cta font-display inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-sm font-extrabold text-white transition-all"
          
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
                <Icon size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(267 55% 45%)" }} />
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
            className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${isDark ? "border-white/15 bg-white/5 text-white placeholder:text-white/30 focus:ring-[hsl(267_55%_45%)]/40" : "border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:ring-[hsl(267,55%,45%)]/40"}`}
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

  // Both intake forms now sit in white cards (hero and final CTA), so always use the light styling.
  const isDark = false;

    const inputBase = isDark
    ? "w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(267_55%_45%)]/40 focus:border-white/30 transition-all"
    : "w-full rounded-xl border-[1.5px] border-input bg-[#FBFAF7] px-4 py-3.5 text-base font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[hsl(267_55%_45%)]/30 focus:border-[hsl(267_55%_45%)] transition-all";

  const selectBase = isDark
    ? "w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(267_55%_45%)]/40 focus:border-white/30 transition-all [&>option]:bg-[hsl(209_66%_18%)] [&>option]:text-white"
    : "w-full rounded-xl border-[1.5px] border-input bg-[#FBFAF7] px-4 py-3.5 text-base font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[hsl(267_55%_45%)]/30 focus:border-[hsl(267_55%_45%)] transition-all";

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
        window.gtag?.("event", "conversion", { send_to: "AW-18591608238/nLS-CO_i78AdEK7blaFF" });
        window.oaiq?.("measure", "lead_created", { type: "customer_action" });
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
        <Loader2 size={32} className="animate-spin" style={{ color: "hsl(267 55% 45%)" }} />
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            {lang === "en" ? "Your website" : "您的網站"}
            <input
              type="text"
              inputMode="url"
              value={url}
              onChange={e => { setUrl(e.target.value); setUrlError(""); }}
              placeholder="yourbusiness.com"
              className={`${inputBase}${urlError ? " border-red-400 focus:ring-red-400/30" : ""}`}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); submitStep1(); } }}
            />
            {urlError && <span className="text-xs font-normal text-destructive">{urlError}</span>}
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            {lang === "en" ? "Your email" : "您的電子郵箱"}
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailError(""); }}
              placeholder="you@business.com"
              className={`${inputBase}${emailError ? " border-red-400 focus:ring-red-400/30" : ""}`}
            />
            {emailError && <span className="text-xs font-normal text-destructive">{emailError}</span>}
          </label>
        </div>
        <button
          type="submit"
          className="sl-cta mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-display text-[1.05rem] font-extrabold leading-snug text-balance"
        >
          {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
          <ArrowRight size={20} strokeWidth={2.6} aria-hidden="true" />
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {lang === "en"
            ? "No credit card · No calls · Just your URL & email"
            : "無需信用卡 · 無需通話 · 只需網址和郵箱"}
        </p>
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
            className={`sl-cta flex-1 rounded-2xl py-3.5 px-4 sm:px-8 font-display text-base font-extrabold leading-snug ${submitting ? "opacity-70 pointer-events-none" : ""}`}
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
  <div className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[0.95rem] ${className}`}>
    <Shield size={20} strokeWidth={2.2} aria-hidden="true" style={{ color: dark ? "hsl(var(--highlight))" : "hsl(var(--accent-purple))" }} />
    <span className={`font-bold ${dark ? "text-white" : "text-foreground"}`}>
      {lang === "en" ? "100% Satisfaction Guarantee" : "100% 滿意保證"}
    </span>
    <span className={dark ? "text-white/70" : "text-muted-foreground"}>
      · {lang === "en" ? "Preview first. Pay only if you love it." : "先看預覽。喜歡才付款。"}
    </span>
  </div>
);

/* ── Founder photo (falls back to initials if /images/sony-lin-swiftlift-lead-designer.webp is missing) ── */
const FounderPhoto = ({ size = "lg" }: { size?: "sm" | "lg" }) => {
  const [failed, setFailed] = useState(false);
  const cls = size === "sm"
    ? "w-10 h-10 rounded-full border-2 border-white shadow-[0_0_0_1px_hsl(var(--border))]"
    : "w-36 h-36 rounded-3xl -rotate-3 shadow-[0_14px_30px_-14px_rgba(14,20,36,0.45)]";
  return failed ? (
    <div className={`${cls} flex flex-shrink-0 items-center justify-center bg-[hsl(var(--accent-purple))] font-display font-black text-white`}>SL</div>
  ) : (
    <img
      src="/images/sony-lin-swiftlift-lead-designer.webp"
      alt="Sony Lin, founder of SwiftLift"
      width={size === "sm" ? 40 : 144}
      height={size === "sm" ? 40 : 144}
      loading={size === "sm" ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`${cls} flex-shrink-0 object-cover`}
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
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 bg-[hsl(var(--paper)/0.96)] backdrop-blur border-t border-border transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "max(0.9rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <button
        type="button"
        tabIndex={show ? 0 : -1}
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        className="sl-cta w-full min-h-[52px] rounded-2xl px-5 font-display text-base font-extrabold leading-snug"
      >
        {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
      </button>
    </div>
  );
};

/* ── Before / After tags ── */
const ShotTag = ({ after, lang, className = "" }: { after?: boolean; lang: string; className?: string }) => (
  <span
    className={`pointer-events-none absolute z-10 rounded-full px-3 py-1 font-display text-[0.72rem] font-extrabold tracking-[0.08em] ${after ? "bg-[hsl(var(--accent-purple))] text-white" : "border border-input bg-white text-foreground"} ${className}`}
  >
    {after ? (lang === "en" ? "AFTER" : "改版後") : (lang === "en" ? "BEFORE" : "改版前")}
  </span>
);

/* ── Hero visual: stacked before / after with the 48-hour sticker ── */
const HeroBeforeAfter = () => {
  const { lang } = useLanguage();
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[560px] sm:h-[520px]" aria-label={lang === "en" ? "Gene's Sausage Shop website, before and after" : "Gene's Sausage Shop 網站改版前後"} role="img">
      <figure className="absolute left-0 top-6 m-0 w-[58%] -rotate-[4deg] rounded-2xl bg-white p-2 shadow-[0_12px_30px_-12px_rgba(14,20,36,0.35)]">
        <img src={genesBefore} alt="" width={720} height={900} className="block h-[270px] w-full rounded-xl object-cover object-top grayscale-[85%] contrast-[0.9] sm:h-[380px]" />
        <ShotTag lang={lang} className="left-4 top-4" />
      </figure>
      <figure className="absolute right-0 top-0 m-0 w-[66%] rotate-2 rounded-[18px] border-2 border-[hsl(var(--accent-purple))] bg-white p-2 shadow-[0_30px_60px_-20px_hsl(var(--accent-purple)/0.45)]">
        <img src={genesAfter} alt="" width={720} height={900} className="block h-[320px] w-full rounded-xl object-cover object-top sm:h-[470px]" />
        <ShotTag after lang={lang} className="left-4 top-4" />
      </figure>
      <div aria-hidden="true" className="absolute bottom-0 left-[30%] flex h-[88px] w-[88px] -rotate-[10deg] flex-col items-center justify-center rounded-full bg-[hsl(var(--highlight))] font-display italic leading-none text-foreground shadow-[0_10px_24px_-10px_rgba(14,20,36,0.4)] sm:h-28 sm:w-28">
        <span className="text-[1.9rem] font-black sm:text-[2.4rem]">48</span>
        <span className="mt-0.5 text-[0.62rem] font-extrabold tracking-[0.06em] sm:text-xs">{lang === "en" ? "HOURS" : "小時"}</span>
      </div>
    </div>
  );
};

/* ── Before → After section (hover to scroll the full page) ── */
const CMS_SHOTS = "https://uzdjwpkgldzhnoxjeyrw.supabase.co/storage/v1/object/public/content-images/b237218e-d944-4af0-87b2-09379102e53e/portfolio";
const BA_CASES = [
  {
    key: "kchen",
    name: "K. Chen Construction",
    before: beforeKchen,
    after: `${CMS_SHOTS}/kchenconstruction/live-netlify-full.jpg?v=1794399032723`,
    url: "https://kchencm.com/",
  },
  {
    key: "littlemountain",
    name: "Little Mountain Dental",
    before: beforeLittleMountain,
    after: `${CMS_SHOTS}/littlemountaindental/live-netlify-full.jpg?v=1794399221721`,
    url: "https://littlemountaindental.ca/",
  },
  {
    key: "architect57",
    name: "Architect 57",
    before: a57Before,
    after: a57After,
    url: "https://architect57.com/",
  },
];

const BeforeAfter = () => {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);
  const c = BA_CASES[active];
  return (
    <section className="bg-[hsl(var(--ink))] px-6 py-20 text-white md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-[clamp(1.9rem,4vw,2.9rem)] font-black leading-tight">
          {lang === "en" ? <>Same Business. <span className="italic text-[hsl(var(--highlight))]">Brand-New Website.</span></> : <>同一家店，<span className="italic text-[hsl(var(--highlight))]">全新的網站。</span></>}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base text-white/75 md:text-lg">
          {lang === "en" ? "We keep your content and give your site the facelift it deserves." : "保留您的內容，給網站應有的改頭換面。"}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label={lang === "en" ? "Choose an example" : "選擇案例"}>
          {BA_CASES.map((item, i) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`min-h-11 rounded-full px-4 text-sm font-bold transition-colors ${i === active ? "bg-[hsl(var(--highlight))] text-foreground" : "border border-white/25 text-white/85 hover:bg-white/10"}`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-5 md:flex-row md:gap-6">
          <figure key={`${c.key}-before`} className="ss-shot-card relative m-0 w-full min-w-0 flex-1 overflow-hidden rounded-2xl bg-white/5 [&_img]:grayscale-[85%]">
            <ScrollShot src={c.before} alt={lang === "en" ? `${c.name} website before the SwiftLift facelift` : `${c.name} 改版前的網站`} wide />
            <ShotTag lang={lang} className="left-4 top-4" />
          </figure>
          <div aria-hidden="true" className="flex h-14 w-14 flex-shrink-0 rotate-90 items-center justify-center rounded-full bg-[hsl(var(--highlight))] text-foreground md:rotate-0">
            <ArrowRight size={26} strokeWidth={2.8} />
          </div>
          <a key={`${c.key}-after`} href={c.url} target="_blank" rel="noopener noreferrer" className="ss-shot-card relative block w-full min-w-0 flex-1 overflow-hidden rounded-2xl outline outline-[3px] outline-offset-4 outline-[#8B5CF6] focus-visible:outline-[hsl(var(--highlight))]">
            <ScrollShot src={c.after} alt={lang === "en" ? `${c.name} website after the SwiftLift facelift` : `${c.name} 改版後的網站`} wide />
            <ShotTag after lang={lang} className="left-4 top-4" />
          </a>
        </div>
        <p className="mt-5 text-center text-sm text-white/60">
          {lang === "en" ? "Hover a screenshot to scroll the full homepage." : "滑鼠移到截圖上可瀏覽完整首頁。"}
        </p>
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
        ? <>I highly recommend his web design and development services. <strong>He delivers not just a website, but a complete business solution designed to enhance your brand, generate leads, and support long-term growth.</strong> If you're considering upgrading your online presence, I am confident that you'll be impressed with both the process and the results.</>
        : <>我非常推薦他的網站設計與開發服務。<strong>他交付的不只是一個網站，而是一套完整的商業解決方案，能提升你的品牌、帶來潛在客戶，並支撐長期成長。</strong>如果你正考慮升級你的線上形象，我相信整個合作過程和最後的成果都會讓你印象深刻。</>,
      name: "Eric Kim",
      company: "Eric Kim Realty",
      url: "https://erickimrealty.com/",
      domain: "erickimrealty.com",
    },
    {
      text: lang === "en"
        ? <>We got two complete directions for our site before committing to anything. <strong>Seeing them side by side made it obvious which one fit how we talk to landowners and investors.</strong> The version we picked is the one live today.</>
        : <>在做任何決定之前，我們就收到了兩個完整的網站方向。<strong>並排比較之後，哪一個更適合我們跟地主和投資人溝通的方式，一目瞭然。</strong>我們選的那個版本就是現在上線的網站。</>,
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


  const sectionTitle = "font-display text-[clamp(1.9rem,4vw,2.9rem)] font-black leading-[1.1] tracking-tight text-foreground";
  const check = (color: string) => <Check size={18} strokeWidth={2.8} className="mt-0.5 flex-shrink-0" style={{ color }} aria-hidden="true" />;

  return (
    <main className="bg-background">
      {/* ═══ 1. HERO ═══ */}
      <section id="contact" className="relative overflow-hidden px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-3.5 text-[0.8rem] font-semibold">
              <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-[hsl(var(--highlight))] px-2.5 py-0.5 font-display font-extrabold italic">{lang === "en" ? "48 HRS" : "48 小時"}</span>
              <span>{lang === "en" ? "Your 2 free previews — in 48 hours" : "48小時內收到您的2個免費預覽"}</span>
            </div>
            <h1 className="mt-5 font-display text-[2.15rem] font-black leading-[1.04] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[3.15rem] xl:text-[3.4rem]">
              {variant === "start"
                ? (lang === "en" ? <>Your Website Exists. Your Phone Should Be <span className="sl-highlight italic text-[hsl(var(--accent-purple))]">Ringing More.</span></> : <>您的網站已存在。<span className="sl-highlight italic text-[hsl(var(--accent-purple))]">您的電話應該響更多。</span></>)
                : (lang === "en" ? <>Your Old Website Is Costing You Customers. <span className="sl-highlight italic text-[hsl(var(--accent-purple))]">Get a Facelift in 48 Hours.</span></> : <>您的舊網站正在讓您流失客戶。<span className="sl-highlight italic text-[hsl(var(--accent-purple))]">48 小時幫您改頭換面。</span></>)}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              {variant === "start"
                ? (lang === "en"
                  ? "If your website isn't bringing in new customers every week, it's not doing its job. We rebuild what you already have — 2 complete, live versions ready in 48 hours. You pick the one you love. You only pay then."
                  : "如果您的網站沒有每週帶來新客戶，那它就沒有發揮作用。我們重建您已有的網站——48小時內準備好2個完整的即時版本。您選擇喜歡的那個。然後才付款。")
                : (lang === "en"
                  ? "We rebuild your outdated site into 2 new versions. Love one? Pay. Don't? Walk away free."
                  : "我們把您過時的網站重建成 2 個全新版本。喜歡就付款，不喜歡就免費離開。")}
            </p>

            <div className="mt-7 max-w-xl rounded-[20px] border border-border bg-white p-4 shadow-[0_18px_40px_-18px_rgba(14,20,36,0.25)] sm:p-5">
              <p className="mb-3 text-sm text-muted-foreground">
                {lang === "en" ? "See your new website before you pay. Takes 30 seconds." : "付款前先看到新網站。只需30秒。"}
              </p>
              <MultiStepIntake variant="hero" />
            </div>

            <div className="mt-5 flex flex-col gap-3 text-sm text-foreground/75 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
              <div className="flex items-center gap-2.5">
                <FounderPhoto size="sm" />
                <span>{lang === "en" ? "Built by a designer with 500+ websites and 20 years of experience" : "由打造過500+個網站、擁有20年經驗的設計師親手製作"}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Shield size={18} strokeWidth={2.2} className="text-[hsl(var(--accent-purple))]" aria-hidden="true" />
                {lang === "en" ? "Preview first. Pay only if you love it." : "先看預覽。喜歡才付款。"}
              </div>
            </div>
          </div>

          <HeroBeforeAfter />
        </div>
      </section>

      {/* ═══ 2. BEFORE → AFTER ═══ */}
      <BeforeAfter />

      {/* ═══ 3. HOW IT WORKS ═══ */}
      <section id="process" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <div>
              <p className="sl-eyebrow text-sm">{lang === "en" ? "The process" : "流程"}</p>
              <h2 className={`mt-2 ${sectionTitle}`}>{lang === "en" ? "How It Works" : "如何運作"}</h2>
            </div>
            <p className="max-w-md text-base text-foreground/75 md:text-lg">
              {lang === "en" ? "6 simple steps. You only pay at step 5 — once you're happy." : "6 個簡單步驟。您只在第 5 步、滿意之後才付款。"}
            </p>
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
            {howSteps.map((s, i) => (
              <li
                key={i}
                className={`flex flex-col gap-2 rounded-[20px] border p-6 md:min-h-[200px] md:p-7 ${s.highlight ? "border-[hsl(var(--ink))] bg-[hsl(var(--ink))] text-white" : "border-border bg-white text-foreground"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`font-display text-[2.6rem] font-black italic leading-none md:text-5xl ${s.highlight ? "text-[hsl(var(--highlight))]" : "text-[hsl(var(--accent-purple))]"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.highlight && (
                    <span className="rounded-full bg-[hsl(var(--highlight))] px-2.5 py-1 font-display text-[0.7rem] font-extrabold tracking-[0.06em] text-foreground">
                      {lang === "en" ? "YOU PAY HERE" : "在這一步付款"}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-xl font-extrabold leading-snug">{s.title}</h3>
                <p className={`text-[0.95rem] leading-relaxed ${s.highlight ? "text-white/75" : "text-foreground/75"}`}>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ 4. PORTFOLIO (hover a preview to scroll the whole homepage) ═══ */}
      <Portfolio variant="home" />

      {/* ═══ 5. PRICING ═══ */}
      <section id="pricing" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className={`text-center ${sectionTitle}`}>{lang === "en" ? "Simple, Transparent Pricing" : "簡單透明的定價"}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-foreground/75 md:text-lg">
            {lang === "en"
              ? "You'll see both versions. Pick one — pay only that price, only when you're happy."
              : "兩個版本您都會看到。選一個——只付那個價格，而且滿意了才付。"}
          </p>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {lang === "en" ? "Typical agency redesign: " : "一般 agency 改版："}
            <span className="line-through">$1,500–3,000</span>
          </p>

          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-7">
            {/* Classic */}
            <div className="order-2 flex flex-col rounded-3xl border border-border bg-white p-7 md:order-1 md:p-9">
              <p className="font-display text-xs font-extrabold italic tracking-[0.08em] text-muted-foreground">{lang === "en" ? "VERSION A" : "版本 A"}</p>
              <h3 className="mt-1.5 font-display text-[1.75rem] font-black">{versionA.title}</h3>
              <p className="mt-2 text-[0.95rem] text-foreground/75">{versionA.description}</p>
              <p className="mt-6 font-display text-5xl font-black leading-none">$299 <span className="text-base font-bold text-muted-foreground">USD</span></p>
              <ul className="mt-7 flex-1 space-y-3">
                {(showAllFeatures ? versionA.features : versionA.features.slice(0, 5)).map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-[0.95rem]">{check("hsl(var(--accent-purple))")}{f}</li>
                ))}
              </ul>
            </div>
            {/* Growth — Most Popular */}
            <div className="relative order-1 flex flex-col rounded-3xl bg-[hsl(var(--ink))] p-7 text-white shadow-[0_30px_60px_-24px_hsl(var(--accent-purple)/0.6)] md:order-2 md:p-9">
              <span className="absolute -top-3.5 right-7 rounded-full bg-[hsl(var(--highlight))] px-3.5 py-1.5 font-display text-xs font-black italic tracking-[0.06em] text-foreground">
                {lang === "en" ? "MOST POPULAR" : "最受歡迎"}
              </span>
              <p className="font-display text-xs font-extrabold italic tracking-[0.08em] text-[#C4B1EE]">{lang === "en" ? "VERSION B" : "版本 B"}</p>
              <h3 className="mt-1.5 font-display text-[1.75rem] font-black">{versionB.title}</h3>
              <p className="mt-2 text-[0.95rem] text-white/75">{versionB.description}</p>
              <p className="mt-6 font-display text-5xl font-black leading-none">$499 <span className="text-base font-bold text-white/60">USD</span></p>
              <ul className="mt-7 flex-1 space-y-3">
                {(showAllFeatures ? versionB.features : versionB.features.slice(0, 5)).map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-[0.95rem]">{check("hsl(var(--highlight))")}{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllFeatures((v) => !v)}
              className="min-h-11 px-3 py-2 text-sm font-bold text-[hsl(var(--accent-purple))] hover:underline"
            >
              {showAllFeatures
                ? (lang === "en" ? "Show fewer features" : "收起")
                : (lang === "en" ? "See all features" : "查看全部功能")}
            </button>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-[0.95rem] leading-relaxed text-foreground/75">
            {lang === "en"
              ? "Both versions are included in your free preview. Pay only for the one you launch — after your revisions."
              : "兩個版本都包含在免費預覽中。只為您上線的版本付費——而且是修改完之後。"}
          </p>
          <div className="mt-6 flex justify-center">
            <button onClick={scrollToForm} className="sl-cta inline-flex min-h-14 items-center gap-2 rounded-2xl px-8 py-4 font-display text-lg font-extrabold">
              {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
              <ArrowRight size={20} strokeWidth={2.6} aria-hidden="true" />
            </button>
          </div>
          <GuaranteeBadge lang={lang} className="mt-6" />

          {/* Hosting */}
          <div className="mt-16 rounded-[28px] border border-border bg-white px-6 py-10 md:mt-20 md:px-10 md:py-12">
            <h3 className="text-center font-display text-[1.9rem] font-black md:text-[2.2rem]">
              {lang === "en" ? <>Free Hosting. <span className="italic text-[hsl(var(--accent-purple))]">Forever.</span></> : <>主機託管，<span className="italic text-[hsl(var(--accent-purple))]">永久免費。</span></>}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-foreground/75">
              {lang === "en" ? "No monthly fees. No lock-in. Need a change? We make it for you." : "沒有月費，不綁約。需要修改？我們幫您改。"}
            </p>
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col rounded-[20px] border border-border bg-background p-6">
                <h4 className="font-display text-lg font-extrabold">{lang === "en" ? "Free Hosting" : "免費託管"}</h4>
                <p className="mt-1 font-display text-4xl font-black">$0</p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {(lang === "en"
                    ? ["Fast, secure hosting with SSL", "Edits: $45 each, whenever you need them", "Want your files? We'll send the full site"]
                    : ["快速、安全、含 SSL", "修改：每次 $45，需要時再付", "想要檔案？我們交付完整網站"]
                  ).map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-[0.95rem] text-foreground/80">{check("hsl(var(--accent-purple))")}{b}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col rounded-[20px] border-2 border-[hsl(var(--accent-purple))] bg-white p-6">
                <h4 className="font-display text-lg font-extrabold">Care Plan</h4>
                <p className="mt-1 font-display text-4xl font-black">
                  $135<span className="text-base font-bold text-muted-foreground">/{lang === "en" ? "year" : "年"}</span>
                </p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {(lang === "en"
                    ? ["Everything in Free Hosting", "Up to 2 small edits every month", "Swap photos, update text, change your hero style, re-layout existing pages", "Pays for itself after 3 edits"]
                    : ["包含免費託管的所有內容", "每月最多 2 次小修改", "換照片、改文字、換 Hero 樣式、重新排版現有頁面", "改 3 次就回本"]
                  ).map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-[0.95rem] text-foreground/80">{check("hsl(var(--accent-purple))")}{b}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  {lang === "en" ? "Not included: new pages, new features, blog posts." : "不包含：新頁面、新功能、blog 文章。"}
                </p>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-foreground/75">
              {lang === "en" ? "Need something custom? Our Lead Designer takes custom projects at " : "需要客製化？我們的首席設計師在 "}
              <a href="https://sonykundesign.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-[hsl(var(--accent-purple))] hover:underline">
                Sonykun Design →
              </a>
              {lang === "en" ? "" : " 接客製化專案。"}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 6. WE WORK WITH WHAT YOU ALREADY HAVE ═══ */}
      <section className="bg-[hsl(var(--accent-purple))] px-6 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.1]">
              {lang === "en" ? "We Work With What You Already Have" : "我們在您現有的基礎上改版"}
            </h2>
            <p className="mt-4 text-lg text-white/85">
              {lang === "en" ? "No need to start from scratch — we upgrade what's already there." : "無需從頭開始——我們升級您已有的內容。"}
            </p>
            <p className="mt-3 text-base leading-relaxed text-white/85 md:text-lg">
              {lang === "en"
                ? "Wix and Squarespace give you a template and leave you to figure it out. We don't. We build a custom website for you — no templates, no guesswork. You just choose."
                : "Wix 和 Squarespace 給你一個模板，然後讓你自己摸索。我們不一樣。我們為您量身打造網站——沒有模板、沒有猜測。您只需選擇。"}
            </p>
          </div>
          <ul className="space-y-3">
            {[
              { en: "We rebuild your existing site into a better version", zh: "將您現有的網站重建為更好的版本" },
              { en: "No complicated migration or technical hassle", zh: "無複雜的搬遷或技術問題" },
              { en: "No hidden hosting fees — ever", zh: "永遠不收隱藏代管費用" },
              { en: "We guide the full setup, launch, and transition", zh: "全程協助設定、上線與切換" },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-base font-semibold md:text-lg">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--highlight))] text-foreground" aria-hidden="true">
                  <Check size={16} strokeWidth={3} />
                </span>
                {lang === "en" ? item.en : item.zh}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 7. REVIEWS ═══ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className={`mb-10 text-center md:mb-12 ${sectionTitle}`}>{lang === "en" ? "What Our Clients Say" : "客戶評價"}</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-5 md:grid-cols-2">
            {reviewItems.map((item, ci) => (
              <figure key={ci} className="m-0 flex flex-col rounded-[22px] border border-border bg-white p-6 md:p-7 md:[&:last-child:nth-child(odd)]:col-span-2">
                <blockquote className="m-0 flex-1 text-base leading-relaxed text-foreground">“{item.text}”</blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{item.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.company}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-9 items-center gap-1.5 text-sm font-bold text-[hsl(var(--accent-purple))] hover:underline">
                    {lang === "en" ? `See the live site · ${item.domain}` : `查看上線網站 · ${item.domain}`}
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. FOUNDER ═══ */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-7 rounded-[28px] border border-border bg-white p-7 text-center sm:flex-row sm:items-center sm:text-left md:p-10">
          <FounderPhoto />
          <div>
            <p className="font-display text-2xl font-black italic leading-snug md:text-[1.75rem]">
              {lang === "en" ? "“I personally review every website before you see it.”" : "「每一個網站在您看到之前，我都會親自檢查。」"}
            </p>
            <p className="mt-3 text-base leading-relaxed text-foreground/75">
              {lang === "en"
                ? "SwiftLift is run by a real designer, not a template factory. I've built 500+ websites over 20 years for small businesses, clinics, contractors and restaurants — every SwiftLift preview gets the same care."
                : "SwiftLift 由真正的設計師經營，不是模板工廠。20年來我為小企業、診所、營造商和餐廳打造了500+個網站——每一個 SwiftLift 預覽都用同樣的用心製作。"}
            </p>
            <p className="mt-4 text-sm font-bold text-foreground">Sony Lin <span className="font-normal text-muted-foreground">· {lang === "en" ? "Founder & Lead Designer" : "創辦人暨首席設計師"}</span></p>
          </div>
        </div>
      </section>

      {/* ═══ 9. FAQ ═══ */}
      <section className="border-t border-border bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className={`text-center ${sectionTitle}`}>{lang === "en" ? "Still Have Questions?" : "還有疑問？"}</h2>
          <div className="mt-10 space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = faqOpen === i;
              return (
                <div key={i} className={`overflow-hidden rounded-[18px] border-[1.5px] transition-colors ${isOpen ? "border-[hsl(var(--accent-purple))] bg-[#F7F2FD]" : "border-border bg-white"}`}>
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex min-h-14 w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-base font-bold text-foreground md:text-[1.05rem]">{item.q}</span>
                    <span aria-hidden="true" className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-[hsl(var(--accent-purple))] text-white" : "bg-background text-foreground"}`}>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="flex">
                        <Plus size={18} strokeWidth={2.6} />
                      </motion.span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <div className="px-5 pb-5 text-base leading-relaxed text-foreground/75">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link to="/faq" className="inline-flex min-h-11 items-center text-sm font-bold text-[hsl(var(--accent-purple))] hover:underline">
              {lang === "en" ? "View Full FAQ →" : "查看完整FAQ →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section id="final-cta" className="bg-[hsl(var(--ink))] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <img src="/images/swiftlift-logo-white.png" alt="" aria-hidden="true" width={130} height={54} loading="lazy" className="mx-auto h-12 w-auto opacity-90" />
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.2rem)] font-black leading-[1.05]">
            {lang === "en" ? <>We Build First. <span className="italic text-[hsl(var(--highlight))]">You Decide After.</span></> : <>我們先建站。<span className="italic text-[hsl(var(--highlight))]">您再決定。</span></>}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
            {lang === "en"
              ? "Get 2 free website versions and decide with confidence — before spending a dollar."
              : "獲取2個免費網站版本，在花一分錢之前自信決策。"}
          </p>
          <div className="mx-auto mt-9 max-w-xl rounded-[20px] bg-white p-4 text-left text-foreground sm:p-5">
            <MultiStepIntake variant="cta" />
          </div>
          <GuaranteeBadge lang={lang} dark className="mt-8" />
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
