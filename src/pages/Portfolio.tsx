import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ArrowRight, ExternalLink, Quote, Star } from "lucide-react";

import swiftliftReviewSlide from "@/assets/swiftlift-review-slide.webp";
import swiftliftFeature from "@/assets/swiftlift-feature-01.webp";

import portfolioChicagoA from "@/assets/portfolio-chicago-boxing-a.webp";
import portfolioChicagoB from "@/assets/portfolio-chicago-boxing-b.webp";
import portfolioDentalA from "@/assets/portfolio-friendly-dental-a.webp";
import portfolioDentalB from "@/assets/portfolio-friendly-dental-b.webp";
import portfolioHHNexusA from "@/assets/portfolio-hh-nexus-a.webp";
import portfolioHHNexusB from "@/assets/portfolio-hh-nexus-b.webp";
import portfolioHsinA from "@/assets/portfolio-hsin-hsin-a.webp";
import portfolioHsinB from "@/assets/portfolio-hsin-hsin-b.webp";
import portfolioNueraA from "@/assets/portfolio-nueranutra-a.webp";
import portfolioNueraB from "@/assets/portfolio-nueranutra-b.webp";
import portfolioOneParkA from "@/assets/portfolio-one-park-a.webp";
import portfolioOneParkB from "@/assets/portfolio-one-park-b.webp";
import portfolioPhoenixA from "@/assets/portfolio-phoenix-remodel-a.webp";
import portfolioPhoenixB from "@/assets/portfolio-phoenix-remodel-b.webp";
import portfolioPresoteaA from "@/assets/portfolio-presotea-a.webp";
import portfolioPresoteaB from "@/assets/portfolio-presotea-b.webp";
import portfolioStudio21A from "@/assets/portfolio-studio21-a.webp";
import portfolioStudio21B from "@/assets/portfolio-studio21-b.webp";
import portfolioStylesHairA from "@/assets/portfolio-styles-hair-a.webp";
import portfolioStylesHairB from "@/assets/portfolio-styles-hair-b.webp";
import portfolioUnityTattooA from "@/assets/portfolio-unity-tattoo-a.webp";
import portfolioUnityTattooB from "@/assets/portfolio-unity-tattoo-b.webp";
import portfolioWestsideA from "@/assets/portfolio-westside-medical-a.webp";
import portfolioWestsideB from "@/assets/portfolio-westside-medical-b.webp";
import portfolioYangHealthA from "@/assets/portfolio-yang-health-a.webp";
import portfolioYangHealthB from "@/assets/portfolio-yang-health-b.webp";

const portfolioConstruction = swiftliftFeature;
const portfolioDental = swiftliftFeature;
const portfolioTrade = swiftliftFeature;

/* ── Data ── */

interface FeaturedCase {
  company: string;
  industry: string;
  description: string;
  beforeSummary: string;
  previewA: string;
  previewB: string;
  selectedVersion: "A" | "B";
  selectedLabel: string;
  testimonial: string;
  testimonialAuthor: string;
  image: string;
}

