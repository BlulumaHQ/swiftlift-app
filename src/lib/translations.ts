export type Language = "en" | "zh";

export const translations = {
  nav: {
    process: { en: "Process", zh: "流程" },
    portfolio: { en: "Portfolio", zh: "作品集" },
    pricing: { en: "Pricing", zh: "價格" },
    contact: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" },
  },
  hero: {
    headline: {
      en: "No Calls.\nNo Waiting.\nJust Previews.",
      zh: "無需電話。\n無需等待。\n直接預覽。",
    },
    subheadline: {
      en: "Get 2 fully working websites before you pay anything.",
      zh: "在支付任何費用之前，獲得2個完全可運行的網站。",
    },
    cta: {
      en: "Get My 2 Free Previews",
      zh: "獲取我的2個免費預覽",
    },
    ctaSub: {
      en: "Takes less than 30 seconds.\nNo commitment.",
      zh: "不到30秒即可完成。\n無需承諾。",
    },
    launchPricing: {
      en: "Limited preview slots available today",
      zh: "今日預覽名額有限",
    },
  },
  problemSolution: {
    headline: {
      en: "Skip the\nAgency Process",
      zh: "跳過\n機構流程",
    },
    body: {
      en: "Other agencies want to talk first. We just build it for you.",
      zh: "其他公司要先開會。我們直接為您建好。",
    },
    outdatedTitle: { en: "Traditional Agencies", zh: "傳統機構" },
    outdatedItems: [
      { en: "Book a demo", zh: "預約演示" },
      { en: "Wait days or weeks", zh: "等待數天或數週" },
      { en: "Endless back-and-forth", zh: "無止境的來回溝通" },
      { en: "Unclear pricing", zh: "定價不透明" },
    ],
    rebuildTitle: { en: "SwiftLift", zh: "SwiftLift" },
    rebuildItems: [
      { en: "Instant live previews", zh: "即時預覽" },
      { en: "No calls or meetings", zh: "無需電話或會議" },
      { en: "Launch in 3 days", zh: "3天內上線" },
      { en: "Transparent pricing", zh: "透明定價" },
    ],
  },
  why: {
    headline: {
      en: "Try It Risk-Free",
      zh: "零風險體驗",
    },
    body: {
      en: "You only pay if you like what you see. We build first. You decide after.",
      zh: "滿意才付款。我們先建。您後決定。",
    },
    stats: [
      { label: { en: "Preview Delivered", zh: "預覽交付" }, value: { en: "48h", zh: "48h" } },
      { label: { en: "Live Previews", zh: "即時預覽" }, value: { en: "2 Sites", zh: "2 站點" } },
      { label: { en: "Launch Time", zh: "上線時間" }, value: { en: "3 Days", zh: "3 天" } },
      { label: { en: "Upfront Cost", zh: "前期費用" }, value: { en: "$0", zh: "$0" } },
    ],
  },
  process: {
    headline: { en: "How It Works", zh: "服務流程" },
    steps: [
      {
        title: { en: "Enter Your Website", zh: "輸入您的網站" },
        desc: { en: "Share your current site URL. Takes 30 seconds.", zh: "分享您的網站URL。僅需30秒。" },
      },
      {
        title: { en: "We Build 2 Previews", zh: "我們建2個預覽" },
        desc: { en: "Receive two live website directions within 48 hours.", zh: "48小時內收到兩個即時網站方向。" },
      },
      {
        title: { en: "You Choose & Launch", zh: "您選擇並上線" },
        desc: { en: "Pick your favorite. We handle everything — hosting, setup, and launch.", zh: "選定方案。我們處理一切 — 託管、設置和上線。" },
      },
    ],
  },
  portfolio: {
    headline: { en: "Real Website Transformations", zh: "真實網站改造" },
    items: [
      { title: { en: "Import/Export Trading Company", zh: "進出口貿易公司" }, desc: { en: "Products, about, contact", zh: "產品、關於、聯繫" } },
      { title: { en: "Modern Wellness Clinic", zh: "現代健康診所" }, desc: { en: "Services, booking, team", zh: "服務、預約、團隊" } },
      { title: { en: "Small Law Firm", zh: "小型律師事務所" }, desc: { en: "Practice areas, attorney profile, contact", zh: "業務領域、律師簡介、聯繫" } },
      { title: { en: "Construction Contractor", zh: "建築裝修承包商" }, desc: { en: "Past projects, services, contact", zh: "過往項目、服務、聯繫" } },
      { title: { en: "Wholesale Distributor", zh: "批發分銷商" }, desc: { en: "Product categories, about, contact", zh: "產品類別、關於、聯繫" } },
      { title: { en: "Logistics Company", zh: "物流公司" }, desc: { en: "Services, routes, contact", zh: "服務、路線、聯繫" } },
      { title: { en: "Restaurant & Bar", zh: "餐廳酒吧" }, desc: { en: "Menu, reservations, gallery", zh: "菜單、預訂、畫廊" } },
      { title: { en: "Real Estate Agency", zh: "房地產中介" }, desc: { en: "Listings, agents, contact", zh: "房源、經紀人、聯繫" } },
      { title: { en: "Dental Clinic", zh: "牙科診所" }, desc: { en: "Services, team, booking", zh: "服務、團隊、預約" } },
    ],
  },
  pricing: {
    headline: { en: "Simple,\nTransparent Pricing", zh: "簡單\n透明的價格" },
    buttonText: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" },
    buttonSub: { en: "No credit card required. No obligation.", zh: "無需信用卡。無任何義務。" },
    cards: [
      {
        title: { en: "Starter", zh: "入門版" },
        subtitle: { en: "1–2 Pages", zh: "1–2 頁" },
        price: "$299",
        originalPrice: null,
        features: {
          en: ["1–2 Pages", "Clean Modern Design", "Mobile Responsive", "Contact Form Setup", "Brand Color Integration", "Fast Performance Loading"],
          zh: ["1–2 頁", "簡潔現代設計", "移動端自適應", "聯繫表單配置", "品牌配色融合", "高性能載入"],
        },
      },
      {
        title: { en: "Growth", zh: "成長版" },
        subtitle: { en: "3–7 Pages", zh: "3–7 頁" },
        price: "$499",
        originalPrice: null,
        badge: { en: "Most Popular", zh: "最受歡迎" },
        subtext: null,
        features: {
          en: ["3–7 Pages", "Modern Design", "Mobile Responsive", "Contact Form + Map + Social", "Brand Color Integration", "Fast Performance Loading"],
          zh: ["3–7 頁", "現代設計", "移動端自適應", "聯繫表單 + 地圖 + 社交", "品牌配色融合", "高性能載入"],
        },
      },
      {
        title: { en: "Custom", zh: "定制版" },
        subtitle: { en: "Custom Solutions", zh: "定制方案" },
        price: "$4,999+",
        originalPrice: null,
        bottomNote: { en: "Complex needs? Request a custom quote.", zh: "複雜需求？申請定制報價。" },
        features: {
          en: ["Custom Page Count", "Custom Design", "Mobile Responsive", "Advanced Integrations", "Deep Brand Strategy", "Fast Performance Loading"],
          zh: ["自訂頁面數", "定制設計", "移動端自適應", "高級集成功能", "深度品牌策略", "高性能載入"],
        },
      },
    ],
    rowLabels: {
      en: ["Pages included", "Design Quality", "Mobile Responsive", "Integrations", "Brand Strategy", "Performance", "Preview Sites"],
      zh: ["頁面數量", "設計品質", "移動端自適應", "集成功能", "品牌策略", "性能", "預覽網站"],
    },
  },
  testimonials: {
    headline: { en: "What Clients Say", zh: "客戶評價" },
    items: [
      {
        quote: {
          en: "No demo calls. No back-and-forth. Just two working previews in my inbox within 48 hours. Paid on the spot.",
          zh: "沒有演示電話。沒有來回溝通。48小時內就收到兩個可用的預覽。當場付款。",
        },
        name: { en: "Sarah Chen", zh: "Sarah Chen" },
        role: { en: "Small Business Owner", zh: "小企業主" },
      },
      {
        quote: {
          en: "Two working websites in 48 hours. I picked one, paid, and was live within days. Fastest website project I've ever done.",
          zh: "48小時內收到兩個完整網站。選了一個，付款，數天內就上線了。最快的網站項目。",
        },
        name: { en: "Marcus Webb", zh: "Marcus Webb" },
        role: { en: "Wellness Clinic Owner", zh: "健康診所老闆" },
      },
      {
        quote: {
          en: "I was tired of agencies wanting to 'hop on a call' first. SwiftLift just built it. The previews sold themselves.",
          zh: "我厭倦了代理機構總想先「打個電話」。SwiftLift 直接做了。預覽本身就說明了一切。",
        },
        name: { en: "David Park", zh: "David Park" },
        role: { en: "Local Service Provider", zh: "本地服務商" },
      },
      {
        quote: {
          en: "Simpler than any freelancer. Faster than any agency. And I got to see the result before paying a cent.",
          zh: "比任何自由職業者更簡單。比任何機構更快。而且在付一分錢之前就看到了結果。",
        },
        name: { en: "Thomas Lin", zh: "Thomas Lin" },
        role: { en: "Business Owner", zh: "企業主" },
      },
      {
        quote: {
          en: "From submitting my URL to choosing my favorite version — the whole thing took less than a week. No meetings. No stress.",
          zh: "從提交網址到選擇喜歡的版本——整個過程不到一週。沒有會議。沒有壓力。",
        },
        name: { en: "Jessica Moore", zh: "Jessica Moore" },
        role: { en: "Restaurant Owner", zh: "餐廳老闆" },
      },
      {
        quote: {
          en: "I've worked with agencies before. Weeks of calls, revisions, confusion. SwiftLift? Two live previews, pick one, done.",
          zh: "我之前和代理合作過。幾週的電話、修改、混亂。SwiftLift？兩個即時預覽，選一個，搞定。",
        },
        name: { en: "Kevin Zhang", zh: "Kevin Zhang" },
        role: { en: "E-commerce Founder", zh: "電商創始人" },
      },
    ],
  },
  faq: {
    headline: { en: "Frequently Asked\nQuestions", zh: "常見問題" },
    subheadline: {
      en: "Everything you need to know. Can't find the answer you're looking for? Contact us.",
      zh: "您需要知道的一切。找不到答案？聯繫我們。",
    },
    items: [
      {
        q: { en: "Is the preview really free?", zh: "預覽真的免費嗎？" },
        a: { en: "Yes. We create two fully working website previews at no cost. You only pay if you decide to move forward.\n\nThere's no credit card required and no obligation. If you don't like either preview, you walk away — no questions asked.", zh: "是的。我們免費創建兩個完全可運行的網站預覽。只有在您決定繼續時才需付款。\n\n無需信用卡，無任何義務。如果您不喜歡任何預覽，可以直接離開——不問原因。" },
      },
      {
        q: { en: "How long does it take?", zh: "需要多長時間？" },
        a: { en: "You'll receive your two website previews within 48 hours of submitting your request.\n\nOnce you choose a version, your final website goes live within 3 days.", zh: "提交請求後48小時內您將收到兩個網站預覽。\n\n選定版本後，最終網站3天內上線。" },
      },
      {
        q: { en: "What happens after I choose a version?", zh: "選擇方案後會發生什麼？" },
        a: { en: "You select your preferred direction, choose a package, and submit payment. We then finalize your website and launch it within 3 days.\n\nNo long process. No endless revisions. Just a clean, fast launch.", zh: "選定您心儀的方向，選擇套餐並提交付款。我們隨後完成您的網站並在3天內上線。\n\n沒有漫長的流程。沒有無止境的修改。只有乾淨、快速的上線。" },
      },
      {
        q: { en: "Can I use my own domain?", zh: "可以使用自己的網域嗎？" },
        a: { en: "Yes. You can use your existing domain or purchase a new one. You remain the owner at all times.\n\nWe provide simple instructions to connect your domain during deployment.", zh: "可以。您可以使用現有網域或購買新網域。網域始終歸您所有。\n\n我們會提供簡單的說明，幫助您在部署過程中連接網域。" },
      },
      {
        q: { en: "Do I need to have an existing website?", zh: "需要有現有網站嗎？" },
        a: { en: "SwiftLift is built for businesses with an existing website that needs upgrading. If you need a brand new site, explore our custom build options.", zh: "SwiftLift 針對需要升級現有網站的企業而建。如果您需要全新網站，請探索我們的定制建設選項。" },
      },
    ],
  },
  about: {
    text: {
      en: "SwiftLift delivers instant website previews — no calls, no meetings, no risk.",
      zh: "SwiftLift 提供即時網站預覽——無電話、無會議、無風險。",
    },
  },
  intake: {
    headline: { en: "Get Your 2 Free Website Previews", zh: "獲取您的2個免費網站預覽" },
    subheadline: { en: "No calls. No commitment. Just results.", zh: "無需電話。無需承諾。只看結果。" },
    fields: {
      description: { en: "Business Description", zh: "業務描述" },
      descriptionPlaceholder: { en: "Tell us about your business — what you do, your target audience, and any style preferences", zh: "請介紹您的業務——您做什麼、目標受眾以及任何風格偏好" },
      descriptionTooltip: { en: "Include your company name, what services you offer, who your customers are, and any design styles you love (or hate). The more details, the better we can match your vision.", zh: "包括您的公司名稱、提供的服務、客戶群體以及您喜歡（或不喜歡）的設計風格。細節越多，我們就越能匹配您的願景。" },
      color: { en: "Brand Color", zh: "品牌顏色" },
      colorPlaceholder: { en: "e.g., Blue, #1E90FF, or Royal Blue", zh: "例如：藍色、#1E90FF 或 皇家藍" },
      colorTooltip: { en: "Enter a color name, hex code (like #FF0000), or describe your brand colors", zh: "輸入顏色名稱、十六進制代碼（如 #FF0000）或描述您的品牌顏色" },
      url: { en: "Your Current Website", zh: "您的當前網站" },
      urlOptional: { en: "(Optional)", zh: "（選填）" },
      urlTooltip: { en: "Your current website or social media page.", zh: "您當前的網站或社交媒體頁面。" },
      logo: { en: "Your Logo", zh: "您的Logo" },
      logoOptional: { en: "(Optional)", zh: "（選填）" },
      logoTooltip: { en: "Transparent background PNG works best. Any logo file accepted — we'll optimize it for your previews.", zh: "透明背景PNG效果最好。任何Logo檔案均可——我們將為您的預覽進行優化。" },
      inspiration: { en: "Inspiration URL", zh: "靈感網站URL" },
      inspirationOptional: { en: "(Optional)", zh: "（選填）" },
      inspirationTooltip: { en: "Share a competitor's site or any design you love — we'll match the vibe.", zh: "分享競爭對手的網站或您喜歡的任何設計——我們會匹配風格。" },
      name: { en: "Your Name", zh: "您的姓名" },
      namePlaceholder: { en: "Full name", zh: "全名" },
      company: { en: "Your Company Name", zh: "公司名稱" },
      companyPlaceholder: { en: "Company name", zh: "公司名稱" },
      email: { en: "Email Address", zh: "電子郵箱" },
      timeline: { en: "When are you planning to upgrade your website?", zh: "您計劃什麼時候升級您的網站？" },
      timelineOptions: {
        en: ["Within 1 week", "Within 1 month", "Within 3 months", "Exploring options", "Not sure yet"],
        zh: ["1週內", "1個月內", "3個月內", "探索中", "還不確定"],
      },
    },
    submit: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" },
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
          zh: ["包含入門版所有功能", "擴展頁面結構", "增強版面定制", "優化轉化結構", "2輪修改", "優先交付"],
        },
        button: { en: "Reserve My Build", zh: "預約建設" },
      },
      {
        title: { en: "Custom", zh: "定制版" },
        sub: { en: "Up to 20 Pages", zh: "最多20頁" },
        features: {
          en: ["Fully Tailored Site Structure", "Advanced Design Strategy", "Deep Copy Optimization", "Scalable Architecture", "Strategic Layout Planning", "Dedicated Build Timeline"],
          zh: ["完全定制的站點結構", "高級設計策略", "深度文案優化", "可擴展架構", "戰略版面規劃", "專屬建設時間線"],
        },
        button: { en: "Request Custom Proposal", zh: "申請定制方案" },
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
        price: "$499",
        standalone: null,
        features: {
          en: ["Logo refinement system", "Color palette definition", "Typography hierarchy", "Brand usage guide (PDF)"],
          zh: ["標誌優化系統", "色彩調色板定義", "排版層次結構", "品牌使用指南（PDF）"],
        },
      },
      {
        title: { en: "Advanced SEO Setup", zh: "高級SEO設置" },
        desc: { en: "Improve visibility and search readiness beyond the basic foundation.", zh: "超越基礎提升搜索可見度和搜索準備度。" },
        price: "$299",
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
        price: "$199",
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
        price: "$0",
        altPrice: null,
        paragraph: { en: "You fully own your hosting account. No monthly fees. No lock-in.", zh: "您完全擁有託管帳戶所有權。無月費。無鎖定。" },
        button: { en: "Start Free Setup", zh: "開始免費設置" },
        features: {
          en: ["Guided Netlify account creation", "You provide login access", "Website deployment handled by us", "Domain connected for you", "SSL configured", "Basic performance optimization"],
          zh: ["引導式Netlify帳戶創建", "您提供登入權限", "網站部署由我們處理", "為您連接網域", "SSL配置", "基礎性能優化"],
        },
      },
      {
        title: { en: "Managed Hosting & Maintenance", zh: "託管主機與維護" },
        price: "$135/yr",
        altPrice: "or $15/mo",
        paragraph: { en: "We handle everything. You focus on your business.", zh: "我們處理一切。您專注於業務。" },
        button: { en: "Choose Managed Hosting", zh: "選擇託管主機" },
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
        price: "$499",
        features: {
          en: ["Logo refinement system", "Color palette definition", "Typography hierarchy", "Brand usage guide (PDF)"],
          zh: ["標誌優化系統", "色彩調色板定義", "排版層次結構", "品牌使用指南（PDF）"],
        },
      },
      {
        title: { en: "Advanced SEO Setup", zh: "高級SEO設置" },
        price: "$299",
        features: {
          en: ["On-page SEO structure", "Meta titles & descriptions", "Schema setup", "Basic keyword mapping", "Sitemap optimization"],
          zh: ["頁面SEO結構", "Meta標題和描述", "Schema設置", "基礎關鍵詞映射", "站點地圖優化"],
        },
      },
      {
        title: { en: "Performance Optimization", zh: "性能優化" },
        price: "$199",
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
    heroSub: { en: "Tell us about your project and we'll prepare a custom proposal.", zh: "告訴我們您的項目需求，我們將為您準備定制方案。" },
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
    submitButton: { en: "Request My Custom Proposal", zh: "申請我的定制方案" },
    submitting: { en: "Sending...", zh: "發送中..." },
    toastTitle: { en: "Proposal request sent!", zh: "方案申請已發送！" },
    toastDesc: { en: "We'll be in touch within 48 hours.", zh: "我們將在48小時內與您聯繫。" },
  },
  /* ── Homepage (Index.tsx) inline content ── */
  home: {
    heroTitle: {
      en: "No Calls. No Waiting.\nJust 2 Live Website Previews.",
      zh: "無需電話。無需等待。\n直接獲得2個即時網站預覽。",
    },
    heroSub: {
      en: "Get 2 fully working websites before you pay anything.",
      zh: "在支付任何費用之前，獲得2個完全可運行的網站。",
    },
    heroSubShort: {
      en: "If you like it → we launch in 3 days. If not → you pay nothing.",
      zh: "滿意 → 3天內上線。不滿意 → 您不用付費。",
    },
    heroBullets: [
      { en: "2 live website previews to compare", zh: "2個即時網站預覽可比較" },
      { en: "No upfront payment required", zh: "無需預付款" },
      { en: "Launch in 3 days if you love it", zh: "滿意的話3天內上線" },
    ],
    formNote: { en: "Takes less than 30 seconds. No commitment.", zh: "不到30秒即可完成。無需承諾。" },
    formBusinessName: { en: "Business Name", zh: "企業名稱" },
    formBusinessNamePlaceholder: { en: "Your business name", zh: "您的企業名稱" },
    formCurrentWebsite: { en: "Current Website", zh: "目前網站" },
    formEmail: { en: "Email", zh: "電子郵箱" },
    formWebsiteYouLike: { en: "Website You Like", zh: "您喜歡的網站" },
    formTimeline: { en: "When do you need your website?", zh: "您何時需要網站？" },
    formSelectOption: { en: "Select an option", zh: "請選擇" },
    formTimelineOptions: [
      { en: "As soon as possible", zh: "盡快" },
      { en: "Within 2 weeks", zh: "2週內" },
      { en: "Within a month", zh: "1個月內" },
      { en: "Just exploring", zh: "只是探索" },
    ],
    formSubmit: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" },
    formSending: { en: "Sending...", zh: "發送中..." },
    formDisclaimer: { en: "No credit card required. No obligation.\nNo spam. No sales calls.", zh: "無需信用卡。無任何義務。\n不會發送垃圾郵件。不會撥打銷售電話。" },
    formDisclaimerShort: { en: "No credit card required. No obligation.", zh: "無需信用卡。無任何義務。" },
    optional: { en: "(Optional)", zh: "（選填）" },
    /* Value Proposition */
    valuePropTitle: { en: "Why SwiftLift", zh: "為什麼選擇 SwiftLift" },
    valueProps: [
      { title: { en: "No Risk", zh: "零風險" }, desc: { en: "See your previews first. Pay only if you like it.", zh: "先看預覽。滿意才付款。" } },
      { title: { en: "Fast Turnaround", zh: "快速交付" }, desc: { en: "Get your new website in just 3 days.", zh: "僅需3天即可獲得新網站。" } },
      { title: { en: "Built for Results", zh: "注重成效" }, desc: { en: "Choose between a clean professional layout or a conversion-focused design.", zh: "選擇簡潔專業版面或轉化導向設計。" } },
    ],
    howItWorks: { en: "How It Works", zh: "如何運作" },
    howItWorksSub: { en: "No calls. No meetings. No back-and-forth.", zh: "無需電話。無需會議。無需來回溝通。" },
    steps: [
      { title: { en: "Enter Your Website", zh: "輸入您的網站" }, desc: { en: "Share your current URL. Takes 30 seconds.", zh: "分享您的網站URL。僅需30秒。" } },
      { title: { en: "Receive 2 Live Previews", zh: "收到2個即時預覽" }, desc: { en: "We build two fully working website directions within 48 hours.", zh: "48小時內我們建好兩個完全可運行的網站方向。" } },
      { title: { en: "Choose & Launch", zh: "選擇並上線" }, desc: { en: "Pick your favorite. We handle everything — hosting, setup, and launch.", zh: "選擇您喜歡的。我們處理一切 — 託管、設置和上線。" } },
    ],
    portfolioTitle: { en: "Real Website Transformations", zh: "真實網站改造" },
    portfolioSub: { en: "Built from real businesses like yours. Each preview is a real, working website — not a mockup.", zh: "為像您一樣的真實企業而建。每個預覽都是真正可運行的網站——不是模型。" },
    portfolioItems: [
      { name: { en: "Gene's Sausage Shop", zh: "Gene's Sausage Shop" }, desc: { en: "From dated specialty shop site to a cleaner, more premium food brand experience.", zh: "從過時的特色商店網站到更清晰、更高端的食品品牌體驗。" } },
      { name: { en: "Mutt Puddles Dog Wash", zh: "Mutt Puddles Dog Wash" }, desc: { en: "From a basic local service site to a warmer, more polished grooming brand.", zh: "從基礎的本地服務網站到更溫暖、更精緻的寵物美容品牌。" } },
      { name: { en: "Chicago Boxing Club", zh: "Chicago Boxing Club" }, desc: { en: "From an outdated gym website to a stronger, higher-impact fitness brand presence.", zh: "從過時的健身房網站到更強大、更高影響力的健身品牌形象。" } },
    ],
    testimonialItems: [
      { text: { en: "Our old website had character, but it felt crowded and outdated. SwiftLift gave us two very different directions to compare. Version A felt more classic and brand-focused, while Version B felt cleaner and easier for customers to browse. Seeing both options side by side made the decision much easier, and the new presentation feels far more aligned with the quality of our store.", zh: "我們的舊網站有特色，但感覺擁擠且過時。SwiftLift 給了我們兩個截然不同的方向進行比較。版本A感覺更經典、更注重品牌，而版本B感覺更簡潔、更方便客戶瀏覽。並排查看兩個選項讓決策變得容易得多，新的展示感覺與我們商店的品質更加一致。" }, name: { en: "Michael Nowak", zh: "Michael Nowak" }, company: { en: "Gene's Sausage Shop", zh: "Gene's Sausage Shop" } },
      { text: { en: "We wanted something that felt more modern and trustworthy without losing the friendly personality of our business. SwiftLift gave us two real preview versions instead of just talking about ideas. One was more clean and minimal, and the other felt a bit more conversion-focused. Both looked significantly better than what we had before, and it was helpful to see how the same business could be presented in two different ways.", zh: "我們想要更現代、更可信的東西，同時不失去業務的友好個性。SwiftLift 給了我們兩個真實的預覽版本，而不僅僅是討論想法。一個更簡潔、更簡約，另一個更注重轉化。兩者都比之前好得多，看到同一個業務可以以兩種不同方式呈現是很有幫助的。" }, name: { en: "Sarah Bennett", zh: "Sarah Bennett" }, company: { en: "Mutt Puddles Dog Wash", zh: "Mutt Puddles Dog Wash" } },
      { text: { en: "Our previous site looked old and didn't represent the energy of our gym. SwiftLift created two live previews that immediately felt more current. Version A looked sharp and direct, while Version B pushed harder on conversions and lead capture. That side-by-side comparison was valuable because it showed us two completely different ways to position the same business. The result felt much more professional and much easier to share with potential members.", zh: "我們之前的網站看起來很舊，無法代表健身房的活力。SwiftLift 創建了兩個即時預覽，讓人立刻感覺更現代。版本A看起來銳利直接，而版本B在轉化和潛在客戶獲取方面更為強勢。這種並排比較很有價值，因為它展示了兩種完全不同的方式來定位同一個業務。結果感覺更專業，更容易與潛在會員分享。" }, name: { en: "David Ramirez", zh: "David Ramirez" }, company: { en: "Chicago Boxing Club", zh: "Chicago Boxing Club" } },
    ],
    viewPreviewVersions: { en: "Compare Both Versions →", zh: "比較兩個版本 →" },
    builtWith: { en: "Built with the SwiftLift System.", zh: "使用 SwiftLift 系統構建。" },
    versionA: { en: "Version A — Clean Professional", zh: "版本A — 簡潔專業" },
    versionB: { en: "Version B — Conversion-Focused", zh: "版本B — 轉化導向" },
    pricingTitle: { en: "Simple, Transparent Pricing", zh: "簡單透明的定價" },
    pricingSub: { en: "You only pay after you've seen your previews and feel confident.", zh: "只有在看過預覽並有信心後才付款。" },
    mostPopular: { en: "Most Popular", zh: "最受歡迎" },
    /* Multi-page plans (primary) */
    multiPageLabel: { en: "Multi-Page Website", zh: "多頁面網站" },
    multiPageSub: { en: "Best for businesses that need a complete website presence", zh: "最適合需要完整網站形象的企業" },
    plans: [
      { name: { en: "Preview Access", zh: "預覽版" }, price: "$299", features: { en: ["Live website preview", "Clean professional layout", "Delivered as-is", "Up to 7 pages", "Mobile responsive", "SEO-friendly structure"], zh: ["即時網站預覽", "簡潔專業版面", "按原樣交付", "最多7頁", "行動裝置響應式", "SEO友好結構"] }, note: { en: "No revisions included. Minor edits available.", zh: "不含修改。可進行小幅編輯。" }, cta: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" } },
      { name: { en: "Launch Ready", zh: "上線版" }, price: "$499", features: { en: ["Fully polished website", "Bug fixes and content refinement", "Ready for real business use", "Up to 7 pages", "Mobile responsive", "SEO-friendly structure"], zh: ["完全打磨的網站", "修復和內容優化", "適合實際商業使用", "最多7頁", "行動裝置響應式", "SEO友好結構"] }, note: { en: "", zh: "" }, cta: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" } },
      { name: { en: "Growth Optimized", zh: "成長版" }, price: "$799", features: { en: ["Conversion-focused layout", "Optimized structure and content flow", "Designed to generate more leads", "Up to 7 pages", "Mobile responsive", "SEO-friendly structure"], zh: ["轉化導向版面", "優化結構和內容流程", "設計以產生更多潛在客戶", "最多7頁", "行動裝置響應式", "SEO友好結構"] }, note: { en: "", zh: "" }, cta: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" } },
    ],
    /* Single-page plans (secondary) */
    singlePageLabel: { en: "Single Page Website", zh: "單頁面網站" },
    singlePageSub: { en: "Best for simple businesses or quick online presence", zh: "最適合簡單企業或快速建立線上形象" },
    singlePagePlans: [
      { name: { en: "Preview", zh: "預覽版" }, price: "$199", cta: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" } },
      { name: { en: "Launch", zh: "上線版" }, price: "$349", cta: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" } },
      { name: { en: "Growth", zh: "成長版" }, price: "$549", cta: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" } },
    ],
    /* Custom plans */
    customLabel: { en: "Custom Website Solutions", zh: "定制網站方案" },
    customSub: { en: "For businesses that need more flexibility or advanced features", zh: "適合需要更多靈活性或高級功能的企業" },
    customPlans: [
      { name: { en: "Starter Custom", zh: "入門定制" }, price: "$1,499" },
      { name: { en: "Business Custom", zh: "商務定制" }, price: "$2,499" },
      { name: { en: "Advanced", zh: "高級版" }, price: "$4,999+" },
    ],
    customCta: { en: "Request Custom Quote", zh: "申請定制報價" },
    faqTitle: { en: "Still Have Questions?", zh: "還有疑問？" },
    faqItems: [
      { q: { en: "Is the preview really free?", zh: "預覽真的免費嗎？" }, a: { en: "Yes. We build two working website previews first.\nYou only pay if you decide to move forward.", zh: "是的。我們先建兩個可運行的網站預覽。\n只有在您決定繼續時才需付款。" } },
      { q: { en: "How long does it take to launch?", zh: "上線需要多長時間？" }, a: { en: "Once you approve a preview,\nyour website goes live within 3 days.", zh: "一旦您批准預覽，\n您的網站將在3天內上線。" } },
      { q: { en: "What if I need changes?", zh: "如果我需要修改怎麼辦？" }, a: { en: "Each package includes a defined revision structure.\nAdditional revisions are $45 per submission.", zh: "每個套餐都包含明確的修改結構。\n額外修改每次$45。" } },
      { q: { en: "Do I need an existing website?", zh: "需要現有網站嗎？" }, a: { en: "SwiftLift is built for businesses with existing websites.\nFor new sites, explore our custom build options.", zh: "SwiftLift 針對已有網站的企業。\n全新網站請探索我們的定制建設選項。" } },
    ],
    viewFullFaq: { en: "View Full FAQ →", zh: "查看完整FAQ →" },
    ctaTitle: { en: "No Calls. No Waiting. No Risk.", zh: "無需電話。無需等待。無風險。" },
    ctaSub: { en: "Get 2 free design previews and decide with confidence — before spending a dollar.", zh: "獲取2個免費設計預覽，在花一分錢之前自信決策。" },
    ctaButton: { en: "Get My 2 Free Previews", zh: "獲取我的2個免費預覽" },
    footerTagline: { en: "Faster than agencies. Easier than freelancers. Safer than traditional services.", zh: "比機構更快。比自由職業者更簡單。比傳統服務更安全。" },
  },
} as const;

export function t(obj: { en: string; zh: string }, lang: Language): string {
  return obj[lang];
}
