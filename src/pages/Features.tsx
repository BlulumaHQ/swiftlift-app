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
  Package, Target, TrendingUp, Sparkles, ArrowRight, Server, RefreshCw, RotateCcw
} from "lucide-react";

type LangObj = { en: string; zh: string };
const T = (obj: LangObj, lang: "en" | "zh") => obj[lang];

/* ═══════════════════════════════════════════════
   SECTION DATA
   ═══════════════════════════════════════════════ */

const trustEssentials = [
  { icon: MessageCircle, title: { en: "FAQ Section", zh: "常見問題區塊" }, desc: { en: "Answer common questions and reduce hesitation before customers contact you.", zh: "回答常見問題，減少客戶聯繫前的猶豫。" }, price: "$49 USD" },
  { icon: Star, title: { en: "Review / Testimonial", zh: "評價展示" }, desc: { en: "Build trust instantly by showcasing real customer feedback.", zh: "透過展示真實客戶回饋即時建立信任。" }, price: "$49 USD" },
  { icon: MapPin, title: { en: "Google Map / Hours", zh: "Google地圖/營業時間" }, desc: { en: "Help customers find your location and business hours easily.", zh: "幫助客戶輕鬆找到您的位置和營業時間。" }, price: "$49 USD" },
  { icon: BarChart, title: { en: "Analytics / Pixel Setup", zh: "分析/像素設置" }, desc: { en: "Track visitor behavior and understand what's working on your website.", zh: "追蹤訪客行為，了解網站的有效之處。" }, price: "$99 USD" },
];

const contentPresentation = [
  { icon: Image, title: { en: "Gallery Section", zh: "圖庫區塊" }, desc: { en: "Showcase your work, products, or space with strong visual presentation.", zh: "透過強大的視覺呈現展示您的作品、產品或空間。" }, price: "$99 USD" },
  { icon: Edit, title: { en: "Blog Setup", zh: "部落格設置" }, desc: { en: "Publish content to improve SEO and build long-term authority.", zh: "發布內容以改善SEO並建立長期權威。" }, price: "$149 USD" },
  { icon: Globe, title: { en: "Basic Bilingual Setup", zh: "基礎雙語設置" }, desc: { en: "Allow visitors to switch between two languages on your site.", zh: "讓訪客在您的網站上切換兩種語言。" }, price: "$149 USD" },
  { icon: Languages, title: { en: "Multi Language Page Setup", zh: "多語言頁面設置" }, desc: { en: "Create SEO-friendly pages for multiple languages to reach a wider audience.", zh: "為多種語言創建SEO友好頁面，觸及更廣泛的受眾。" }, price: "$199 USD" },
];

const leadConversion = [
  { icon: Mail, title: { en: "Advanced Contact Form", zh: "進階聯繫表單" }, desc: { en: "Capture detailed inquiries with custom fields tailored to your business.", zh: "透過為您業務量身定制的自訂欄位捕獲詳細詢問。" }, price: "$129 USD" },
  { icon: Calendar, title: { en: "Booking Request Form", zh: "預約請求表單" }, desc: { en: "Let customers request appointments directly from your website.", zh: "讓客戶直接從您的網站預約。" }, price: "$149 USD" },
  { icon: List, title: { en: "Multi-Step Quote Form", zh: "多步驟報價表單" }, desc: { en: "Guide users step-by-step to increase form completion and lead quality.", zh: "逐步引導用戶以提高表單完成率和潛客質量。" }, price: "$149 USD" },
];

const growthOptimization = [
  { icon: Zap, title: { en: "Performance Optimization", zh: "性能優化" }, desc: { en: "Improve website speed and overall user experience.", zh: "提升網站速度和整體用戶體驗。" }, price: "$99 USD" },
  { icon: Search, title: { en: "Onsite SEO Optimization", zh: "站內SEO優化" }, desc: { en: "Optimize your site structure and content to improve search rankings.", zh: "優化網站結構和內容以提升搜索排名。" }, price: "$99 USD" },
];

