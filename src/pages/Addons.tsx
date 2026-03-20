import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PRICING, formatPrice, STRIPE_LINKS } from "@/lib/pricing";
import {
  Check, Zap, Search, Palette, Share2, Shield, Target,
  Rocket, Star, MessageCircle, Package
} from "lucide-react";

type LangObj = { en: string; zh: string };
const T = (obj: LangObj, lang: "en" | "zh") => obj[lang];

interface Addon {
  icon: any;
  title: LangObj;
  desc: LangObj;
  why: LangObj;
  price: string;
  features: { en: string[]; zh: string[] };
  badge?: string;
}

interface Bundle {
  icon: any;
  title: LangObj;
  tagline: LangObj;
  desc: LangObj;
  includes: LangObj[];
  price: string;
  originalPrice: string;
  badge?: string;
}

const upgrades: Addon[] = [
  {
    icon: Zap,
    title: { en: "Performance Optimization", zh: "性能優化" },
    desc: { en: "Make your website load faster and perform better across all devices.", zh: "讓您的網站在所有設備上加載更快、性能更佳。" },
    why: { en: "Speed directly impacts conversion. Every second of delay costs you customers.", zh: "速度直接影響轉化率。每一秒的延遲都會讓您失去客戶。" },
    price: formatPrice(PRICING.addons[0].price),
    features: {
      en: ["Image compression & optimization", "Asset minification & caching", "Performance tuning adjustments", "Core Web Vitals improvement"],
      zh: ["圖片壓縮和優化", "資源最小化和緩存", "性能調優", "核心網頁指標改進"],
    },
    badge: "Improves Speed & SEO",
  },
  {
    icon: Search,
    title: { en: "SEO Optimization", zh: "SEO優化" },
    desc: { en: "Get found on Google with proper structure and search-friendly setup.", zh: "通過正確的結構和搜索友好設置讓Google找到您。" },
    why: { en: "Better indexing means more organic traffic — customers finding you without ads.", zh: "更好的索引意味著更多的自然流量——客戶無需廣告即可找到您。" },
    price: formatPrice(PRICING.addons[1].price),
    features: {
      en: ["Meta title & description setup", "Sitemap generation & submission", "Search console configuration", "Schema markup implementation"],
      zh: ["Meta標題和描述設置", "站點地圖生成和提交", "搜索控制台配置", "Schema標記實現"],
    },
  },
  {
    icon: Share2,
    title: { en: "Social Media Launch Kit", zh: "社交媒體啟動套件" },
    desc: { en: "Launch your new website with professional social content ready to post.", zh: "用專業的社交內容發布您的新網站。" },
    why: { en: "A coordinated launch across platforms multiplies your website's impact.", zh: "跨平台的協調發布會成倍增加您網站的影響力。" },
    price: formatPrice(PRICING.addons[2].price),
    features: {
      en: ["Profile image formatting (up to 3 platforms)", "3 cover/banner designs", "3 launch post templates", "1 reusable branded template", "5 highlight icons"],
      zh: ["個人資料圖片格式化（最多3個平台）", "3個封面/橫幅設計", "3個發布帖子模板", "1個可重複使用的品牌模板", "5個亮點圖標"],
    },
    badge: "Perfect for Launch Week",
  },
  {
    icon: Palette,
    title: { en: "Brand Identity Package", zh: "品牌形象套餐" },
    desc: { en: "Build a stronger first impression with a refined brand identity system.", zh: "通過精緻的品牌識別系統建立更強的第一印象。" },
    why: { en: "A consistent brand builds customer confidence and increases conversion across every touchpoint.", zh: "一致的品牌建立客戶信心，並在每個接觸點提高轉化率。" },
    price: formatPrice(PRICING.addons[3].price),
    features: {
      en: ["Logo refinement system", "Color palette definition", "Typography hierarchy", "Brand usage guide (PDF)"],
      zh: ["標誌優化系統", "色彩調色板定義", "排版層次結構", "品牌使用指南（PDF）"],
    },
    badge: "Most Popular for New Businesses",
  },
];

