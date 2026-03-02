import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar, FileText, Calculator, Star, Globe, ShoppingCart,
  CreditCard, RefreshCw, UtensilsCrossed, Users,
  Home, Car, Briefcase, BarChart3, Workflow
} from "lucide-react";

const coreFunctional = [
  { icon: Calendar, title: { en: "Booking System Module", zh: "预约系统模块" }, desc: { en: "Online appointment scheduling with calendar synchronization.", zh: "在线预约排程，支持日历同步。" } },
  { icon: FileText, title: { en: "Multi-Step Form Module", zh: "多步骤表单模块" }, desc: { en: "Structured intake forms with conditional logic and validation.", zh: "带条件逻辑和验证的结构化表单。" } },
  { icon: Calculator, title: { en: "Quote Calculator Module", zh: "报价计算器模块" }, desc: { en: "Custom pricing or estimation calculator embedded into your site.", zh: "嵌入网站的自定义定价或估算计算器。" } },
  { icon: Star, title: { en: "Review Showcase Module", zh: "评价展示模块" }, desc: { en: "Display selected customer reviews with star ratings and brand styling.", zh: "展示精选客户评价，包含星级评分和品牌风格。" } },
  { icon: Globe, title: { en: "Multi-Language Module", zh: "多语言模块" }, desc: { en: "Add bilingual or multilingual structure with language switching.", zh: "添加双语或多语言结构，支持语言切换。" } },
];

const salesTransaction = [
  { icon: ShoppingCart, title: { en: "E-Commerce Module", zh: "电子商务模块" }, desc: { en: "Product catalog, cart, and secure checkout functionality.", zh: "产品目录、购物车和安全结账功能。" } },
  { icon: CreditCard, title: { en: "Payment Integration Module", zh: "支付集成模块" }, desc: { en: "Accept one-time or recurring payments securely.", zh: "安全接受一次性或定期付款。" } },
  { icon: RefreshCw, title: { en: "Subscription Module", zh: "订阅模块" }, desc: { en: "Recurring billing or gated access membership system.", zh: "定期计费或门控访问会员系统。" } },
  { icon: UtensilsCrossed, title: { en: "Online Ordering Module", zh: "在线点餐模块" }, desc: { en: "Integrated ordering system for restaurants or service businesses.", zh: "适用于餐厅或服务型企业的集成点餐系统。" } },
  { icon: Users, title: { en: "Membership Portal Module", zh: "会员门户模块" }, desc: { en: "Protected login areas for clients or members.", zh: "为客户或会员提供的受保护登录区域。" } },
];

const industryProfessional = [
  { icon: Home, title: { en: "Real Estate IDX Integration", zh: "房地产IDX集成" }, desc: { en: "MLS listing feeds with advanced search filtering.", zh: "MLS房源信息流，支持高级搜索过滤。" } },
  { icon: Car, title: { en: "Vehicle Inventory Module", zh: "车辆库存模块" }, desc: { en: "Filterable automotive inventory display system.", zh: "可筛选的汽车库存展示系统。" } },
  { icon: Briefcase, title: { en: "Portfolio Module", zh: "作品集模块" }, desc: { en: "Structured case study and project showcase system.", zh: "结构化案例研究和项目展示系统。" } },
  { icon: BarChart3, title: { en: "Analytics Integration", zh: "分析集成" }, desc: { en: "Google Analytics and Tag Manager setup.", zh: "Google Analytics和Tag Manager设置。" } },
  { icon: Workflow, title: { en: "Advanced Form Automation Module", zh: "高级表单自动化模块" }, desc: { en: "Custom routing and notification logic for form submissions.", zh: "表单提交的自定义路由和通知逻辑。" } },
];

const T = (obj: string | { en: string; zh: string }, lang: "en" | "zh") =>
  typeof obj === "string" ? obj : obj[lang];

const FeatureCard = ({ item, lang }: { item: { icon: any; title: { en: string; zh: string }; desc: { en: string; zh: string } }; lang: "en" | "zh" }) => {
  const Icon = item.icon;
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm flex flex-col">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
        <Icon size={24} style={{ color: "hsl(275 51% 46%)" }} />
      </div>
      <h3 className="text-lg font-bold text-foreground font-display">{T(item.title, lang)}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{T(item.desc, lang)}</p>
      <Link
        to="/custom-brief"
        className="mt-5 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 w-fit"
        style={{ backgroundColor: "#7F37AE" }}
      >
        {lang === "en" ? "Request Feature Quote" : "请求功能报价"}
      </Link>
    </div>
  );
};

const FeaturesContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Add Features — SwiftLift";
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
            {lang === "en" ? "Add Features" : "添加功能"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-white/80 text-[1.05rem] md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en"
              ? "Optional functionality you can add after your site is live."
              : "您的网站上线后可以添加的可选功能。"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-white/60 text-sm md:text-base max-w-lg mx-auto"
          >
            {lang === "en"
              ? "These modules expand your website without changing your approved layout."
              : "这些模块在不改变已批准布局的情况下扩展您的网站。"}
          </motion.p>
        </div>
      </section>

      {/* Section 1 — Core Functional Modules */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display text-center mb-10">
            {lang === "en" ? "Core Functional Modules" : "核心功能模块"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFunctional.map((item) => (
              <FeatureCard key={T(item.title, lang)} item={item} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — Sales & Transaction Systems */}
      <section className="py-14 md:py-20" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display text-center mb-10">
            {lang === "en" ? "Sales & Transaction Systems" : "销售与交易系统"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {salesTransaction.map((item) => (
              <FeatureCard key={T(item.title, lang)} item={item} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Industry & Professional Integrations */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[1.6rem] md:text-[2rem] font-black text-foreground font-display text-center mb-10">
            {lang === "en" ? "Industry & Professional Integrations" : "行业与专业集成"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryProfessional.map((item) => (
              <FeatureCard key={T(item.title, lang)} item={item} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 section-brand-dark">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[1.6rem] md:text-[2rem] font-black text-white font-display mb-4">
            {lang === "en" ? "Ready to Add Features?" : "准备好添加功能了吗？"}
          </h2>
          <p className="text-white/80 text-[1.05rem] md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            {lang === "en"
              ? "Select the functionality you'd like to expand, and we'll provide a structured upgrade proposal."
              : "选择您想要扩展的功能，我们将提供结构化的升级方案。"}
          </p>
          <Link
            to="/custom-brief"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#7F37AE" }}
          >
            {lang === "en" ? "Request Feature Quote" : "请求功能报价"}
          </Link>
          <p className="mt-4 text-white/50 text-sm">
            {lang === "en"
              ? "All upgrades are optional and can be added anytime after launch."
              : "所有升级均为可选，可在上线后随时添加。"}
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
