import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, ExternalLink, Quote, Star, Eye, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import swiftliftReviewSlide from "@/assets/swiftlift-review-slide.webp";
import swiftliftFeature from "@/assets/swiftlift-feature-01.webp";
import portfolioArtsA from "@/assets/portfolio-arts-automotive-a.webp";
import portfolioArtsB from "@/assets/portfolio-arts-automotive-b.webp";

import portfolioArchitect57Before from "@/assets/portfolio-architect57-before.webp";
import portfolioArchitect57A from "@/assets/portfolio-architect57-a.webp";
import portfolioArchitect57B from "@/assets/portfolio-architect57-b.webp";
import portfolioGenesBefore from "@/assets/portfolio-genes-before.webp";
import portfolioGenesA from "@/assets/portfolio-genes-a.webp";
import portfolioGenesB from "@/assets/portfolio-genes-b.webp";
import portfolioArtsBefore from "@/assets/portfolio-arts-before.webp";
import portfolioArtsAV2 from "@/assets/portfolio-arts-a-v2.webp";
import portfolioArtsBV2 from "@/assets/portfolio-arts-b-v2.webp";

import portfolioChicagoA from "@/assets/portfolio-chicago-boxing-a.webp";
import portfolioChicagoB from "@/assets/portfolio-chicago-boxing-b.webp";
import portfolioDentalA from "@/assets/portfolio-friendly-dental-a.webp";
import portfolioDentalB from "@/assets/portfolio-friendly-dental-b.webp";
import portfolioHHNexusA from "@/assets/portfolio-hh-nexus-a.webp";
import portfolioHHNexusB from "@/assets/portfolio-hh-nexus-b.webp";
import portfolioHsinA from "@/assets/portfolio-hsin-hsin-a.webp";
import portfolioHsinB from "@/assets/portfolio-hsin-hsin-b.webp";
import portfolioNueraA from "@/assets/portfolio-nueranutra-a.webp";
import portfolioNueraB from "@/assets/portfolio-nueranutra-b.webp";
import portfolioOneParkA from "@/assets/portfolio-one-park-a.webp";
import portfolioOneParkB from "@/assets/portfolio-one-park-b.webp";
import portfolioPhoenixA from "@/assets/portfolio-phoenix-remodel-a.webp";
import portfolioPhoenixB from "@/assets/portfolio-phoenix-remodel-b.webp";
import portfolioPresoteaA from "@/assets/portfolio-presotea-a.webp";
import portfolioPresoteaB from "@/assets/portfolio-presotea-b.webp";
import portfolioStudio21A from "@/assets/portfolio-studio21-a.webp";
import portfolioStudio21B from "@/assets/portfolio-studio21-b.webp";
import portfolioStylesHairA from "@/assets/portfolio-styles-hair-a.webp";
import portfolioStylesHairB from "@/assets/portfolio-styles-hair-b.webp";
import portfolioUnityTattooA from "@/assets/portfolio-unity-tattoo-a.webp";
import portfolioUnityTattooB from "@/assets/portfolio-unity-tattoo-b.webp";
import portfolioWestsideA from "@/assets/portfolio-westside-medical-a.webp";
import portfolioWestsideB from "@/assets/portfolio-westside-medical-b.webp";
import portfolioYangHealthA from "@/assets/portfolio-yang-health-a.webp";
import portfolioYangHealthB from "@/assets/portfolio-yang-health-b.webp";

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
  versionA: { en: "Version A", zh: "Version A" },
  versionB: { en: "Version B", zh: "Version B" },
};

/* ── Featured Case Data ── */

interface FeaturedCase {
  company: string;
  industry: TBlock;
  description: TBlock;
  beforeSummary: TBlock;
  previewA: string;
  previewB: string;
  selectedVersion: "A" | "B";
  selectedLabel: TBlock;
  testimonial: TBlock;
  testimonialAuthor: string;
  imageBefore: string;
  imageA: string;
  imageB: string;
}

