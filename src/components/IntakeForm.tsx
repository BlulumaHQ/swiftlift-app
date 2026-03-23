import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Info, X, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { externalSupabase, generateClientId } from "@/lib/externalSupabase";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const Tooltip = ({ text }: { text: string }) => (
  <div className="relative group/tip inline-flex ml-1.5">
    <Info size={14} className="text-muted-foreground cursor-help" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-foreground text-background text-xs leading-relaxed opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all duration-200 z-20 shadow-lg pointer-events-none">
      {text}
    </div>
  </div>
);

const IntakeForm = () => {
  const { lang } = useLanguage();
  const intake = translations.intake;
  const fields = intake.fields;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLeadConfirm, setShowLeadConfirm] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-driven parallax for blurred circles
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const circleX = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { damping: 40, stiffness: 80 });
  const circleY = useSpring(useTransform(mouseY, [0, 1], [-6, 6]), { damping: 40, stiffness: 80 });
  const circleScale = useSpring(useTransform(mouseY, [0, 1], [1, 1.06]), { damping: 50, stiffness: 60 });
  const circle2X = useSpring(useTransform(mouseX, [0, 1], [5, -5]), { damping: 50, stiffness: 60 });
  const circle2Y = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { damping: 50, stiffness: 60 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  useEffect(() => {
    if (searchParams.get("lead") === "1") {
      setShowLeadConfirm(true);
      setSearchParams({}, { replace: true });
      window.scrollTo(0, 0);
      const timer = setTimeout(() => setShowLeadConfirm(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, setSearchParams]);

  const normalizeUrl = (val: string): string => {
    let v = val.trim().toLowerCase();
    if (!v) return "";
    if (!v.startsWith("http://") && !v.startsWith("https://")) {
      v = "https://" + v;
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Normalize website URL
    const websiteRaw = (formData.get("website") as string) || "";
    const website = websiteRaw ? normalizeUrl(websiteRaw) : "";

    try {
      const { error } = await supabase.functions.invoke("send-intake-confirmation", {
        body: {
          client_name: formData.get("name") as string,
          business_name: formData.get("subject") as string,
          client_email: formData.get("email") as string,
          website,
          service: formData.get("timeline") || "Preview Request",
          message: formData.get("message") || "",
          form_type: "preview",
        },
      });

      if (error) throw new Error(error.message || "Email sending failed");

      // Facebook Lead tracking
      if (typeof window.fbq !== "undefined") {
        window.fbq("track", "Lead");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(lang === "en" ? "Something went wrong. Please try again." : "出了點問題。請重試。");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <>
      <AnimatePresence>
        {showLeadConfirm && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[9998] flex items-center justify-center gap-3 px-6 py-3 text-sm font-medium"
            style={{ background: "hsl(209 66% 22%)", color: "#fff" }}
          >
            <span>
              {lang === "en"
                ? "Thank you — we received your request. You can expect your preview concepts within 48 hours."
                : "感謝您——我們已收到您的請求。您可以在48小時內收到預覽方案。"}
            </span>
            <button onClick={() => setShowLeadConfirm(false)} className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-16 md:py-24 pb-32 md:pb-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(209 66% 30%) 0%, hsl(209 66% 22%) 50%, hsl(209 66% 18%) 100%)",
      }}
    >
      {/* Blurred floating circles */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "hsl(275 51% 46% / 0.12)",
          filter: "blur(100px)",
          top: "-60px",
          right: "-80px",
          x: circleX,
          y: circleY,
          scale: circleScale,
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "hsl(275 51% 46% / 0.07)",
          filter: "blur(80px)",
          bottom: "40px",
          left: "-40px",
          x: circle2X,
          y: circle2Y,
        }}
      />

      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <motion.h2
            key={lang + "-intake-h"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white text-center font-display"
          >
            {t(intake.headline, lang)}
          </motion.h2>
          <motion.p
            key={lang + "-intake-p"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-center text-white/70 text-base max-w-xl mx-auto"
          >
            {t(intake.subheadline, lang)}
          </motion.p>
        </ScrollReveal>

        {submitted ? (
          <ScrollReveal>
            <div className="mt-10 bg-background rounded-3xl p-12 text-center border border-border shadow-xl">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
                <Check size={32} style={{ color: "hsl(275 51% 46%)" }} />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-display">
                {lang === "en"
                  ? "Thank you — we received your request."
                  : "感謝您——我們已收到您的請求。"}
              </h3>
              <p className="mt-3 text-muted-foreground">
                {lang === "en"
                  ? "You can expect your preview concepts within 48 hours."
                  : "您可以在48小時內收到預覽方案。"}
              </p>
              <a
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors"
                style={{ backgroundColor: "hsl(275 51% 46%)" }}
              >
                {lang === "en" ? "Back to Home" : "返回首頁"}
              </a>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="mt-10 bg-background rounded-3xl p-8 md:p-10 border border-border/60 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t(fields.name, lang)} <span className="text-destructive">*</span>
                  </label>
                  <input type="text" name="name" required placeholder={t(fields.namePlaceholder, lang)} className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t(fields.company, lang)} <span className="text-destructive">*</span>
                  </label>
                  <input type="text" name="subject" required placeholder={t(fields.companyPlaceholder, lang)} className={inputClass} />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t(fields.email, lang)} <span className="text-destructive">*</span>
                  </label>
                  <input type="email" name="email" required placeholder="you@email.com" className={inputClass} />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {t(fields.timeline, lang)} <span className="text-destructive">*</span>
                  </label>
                  <select name="timeline" required className={inputClass}>
                    <option value="">{lang === "en" ? "Select an option" : "请选择"}</option>
                    {fields.timelineOptions[lang].map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-foreground mb-1.5">
                    {t(fields.description, lang)}
                    <Tooltip text={t(fields.descriptionTooltip, lang)} />
                  </label>
                  <textarea name="message" required rows={3} placeholder={t(fields.descriptionPlaceholder, lang)} className={`${inputClass} resize-none`} />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-foreground mb-1.5">
                    {t(fields.url, lang)} <span className="text-muted-foreground ml-1 text-xs">{t(fields.urlOptional, lang)}</span>
                    <Tooltip text={t(fields.urlTooltip, lang)} />
                  </label>
                  <input type="text" inputMode="url" name="website" placeholder="Enter your website URL (e.g. yourbusiness.com)" className={inputClass} onBlur={e => { if (e.target.value) e.target.value = normalizeUrl(e.target.value); }} />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-foreground mb-1.5">
                    {t(fields.inspiration, lang)} <span className="text-muted-foreground ml-1 text-xs">{t(fields.inspirationOptional, lang)}</span>
                    <Tooltip text={t(fields.inspirationTooltip, lang)} />
                  </label>
                  <input type="text" inputMode="url" name="inspiration" placeholder="https://..." className={inputClass} onBlur={e => { if (e.target.value) e.target.value = normalizeUrl(e.target.value); }} />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-foreground mb-1.5">
                    {t(fields.logo, lang)} <span className="text-muted-foreground ml-1 text-xs">{t(fields.logoOptional, lang)}</span>
                    <Tooltip text={t(fields.logoTooltip, lang)} />
                  </label>
                  <input type="file" accept="image/*" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {lang === "en" ? "Or provide a cloud link in the description." : "或在描述中提供云端链接。"}
                  </p>
                </div>
              </div>
              {submitError && (
                <p className="mt-4 text-sm font-medium text-destructive">{submitError}</p>
              )}
              <MagneticButton
                as="button"
                type="submit"
                className={`mt-8 w-full btn-brand rounded-full py-4 px-10 text-base ${submitting ? "opacity-70 pointer-events-none" : ""}`}
              >
                {submitting
                  ? (lang === "en" ? "Sending..." : "发送中...")
                  : t(intake.submit, lang)}
              </MagneticButton>
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
    </>
  );
};

export default IntakeForm;