const featuredCases: FeaturedCase[] = [
  {
    company: "Architect57",
    industry: "Construction",
    description: "A modern architecture firm redesign with two distinct directions: one clean professional layout and one stronger conversion-focused version.",
    beforeSummary: "Outdated layout, weak hierarchy, and a website that did not reflect the studio's design quality.",
    previewA: "architect-57-a.netlify.app",
    previewB: "architect-57-b.netlify.app",
    selectedVersion: "B",
    selectedLabel: "Version B — Conversion-Focused",
    testimonial:
      "Before SwiftLift, our website felt outdated and did not reflect the quality of our architecture work. The preview process made it very easy to compare two different directions side by side. Version A felt cleaner, but Version B gave us a stronger overall presentation and a more compelling first impression. The final result feels much more aligned with our brand.",
    testimonialAuthor: "Cary T., Architect",
    image: portfolioConstruction,
  },
  {
    company: "Gene's Sausage Shop",
    industry: "Specialty Food",
    description: "A specialty food business redesign with a cleaner structure, better visual storytelling, and a stronger product-first presentation.",
    beforeSummary: "An older site with limited visual impact, dated styling, and a weaker presentation of products and brand quality.",
    previewA: "genes-sausage-a.netlify.app",
    previewB: "genes-sausage-b.netlify.app",
    selectedVersion: "A",
    selectedLabel: "Version A — Clean Professional",
    testimonial:
      "The old website no longer matched the quality of our products or brand. SwiftLift gave us two real website versions to compare, which made the decision process much easier. The new design feels much more polished, organized, and professional. It presents our business in a way that finally feels current.",
    testimonialAuthor: "Sarah R., Owner",
    image: portfolioDental,
  },
  {
    company: "Art's Automotive",
    industry: "Auto Repair",
    description: "An automotive service website redesign focused on clearer communication, stronger trust signals, and a more modern customer experience.",
    beforeSummary: "Text-heavy layout, dated design, and a site structure that made services harder to understand quickly.",
    previewA: "arts-automotive-a.netlify.app",
    previewB: "arts-automotive-b.netlify.app",
    selectedVersion: "B",
    selectedLabel: "Version B — Conversion-Focused",
    testimonial:
      "Our previous site looked old and did not communicate our services clearly. SwiftLift helped us compare two different website directions before making a decision. The updated version feels much more professional, easier to navigate, and better structured for customers who need information fast. It is a major improvement over what we had before.",
    testimonialAuthor: "David L., Manager",
    image: portfolioTrade,
  },
];

interface GridCase {
  company: string;
  industry: string;
  description: string;
  previewA: string;
  previewB: string;
  imageA?: string;
  imageB?: string;
}

const gridCasesBase: GridCase[] = [
  { company: "Chicago Boxing Club", industry: "Boxing Gym", description: "High-energy fitness site designed to improve trial sign-ups and class discovery.", previewA: "https://chicagoboxingclub-preveiw-01.lovable.app/", previewB: "https://chicagoboxingclub-preveiw-02.lovable.app/", imageA: portfolioChicagoA, imageB: portfolioChicagoB },
  { company: "One Park Home", industry: "Real Estate", description: "Luxury real estate presentation with a more polished property-first experience.", previewA: "https://one-park-home-preview-01.lovable.app/", previewB: "https://one-park-home-concept-preview.lovable.app/", imageA: portfolioOneParkA, imageB: portfolioOneParkB },
  { company: "Friendly Dental Centre", industry: "Dental Clinic", description: "Modern dental website focused on trust, clarity, and stronger appointment conversion.", previewA: "https://friendly-dental-centre-preview.lovable.app/", previewB: "https://friendly-dental-preview-02.lovable.app/", imageA: portfolioDentalA, imageB: portfolioDentalB },
  { company: "Studio 21 Salon Spa", industry: "Salon & Spa", description: "Beauty-focused redesign with cleaner service presentation and more premium visual balance.", previewA: "https://studio-21-salon-spa-a.netlify.app/", previewB: "https://studio-21-salon-spa-b.netlify.app/", imageA: portfolioStudio21A, imageB: portfolioStudio21B },
  { company: "Presotea", industry: "Beverage Brand", description: "Franchise-style beverage website with stronger menu visibility and cleaner brand execution.", previewA: "https://presotea.bluluma.com/", previewB: "https://presotea-b.netlify.app/", imageA: portfolioPresoteaA, imageB: portfolioPresoteaB },
  { company: "Styles Hair Salon", industry: "Hair Salon", description: "Service-based salon redesign built for cleaner browsing and better appointment intent.", previewA: "https://styles-hair-salon-a.netlify.app/", previewB: "https://styles-hair-salon-b.netlify.app/", imageA: portfolioStylesHairA, imageB: portfolioStylesHairB },
  { company: "Yang Health Therapeutic", industry: "Wellness", description: "Calm, trust-focused wellness design with improved service clarity and stronger credibility.", previewA: "https://yang-health-therapeutic.bluluma.com/", previewB: "https://yang-health-therapeutic-b.netlify.app/", imageA: portfolioYangHealthA, imageB: portfolioYangHealthB },
  { company: "Unity Tattoo", industry: "Tattoo Studio", description: "Visual-first redesign with stronger portfolio presentation and better inquiry flow.", previewA: "https://unity-tattoo.bluluma.com/", previewB: "https://unity-tattoo-b.netlify.app/", imageA: portfolioUnityTattooA, imageB: portfolioUnityTattooB },
  { company: "Nuera Nutra", industry: "Nutrition", description: "Supplement brand concept with cleaner product structure and more modern trust signals.", previewA: "https://nueranutra.bluluma.com/", previewB: "https://nueranutra-preveiw-02.netlify.app/", imageA: portfolioNueraA, imageB: portfolioNueraB },
  { company: "Phoenix Remodel", industry: "Home Remodeling", description: "Contractor website redesign with clearer service hierarchy and stronger lead intent.", previewA: "https://phoenix-remodel-a.netlify.app/", previewB: "https://phoenix-remodel-b.netlify.app/", imageA: portfolioPhoenixA, imageB: portfolioPhoenixB },
  { company: "Westside Medical Associates", industry: "Medical", description: "Professional healthcare presentation with better structure and more trustworthy messaging.", previewA: "https://westside-medical-associates-a.netlify.app/", previewB: "https://westside-medical-associates-b.netlify.app/", imageA: portfolioWestsideA, imageB: portfolioWestsideB },
  { company: "HSIN HSIN", industry: "Trade Show & Branding", description: "Brand-forward business website with stronger positioning and cleaner corporate presentation.", previewA: "https://hsinhsin.ca/", previewB: "https://hsin-hsin-b.netlify.app/", imageA: portfolioHsinA, imageB: portfolioHsinB },
  { company: "HH Nexus Capital", industry: "Capital / Finance", description: "Corporate finance website with improved professionalism, hierarchy, and investor-facing clarity.", previewA: "https://hh-nexus-capital-a.netlify.app/", previewB: "https://hh-nexus-capital-b.netlify.app/", imageA: portfolioHHNexusA, imageB: portfolioHHNexusB },
];