const advancedSystems = [
  { icon: Palette, title: { en: "Brand Identity Package", zh: "品牌形象套餐" }, desc: { en: "Create a consistent and professional brand across your website.", zh: "在您的網站上創建一致且專業的品牌。" }, price: "$299 USD" },
  { icon: CreditCard, title: { en: "Payment Integration", zh: "支付集成" }, desc: { en: "Accept payments directly on your website without a full eCommerce system.", zh: "直接在網站上接受付款，無需完整的電子商務系統。" }, price: "$249 USD" },
  { icon: Lock, title: { en: "Membership / Client Portal", zh: "會員/客戶門戶" }, desc: { en: "Allow users to log in and access private content or manage accounts.", zh: "允許用戶登入並訪問私人內容或管理帳戶。" }, price: "$399 USD" },
];

const bundlesData = [
  { icon: Package, title: { en: "Conversion Essentials", zh: "轉化基礎套餐" }, desc: { en: "FAQ Section · Review / Testimonial · Google Map / Hours · Analytics Setup", zh: "常見問題 · 評價展示 · Google地圖/營業時間 · 分析設置" }, price: "$199 USD", savings: { en: "Save $77", zh: "節省 $77" } },
  { icon: Target, title: { en: "Lead Generation Pack", zh: "潛客獲取套餐" }, desc: { en: "Advanced Contact Form · Booking Request Form", zh: "進階聯繫表單 · 預約請求表單" }, price: "$249 USD", savings: { en: "Save $29", zh: "節省 $29" } },
  { icon: TrendingUp, title: { en: "Conversion Upgrade Pack", zh: "轉化升級套餐" }, desc: { en: "Advanced Contact Form · Multi-Step Quote Form · Review / Testimonial · FAQ Section", zh: "進階聯繫表單 · 多步驟報價表單 · 評價展示 · 常見問題" }, price: "$299 USD", savings: { en: "Save $128", zh: "節省 $128" } },
];

const hostingSupport = [
  { icon: Server, title: { en: "Managed Monthly Hosting", zh: "每月託管服務" }, desc: { en: "Ongoing monthly hosting and support for launched SwiftLift websites.", zh: "已上線 SwiftLift 網站的每月託管與支援。" }, price: "$15 USD / month", note: { en: "Available for launched SwiftLift websites.", zh: "適用於已上線的 SwiftLift 網站。" } },
  { icon: Server, title: { en: "Managed Yearly Hosting", zh: "年度託管服務" }, desc: { en: "A yearly managed hosting option for launched SwiftLift websites.", zh: "已上線 SwiftLift 網站的年度託管選項。" }, price: "$135 USD / year", note: { en: "Available for launched SwiftLift websites.", zh: "適用於已上線的 SwiftLift 網站。" } },
  { icon: RefreshCw, title: { en: "Additional Revision", zh: "額外修改" }, desc: { en: "Request an extra round of updates after your included revisions are used.", zh: "在已包含的修改次數用完後，申請額外一輪更新。" }, price: "$45 USD", note: { en: "Available for existing SwiftLift website projects.", zh: "適用於現有的 SwiftLift 網站專案。" } },
  { icon: RotateCcw, title: { en: "Reactivation Fee", zh: "重新啟動費" }, desc: { en: "For paused or delayed projects that need to be restarted and re-enter production.", zh: "適用於暫停或延遲的專案，需要重新啟動並重新進入生產。" }, price: "$50 USD", note: { en: "Available when restarting inactive SwiftLift projects.", zh: "適用於重新啟動不活躍的 SwiftLift 專案。" } },
];

const FOOTER_NOTE = { en: "Available as an upgrade for existing SwiftLift websites.", zh: "可作為現有 SwiftLift 網站的升級選項。" };

/* ═══════════════════════════════════════════════
   FEATURE CARD (no buttons, informational only)
   ═══════════════════════════════════════════════ */

const FeatureCard = ({ icon: Icon, title, desc, price, footerNote, lang, highlight }: {
  icon: any; title: LangObj; desc: LangObj; price: string; footerNote: LangObj; lang: "en" | "zh"; highlight?: boolean;
}) => (
  <div className={`rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] flex flex-col h-full border ${highlight ? "border-[hsl(275_51%_46%)/0.2]" : "border-black/[0.04]"}`}>
    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.08)" }}>
      <Icon size={22} style={{ color: "hsl(275 51% 46%)" }} />
    </div>
    <h3 className="text-[1.05rem] font-bold text-foreground leading-snug">{T(title, lang)}</h3>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{T(desc, lang)}</p>
    <div className="mt-auto pt-5">
      <span className="text-2xl font-black text-foreground">{price}</span>
      <p className="mt-3 text-[12px] text-muted-foreground/70 leading-snug">{T(footerNote, lang)}</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   SECTION RENDERER
   ═══════════════════════════════════════════════ */

