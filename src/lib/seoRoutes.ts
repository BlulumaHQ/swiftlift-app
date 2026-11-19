// Per-route <title>/description for indexable marketing pages.
// Used at build time by scripts/prerenderPlugin.ts (static HTML per route) and
// at runtime by the pages themselves, so both stay in sync. No "@/..." imports.
import { INDUSTRY_PAGES } from "./industryContent";

export const SITE = "https://swiftlift.app";

export const SEO_ROUTES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Website Facelift & Redesign for Small Businesses | SwiftLift",
    description:
      "Your old website is costing you customers. Get 2 live website facelifts in 48 hours and pay only when you're happy. From $299 with free hosting.",
  },
  "/portfolio": {
    title: "Website Facelift Portfolio — Before & After | SwiftLift",
    description:
      "Real small business website makeovers. See each before and after, plus the Classic and Growth Facelift versions every client chose from.",
  },
  "/features": {
    title: "Website Facelift Features & Add-ons | SwiftLift",
    description:
      "What every SwiftLift facelift includes — mobile design, contact form, basic SEO, free hosting — plus add-ons like booking forms, extra pages and SEO.",
  },
  "/about": {
    title: "About SwiftLift — Fast Website Facelifts by Sony Lin",
    description:
      "SwiftLift is run by Lead Designer Sony Lin: 20 years and 500+ websites, plus an AI system that rebuilds your existing site fast and affordably.",
  },
  "/faq": {
    title: "Website Facelift FAQ — Pricing, Timeline & Hosting | SwiftLift",
    description:
      "Why SwiftLift is so affordable, how free previews and revisions work, pricing from $299, free hosting, domains, email and the Care Plan.",
  },
  "/hosting-guide": {
    title: "Free Website Hosting & Care Plan | SwiftLift",
    description:
      "Every SwiftLift website gets fast, secure hosting with SSL free forever. Need changes? $45 per edit, or the $135/year Care Plan with 2 edits a month.",
  },
  "/privacy": {
    title: "Privacy Policy | SwiftLift",
    description: "How SwiftLift collects, uses and protects your information.",
  },
  "/terms": {
    title: "Terms of Service | SwiftLift",
    description: "The terms that apply to SwiftLift website redesign and hosting services.",
  },
  ...Object.fromEntries(
    INDUSTRY_PAGES.map((p) => [`/website-redesign/${p.slug}`, { title: p.title, description: p.description }]),
  ),
};