/* Shuffle helper */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Featured Case Card — static image, no hover ── */
const FeaturedCaseCard = ({ c }: { c: FeaturedCase }) => (
  <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm flex flex-col h-full">
    <div className="aspect-[16/10] overflow-hidden">
      <img src={c.image} alt={c.company} className="w-full h-full object-cover" />
    </div>

    <div className="bg-[hsl(var(--surface-sunken))] px-5 py-4 border-b border-border">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))]">
        {c.industry}
      </span>
      <h3 className="text-base font-bold text-foreground mt-1">{c.company}</h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.description}</p>
    </div>

    <div className="p-5 space-y-4 flex-1 flex flex-col">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Before</p>
        <p className="text-xs text-muted-foreground italic">{c.beforeSummary}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <a
          href={`https://${c.previewA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#2DA8FF" }}
        >
          Open Live Preview A <ExternalLink className="w-2.5 h-2.5" />
        </a>
        <a
          href={`https://${c.previewB}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#2DA8FF" }}
        >
          Open Live Preview B <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      <div className="rounded-lg border border-[hsl(var(--accent-purple))]/20 bg-[hsl(var(--accent-purple))]/[0.03] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))] mb-1">
          Final Selected Version
        </p>
        <p className="text-xs font-bold text-foreground flex items-center gap-1">
          <Star className="w-3 h-3 fill-current text-[hsl(var(--accent-purple))]" />
          {c.selectedLabel}
        </p>
      </div>

      <div className="flex gap-2 pt-1 mt-auto">
        <Quote className="w-4 h-4 text-[hsl(var(--accent-purple))] shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-foreground leading-relaxed italic">"{c.testimonial}"</p>
          <p className="mt-1.5 text-[11px] font-semibold text-muted-foreground">{c.testimonialAuthor}</p>
        </div>
      </div>
    </div>
  </div>
);

/* ── Grid Case Card — desktop: hover swap | mobile: swipe + auto slideshow ── */
const SLIDESHOW_INTERVAL = 3000;
const SWIPE_THRESHOLD = 30;
const RESUME_DELAY = 5000;

