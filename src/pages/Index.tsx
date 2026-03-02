import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
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

/* ── Intake Form (Hero version) ── */
const IntakeFormFields = ({
  plan,
  setPlan,
}: {
  plan: string;
  setPlan: (v: string) => void;
}) => {
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
          Business Name <span className="text-destructive">*</span>
        </label>
        <input type="text" name="businessName" required placeholder="Your business name" className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          Current Website <span className="text-muted-foreground text-[10px]">(Optional)</span>
        </label>
        <input type="url" name="currentWebsite" placeholder="https://yourbusiness.com" className={inputClass} onBlur={autoPrefix} />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          Email <span className="text-destructive">*</span>
        </label>
        <input type="email" name="email" required placeholder="you@email.com" className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          Website You Like <span className="text-muted-foreground text-[10px]">(Optional)</span>
        </label>
        <input type="url" name="websiteYouLike" placeholder="https://example.com" className={inputClass} onBlur={autoPrefix} />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground mb-1">
          When do you need your website? <span className="text-muted-foreground text-[10px]">(Optional)</span>
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
        className={`w-full rounded-full py-3 px-8 text-sm font-semibold text-white transition-all ${submitting ? "opacity-70 pointer-events-none" : "hover:opacity-90"}`}
        style={{ background: "hsl(275 51% 46%)" }}
      >
        {submitting ? "Sending..." : "Generate My FREE Previews"}
      </button>
      <div className="text-[11px] text-muted-foreground text-center leading-relaxed">
        No credit card required. No obligation.<br />
        No spam. No sales calls.
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
  const [submitting, setSubmitting] = useState(false);
  const inputClass =
    "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[hsl(275_51%_46%)]/50 focus:border-[hsl(275_51%_46%)]/60 transition-all";

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
        <input type="text" name="businessName" required placeholder="Business Name *" className={inputClass} />
        <input type="email" name="email" required placeholder="Email *" className={inputClass} />
        <input type="url" name="websiteYouLike" placeholder="Website You Like" className={inputClass} onBlur={autoPrefix} />
        <button
          type="submit"
          disabled={submitting}
          className={`rounded-full py-2.5 px-6 text-sm font-semibold text-white whitespace-nowrap transition-all ${submitting ? "opacity-70 pointer-events-none" : "hover:opacity-90"}`}
          style={{ background: "hsl(275 51% 46%)" }}
        >
          {submitting ? "Sending..." : "Generate My FREE Previews"}
        </button>
      </div>
      <div className="mt-3">
        <select name="timeline" className={inputClass}>
          <option value="">When do you need your website?</option>
          <option value="asap">As soon as possible</option>
          <option value="2weeks">Within 2 weeks</option>
          <option value="1month">Within a month</option>
          <option value="exploring">Just exploring</option>
        </select>
      </div>
      <p className="mt-3 text-[11px] text-white/40 text-center">
        No credit card required. No obligation.
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

/* ── Testimonials mapped to portfolio ── */
const testimonials = [
  { text: "SwiftLift delivered a stunning website in just 3 days. The preview process gave us total confidence before paying.", name: "James Mitchell", company: "Global Trade Co." },
  { text: "We went from an outdated site to a modern booking platform. The process was seamless and stress-free.", name: "Sarah Chen", company: "Serenity Wellness" },
  { text: "Professional, fast, and exactly what we needed. The two-preview approach made decision-making easy.", name: "David Carter", company: "Carter & Associates" },
  { text: "BuildRight's online presence finally matches the quality of our work. Highly recommend SwiftLift.", name: "Mike Torres", company: "BuildRight Construction" },
  { text: "Our distributor site is now clear, organized, and brings in new clients weekly.", name: "Linda Park", company: "Metro Wholesale" },
  { text: "Fast turnaround and clean design. SwiftLift understood our logistics business perfectly.", name: "Ryan Okafor", company: "Swift Logistics" },
];

/* ── Pricing plans ── */
const pricingPlans = [
  {
    name: "Launch",
    price: "$350",
    planCode: "L",
    features: ["1–2 Pages", "Clean Modern Design", "Mobile Responsive", "1 Free Revision", "Launch in 3 Days"],
    cta: "Claim My FREE Previews",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$550",
    planCode: "G",
    features: ["3–7 Pages", "Structured Layout", "Mobile Responsive", "1 Free Revision", "Launch in 3 Days"],
    cta: "Claim My FREE Previews",
    highlighted: true,
  },
  {
    name: "Conversion Architecture",
    price: "$2,500+",
    planCode: "C",
    features: ["Up to 20 Pages", "Full Planning Phase", "Unlimited Revisions (Production Only)", "Funnel-Based Page Structure"],
    cta: "Claim My FREE Previews",
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

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    sessionStorage.setItem(PRELOADER_KEY, "1");
  }, []);

  const scrollToIntake = (planCode: string) => {
    setPlan(planCode);
    setSearchParams({ plan: planCode }, { replace: true });
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const prevProof = () => setProofIdx((i) => (i === 0 ? portfolioItems.length - 1 : i - 1));
  const nextProof = () => setProofIdx((i) => (i === portfolioItems.length - 1 ? 0 : i + 1));

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background scroll-smooth">
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        <CustomCursor />
        <Header />
        <main>
          {/* ═══ 1. HERO ═══ */}
          <section
            id="contact"
            className="relative pt-24 pb-14 md:pt-32 md:pb-18 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, hsl(209 66% 16%) 0%, hsl(209 66% 12%) 100%)",
            }}
          >
            {/* Subtle mesh gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(275 51% 46% / 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, hsl(214 58% 60% / 0.04) 0%, transparent 50%)",
              }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.55fr] gap-10 lg:gap-14 items-start">
                {/* Left — dominant messaging */}
                <div className="text-white pt-4 lg:pt-8">
                  {/* Desktop headline: exactly 2 lines */}
                  <h1 className="hidden md:block text-[clamp(2.8rem,5.8vw,4.5rem)] font-black leading-[1.05] font-display tracking-tight">
                    See Your Website First.<br />
                    Pay Only If You Love It.
                  </h1>
                  {/* Mobile headline: 4-line break */}
                  <h1 className="md:hidden text-[2.4rem] font-black leading-[1.08] font-display tracking-tight">
                    See Your<br />
                    Website First.<br />
                    Pay Only<br />
                    If You Love It.
                  </h1>

                  <p className="mt-6 text-white/70 text-lg md:text-xl leading-relaxed max-w-lg">
                    We build two previews first.<br />
                    You choose. We launch in 3 days.
                  </p>

                  <ul className="mt-8 space-y-3">
                    {["No upfront payment", "Fixed pricing", "3-day launch"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-base md:text-lg text-white/85">
                        <Check size={18} className="flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — Compact Form */}
                <div ref={intakeRef} className="bg-background rounded-2xl p-5 md:p-6 border border-border/50 shadow-2xl">
                  <p className="text-[11px] text-muted-foreground mb-3">Takes less than 60 seconds.</p>
                  <IntakeFormFields plan={plan} setPlan={setPlan} />
                </div>
              </div>
            </div>
          </section>

          {/* ═══ 2. HOW IT WORKS ═══ */}
          <section id="process" className="py-14 md:py-18 bg-background">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display">
                How SwiftLift Works
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">A simple, predictable process.</p>

              {/* Desktop: horizontal with arrows */}
              <div className="mt-12 hidden md:flex items-start justify-center gap-0">
                {[
                  { step: "1", title: "We Build Two Previews", desc: "We design two modern website previews tailored to your business." },
                  { step: "2", title: "You Choose & Approve", desc: "Pick the direction you prefer. Request small refinements if needed." },
                  { step: "3", title: "Launch in 3 Days", desc: "Once approved, your website goes live within 3 days." },
                ].map((s, i) => (
                  <div key={s.step} className="flex items-start">
                    <div className="flex flex-col items-center text-center max-w-[200px]">
                      <span className="text-3xl font-black text-muted-foreground/25 font-display">{s.step}</span>
                      <h3 className="mt-2 text-base font-bold text-foreground font-display">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                    {i < 2 && (
                      <div className="flex items-center px-6 pt-3">
                        <ArrowRight size={32} className="text-muted-foreground/20" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: vertical with down arrows */}
              <div className="mt-10 md:hidden space-y-2">
                {[
                  { step: "1", title: "We Build Two Previews", desc: "We design two modern website previews tailored to your business." },
                  { step: "2", title: "You Choose & Approve", desc: "Pick the direction you prefer. Request small refinements if needed." },
                  { step: "3", title: "Launch in 3 Days", desc: "Once approved, your website goes live within 3 days." },
                ].map((s, i) => (
                  <div key={s.step}>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-3xl font-black text-muted-foreground/25 font-display">{s.step}</span>
                      <h3 className="mt-2 text-base font-bold text-foreground font-display">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
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

          {/* ═══ 3. PROOF SECTION — Full Card Carousel ═══ */}
          <section id="portfolio" className="py-14 md:py-18" style={{ background: "hsl(var(--surface-sunken))" }}>
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-foreground font-display text-center">
                Real Businesses. Built with SwiftLift.
              </h2>
              <p className="mt-2 text-muted-foreground text-sm text-center">Before and after — see the difference.</p>

              {/* Carousel */}
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
                    {/* Left: Image with before/after hover */}
                    <div className="relative group aspect-[4/3] overflow-hidden cursor-pointer">
                      {/* After image (default) */}
                      <img
                        src={portfolioItems[proofIdx].image}
                        alt={`${portfolioItems[proofIdx].name} - After`}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105 brightness-105 contrast-105 saturate-110"
                      />
                      {/* Before image (on hover) - duller */}
                      <img
                        src={portfolioItems[proofIdx].image}
                        alt={`${portfolioItems[proofIdx].name} - Before`}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 group-hover:opacity-100 brightness-75 contrast-90 saturate-50 sepia-[0.15]"
                        style={{ filter: "brightness(0.7) contrast(0.85) saturate(0.4) sepia(0.15)" }}
                      />
                      {/* Label */}
                      <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white px-2 py-1 rounded transition-opacity duration-300 group-hover:opacity-0">
                        After
                      </span>
                      <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white/70 px-2 py-1 rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        Before
                      </span>
                    </div>

                    {/* Right: Testimonial + project info */}
                    <div className="flex flex-col justify-between p-6 md:p-8">
                      {/* Testimonial */}
                      <div>
                        <Quote size={24} className="text-muted-foreground/15 mb-3" />
                        <p className="text-foreground text-sm leading-relaxed">
                          "{testimonials[proofIdx].text}"
                        </p>
                        <div className="mt-4">
                          <p className="font-semibold text-sm text-foreground">{testimonials[proofIdx].name}</p>
                          <p className="text-xs text-muted-foreground">{testimonials[proofIdx].company}</p>
                        </div>
                      </div>

                      {/* Project info */}
                      <div className="mt-6 pt-5 border-t border-border">
                        <h3 className="text-base font-bold text-foreground font-display">{portfolioItems[proofIdx].name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{portfolioItems[proofIdx].desc}</p>
                        <a
                          href={portfolioItems[proofIdx].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                          style={{ color: "hsl(275 51% 46%)" }}
                        >
                          View Live Website →
                        </a>
                        <p className="mt-3 text-[11px] text-muted-foreground">Built with the SwiftLift System.</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={prevProof}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex gap-2">
                    {portfolioItems.map((_, i) => (
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
                Simple, Transparent Pricing
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">No credit card required to see your previews.</p>

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
                    <p className="mt-1 text-2xl font-black text-foreground font-display">{p.price}</p>
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
                          ? "text-white hover:opacity-90"
                          : "border-2 text-foreground hover:opacity-80"
                      }`}
                      style={p.highlighted
                        ? { background: "hsl(275 51% 46%)" }
                        : { borderColor: "hsl(275 51% 46%)", color: "hsl(275 51% 46%)" }
                      }
                    >
                      {p.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ 5. FAQ ═══ */}
          <section className="py-14 md:py-18" style={{ background: "hsl(var(--surface-sunken))" }}>
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

          {/* ═══ 6. FINAL CTA — Dark Compact Footer Form ═══ */}
          <section
            className="py-12 md:py-16"
            style={{
              background: "linear-gradient(180deg, hsl(209 66% 18%) 0%, hsl(209 70% 14%) 100%)",
            }}
          >
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-black text-white text-center font-display">
                Ready to See Your New Website?
              </h2>
              <p className="mt-2 text-white/50 text-sm text-center">
                Fill out the form. Get two free previews. No obligation.
              </p>
              <div className="mt-8">
                <FooterIntakeForm plan={plan} setPlan={setPlan} />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
