import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, X, Check, Layout, Smartphone, Gauge, Sparkles } from "lucide-react";

import aboutHero from "@/assets/about-hero.jpg";
import aboutTransform from "@/assets/about-transform.jpg";
import aboutWorkspace from "@/assets/about-workspace.jpg";

type TBlock = { en: string; zh: string };
const T = (b: TBlock, lang: string) => (lang === "zh" ? b.zh : b.en);

const tx = {
  eyebrow: { en: "About SwiftLift", zh: "關於 SwiftLift" },
  heroH1a: { en: "We Don't Build Websites.", zh: "我們不是在建新網站。" },
  heroH1b: { en: "We Upgrade What You Already Have.", zh: "我們升級您現有的網站。" },
  heroSub: {
    en: "— built for one purpose: giving existing websites a fast, professional facelift without starting from scratch.",
    zh: "——專為一個目的而生：為現有網站進行快速、專業的 Facelift，無需從零開始。",
  },
  heroSubPrefix: {
    en: "SwiftLift is a specialized service by ",
    zh: "SwiftLift 是 ",
  },
  heroSubSuffix: {
    en: "",
    zh: " 的專業服務",
  },
  ctaPrimary: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" },
  ctaPortfolio: { en: "View Portfolio", zh: "查看作品集" },

  // Section 2 - Problem
  problemLabel: { en: "The Problem", zh: "問題所在" },
  problemH2a: { en: "Your Website Isn't Broken.", zh: "您的網站並沒有壞。" },
  problemH2b: { en: "It's Just Holding You Back.", zh: "只是在拖累您的業務。" },
  problemPara: {
    en: "Businesses grow. Websites don't keep up. What worked three years ago now feels slow, outdated, and out of touch with your brand.",
    zh: "企業在成長，但網站跟不上。三年前有效的設計，如今已顯得緩慢、過時，與您的品牌脫節。",
  },
  problemBullets: [
    { en: "Outdated design that no longer reflects who you are", zh: "過時的設計已不再反映您的品牌形象" },
    { en: "Slow load times that kill conversions", zh: "緩慢的載入速度正在扼殺轉換率" },
    { en: "Poor mobile experience that loses trust", zh: "糟糕的手機體驗正在失去客戶信任" },
    { en: "Missed enquiries every single day", zh: "每天都在錯失潛在客戶的詢問" },
  ],
  problemClosing: {
    en: "Most business owners know their website needs work — but don't have the time, budget, or energy to deal with a full rebuild. That's exactly the gap SwiftLift was built to fill.",
    zh: "大多數企業主都知道網站需要改進——但沒有時間、預算或精力來處理全面重建。這正是 SwiftLift 為之而生的。",
  },

  // Section 3 - Transformation
  transformLabel: { en: "The Transformation", zh: "改版成果" },
  transformH2a: { en: "From Outdated to High-Performing —", zh: "從過時到高效能——" },
  transformH2b: { en: "In Days, Not Months.", zh: "只需數天，而非數月。" },
  transformSub: {
    en: "We take your existing website and transform it into a modern, conversion-focused version — without the long agency process.",
    zh: "我們將您現有的網站改造為現代化、以轉換為導向的版本——無需漫長的代理商流程。",
  },
  beforeLabel: { en: "Before", zh: "改版前" },
  beforeDesc: { en: "Outdated · Slow · Cluttered", zh: "過時 · 緩慢 · 雜亂" },
  afterLabel: { en: "After", zh: "改版後" },
  afterDesc: { en: "Modern · Fast · Conversion-Ready", zh: "現代 · 快速 · 轉換就緒" },

  // Section 4 - Who We Are
  whoLabel: { en: "Who We Are", zh: "關於我們" },
  whoH2a: { en: "Built on a Decade of ", zh: "十年真實設計經驗的" },
  whoH2b: { en: "Real Design Experience", zh: "累積" },
  whoPara1Prefix: { en: "SwiftLift is a product of ", zh: "SwiftLift 是 " },
  whoPara1Suffix: {
    en: " — a full-service design agency with over 10 years of experience helping small businesses build and grow their online presence.",
    zh: " 的產品——一家擁有超過10年經驗的全方位設計公司，致力於幫助中小企業建立和擴展線上影響力。",
  },
  whoPara2: {
    en: "We created SwiftLift because we kept seeing the same problem: business owners stuck with outdated websites, unable to afford a full agency rebuild, unsure where to start.",
    zh: "我們創建 SwiftLift 是因為我們不斷看到同樣的問題：企業主被過時的網站困住，負擔不起全面的代理商重建，也不知道從何開始。",
  },
  whoPara3: {
    en: "So we built a system that makes it fast, risk-free, and affordable.",
    zh: "所以我們建立了一個快速、零風險、價格合理的系統。",
  },
  whoChecks: [
    { en: "No lengthy back-and-forth", zh: "無需漫長的來回溝通" },
    { en: "No paying before you see results", zh: "看到成果前無需付款" },
    { en: "No technical headaches", zh: "無需處理任何技術問題" },
  ],
  whoClosing: { en: "Just a better website — delivered in days.", zh: "只為您打造更好的網站——數天內交付。" },

  // Section 5 - What We Do
  whatLabel: { en: "What We Do", zh: "我們的服務" },
  whatH2: { en: "A Complete System for Website Facelifts", zh: "完整的網站 Facelift 系統" },
  whatCards: [
    { title: { en: "Conversion-Focused Design", zh: "轉換導向設計" }, desc: { en: "Every layout decision is made to guide visitors toward taking action.", zh: "每個版面設計決策都是為了引導訪客採取行動。" } },
    { title: { en: "Mobile-First Rebuilding", zh: "行動裝置優先重建" }, desc: { en: "Your new site looks and performs perfectly on every device.", zh: "您的新網站在每台裝置上都能完美呈現與運作。" } },
    { title: { en: "Performance Optimization", zh: "效能優化" }, desc: { en: "Faster load times, cleaner code, better user experience across the board.", zh: "更快的載入速度、更乾淨的程式碼、全面更好的使用者體驗。" } },
    { title: { en: "Modern UI/UX", zh: "現代 UI/UX" }, desc: { en: "Clean, credible interfaces that reflect the quality of your business.", zh: "乾淨、可信賴的介面，反映您企業的品質。" } },
  ],
  whatClosing: { en: "This isn't just a redesign. It's a performance upgrade.", zh: "這不僅僅是重新設計，更是效能升級。" },

  // Section 6 - Difference
  diffLabel: { en: "The Difference", zh: "差異所在" },
  diffH2: { en: "Why SwiftLift Is Different", zh: "為什麼 SwiftLift 與眾不同" },
  diffTraditional: { en: "Traditional Agencies", zh: "傳統代理商" },
  diffTraditionalItems: [
    { en: "Weeks just to get started", zh: "光是啟動就需要數週" },
    { en: "Multiple meetings before anything happens", zh: "需要多次會議才能開始" },
    { en: "High upfront costs with no guarantee", zh: "高額預付費用且無保證" },
    { en: "One version — take it or leave it", zh: "只有一個版本——接受或拒絕" },
    { en: "Long revision cycles", zh: "漫長的修改週期" },
  ],
  diffSwiftItems: [
    { en: "Previews ready in 48 hours", zh: "48小時內 Preview 準備就緒" },
    { en: "No calls, no meetings required", zh: "無需電話、無需會議" },
    { en: "You see 2 real versions before paying anything", zh: "付款前先看到2個真實版本" },
    { en: "You choose what works best", zh: "您選擇最適合的版本" },
    { en: "Live website in 3 days", zh: "3天內網站上線" },
  ],

  // Section 7 - CTA
  ctaH2: { en: "See Both Versions. Choose What Works. Pay Only Then.", zh: "查看兩個版本。選擇合適的。再付款。" },
  ctaSub: { en: "No pressure. No guesswork. Just a better website for your business.", zh: "無壓力。無猜測。只為您的業務打造更好的網站。" },
  ctaFooter: {
    en: "No upfront payment · No obligation · Built for real business results",
    zh: "無需預付費用 · 無任何義務 · 專為真實商業成果而生",
  },
};

