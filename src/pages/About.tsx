import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, Paintbrush, Smartphone, TrendingUp, Shield,
  Clock, MessageSquareOff, DollarSign, Eye, Rocket,
  Minus, Check, ImageIcon
} from "lucide-react";

const AboutPageContent = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* ── SECTION 1 — HERO ── */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 z-0" style={{ background: "hsl(var(--surface-brand))" }} />
          <div className="absolute inset-0 z-0 opacity-[0.07]" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--accent-blue)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--accent-purple)) 0%, transparent 40%)"
          }} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <ScrollReveal>
                <h1 className="text-[clamp(2rem,5vw,3.8rem)] font-black leading-[1.05] text-primary-foreground font-display">
                  We Don't Build Websites.{" "}
                  <span style={{ color: "hsl(var(--accent-blue))" }}>
                    We Upgrade What You Already Have.
                  </span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="mt-6 text-lg md:text-xl leading-relaxed text-primary-foreground/75 max-w-2xl">
                  Most businesses don't need another website.
                  They need a better one — faster, cleaner, and built to convert.
                  <br className="hidden md:block" />
                  <span className="mt-2 inline-block">That's where we come in.</span>
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 — PROBLEM ── */}
        <section className="py-20 md:py-28" style={{ background: "hsl(var(--surface-sunken))" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <ScrollReveal>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-foreground font-display leading-tight">
                Built for Business Owners Who Already Have a Website
              </h2>
              <span className="section-underline section-underline--light" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed space-y-4 text-left max-w-xl mx-auto">
                <p>If you already have a website but:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "It feels outdated",
                    "It loads slowly",
                    "It doesn't generate leads",
                    "It no longer reflects your brand",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Minus size={14} className="mt-1.5 flex-shrink-0 text-muted-foreground/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-semibold text-foreground">You're not alone.</p>
                <p>
                  Most small business websites were built once —
                  and never properly optimized again.
                </p>
                <p className="font-semibold text-foreground">We fix that. Fast.</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── SECTION 3 — PROBLEM DEEPER ── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
              <ScrollReveal>
                <div>
                  <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-foreground font-display leading-tight">
                    The Real Problem Isn't Your Business —{" "}
                    <span style={{ color: "hsl(var(--accent-purple))" }}>It's Your Website</span>
                  </h2>
                  <span className="section-underline section-underline--light" />
                  <div className="mt-6 text-base text-muted-foreground leading-relaxed space-y-4">
                    <p>We've seen it over and over again:</p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "Great businesses hidden behind outdated design",
                        "Slow websites killing conversions",
                        "Poor user experience reducing trust",
                        "Missed opportunities every single day",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Minus size={14} className="mt-1.5 flex-shrink-0 text-muted-foreground/50" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p>And the reality is:</p>
                    <p className="font-medium text-foreground">
                      Most business owners don't have the time,
                      technical knowledge, or resources to fix it properly.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <div className="hidden md:block" />
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — SOLUTION ── */}
        <section className="py-20 md:py-28" style={{ background: "hsl(var(--surface-sunken))" }}>
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-foreground font-display leading-tight">
                We Use AI to Transform Your Website —{" "}
                <span style={{ color: "hsl(var(--accent-blue))" }}>In Days, Not Months</span>
              </h2>
              <span className="section-underline section-underline--light" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
                <p className="font-medium text-foreground">SwiftLift is built to solve this exact problem.</p>
                <p>We combine:</p>
                <ul className="space-y-2 pl-1">
                  {[
                    "AI-powered website rebuilding",
                    "Conversion-focused design",
                    "Performance optimization",
                    "Modern UI/UX systems",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check size={14} className="mt-1.5 flex-shrink-0" style={{ color: "hsl(var(--accent-purple))" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>To turn your existing website into a high-performing asset.</p>
                <p className="text-xl font-black text-foreground font-display">
                  Stronger. Faster. Smarter.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── SECTION 5 — BENEFITS ── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-foreground font-display leading-tight text-center">
                What You Get
              </h2>
              <span className="section-underline section-underline--light mx-auto" />
            </ScrollReveal>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: Zap, label: "Faster loading website" },
                { icon: Paintbrush, label: "Modern, clean design" },
                { icon: Smartphone, label: "Better mobile experience" },
                { icon: TrendingUp, label: "Higher conversion potential" },
                { icon: Shield, label: "Stronger brand credibility" },
              ].map(({ icon: Icon, label }, i) => (
                <ScrollReveal key={label} delay={0.08 * i}>
                  <div className="rounded-2xl border border-border p-6 text-center h-full flex flex-col items-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ background: "hsl(var(--surface-elevated))" }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--accent-purple) / 0.08)" }}>
                      <Icon size={22} style={{ color: "hsl(var(--accent-purple))" }} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.4}>
              <p className="mt-10 text-center text-base text-muted-foreground">
                This isn't just a redesign.{" "}
                <span className="font-semibold text-foreground">It's a performance upgrade.</span>
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── SECTION 6 — ABOUT BLULUMA ── */}
        <section className="py-20 md:py-28" style={{ background: "hsl(var(--surface-sunken))" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              {/* Left: Image placeholder */}
              <ScrollReveal>
                <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3" style={{ background: "hsl(var(--surface-warm))" }}>
                  <ImageIcon size={48} className="text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground/50 font-medium">Bluluma Design — Photo Coming Soon</p>
                </div>
              </ScrollReveal>

              {/* Right: Text */}
              <ScrollReveal delay={0.15}>
                <div>
                  <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-foreground font-display leading-tight">
                    Built on Real Experience —{" "}
                    <span style={{ color: "hsl(var(--accent-purple))" }}>Not Just AI</span>
                  </h2>
                  <span className="section-underline section-underline--light" />
                  <div className="mt-6 text-base text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      SwiftLift is powered by{" "}
                      <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                        Bluluma Design
                      </a>.
                    </p>
                    <p>
                      A design agency with over a decade of real-world experience
                      helping small businesses build and improve their online presence.
                    </p>
                    <p>We've worked directly with business owners and understand:</p>
                    <ul className="space-y-2 pl-1">
                      {[
                        "Budget constraints",
                        "Time pressure",
                        "Unclear technical decisions",
                        "Frustration with traditional web agencies",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check size={14} className="mt-1.5 flex-shrink-0" style={{ color: "hsl(var(--accent-purple))" }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="font-semibold text-foreground">That's why SwiftLift exists.</p>
                    <p>
                      To remove complexity, reduce cost, and deliver results faster than ever before.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── SECTION 7 — DIFFERENTIATION ── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-foreground font-display leading-tight text-center">
                Why SwiftLift Is Different
              </h2>
              <span className="section-underline section-underline--light mx-auto" />
            </ScrollReveal>

            <div className="mt-12 max-w-3xl mx-auto">
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-border overflow-hidden">
                  {/* Column headers */}
                  <div className="grid grid-cols-2">
                    <div className="px-6 py-4 bg-muted/40 border-b border-r border-border">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Most Agencies</p>
                    </div>
                    <div className="px-6 py-4 border-b border-border" style={{ background: "hsl(var(--accent-purple) / 0.06)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "hsl(var(--accent-purple))" }}>SwiftLift</p>
                    </div>
                  </div>
                  {/* Rows */}
                  {[
                    { old: "Take weeks just to get started", sl: "No waiting — we start immediately" },
                    { old: "Require multiple meetings", sl: "No calls required" },
                    { old: "Charge high upfront costs", sl: "See your previews before you pay" },
                    { old: "Deliver only one version", sl: "You get 2 real website previews" },
                    { old: "Long revision cycles", sl: "We launch in days" },
                  ].map((row, i, arr) => (
                    <div key={i} className={`grid grid-cols-2 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                      <div className="px-6 py-4 bg-muted/20 border-r border-border flex items-start gap-3">
                        <Minus size={14} className="mt-0.5 flex-shrink-0 text-muted-foreground/50" />
                        <span className="text-sm text-muted-foreground font-medium">{row.old}</span>
                      </div>
                      <div className="px-6 py-4 flex items-start gap-3" style={{ background: "hsl(var(--accent-purple) / 0.04)" }}>
                        <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--accent-purple))" }} />
                        <span className="text-sm text-foreground font-semibold">{row.sl}</span>
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-2">
                    <div />
                    <div className="h-[3px]" style={{ background: "hsl(var(--accent-purple) / 0.4)" }} />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── SECTION 8 — CTA ── */}
        <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "hsl(var(--surface-brand))" }}>
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "radial-gradient(circle at 70% 30%, hsl(var(--accent-blue)) 0%, transparent 50%)"
          }} />
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <ScrollReveal>
              <h2 className="text-[clamp(1.6rem,4vw,3rem)] font-black text-primary-foreground font-display leading-tight">
                Your Website Should Work for You —{" "}
                <span style={{ color: "hsl(var(--accent-blue))" }}>Not Against You</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-primary-foreground/70 max-w-xl mx-auto">
                If your current website isn't helping your business grow,
                it's time to fix it.
                Let us show you what your website could be —
                before you commit to anything.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-sm font-semibold" style={{ color: "hsl(var(--accent-blue))" }}>
                See Your New Website Before You Pay.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Link
                to="/#contact"
                className="mt-8 inline-block bg-white text-primary font-semibold px-10 py-4 rounded-full text-base hover:bg-white/90 transition-colors shadow-lg"
              >
                Get My 2 Free Previews
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
      <CustomCursor />
    </div>
  );
};

const About = () => (
  <LanguageProvider>
    <AboutPageContent />
  </LanguageProvider>
);

export default About;
