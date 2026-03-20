import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import { PRICING, formatPrice, formatStartingAtPlus, STRIPE_LINKS } from "@/lib/pricing";
import ScrollReveal from "./ScrollReveal";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const mp = PRICING.websitePackages.multiPage;
const cs = PRICING.websitePackages.customSolutions;

const plans = [
  {
    tier: "launch",
    title: { en: "Starter", zh: "入门版" },
    subtitle: { en: "LAUNCH", zh: "启动" },
    originalPrice: null,
    price: formatPrice(mp[0].price),
    promo: null,
    badge: null,
    description: {
      en: "For businesses that need a clean, professional online presence fast.",
      zh: "适合需要快速建立专业线上形象的企业。",
    },
    features: {
      en: [
        "1–2 Core Pages",
        "Clean Modern Interface",
        "Mobile Optimized",
        "Contact Capture Setup",
        "Brand Color Integration",
        "Performance Optimized",
      ],
      zh: [
        "1–2 核心页面",
        "简洁现代界面",
        "移动端优化",
        "联系表单配置",
        "品牌配色融合",
        "性能优化",
      ],
    },
    cta: { en: "Claim My FREE Previews", zh: "获取FREE预览" },
    ctaSub: { en: "No credit card required. No obligation.", zh: "无需信用卡。无任何义务。" },
    ctaHref: STRIPE_LINKS["preview-access"],
    isPremium: false,
  },
  {
    tier: "growth",
    title: { en: "Growth", zh: "成长版" },
    subtitle: { en: "GROWTH", zh: "成长" },
    originalPrice: null,
    price: formatPrice(mp[1].price),
    promo: null,
    badge: { en: "Most Popular", zh: "最受欢迎" },
    description: {
      en: "Designed to turn visitors into qualified inquiries\nwith structured layout.",
      zh: "旨在通过结构化布局\n将访客转化为高质量咨询。",
    },
    features: {
      en: [
        "3–7 Structured Pages",
        "Conversion-Focused Layout",
        "Strategic CTA Placement",
        "Contact + Map Integration",
        "Brand Consistency System",
        "Performance Optimized",
      ],
      zh: [
        "3–7 结构化页面",
        "转化导向布局",
        "战略性CTA布局",
        "联系 + 地图集成",
        "品牌一致性系统",
        "性能优化",
      ],
    },
    cta: { en: "Claim My FREE Previews", zh: "获取FREE预览" },
    ctaSub: { en: "No credit card required. No obligation.", zh: "无需信用卡。无任何义务。" },
    ctaHref: STRIPE_LINKS["launch-ready"],
    isPremium: false,
  },
  {
    tier: "conversion",
    title: { en: "Strategy-Level Website", zh: "策略级网站" },
    subtitle: { en: "CONVERSION ARCHITECTURE", zh: "转化架构" },
    originalPrice: null,
    price: formatStartingAtPlus(cs[2].price),
    promo: null,
    badge: null,
    description: {
      en: "Built for brands that require strategic structure and scalable growth.",
      zh: "为需要战略结构和可扩展增长的品牌而建。",
    },
    features: {
      en: [
        "Conversion-Driven Architecture",
        "Customer Journey Mapping",
        "Messaging Hierarchy Strategy",
        "SEO Framework Planning",
        "Funnel-Based Page Structure",
        "Advanced Integrations",
        "Growth-Ready Infrastructure",
      ],
      zh: [
        "转化驱动架构",
        "客户旅程映射",
        "信息层级策略",
        "SEO框架规划",
        "漏斗式页面结构",
        "高级集成",
        "增长就绪基础设施",
      ],
    },
    cta: { en: "Request Strategy Consultation", zh: "申请策略咨询" },
    ctaSub: null,
    ctaHref: STRIPE_LINKS["growth-optimized"],
    isPremium: true,
  },
];

const Pricing = () => {
  const { lang } = useLanguage();
  const pricing = translations.pricing;
  const headline = t(pricing.headline, lang);

  return (
    <section id="pricing" className="py-16 md:py-24 relative overflow-hidden" style={{ background: "hsl(var(--surface-sunken))" }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <motion.h2
            key={lang + "-price-h"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground text-center font-display whitespace-pre-line"
          >
            {headline}
          </motion.h2>
          <div className="flex justify-center">
            <span className="section-underline section-underline--light" />
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => {
            const isHero = i === 1;
            return (
              <ScrollReveal key={i} delay={0.08 * i}>
                <div
                  className={`rounded-2xl flex flex-col border transition-all duration-400 relative h-full ${
                    isHero
                      ? "p-8 bg-background border-border shadow-2xl border-t-4 md:-translate-y-3"
                      : "p-6 md:p-8 bg-background border-border shadow-sm"
                  }`}
                  style={isHero ? { borderTopColor: "hsl(275 51% 46%)" } : {}}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 whitespace-nowrap"
                      style={{ background: "hsl(275 51% 46%)" }}
                    >
                      <Star size={13} className="fill-current" />
                      {t(plan.badge, lang)}
                    </div>
                  )}

                  {/* Subtitle label */}
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    {t(plan.subtitle, lang)}
                  </p>

                  {/* Title */}
                  <h3 className={`font-bold text-foreground font-display ${isHero ? "text-xl" : "text-lg"}`}>
                    {t(plan.title, lang)}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {t(plan.description, lang)}
                  </p>

                  {/* Price row */}
                  <div className="mt-3 flex items-baseline gap-2 text-foreground">
                    {plan.originalPrice && (
                      <span className="text-lg line-through opacity-40">{plan.originalPrice}</span>
                    )}
                    <span className={`font-black font-display ${isHero ? "text-5xl" : "text-4xl"}`}>
                      {plan.price}
                    </span>
                  </div>
                  {plan.isPremium && (
                    <p className="text-xs text-muted-foreground mt-0.5">Starting at</p>
                  )}

                  {/* Promo row — reserved height for alignment */}
                  <div className="h-8 mt-2 flex items-center">
                    {plan.promo ? (
                      <span
                        className="text-xs font-bold inline-block px-3 py-1 rounded-full"
                        style={{ color: "hsl(275 51% 46%)", background: "hsl(275 51% 46% / 0.1)" }}
                      >
                        {t(plan.promo, lang)}
                      </span>
                    ) : null}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mt-3">
                    {plan.features[lang].map((feature, ri) => (
                      <li key={ri} className="flex items-start gap-2.5 text-sm">
                        <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA area — pushed to bottom */}
                  <div className="mt-6 flex flex-col items-center">
                    <MagneticButton
                      as="a"
                      href={plan.ctaHref}
                      className={`w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                        isHero
                          ? "btn-brand text-base py-3.5"
                          : plan.isPremium
                            ? "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
                            : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {t(plan.cta, lang)}
                    </MagneticButton>
                    {plan.ctaSub && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {t(plan.ctaSub, lang)}
                      </p>
                    )}
                    {/* Reserve subtext row height even if empty */}
                    {!plan.ctaSub && <p className="mt-2 text-xs">&nbsp;</p>}
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

export default Pricing;
