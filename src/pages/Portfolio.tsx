import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ArrowRight, ExternalLink, Quote, Star } from "lucide-react";

import portfolioConstruction from "@/assets/portfolio-construction.jpg";
import portfolioDental from "@/assets/portfolio-dental.jpg";
import portfolioTrade from "@/assets/portfolio-trade.jpg";
import portfolioRealestate from "@/assets/portfolio-realestate.jpg";
import portfolioWellness from "@/assets/portfolio-wellness-new.jpg";
import portfolioLaw from "@/assets/portfolio-law.jpg";
import portfolioRestaurant from "@/assets/portfolio-restaurant.jpg";
import portfolioWholesale from "@/assets/portfolio-wholesale.jpg";
import portfolioLogistics from "@/assets/portfolio-logistics.jpg";
import portfolioHomes from "@/assets/portfolio-homes.jpg";
import portfolioLegal from "@/assets/portfolio-legal.jpg";
import portfolioWellnessOld from "@/assets/portfolio-wellness.jpg";

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
    company: "NorthBuild Construction",
    industry: "Construction",
    description: "A local construction company with an outdated website and unclear service presentation.",
    beforeSummary: "Old cluttered layout, poor mobile experience, outdated visuals.",
    previewA: "northbuild-preview-a.swiftlift.app",
    previewB: "northbuild-preview-b.swiftlift.app",
    selectedVersion: "B",
    selectedLabel: "Version B — Conversion-Focused",
    testimonial:
      "Before SwiftLift, our website felt outdated and didn't represent the quality of our work at all. The preview process made it incredibly easy — we could compare two real directions side by side and choose what actually felt right. The final result has already brought in new inquiries we wouldn't have gotten before.",
    testimonialAuthor: "Marcus T., Owner",
    image: portfolioConstruction,
  },
  {
    company: "BrightSmile Dental",
    industry: "Dental Clinic",
    description: "A small dental clinic needing a clean and trustworthy online presence.",
    beforeSummary: "Outdated design, inconsistent branding, hard-to-read content.",
    previewA: "brightsmile-preview-a.swiftlift.app",
    previewB: "brightsmile-preview-b.swiftlift.app",
    selectedVersion: "A",
    selectedLabel: "Version A — Clean Professional",
    testimonial:
      "The preview helped us feel confident before moving forward. The new design is modern, professional, and patients have mentioned how much easier it is to navigate.",
    testimonialAuthor: "Dr. Sarah L.",
    image: portfolioDental,
  },
  {
    company: "Precision Auto Repair",
    industry: "Auto Repair",
    description: "Auto shop website lacking structure and clear service communication.",
    beforeSummary: "Text-heavy layout, no clear hierarchy, not mobile optimized.",
    previewA: "precisionauto-preview-a.swiftlift.app",
    previewB: "precisionauto-preview-b.swiftlift.app",
    selectedVersion: "B",
    selectedLabel: "Version B — Conversion-Focused",
    testimonial: "Much clearer and more professional than our old site. Customers can actually find what they need now.",
    testimonialAuthor: "Jake R., Manager",
    image: portfolioTrade,
  },
];

interface GridCase {
  company: string;
  industry: string;
  description: string;
  previewA: string;
  previewB: string;
  image: string;
  previewAImage: string;
  previewBImage: string;
}

const gridCases: GridCase[] = [
  { company: "Skyline Realty", industry: "Real Estate", description: "Modern real estate website with improved listing flow.", previewA: "skylinerealty-preview-a.swiftlift.app", previewB: "skylinerealty-preview-b.swiftlift.app", image: portfolioRealestate, previewAImage: portfolioRealestate, previewBImage: portfolioHomes },
  { company: "Elite Fitness Studio", industry: "Fitness", description: "Clean layout designed to increase membership sign-ups.", previewA: "elitefitness-preview-a.swiftlift.app", previewB: "elitefitness-preview-b.swiftlift.app", image: portfolioWellness, previewAImage: portfolioWellness, previewBImage: portfolioWellnessOld },
  { company: "GreenScape Landscaping", industry: "Landscaping", description: "Clear service structure for local landscaping business.", previewA: "greenscape-preview-a.swiftlift.app", previewB: "greenscape-preview-b.swiftlift.app", image: portfolioHomes, previewAImage: portfolioHomes, previewBImage: portfolioRealestate },
  { company: "FreshBite Restaurant", industry: "Restaurant", description: "Menu-focused layout with improved mobile experience.", previewA: "freshbite-preview-a.swiftlift.app", previewB: "freshbite-preview-b.swiftlift.app", image: portfolioRestaurant, previewAImage: portfolioRestaurant, previewBImage: portfolioWholesale },
  { company: "ClearView Accounting", industry: "Accounting", description: "Professional layout for financial services.", previewA: "clearview-preview-a.swiftlift.app", previewB: "clearview-preview-b.swiftlift.app", image: portfolioWholesale, previewAImage: portfolioWholesale, previewBImage: portfolioLogistics },
  { company: "PureGlow Beauty", industry: "Beauty Salon", description: "Visual-focused design to showcase services and booking.", previewA: "pureglow-preview-a.swiftlift.app", previewB: "pureglow-preview-b.swiftlift.app", image: portfolioWellnessOld, previewAImage: portfolioWellnessOld, previewBImage: portfolioWellness },
  { company: "Apex Law Group", industry: "Law Firm", description: "Trust-focused layout for legal services.", previewA: "apexlaw-preview-a.swiftlift.app", previewB: "apexlaw-preview-b.swiftlift.app", image: portfolioLaw, previewAImage: portfolioLaw, previewBImage: portfolioLegal },
  { company: "ComfortAir HVAC", industry: "HVAC", description: "Service-driven structure for local HVAC business.", previewA: "comfortair-preview-a.swiftlift.app", previewB: "comfortair-preview-b.swiftlift.app", image: portfolioLogistics, previewAImage: portfolioLogistics, previewBImage: portfolioConstruction },
  { company: "Spark Cleaning Services", industry: "Cleaning", description: "Simple, conversion-focused cleaning service website.", previewA: "sparkclean-preview-a.swiftlift.app", previewB: "sparkclean-preview-b.swiftlift.app", image: portfolioLegal, previewAImage: portfolioLegal, previewBImage: portfolioDental },
];

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

/* ── Grid Case Card — hover Preview A/B changes featured image ── */
const GridCaseCard = ({ c }: { c: GridCase }) => {
  const [displayImage, setDisplayImage] = useState(c.image);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-[hsl(var(--accent-purple))]/30 group flex flex-col">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={displayImage}
          alt={c.company}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))]">
          {c.industry}
        </span>
        <h3 className="text-sm font-bold text-foreground mt-1 mb-1">{c.company}</h3>
        <p className="text-xs text-muted-foreground mb-3">{c.description}</p>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <a
            href={`https://${c.previewA}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setDisplayImage(c.previewAImage)}
            onMouseLeave={() => setDisplayImage(c.image)}
            className="flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#2DA8FF" }}
          >
            Open Live Preview A <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href={`https://${c.previewB}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setDisplayImage(c.previewBImage)}
            onMouseLeave={() => setDisplayImage(c.image)}
            className="flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#2DA8FF" }}
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
