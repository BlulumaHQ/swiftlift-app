import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import { FilePlus2, Monitor, ClipboardCheck, Blocks, Rocket, ArrowRight, ArrowDown } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const icons = [FilePlus2, Monitor, Rocket];
const numbers = ["01", "02", "03"];

const ProcessSteps = () => {
  const { lang } = useLanguage();
  const process = translations.process;
  const lineRef = useRef(null);
  const isLineInView = useInView(lineRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="process" className="py-16 md:py-24 relative overflow-hidden section-brand-dark">
      <div className="watermark text-[25vw] top-[10%] -left-[5%] font-display" style={{ writingMode: "vertical-rl", color: "hsl(0 0% 100% / 0.03)" }}>
        Process
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white text-center font-display">
            {t(process.headline, lang)}
          </h2>
          <div className="flex justify-center">
            <span className="section-underline section-underline--dark" />
          </div>
        </ScrollReveal>

        {/* Desktop */}
        <div ref={lineRef} className="mt-14 hidden md:flex items-start gap-4 relative">
          <svg className="absolute top-[78px] left-[8%] right-[8%] h-[2px] overflow-visible" style={{ width: "84%", zIndex: 0 }}>
            <motion.line
              x1="0" y1="1" x2="100%" y2="1"
              stroke="hsl(0 0% 100% / 0.2)"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={isLineInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {process.steps.map((step, i) => {
            const Icon = icons[i];
            const isActive = i === 0;
            const isHovered = hoveredIndex === i;
            return (
              <div key={i} className="flex-1 flex items-center relative" style={{ zIndex: 2 }}>
                <ScrollReveal delay={0.12 * i} className="flex-1">
                  <div
                    className="flex flex-col items-center text-center relative overflow-visible cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span
                      className="absolute font-black font-display select-none leading-none text-[15rem] text-white/[0.02]"
                      style={{ zIndex: 0, top: "50%", left: "50%", transform: "translate(-50%, -55%)" }}
                    >
                      {numbers[i]}
                    </span>
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        y: isHovered ? -8 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-[156px] h-[156px] rounded-full flex items-center justify-center border-2 shadow-xl transition-colors duration-300 mb-5 ${
                        isActive || isHovered
                          ? "bg-white border-white"
                          : "bg-[hsl(209,66%,22%)] border-white/30"
                      }`}
                      style={{ position: "relative", zIndex: 10 }}
                    >
                      <Icon size={52} className={`transition-colors duration-300 ${isActive || isHovered ? "text-primary" : "text-white"}`} />
                    </motion.div>
                    <h3 className="font-bold text-white text-base font-display relative" style={{ zIndex: 10 }}>{t(step.title, lang)}</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-[160px] relative whitespace-pre-line" style={{ zIndex: 10 }}>{t(step.desc, lang)}</p>
                  </div>
                </ScrollReveal>
                {i < process.steps.length - 1 && (
                  <div className="flex-shrink-0 -mx-1" style={{ zIndex: 10 }}>
                    <ArrowRight size={22} style={{ color: "hsl(214 58% 60%)" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="mt-10 flex flex-col items-center gap-6 md:hidden">
          {process.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="flex flex-col items-center w-full max-w-sm mx-auto">
                <ScrollReveal delay={0.08 * i} className="w-full">
                  <div className="rounded-2xl p-7 w-full flex flex-col items-center text-center border border-white/10 relative bg-white/5" style={{ overflow: "visible" }}>
                    <span className="absolute top-6 left-6 text-8xl font-black text-white/[0.03] font-display select-none leading-none" style={{ zIndex: 0 }}>
                      {numbers[i]}
                    </span>
                    <div
                      className={`w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 border-2 shadow-xl ${
                        i === 0 ? "bg-white border-white" : "bg-[hsl(209,66%,22%)] border-white/30"
                      }`}
                      style={{ position: "relative", zIndex: 10 }}
                    >
                      <Icon size={28} className={i === 0 ? "text-primary" : "text-white"} />
                    </div>
                    <h3 className="font-bold text-white text-lg font-display">{t(step.title, lang)}</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed whitespace-pre-line">{t(step.desc, lang)}</p>
                  </div>
                </ScrollReveal>
                {i < process.steps.length - 1 && (
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
  );
};

export default ProcessSteps;