const GridCaseCard = ({ c }: { c: GridCase }) => {
  const isMobile = useIsMobile();
  const [showVersion, setShowVersion] = useState<"A" | "B">("A");
  const imgA = c.imageA || swiftliftReviewSlide;
  const imgB = c.imageB || swiftliftFeature;
  const hasRealImages = !!(c.imageA && c.imageB);

  // Mobile: auto slideshow
  const pausedUntil = useRef(0);
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setShowVersion((v) => (v === "A" ? "B" : "A"));
    }, SLIDESHOW_INTERVAL);
    return () => clearInterval(id);
  }, [isMobile]);

  // Mobile: swipe gesture
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      setShowVersion((v) => (v === "A" ? "B" : "A"));
      pausedUntil.current = Date.now() + RESUME_DELAY;
    }
    touchStart.current = null;
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-[hsl(var(--accent-purple))]/30 group flex flex-col">
      <div
        className={`${hasRealImages ? "aspect-[3/4]" : "aspect-[16/10]"} overflow-hidden relative bg-muted`}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        {/* Version A image (default) */}
        <img
          src={imgA}
          alt={`${c.company} — Version A`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{
            opacity: showVersion === "A" ? 1 : 0,
            transform: showVersion === "A" ? "scale(1)" : "scale(1.015)",
            transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Version B image */}
        <img
          src={imgB}
          alt={`${c.company} — Version B`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{
            opacity: showVersion === "B" ? 1 : 0,
            transform: showVersion === "B" ? "scale(1)" : "scale(1.015)",
            transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Version badge */}
        <span className="absolute left-1/2 -translate-x-1/2 top-[14%] z-10 rounded-full bg-[#0a1e4a]/35 backdrop-blur-lg px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/90 shadow-md ring-1 ring-white/10 transition-all duration-300">
          {showVersion === "B" ? "Version B" : "Version A"}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))]">
          {c.industry}
        </span>
        <h3 className="text-sm font-bold text-foreground mt-1 mb-1">{c.company}</h3>
        <p className="text-xs text-muted-foreground mb-3">{c.description}</p>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <a
            href={c.previewA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#2DA8FF" }}
            onMouseEnter={!isMobile ? () => setShowVersion("A") : undefined}
          >
            Open Live Preview A <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href={c.previewB}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#2DA8FF" }}
            onMouseEnter={!isMobile ? () => setShowVersion("B") : undefined}
          >
            Open Live Preview B <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Page ── */
const PortfolioContent = () => {
  const [gridCases] = useState(() => shuffleArray(gridCasesBase));

  useEffect(() => {
    document.title = "Portfolio — SwiftLift | Real Website Transformations";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />

      {/* SECTION 1 — HERO */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block rounded-full bg-[hsl(var(--accent-purple))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))] mb-4">
            Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-foreground mb-3">
            Real Website Transformations
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Compare two preview versions. See what clients chose. Explore real results.
          </p>
          <p className="text-sm text-muted-foreground">
            From outdated websites to modern, high-performing experiences.
          </p>
        </div>
      </section>

      {/* SECTION 2 — FEATURED CASE STUDIES (static image only) */}
      <section className="pb-14 sm:pb-18 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">
            Featured Transformations
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            Full before → after breakdowns with preview versions and client feedback.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featuredCases.map((c) => (
              <FeaturedCaseCard key={c.company} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PORTFOLIO GRID (hover changes featured image) */}
      <section className="pb-14 sm:pb-18 px-4 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-6xl mx-auto pt-12 sm:pt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">
            More Projects
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            Hover over Preview A or B to see each direction. Click to open the live preview.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridCases.map((c) => (
              <GridCaseCard key={c.company} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
            Get Your 2 Free Website Previews
          </h2>
          <p className="text-muted-foreground mb-6">
            See your new website before making any payment.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--accent-purple))] px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-all"
          >
            Get My 2 Free Previews
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Portfolio = () => (
  <LanguageProvider>
    <PortfolioContent />
  </LanguageProvider>
);

export default Portfolio;
