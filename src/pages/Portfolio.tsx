import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, ExternalLink, Quote, Monitor, Smartphone, Star } from "lucide-react";
import { motion } from "framer-motion";

/* ── Data ── */

interface FeaturedCase {
  company: string;
  industry: string;
  description: string;
  beforeDescription: string;
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
    beforeDescription: "Old cluttered layout, poor mobile experience, outdated visuals",
    previewA: "northbuild-preview-a.swiftlift.app",
    previewB: "northbuild-preview-b.swiftlift.app",
    selectedVersion: "B",
    selectedLabel: "Version B — Conversion-Focused",
    liveUrl: "www.northbuildconstruction.com",
    testimonial: "SwiftLift completely transformed our website. The preview process made it easy to understand what we were getting before committing. We chose the conversion-focused version, and it represents our business far better than before.",
    testimonialAuthor: "Marcus T., Owner",
  },
  {
    company: "BrightSmile Dental",
    industry: "Dental Clinic",
    description: "A small dental clinic needing a clean and trustworthy online presence.",
    beforeDescription: "Outdated design, inconsistent branding, hard-to-read content",
    previewA: "brightsmile-preview-a.swiftlift.app",
    previewB: "brightsmile-preview-b.swiftlift.app",
    selectedVersion: "A",
    selectedLabel: "Version A — Clean Professional",
    liveUrl: "www.brightsmiledental.ca",
    testimonial: "The new design feels modern and professional. The preview helped us feel confident before moving forward.",
    testimonialAuthor: "Dr. Sarah L.",
  },
  {
    company: "Precision Auto Repair",
    industry: "Auto Repair",
    description: "Auto shop website lacking structure and clear service communication.",
    beforeDescription: "Text-heavy layout, no clear hierarchy, not mobile optimized",
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

/* ── Components ── */

const VersionBadge = ({ label, selected }: { label: string; selected?: boolean }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
    selected
      ? "bg-[hsl(var(--accent-purple))] text-white"
      : "bg-secondary text-secondary-foreground"
  }`}>
    {selected && <Star className="w-3 h-3" />}
    {label}
  </span>
);

const PreviewLink = ({ url, label }: { url: string; label: string }) => (
  <a
    href={`https://${url}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-[hsl(var(--accent-purple))] hover:shadow-md"
  >
    <Monitor className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--accent-purple))] transition-colors" />
    <span>{label}</span>
    <ExternalLink className="w-3.5 h-3.5 ml-auto text-muted-foreground group-hover:text-[hsl(var(--accent-purple))] transition-colors" />
  </a>
);

/* ── Featured Case Card ── */
const FeaturedCaseCard = ({ c, index }: { c: FeaturedCase; index: number }) => (
  <ScrollReveal delay={index * 0.1}>
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-[hsl(var(--surface-sunken))] px-6 py-5 sm:px-8 sm:py-6 border-b border-border">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))]">
            {c.industry}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs font-medium text-muted-foreground">Before → After Transformation</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">{c.company}</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-xl">{c.description}</p>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Before */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Before</h4>
          <div className="rounded-xl bg-[hsl(var(--surface-sunken))] border border-border p-4 sm:p-5">
            <p className="text-sm text-muted-foreground italic">{c.beforeDescription}</p>
          </div>
        </div>

        {/* Preview versions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <VersionBadge label="Version A — Clean Professional" selected={c.selectedVersion === "A"} />
              {c.selectedVersion === "A" && <span className="text-xs text-[hsl(var(--accent-purple))] font-medium">✓ Selected</span>}
            </div>
            <PreviewLink url={c.previewA} label="View Preview A" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <VersionBadge label="Version B — Conversion-Focused" selected={c.selectedVersion === "B"} />
              {c.selectedVersion === "B" && <span className="text-xs text-[hsl(var(--accent-purple))] font-medium">✓ Selected</span>}
            </div>
            <PreviewLink url={c.previewB} label="View Preview B" />
          </div>
        </div>

        {/* Final result */}
        <div className="rounded-xl border-2 border-[hsl(var(--accent-purple))]/20 bg-[hsl(var(--accent-purple))]/[0.03] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))] mb-1">Final Selected Version</p>
              <p className="text-sm font-bold text-foreground">{c.selectedLabel}</p>
            </div>
            <a
              href={`https://${c.liveUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--accent-purple))] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 shadow-sm"
            >
              View Live Website
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Testimonial */}
        <div className="flex gap-3 pt-2">
          <Quote className="w-5 h-5 text-[hsl(var(--accent-purple))] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground leading-relaxed italic">"{c.testimonial}"</p>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">{c.testimonialAuthor}</p>
          </div>
        </div>
      </div>
    </div>
  </ScrollReveal>
);

/* ── Grid Case Card ── */
const GridCaseCard = ({ c, index }: { c: GridCase; index: number }) => (
  <ScrollReveal delay={index * 0.05}>
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6 transition-all hover:shadow-lg hover:border-[hsl(var(--accent-purple))]/30 group">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))]">
          {c.industry}
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">{c.company}</h3>
      <p className="text-sm text-muted-foreground mb-4">{c.description}</p>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <a href={`https://${c.previewA}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[hsl(var(--accent-purple))]/40 transition-all">
            <Monitor className="w-3 h-3" /> Version A
            <ExternalLink className="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href={`https://${c.previewB}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[hsl(var(--accent-purple))]/40 transition-all">
            <Monitor className="w-3 h-3" /> Version B
            <ExternalLink className="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
        <a
          href={`https://${c.liveUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
        >
          View Live Website <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  </ScrollReveal>
);

/* ── Page ── */
const PortfolioContent = () => {
  useEffect(() => {
    document.title = "Portfolio — SwiftLift | Real Website Transformations";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* SECTION 1 — HERO */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="inline-block rounded-full bg-[hsl(var(--accent-purple))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))] mb-5">
              Portfolio
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-foreground mb-4">
              Real Website Transformations
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-3">
              Compare two preview versions. See what clients chose. Explore real live websites.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-sm text-muted-foreground">
              From outdated websites to modern, high-performing experiences.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2 — FEATURED CASE STUDIES */}
      <section className="pb-20 sm:pb-28 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-3">
              Featured Transformations
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Full before → after breakdowns with preview versions and live results.
            </p>
          </ScrollReveal>
          <div className="space-y-10">
            {featuredCases.map((c, i) => (
              <FeaturedCaseCard key={c.company} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PORTFOLIO GRID */}
      <section className="pb-20 sm:pb-28 px-4 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-6xl mx-auto pt-16 sm:pt-20">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-3">
              More Projects
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Browse preview versions and live websites across different industries.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridCases.map((c, i) => (
              <GridCaseCard key={c.company} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Get Your Free Website Preview
            </h2>
            <p className="text-muted-foreground mb-8">
              See your new website before making any payment.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--accent-purple))] px-8 py-4 text-base font-bold text-white shadow-lg hover:opacity-90 transition-all"
            >
              Start My Preview
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
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
