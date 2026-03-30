import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import portfolioTrade from "@/assets/portfolio-trade.jpg";
import portfolioWellness from "@/assets/portfolio-wellness-new.jpg";
import portfolioLaw from "@/assets/portfolio-law.jpg";
import portfolioConstruction from "@/assets/portfolio-construction.jpg";
import portfolioWholesale from "@/assets/portfolio-wholesale.jpg";
import portfolioLogistics from "@/assets/portfolio-logistics.jpg";
import portfolioRestaurant from "@/assets/portfolio-restaurant.jpg";
import portfolioRealestate from "@/assets/portfolio-realestate.jpg";
import portfolioDental from "@/assets/portfolio-dental.jpg";

const images = [
  portfolioTrade, portfolioWellness, portfolioLaw,
  portfolioConstruction, portfolioWholesale, portfolioLogistics,
  portfolioRestaurant, portfolioRealestate, portfolioDental,
];

const AUTOPLAY_INTERVAL = 5000;

const Portfolio = () => {
  const { lang } = useLanguage();
  const portfolio = translations.portfolio;

  const initialGroup = useMemo(() => Math.floor(Math.random() * 3), []);
  const [currentGroup, setCurrentGroup] = useState(initialGroup);

  const groups = [
    portfolio.items.slice(0, 3),
    portfolio.items.slice(3, 6),
    portfolio.items.slice(6, 9),
  ];

  const imageGroups = [
    images.slice(0, 3),
    images.slice(3, 6),
    images.slice(6, 9),
  ];

  const [isPaused, setIsPaused] = useState(false);
  const next = useCallback(() => setCurrentGroup((g) => (g === 2 ? 0 : g + 1)), []);
  const prev = () => setCurrentGroup((g) => (g === 0 ? 2 : g - 1));

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section id="portfolio" className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div
        className="max-w-7xl mx-auto px-6 relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <ScrollReveal>
          <motion.h2
            key={lang + "-port-h"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground text-center font-display"
          >
            {t(portfolio.headline, lang)}
          </motion.h2>
        </ScrollReveal>

        {/* Carousel */}
        <div className="mt-10 relative">
          <button
            onClick={prev}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-border bg-background shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Previous"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-border bg-background shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Next"
          >
            <ArrowRight size={18} className="text-foreground" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentGroup}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {groups[currentGroup].map((item, i) => (
                <div key={`${currentGroup}-${i}`}>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block cursor-pointer relative"
                  >
                    <div className="card-elevated rounded-2xl overflow-hidden border border-border relative">
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={imageGroups[currentGroup][i]}
                          alt={t(item.title, lang)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm font-display">
                            Visit Site →
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-foreground font-display">{t(item.title, lang)}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(item.desc, lang)}</p>
                  </a>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
