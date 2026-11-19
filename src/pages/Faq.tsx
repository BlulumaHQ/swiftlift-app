import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SEO_ROUTES } from "@/lib/seoRoutes";
import { FAQ_CATEGORIES } from "@/lib/faqContent";



const FaqContent = () => {
  const { lang } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  useEffect(() => {
    document.title = SEO_ROUTES["/faq"].title;
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://swiftlift.app/faq");
    return () => { canonical?.setAttribute("href", "https://swiftlift.app/"); };
  }, []);

  return (
    <>
      {/* Blue Hero */}
      <section className="section-brand-dark pt-28 pb-14 md:pt-36 md:pb-20 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-white mb-4"
          >
            {lang === "en" ? "Frequently Asked Questions" : "常見問題"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[1.05rem] md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            {lang === "en" ? "Everything you need to know before and after your free preview." : "關於免費預覽前後您需要了解的一切。"}
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-12">
            {FAQ_CATEGORIES.map((cat, ci) => (
              <div key={ci}>
                <h2 className="text-xl md:text-2xl font-bold text-foreground font-display mb-4">{cat.title[lang]}</h2>
                <div className="space-y-3">
                  {cat.items.map((item, i) => {
                    const key = `${ci}-${i}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={key}
                        className={`rounded-xl border border-border overflow-hidden bg-background transition-all ${isOpen ? "border-l-4 faq-expanded-bg" : ""}`}
                        style={isOpen ? { borderLeftColor: "hsl(275 51% 46%)" } : {}}
                      >
                        <button
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className="font-semibold text-foreground pr-4">{item.q[lang]}</span>
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
                              <div className="px-5 pb-5 text-muted-foreground text-[15px] leading-relaxed whitespace-pre-line">
                                {item.a[lang]}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const Faq = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background text-foreground">
      
      <Header />
      <FaqContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default Faq;
