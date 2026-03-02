import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const { lang } = useLanguage();
  const items = translations.testimonials.items;
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 6000;
    const tick = 50;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / interval) * 100);
      if (elapsed >= interval) {
        setCurrent((prev) => (prev + 1) % items.length);
        elapsed = 0;
        setProgress(0);
      }
    }, tick);
    return () => clearInterval(timer);
  }, [items.length, current]);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden section-brand-dark">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Quote watermark */}
        <div className="absolute top-[-2rem] left-6 text-[18rem] font-black font-display pointer-events-none z-0 select-none leading-none" style={{ color: "hsl(0 0% 100% / 0.04)" }}>
          "
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 min-h-[180px] pt-16 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current + lang}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <p className="text-[clamp(1.2rem,2.5vw,1.75rem)] font-bold text-white leading-snug font-display">
                "{t(items[current].quote, lang)}"
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={current + lang + "-info"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-right shrink-0"
            >
              <p className="font-bold text-white text-sm">{t(items[current].name, lang)}</p>
              <p className="text-xs text-white/60">{t(items[current].role, lang)}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="mt-12 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/60 transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