const AboutContent = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = lang === "zh"
      ? "關於 — SwiftLift | 我們升級您現有的網站"
      : "About — SwiftLift | We Upgrade What You Already Have";
    window.scrollTo(0, 0);
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://swiftlift.app/about");
    return () => { canonical?.setAttribute("href", "https://swiftlift.app/"); };
  }, [lang]);

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/#contact");
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const icons = [Layout, Smartphone, Gauge, Sparkles];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />

      {/* ═══════════════════════ SECTION 1: HERO ═══════════════════════ */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(220 45% 5%) 0%, hsl(225 40% 9%) 50%, hsl(230 35% 13%) 100%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent-purple)/0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(220_60%_18%/0.25),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-block rounded-full bg-[hsl(var(--accent-purple))]/10 border border-[hsl(var(--accent-purple))]/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--accent-purple))] mb-8">
                  {T(tx.eyebrow, lang)}
                </span>
              </ScrollReveal>
              <ScrollReveal>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white mb-7">
                  {T(tx.heroH1a, lang)}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">
                    {T(tx.heroH1b, lang)}
                  </span>
                </h1>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-lg text-white/75 leading-relaxed max-w-lg">
                  {T(tx.heroSubPrefix, lang)}
                  <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline underline-offset-2 hover:text-[hsl(var(--accent-purple))] transition-colors">
                    Bluluma Design
                  </a>
                  {T(tx.heroSubSuffix, lang)}
                  {T(tx.heroSub, lang)}
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="/#contact" onClick={handleCTA} className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[hsl(var(--accent-purple))]/20 hover:shadow-[hsl(var(--accent-purple))]/30 hover:scale-[1.02] transition-all" style={{ background: "hsl(var(--accent-purple))" }}>
                    {T(tx.ctaPrimary, lang)} <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link to="/portfolio" className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 px-8 py-4 text-sm font-bold text-white hover:bg-white/5 hover:border-white/30 transition-all">
                    {T(tx.ctaPortfolio, lang)}
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                  <img src={aboutHero} alt="Before and after website transformation on a laptop mockup" className="w-full h-auto object-cover" width={1280} height={800} />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[hsl(var(--accent-purple))] opacity-15 blur-3xl" />
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[hsl(210,100%,55%)] opacity-10 blur-3xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 2: THE PROBLEM ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">{T(tx.problemLabel, lang)}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] max-w-2xl">
              {T(tx.problemH2a, lang)}{" "}
              <span className="text-muted-foreground">{T(tx.problemH2b, lang)}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              {T(tx.problemPara, lang)}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5 mt-14">
            {tx.problemBullets.map((item) => (
              <ScrollReveal key={item.en}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <p className="text-base text-foreground leading-relaxed">{T(item, lang)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="mt-14 text-base text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
              {T(tx.problemClosing, lang)}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 3: THE TRANSFORMATION ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 45% 6%) 0%, hsl(225 40% 10%) 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent-purple)/0.06),transparent_70%)]" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">{T(tx.transformLabel, lang)}</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1]">
                {T(tx.transformH2a, lang)}
                <br className="hidden sm:block" />
                <span className="text-white/60">{T(tx.transformH2b, lang)}</span>
              </h2>
              <p className="mt-5 text-lg text-white/50 max-w-xl mx-auto">
                {T(tx.transformSub, lang)}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              <img src={aboutTransform} alt="Website before and after transformation" className="w-full h-auto" loading="lazy" width={1280} height={640} />
              <div className="absolute bottom-0 left-0 right-0 flex">
                <div className="flex-1 py-4 px-6 bg-black/70 backdrop-blur-sm border-t border-r border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-red-400/80">{T(tx.beforeLabel, lang)}</p>
                  <p className="text-xs text-white/50 mt-0.5">{T(tx.beforeDesc, lang)}</p>
                </div>
                <div className="flex-1 py-4 px-6 bg-[hsl(var(--accent-purple))]/20 backdrop-blur-sm border-t border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[hsl(var(--accent-purple))]">{T(tx.afterLabel, lang)}</p>
                  <p className="text-xs text-white/60 mt-0.5">{T(tx.afterDesc, lang)}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 4: WHO WE ARE ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
                <img src={aboutWorkspace} alt="Designer working in a creative workspace" className="w-full h-auto object-cover" loading="lazy" width={800} height={1000} />
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">{T(tx.whoLabel, lang)}</span>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1]">
                  {T(tx.whoH2a, lang)}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-purple))] to-[hsl(210,100%,65%)]">{T(tx.whoH2b, lang)}</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <div className="mt-7 space-y-4">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {T(tx.whoPara1Prefix, lang)}
                    <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-bold underline underline-offset-2 hover:text-[hsl(var(--accent-purple))] transition-colors">
                      Bluluma Design
                    </a>
                    {T(tx.whoPara1Suffix, lang)}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {T(tx.whoPara2, lang)}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {T(tx.whoPara3, lang)}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="mt-8 space-y-3">
                  {tx.whoChecks.map((item) => (
                    <div key={item.en} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(var(--accent-purple) / 0.1)" }}>
                        <Check className="w-3.5 h-3.5" style={{ color: "hsl(var(--accent-purple))" }} />
                      </div>
                      <p className="text-base text-foreground font-medium">{T(item, lang)}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <p className="mt-8 text-lg font-bold text-foreground">
                  {T(tx.whoClosing, lang)}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 5: WHAT WE DO ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">{T(tx.whatLabel, lang)}</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.1]">
                {T(tx.whatH2, lang)}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {tx.whatCards.map((item, idx) => {
              const Icon = icons[idx];
              return (
                <ScrollReveal key={item.title.en}>
                  <div className="group rounded-2xl border border-border bg-card p-8 h-full hover:border-[hsl(var(--accent-purple))]/30 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "hsl(var(--accent-purple) / 0.08)" }}>
                      <Icon className="w-5.5 h-5.5" style={{ color: "hsl(var(--accent-purple))" }} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{T(item.title, lang)}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{T(item.desc, lang)}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal>
            <p className="mt-12 text-center text-base text-muted-foreground italic">{T(tx.whatClosing, lang)}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 6: THE DIFFERENCE ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 45% 6%) 0%, hsl(225 40% 9%) 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent-purple)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--accent-purple))]">{T(tx.diffLabel, lang)}</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white">{T(tx.diffH2, lang)}</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35 mb-8">{T(tx.diffTraditional, lang)}</p>
                <div className="space-y-5">
                  {tx.diffTraditionalItems.map((item) => (
                    <div key={item.en} className="flex items-center gap-4">
                      <X className="w-4.5 h-4.5 text-red-400/50 shrink-0" />
                      <p className="text-base text-white/45">{T(item, lang)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[hsl(var(--accent-purple))]/30 p-8 sm:p-10" style={{ background: "hsl(var(--accent-purple) / 0.06)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-8" style={{ color: "hsl(var(--accent-purple))" }}>SwiftLift</p>
                <div className="space-y-5">
                  {tx.diffSwiftItems.map((item) => (
                    <div key={item.en} className="flex items-center gap-4">
                      <Check className="w-4.5 h-4.5 shrink-0" style={{ color: "hsl(var(--accent-purple))" }} />
                      <p className="text-base text-white/85">{T(item, lang)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ SECTION 7: FOOTER CTA ═══════════════════════ */}
      <section className="py-24 sm:py-32 px-6" style={{ background: "linear-gradient(to bottom, hsl(225 40% 9%), hsl(220 45% 5%))" }}>
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-[1.1]">
              {T(tx.ctaH2, lang)}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg text-white/40 mb-10">{T(tx.ctaSub, lang)}</p>
          </ScrollReveal>
          <ScrollReveal>
            <a href="/#contact" onClick={handleCTA} className="inline-flex items-center gap-2.5 rounded-xl px-10 py-4.5 text-base font-bold text-white shadow-lg shadow-[hsl(var(--accent-purple))]/20 hover:shadow-[hsl(var(--accent-purple))]/30 hover:scale-[1.02] transition-all" style={{ background: "hsl(var(--accent-purple))" }}>
              {T(tx.ctaPrimary, lang)} <ArrowRight className="w-5 h-5" />
            </a>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-8 text-sm text-white/25">{T(tx.ctaFooter, lang)}</p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const About = () => (
  <LanguageProvider>
    <AboutContent />
  </LanguageProvider>
);

export default About;