const bundles: Bundle[] = [
  {
    icon: Target,
    title: { en: "Lead Conversion Pack", zh: "潛在客戶轉化套餐" },
    tagline: { en: "Turn visitors into leads", zh: "將訪客轉化為潛在客戶" },
    desc: { en: "Everything you need to capture and convert website visitors into real inquiries. Best for service businesses that rely on inbound leads.", zh: "捕獲和轉化網站訪客為真實詢盤所需的一切。最適合依賴入站潛在客戶的服務型企業。" },
    includes: [
      { en: "Performance Optimization ($199)", zh: "性能優化（$199）" },
      { en: "SEO Optimization ($299)", zh: "SEO優化（$299）" },
      { en: "Advanced Contact Form ($149)", zh: "進階聯繫表單（$149）" },
    ],
    price: "$549",
    originalPrice: "$647",
    badge: "Save $98",
  },
  {
    icon: Shield,
    title: { en: "Trust Builder Pack", zh: "信任建設套餐" },
    tagline: { en: "Build credibility from day one", zh: "從第一天就建立信譽" },
    desc: { en: "Establish instant trust with reviews, brand consistency, and professional polish. Ideal for businesses in competitive industries.", zh: "通過評價、品牌一致性和專業打磨建立即時信任。適合競爭激烈行業的企業。" },
    includes: [
      { en: "Brand Identity Package ($499)", zh: "品牌形象套餐（$499）" },
      { en: "Review / Testimonial Section ($99)", zh: "評價展示區塊（$99）" },
      { en: "FAQ Section ($79)", zh: "常見問題區塊（$79）" },
    ],
    price: "$579",
    originalPrice: "$677",
    badge: "Save $98",
  },
  {
    icon: Rocket,
    title: { en: "Launch Upgrade Pack", zh: "上線升級套餐" },
    tagline: { en: "Launch with maximum impact", zh: "以最大影響力上線" },
    desc: { en: "The complete upgrade package for businesses that want to launch strong. Covers performance, visibility, and social presence.", zh: "適合想要強勢上線的企業的完整升級套餐。涵蓋性能、可見度和社交媒體存在。" },
    includes: [
      { en: "Performance Optimization ($199)", zh: "性能優化（$199）" },
      { en: "SEO Optimization ($299)", zh: "SEO優化（$299）" },
      { en: "Social Media Launch Kit ($299)", zh: "社交媒體啟動套件（$299）" },
    ],
    price: "$699",
    originalPrice: "$797",
    badge: "Best Value — Save $98",
  },
];

const AddonsContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Enhance Your Website — SwiftLift";
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center section-brand-dark overflow-hidden">
        <div className="video-overlay" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24 md:py-32">
          <ScrollReveal>
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-black text-white font-display leading-tight">
              {lang === "en" ? "Enhance Your Website\nBefore Launch" : "在上線前\n增強您的網站"}
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              {lang === "en"
                ? "Your website is ready — now take it further. Add performance, visibility, and brand upgrades to launch stronger."
                : "您的網站已準備好——現在更進一步。添加性能、可見度和品牌升級，讓上線更強勁。"}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                as="a"
                href="#upgrades"
                className="btn-brand inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-primary-foreground"
              >
                {lang === "en" ? "View Upgrades" : "查看升級"}
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#bundles"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                {lang === "en" ? "View Bundles & Save" : "查看套餐優惠"}
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Individual Upgrades */}
      <section id="upgrades" className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display text-center mb-3">
              {lang === "en" ? "Individual Upgrades" : "個別升級"}
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
              {lang === "en"
                ? "Each upgrade is designed to improve a specific area of your website's performance."
                : "每項升級旨在改善您網站性能的特定領域。"}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upgrades.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={0.08 * i}>
                  <div className="rounded-2xl border border-border bg-background p-6 md:p-8 shadow-sm h-full flex flex-col card-elevated">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
                        <Icon size={24} style={{ color: "hsl(275 51% 46%)" }} />
                      </div>
                      {item.badge && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "hsl(275 51% 46% / 0.1)", color: "hsl(275 51% 46%)" }}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-foreground font-display">{T(item.title, lang)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{T(item.desc, lang)}</p>
                    <p className="mt-2 text-xs text-muted-foreground/80 italic">{T(item.why, lang)}</p>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-black font-display text-foreground">{item.price}</span>
                      <span className="text-xs text-muted-foreground">{lang === "en" ? "one-time" : "一次性"}</span>
                    </div>

                    <ul className="space-y-2 flex-1 mt-5">
                      {item.features[lang].map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-sm">
                          <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
                      <a
                        href={STRIPE_LINKS[PRICING.addons[i].key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.97]"
                        style={{ backgroundColor: "#7F37AE" }}
                      >
                        {lang === "en" ? "Add to My Website" : "添加到我的網站"}
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section id="bundles" className="py-16 md:py-24" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display text-center mb-3">
              {lang === "en" ? "Bundle & Save" : "套餐優惠"}
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
              {lang === "en"
                ? "Combine upgrades for a stronger launch at a better price."
                : "組合升級，以更優惠的價格實現更強勢的上線。"}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundles.map((bundle, i) => {
              const Icon = bundle.icon;
              return (
                <ScrollReveal key={i} delay={0.08 * i}>
                  <div className="rounded-2xl border border-border bg-background p-6 md:p-8 shadow-sm h-full flex flex-col card-elevated relative">
                    {bundle.badge && (
                      <div className="absolute -top-3 left-6">
                        <span className="text-xs font-bold px-4 py-1.5 rounded-full text-white" style={{ backgroundColor: "#7F37AE" }}>
                          {bundle.badge}
                        </span>
                      </div>
                    )}

                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
                      <Icon size={24} style={{ color: "hsl(275 51% 46%)" }} />
                    </div>

                    <h3 className="text-xl font-bold text-foreground font-display">{T(bundle.title, lang)}</h3>
                    <p className="text-sm font-medium mt-1" style={{ color: "hsl(275 51% 46%)" }}>{T(bundle.tagline, lang)}</p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{T(bundle.desc, lang)}</p>

                    <div className="mt-5 pt-4 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        {lang === "en" ? "Includes:" : "包含："}
                      </p>
                      <ul className="space-y-2">
                        {bundle.includes.map((inc, ii) => (
                          <li key={ii} className="flex items-start gap-2 text-sm">
                            <Package size={14} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                            <span className="text-muted-foreground">{T(inc, lang)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 flex items-baseline gap-3">
                      <span className="text-3xl font-black font-display text-foreground">{bundle.price}</span>
                      <span className="text-base text-muted-foreground line-through">{bundle.originalPrice}</span>
                    </div>

                    <div className="mt-5">
                      <Link
                        to="/#contact"
                        className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.97]"
                        style={{ backgroundColor: "#7F37AE" }}
                      >
                        {lang === "en" ? "Get This Bundle" : "獲取此套餐"}
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="py-16 md:py-24 section-brand-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/20 bg-white/5">
              <MessageCircle size={24} className="text-white" />
            </div>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black text-white font-display">
              {lang === "en" ? "Not Sure Which Upgrade to Choose?" : "不確定選擇哪項升級？"}
            </h2>
            <div className="flex justify-center">
              <span className="section-underline section-underline--dark" />
            </div>
            <p className="mt-4 text-white/60 max-w-lg mx-auto leading-relaxed">
              {lang === "en"
                ? "Reply to your preview email or contact us — we'll recommend the best upgrade path for your business."
                : "回覆您的預覽郵件或聯繫我們——我們會為您的業務推薦最佳升級路徑。"}
            </p>
            <div className="mt-8">
              <MagneticButton
                as="a"
                href="mailto:support@swiftlift.app"
                className="btn-brand inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-primary-foreground"
              >
                {lang === "en" ? "Contact Support" : "聯繫客服"}
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

const Addons = () => {
  useEffect(() => {
    // Ensure this page doesn't appear in navigation — it's for direct link use only
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background scroll-smooth">
        <CustomCursor />
        <Header />
        <AddonsContent />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Addons;
