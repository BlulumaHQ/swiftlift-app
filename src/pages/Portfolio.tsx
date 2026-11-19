import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";
import { ArrowRight } from "lucide-react";
import { SEO_ROUTES } from "@/lib/seoRoutes";

type TBlock = { en: string; zh: string };
const T = (b: TBlock, lang: string) => (lang === "zh" ? b.zh : b.en);

/* ── Page-level translations ── */
const ptx = {
  badge: { en: "Portfolio", zh: "作品集" },
  heroH1: { en: "Real Website Transformations", zh: "真實網站改版成果" },
  heroSub: { en: "Compare two preview versions. See what clients chose. Explore real results.", zh: "比較兩個 Preview 版本。了解客戶的選擇。探索真實成果。" },
  heroSub2: { en: "From outdated websites to modern, high-performing experiences.", zh: "從過時的網站到現代化、高效能的體驗。" },
  featuredH2: { en: "Featured Transformations", zh: "精選改版案例" },
  featuredSub: { en: "Full before → after breakdowns with preview versions and client feedback.", zh: "完整的改版前→改版後解析，包含 Preview 版本與客戶回饋。" },
  moreH2: { en: "More Projects", zh: "更多專案" },
  moreSub: { en: "Hover over Preview A or B to see each direction. Click to open the live preview.", zh: "將滑鼠移到 Preview A 或 B 上查看不同方向。點擊開啟即時預覽。" },
  ctaH2: { en: "Get Your 2 Free Website Previews", zh: "獲取您的2個免費網站預覽" },
  ctaSub: { en: "See your new website before making any payment.", zh: "付款前先看到您的新網站。" },
  ctaBtn: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" },
  before: { en: "Before", zh: "改版前" },
  finalVersion: { en: "Final Selected Version", zh: "最終選定版本" },
  openA: { en: "Open Live Preview A", zh: "開啟即時 Preview A" },
  openB: { en: "Open Live Preview B", zh: "開啟即時 Preview B" },
  versionA: { en: "A · Classic Facelift", zh: "A · Classic Facelift" },
  versionB: { en: "B · Growth Facelift", zh: "B · Growth Facelift" },
};

const PortfolioContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = lang === "zh"
      ? "作品集 — SwiftLift | 真實網站改版成果"
      : SEO_ROUTES["/portfolio"].title;
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://swiftlift.app/portfolio");
    return () => { canonical?.setAttribute("href", "https://swiftlift.app/"); };
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <Header />

      {/* SECTION 1 — HERO */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block rounded-full bg-[hsl(var(--accent-purple))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))] mb-4">
            {T(ptx.badge, lang)}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-foreground mb-3">
            {T(ptx.heroH1, lang)}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            {T(ptx.heroSub, lang)}
          </p>
          <p className="text-sm text-muted-foreground">
            {T(ptx.heroSub2, lang)}
          </p>
        </div>
      </section>

      <Portfolio variant="all" />

      {/* SECTION 4 — CTA */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
            {T(ptx.ctaH2, lang)}
          </h2>
          <p className="text-muted-foreground mb-6">
            {T(ptx.ctaSub, lang)}
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--accent-purple))] px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-all"
          >
            {T(ptx.ctaBtn, lang)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PortfolioPage = () => (
  <LanguageProvider>
    <PortfolioContent />
  </LanguageProvider>
);

export default PortfolioPage;
