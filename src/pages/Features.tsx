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
  Package, Sparkles
} from "lucide-react";
import {
  Star, Globe, FileText, Calendar, MessageSquare, HelpCircle,
  MapPin, BarChart3, Image, ShoppingCart, Users, Workflow,
  Database, Bot, CreditCard
} from "lucide-react";

type LangObj = { en: string; zh: string };
const T = (obj: LangObj, lang: "en" | "zh") => obj[lang];

interface FeatureItem {
  icon: any;
  title: LangObj;
  desc: LangObj;
  price: string;
  key: string;
}

const featureIcons: Record<string, any> = {
  "review-testimonial-section": Star,
  "faq-section": HelpCircle,
  "advanced-contact-form": FileText,
  "booking-request-form": Calendar,
  "multi-step-quote-form": MessageSquare,
  "basic-bilingual-setup": Globe,
  "blog-setup": FileText,
  "gallery-section": Image,
  "google-map-hours-service-area": MapPin,
  "analytics-pixel-tag-setup": BarChart3,
  "ecommerce-integration": ShoppingCart,
  "membership-client-portal": Users,
  "crm-integration": Workflow,
  "inventory-directory-database": Database,
  "custom-automation": Bot,
  "payment-integration": CreditCard,
};

const featureDescs: Record<string, LangObj> = {
  "review-testimonial-section": { en: "Display customer reviews with star ratings and brand styling.", zh: "展示客戶評價，包含星級評分和品牌風格。" },
  "faq-section": { en: "Organized accordion-style FAQ block with smooth animations.", zh: "帶動畫效果的手風琴式FAQ區塊。" },
  "advanced-contact-form": { en: "Custom fields, validation, and email routing for inquiries.", zh: "自訂欄位、驗證和郵件路由功能。" },
  "booking-request-form": { en: "Structured appointment or booking request form with confirmation.", zh: "結構化預約表單，含確認功能。" },
  "multi-step-quote-form": { en: "Step-by-step form with conditional logic for service quoting.", zh: "帶條件邏輯的分步式報價表單。" },
  "basic-bilingual-setup": { en: "Add a second language with toggle switching across your site.", zh: "添加第二語言，支持全站語言切換。" },
  "blog-setup": { en: "Clean blog layout with categories, tags, and post templates.", zh: "簡潔的部落格版面，含分類、標籤和文章模板。" },
  "gallery-section": { en: "Responsive photo gallery with lightbox and category filtering.", zh: "響應式圖庫，含燈箱效果和分類篩選。" },
  "google-map-hours-service-area": { en: "Embedded map, business hours display, and service area block.", zh: "嵌入式地圖、營業時間顯示和服務區域區塊。" },
  "analytics-pixel-tag-setup": { en: "Google Analytics, Facebook Pixel, and Tag Manager configuration.", zh: "Google Analytics、Facebook Pixel和Tag Manager配置。" },
  "ecommerce-integration": { en: "Product catalog, cart, checkout — full online store setup.", zh: "產品目錄、購物車、結帳——完整線上商店設置。" },
  "membership-client-portal": { en: "Protected login areas with gated content for members or clients.", zh: "為會員或客戶提供的受保護登入區域。" },
  "crm-integration": { en: "Connect your website forms to HubSpot, Salesforce, or other CRMs.", zh: "將網站表單連接到HubSpot、Salesforce或其他CRM。" },
  "inventory-directory-database": { en: "Filterable listings, searchable directories, or product databases.", zh: "可篩選列表、可搜索目錄或產品資料庫。" },
  "custom-automation": { en: "Automated workflows, notifications, and smart form routing.", zh: "自動化工作流程、通知和智能表單路由。" },
  "payment-integration": { en: "Accept one-time or recurring payments securely on your website.", zh: "在您的網站上安全接受一次性或定期付款。" },
};

