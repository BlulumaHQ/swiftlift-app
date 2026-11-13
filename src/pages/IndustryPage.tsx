import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, ExternalLink, Quote, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NotFound from "./NotFound";
import { INDUSTRY_PAGES, industryBySlug, type CaseKey } from "@/lib/industryContent";

import dentalA from "@/assets/portfolio-friendly-dental-a.webp";
import dentalB from "@/assets/portfolio-friendly-dental-b.webp";
import westsideA from "@/assets/portfolio-westside-medical-a.webp";
import westsideB from "@/assets/portfolio-westside-medical-b.webp";
import phoenixA from "@/assets/portfolio-phoenix-remodel-a.webp";
import phoenixB from "@/assets/portfolio-phoenix-remodel-b.webp";
import architect57Before from "@/assets/portfolio-architect57-before.webp";
import architect57A from "@/assets/portfolio-architect57-a.webp";
import architect57B from "@/assets/portfolio-architect57-b.webp";
import genesBefore from "@/assets/portfolio-genes-before.webp";
import genesA from "@/assets/portfolio-genes-a.webp";
import genesB from "@/assets/portfolio-genes-b.webp";
import presoteaA from "@/assets/portfolio-presotea-a.webp";
import presoteaB from "@/assets/portfolio-presotea-b.webp";
import studio21A from "@/assets/portfolio-studio21-a.webp";
import studio21B from "@/assets/portfolio-studio21-b.webp";
import stylesA from "@/assets/portfolio-styles-hair-a.webp";
import stylesB from "@/assets/portfolio-styles-hair-b.webp";
import oneParkA from "@/assets/portfolio-one-park-a.webp";
import oneParkB from "@/assets/portfolio-one-park-b.webp";
import artsBefore from "@/assets/portfolio-arts-before.webp";
import artsA from "@/assets/portfolio-arts-a-v2.webp";
import artsB from "@/assets/portfolio-arts-b-v2.webp";

interface CaseData {
  company: string;
  industry: string;
  summary: string;
  before?: string;
  imageA: string;
  imageB: string;
  previewA: string;
  previewB: string;
  testimonial?: { quote: string; author: string };
}

