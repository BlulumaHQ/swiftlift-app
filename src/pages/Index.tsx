import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { Check, ChevronDown, ArrowRight, ArrowDown, Plus, Star, ChevronLeft, ChevronRight as ChevronRightIcon, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import portfolioTrade from "@/assets/portfolio-trade.jpg";
import portfolioWellness from "@/assets/portfolio-wellness-new.jpg";
import portfolioLaw from "@/assets/portfolio-law.jpg";
import portfolioConstruction from "@/assets/portfolio-construction.jpg";
import portfolioWholesale from "@/assets/portfolio-wholesale.jpg";
import portfolioLogistics from "@/assets/portfolio-logistics.jpg";

const PRELOADER_KEY = "swiftlift_visited";

const portfolioImages = [portfolioTrade, portfolioWellness, portfolioLaw, portfolioConstruction, portfolioWholesale, portfolioLogistics];

/* ── Intake Form (Hero version) ── */
const IntakeFormFields = ({
  plan,
  setPlan,
}: {
  plan: string;
  setPlan: (v: string) => void;
}) => {
  const { lang } = useLanguage();
  const home = translations.home;
  const [submitting, setSubmitting] = useState(false);
  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(275_51%_46%)]/30 focus:border-[hsl(275_51%_46%)] transition-all";

  const autoPrefix = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val && !val.startsWith("http://") && !val.startsWith("https://")) {
      e.target.value = "https://" + val;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mbdabbql", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fd.get("businessName"),
          email: fd.get("email"),
          subject: fd.get("businessName"),
          message: `Business: ${fd.get("businessName")}\nWebsite: ${fd.get("currentWebsite") || "N/A"}\nInspiration: ${fd.get("websiteYouLike") || "N/A"}\nTimeline: ${fd.get("timeline") || "N/A"}\nPlan: ${fd.get("plan") || "N/A"}`,
        }),
      });
      if (res.ok) window.location.assign("/thank-you");
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="hidden" name="plan" value={plan} />
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          {t(home.formBusinessName, lang)} <span className="text-destructive">*</span>
        </label>
        <input type="text" name="businessName" required placeholder={t(home.formBusinessNamePlaceholder, lang)} className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          {t(home.formCurrentWebsite, lang)} <span className="text-muted-foreground text-[10px]">{t(home.optional, lang)}</span>
        </label>
        <input type="url" name="currentWebsite" placeholder="https://yourbusiness.com" className={inputClass} onBlur={autoPrefix} />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          {t(home.formEmail, lang)} <span className="text-destructive">*</span>
        </label>
        <input type="email" name="email" required placeholder="you@email.com" className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          {t(home.formWebsiteYouLike, lang)} <span className="text-muted-foreground text-[10px]">{t(home.optional, lang)}</span>
        </label>
        <input type="url" name="websiteYouLike" placeholder="https://example.com" className={inputClass} onBlur={autoPrefix} />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          {t(home.formTimeline, lang)} <span className="text-muted-foreground text-[10px]">{t(home.optional, lang)}</span>
        </label>
        <select name="timeline" className={inputClass}>
          <option value="">{t(home.formSelectOption, lang)}</option>
          {home.formTimelineOptions.map((opt, i) => (
            <option key={i} value={t(opt, lang)}>{t(opt, lang)}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className={`w-full rounded-full py-3 px-8 text-sm font-semibold text-white transition-all ${submitting ? "opacity-70 pointer-events-none" : "hover:opacity-90"}`}
        style={{ background: "hsl(275 51% 46%)" }}
      >
        {submitting ? t(home.formSending, lang) : t(home.formSubmit, lang)}
      </button>
      <div className="text-[11px] text-muted-foreground text-center leading-relaxed whitespace-pre-line">
        {t(home.formDisclaimer, lang)}
      </div>
    </form>
  );
};

/* ── Footer Intake Form (dark compact) ── */
const FooterIntakeForm = ({
  plan,
  setPlan,
}: {
  plan: string;
  setPlan: (v: string) => void;
}) => {
  const { lang } = useLanguage();
  const home = translations.home;
  const [submitting, setSubmitting] = useState(false);
  const inputClass =
    "w-full rounded-lg border border-[rgba(255,255,255,0.15)] bg-white/5 px-3 py-2.5 text-sm text-[#D0D6DE] placeholder:text-[#9AA3AE] focus:outline-none focus:ring-1 focus:ring-[hsl(275_51%_46%)]/30 focus:border-[rgba(255,255,255,0.3)] transition-all";
  const selectClass =
    "w-full rounded-lg border border-[rgba(255,255,255,0.15)] bg-white/5 px-3 py-2.5 text-sm text-[#D0D6DE] placeholder:text-[#9AA3AE] focus:outline-none focus:ring-1 focus:ring-[hsl(275_51%_46%)]/30 focus:border-[rgba(255,255,255,0.3)] transition-all [&>option]:bg-white [&>option]:text-[#2B2F36] [&>option:hover]:bg-[#F3F4F6] [&>option:checked]:bg-[hsl(275_51%_46%_/_0.08)]";

  const autoPrefix = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val && !val.startsWith("http://") && !val.startsWith("https://")) {
      e.target.value = "https://" + val;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mbdabbql", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fd.get("businessName"),
          email: fd.get("email"),
          subject: fd.get("businessName"),
          message: `Business: ${fd.get("businessName")}\nWebsite: ${fd.get("currentWebsite") || "N/A"}\nInspiration: ${fd.get("websiteYouLike") || "N/A"}\nTimeline: ${fd.get("timeline") || "N/A"}\nPlan: ${fd.get("plan") || "N/A"}`,
        }),
      });
      if (res.ok) window.location.assign("/thank-you");
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="plan" value={plan} />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3">
        <input type="text" name="businessName" required placeholder={`${t(home.formBusinessName, lang)} *`} className={inputClass} />
        <input type="email" name="email" required placeholder={`${t(home.formEmail, lang)} *`} className={inputClass} />
        <input type="url" name="websiteYouLike" placeholder={t(home.formWebsiteYouLike, lang)} className={inputClass} onBlur={autoPrefix} />
        <button
          type="submit"
          disabled={submitting}
          className={`rounded-full py-2.5 px-6 text-sm font-semibold text-white whitespace-nowrap transition-all ${submitting ? "opacity-70 pointer-events-none" : "hover:opacity-90"}`}
          style={{ background: "hsl(275 51% 46%)" }}
        >
          {submitting ? t(home.formSending, lang) : t(home.formSubmit, lang)}
        </button>
      </div>
      <div className="mt-3">
        <select name="timeline" className={selectClass}>
          <option value="">{t(home.formTimeline, lang)}</option>
          {home.formTimelineOptions.map((opt, i) => (
            <option key={i} value={t(opt, lang)}>{t(opt, lang)}</option>
          ))}
        </select>
      </div>
      <p className="mt-3 text-[11px] text-white/40 text-center">
        {t(home.formDisclaimerShort, lang)}
      </p>
    </form>
  );
};

