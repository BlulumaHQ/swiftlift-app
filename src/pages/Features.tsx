import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PRICING, formatPriceByType, STRIPE_LINKS } from "@/lib/pricing";
import {
  Star, MessageCircle, Mail, Calendar, List, Globe, Edit, Image,
  MapPin, BarChart, ShoppingCart, Lock, Link as LinkIcon, Database,
  Zap, CreditCard, Package, TrendingUp, Award, Target, Inbox, Sparkles
} from "lucide-react";

type LangObj = { en: string; zh: string };
const T = (obj: LangObj, lang: "en" | "zh") => obj[lang];

/* ─── Standard Add-ons ─── */
const standardAddons = [
  {
    key: "review-testimonial-section",
    icon: Star,
    title: { en: "Review / Testimonial Section", zh: "評價展示區塊" },
    desc: { en: "Your happiest customers are your best salespeople. Display real reviews with star ratings and brand styling to build instant trust with new visitors.", zh: "展示客戶真實評價，含星級評分和品牌風格，建立新訪客的即時信任。" },
    price: "$99",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
  {
    key: "faq-section",
    icon: MessageCircle,
    title: { en: "FAQ Section", zh: "常見問題區塊" },
    desc: { en: "Answer your most common questions before they're even asked. Reduce back-and-forth, filter serious enquiries, and keep visitors on your page longer.", zh: "在問題被提出之前先回答，減少來回溝通，過濾認真的詢問，讓訪客停留更久。" },
    price: "$79",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
  {
    key: "advanced-contact-form",
    icon: Mail,
    title: { en: "Advanced Contact Form", zh: "進階聯繫表單" },
    desc: { en: "A smarter enquiry form with custom fields, validation, and email routing — so you get the right information from the right people, every time.", zh: "更智能的詢問表單，含自訂欄位、驗證和郵件路由，每次都能收到正確資訊。" },
    price: "$149",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
  {
    key: "booking-request-form",
    icon: Calendar,
    title: { en: "Booking Request Form", zh: "預約請求表單" },
    desc: { en: "Let visitors request appointments directly from your website. Structured, professional, and connected straight to your inbox.", zh: "讓訪客直接從網站預約，結構化、專業且直接連接您的信箱。" },
    price: "$149",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
  {
    key: "multi-step-quote-form",
    icon: List,
    title: { en: "Multi-Step Quote Form", zh: "多步驟報價表單" },
    desc: { en: "Guide visitors through a step-by-step process to request a quote. Conditional logic ensures you only receive complete, relevant enquiries.", zh: "引導訪客逐步填寫報價請求，條件邏輯確保只收到完整、相關的詢問。" },
    price: "$199",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
  {
    key: "basic-bilingual-setup",
    icon: Globe,
    title: { en: "Basic Bilingual Setup", zh: "基礎雙語設置" },
    desc: { en: "Reach more customers by adding a second language with a simple toggle switch — no separate pages, no complicated setup.", zh: "透過簡單的切換開關新增第二語言，無需獨立頁面，無複雜設置。" },
    price: "$199",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
  {
    key: "blog-setup",
    icon: Edit,
    title: { en: "Blog Setup", zh: "部落格設置" },
    desc: { en: "Build authority in your industry with a clean blog layout. Includes categories, tags, and post templates — ready for you to publish anytime.", zh: "透過簡潔的部落格版面建立行業權威，含分類、標籤和文章模板。" },
    price: "$199",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
  {
    key: "gallery-section",
    icon: Image,
    title: { en: "Gallery Section", zh: "圖庫區塊" },
    desc: { en: "Showcase your work, products, or space with a responsive photo gallery. Includes lightbox viewing and category filtering.", zh: "透過響應式圖庫展示作品、產品或空間，含燈箱效果和分類篩選。" },
    price: "$129",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
  {
    key: "google-map-hours-service-area",
    icon: MapPin,
    title: { en: "Google Map / Hours / Service Area", zh: "Google地圖/營業時間/服務區域" },
    desc: { en: "Help customers find you, know your hours, and understand your service area — all in one clean, embedded block.", zh: "幫助客戶找到您、了解營業時間和服務區域——集於一個簡潔的嵌入區塊。" },
    price: "$99",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
  {
    key: "analytics-pixel-tag-setup",
    icon: BarChart,
    title: { en: "Analytics / Pixel / Tag Setup", zh: "分析/像素/標籤設置" },
    desc: { en: "Get the data you need to grow. Includes Google Analytics, Facebook Pixel, and Tag Manager — properly configured and ready to track from day one.", zh: "獲取成長所需的數據，含 Google Analytics、Facebook Pixel 和 Tag Manager 配置。" },
    price: "$99",
    btn: { en: "Add to My Website", zh: "添加到我的網站" },
  },
];

/* ─── Advanced Features ─── */
const advancedFeatures = [
  {
    key: "ecommerce-integration",
    icon: ShoppingCart,
    title: { en: "E-Commerce Integration", zh: "電子商務集成" },
    desc: { en: "Turn your website into a full online store. Includes product catalog, cart, and secure checkout — built for real business use.", zh: "將網站轉變為完整線上商店，含產品目錄、購物車和安全結帳。" },
    price: "Starting at $499",
    btn: { en: "Get Started", zh: "開始" },
  },
  {
    key: "membership-client-portal",
    icon: Lock,
    title: { en: "Membership / Client Portal", zh: "會員/客戶門戶" },
    desc: { en: "Create a protected area for members or clients with login access and gated content — ideal for service businesses and communities.", zh: "為會員或客戶創建受保護的登入區域，適合服務業和社群。" },
    price: "Starting at $399",
    btn: { en: "Get Started", zh: "開始" },
  },
  {
    key: "crm-integration",
    icon: LinkIcon,
    title: { en: "CRM Integration", zh: "CRM集成" },
    desc: { en: "Connect your website forms directly to HubSpot, Salesforce, or your preferred CRM. Every lead goes exactly where it needs to go.", zh: "將網站表單直接連接到 HubSpot、Salesforce 或您偏好的 CRM。" },
    price: "Custom Quote",
    btn: { en: "Request Quote", zh: "請求報價" },
  },
  {
    key: "inventory-directory-database",
    icon: Database,
    title: { en: "Inventory / Directory / Database", zh: "庫存/目錄/資料庫" },
    desc: { en: "Build filterable listings, searchable directories, or product databases — perfect for businesses with large catalogs or service networks.", zh: "建立可篩選列表、可搜索目錄或產品資料庫，適合大型目錄或服務網絡。" },
    price: "Starting at $499",
    btn: { en: "Get Started", zh: "開始" },
  },
  {
    key: "custom-automation",
    icon: Zap,
    title: { en: "Custom Automation", zh: "自定義自動化" },
    desc: { en: "Automate your enquiry flow, notifications, and form routing — so your website works for you even when you're not online.", zh: "自動化詢問流程、通知和表單路由，讓網站在您離線時也能運作。" },
    price: "Custom Quote",
    btn: { en: "Request Quote", zh: "請求報價" },
  },
  {
    key: "payment-integration",
    icon: CreditCard,
    title: { en: "Payment Integration", zh: "支付集成" },
    desc: { en: "Accept one-time or recurring payments securely on your website. Ideal for deposits, service fees, or subscription-based offerings.", zh: "在網站上安全接受一次性或定期付款，適合押金、服務費或訂閱制。" },
    price: "Starting at $299",
    btn: { en: "Get Started", zh: "開始" },
  },
];

/* ─── Bundles ─── */
const bundles = [
  {
    key: "bundle-website-essentials",
    icon: Package,
    title: { en: "Website Essentials", zh: "網站基礎套餐" },
    tagline: { en: "The smart starting point.", zh: "聰明的起點。" },
    desc: { en: "Everything a small business needs to look credible and be found online — in one clean package.", zh: "小型企業在線上展現專業形象所需的一切——整合在一個套餐中。" },
    includes: { en: "Google Map / Hours / Service Area · FAQ Section · Analytics / Pixel / Tag Setup", zh: "Google地圖/營業時間/服務區域 · 常見問題區塊 · 分析/像素/標籤設置" },
    originalPrice: "$275",
    price: "$199",
    savings: { en: "Save $76", zh: "節省 $76" },
  },
  {
    key: "bundle-business-growth",
    icon: TrendingUp,
    title: { en: "Business Growth", zh: "商業成長套餐" },
    tagline: { en: "For businesses ready to grow their online presence seriously.", zh: "為認真拓展線上形象的企業而設。" },
    desc: { en: "A comprehensive upgrade set that combines trust-building, lead generation, content marketing, and local visibility in one package.", zh: "結合信任建立、潛客獲取、內容行銷和本地能見度的全面升級套餐。" },
    includes: { en: "Review / Testimonial Section · Blog Setup · Gallery Section · Advanced Contact Form · Analytics / Pixel / Tag Setup · Google Map / Hours / Service Area", zh: "評價展示 · 部落格設置 · 圖庫區塊 · 進階聯繫表單 · 分析/像素/標籤設置 · Google地圖/營業時間/服務區域" },
    originalPrice: "$875",
    price: "$699",
    savings: { en: "Save $176", zh: "節省 $176" },
    badge: { en: "MOST POPULAR", zh: "最受歡迎" },
  },
  {
    key: "bundle-premium-brand-launch",
    icon: Award,
    title: { en: "Premium Brand Launch", zh: "高級品牌啟動套餐" },
    tagline: { en: "The complete package for a polished, high-impact online presence.", zh: "完整套餐，打造精緻、高影響力的線上形象。" },
    desc: { en: "Everything you need to launch with confidence — bilingual support, full content infrastructure, and a complete lead capture system.", zh: "自信上線所需的一切——雙語支援、完整內容架構和完整的潛客捕獲系統。" },
    includes: { en: "Basic Bilingual Setup · Blog Setup · Gallery Section · Review / Testimonial Section · Advanced Contact Form · Booking Request Form · Multi-Step Quote Form", zh: "基礎雙語設置 · 部落格設置 · 圖庫區塊 · 評價展示 · 進階聯繫表單 · 預約請求表單 · 多步驟報價表單" },
    originalPrice: "$1,150",
    price: "$899",
    savings: { en: "Save $251", zh: "節省 $251" },
  },
  {
    key: "bundle-conversion-booster",
    icon: Target,
    title: { en: "Conversion Booster", zh: "轉化率提升套餐" },
    tagline: { en: "Turn more visitors into customers.", zh: "將更多訪客轉化為客戶。" },
    desc: { en: "A focused set of features designed to build trust, reduce friction, and increase the number of visitors who actually reach out.", zh: "專注於建立信任、減少摩擦、增加實際聯繫訪客數量的功能組合。" },
    includes: { en: "Review / Testimonial Section · Advanced Contact Form · Booking Request Form · Analytics / Pixel / Tag Setup · FAQ Section", zh: "評價展示 · 進階聯繫表單 · 預約請求表單 · 分析/像素/標籤設置 · 常見問題區塊" },
    originalPrice: "$625",
    price: "$499",
    savings: { en: "Save $126", zh: "節省 $126" },
  },
  {
    key: "bundle-advanced-inquiry",
    icon: Inbox,
    title: { en: "Advanced Inquiry", zh: "進階詢問套餐" },
    tagline: { en: "Built for businesses that run on enquiries.", zh: "為依賴詢問營運的企業而設。" },
    desc: { en: "Three powerful forms working together to capture better leads, filter serious clients, and make your enquiry process feel professional.", zh: "三個強大表單協同運作，捕獲更好的潛客，過濾認真的客戶，讓詢問流程更專業。" },
    includes: { en: "Advanced Contact Form · Booking Request Form · Multi-Step Quote Form", zh: "進階聯繫表單 · 預約請求表單 · 多步驟報價表單" },
    originalPrice: "$500",
    price: "$399",
    savings: { en: "Save $101", zh: "節省 $101" },
  },
];

/* ─── Unified Card ─── */
const FeatureCard = ({ icon: Icon, title, desc, price, btnLabel, stripeLink, lang }: {
  icon: any; title: LangObj; desc: LangObj; price: string; btnLabel: LangObj; stripeLink?: string; lang: "en" | "zh";
}) => {
  const isCustom = price.includes("Starting") || price.includes("Custom");
  const href = stripeLink || "/#contact";
  const isExternal = !!stripeLink;
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] flex flex-col h-full border border-black/[0.04]">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.08)" }}>
        <Icon size={22} style={{ color: "hsl(275 51% 46%)" }} />
      </div>
      <h3 className="text-[1.05rem] font-bold text-foreground leading-snug">{T(title, lang)}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{T(desc, lang)}</p>
      <div className="mt-auto pt-5">
        <span className={`font-black ${isCustom ? "text-[0.95rem] text-muted-foreground" : "text-2xl text-foreground"}`}>
          {price}
        </span>
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
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
};

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
              ? "Every SwiftLift website is built to grow with your business. Add any of these features before or after launch — no technical work required on your end."
              : "每個 SwiftLift 網站都隨您的業務成長。上線前後隨時添加功能——無需您做任何技術工作。"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-white/60 text-sm md:text-base"
          >
            {lang === "en" ? "Simple, transparent pricing. No hidden fees." : "簡單、透明的價格。無隱藏費用。"}
          </motion.p>
        </div>
      </section>

      {/* ── Section 1: Standard Add-ons ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display">
                {lang === "en" ? "Standard Add-ons" : "標準附加功能"}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                {lang === "en"
                  ? "Fixed pricing for repeatable features. Add any of these to your website."
                  : "可重複使用功能的固定價格。可將任何功能添加到您的網站。"}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardAddons.map((item, i) => (
              <ScrollReveal key={item.key} delay={0.04 * i}>
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  price={item.price}
                  btnLabel={item.btn}
                  stripeLink={STRIPE_LINKS[item.key]}
                  lang={lang}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Advanced Features ── */}
      <section className="py-16 md:py-24" style={{ background: "#F8F8FA" }}>
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display">
                {lang === "en" ? "Advanced Features" : "進階功能"}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                {lang === "en"
                  ? "More complex integrations scoped to your business needs."
                  : "根據您的業務需求定制的更複雜集成。"}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((item, i) => (
              <ScrollReveal key={item.key} delay={0.04 * i}>
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  price={item.price}
                  btnLabel={item.btn}
                  stripeLink={STRIPE_LINKS[item.key]}
                  lang={lang}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Bundle & Save ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(275 51% 46%)" }}>
                <Sparkles size={14} />
                {lang === "en" ? "BUNDLE & SAVE" : "套餐優惠"}
              </span>
              <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display">
                {lang === "en" ? "Combine Features & Save" : "組合功能並節省"}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                {lang === "en"
                  ? "Pre-built feature bundles at a better price — designed for common business needs."
                  : "預建功能套餐，價格更優惠——為常見業務需求而設計。"}
              </p>
            </div>
          </ScrollReveal>

          {/* First row: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundles.slice(0, 3).map((bundle, i) => (
              <ScrollReveal key={bundle.key} delay={0.06 * i}>
                <BundleCard bundle={bundle} lang={lang} />
              </ScrollReveal>
            ))}
          </div>
          {/* Second row: 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
            {bundles.slice(3).map((bundle, i) => (
              <ScrollReveal key={bundle.key} delay={0.06 * (i + 3)}>
                <BundleCard bundle={bundle} lang={lang} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-16 md:py-24 section-brand-dark">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[1.6rem] md:text-[2rem] font-black text-white font-display mb-4">
            {lang === "en" ? "Not Sure What You Need?" : "不確定需要什麼？"}
          </h2>
          <p className="text-white/80 text-[1.05rem] md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            {lang === "en"
              ? "Tell us about your business and we'll recommend the right features for your goals — no obligation, no hard sell."
              : "告訴我們您的業務，我們會為您推薦合適的功能——無義務、無硬性推銷。"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "hsl(275 51% 46%)" }}
            >
              {lang === "en" ? "Request Your Free Preview" : "請求免費預覽"}
            </Link>
            <Link
              to="/custom-brief"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              {lang === "en" ? "Get a Custom Quote" : "獲取定制報價"}
            </Link>
          </div>
          <p className="mt-4 text-white/50 text-sm">
            {lang === "en" ? "All features can be added before or after launch." : "所有功能可在上線前後添加。"}
          </p>
        </div>
      </section>
    </main>
  );
};

/* ─── Bundle Card ─── */
const BundleCard = ({ bundle, lang }: { bundle: typeof bundles[number]; lang: "en" | "zh" }) => {
  const Icon = bundle.icon;
  const hasBadge = "badge" in bundle && bundle.badge;
  return (
    <div className="rounded-2xl bg-white p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] flex flex-col h-full relative border border-black/[0.04]">
      {hasBadge && (
        <div className="absolute -top-3 left-6">
          <span
            className="text-xs font-bold px-4 py-1.5 rounded-full text-white"
            style={{ backgroundColor: "hsl(275 51% 46%)" }}
          >
            {T(bundle.badge as LangObj, lang)}
          </span>
        </div>
      )}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.08)" }}>
        <Icon size={22} style={{ color: "hsl(275 51% 46%)" }} />
      </div>
      <h3 className="text-xl font-bold text-foreground">{T(bundle.title, lang)}</h3>
      <p className="mt-1 text-sm italic text-muted-foreground">{T(bundle.tagline, lang)}</p>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{T(bundle.desc, lang)}</p>
      <div className="mt-4 pt-4 border-t border-black/[0.06]">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
          {lang === "en" ? "Includes" : "包含"}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">{T(bundle.includes, lang)}</p>
      </div>
      <div className="mt-auto pt-5 flex items-baseline gap-3">
        <span className="text-sm text-muted-foreground line-through">{bundle.originalPrice}</span>
        <span className="text-3xl font-black text-foreground">{bundle.price}</span>
      </div>
      <span
        className="mt-1 inline-block text-xs font-bold px-3 py-1 rounded-full w-fit"
        style={{ backgroundColor: "hsl(142 70% 45% / 0.1)", color: "hsl(142 70% 35%)" }}
      >
        {T(bundle.savings, lang)}
      </span>
      <div className="mt-5">
        <a
          href={STRIPE_LINKS[bundle.key]}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 active:scale-[0.97]"
          style={{ backgroundColor: "hsl(275 51% 46%)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 38%)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 46%)")}
        >
          {lang === "en" ? "Get This Bundle" : "獲取此套餐"}
        </a>
        <p className="mt-2 text-[11px] text-center text-muted-foreground/60">Secure checkout powered by Stripe</p>
      </div>
    </div>
  );
};

const Features = () => (
  <LanguageProvider>
    <CustomCursor />
    <Header />
    <FeaturesContent />
    <Footer />
  </LanguageProvider>
);

export default Features;
