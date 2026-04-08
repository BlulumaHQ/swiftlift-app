import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageCircle, Star, MapPin, BarChart, Image, Edit, Globe, Languages,
  Mail, Calendar, List, Zap, Search, Palette, CreditCard, Lock,
  Package, Target, TrendingUp, Sparkles, ArrowRight
} from "lucide-react";

type LangObj = { en: string; zh: string };
const T = (obj: LangObj, lang: "en" | "zh") => obj[lang];

/* ═══════════════════════════════════════════════
   SECTION DATA
   ═══════════════════════════════════════════════ */

const trustEssentials = [
  {
    icon: MessageCircle,
    title: { en: "FAQ Section", zh: "常見問題區塊" },
    desc: { en: "Answer common questions and reduce hesitation before customers contact you.", zh: "回答常見問題，減少客戶聯繫前的猶豫。" },
    price: "$49 USD",
    link: "https://buy.stripe.com/cNifZg3KA2jz7Du2rzfw40U",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
  {
    icon: Star,
    title: { en: "Review / Testimonial", zh: "評價展示" },
    desc: { en: "Build trust instantly by showcasing real customer feedback.", zh: "透過展示真實客戶回饋即時建立信任。" },
    price: "$49 USD",
    link: "https://buy.stripe.com/9B69AS5SI4rHf5WaY5fw40R",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
  {
    icon: MapPin,
    title: { en: "Google Map / Hours", zh: "Google地圖/營業時間" },
    desc: { en: "Help customers find your location and business hours easily.", zh: "幫助客戶輕鬆找到您的位置和營業時間。" },
    price: "$29 USD",
    link: "https://buy.stripe.com/4gM6oG4OE8HXga03vDfw40T",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
  {
    icon: BarChart,
    title: { en: "Analytics / Pixel Setup", zh: "分析/像素設置" },
    desc: { en: "Track visitor behavior and understand what's working on your website.", zh: "追蹤訪客行為，了解網站的有效之處。" },
    price: "$99 USD",
    link: "https://buy.stripe.com/6oU7sK0yo3nD0b2c29fw40S",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
];

const contentPresentation = [
  {
    icon: Image,
    title: { en: "Gallery Section", zh: "圖庫區塊" },
    desc: { en: "Showcase your work, products, or space with strong visual presentation.", zh: "透過強大的視覺呈現展示您的作品、產品或空間。" },
    price: "$99 USD",
    link: "https://buy.stripe.com/4gM14m6WM5vLbTK0jrfw40Q",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
  {
    icon: Edit,
    title: { en: "Blog Setup", zh: "部落格設置" },
    desc: { en: "Publish content to improve SEO and build long-term authority.", zh: "發布內容以改善SEO並建立長期權威。" },
    price: "$199 USD",
    link: "https://buy.stripe.com/dRmcN4gxm1fv1f69U1fw40P",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
  {
    icon: Globe,
    title: { en: "Basic Bilingual Setup", zh: "基礎雙語設置" },
    desc: { en: "Allow visitors to switch between two languages on your site.", zh: "讓訪客在您的網站上切換兩種語言。" },
    price: "$149 USD",
    link: "https://buy.stripe.com/3cI4gya8Y1fvcXO0jrfw40O",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
  {
    icon: Languages,
    title: { en: "Multi Language Page Setup", zh: "多語言頁面設置" },
    desc: { en: "Create SEO-friendly pages for multiple languages to reach a wider audience.", zh: "為多種語言創建SEO友好頁面，觸及更廣泛的受眾。" },
    price: "$199 USD",
    link: "https://buy.stripe.com/3cIeVc6WMgapcXO4zHfw40N",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
];

const leadConversion = [
  {
    icon: Mail,
    title: { en: "Advanced Contact Form", zh: "進階聯繫表單" },
    desc: { en: "Capture detailed inquiries with custom fields tailored to your business.", zh: "透過為您業務量身定制的自訂欄位捕獲詳細詢問。" },
    price: "$129 USD",
    link: "https://buy.stripe.com/7sYdR82Gwf6lf5W3vDfw40M",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
  {
    icon: Calendar,
    title: { en: "Booking Request Form", zh: "預約請求表單" },
    desc: { en: "Let customers request appointments directly from your website.", zh: "讓客戶直接從您的網站預約。" },
    price: "$149 USD",
    link: "https://buy.stripe.com/bJeaEW94U4rH8Hy5DLfw40L",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
  {
    icon: List,
    title: { en: "Multi-Step Quote Form", zh: "多步驟報價表單" },
    desc: { en: "Guide users step-by-step to increase form completion and lead quality.", zh: "逐步引導用戶以提高表單完成率和潛客質量。" },
    price: "$149 USD",
    link: "https://buy.stripe.com/3cIbJ06WMbU98Hy2rzfw40K",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
];

const growthOptimization = [
  {
    icon: Zap,
    title: { en: "Performance Optimization", zh: "性能優化" },
    desc: { en: "Improve website speed and overall user experience.", zh: "提升網站速度和整體用戶體驗。" },
    price: "$99 USD",
    link: "https://buy.stripe.com/9B67sK94U0bre1S9U1fw40I",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
  {
    icon: Search,
    title: { en: "Onsite SEO Optimization", zh: "站內SEO優化" },
    desc: { en: "Optimize your site structure and content to improve search rankings.", zh: "優化網站結構和內容以提升搜索排名。" },
    price: "$99 USD",
    link: "https://buy.stripe.com/9B6cN494UcYd7Dufelfw40J",
    btn: { en: "Add This Feature", zh: "添加此功能" },
  },
];

const advancedSystems = [
  {
    icon: Palette,
    title: { en: "Brand Identity Package", zh: "品牌形象套餐" },
    desc: { en: "Create a consistent and professional brand across your website.", zh: "在您的網站上創建一致且專業的品牌。" },
    price: "$299 USD",
    link: "https://buy.stripe.com/fZu14m80Qf6l4rieahfw40H",
    btn: { en: "Get Started", zh: "開始" },
  },
  {
    icon: CreditCard,
    title: { en: "Payment Integration", zh: "支付集成" },
    desc: { en: "Accept payments directly on your website without a full eCommerce system.", zh: "直接在網站上接受付款，無需完整的電子商務系統。" },
    price: "$249 USD",
    link: "https://buy.stripe.com/4gMeVc80Qf6l1f63vDfw40G",
    btn: { en: "Get Started", zh: "開始" },
  },
  {
    icon: Lock,
    title: { en: "Membership / Client Portal", zh: "會員/客戶門戶" },
    desc: { en: "Allow users to log in and access private content or manage accounts.", zh: "允許用戶登入並訪問私人內容或管理帳戶。" },
    price: "$399 USD",
    link: "https://buy.stripe.com/9B63cu1Cs2jz5vmeahfw40F",
    btn: { en: "Get Started", zh: "開始" },
  },
];

const bundlesData = [
  {
    icon: Package,
    title: { en: "Conversion Essentials", zh: "轉化基礎套餐" },
    desc: { en: "FAQ Section · Review / Testimonial · Google Map / Hours · Analytics Setup", zh: "常見問題 · 評價展示 · Google地圖/營業時間 · 分析設置" },
    price: "$199 USD",
    savings: { en: "Save $77", zh: "節省 $77" },
    link: "https://buy.stripe.com/eVq7sK6WMbU95vmfelfw40E",
  },
  {
    icon: Target,
    title: { en: "Lead Generation Pack", zh: "潛客獲取套餐" },
    desc: { en: "Advanced Contact Form · Booking Request Form", zh: "進階聯繫表單 · 預約請求表單" },
    price: "$249 USD",
    savings: { en: "Save $29", zh: "節省 $29" },
    link: "https://buy.stripe.com/dRmbJ0epe7DT4ri6HPfw40D",
  },
  {
    icon: TrendingUp,
    title: { en: "Conversion Upgrade Pack", zh: "轉化升級套餐" },
    desc: { en: "Advanced Contact Form · Multi-Step Quote Form · Review / Testimonial · FAQ Section", zh: "進階聯繫表單 · 多步驟報價表單 · 評價展示 · 常見問題" },
    price: "$299 USD",
    savings: { en: "Save $128", zh: "節省 $128" },
    link: "https://buy.stripe.com/bJedR84OE5vLga0c29fw40C",
  },
];

/* ═══════════════════════════════════════════════
   FEATURE CARD
   ═══════════════════════════════════════════════ */

const FeatureCard = ({ icon: Icon, title, desc, price, btnLabel, stripeLink, lang, highlight }: {
  icon: any; title: LangObj; desc: LangObj; price: string; btnLabel: LangObj; stripeLink: string; lang: "en" | "zh"; highlight?: boolean;
}) => (
  <div className={`rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] flex flex-col h-full border ${highlight ? "border-[hsl(275_51%_46%)/0.2]" : "border-black/[0.04]"}`}>
    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.08)" }}>
      <Icon size={22} style={{ color: "hsl(275 51% 46%)" }} />
    </div>
    <h3 className="text-[1.05rem] font-bold text-foreground leading-snug">{T(title, lang)}</h3>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{T(desc, lang)}</p>
    <div className="mt-auto pt-5">
      <span className="text-2xl font-black text-foreground">{price}</span>
      <a
        href={stripeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 active:scale-[0.97]"
        style={{ backgroundColor: "hsl(275 51% 46%)" }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 38%)")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 46%)")}
      >
        {T(btnLabel, lang)}
      </a>
      <p className="mt-1.5 text-[11px] text-center text-muted-foreground/60">Secure checkout powered by Stripe</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   SECTION RENDERER
   ═══════════════════════════════════════════════ */

const FeatureSection = ({ title, subtitle, items, lang, bgClass, highlight, columns }: {
  title: LangObj; subtitle?: LangObj; items: typeof trustEssentials; lang: "en" | "zh"; bgClass?: string; highlight?: boolean; columns?: number;
}) => (
  <section className={`py-16 md:py-24 ${bgClass || "bg-white"}`}>
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="text-center mb-12">
          {highlight && (
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(275 51% 46%)" }}>
              <Sparkles size={14} />
              {lang === "en" ? "HIGH IMPACT" : "高影響力"}
            </span>
          )}
          <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display">
            {T(title, lang)}
          </h2>
          {subtitle && (
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">{T(subtitle, lang)}</p>
          )}
        </div>
      </ScrollReveal>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 2 ? "" : "lg:grid-cols-3"} gap-6`}>
        {items.map((item, i) => (
          <ScrollReveal key={i} delay={0.04 * i}>
            <FeatureCard
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              price={item.price}
              btnLabel={item.btn}
              stripeLink={item.link}
              lang={lang}
              highlight={highlight}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

const FeaturesContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Features & Add-ons — SwiftLift";
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://swiftlift.app/features");
    return () => { canonical?.setAttribute("href", "https://swiftlift.app/"); };
  }, []);

  return (
    <main>
      {/* ── Page Header ── */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white font-display leading-tight"
          >
            {lang === "en" ? "What You Can Add to Your Website" : "您可以為網站添加的功能"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-white/80 text-[1.05rem] md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en"
              ? "Enhance your website with features that build trust, increase inquiries, and support your business growth."
              : "透過建立信任、增加詢問和支持業務成長的功能來增強您的網站。"}
          </motion.p>
        </div>
      </section>

      {/* ── Trust & Essentials ── */}
      <FeatureSection
        title={{ en: "Trust & Essentials", zh: "信任與基礎" }}
        items={trustEssentials}
        lang={lang}
        bgClass="bg-white"
        columns={2}
      />

      {/* ── Content & Presentation ── */}
      <FeatureSection
        title={{ en: "Content & Presentation", zh: "內容與呈現" }}
        items={contentPresentation}
        lang={lang}
        bgClass="bg-[#F8F8FA]"
        columns={2}
      />

      {/* ── Lead & Conversion (Highlighted) ── */}
      <FeatureSection
        title={{ en: "Lead & Conversion", zh: "潛客與轉化" }}
        items={leadConversion}
        lang={lang}
        bgClass="bg-white"
        highlight
      />

      {/* ── Growth & Optimization ── */}
      <FeatureSection
        title={{ en: "Growth & Optimization", zh: "成長與優化" }}
        items={growthOptimization}
        lang={lang}
        bgClass="bg-[#F8F8FA]"
        columns={2}
      />

      {/* ── Advanced Systems ── */}
      <FeatureSection
        title={{ en: "Advanced Systems", zh: "進階系統" }}
        items={advancedSystems}
        lang={lang}
        bgClass="bg-white"
      />

      {/* ── Bundle & Save ── */}
      <section className="py-16 md:py-24 bg-[#F8F8FA]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(275 51% 46%)" }}>
                <Sparkles size={14} />
                {lang === "en" ? "BUNDLE & SAVE" : "套餐優惠"}
              </span>
              <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display">
                {lang === "en" ? "Bundle & Save" : "套餐優惠"}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                {lang === "en"
                  ? "Get multiple features at a better price — designed for common business needs."
                  : "以更優惠的價格獲取多項功能——為常見業務需求而設計。"}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundlesData.map((bundle, i) => {
              const Icon = bundle.icon;
              return (
                <ScrollReveal key={i} delay={0.06 * i}>
                  <div className="rounded-2xl bg-white p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] flex flex-col h-full border border-black/[0.04]">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.08)" }}>
                      <Icon size={22} style={{ color: "hsl(275 51% 46%)" }} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{T(bundle.title, lang)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{T(bundle.desc, lang)}</p>
                    <div className="mt-auto pt-5">
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-black text-foreground">{bundle.price}</span>
                        <span className="text-sm font-semibold" style={{ color: "hsl(275 51% 46%)" }}>{T(bundle.savings, lang)}</span>
                      </div>
                      <a
                        href={bundle.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 active:scale-[0.97]"
                        style={{ backgroundColor: "hsl(275 51% 46%)" }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 38%)")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 46%)")}
                      >
                        {lang === "en" ? "Get This Bundle" : "獲取此套餐"}
                      </a>
                      <p className="mt-1.5 text-[11px] text-center text-muted-foreground/60">Secure checkout powered by Stripe</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 md:py-24 section-brand-dark">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-[1.6rem] md:text-[2rem] font-black text-white font-display mb-4">
              {lang === "en" ? "Not Sure What You Need?" : "不確定需要什麼？"}
            </h2>
            <p className="text-white/80 text-[1.05rem] md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              {lang === "en"
                ? "Tell us about your business and we'll recommend the right features for you."
                : "告訴我們您的業務，我們會為您推薦合適的功能。"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-base font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: "hsl(275 51% 46%)" }}
              >
                {lang === "en" ? "Request Your Free Preview" : "請求免費預覽"}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/custom-brief"
                className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                {lang === "en" ? "Get a Custom Quote" : "獲取定制報價"}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

const Features = () => (
  <LanguageProvider>
    <Header />
    <FeaturesContent />
    <Footer />
  </LanguageProvider>
);

export default Features;
