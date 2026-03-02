import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { Check, ChevronDown, ArrowLeft, ArrowRight, Plus, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import portfolioTrade from "@/assets/portfolio-trade.jpg";
import portfolioWellness from "@/assets/portfolio-wellness-new.jpg";
import portfolioLaw from "@/assets/portfolio-law.jpg";
import portfolioConstruction from "@/assets/portfolio-construction.jpg";
import portfolioWholesale from "@/assets/portfolio-wholesale.jpg";
import portfolioLogistics from "@/assets/portfolio-logistics.jpg";

const PRELOADER_KEY = "swiftlift_visited";

/* ── Intake Form (reusable) ── */
const IntakeFormFields = ({
  plan,
  setPlan,
}: {
  plan: string;
  setPlan: (v: string) => void;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="plan" value={plan} />
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Business Name <span className="text-destructive">*</span>
        </label>
        <input type="text" name="businessName" required placeholder="Your business name" className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Current Website <span className="text-muted-foreground text-xs">(Optional)</span>
        </label>
        <input type="url" name="currentWebsite" placeholder="https://yourbusiness.com" className={inputClass} onBlur={autoPrefix} />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Email <span className="text-destructive">*</span>
        </label>
        <input type="email" name="email" required placeholder="you@email.com" className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Website You Like <span className="text-muted-foreground text-xs">(Optional)</span>
        </label>
        <input type="url" name="websiteYouLike" placeholder="https://example.com" className={inputClass} onBlur={autoPrefix} />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          When do you need your website? <span className="text-muted-foreground text-xs">(Optional)</span>
        </label>
        <select name="timeline" className={inputClass}>
          <option value="">Select an option</option>
          <option value="asap">As soon as possible</option>
          <option value="2weeks">Within 2 weeks</option>
          <option value="1month">Within a month</option>
          <option value="exploring">Just exploring</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className={`w-full btn-brand rounded-full py-4 px-10 text-base font-semibold ${submitting ? "opacity-70 pointer-events-none" : ""}`}
      >
        {submitting ? "Sending..." : "Generate My FREE Previews"}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        No spam. No sales calls. Just your previews.
      </p>
    </form>
  );
};

/* ── Portfolio data ── */
const portfolioItems = [
  { image: portfolioTrade, name: "Global Trade Co.", desc: "From outdated directory to modern export platform.", url: "#" },
  { image: portfolioWellness, name: "Serenity Wellness", desc: "Transformed a basic page into a booking-ready clinic site.", url: "#" },
  { image: portfolioLaw, name: "Carter & Associates", desc: "Rebuilt credibility with a clean professional law firm site.", url: "#" },
  { image: portfolioConstruction, name: "BuildRight Construction", desc: "Showcased past projects with a conversion-focused layout.", url: "#" },
  { image: portfolioWholesale, name: "Metro Wholesale", desc: "Organized product categories into a clear distributor site.", url: "#" },
  { image: portfolioLogistics, name: "Swift Logistics", desc: "Streamlined service pages for a fast-growing logistics company.", url: "#" },
];

/* ── Pricing plans ── */
const pricingPlans = [
  {
    name: "Launch",
    planCode: "L",
    features: ["1–2 Pages", "Clean Modern Design", "Mobile Responsive", "1 Free Revision", "Launch in 3 Days"],
    cta: "Select Launch",
    highlighted: false,
  },
  {
    name: "Growth",
    planCode: "G",
    features: ["3–7 Pages", "Structured Layout", "Mobile Responsive", "1 Free Revision", "Launch in 3 Days"],
    cta: "Select Growth",
    highlighted: true,
  },
  {
    name: "Conversion Architecture",
    planCode: "C",
    features: ["Up to 20 Pages", "Full Planning Phase", "Unlimited Revisions (Production Only)", "Structured Content Flow"],
    cta: "Request Custom Quote",
    highlighted: false,
  },
];

/* ── FAQ items ── */
const faqItems = [
  {
    q: "Is the preview really free?",
    a: "Yes. We build two website previews first.\nYou only pay if you decide to move forward.",
  },
  {
    q: "How long does it take to launch?",
    a: "Once you approve a preview,\nyour website goes live within 3 days.",
  },
  {
    q: "What if I need changes?",
    a: "Each package includes a defined revision structure.\nAdditional revisions are a fixed $25 per submission.",
  },
];

/* ── Main Page ── */
const Index = () => {
  const [showPreloader, setShowPreloader] = useState(() => !sessionStorage.getItem(PRELOADER_KEY));
  const [searchParams, setSearchParams] = useSearchParams();
  const [plan, setPlan] = useState(() => searchParams.get("plan") || "");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const intakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "SwiftLift — See Your Website Before You Pay";
  }, []);

  // Persist plan from URL
  useEffect(() => {
    const p = searchParams.get("plan");
    if (p) setPlan(p);
  }, [searchParams]);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    sessionStorage.setItem(PRELOADER_KEY, "1");
  }, []);

  const scrollToIntake = (planCode: string) => {
    setPlan(planCode);
    setSearchParams({ plan: planCode }, { replace: true });
    const el = document.getElementById("intake");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const prevSlide = () => setCarouselIdx((i) => (i === 0 ? portfolioItems.length - 1 : i - 1));
  const nextSlide = () => setCarouselIdx((i) => (i === portfolioItems.length - 1 ? 0 : i + 1));

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background scroll-smooth">
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        <CustomCursor />
        <Header />
        <main>
          {/* ═══ 1. HERO ═══ */}
          <section
            id="intake"
            className="relative pt-24 pb-16 md:pt-32 md:pb-20"
            style={{
              background: "linear-gradient(180deg, hsl(209 66% 22%) 0%, hsl(209 66% 18%) 100%)",
            }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left */}
                <div className="text-white pt-4">
                  <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] font-display">
                    See Your Website<br />Before You Pay.
                  </h1>
                  <p className="mt-4 text-white/70 text-base leading-relaxed max-w-md">
                    We build two previews first.<br />
                    You choose. We launch in 3 days.
                  </p>
                  <ul className="mt-6 space-y-2">
                    {["No upfront payment", "Fixed pricing", "3-day launch"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                        <Check size={16} className="text-white/60 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — Form */}
                <div ref={intakeRef} className="bg-background rounded-2xl p-6 md:p-8 border border-border/60 shadow-2xl">
                  <p className="text-xs text-muted-foreground mb-4">Takes less than 60 seconds.</p>
                  <IntakeFormFields plan={plan} setPlan={setPlan} />
                </div>
              </div>
            </div>
          </section>

          {/* ═══ 2. HOW IT WORKS ═══ */}
          <section className="py-16 md:py-20 bg-background">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display">
                How SwiftLift Works
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">A simple, predictable process.</p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { step: "1", title: "We Build Two Previews", desc: "We design two modern website previews tailored to your business." },
                  { step: "2", title: "You Choose & Approve", desc: "Pick the direction you prefer. Request small refinements if needed." },
                  { step: "3", title: "Launch in 3 Days", desc: "Once approved, your website goes live within 3 days." },
                ].map((s) => (
                  <div key={s.step} className="flex flex-col items-center text-center">
                    <span className="text-3xl font-black text-muted-foreground/30 font-display">{s.step}</span>
                    <h3 className="mt-2 text-base font-bold text-foreground font-display">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ 3. PROOF / PORTFOLIO ═══ */}
          <section className="py-16 md:py-20" style={{ background: "hsl(var(--surface-sunken))" }}>
            <div className="max-w-5xl mx-auto px-6 text-center">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display">
                Real Businesses. Built with SwiftLift.
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">Before and after — see the difference.</p>

              <div className="mt-10 relative">
                <button
                  onClick={prevSlide}
                  className="absolute -left-2 md:-left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-border bg-background shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Previous"
                >
                  <ArrowLeft size={18} className="text-foreground" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute -right-2 md:-right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-border bg-background shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Next"
                >
                  <ArrowRight size={18} className="text-foreground" />
                </button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={carouselIdx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <div className="rounded-2xl overflow-hidden border border-border shadow-lg max-w-2xl w-full">
                      <img
                        src={portfolioItems[carouselIdx].image}
                        alt={portfolioItems[carouselIdx].name}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground font-display">
                      {portfolioItems[carouselIdx].name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground max-w-md">
                      {portfolioItems[carouselIdx].desc}
                    </p>
                    <a
                      href={portfolioItems[carouselIdx].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                      style={{ color: "hsl(var(--accent-purple))" }}
                    >
                      View Live Website →
                    </a>
                  </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {portfolioItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === carouselIdx ? "bg-foreground scale-125" : "bg-foreground/20"}`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">Built with the SwiftLift System.</p>
            </div>
          </section>

          {/* ═══ 4. PRICING ═══ */}
          <section id="pricing" className="py-16 md:py-20 bg-background">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">Choose the structure that fits your business.</p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {pricingPlans.map((p) => (
                  <div
                    key={p.planCode}
                    className={`rounded-2xl flex flex-col border p-6 md:p-8 text-left relative h-full ${
                      p.highlighted
                        ? "bg-background border-border shadow-2xl border-t-4 md:-translate-y-2"
                        : "bg-background border-border shadow-sm"
                    }`}
                    style={p.highlighted ? { borderTopColor: "hsl(275 51% 46%)" } : {}}
                  >
                    {p.highlighted && (
                      <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 whitespace-nowrap"
                        style={{ background: "hsl(275 51% 46%)" }}
                      >
                        <Star size={13} className="fill-current" /> Most Popular
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-foreground font-display">{p.name}</h3>
                    <ul className="mt-4 space-y-2.5 flex-1">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => scrollToIntake(p.planCode)}
                      className={`mt-6 w-full rounded-full py-3 px-6 text-sm font-semibold transition-all ${
                        p.highlighted
                          ? "btn-brand"
                          : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {p.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ 5. FAQ ═══ */}
          <section className="py-16 md:py-20" style={{ background: "hsl(var(--surface-sunken))" }}>
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display text-center">
                Still Have Questions?
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
                            <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
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
                  View Full FAQ →
                </Link>
              </div>
            </div>
          </section>

          {/* ═══ 6. FINAL CTA ═══ */}
          <section
            className="py-16 md:py-20"
            style={{
              background: "linear-gradient(180deg, hsl(209 66% 30%) 0%, hsl(209 66% 18%) 100%)",
            }}
          >
            <div className="max-w-xl mx-auto px-6">
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-black text-white text-center font-display">
                Ready to See Your New Website?
              </h2>
              <p className="mt-2 text-white/60 text-sm text-center">
                Fill out the form. Get two free previews. No obligation.
              </p>
              <div className="mt-8 bg-background rounded-2xl p-6 md:p-8 border border-border/60 shadow-2xl">
                <IntakeFormFields plan={plan} setPlan={setPlan} />
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <MobileNav />
      </div>
    </LanguageProvider>
  );
};

export default Index;
