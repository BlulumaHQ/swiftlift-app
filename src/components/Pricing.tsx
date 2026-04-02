import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import { Check } from "lucide-react";

const SCROLL_TO_FORM = () => {
  const form = document.getElementById("intake-form") || document.getElementById("hero");
  if (form) form.scrollIntoView({ behavior: "smooth" });
};

const introText = {
  en: "You don't need to choose now — you'll get both versions first.",
  zh: "您不需要現在做決定 — 您會先收到兩個版本。",
};

const ctaText = {
  en: "Get My 2 Free Website Previews",
  zh: "獲取我的 2 個免費網站預覽",
};

const versionAFeatures = {
  en: [
    "Choose Version A",
    "Clean, modern design",
    "Mobile responsive across all devices",
    "Up to 5–7 pages",
    "Basic SEO-ready structure",
    "Contact form included",
    "Fast 3-day turnaround",
    "Free hosting (no monthly fees)",
  ],
  zh: [
    "簡潔、現代的設計",
    "所有裝置的行動響應式設計",
    "最多 5–7 個頁面",
    "基本 SEO 就緒結構",
    "包含聯絡表單",
    "3 天快速交付",
    "免費託管（無月費）",
  ],
};

const versionBFeatures = {
  en: [
    "Everything in Version A",
    "Conversion-focused layout structure",
    "Strategic CTA placement for lead generation",
    "Optimized section flow for user engagement",
    "Trust-building sections (reviews, credibility blocks)",
    "Improved user journey and content hierarchy",
    "Clear, high-impact messaging structure",
    "More refined and premium visual polish",
    "Stronger business positioning",
    "Priority build slot",
  ],
  zh: [
    "包含版本 A 的所有功能",
    "以轉化為重點的佈局結構",
    "策略性 CTA 佈置以產生潛在客戶",
    "優化的區塊流程以提升用戶參與度",
    "信任建立區塊（評論、可信度區塊）",
    "改善的用戶旅程和內容層次",
    "清晰、高影響力的訊息結構",
    "更精緻和高端的視覺效果",
    "更強的商業定位",
    "優先建構時段",
  ],
};

const Pricing = () => {
  const { lang } = useLanguage();

  return (
    <section
      id="pricing"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ background: "hsl(var(--surface-sunken))" }}
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-foreground text-center font-display">
            {lang === "en" ? "Simple, Transparent Pricing" : "簡單透明的定價"}
          </h2>
          <div className="flex justify-center">
            <span className="section-underline section-underline--light" />
          </div>
          <p className="text-center text-muted-foreground mt-4 text-base md:text-lg">
            {t(introText, lang)}
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Version A */}
          <ScrollReveal delay={0}>
            <div className="rounded-2xl flex flex-col border border-border bg-background p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {lang === "en" ? "VERSION A" : "版本 A"}
              </p>
              <h3 className="text-lg font-bold text-foreground font-display">
                {lang === "en" ? "Version A: Launch Ready" : "版本 A：快速上線版"}
              </h3>
              <div className="mt-3">
                <span className="text-4xl font-black text-foreground font-display">
                  $299 USD
                </span>
              </div>
              <p className="mt-2 text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                {lang === "en"
                  ? "Clean, professional website — ready to launch fast"
                  : "簡潔、專業的網站 — 快速上線"}
              </p>

              <ul className="space-y-3 flex-1 mt-6">
                {versionAFeatures[lang].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "hsl(var(--primary))" }}
                    />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <button
                  onClick={SCROLL_TO_FORM}
                  className="w-full inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 active:scale-[0.97]"
                  style={{
                    backgroundColor: "hsl(275 51% 46%)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(275 51% 38%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsl(275 51% 46%)")}
                >
                  {t(ctaText, lang)}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Version B */}
          <ScrollReveal delay={0.08}>
            <div className="rounded-2xl flex flex-col border border-border bg-background p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full ring-1 ring-primary/10">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {lang === "en" ? "VERSION B" : "版本 B"}
              </p>
              <h3 className="text-lg font-bold text-foreground font-display">
                {lang === "en" ? "Version B: Sales Focused" : "版本 B：銷售導向版"}
              </h3>
              <div className="mt-3">
                <span className="text-4xl font-black text-foreground font-display">
                  $799 USD
                </span>
              </div>
              <p className="mt-2 text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                {lang === "en"
                  ? "Designed to get more inquiries and customers"
                  : "專為獲得更多詢問和客戶而設計"}
              </p>

              <ul className="space-y-3 flex-1 mt-6">
                {versionBFeatures[lang].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "hsl(var(--primary))" }}
                    />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <button
                  onClick={SCROLL_TO_FORM}
                  className="w-full inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 active:scale-[0.97]"
                  style={{
                    backgroundColor: "hsl(275 51% 46%)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(275 51% 38%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsl(275 51% 46%)")}
                >
                  {t(ctaText, lang)}
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