const featuredCases: FeaturedCase[] = [
  {
    company: "Architect57",
    industry: { en: "Construction", zh: "建築設計" },
    description: {
      en: "A modern architecture firm redesign with two distinct directions: one clean professional layout and one stronger conversion-focused version.",
      zh: "一家現代建築事務所的網站改版，提供兩個截然不同的方向：一個簡潔專業的版面，一個更強轉換導向的版本。",
    },
    beforeSummary: {
      en: "Outdated layout, weak hierarchy, and a website that did not reflect the studio's design quality.",
      zh: "過時的版面、薄弱的層次結構，網站無法反映工作室的設計品質。",
    },
    previewA: "architect-57-a.netlify.app",
    previewB: "architect-57-b.netlify.app",
    selectedVersion: "B",
    selectedLabel: { en: "Version B — Conversion-Focused", zh: "Version B — 轉換導向" },
    testimonial: {
      en: "Before SwiftLift, our website felt outdated and did not reflect the quality of our architecture work. The preview process made it very easy to compare two different directions side by side. Version A felt cleaner, but Version B gave us a stronger overall presentation and a more compelling first impression. The final result feels much more aligned with our brand.",
      zh: "在使用 SwiftLift 之前，我們的網站感覺過時，無法反映我們建築作品的品質。Preview 流程讓我們可以輕鬆地並排比較兩個不同方向。Version A 感覺更簡潔，但 Version B 給了我們更強的整體呈現和更有說服力的第一印象。最終結果與我們的品牌更加一致。",
    },
    testimonialAuthor: "Cary T., Architect",
    imageBefore: portfolioArchitect57Before,
    imageA: portfolioArchitect57A,
    imageB: portfolioArchitect57B,
  },
  {
    company: "Gene's Sausage Shop",
    industry: { en: "Specialty Food", zh: "特色食品" },
    description: {
      en: "A specialty food business redesign with a cleaner structure, better visual storytelling, and a stronger product-first presentation.",
      zh: "一家特色食品企業的網站改版，結構更清晰、視覺敘事更佳，產品優先的展示更具力道。",
    },
    beforeSummary: {
      en: "An older site with limited visual impact, dated styling, and a weaker presentation of products and brand quality.",
      zh: "舊網站視覺衝擊力有限、風格過時，產品和品牌品質的展示較弱。",
    },
    previewA: "genes-sausage-a.netlify.app",
    previewB: "genes-sausage-b.netlify.app",
    selectedVersion: "A",
    selectedLabel: { en: "Version A — Clean Professional", zh: "Version A — 簡潔專業" },
    testimonial: {
      en: "The old website no longer matched the quality of our products or brand. SwiftLift gave us two real website versions to compare, which made the decision process much easier. The new design feels much more polished, organized, and professional. It presents our business in a way that finally feels current.",
      zh: "舊網站已不再匹配我們產品或品牌的品質。SwiftLift 提供了兩個真實的網站版本供比較，讓決策過程更加輕鬆。新設計感覺更加精緻、有條理且專業。它以一種終於跟上時代的方式展示了我們的業務。",
    },
    testimonialAuthor: "Sarah R., Owner",
    imageBefore: portfolioGenesBefore,
    imageA: portfolioGenesA,
    imageB: portfolioGenesB,
  },
  {
    company: "Art's Automotive",
    industry: { en: "Auto Repair", zh: "汽車維修" },
    description: {
      en: "An automotive service website redesign focused on clearer communication, stronger trust signals, and a more modern customer experience.",
      zh: "汽車維修服務網站改版，專注於更清晰的溝通、更強的信任信號和更現代的客戶體驗。",
    },
    beforeSummary: {
      en: "Text-heavy layout, dated design, and a site structure that made services harder to understand quickly.",
      zh: "文字密集的版面、過時的設計、難以快速理解服務內容的網站結構。",
    },
    previewA: "arts-automotive-a.netlify.app",
    previewB: "arts-automotive-b.netlify.app",
    selectedVersion: "B",
    selectedLabel: { en: "Version B — Conversion-Focused", zh: "Version B — 轉換導向" },
    testimonial: {
      en: "Our previous site looked old and did not communicate our services clearly. SwiftLift helped us compare two different website directions before making a decision. The updated version feels much more professional, easier to navigate, and better structured for customers who need information fast. It is a major improvement over what we had before.",
      zh: "我們之前的網站看起來很舊，無法清楚傳達我們的服務。SwiftLift 幫助我們在做決定前比較了兩個不同的網站方向。更新後的版本感覺更加專業、更容易瀏覽，對於需要快速獲取資訊的客戶來說結構更好。這是一個重大的改進。",
    },
    testimonialAuthor: "David L., Manager",
    imageBefore: portfolioArtsBefore,
    imageA: portfolioArtsAV2,
    imageB: portfolioArtsBV2,
  },
];

