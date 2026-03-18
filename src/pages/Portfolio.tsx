import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ArrowRight, ExternalLink, Quote, Star } from "lucide-react";

/* ── Mock Thumbnail Component ── */
const MockThumb = ({
  variant,
  industry,
  size = "md",
}: {
  variant: "A" | "B";
  industry: string;
  size?: "md" | "sm";
}) => {
  const isA = variant === "A";
  const h = size === "md" ? "h-28" : "h-20";

  return (
    <div
      className={`${h} w-full rounded-lg border border-border overflow-hidden relative`}
      style={{
        background: isA
          ? "linear-gradient(135deg, hsl(210 25% 97%) 0%, hsl(210 20% 93%) 100%)"
          : "linear-gradient(135deg, hsl(220 30% 96%) 0%, hsl(215 25% 90%) 100%)",
      }}
    >
      {/* Nav bar mock */}
      <div
        className="h-3 w-full flex items-center px-2 gap-1"
        style={{ background: isA ? "hsl(210 20% 18%)" : "hsl(220 35% 22%)" }}
      >
        <div className="w-1 h-1 rounded-full bg-white/30" />
        <div className="w-1 h-1 rounded-full bg-white/30" />
        <div className="w-1 h-1 rounded-full bg-white/30" />
      </div>

      {/* Content mock */}
      <div className="p-1.5 space-y-1">
        {isA ? (
          <>
            <div className="h-1.5 w-3/4 rounded-full bg-foreground/10" />
            <div className="h-1 w-1/2 rounded-full bg-foreground/6" />
            <div className="flex gap-1 mt-1">
              <div className="h-6 flex-1 rounded bg-foreground/5" />
              <div className="h-6 flex-1 rounded bg-foreground/5" />
            </div>
            <div className="h-1 w-2/3 rounded-full bg-foreground/6" />
          </>
        ) : (
          <>
            <div
              className="h-8 w-full rounded"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent-purple) / 0.12), hsl(var(--accent-blue) / 0.08))",
              }}
            />
            <div className="h-1.5 w-4/5 rounded-full bg-foreground/10" />
            <div className="h-3 w-1/3 rounded-full" style={{ background: "hsl(var(--accent-purple) / 0.2)" }} />
          </>
        )}
      </div>

      {/* Label */}
      <div className="absolute bottom-1 right-1">
        <span
          className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{
            background: isA ? "hsl(210 20% 18% / 0.7)" : "hsl(var(--accent-purple) / 0.8)",
            color: "white",
          }}
        >
          {isA ? "Clean" : "Convert"}
        </span>
      </div>
    </div>
  );
};

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
  liveUrl: string;
  testimonial: string;
  testimonialAuthor: string;
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
    liveUrl: "www.northbuildconstruction.com",
    testimonial:
      "SwiftLift completely transformed our website. The preview process made it easy to understand what we were getting before committing. We chose the conversion-focused version, and it represents our business far better than before.",
    testimonialAuthor: "Marcus T., Owner",
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
    liveUrl: "www.brightsmiledental.ca",
    testimonial:
      "The new design feels modern and professional. The preview helped us feel confident before moving forward.",
    testimonialAuthor: "Dr. Sarah L.",
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
    liveUrl: "www.precisionautorepairshop.com",
    testimonial: "Much clearer and more professional than our old site.",
    testimonialAuthor: "Jake R., Manager",
  },
];

interface GridCase {
  company: string;
  industry: string;
  description: string;
  previewA: string;
  previewB: string;
  liveUrl: string;
}

const gridCases: GridCase[] = [
  { company: "Skyline Realty", industry: "Real Estate", description: "Modern real estate website with improved listing flow.", previewA: "skylinerealty-preview-a.swiftlift.app", previewB: "skylinerealty-preview-b.swiftlift.app", liveUrl: "www.skylinerealtygroup.com" },
  { company: "Elite Fitness Studio", industry: "Fitness", description: "Clean layout designed to increase membership sign-ups.", previewA: "elitefitness-preview-a.swiftlift.app", previewB: "elitefitness-preview-b.swiftlift.app", liveUrl: "www.elitefitnessstudio.ca" },
  { company: "GreenScape Landscaping", industry: "Landscaping", description: "Clear service structure for local landscaping business.", previewA: "greenscape-preview-a.swiftlift.app", previewB: "greenscape-preview-b.swiftlift.app", liveUrl: "www.greenscapelandscaping.ca" },
  { company: "FreshBite Restaurant", industry: "Restaurant", description: "Menu-focused layout with improved mobile experience.", previewA: "freshbite-preview-a.swiftlift.app", previewB: "freshbite-preview-b.swiftlift.app", liveUrl: "www.freshbiterestaurant.com" },
  { company: "ClearView Accounting", industry: "Accounting", description: "Professional layout for financial services.", previewA: "clearview-preview-a.swiftlift.app", previewB: "clearview-preview-b.swiftlift.app", liveUrl: "www.clearviewaccounting.ca" },
  { company: "PureGlow Beauty", industry: "Beauty Salon", description: "Visual-focused design to showcase services and booking.", previewA: "pureglow-preview-a.swiftlift.app", previewB: "pureglow-preview-b.swiftlift.app", liveUrl: "www.pureglowbeauty.ca" },
  { company: "Apex Law Group", industry: "Law Firm", description: "Trust-focused layout for legal services.", previewA: "apexlaw-preview-a.swiftlift.app", previewB: "apexlaw-preview-b.swiftlift.app", liveUrl: "www.apexlawgroup.com" },
  { company: "ComfortAir HVAC", industry: "HVAC", description: "Service-driven structure for local HVAC business.", previewA: "comfortair-preview-a.swiftlift.app", previewB: "comfortair-preview-b.swiftlift.app", liveUrl: "www.comfortairhvacservices.com" },
  { company: "Spark Cleaning Services", industry: "Cleaning", description: "Simple, conversion-focused cleaning service website.", previewA: "sparkclean-preview-a.swiftlift.app", previewB: "sparkclean-preview-b.swiftlift.app", liveUrl: "www.sparkcleaningservices.ca" },
];

