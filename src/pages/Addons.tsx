import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import { Check, Palette, Search, Server, Zap, MessageCircle } from "lucide-react";

const cardIcons = [Palette, Search, Server, Zap];

const AddonsContent = () => {
  const { lang } = useLanguage();
  const a = translations.addons;

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center section-brand-dark overflow-hidden">
        <div className="video-overlay" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24 md:py-32">
          <ScrollReveal>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-black text-white font-display leading-tight">
              {t(a.heroHeadline, lang)}
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              {t(a.heroSub, lang)}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                as="a"
                href="/#contact"
                className="btn-brand inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-primary-foreground"
              >
                {t(a.heroCta, lang)}
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                {t(a.heroCtaSecondary, lang)}
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Add-ons Grid */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {a.cards.map((card, i) => {
              const Icon = cardIcons[i];
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
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{t(card.desc, lang)}</p>

                    <div className="mt-4 flex items-baseline gap-2 text-foreground">
                      <span className="text-3xl font-black font-display">{card.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t(a.exclusiveRate, lang)}</p>
                    {card.standalone && (
                      <p className="text-xs text-muted-foreground/60 mt-0.5">{t(card.standalone, lang)}</p>
                    )}

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

      {/* Trust Footer Block */}
      <section className="py-16 md:py-24 section-brand-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/20 bg-white/5">
              <MessageCircle size={24} className="text-white" />
            </div>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black text-white font-display">
              {t(a.trustHeadline, lang)}
            </h2>
            <div className="flex justify-center">
              <span className="section-underline section-underline--dark" />
            </div>
            <p className="mt-4 text-white/60 max-w-lg mx-auto leading-relaxed">
              {t(a.trustSub, lang)}
            </p>
            <div className="mt-8">
              <MagneticButton
                as="a"
                href="/#contact"
                className="btn-brand inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-primary-foreground"
              >
                {t(a.trustCta, lang)}
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

const Addons = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <CustomCursor />
      <Header />
      <AddonsContent />
      <Footer />
      <MobileNav />
    </div>
  </LanguageProvider>
);

export default Addons;