/* ── Featured Case Card — 3-state carousel: Before / A / B ── */
type FeaturedState = "before" | "A" | "B";
const FEATURED_STATES: FeaturedState[] = ["before", "A", "B"];
const FEATURED_TIMINGS: Record<FeaturedState, number> = { before: 2000, A: 5000, B: 5000 };
const FEATURED_LABELS: Record<FeaturedState, TBlock> = {
  before: { en: "Before", zh: "改版前" },
  A: { en: "Version A", zh: "Version A" },
  B: { en: "Version B", zh: "Version B" },
};
const FEATURED_SWIPE_THRESHOLD = 30;
const FEATURED_RESUME_DELAY = 5000;

const FeaturedCaseCard = ({ c }: { c: FeaturedCase }) => {
  const { lang } = useLanguage();
  const isMobile = useIsMobile();
  const [activeState, setActiveState] = useState<FeaturedState>("A");
  const [isHovered, setIsHovered] = useState(false);
  const [beforeModalOpen, setBeforeModalOpen] = useState(false);
  const pausedUntil = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const images: Record<FeaturedState, string> = {
    before: c.imageBefore,
    A: c.imageA,
    B: c.imageB,
  };

  useEffect(() => {
    if (isHovered) return;
    const advance = () => {
      if (Date.now() < pausedUntil.current) return;
      setActiveState((prev) => {
        const idx = FEATURED_STATES.indexOf(prev);
        return FEATURED_STATES[(idx + 1) % 3];
      });
    };
    const id = setInterval(advance, FEATURED_TIMINGS[activeState]);
    return () => clearInterval(id);
  }, [isHovered, activeState]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > FEATURED_SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      setActiveState((prev) => {
        const idx = FEATURED_STATES.indexOf(prev);
        return dx < 0 ? FEATURED_STATES[(idx + 1) % 3] : FEATURED_STATES[(idx + 2) % 3];
      });
      pausedUntil.current = Date.now() + FEATURED_RESUME_DELAY;
    }
    touchStart.current = null;
  }, []);

  const handleHoverState = (state: FeaturedState) => {
    if (!isMobile) { setIsHovered(true); setActiveState(state); }
  };
  const handleHoverEnd = () => { if (!isMobile) setIsHovered(false); };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm flex flex-col h-full">
      <div
        className="aspect-[3/4] overflow-hidden relative bg-muted"
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        {FEATURED_STATES.map((state) => (
          <img
            key={state}
            src={images[state]}
            alt={`${c.company} — ${T(FEATURED_LABELS[state], lang)}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: activeState === state ? 1 : 0,
              transform: activeState === state ? "scale(1)" : "scale(1.015)",
              transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        ))}
        <div
          className="absolute inset-0 bg-foreground/[0.12] pointer-events-none"
          style={{
            opacity: activeState === "before" ? 1 : 0,
            transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <span className="absolute left-1/2 -translate-x-1/2 top-[14%] z-10 rounded-full bg-[#0a1e4a]/35 backdrop-blur-lg px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/90 shadow-md ring-1 ring-white/10 transition-all duration-300">
          {T(FEATURED_LABELS[activeState], lang)}
        </span>
      </div>

      <div className="bg-[hsl(var(--surface-sunken))] px-5 py-4 border-b border-border">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))]">
          {T(c.industry, lang)}
        </span>
        <h3 className="text-base font-bold text-foreground mt-1">{c.company}</h3>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{T(c.description, lang)}</p>
      </div>

      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">{T(ptx.before, lang)}</p>
          <p className="text-xs text-muted-foreground italic">{T(c.beforeSummary, lang)}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-muted-foreground border border-border bg-muted/50 transition-all hover:bg-muted cursor-pointer"
            onMouseEnter={() => handleHoverState("before")}
            onMouseLeave={handleHoverEnd}
            onClick={() => setBeforeModalOpen(true)}
          >
            <Eye className="w-2.5 h-2.5" /> {T(ptx.before, lang)}
          </button>
          <a
            href={`https://${c.previewA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#2DA8FF" }}
            onMouseEnter={() => handleHoverState("A")}
            onMouseLeave={handleHoverEnd}
          >
            Preview A <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href={`https://${c.previewB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#2DA8FF" }}
            onMouseEnter={() => handleHoverState("B")}
            onMouseLeave={handleHoverEnd}
          >
            Preview B <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        <div className="rounded-lg border border-[hsl(var(--accent-purple))]/20 bg-[hsl(var(--accent-purple))]/[0.03] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))] mb-1">
            {T(ptx.finalVersion, lang)}
          </p>
          <p className="text-xs font-bold text-foreground flex items-center gap-1">
            <Star className="w-3 h-3 fill-current text-[hsl(var(--accent-purple))]" />
            {T(c.selectedLabel, lang)}
          </p>
        </div>

        <div className="flex gap-2 pt-1 mt-auto">
          <Quote className="w-4 h-4 text-[hsl(var(--accent-purple))] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-foreground leading-relaxed italic">"{T(c.testimonial, lang)}"</p>
            <p className="mt-1.5 text-[11px] font-semibold text-muted-foreground inline-flex items-center gap-1.5">
              {c.testimonialAuthor}
              <span className="inline-flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>

      <Dialog open={beforeModalOpen} onOpenChange={setBeforeModalOpen}>
        <DialogContent className="max-w-4xl w-[90vw] p-0 border-none bg-transparent shadow-none [&>button]:hidden">
          <DialogTitle className="sr-only">{c.company} — {T(ptx.before, lang)}</DialogTitle>
          <div className="relative">
            <button
              type="button"
              onClick={() => setBeforeModalOpen(false)}
              className="absolute -top-3 -right-3 z-50 w-8 h-8 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
            <img
              src={c.imageBefore}
              alt={`${c.company} — ${T(ptx.before, lang)}`}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/* ── Grid Case Data ── */

interface GridCase {
  company: string;
  industry: TBlock;
  description: TBlock;
  previewA: string;
  previewB: string;
  imageA?: string;
  imageB?: string;
}

const gridCasesBase: GridCase[] = [
  { company: "Chicago Boxing Club", industry: { en: "Boxing Gym", zh: "拳擊健身房" }, description: { en: "High-energy fitness site designed to improve trial sign-ups and class discovery.", zh: "高能量健身網站，旨在提高試用報名和課程發現率。" }, previewA: "https://chicagoboxingclub-preveiw-01.lovable.app/", previewB: "https://chicagoboxingclub-preveiw-02.lovable.app/", imageA: portfolioChicagoA, imageB: portfolioChicagoB },
  { company: "One Park Home", industry: { en: "Real Estate", zh: "房地產" }, description: { en: "Luxury real estate presentation with a more polished property-first experience.", zh: "豪華房地產展示，提供更精緻的物業優先體驗。" }, previewA: "https://one-park-home-preview-01.lovable.app/", previewB: "https://one-park-home-concept-preview.lovable.app/", imageA: portfolioOneParkA, imageB: portfolioOneParkB },
  { company: "Friendly Dental Centre", industry: { en: "Dental Clinic", zh: "牙科診所" }, description: { en: "Modern dental website focused on trust, clarity, and stronger appointment conversion.", zh: "現代牙科網站，專注於信任、清晰度和更強的預約轉換。" }, previewA: "https://friendly-dental-centre-preview.lovable.app/", previewB: "https://friendly-dental-preview-02.lovable.app/", imageA: portfolioDentalA, imageB: portfolioDentalB },
  { company: "Studio 21 Salon Spa", industry: { en: "Salon & Spa", zh: "美容沙龍" }, description: { en: "Beauty-focused redesign with cleaner service presentation and more premium visual balance.", zh: "以美容為核心的改版，服務展示更清晰，視覺平衡更具高級感。" }, previewA: "https://studio-21-salon-spa-a.netlify.app/", previewB: "https://studio-21-salon-spa-b.netlify.app/", imageA: portfolioStudio21A, imageB: portfolioStudio21B },
  { company: "Presotea", industry: { en: "Beverage Brand", zh: "飲品品牌" }, description: { en: "Franchise-style beverage website with stronger menu visibility and cleaner brand execution.", zh: "連鎖風格飲品網站，菜單可見度更高，品牌呈現更乾淨。" }, previewA: "https://presotea.bluluma.com/", previewB: "https://presotea-b.netlify.app/", imageA: portfolioPresoteaA, imageB: portfolioPresoteaB },
  { company: "Styles Hair Salon", industry: { en: "Hair Salon", zh: "髮廊" }, description: { en: "Service-based salon redesign built for cleaner browsing and better appointment intent.", zh: "以服務為核心的髮廊改版，瀏覽更清晰、預約意圖更強。" }, previewA: "https://styles-hair-salon-a.netlify.app/", previewB: "https://styles-hair-salon-b.netlify.app/", imageA: portfolioStylesHairA, imageB: portfolioStylesHairB },
  { company: "Yang Health Therapeutic", industry: { en: "Wellness", zh: "健康養生" }, description: { en: "Calm, trust-focused wellness design with improved service clarity and stronger credibility.", zh: "平靜、注重信任的健康養生設計，服務更清晰、可信度更強。" }, previewA: "https://yang-health-therapeutic.bluluma.com/", previewB: "https://yang-health-therapeutic-b.netlify.app/", imageA: portfolioYangHealthA, imageB: portfolioYangHealthB },
  { company: "Unity Tattoo", industry: { en: "Tattoo Studio", zh: "刺青工作室" }, description: { en: "Visual-first redesign with stronger portfolio presentation and better inquiry flow.", zh: "視覺優先的改版，作品展示更強、詢問流程更順暢。" }, previewA: "https://unity-tattoo.bluluma.com/", previewB: "https://unity-tattoo-b.netlify.app/", imageA: portfolioUnityTattooA, imageB: portfolioUnityTattooB },
  { company: "Nuera Nutra", industry: { en: "Nutrition", zh: "營養保健" }, description: { en: "Supplement brand concept with cleaner product structure and more modern trust signals.", zh: "保健品牌概念，產品結構更清晰，信任信號更現代化。" }, previewA: "https://nueranutra.bluluma.com/", previewB: "https://nueranutra-preveiw-02.netlify.app/", imageA: portfolioNueraA, imageB: portfolioNueraB },
  { company: "Phoenix Remodel", industry: { en: "Home Remodeling", zh: "室內改造" }, description: { en: "Contractor website redesign with clearer service hierarchy and stronger lead intent.", zh: "承包商網站改版，服務層次更清晰、獲取客戶意圖更強。" }, previewA: "https://phoenix-remodel-a.netlify.app/", previewB: "https://phoenix-remodel-b.netlify.app/", imageA: portfolioPhoenixA, imageB: portfolioPhoenixB },
  { company: "Westside Medical Associates", industry: { en: "Medical", zh: "醫療" }, description: { en: "Professional healthcare presentation with better structure and more trustworthy messaging.", zh: "專業醫療展示，結構更好、訊息更值得信賴。" }, previewA: "https://westside-medical-associates-a.netlify.app/", previewB: "https://westside-medical-associates-b.netlify.app/", imageA: portfolioWestsideA, imageB: portfolioWestsideB },
  { company: "HSIN HSIN", industry: { en: "Trade Show & Branding", zh: "展覽與品牌" }, description: { en: "Brand-forward business website with stronger positioning and cleaner corporate presentation.", zh: "品牌優先的企業網站，定位更強、企業展示更乾淨。" }, previewA: "https://hsinhsin.ca/", previewB: "https://hsin-hsin-b.netlify.app/", imageA: portfolioHsinA, imageB: portfolioHsinB },
  { company: "HH Nexus Capital", industry: { en: "Capital / Finance", zh: "資本 / 金融" }, description: { en: "Corporate finance website with improved professionalism, hierarchy, and investor-facing clarity.", zh: "企業金融網站，專業度、層次感和面向投資者的清晰度均有提升。" }, previewA: "https://hh-nexus-capital-a.netlify.app/", previewB: "https://hh-nexus-capital-b.netlify.app/", imageA: portfolioHHNexusA, imageB: portfolioHHNexusB },
];

/* Shuffle helper */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Grid Case Card — desktop: hover swap | mobile: swipe + auto slideshow ── */
const SLIDESHOW_INTERVAL = 5000;
const SWIPE_THRESHOLD = 30;
const RESUME_DELAY = 5000;

const GridCaseCard = ({ c }: { c: GridCase }) => {
  const { lang } = useLanguage();
  const isMobile = useIsMobile();
  const [showVersion, setShowVersion] = useState<"A" | "B">("A");
  const imgA = c.imageA || swiftliftReviewSlide;
  const imgB = c.imageB || swiftliftFeature;
  const hasRealImages = !!(c.imageA && c.imageB);

  const pausedUntil = useRef(0);
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setShowVersion((v) => (v === "A" ? "B" : "A"));
    }, SLIDESHOW_INTERVAL);
    return () => clearInterval(id);
  }, [isMobile]);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      setShowVersion((v) => (v === "A" ? "B" : "A"));
      pausedUntil.current = Date.now() + RESUME_DELAY;
    }
    touchStart.current = null;
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-[hsl(var(--accent-purple))]/30 group flex flex-col">
      <div
        className={`${hasRealImages ? "aspect-[3/4]" : "aspect-[16/10]"} overflow-hidden relative bg-muted`}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        <img
          src={imgA}
          alt={`${c.company} — Version A`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{
            opacity: showVersion === "A" ? 1 : 0,
            transform: showVersion === "A" ? "scale(1)" : "scale(1.015)",
            transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <img
          src={imgB}
          alt={`${c.company} — Version B`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{
            opacity: showVersion === "B" ? 1 : 0,
            transform: showVersion === "B" ? "scale(1)" : "scale(1.015)",
            transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <span className="absolute left-1/2 -translate-x-1/2 top-[14%] z-10 rounded-full bg-[#0a1e4a]/35 backdrop-blur-lg px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/90 shadow-md ring-1 ring-white/10 transition-all duration-300">
          {showVersion === "B" ? T(ptx.versionB, lang) : T(ptx.versionA, lang)}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--accent-purple))]">
          {T(c.industry, lang)}
        </span>
        <h3 className="text-sm font-bold text-foreground mt-1 mb-1">{c.company}</h3>
        <p className="text-xs text-muted-foreground mb-3">{T(c.description, lang)}</p>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <a
            href={c.previewA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#2DA8FF" }}
            onMouseEnter={!isMobile ? () => setShowVersion("A") : undefined}
          >
            {T(ptx.openA, lang)} <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href={c.previewB}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#2DA8FF" }}
            onMouseEnter={!isMobile ? () => setShowVersion("B") : undefined}
          >
            {T(ptx.openB, lang)} <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Page ── */
const PortfolioContent = () => {
  const { lang } = useLanguage();
  const [gridCases] = useState(() => shuffleArray(gridCasesBase));

  useEffect(() => {
    document.title = lang === "zh"
      ? "作品集 — SwiftLift | 真實網站改版成果"
      : "Portfolio — SwiftLift | Real Website Transformations";
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

      {/* SECTION 2 — FEATURED CASE STUDIES */}
      <section className="pb-14 sm:pb-18 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">
            {T(ptx.featuredH2, lang)}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            {T(ptx.featuredSub, lang)}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featuredCases.map((c) => (
              <FeaturedCaseCard key={c.company} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PORTFOLIO GRID */}
      <section className="pb-14 sm:pb-18 px-4 bg-[hsl(var(--surface-sunken))]">
        <div className="max-w-6xl mx-auto pt-12 sm:pt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">
            {T(ptx.moreH2, lang)}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            {T(ptx.moreSub, lang)}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridCases.map((c) => (
              <GridCaseCard key={c.company} c={c} />
            ))}
          </div>
        </div>
      </section>

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

const Portfolio = () => (
  <LanguageProvider>
    <PortfolioContent />
  </LanguageProvider>
);

export default Portfolio;
