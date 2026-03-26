import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Zap, Palette, BarChart3, Layers, X, Check } from "lucide-react";

import aboutHero from "@/assets/about-hero.jpg";
import aboutTransform from "@/assets/about-transform.jpg";
import aboutBluluma from "@/assets/about-bluluma.jpg";
import aboutProblem from "@/assets/about-problem.jpg";

const AboutContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "About — SwiftLift | We Upgrade What You Already Have";
    window.scrollTo(0, 0);
  }, []);

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/#contact");
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />

      {/* HERO */}
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-bg))] via-[hsl(var(--hero-bg))] to-[hsl(var(--accent-purple)/0.15)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent-purple)/0.08),transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-block rounded-full bg-[hsl(var(--accent-purple))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))] mb-6">
                  About SwiftLift
                </span>
              </ScrollReveal>
              <ScrollReveal>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight text-white mb-6">
                  We Don't Build Websites.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">
                    We Upgrade What You Already Have.
                  </span>
                </h1>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                  Most businesses don't need another website. They need a better one — faster, cleaner, and built to convert.
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">That's where we come in.</p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="/#contact" onClick={handleCTA} className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-all" style={{ background: "hsl(var(--accent-purple))" }}>
                    Get My 2 Free Previews <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/5 transition-all">
                    View Portfolio
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[hsl(var(--accent-purple))]/10 border border-white/10">
                  <img src={aboutHero} alt="Modern digital design workspace" className="w-full h-auto object-cover aspect-[16/10]" width={1280} height={800} />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-[hsl(var(--accent-purple))] to-[hsl(210,100%,55%)] opacity-20 blur-2xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-14 sm:py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                <img src={aboutProblem} alt="Website performance visualization" className="w-full h-auto object-cover aspect-[16/10]" loading="lazy" width={1280} height={800} />
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--accent-purple))]">The Problem</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-black text-foreground leading-tight">
                  Most Websites Aren't Broken — <span className="text-muted-foreground">Just Outdated</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                  Businesses grow, but their websites don't. What worked three years ago now feels slow, cluttered, and out of touch with your brand.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="mt-8 space-y-4">
                  {["Outdated design that no longer reflects your brand", "Slow load times killing conversions", "Poor mobile experience reducing trust", "Missed opportunities every single day"].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                        <X className="w-3 h-3 text-destructive" />
                      </div>
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <p className="mt-8 text-sm text-muted-foreground italic border-l-2 border-[hsl(var(--accent-purple))]/30 pl-4">
                  Most business owners don't have the time, technical knowledge, or resources to fix it properly. We fix that. Fast.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="py-20 sm:py-28 px-6 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--accent-purple))]">The Transformation</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-foreground">From Outdated to High-Performing</h2>
              <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto">
                We take what you have and transform it into a modern, conversion-focused website — in days, not months.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
              <img src={aboutTransform} alt="Website transformation" className="w-full h-auto" loading="lazy" width={1280} height={720} />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="rounded-xl border border-border bg-card p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Before</p>
                <p className="text-sm text-foreground font-medium">Outdated · Slow · Cluttered</p>
              </div>
              <div className="rounded-xl border border-[hsl(var(--accent-purple))]/30 p-5 text-center" style={{ background: "hsl(var(--accent-purple) / 0.04)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))] mb-1">After</p>
                <p className="text-sm text-foreground font-medium">Modern · Fast · Conversion-Ready</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 sm:py-28 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--accent-purple))]">What We Do</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-foreground">Powered by AI. Built for Results.</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Zap, title: "AI-Powered Rebuilding", desc: "Intelligent website transformation that preserves your brand while modernizing everything." },
              { icon: Palette, title: "Conversion Design", desc: "Every element is designed to guide visitors toward action — not just look pretty." },
              { icon: BarChart3, title: "Performance Optimization", desc: "Faster load times, better Core Web Vitals, and a smoother experience across all devices." },
              { icon: Layers, title: "Modern UI/UX", desc: "Clean interfaces, intuitive navigation, and design systems built for credibility." },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div className="group rounded-2xl border border-border bg-card p-6 h-full hover:border-[hsl(var(--accent-purple))]/30 hover:shadow-lg transition-all">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(var(--accent-purple) / 0.08)" }}>
                    <item.icon className="w-5 h-5" style={{ color: "hsl(var(--accent-purple))" }} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="mt-10 text-center text-sm text-muted-foreground italic">This isn't just a redesign. It's a performance upgrade.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* BLULUMA */}
      <section className="py-20 sm:py-28 px-6 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                <img src={aboutBluluma} alt="Creative design agency workspace" className="w-full h-auto" loading="lazy" width={800} height={800} />
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--accent-purple))]">Who We Are</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-black text-foreground leading-tight">
                  Built on Real Experience — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">Not Just AI</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                  SwiftLift is powered by <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-bold underline underline-offset-2 hover:text-[hsl(var(--accent-purple))] transition-colors">Bluluma Design</a> — a design agency with over a decade of real-world experience helping small businesses build and improve their online presence.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">We've worked directly with business owners and understand:</p>
                <div className="mt-4 space-y-3">
                  {["Budget constraints that limit options", "Time pressure that delays progress", "Confusion with technical decisions", "Frustration with traditional agencies"].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(var(--accent-purple) / 0.1)" }}>
                        <Check className="w-3 h-3" style={{ color: "hsl(var(--accent-purple))" }} />
                      </div>
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <p className="mt-6 text-sm text-muted-foreground italic border-l-2 border-[hsl(var(--accent-purple))]/30 pl-4">
                  That's why SwiftLift exists — to remove complexity, reduce cost, and deliver results faster than ever before.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="py-20 sm:py-28 px-6 relative overflow-hidden" style={{ background: "hsl(220 40% 8%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent-purple)/0.1),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--accent-purple))]">The Difference</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">Why SwiftLift Is Different</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">Traditional Agencies</p>
                <div className="space-y-4">
                  {["Take weeks just to get started", "Require multiple meetings", "Charge high upfront costs", "Deliver only one version", "Long revision cycles"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <X className="w-4 h-4 text-red-400/60 shrink-0" />
                      <p className="text-sm text-white/50">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--accent-purple))]/30 p-8" style={{ background: "hsl(var(--accent-purple) / 0.06)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "hsl(var(--accent-purple))" }}>SwiftLift</p>
                <div className="space-y-4">
                  {["No calls required", "No waiting — we start immediately", "You get 2 real website previews first", "You choose what works best", "We launch in days"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--accent-purple))" }} />
                      <p className="text-sm text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 px-6" style={{ background: "linear-gradient(to bottom, hsl(220 40% 8%), hsl(220 45% 6%))" }}>
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">See Your New Website Before You Pay.</h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-base text-blue-100/50 mb-8">No risk. No waiting. Just real results.</p>
          </ScrollReveal>
          <ScrollReveal>
            <a href="/#contact" onClick={handleCTA} className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-all" style={{ background: "hsl(var(--accent-purple))" }}>
              Get My 2 Free Previews <ArrowRight className="w-4 h-4" />
            </a>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-6 text-xs text-blue-200/30">No upfront payment · No obligation · Built for real business results</p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const About = () => (
  <LanguageProvider>
    <AboutContent />
  </LanguageProvider>
);

export default About;
