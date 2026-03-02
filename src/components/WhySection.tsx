import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Clock, Palette, Rocket, CreditCard } from "lucide-react";

const CountUp = ({ target }: { target: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericMatch = target.match(/\d+/);
  const numericTarget = numericMatch ? parseInt(numericMatch[0]) : 0;
  const prefix = target.replace(/[\d]+.*/, "");
  const suffix = target.replace(/.*\d/, "");

  useEffect(() => {
    if (!isInView || numericTarget === 0) return;
    let cancelled = false;
    let start: number | null = null;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (cancelled) return;
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return () => { cancelled = true; };
  }, [isInView, numericTarget]);

  return (
    <span ref={ref}>
      {prefix}{numericTarget > 0 ? count : target}{suffix}
    </span>
  );
};

const bentoIcons = [Clock, Palette, Rocket, CreditCard];

const WhySection = () => {
  const { lang } = useLanguage();
  const why = translations.why;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "hsl(var(--surface-sunken))" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Headline area */}
        <div className="max-w-3xl mb-12">
          <ScrollReveal>
            <motion.h2
              key={lang + "-why-h"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`text-[clamp(1.8rem,3.5vw,3rem)] md:text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground whitespace-pre-line font-display ${lang === "zh" ? "leading-[1.8] pb-4" : ""}`}
            >
              {t(why.headline, lang)}
            </motion.h2>
            <span className="section-underline section-underline--light" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <motion.p
              key={lang + "-why-p"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-base leading-relaxed text-muted-foreground max-w-xl"
            >
              {t(why.body, lang)}
            </motion.p>
          </ScrollReveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ gridAutoRows: "1fr" }}>
          {why.stats.map((stat, i) => {
            const Icon = bentoIcons[i];
            const isLarge = i === 0 || i === 3;
            return (
              <ScrollReveal key={i} delay={0.1 + 0.08 * i}>
                <div
                  className={`relative rounded-2xl border border-border p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-400 hover:shadow-lg hover:-translate-y-1 h-full ${
                    isLarge ? "text-white" : "bg-background"
                  }`}
                  style={{
                    minHeight: "180px",
                    ...(isLarge ? { background: "hsl(var(--accent-purple))" } : {}),
                  }}
                >
                  <Icon
                    size={24}
                    className={`mb-4 ${isLarge ? "text-white/60" : ""}`}
                    style={!isLarge ? { color: "hsl(275 51% 46% / 0.6)" } : {}}
                  />
                  <div>
                    <div className={`text-3xl md:text-4xl font-black font-display ${
                      isLarge ? "text-white" : ""
                    }`}
                      style={!isLarge ? { color: "hsl(275 51% 46%)" } : {}}
                    >
                      <CountUp target={t(stat.value, lang)} />
                    </div>
                    <div className={`mt-2 text-sm font-medium ${
                      isLarge ? "text-white/70" : "text-muted-foreground"
                    }`}>
                      {t(stat.label, lang)}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
