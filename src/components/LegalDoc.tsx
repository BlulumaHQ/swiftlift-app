import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO_ROUTES } from "@/lib/seoRoutes";

type L = { en: string; zh: string };
export type LegalSection = { title: L; body?: L[]; list?: L[] };

/** Shared layout for /terms and /privacy (bilingual, data-driven). */
export const LegalDoc = ({
  path,
  title,
  effective,
  intro,
  sections,
}: {
  path: "/terms" | "/privacy";
  title: L;
  effective: L;
  intro: L[];
  sections: LegalSection[];
}) => {
  const { lang } = useLanguage();
  const t = (x: L) => (lang === "en" ? x.en : x.zh);

  useEffect(() => {
    document.title = SEO_ROUTES[path].title;
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://swiftlift.app${path}`);
    return () => { canonical?.setAttribute("href", "https://swiftlift.app/"); };
  }, [path]);

  return (
    <main>
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white font-display leading-tight"
          >
            {t(title)}
          </motion.h1>
        </div>
      </section>

      <div className="py-16 md:py-20 max-w-3xl mx-auto px-6">
        <p className="text-sm text-muted-foreground">{t(effective)}</p>
        <div className="mt-8 space-y-8 text-[15px] text-muted-foreground leading-relaxed">
          {intro.map((p) => <p key={p.en}>{t(p)}</p>)}
          {sections.map((s, i) => (
            <section key={s.title.en}>
              <h2 className="text-lg font-bold text-foreground mb-2">{i + 1}. {t(s.title)}</h2>
              {s.body?.map((p) => <p key={p.en} className="mt-2">{t(p)}</p>)}
              {s.list && (
                <ul className="mt-2 list-disc pl-5 space-y-1.5">
                  {s.list.map((li) => <li key={li.en}>{t(li)}</li>)}
                </ul>
              )}
            </section>
          ))}
          <p>
            {lang === "en" ? "Questions? Email " : "如有任何問題，請來信："}
            <a href="mailto:support@swiftlift.app" className="text-primary hover:underline">support@swiftlift.app</a>
          </p>
        </div>
      </div>
    </main>
  );
};
