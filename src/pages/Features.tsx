import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
}

const fixedPriceAddons: FeatureItem[] = [
  { icon: Star, title: { en: "Review / Testimonial Section", zh: "評價展示區塊" }, desc: { en: "Display customer reviews with star ratings and brand styling.", zh: "展示客戶評價，包含星級評分和品牌風格。" }, price: "$99" },
  { icon: HelpCircle, title: { en: "FAQ Section", zh: "常見問題區塊" }, desc: { en: "Organized accordion-style FAQ block with smooth animations.", zh: "帶動畫效果的手風琴式FAQ區塊。" }, price: "$79" },
  { icon: FileText, title: { en: "Advanced Contact Form", zh: "進階聯繫表單" }, desc: { en: "Custom fields, validation, and email routing for inquiries.", zh: "自訂欄位、驗證和郵件路由功能。" }, price: "$149" },
  { icon: Calendar, title: { en: "Booking Request Form", zh: "預約請求表單" }, desc: { en: "Structured appointment or booking request form with confirmation.", zh: "結構化預約表單，含確認功能。" }, price: "$149" },
  { icon: MessageSquare, title: { en: "Multi-Step Quote Form", zh: "多步驟報價表單" }, desc: { en: "Step-by-step form with conditional logic for service quoting.", zh: "帶條件邏輯的分步式報價表單。" }, price: "$199" },
  { icon: Globe, title: { en: "Basic Bilingual Setup", zh: "基礎雙語設置" }, desc: { en: "Add a second language with toggle switching across your site.", zh: "添加第二語言，支持全站語言切換。" }, price: "$199" },
  { icon: FileText, title: { en: "Blog Setup", zh: "部落格設置" }, desc: { en: "Clean blog layout with categories, tags, and post templates.", zh: "簡潔的部落格版面，含分類、標籤和文章模板。" }, price: "$199" },
  { icon: Image, title: { en: "Gallery Section", zh: "圖庫區塊" }, desc: { en: "Responsive photo gallery with lightbox and category filtering.", zh: "響應式圖庫，含燈箱效果和分類篩選。" }, price: "$129" },
  { icon: MapPin, title: { en: "Google Map / Hours / Service Area", zh: "Google地圖/營業時間/服務區域" }, desc: { en: "Embedded map, business hours display, and service area block.", zh: "嵌入式地圖、營業時間顯示和服務區域區塊。" }, price: "$99" },
  { icon: BarChart3, title: { en: "Analytics / Pixel / Tag Setup", zh: "分析/像素/標籤設置" }, desc: { en: "Google Analytics, Facebook Pixel, and Tag Manager configuration.", zh: "Google Analytics、Facebook Pixel和Tag Manager配置。" }, price: "$99" },
];

const customQuoteFeatures: FeatureItem[] = [
  { icon: ShoppingCart, title: { en: "E-Commerce Integration", zh: "電子商務集成" }, desc: { en: "Product catalog, cart, checkout — full online store setup.", zh: "產品目錄、購物車、結帳——完整線上商店設置。" }, price: "Starting at $499" },
  { icon: Users, title: { en: "Membership / Client Portal", zh: "會員/客戶門戶" }, desc: { en: "Protected login areas with gated content for members or clients.", zh: "為會員或客戶提供的受保護登入區域。" }, price: "Starting at $399" },
  { icon: Workflow, title: { en: "CRM Integration", zh: "CRM集成" }, desc: { en: "Connect your website forms to HubSpot, Salesforce, or other CRMs.", zh: "將網站表單連接到HubSpot、Salesforce或其他CRM。" }, price: "Custom Quote" },
  { icon: Database, title: { en: "Inventory / Directory / Database", zh: "庫存/目錄/資料庫" }, desc: { en: "Filterable listings, searchable directories, or product databases.", zh: "可篩選列表、可搜索目錄或產品資料庫。" }, price: "Starting at $499" },
  { icon: Bot, title: { en: "Custom Automation", zh: "自定義自動化" }, desc: { en: "Automated workflows, notifications, and smart form routing.", zh: "自動化工作流程、通知和智能表單路由。" }, price: "Custom Quote" },
  { icon: CreditCard, title: { en: "Payment Integration", zh: "支付集成" }, desc: { en: "Accept one-time or recurring payments securely on your website.", zh: "在您的網站上安全接受一次性或定期付款。" }, price: "Starting at $299" },
];

const FeatureCard = ({ item, lang }: { item: FeatureItem; lang: "en" | "zh" }) => {
  const Icon = item.icon;
  const isCustom = item.price.includes("Starting") || item.price.includes("Custom");
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm flex flex-col h-full">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
        <Icon size={24} style={{ color: "hsl(275 51% 46%)" }} />
      </div>
      <h3 className="text-lg font-bold text-foreground font-display">{T(item.title, lang)}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{T(item.desc, lang)}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-lg font-black font-display ${isCustom ? "text-muted-foreground text-base" : "text-foreground"}`}>
          {item.price}
        </span>
      </div>
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
