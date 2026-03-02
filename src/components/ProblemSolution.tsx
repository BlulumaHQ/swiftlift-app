import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { Minus, Check } from "lucide-react";

const ProblemSolution = () => {
  const { lang } = useLanguage();
  const ps = translations.problemSolution;
  const outdatedItems = ps.outdatedItems;
  const rebuildItems = ps.rebuildItems;
  const headline = t(ps.headline, lang);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: Headline + Paragraph */}
          <ScrollReveal>
            <div className="md:sticky md:top-32">
              <motion.h2
                key={lang + "-ps-h"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-[clamp(1.8rem,3.5vw,3rem)] md:text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground whitespace-pre-line font-display"
              >
                {headline}
              </motion.h2>
              <span className="section-underline section-underline--light" />
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
                {t(ps.body, lang)}
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Comparison block */}
          <ScrollReveal delay={0.15}>
            <div className="rounded-2xl border border-border overflow-hidden">
              {/* Column headers */}
              <div className="grid grid-cols-2">
                <div className="px-6 py-4 bg-muted/40 border-b border-r border-border">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    {t(ps.outdatedTitle, lang)}
                  </p>
                </div>
                <div
                  className="px-6 py-4 border-b border-border"
                  style={{ background: "hsl(275 51% 46% / 0.06)" }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: "hsl(275 51% 46%)" }}
                  >
                    {t(ps.rebuildTitle, lang)}
                  </p>
                </div>
              </div>

              {/* Rows */}
              {outdatedItems.map((_, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-2 ${i < outdatedItems.length - 1 ? "border-b border-border" : ""}`}
                >
                  {/* Left cell - muted */}
                  <div className="px-6 py-4 bg-muted/20 border-r border-border flex items-start gap-3">
                    <Minus size={14} className="mt-0.5 flex-shrink-0 text-muted-foreground/50" />
                    <span className="text-sm text-muted-foreground font-medium">
                      {t(outdatedItems[i], lang)}
                    </span>
                  </div>
                  {/* Right cell - purple tint */}
                  <div
                    className="px-6 py-4 flex items-start gap-3"
                    style={{ background: "hsl(275 51% 46% / 0.04)" }}
                  >
                    <Check
                      size={14}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "hsl(275 51% 46%)" }}
                    />
                    <span className="text-sm text-foreground font-semibold">
                      {t(rebuildItems[i], lang)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Subtle accent border at bottom of right column */}
              <div className="grid grid-cols-2">
                <div />
                <div
                  className="h-[3px]"
                  style={{ background: "hsl(275 51% 46% / 0.4)" }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
