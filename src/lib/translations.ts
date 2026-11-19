export type Language = "en" | "zh";

export const translations = {
  nav: {
    process: { en: "Process", zh: "流程" },
    portfolio: { en: "Portfolio", zh: "作品集" },
    pricing: { en: "Pricing", zh: "價格" },
    contact: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" },
  },
  footer: {
    tagline: { en: "SwiftLift delivers instant website previews — no calls, no meetings, no risk.", zh: "SwiftLift 提供即時網站預覽——無電話、無會議、無風險。" },
    privacy: { en: "Privacy", zh: "隱私政策" },
    terms: { en: "Terms", zh: "服務條款" },
    copyright: { en: "SwiftLift Copyright © 2026 All Rights Reserved.", zh: "SwiftLift 版權所有 © 2026。" },
    designBy: { en: "Web Design by", zh: "網站設計" },
    guarantee: { en: "100% Satisfaction Guarantee", zh: "100% 滿意保證" },
    guaranteeSub: { en: "Preview first. Pay only if you love it.", zh: "先預覽。滿意才付款。" },
    navigation: { en: "Navigation", zh: "導航" },
    resources: { en: "Resources", zh: "資源" },
    legal: { en: "Legal", zh: "法律" },
    home: { en: "Home", zh: "首頁" },
    faqLink: { en: "FAQ", zh: "常見問題" },
    addFeatures: { en: "Add Features", zh: "追加功能" },
    hostingGuide: { en: "Hosting Guide", zh: "託管指南" },
    support: { en: "Support", zh: "聯繫客服" },
  },
  payment: {
    heroHeadline: { en: "Secure Your Website Build", zh: "鎖定您的網站建設" },
    heroSub: { en: "You've seen the preview.\nNow reserve your build and we'll take it live.", zh: "您已看過預覽。\n現在預約建設，我們將正式上線。" },
    heroCta: { en: "Reserve My Build", zh: "預約建設" },
    choosePackage: { en: "Choose Your Package", zh: "選擇您的套餐" },
    afterPayHeadline: { en: "What Happens After You Pay?", zh: "付款後會怎樣？" },
    faqHeadline: { en: "Frequently Asked Questions", zh: "常見問題" },
    finalCtaHeadline: { en: "Ready to Activate Your Website?", zh: "準備好啟動您的網站了嗎？" },
    cards: [
      {
        title: { en: "Starter", zh: "入門版" },
        sub: { en: "1–2 Pages", zh: "1–2 頁" },
        features: {
          en: ["Two Professional Preview Concepts", "Mobile Responsive Build", "Fast Performance Loading", "Minor Copy Refinement", "Delivery Within Days", "1 Revision Round"],
          zh: ["兩套專業預覽方案", "移動端響應式構建", "快速載入性能", "輕微文案優化", "數天內交付", "1輪修改"],
        },
        button: { en: "Reserve My Build", zh: "預約建設" },
      },
      {
        title: { en: "Growth", zh: "成長版" },
        sub: { en: "3–7 Pages", zh: "3–7 頁" },
        badge: { en: "Most Popular", zh: "最受歡迎" },
        features: {
          en: ["Everything in Starter", "Expanded Page Structure", "Enhanced Layout Customization", "Improved Conversion Structure", "2 Revision Rounds", "Priority Delivery"],
          zh: ["包含入門版所有功能", "擴展頁面結構", "增強版面客製", "優化轉化結構", "2輪修改", "優先交付"],
        },
        button: { en: "Reserve My Build", zh: "預約建設" },
      },
      {
        title: { en: "Custom", zh: "客製版" },
        sub: { en: "Up to 20 Pages", zh: "最多20頁" },
        features: {
          en: ["Fully Tailored Site Structure", "Advanced Design Strategy", "Deep Copy Optimization", "Scalable Architecture", "Strategic Layout Planning", "Dedicated Build Timeline"],
          zh: ["完全客製的站點結構", "高級設計策略", "深度文案優化", "可擴展架構", "戰略版面規劃", "專屬建設時間線"],
        },
        button: { en: "Request Custom Proposal", zh: "申請客製方案" },
      },
    ],
    steps: [
      { title: { en: "Finalize", zh: "確認" }, desc: { en: "We finalize structure and content details.", zh: "我們確認結構和內容細節。" } },
      { title: { en: "Prepare", zh: "準備" }, desc: { en: "We prepare deployment and optimization.", zh: "我們準備部署和優化。" } },
      { title: { en: "Launch", zh: "上線" }, desc: { en: "Your website goes live within days.", zh: "您的網站在數天內正式上線。" } },
    ],
    faqs: [
      { q: { en: "When does my site go live?", zh: "我的網站什麼時候上線？" }, a: { en: "Most builds go live within 3 days after payment and final content confirmation.", zh: "大多數網站在付款和最終內容確認後3天內上線。" } },
      { q: { en: "Can I request changes?", zh: "可以請求修改嗎？" }, a: { en: "Yes. Revision rounds are included depending on your package.", zh: "可以。修改輪次根據您的套餐而定。" } },
      { q: { en: "Can I use my own domain?", zh: "可以使用自己的網域嗎？" }, a: { en: "Yes. We connect your domain during deployment.", zh: "可以。我們會在部署期間連接您的網域。" } },
      { q: { en: "Do I own the website?", zh: "我擁有網站的所有權嗎？" }, a: { en: "Yes. You own your domain and website assets.", zh: "是的。您擁有網域和網站資產的所有權。" } },
      { q: { en: "What if I need additional features later?", zh: "以後需要額外功能怎麼辦？" }, a: { en: "We can expand and upgrade your site anytime.", zh: "我們可以隨時擴展和升級您的網站。" } },
    ],
  },
  addons: {
    heroHeadline: { en: "Enhance Your\nWebsite Investment", zh: "增強您的\n網站投資價值" },
    heroSub: { en: "Optional upgrades to strengthen your brand, visibility, and performance.", zh: "可選升級以增強您的品牌、知名度和表現。" },
    heroCta: { en: "Contact Support", zh: "聯繫支持" },
    heroCtaSecondary: { en: "Return to Dashboard", zh: "返回首頁" },
    exclusiveRate: { en: "Website Client Exclusive Rate", zh: "網站客戶專享價" },
    trustHeadline: { en: "Need Help Deciding?", zh: "需要幫助選擇？" },
    trustSub: { en: "Our team can guide you based on your business goals.", zh: "我們的團隊可以根據您的業務目標為您提供指導。" },
    trustCta: { en: "Schedule Consultation", zh: "預約諮詢" },
    cards: [
      {
        title: { en: "Brand Identity Package", zh: "品牌形象套餐" },
        desc: { en: "Strengthen your visual identity with a professional brand system aligned with your new website.", zh: "透過與新網站相配的專業品牌體系來增強您的視覺形象。" },
        price: "$499 USD",
        standalone: null,
        features: {
          en: ["Logo refinement system", "Color palette definition", "Typography hierarchy", "Brand usage guide (PDF)"],
          zh: ["標誌優化系統", "色彩調色板定義", "排版層次結構", "品牌使用指南（PDF）"],
        },
      },
      {
        title: { en: "Advanced SEO Setup", zh: "高級SEO設置" },
        desc: { en: "Improve visibility and search readiness beyond the basic foundation.", zh: "超越基礎提升搜索可見度和搜索準備度。" },
        price: "$299 USD",
        standalone: null,
        features: {
          en: ["On-page SEO structure", "Meta titles & descriptions", "Schema setup", "Basic keyword mapping", "Sitemap optimization"],
          zh: ["頁面SEO結構", "Meta標題和描述", "Schema設置", "基礎關鍵詞映射", "站點地圖優化"],
        },
      },
      {
        title: { en: "Hosting & Management", zh: "託管與管理" },
        desc: { en: "We handle everything. You focus on your business.", zh: "我們處理一切。您專注於業務。" },
        price: "$135/yr",
        standalone: null,
        features: {
          en: ["Managed hosting environment", "SSL configuration", "Domain setup assistance", "3 minor content edits per year", "Basic monitoring support"],
          zh: ["託管式主機環境", "SSL配置", "網域設置協助", "每年3次小更新", "基礎監控支持"],
        },
      },
      {
        title: { en: "Performance Optimization", zh: "性能優化" },
        desc: { en: "Enhance speed and user experience for stronger engagement.", zh: "提升速度和使用者體驗以增強互動性。" },
        price: "$199 USD",
        standalone: null,
        features: {
          en: ["Image optimization", "Code minification", "Load performance tuning", "Core Web Vitals improvements"],
          zh: ["圖片優化", "代碼壓縮", "載入性能調優", "核心網頁指標改進"],
        },
      },
    ],
  },
  deployment: {
    heroHeadline: { en: "Launch Your Website", zh: "發佈您的網站" },
    heroSub: { en: "Choose how you'd like your website deployed. We guide you every step of the way.", zh: "選擇您的網站部署方式。我們將全程指導您。" },
    heroCta1: { en: "Set Up Free Hosting (Recommended)", zh: "設置免費託管（推薦）" },
    heroCta2: { en: "Let SwiftLift Manage Everything", zh: "讓SwiftLift全權管理" },
    hostingOptions: [
      {
        title: { en: "Free Hosting (You Own It)", zh: "免費託管（您擁有所有權）" },
        price: "$0 USD",
        altPrice: null,
        paragraph: { en: "You fully own your hosting account. No monthly fees. No lock-in.", zh: "您完全擁有託管帳戶所有權。無月費。無鎖定。" },
        button: { en: "Start Free Setup", zh: "開始免費設置" },
        features: {
          en: ["Guided Netlify account creation", "You provide login access", "Website deployment handled by us", "Domain connected for you", "SSL configured", "Basic performance optimization"],
          zh: ["引導式Netlify帳戶創建", "您提供登入權限", "網站部署由我們處理", "為您連接網域", "SSL配置", "基礎性能優化"],
        },
      },
      {
        title: { en: "Care Plan", zh: "Care Plan" },
        price: "$135/yr",
        altPrice: null,
        paragraph: { en: "We handle everything. You focus on your business.", zh: "我們處理一切。您專注於業務。" },
        button: { en: "Choose Care Plan", zh: "選擇 Care Plan" },
        features: {
          en: ["Managed hosting environment", "SSL & deployment handled", "Domain setup assistance", "3 minor content edits per year", "Basic monitoring"],
          zh: ["託管式主機環境", "SSL和部署處理", "網域設置協助", "每年3次小更新", "基礎監控"],
        },
      },
    ],
    upgradesHeadline: { en: "Optional Upgrades", zh: "可選升級" },
    exclusiveRate: { en: "Website Client Exclusive Rate", zh: "網站客戶專享價" },
    upgrades: [
      {
        title: { en: "Brand Identity Package", zh: "品牌形象套餐" },
        price: "$499 USD",
        features: {
          en: ["Logo refinement system", "Color palette definition", "Typography hierarchy", "Brand usage guide (PDF)"],
          zh: ["標誌優化系統", "色彩調色板定義", "排版層次結構", "品牌使用指南（PDF）"],
        },
      },
      {
        title: { en: "Advanced SEO Setup", zh: "高級SEO設置" },
        price: "$299 USD",
        features: {
          en: ["On-page SEO structure", "Meta titles & descriptions", "Schema setup", "Basic keyword mapping", "Sitemap optimization"],
          zh: ["頁面SEO結構", "Meta標題和描述", "Schema設置", "基礎關鍵詞映射", "站點地圖優化"],
        },
      },
      {
        title: { en: "Performance Optimization", zh: "性能優化" },
        price: "$199 USD",
        features: {
          en: ["Image optimization", "Code minification", "Load performance tuning", "Core Web Vitals improvements"],
          zh: ["圖片優化", "代碼壓縮", "載入性能調優", "核心網頁指標改進"],
        },
      },
    ],
    faqHeadline: { en: "Deployment FAQ", zh: "部署常見問題" },
    faqs: [
      { q: { en: "Can I use my own hosting?", zh: "我可以使用自己的託管嗎？" }, a: { en: "Yes. We guide you through setting up a free Netlify account that you fully own and control.", zh: "可以。我們引導您創建完全由您擁有和控制的免費Netlify帳戶。" } },
      { q: { en: "What if my previous designer controls my domain?", zh: "如果之前的設計師控制著我的網域怎麼辦？" }, a: { en: "We can help you reclaim access or set up a new domain. Either way, we'll make sure your website is properly connected.", zh: "我們可以幫助您重新獲得存取權限或設置新網域。無論哪種方式，我們都會確保您的網站正確連接。" } },
      { q: { en: "Do I own my website?", zh: "我擁有網站的所有權嗎？" }, a: { en: "Absolutely. You own your domain, content, and all website assets. No lock-in contracts.", zh: "當然。您擁有網域、內容和所有網站資產的所有權。無鎖定合約。" } },
      { q: { en: "Can I upgrade later?", zh: "以後可以升級嗎？" }, a: { en: "Yes. You can switch from free hosting to managed hosting or add any upgrade package at any time.", zh: "可以。您可以隨時從免費託管切換到託管主機，或添加任何升級套餐。" } },
    ],
    trustHeadline: { en: "Need Guidance?", zh: "需要指導？" },
    trustSub: { en: "Our team can help you choose the right deployment option for your business.", zh: "我們的團隊可以幫助您為業務選擇正確的部署方案。" },
    trustCta: { en: "Schedule Consultation", zh: "預約諮詢" },
  },
  customBrief: {
    heroHeadline: { en: "Let's Build Something\nTailored to Your Business", zh: "讓我們為您的業務\n量身打造" },
    heroSub: { en: "Tell us about your project and we'll prepare a custom proposal.", zh: "告訴我們您的項目需求，我們將為您準備客製方案。" },
    successTitle: { en: "Proposal Request Received", zh: "方案申請已收到" },
    successDesc: { en: "We'll review your details and get back to you within 48 hours.", zh: "我們將審核您的資訊，並在48小時內與您聯繫。" },
    businessDetails: { en: "Business Details", zh: "企業資訊" },
    companyName: { en: "Company Name", zh: "公司名稱" },
    companyNamePlaceholder: { en: "Your company name", zh: "您的公司名稱" },
    industry: { en: "Industry", zh: "行業" },
    industryPlaceholder: { en: "e.g. Real Estate, Legal", zh: "例如：房地產、法律" },
    currentWebsite: { en: "Current Website", zh: "當前網站" },
    optional: { en: "(optional)", zh: "（選填）" },
    targetAudience: { en: "Target Audience", zh: "目標受眾" },
    targetAudiencePlaceholder: { en: "Who are your customers?", zh: "您的客戶是誰？" },
    projectScope: { en: "Project Scope", zh: "項目範圍" },
    pageCount: { en: "Estimated Page Count", zh: "預估頁面數量" },
    pageCountPlaceholder: { en: "e.g. 10", zh: "例如：10" },
    timeline: { en: "Preferred Timeline", zh: "期望時間線" },
    timelinePlaceholder: { en: "e.g. 2 weeks, 1 month", zh: "例如：2週、1個月" },
    requiredFeatures: { en: "Required Features", zh: "所需功能" },
    featureOptions: {
      en: ["Booking System", "E-commerce", "Membership Area", "Blog", "Multi-language", "Advanced Forms"],
      zh: ["預約系統", "電子商務", "會員區域", "部落格", "多語言", "高級表單"],
    },
    other: { en: "Other", zh: "其他" },
    otherPlaceholder: { en: "Describe any other features...", zh: "描述其他需要的功能..." },
    budgetRange: { en: "Budget Range", zh: "預算範圍" },
    budgetOptions: {
      en: ["$1,500 – $3,000", "$3,000 – $5,000", "$5,000+"],
      zh: ["$1,500 – $3,000", "$3,000 – $5,000", "$5,000+"],
    },
    submitButton: { en: "Request My Custom Proposal", zh: "申請我的客製方案" },
    submitting: { en: "Sending...", zh: "發送中..." },
    toastTitle: { en: "Proposal request sent!", zh: "方案申請已發送！" },
    toastDesc: { en: "We'll be in touch within 48 hours.", zh: "我們將在48小時內與您聯繫。" },
  },
  /* ── Homepage (Index.tsx) inline content ── */
} as const;

export function t(obj: { en: string; zh: string }, lang: Language): string {
  return obj[lang];
}
