import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import { Check } from "lucide-react";

const SCROLL_TO_FORM = () => {
  const form = document.getElementById("intake-form") || document.getElementById("hero");
  if (form) form.scrollIntoView({ behavior: "smooth" });
};

const versionA = {
  label: { en: "Version A: Launch Ready", zh: "版本 A：快速上線版" },
  price: "$299 USD",
  description: {
    en: "A clean, professional website that gets your business online fast.",
    zh: "一個簡潔、專業的網站，讓您的業務快速上線。",
  },
  features: {
    en: [
      "1–3 polished pages",
      "Mobile-optimized design",
      "Contact form setup",
      "Brand color integration",
      "Fast load performance",
    ],
    zh: [
      "1–3 個精緻頁面",
      "行動裝置優化設計",
      "聯絡表單設置",
      "品牌配色整合",
      "快速載入效能",
    ],
  },
};

const versionB = {
  label: { en: "Version B: Sales Focused", zh: "版本 B：銷售導向版" },
  price: "$799 USD",
  subtitle: {
    en: "Designed to bring you more calls, leads, and bookings",
    zh: "專為為您帶來更多來電、潛在客戶和預約而設計",
  },
  description: {
    en: "A conversion-driven website built to generate real business results.",
    zh: "以轉化為驅動的網站，旨在產生真實的業務成果。",
  },
  features: {
    en: [
      "3–7 strategic pages",
      "Conversion-focused layout",
      "Strategic CTA placement",
      "Customer journey mapping",
      "SEO-ready structure",
      "Trust-building sections",
      "Lead capture optimization",
    ],
    zh: [
      "3–7 個策略性頁面",
      "轉化導向佈局",
      "策略性 CTA 佈置",
      "客戶旅程規劃",
      "SEO 就緒結構",
      "信任建立區塊",
      "潛在客戶捕獲優化",
    ],
  },
};

const introText = {
  en: "You don't need to choose now — you'll get both versions first.",
  zh: "您不需要現在做決定 — 您會先收到兩個版本。",
};

const ctaText = {
  en: "Get My 2 Free Website Previews",
  zh: "獲取我的 2 個免費網站預覽",
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
        {/* Headline */}
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

        {/* 2-card grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Version A */}
          <ScrollReveal delay={0}>
            <div className="rounded-2xl flex flex-col border border-border bg-background p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {lang === "en" ? "VERSION A" : "版本 A"}
              </p>
              <h3 className="text-lg font-bold text-foreground font-display">
                {t(versionA.label, lang)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {t(versionA.description, lang)}
              </p>
              <div className="mt-3">
                <span className="text-4xl font-black text-foreground font-display">
                  {versionA.price}
                </span>
              </div>

              <ul className="space-y-3 flex-1 mt-6">
                {versionA.features[lang].map((f, i) => (
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
                  className="w-full inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-[0.97]"
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
                {t(versionB.label, lang)}
              </h3>
              <p className="mt-0.5 text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                {t(versionB.subtitle, lang)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {t(versionB.description, lang)}
              </p>
              <div className="mt-3">
                <span className="text-4xl font-black text-foreground font-display">
                  {versionB.price}
                </span>
              </div>

              <ul className="space-y-3 flex-1 mt-6">
                {versionB.features[lang].map((f, i) => (
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
                  className="w-full inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-[0.97]"
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