const featureTitles: Record<string, LangObj> = {
  "review-testimonial-section": { en: "Review / Testimonial Section", zh: "評價展示區塊" },
  "faq-section": { en: "FAQ Section", zh: "常見問題區塊" },
  "advanced-contact-form": { en: "Advanced Contact Form", zh: "進階聯繫表單" },
  "booking-request-form": { en: "Booking Request Form", zh: "預約請求表單" },
  "multi-step-quote-form": { en: "Multi-Step Quote Form", zh: "多步驟報價表單" },
  "basic-bilingual-setup": { en: "Basic Bilingual Setup", zh: "基礎雙語設置" },
  "blog-setup": { en: "Blog Setup", zh: "部落格設置" },
  "gallery-section": { en: "Gallery Section", zh: "圖庫區塊" },
  "google-map-hours-service-area": { en: "Google Map / Hours / Service Area", zh: "Google地圖/營業時間/服務區域" },
  "analytics-pixel-tag-setup": { en: "Analytics / Pixel / Tag Setup", zh: "分析/像素/標籤設置" },
  "ecommerce-integration": { en: "E-Commerce Integration", zh: "電子商務集成" },
  "membership-client-portal": { en: "Membership / Client Portal", zh: "會員/客戶門戶" },
  "crm-integration": { en: "CRM Integration", zh: "CRM集成" },
  "inventory-directory-database": { en: "Inventory / Directory / Database", zh: "庫存/目錄/資料庫" },
  "custom-automation": { en: "Custom Automation", zh: "自定義自動化" },
  "payment-integration": { en: "Payment Integration", zh: "支付集成" },
};

const fixedPriceFeatures = PRICING.features.filter(f => f.type === "one_time");
const customQuoteFeaturesList = PRICING.features.filter(f => f.type !== "one_time");

const fixedPriceAddons: FeatureItem[] = fixedPriceFeatures.map(f => ({
  icon: featureIcons[f.key] || Star,
  title: featureTitles[f.key] || { en: f.name, zh: f.name },
  desc: featureDescs[f.key] || { en: "", zh: "" },
  price: formatPriceByType(f),
  key: f.key,
}));

const customQuoteFeatures: FeatureItem[] = customQuoteFeaturesList.map(f => ({
  icon: featureIcons[f.key] || Star,
  title: featureTitles[f.key] || { en: f.name, zh: f.name },
  desc: featureDescs[f.key] || { en: "", zh: "" },
  price: formatPriceByType(f),
  key: f.key,
}));

