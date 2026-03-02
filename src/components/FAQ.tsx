import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const { lang } = useLanguage();
  const faq = translations.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left: sticky headline */}
          <div className="md:w-[35%] md:sticky md:top-32 md:self-start">
            <ScrollReveal>
              <motion.h2
                key={lang + "-faq-h"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-[clamp(1.8rem,3.5vw,3rem)] font-black tracking-tighter text-foreground whitespace-pre-line font-display"
              >
                {t(faq.headline, lang)}
              </motion.h2>
              <span className="section-underline section-underline--light" />
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {t(faq.subheadline, lang)}
              </p>
            </ScrollReveal>
          </div>

          {/* Right: accordion */}
          <div className="md:w-[65%] space-y-3">
            {faq.items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <ScrollReveal key={i} delay={0.05 * i}>
                  <div className={`rounded-xl border border-border overflow-hidden bg-background transition-all ${isOpen ? "border-l-4 faq-expanded-bg" : ""}`}
                    style={isOpen ? { borderLeftColor: "hsl(275 51% 46%)" } : {}}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
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
                          <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                            {t(item.a, lang)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}

            <div className="mt-4">
              <Link
                to="/faq"
                className="text-sm font-semibold hover:underline transition-all"
                style={{ color: "hsl(275 51% 46%)" }}
              >
                {lang === "en" ? "View all FAQs →" : "查看所有常见问题 →"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