/* ── Featured Case Card (compact for 3-col) ── */
const FeaturedCaseCard = ({ c }: { c: FeaturedCase }) => (
  <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm flex flex-col h-full">
    {/* Header */}
    <div className="bg-[hsl(var(--surface-sunken))] px-5 py-4 border-b border-border">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))]">
        {c.industry}
      </span>
      <h3 className="text-base font-bold text-foreground mt-1">{c.company}</h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.description}</p>
    </div>

    <div className="p-5 space-y-4 flex-1 flex flex-col">
      {/* Before summary */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Before</p>
        <p className="text-xs text-muted-foreground italic">{c.beforeSummary}</p>
      </div>

      {/* Preview thumbnails */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">
            Version A{" "}
            {c.selectedVersion === "A" && (
              <span className="text-[hsl(var(--accent-purple))]">
                <Star className="w-2.5 h-2.5 inline fill-current" /> Selected
              </span>
            )}
          </p>
          <MockThumb variant="A" industry={c.industry} size="md" />
          <a
            href={`https://${c.previewA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 flex items-center justify-center gap-1 rounded-md border border-border px-2 py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-[hsl(var(--accent-purple))]/40 transition-all"
          >
            View Preview A <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">
            Version B{" "}
            {c.selectedVersion === "B" && (
              <span className="text-[hsl(var(--accent-purple))]">
                <Star className="w-2.5 h-2.5 inline fill-current" /> Selected
              </span>
            )}
          </p>
          <MockThumb variant="B" industry={c.industry} size="md" />
          <a
            href={`https://${c.previewB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 flex items-center justify-center gap-1 rounded-md border border-border px-2 py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-[hsl(var(--accent-purple))]/40 transition-all"
          >
            View Preview B <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Final result */}
      <div className="rounded-lg border border-[hsl(var(--accent-purple))]/20 bg-[hsl(var(--accent-purple))]/[0.03] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))] mb-1">
          Final Selected Version
        </p>
        <p className="text-xs font-bold text-foreground mb-2">{c.selectedLabel}</p>
        <a
          href={`https://${c.liveUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-[hsl(var(--accent-purple))] px-3.5 py-1.5 text-[11px] font-semibold text-white hover:opacity-90 transition-all"
        >
          View Live Website <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Testimonial */}
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

/* ── Grid Case Card ── */
const GridCaseCard = ({ c }: { c: GridCase }) => (
  <div className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-lg hover:border-[hsl(var(--accent-purple))]/30 group flex flex-col">
    <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))]">
      {c.industry}
    </span>
    <h3 className="text-sm font-bold text-foreground mt-1 mb-1">{c.company}</h3>
    <p className="text-xs text-muted-foreground mb-3">{c.description}</p>

    {/* Small thumbnails */}
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div>
        <p className="text-[9px] font-semibold text-muted-foreground mb-1">Version A</p>
        <MockThumb variant="A" industry={c.industry} size="sm" />
      </div>
      <div>
        <p className="text-[9px] font-semibold text-muted-foreground mb-1">Version B</p>
        <MockThumb variant="B" industry={c.industry} size="sm" />
      </div>
    </div>

    <div className="space-y-1.5 mt-auto">
      <div className="grid grid-cols-2 gap-1.5">
        <a
          href={`https://${c.previewA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-md border border-border px-2 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:border-[hsl(var(--accent-purple))]/40 transition-all"
        >
          View Preview A <ExternalLink className="w-2.5 h-2.5" />
        </a>
        <a
          href={`https://${c.previewB}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-md border border-border px-2 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:border-[hsl(var(--accent-purple))]/40 transition-all"
        >
          View Preview B <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
      <a
        href={`https://${c.liveUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[10px] font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
      >
        View Live Website <ExternalLink className="w-2.5 h-2.5" />
      </a>
    </div>
  </div>
);

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
            Compare two preview versions. See what clients chose. Explore real live websites.
          </p>
          <p className="text-sm text-muted-foreground">
            From outdated websites to modern, high-performing experiences.
          </p>
        </div>
      </section>

      {/* SECTION 2 — FEATURED CASE STUDIES (3 in one row on desktop) */}
      <section className="pb-14 sm:pb-18 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">
            Featured Transformations
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            Full before → after breakdowns with preview versions and live results.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featuredCases.map((c) => (
              <FeaturedCaseCard key={c.company} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PORTFOLIO GRID */}
      <section className="pb-14 sm:pb-18 px-4 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-6xl mx-auto pt-12 sm:pt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">
            More Projects
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            Browse preview versions and live websites across different industries.
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
            Get Your Free Website Preview
          </h2>
          <p className="text-muted-foreground mb-6">
            See your new website before making any payment.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--accent-purple))] px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-all"
          >
            Start My Preview
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
