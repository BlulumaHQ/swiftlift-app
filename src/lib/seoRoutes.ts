// Per-route <title>/description for indexable marketing pages.
// Used at build time by scripts/prerenderPlugin.ts (static HTML per route) and
// at runtime by the pages themselves, so both stay in sync. No "@/..." imports.
export const SITE = "https://swiftlift.app";

export const SEO_ROUTES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Website Redesign Service for Small Businesses | SwiftLift",
    description:
      "See your new website before you pay. SwiftLift delivers 2 live website redesigns in 48 hours for US small businesses. Starting at $299.",
  },
  "/portfolio": {
    title: "Website Redesign Portfolio — Before & After | SwiftLift",
    description:
      "Real small business website makeovers: see the before and after of sites redesigned by SwiftLift, each delivered as two live versions to choose from.",
  },
  "/features": {
    title: "Website Redesign Features & Add-ons | SwiftLift",
    description:
      "What every SwiftLift website redesign includes — contact forms and SEO basics — plus optional add-ons for online bookings, extra pages and more.",
  },
  "/about": {
    title: "About SwiftLift — Small Business Website Makeovers",
    description:
      "SwiftLift upgrades the website you already have — two live redesigns to choose from, powered by Vancouver studio Bluluma Design.",
  },
  "/faq": {
    title: "Website Redesign FAQ — Pricing, Timeline & Hosting | SwiftLift",
    description:
      "Answers about SwiftLift website redesigns: how the free preview works, pricing from $299, 48-hour delivery, revisions, domains and hosting.",
  },
  "/hosting-guide": {
    title: "Managed Website Hosting for Small Businesses | SwiftLift",
    description:
      "Fast, secure managed hosting for your SwiftLift website — SSL, updates and support included, so you never have to touch a server.",
  },
  "/privacy": {
    title: "Privacy Policy | SwiftLift",
    description: "How SwiftLift collects, uses and protects your information.",
  },
  "/terms": {
    title: "Terms of Service | SwiftLift",
    description: "The terms that apply to SwiftLift website redesign and hosting services.",
  },
};