// Same projects, previews and client quotes as /portfolio.
const CASES: Record<CaseKey, CaseData> = {
  friendlyDental: {
    company: "Friendly Dental Centre",
    industry: "Dental Clinic",
    summary: "Modern dental website focused on trust, clarity, and stronger appointment conversion.",
    imageA: dentalA,
    imageB: dentalB,
    previewA: "https://friendly-dental-centre-preview.lovable.app/",
    previewB: "https://friendly-dental-preview-02.lovable.app/",
  },
  westsideMedical: {
    company: "Westside Medical Associates",
    industry: "Medical",
    summary: "Professional healthcare presentation with better structure and more trustworthy messaging.",
    imageA: westsideA,
    imageB: westsideB,
    previewA: "https://westside-medical-associates-a.netlify.app/",
    previewB: "https://westside-medical-associates-b.netlify.app/",
  },
  phoenixRemodel: {
    company: "Phoenix Remodel",
    industry: "Home Remodeling",
    summary: "Contractor website redesign with clearer service hierarchy and stronger lead intent.",
    imageA: phoenixA,
    imageB: phoenixB,
    previewA: "https://phoenix-remodel-a.netlify.app/",
    previewB: "https://phoenix-remodel-b.netlify.app/",
  },
  architect57: {
    company: "Architect57",
    industry: "Architecture & Construction",
    summary: "Two distinct directions: one clean professional layout and one stronger conversion-focused version.",
    before: architect57Before,
    imageA: architect57A,
    imageB: architect57B,
    previewA: "https://architect-57-a.netlify.app/",
    previewB: "https://architect-57-b.netlify.app/",
    testimonial: {
      quote:
        "The preview process made it very easy to compare two different directions side by side. Version B gave us a stronger overall presentation and a more compelling first impression.",
      author: "Cary T., Architect",
    },
  },
  genes: {
    company: "Gene's Sausage Shop",
    industry: "Specialty Food",
    summary: "Cleaner structure, better visual storytelling, and a stronger product-first presentation.",
    before: genesBefore,
    imageA: genesA,
    imageB: genesB,
    previewA: "https://genes-sausage-a.netlify.app/",
    previewB: "https://genes-sausage-b.netlify.app/",
    testimonial: {
      quote:
        "SwiftLift gave us two real website versions to compare, which made the decision process much easier. The new design feels much more polished, organized, and professional.",
      author: "Sarah R., Owner",
    },
  },
  presotea: {
    company: "Presotea",
    industry: "Beverage Brand",
    summary: "Franchise-style beverage website with stronger menu visibility and cleaner brand execution.",
    imageA: presoteaA,
    imageB: presoteaB,
    previewA: "https://presotea.bluluma.com/",
    previewB: "https://presotea-b.netlify.app/",
  },
  studio21: {
    company: "Studio 21 Salon Spa",
    industry: "Salon & Spa",
    summary: "Beauty-focused redesign with cleaner service presentation and more premium visual balance.",
    imageA: studio21A,
    imageB: studio21B,
    previewA: "https://studio-21-salon-spa-a.netlify.app/",
    previewB: "https://studio-21-salon-spa-b.netlify.app/",
  },
  stylesHair: {
    company: "Styles Hair Salon",
    industry: "Hair Salon",
    summary: "Service-based salon redesign built for cleaner browsing and better appointment intent.",
    imageA: stylesA,
    imageB: stylesB,
    previewA: "https://styles-hair-salon-a.netlify.app/",
    previewB: "https://styles-hair-salon-b.netlify.app/",
  },
  onePark: {
    company: "One Park Home",
    industry: "Real Estate",
    summary: "Luxury real estate presentation with a more polished, property-first experience.",
    imageA: oneParkA,
    imageB: oneParkB,
    previewA: "https://one-park-home-preview-01.lovable.app/",
    previewB: "https://one-park-home-concept-preview.lovable.app/",
  },
  artsAutomotive: {
    company: "Art's Automotive",
    industry: "Auto Repair",
    summary: "Clearer communication, stronger trust signals, and a more modern customer experience.",
    before: artsBefore,
    imageA: artsA,
    imageB: artsB,
    previewA: "https://arts-automotive-a.netlify.app/",
    previewB: "https://arts-automotive-b.netlify.app/",
    testimonial: {
      quote:
        "SwiftLift helped us compare two different website directions before making a decision. The updated version feels much more professional, easier to navigate, and better structured for customers who need information fast.",
      author: "David L., Manager",
    },
  },
};

const STEPS = [
  { n: "01", title: "Send your current website", body: "Share your web address and a few details about your business. Free, no commitment." },
  { n: "02", title: "Get 2 live previews in 48 hours", body: "Two complete, clickable redesigns — not mockups. Browse both on your phone and desktop." },
  { n: "03", title: "Pick one and launch", body: "Pay only for the version you choose. We connect your domain and go live." },
];

const accent = "hsl(var(--accent-purple))";

const CTA = ({ label = "Get My 2 Free Previews" }: { label?: string }) => (
  <a
    href="/#contact"
    className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-lg hover:scale-[1.02] transition-all"
    style={{ background: accent }}
  >
    {label} <ArrowRight className="w-4 h-4" />
  </a>
);