/* ── Main Page ── */
const IndexContent = () => {
  const { lang } = useLanguage();
  const home = translations.home;
  const [searchParams, setSearchParams] = useSearchParams();
  const [plan, setPlan] = useState(() => searchParams.get("plan") || "");
  const [proofIdx, setProofIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const intakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "SwiftLift — See Your Website Before You Pay";
  }, []);

  useEffect(() => {
    const p = searchParams.get("plan");
    if (p) setPlan(p);
  }, [searchParams]);

  const scrollToIntake = (planCode: string) => {
    setPlan(planCode);
    setSearchParams({ plan: planCode }, { replace: true });
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const prevProof = () => setProofIdx((i) => (i === 0 ? home.portfolioItems.length - 1 : i - 1));
  const nextProof = () => setProofIdx((i) => (i === home.portfolioItems.length - 1 ? 0 : i + 1));

  const pricingPlans = home.plans;

  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section
        id="contact"
        className="relative pt-24 pb-14 md:pt-32 md:pb-18 overflow-hidden"
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

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.55fr] gap-10 lg:gap-14 items-start">
            <div className="text-white pt-4 lg:pt-2">
              <h1 className="text-[2.6rem] md:text-[clamp(3.2rem,6.5vw,5.2rem)] font-black leading-[1.08] font-display tracking-tight whitespace-pre-line">
                {t(home.heroTitle, lang)}
              </h1>

              <p className="mt-3 text-lg md:text-xl font-semibold text-white/90">
                {t(home.heroSubShort, lang)}
              </p>

              <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed max-w-lg">
                {t(home.heroSub, lang)}
              </p>

              <ul className="mt-8 space-y-3">
                {home.heroBullets.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-base md:text-lg text-white/85">
                    <Check size={18} className="flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                    {t(item, lang)}
                  </li>
                ))}
              </ul>
            </div>

            <div ref={intakeRef} className="bg-background rounded-2xl p-5 md:p-6 border border-border/50 shadow-2xl lg:mt-10">
              <p className="text-[11px] text-muted-foreground mb-3">{t(home.formNote, lang)}</p>
              <IntakeFormFields plan={plan} setPlan={setPlan} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. HOW IT WORKS ═══ */}
      <section id="process" className="py-14 md:py-18 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display">
            {t(home.howItWorks, lang)}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">{t(home.howItWorksSub, lang)}</p>

          {/* Desktop */}
          <div className="mt-12 hidden md:flex items-start justify-center gap-0">
            {home.steps.map((s, i) => (
              <div key={i} className="flex items-start">
                <div className="flex flex-col items-center text-center max-w-[200px]">
                  <span className="text-3xl font-black text-muted-foreground/25 font-display">{i + 1}</span>
                  <h3 className="mt-2 text-base font-bold text-foreground font-display">{t(s.title, lang)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(s.desc, lang)}</p>
                </div>
                {i < 2 && (
                  <div className="flex items-center px-6 pt-3">
                    <ArrowRight size={32} className="text-muted-foreground/20" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="mt-10 md:hidden space-y-2">
            {home.steps.map((s, i) => (
              <div key={i}>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-black text-muted-foreground/25 font-display">{i + 1}</span>
                  <h3 className="mt-2 text-base font-bold text-foreground font-display">{t(s.title, lang)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{t(s.desc, lang)}</p>
                </div>
                {i < 2 && (
                  <div className="flex justify-center py-3">
                    <ArrowDown size={28} className="text-muted-foreground/20" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. PROOF SECTION ═══ */}
      <section id="portfolio" className="py-14 md:py-18" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display text-center">
            {t(home.portfolioTitle, lang)}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm text-center">{t(home.portfolioSub, lang)}</p>

          <div className="mt-10 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={proofIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-background rounded-2xl border border-border shadow-lg overflow-hidden"
              >
                <div className="relative group aspect-[4/3] overflow-hidden cursor-pointer">
                  <img
                    src={portfolioImages[proofIdx]}
                    alt={`${t(home.portfolioItems[proofIdx].name, lang)} - ${t(home.after, lang)}`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105 brightness-105 contrast-105 saturate-110"
                  />
                  <img
                    src={portfolioImages[proofIdx]}
                    alt={`${t(home.portfolioItems[proofIdx].name, lang)} - ${t(home.before, lang)}`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 group-hover:opacity-100 brightness-75 contrast-90 saturate-50 sepia-[0.15]"
                    style={{ filter: "brightness(0.7) contrast(0.85) saturate(0.4) sepia(0.15)" }}
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white px-2 py-1 rounded transition-opacity duration-300 group-hover:opacity-0">
                    {t(home.after, lang)}
                  </span>
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white/70 px-2 py-1 rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    {t(home.before, lang)}
                  </span>
                </div>

                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <Quote size={24} className="text-muted-foreground/15 mb-3" />
                    <p className="text-foreground text-sm leading-relaxed">
                      "{t(home.testimonialItems[proofIdx].text, lang)}"
                    </p>
                    <div className="mt-4">
                      <p className="font-semibold text-sm text-foreground">{t(home.testimonialItems[proofIdx].name, lang)}</p>
                      <p className="text-xs text-muted-foreground">{t(home.testimonialItems[proofIdx].company, lang)}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border">
                    <h3 className="text-base font-bold text-foreground font-display">{t(home.portfolioItems[proofIdx].name, lang)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t(home.portfolioItems[proofIdx].desc, lang)}</p>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                      style={{ color: "hsl(275 51% 46%)" }}
                    >
                      {t(home.viewLiveWebsite, lang)}
                    </a>
                    <p className="mt-3 text-[11px] text-muted-foreground">{t(home.builtWith, lang)}</p>
                  </div>
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
          </div>
        </div>
      </section>

      {/* ═══ 4. PRICING ═══ */}
      <section id="pricing" className="py-14 md:py-18 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display">
            {t(home.pricingTitle, lang)}
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">{t(home.pricingSub, lang)}</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {pricingPlans.map((p, idx) => {
              const isHighlighted = idx === 1;
              const planCodes = ["L", "G", "C"];
              return (
                <div
                  key={idx}
                  className={`rounded-2xl flex flex-col border p-6 md:p-8 text-left relative h-full ${
                    isHighlighted
                      ? "bg-background border-border shadow-2xl border-t-4 md:-translate-y-2"
                      : "bg-background border-border shadow-sm"
                  }`}
                  style={isHighlighted ? { borderTopColor: "hsl(275 51% 46%)" } : {}}
                >
                  {isHighlighted && (
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 whitespace-nowrap"
                      style={{ background: "hsl(275 51% 46%)" }}
                    >
                      <Star size={13} className="fill-current" /> {t(home.mostPopular, lang)}
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-foreground font-display">{t(p.name, lang)}</h3>
                  <p className="mt-1 text-2xl font-black text-foreground font-display">
                    {idx === 0 ? "$350" : idx === 1 ? "$550" : "$2,500+"}
                  </p>
                  <ul className="mt-4 space-y-2.5 flex-1">
                    {p.features[lang].map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollToIntake(planCodes[idx])}
                    className={`mt-6 w-full rounded-full py-3 px-6 text-sm font-semibold transition-all ${
                      isHighlighted
                        ? "text-white hover:opacity-90"
                        : "border-2 text-foreground hover:opacity-80"
                    }`}
                    style={isHighlighted
                      ? { background: "hsl(275 51% 46%)" }
                      : { borderColor: "hsl(275 51% 46%)", color: "hsl(275 51% 46%)" }
                    }
                  >
                    {t(p.cta, lang)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 5. FAQ ═══ */}
      <section className="py-14 md:py-18" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display text-center">
            {t(home.faqTitle, lang)}
          </h2>
          <div className="mt-10 space-y-3">
            {home.faqItems.map((item, i) => {
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
                    <span className="font-semibold text-foreground pr-4">{t(item.q, lang)}</span>
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
                        <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                          {t(item.a, lang)}
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
              {t(home.viewFullFaq, lang)}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 6. FINAL CTA ═══ */}
      <section
        className="py-12 md:py-16"
        style={{
          background: "linear-gradient(180deg, hsl(209 66% 18%) 0%, hsl(209 70% 14%) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-black text-white text-center font-display">
            {t(home.ctaTitle, lang)}
          </h2>
          <p className="mt-2 text-white/50 text-sm text-center">
            {t(home.ctaSub, lang)}
          </p>
          <div className="mt-8">
            <FooterIntakeForm plan={plan} setPlan={setPlan} />
          </div>
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