const FeatureCard = ({ item, lang }: { item: FeatureItem; lang: "en" | "zh" }) => {
  const Icon = item.icon;
  const isCustom = item.price.includes("Starting") || item.price.includes("Custom");
  const stripeLink = STRIPE_LINKS[item.key];
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm flex flex-col h-full">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
        <Icon size={24} style={{ color: "hsl(275 51% 46%)" }} />
      </div>
      <h3 className="text-lg font-bold text-foreground font-display">{T(item.title, lang)}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{T(item.desc, lang)}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className={`font-black font-display ${isCustom ? "text-base text-muted-foreground" : "text-xl text-primary"}`}>
          {item.price}
        </span>
      </div>
      {stripeLink ? (
        <a
          href={stripeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:brightness-110 active:scale-[0.97]"
          style={{ backgroundColor: "hsl(275 51% 46%)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 38%)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 46%)")}
        >
          {isCustom ? (lang === "en" ? "Get Started" : "開始") : (lang === "en" ? "Add to My Website" : "添加到我的網站")}
        </a>
      ) : (
        <a
          href="/#contact"
          className="mt-3 w-full inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 active:scale-[0.97]"
          style={{ backgroundColor: "hsl(275 51% 46%)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 38%)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "hsl(275 51% 46%)")}
        >
          {isCustom ? (lang === "en" ? "Request Quote" : "請求報價") : (lang === "en" ? "Add to My Website" : "添加到我的網站")}
        </a>
      )}
    </div>
  );
};

const FeaturesContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Features & Add-ons — SwiftLift";
  }, []);

  return (
    <main>
      {/* Hero */}
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
            className="mt-4 text-white/80 text-[1.05rem] md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en"
              ? "Expand your SwiftLift website with optional features — add them anytime before or after launch."
              : "使用可選功能擴展您的SwiftLift網站——在上線前後隨時添加。"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-white/60 text-sm md:text-base max-w-lg mx-auto"
          >
            {lang === "en"
              ? "Simple, transparent pricing. No hidden fees."
              : "簡單、透明的價格。無隱藏費用。"}
          </motion.p>
        </div>
      </section>

      {/* Fixed Price Add-ons */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display text-center mb-3">
            {lang === "en" ? "Standard Add-ons" : "標準附加功能"}
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
            {lang === "en"
              ? "Fixed pricing for repeatable features. Add any of these to your website."
              : "可重複使用功能的固定價格。可將任何功能添加到您的網站。"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fixedPriceAddons.map((item) => (
              <FeatureCard key={T(item.title, lang)} item={item} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote Features */}
      <section className="py-14 md:py-20" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display text-center mb-3">
            {lang === "en" ? "Advanced Features" : "進階功能"}
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
            {lang === "en"
              ? "More complex integrations scoped to your business needs."
              : "根據您的業務需求定制的更複雜集成。"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {customQuoteFeatures.map((item) => (
              <FeatureCard key={T(item.title, lang)} item={item} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle & Save */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
                <Sparkles size={14} />
                {lang === "en" ? "Bundle & Save" : "套餐優惠"}
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

          {/* All Bundles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {([
              {
                key: "bundle-website-essentials",
                title: { en: "Website Essentials", zh: "網站基礎套餐" },
                desc: { en: "A practical starter bundle for small businesses that need the most important website upgrades in one clean package.", zh: "適合需要最重要網站升級的小型企業的實用入門套餐。" },
                price: "$199",
                savings: { en: "Save $76 compared to individual features", zh: "比單獨購買節省 $76" },
                icon: Package,
              },
              {
                key: "bundle-business-growth",
                title: { en: "Business Growth", zh: "商業成長套餐" },
                desc: { en: "A stronger upgrade set focused on improving trust, lead quality, and conversion performance for growing businesses.", zh: "專注於提升信任度、潛在客戶質量和轉化表現的更強升級套餐。" },
                price: "$699",
                savings: { en: "Save $196 compared to individual features", zh: "比單獨購買節省 $196" },
                icon: Sparkles,
                badge: lang === "en" ? "MOST POPULAR" : "最受歡迎",
              },
              {
                key: "bundle-premium-brand-launch",
                title: { en: "Premium Brand Launch", zh: "高級品牌啟動套餐" },
                desc: { en: "A more polished launch bundle designed for businesses that want a stronger visual impression and a more complete online presence.", zh: "為希望擁有更強視覺印象和更完整線上形象的企業設計的精緻啟動套餐。" },
                price: "$899",
                savings: { en: "Save $251 compared to individual features", zh: "比單獨購買節省 $251" },
                icon: Sparkles,
              },
              {
                key: "bundle-conversion-booster",
                title: { en: "Conversion Booster", zh: "轉化率提升套餐" },
                desc: { en: "A focused bundle for improving engagement, inquiry flow, and conversion points across key pages of the website.", zh: "專注於改善網站關鍵頁面的互動、查詢流程和轉化點的套餐。" },
                price: "$499",
                savings: { en: "Save $126 compared to individual features", zh: "比單獨購買節省 $126" },
                icon: Package,
              },
              {
                key: "bundle-advanced-inquiry",
                title: { en: "Advanced Inquiry", zh: "進階詢問套餐" },
                desc: { en: "A lead-focused bundle built to help businesses collect better enquiries through stronger forms, structure, and user flow.", zh: "以潛在客戶為導向的套餐，幫助企業通過更強的表單、結構和用戶流程收集更好的查詢。" },
                price: "$399",
                savings: { en: "Save $101 compared to individual features", zh: "比單獨購買節省 $101" },
                icon: Package,
              },
            ] as { key: string; title: LangObj; desc: LangObj; price: string; savings: LangObj; icon: any; badge?: string }[]).map((bundle, i) => (
              <ScrollReveal key={bundle.key} delay={0.08 * i}>
                <div className="rounded-2xl border border-border bg-background p-6 md:p-8 shadow-sm h-full flex flex-col relative card-elevated">
                  {bundle.badge && (
                    <div className="absolute -top-3 left-6">
                      <span className="text-xs font-bold px-4 py-1.5 rounded-full text-primary-foreground bg-primary">
                        {bundle.badge}
                      </span>
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
                    <bundle.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-display">{T(bundle.title, lang)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{T(bundle.desc, lang)}</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-black font-display text-primary">{bundle.price}</span>
                  </div>
                  <div className="mt-6">
                    <a
                      href={STRIPE_LINKS[bundle.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.97]"
                      style={{ backgroundColor: "hsl(275 51% 46%)" }}
                    >
                      {lang === "en" ? "Get This Bundle" : "獲取此套餐"}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 section-brand-dark">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[1.6rem] md:text-[2rem] font-black text-white font-display mb-4">
            {lang === "en" ? "Interested in Adding a Feature?" : "有興趣添加功能嗎？"}
          </h2>
          <p className="text-white/80 text-[1.05rem] md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            {lang === "en"
              ? "Let us know what you need and we'll include it in your website build or add it to your existing site."
              : "告訴我們您需要什麼，我們會將其納入網站建設或添加到現有網站。"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#7F37AE" }}
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
            {lang === "en"
              ? "All features are optional and can be added anytime."
              : "所有功能均為可選，可隨時添加。"}
          </p>
        </div>
      </section>
    </main>
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