const IndustryContent = () => {
  const { slug } = useParams();
  const page = industryBySlug(slug);

  useEffect(() => {
    if (!page) return;
    document.title = page.title;
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = page.description;
  }, [page]);

  if (!page) return <NotFound />;
  const others = INDUSTRY_PAGES.filter((p) => p.slug !== page.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(220 45% 5%) 0%, hsl(225 40% 9%) 50%, hsl(230 35% 13%) 100%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent-purple)/0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-white/50">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Website Redesign for {page.label}</span>
          </nav>
          <span className="inline-block rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] mb-8" style={{ color: accent, borderColor: "hsl(var(--accent-purple) / 0.3)", background: "hsl(var(--accent-purple) / 0.1)" }}>
            {page.eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white mb-7 max-w-4xl">
            {page.h1}
          </h1>
          <p className="text-lg text-white/75 leading-relaxed max-w-2xl">{page.intro}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CTA />
            <span className="text-sm text-white/60">2 live previews in 48 hours · From $299 · Pay only if you love it</span>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20 sm:py-28 px-6 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.1] max-w-3xl">{page.painH2}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {page.pains.map((p) => (
              <div key={p} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <X className="w-3.5 h-3.5 text-destructive" />
                </div>
                <p className="text-base text-foreground leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-20 sm:py-28 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.1]">{page.buildH2}</h2>
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {page.builds.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--accent-purple) / 0.12)" }}>
                    <Check className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="py-20 sm:py-28 px-6 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.1]">Two versions. Real projects.</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Every client receives a Version A and a Version B. Open any preview to click through the live site.
            </p>
          <div className="mt-12 space-y-14">
            {page.cases.map((key) => {
              const c = CASES[key];
              const shots = [
                ...(c.before ? [{ label: "Before", src: c.before, href: undefined as string | undefined }] : []),
                { label: "Version A", src: c.imageA, href: c.previewA },
                { label: "Version B", src: c.imageB, href: c.previewB },
              ];
              return (
                <article key={key}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <h3 className="text-2xl font-black text-foreground">{c.company}</h3>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{c.industry}</span>
                  </div>
                  <p className="text-base text-muted-foreground mb-6 max-w-3xl">{c.summary}</p>
                  <div className={`grid gap-5 ${shots.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                    {shots.map((s) => (
                      <figure key={s.label} className="rounded-2xl overflow-hidden border border-border bg-card">
                        <img src={s.src} alt={`${c.company} website — ${s.label}`} className="w-full h-auto object-cover" loading="lazy" />
                        <figcaption className="flex items-center justify-between px-4 py-3 text-sm">
                          <span className="font-bold text-foreground">{s.label}</span>
                          {s.href && (
                            <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                              Live preview <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                  {c.testimonial && (
                    <blockquote className="mt-6 rounded-2xl border border-border bg-card p-6 flex gap-4">
                      <Quote className="w-6 h-6 shrink-0" style={{ color: accent }} />
                      <div>
                        <p className="text-base text-foreground leading-relaxed">“{c.testimonial.quote}”</p>
                        <footer className="mt-3 text-sm font-semibold text-muted-foreground">— {c.testimonial.author}</footer>
                      </div>
                    </blockquote>
                  )}
                </article>
              );
            })}
          </div>
          <div className="mt-12">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:underline">
              See the full portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works + pricing */}
      <section className="py-20 sm:py-28 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.1]">See your new website before you pay</h2>
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-black" style={{ color: accent }}>{s.n}</span>
                <h3 className="mt-2 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Version A</p>
              <p className="mt-2 text-4xl font-black text-foreground">$299 <span className="text-base font-bold text-muted-foreground">USD</span></p>
              <p className="mt-3 text-base text-muted-foreground">A clean, professional website — up to 5–7 pages, mobile responsive, contact form, free hosting, 2 rounds of revisions.</p>
            </div>
            <div className="rounded-2xl border-2 bg-card p-6" style={{ borderColor: accent }}>
              <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>Version B</p>
              <p className="mt-2 text-4xl font-black text-foreground">$499 <span className="text-base font-bold text-muted-foreground">USD</span></p>
              <p className="mt-3 text-base text-muted-foreground">Everything in A, plus a conversion-focused layout, trust-building sections, strategic calls to action and a priority build slot.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 px-6 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.1]">Questions from {page.label.toLowerCase()} owners</h2>
          <div className="mt-10 space-y-4">
            {page.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-6">
                <summary className="cursor-pointer list-none text-lg font-bold text-foreground flex justify-between gap-4">
                  {f.q}
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            More answers on our <Link to="/faq" className="underline hover:text-foreground">FAQ page</Link>.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 45% 6%) 0%, hsl(225 40% 10%) 100%)" }}>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-[1.1]">Get 2 free redesign previews of your website</h2>
          <p className="mt-5 text-lg text-white/60">No upfront payment · No obligation · Live in 48 hours</p>
          <div className="mt-10"><CTA /></div>
          <div className="mt-12 text-sm text-white/50">
            We also redesign websites for{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                <Link to={`/website-redesign/${o.slug}`} className="underline hover:text-white">{o.label.toLowerCase()}</Link>
                {i < others.length - 2 ? ", " : i === others.length - 2 ? " and " : "."}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const IndustryPage = () => (
  <LanguageProvider>
    <IndustryContent />
  </LanguageProvider>
);

export default IndustryPage;