const FeatureSection = ({ title, subtitle, items, lang, bgClass, highlight, columns }: {
  title: LangObj; subtitle?: LangObj; items: { icon: any; title: LangObj; desc: LangObj; price: string }[]; lang: "en" | "zh"; bgClass?: string; highlight?: boolean; columns?: number;
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
              footerNote={FOOTER_NOTE}
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
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-block text-xs font-bold uppercase tracking-widest text-white/60 mb-4"
          >
            {lang === "en" ? "FEATURE CATALOG" : "功能目錄"}
          </motion.span>
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
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/50 text-sm max-w-lg mx-auto"
          >
            {lang === "en"
              ? "These features are available as part of custom quotes or as upgrade options for existing SwiftLift websites."
              : "這些功能可作為定制報價的一部分或現有 SwiftLift 網站的升級選項。"}
          </motion.p>
        </div>
      </section>

      {/* ── Trust & Essentials ── */}
      <FeatureSection title={{ en: "Trust & Essentials", zh: "信任與基礎" }} items={trustEssentials} lang={lang} bgClass="bg-white" columns={2} />

      {/* ── Content & Presentation ── */}
      <FeatureSection title={{ en: "Content & Presentation", zh: "內容與呈現" }} items={contentPresentation} lang={lang} bgClass="bg-[#F8F8FA]" columns={2} />

      {/* ── Lead & Conversion (Highlighted) ── */}
      <FeatureSection title={{ en: "Lead & Conversion", zh: "潛客與轉化" }} items={leadConversion} lang={lang} bgClass="bg-white" highlight />

      {/* ── Growth & Optimization ── */}
      <FeatureSection title={{ en: "Growth & Optimization", zh: "成長與優化" }} items={growthOptimization} lang={lang} bgClass="bg-[#F8F8FA]" columns={2} />

      {/* ── Advanced Systems ── */}
      <FeatureSection title={{ en: "Advanced Systems", zh: "進階系統" }} items={advancedSystems} lang={lang} bgClass="bg-white" />

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
                      <p className="mt-3 text-[12px] text-muted-foreground/70 leading-snug">
                        {lang === "en"
                          ? "Available as a bundled upgrade for existing SwiftLift clients."
                          : "可作為現有 SwiftLift 客戶的套餐升級選項。"}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Hosting & Ongoing Support ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(275 51% 46%)" }}>
                <Sparkles size={14} />
                {lang === "en" ? "POST-LAUNCH SERVICES" : "上線後服務"}
              </span>
              <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display">
                {lang === "en" ? "Hosting & Ongoing Support" : "託管與持續支援"}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                {lang === "en"
                  ? "Once your website is ready, we also offer managed hosting and support options to help keep everything running smoothly."
                  : "網站準備就緒後，我們還提供託管和支援選項，幫助一切順利運行。"}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {hostingSupport.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={0.04 * i}>
                  <div className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] flex flex-col h-full border border-black/[0.04]">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.08)" }}>
                      <Icon size={22} style={{ color: "hsl(275 51% 46%)" }} />
                    </div>
                    <h3 className="text-[1.05rem] font-bold text-foreground leading-snug">{T(item.title, lang)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{T(item.desc, lang)}</p>
                    <div className="mt-auto pt-5">
                      <span className="text-2xl font-black text-foreground">{item.price}</span>
                      <p className="mt-3 text-[12px] text-muted-foreground/70 leading-snug">{T(item.note, lang)}</p>
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
                ? "Tell us about your business and we'll recommend the right website features, upgrades, or support options for you."
                : "告訴我們您的業務，我們會為您推薦合適的網站功能、升級或支援選項。"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-base font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: "hsl(275 51% 46%)" }}
              >
                {lang === "en" ? "Get My 2 Free Previews" : "獲取我的2個免費預覽"}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/custom-brief"
                className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                {lang === "en" ? "Request Custom Quote" : "請求定制報價"}
              </Link>
            </div>
            <p className="mt-6 text-white/30 text-xs">
              {lang === "en"
                ? "Already a SwiftLift client? Your upgrade options may be shared with you through a secure client link."
                : "已經是 SwiftLift 客戶？您的升級選項可能會透過安全的客戶連結分享給您。"}
            </p>
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
