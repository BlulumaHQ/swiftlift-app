import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, X, Check, Layout, Smartphone, Gauge, Sparkles } from "lucide-react";

import aboutHero from "@/assets/about-hero.jpg";
import aboutTransform from "@/assets/about-transform.jpg";
import aboutWorkspace from "@/assets/about-workspace.jpg";

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

      {/* ═══════════════════════ SECTION 1: HERO ═══════════════════════ */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(220 45% 5%) 0%, hsl(225 40% 9%) 50%, hsl(230 35% 13%) 100%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent-purple)/0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(220_60%_18%/0.25),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-block rounded-full bg-[hsl(var(--accent-purple))]/10 border border-[hsl(var(--accent-purple))]/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--accent-purple))] mb-8">
                  About SwiftLift
                </span>
              </ScrollReveal>
              <ScrollReveal>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white mb-7">
                  We Don't Build Websites.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">
                    We Upgrade What You Already Have.
                  </span>
                </h1>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-lg text-white/75 leading-relaxed max-w-lg">
                  SwiftLift is a specialized service by{" "}
                  <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline underline-offset-2 hover:text-[hsl(var(--accent-purple))] transition-colors">
                    Bluluma Design
                  </a>{" "}
                  — built for one purpose: giving existing websites a fast, professional facelift without starting from scratch.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="/#contact" onClick={handleCTA} className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[hsl(var(--accent-purple))]/20 hover:shadow-[hsl(var(--accent-purple))]/30 hover:scale-[1.02] transition-all" style={{ background: "hsl(var(--accent-purple))" }}>
                    Get My 2 Free Previews <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link to="/portfolio" className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 px-8 py-4 text-sm font-bold text-white hover:bg-white/5 hover:border-white/30 transition-all">
                    View Portfolio
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                  <img src={aboutHero} alt="Before and after website transformation on a laptop mockup" className="w-full h-auto object-cover" width={1280} height={800} />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[hsl(var(--accent-purple))] opacity-15 blur-3xl" />
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[hsl(210,100%,55%)] opacity-10 blur-3xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 2: THE PROBLEM ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">The Problem</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] max-w-2xl">
              Your Website Isn't Broken.{" "}
              <span className="text-muted-foreground">It's Just Holding You Back.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Businesses grow. Websites don't keep up. What worked three years ago now feels slow, outdated, and out of touch with your brand.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5 mt-14">
            {[
              { text: "Outdated design that no longer reflects who you are" },
              { text: "Slow load times that kill conversions" },
              { text: "Poor mobile experience that loses trust" },
              { text: "Missed enquiries every single day" },
            ].map((item) => (
              <ScrollReveal key={item.text}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <p className="text-base text-foreground leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="mt-14 text-base text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
              Most business owners know their website needs work — but don't have the time, budget, or energy to deal with a full rebuild. That's exactly the gap SwiftLift was built to fill.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 3: THE TRANSFORMATION ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 45% 6%) 0%, hsl(225 40% 10%) 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent-purple)/0.06),transparent_70%)]" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">The Transformation</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1]">
                From Outdated to High-Performing —
                <br className="hidden sm:block" />
                <span className="text-white/60">In Days, Not Months.</span>
              </h2>
              <p className="mt-5 text-lg text-white/50 max-w-xl mx-auto">
                We take your existing website and transform it into a modern, conversion-focused version — without the long agency process.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              <img src={aboutTransform} alt="Website before and after transformation" className="w-full h-auto" loading="lazy" width={1280} height={640} />
              <div className="absolute bottom-0 left-0 right-0 flex">
                <div className="flex-1 py-4 px-6 bg-black/70 backdrop-blur-sm border-t border-r border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-red-400/80">Before</p>
                  <p className="text-xs text-white/50 mt-0.5">Outdated · Slow · Cluttered</p>
                </div>
                <div className="flex-1 py-4 px-6 bg-[hsl(var(--accent-purple))]/20 backdrop-blur-sm border-t border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[hsl(var(--accent-purple))]">After</p>
                  <p className="text-xs text-white/60 mt-0.5">Modern · Fast · Conversion-Ready</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 4: WHO WE ARE ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
                <img src={aboutWorkspace} alt="Designer working in a creative workspace" className="w-full h-auto object-cover" loading="lazy" width={800} height={1000} />
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">Who We Are</span>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1]">
                  Built on a Decade of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">Real Design Experience</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <div className="mt-7 space-y-4">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    SwiftLift is a product of{" "}
                    <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-bold underline underline-offset-2 hover:text-[hsl(var(--accent-purple))] transition-colors">
                      Bluluma Design
                    </a>{" "}
                    — a full-service design agency with over 10 years of experience helping small businesses build and grow their online presence.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    We created SwiftLift because we kept seeing the same problem: business owners stuck with outdated websites, unable to afford a full agency rebuild, unsure where to start.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    So we built a system that makes it fast, risk-free, and affordable.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="mt-8 space-y-3">
                  {["No lengthy back-and-forth", "No paying before you see results", "No technical headaches"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(var(--accent-purple) / 0.1)" }}>
                        <Check className="w-3.5 h-3.5" style={{ color: "hsl(var(--accent-purple))" }} />
                      </div>
                      <p className="text-base text-foreground font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <p className="mt-8 text-lg font-bold text-foreground">
                  Just a better website — delivered in days.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 5: WHAT WE DO ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">What We Do</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1]">
                A Complete System for Website Facelifts
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Layout, title: "Conversion-Focused Design", desc: "Every layout decision is made to guide visitors toward taking action." },
              { icon: Smartphone, title: "Mobile-First Rebuilding", desc: "Your new site looks and performs perfectly on every device." },
              { icon: Gauge, title: "Performance Optimization", desc: "Faster load times, cleaner code, better user experience across the board." },
              { icon: Sparkles, title: "Modern UI/UX", desc: "Clean, credible interfaces that reflect the quality of your business." },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div className="group rounded-2xl border border-border bg-card p-8 h-full hover:border-[hsl(var(--accent-purple))]/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "hsl(var(--accent-purple) / 0.08)" }}>
                    <item.icon className="w-5.5 h-5.5" style={{ color: "hsl(var(--accent-purple))" }} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="mt-12 text-center text-base text-muted-foreground italic">This isn't just a redesign. It's a performance upgrade.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 6: THE DIFFERENCE ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 45% 6%) 0%, hsl(225 40% 9%) 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent-purple)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">The Difference</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white">Why SwiftLift Is Different</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35 mb-8">Traditional Agencies</p>
                <div className="space-y-5">
                  {[
                    "Weeks just to get started",
                    "Multiple meetings before anything happens",
                    "High upfront costs with no guarantee",
                    "One version — take it or leave it",
                    "Long revision cycles",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4">
                      <X className="w-4.5 h-4.5 text-red-400/50 shrink-0" />
                      <p className="text-base text-white/45">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--accent-purple))]/30 p-8 sm:p-10" style={{ background: "hsl(var(--accent-purple) / 0.06)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-8" style={{ color: "hsl(var(--accent-purple))" }}>SwiftLift</p>
                <div className="space-y-5">
                  {[
                    "Previews ready in 48 hours",
                    "No calls, no meetings required",
                    "You see 2 real versions before paying anything",
                    "You choose what works best",
                    "Live website in 3 days",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4">
                      <Check className="w-4.5 h-4.5 shrink-0" style={{ color: "hsl(var(--accent-purple))" }} />
                      <p className="text-base text-white/85">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 7: FOOTER CTA ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6" style={{ background: "linear-gradient(to bottom, hsl(225 40% 9%), hsl(220 45% 5%))" }}>
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-[1.1]">
              See Your New Website Before You Pay.
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg text-white/40 mb-10">No risk. No waiting. Just real results.</p>
          </ScrollReveal>
          <ScrollReveal>
            <a href="/#contact" onClick={handleCTA} className="inline-flex items-center gap-2.5 rounded-xl px-10 py-4.5 text-base font-bold text-white shadow-lg shadow-[hsl(var(--accent-purple))]/20 hover:shadow-[hsl(var(--accent-purple))]/30 hover:scale-[1.02] transition-all" style={{ background: "hsl(var(--accent-purple))" }}>
              Get My 2 Free Previews <ArrowRight className="w-5 h-5" />
            </a>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-8 text-sm text-white/25">No upfront payment · No obligation · Built for real business results</p>
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
