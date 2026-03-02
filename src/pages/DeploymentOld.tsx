import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import { Check, ClipboardCheck, Settings, Rocket, ArrowRight, ArrowDown, Plus, Palette, Search, Zap, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const stepIcons = [ClipboardCheck, Settings, Rocket];
const upgradeIcons = [Palette, Search, Zap];

const DeploymentContent = () => {
  const { lang } = useLanguage();
  const d = translations.deployment;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center section-brand-dark overflow-hidden">
        <div className="video-overlay" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24 md:py-32">
          <ScrollReveal>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-black text-white font-display leading-tight">
              {t(d.heroHeadline, lang)}
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              {t(d.heroSub, lang)}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                as="a"
                href="#hosting"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#7F37AE]/50 focus:ring-offset-2"
                style={{ backgroundColor: "#7F37AE" }}
              >
                {t(d.heroCta1, lang)}
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#hosting"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#7F37AE]/50 focus:ring-offset-2"
                style={{ backgroundColor: "#7F37AE" }}
              >
                {t(d.heroCta2, lang)}
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Hosting Options Comparison */}
      <section id="hosting" className="py-16 md:py-24 relative overflow-hidden" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {d.hostingOptions.map((option, i) => {
              const features = option.features[lang];
              return (
                <ScrollReveal key={i} delay={0.08 * i}>
                  <div className="rounded-2xl flex flex-col border border-border bg-background p-6 md:p-8 shadow-sm h-full card-elevated">
                    <h3 className="font-bold text-foreground text-xl font-display">{t(option.title, lang)}</h3>
                    <div className="mt-3 flex items-baseline gap-2 text-foreground">
                      <span className="text-4xl font-black font-display">{option.price}</span>
                      {option.altPrice && (
                        <span className="text-sm text-muted-foreground">{option.altPrice}</span>
                      )}
                    </div>

                    <ul className="space-y-3 flex-1 mt-5">
                      {features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-sm">
                          <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{t(option.paragraph, lang)}</p>

                    <div className="mt-6">
                      <MagneticButton
                        as="a"
                        href="/#contact"
                        className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#7F37AE]/50 focus:ring-offset-2"
                        style={{ backgroundColor: "#7F37AE" }}
                      >
                        {t(option.button, lang)}
                      </MagneticButton>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 md:py-24 section-brand-dark relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white text-center font-display">
              {t(d.stepsHeadline, lang)}
            </h2>
            <div className="flex justify-center">
              <span className="section-underline section-underline--dark" />
            </div>
          </ScrollReveal>

          {/* Desktop */}
          <div className="mt-14 hidden md:flex items-start justify-center gap-8">
            {d.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i} className="flex items-center">
                  <ScrollReveal delay={0.12 * i}>
                    <div className="flex flex-col items-center text-center max-w-[200px]">
                      <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center border-2 border-white/30 bg-white/5 shadow-xl mb-5">
                        <Icon size={40} className="text-white" />
                      </div>
                      <h3 className="font-bold text-white text-base font-display">{t(step.title, lang)}</h3>
                      <p className="mt-2 text-sm text-white/60 leading-relaxed">{t(step.desc, lang)}</p>
                    </div>
                  </ScrollReveal>
                  {i < 2 && (
                    <div className="mx-4 flex-shrink-0">
                      <ArrowRight size={22} style={{ color: "hsl(214 58% 60%)" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="mt-10 flex flex-col items-center gap-6 md:hidden">
            {d.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i} className="flex flex-col items-center w-full max-w-sm mx-auto">
                  <ScrollReveal delay={0.08 * i} className="w-full">
                    <div className="rounded-2xl p-7 w-full flex flex-col items-center text-center border border-white/10 relative bg-white/5">
                      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center border-2 border-white/30 bg-white/5 shadow-xl mb-4">
                        <Icon size={28} className="text-white" />
                      </div>
                      <h3 className="font-bold text-white text-lg font-display">{t(step.title, lang)}</h3>
                      <p className="mt-2 text-sm text-white/60 leading-relaxed">{t(step.desc, lang)}</p>
                    </div>
                  </ScrollReveal>
                  {i < 2 && (
                    <div className="py-3">
                      <ArrowDown size={20} style={{ color: "hsl(214 58% 60%)" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Optional Upgrades */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground text-center font-display">
              {t(d.upgradesHeadline, lang)}
            </h2>
            <div className="flex justify-center">
              <span className="section-underline section-underline--light" />
            </div>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {d.upgrades.map((card, i) => {
              const Icon = upgradeIcons[i];
              const features = card.features[lang];
              return (
                <ScrollReveal key={i} delay={0.08 * i}>
                  <div className="rounded-2xl flex flex-col border border-border bg-background p-6 md:p-8 shadow-sm h-full card-elevated">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: "hsl(var(--accent-purple) / 0.08)" }}
                    >
                      <Icon size={22} style={{ color: "hsl(275 51% 46%)" }} />
                    </div>
                    <h3 className="font-bold text-foreground text-lg font-display">{t(card.title, lang)}</h3>
                    <div className="mt-3 flex items-baseline gap-2 text-foreground">
                      <span className="text-3xl font-black font-display">{card.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t(d.exclusiveRate, lang)}</p>

                    <ul className="space-y-2.5 flex-1 mt-5">
                      {features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-sm">
                          <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black text-foreground text-center font-display">
              {t(d.faqHeadline, lang)}
            </h2>
            <div className="flex justify-center">
              <span className="section-underline section-underline--light" />
            </div>
          </ScrollReveal>

          <div className="mt-10 space-y-3">
            {d.faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <ScrollReveal key={i} delay={0.05 * i}>
                  <div
                    className={`rounded-xl border border-border overflow-hidden bg-background transition-all ${isOpen ? "border-l-4 faq-expanded-bg" : ""}`}
                    style={isOpen ? { borderLeftColor: "hsl(275 51% 46%)" } : {}}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-semibold text-foreground pr-4">{t(item.q, lang)}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                        className="flex-shrink-0"
                      >
                        <Plus size={18} style={{ color: "hsl(275 51% 46%)" }} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                            {t(item.a, lang)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="py-16 md:py-24 section-brand-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/20 bg-white/5">
              <MessageCircle size={24} className="text-white" />
            </div>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black text-white font-display">
              {t(d.trustHeadline, lang)}
            </h2>
            <div className="flex justify-center">
              <span className="section-underline section-underline--dark" />
            </div>
            <p className="mt-4 text-white/60 max-w-lg mx-auto leading-relaxed">
              {t(d.trustSub, lang)}
            </p>
            <div className="mt-8">
              <MagneticButton
                as="a"
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#7F37AE]/50 focus:ring-offset-2"
                style={{ backgroundColor: "#7F37AE" }}
              >
                {t(d.trustCta, lang)}
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

const Deployment = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <CustomCursor />
      <Header />
      <DeploymentContent />
      <Footer />
      <MobileNav />
    </div>
  </LanguageProvider>
);

export default Deployment;
