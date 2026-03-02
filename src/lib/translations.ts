export type Language = "en" | "zh";

export const translations = {
  nav: {
    process: { en: "Process", zh: "流程" },
    portfolio: { en: "Portfolio", zh: "作品集" },
    pricing: { en: "Pricing", zh: "价格" },
    contact: { en: "Claim FREE Previews", zh: "获取免费预览" },
  },
  hero: {
    headline: {
      en: "Launch or\nRebuild\nYour Website.",
      zh: "全新上线或\n焕新重建\n您的网站。",
    },
    subheadline: {
      en: "Whether you need a brand new website or a full facelift of your outdated one, SwiftLift rebuilds modern, high-performance sites quickly and clearly.",
      zh: "无论您需要全新网站还是对过时网站的全面焕新，SwiftLift都能快速、清晰地重建现代化高性能站点。",
    },
    cta: {
      en: "Claim My FREE Previews",
      zh: "获取FREE预览",
    },
    ctaSub: {
      en: "Preview delivered within 24 hours.\nLive site ready within days.",
      zh: "24小时内交付预览。\n数天内网站正式上线。",
    },
    launchPricing: {
      en: "Launch pricing — limited availability",
      zh: "上线优惠 — 限量供应",
    },
  },
  problemSolution: {
    headline: {
      en: "Your Website Should Work For You —\nNot Against You",
      zh: "您的网站应该为您工作 ——\n而不是拖您后腿",
    },
    body: {
      en: "Professional websites help businesses grow, convert better, and build lasting trust with every visitor.",
      zh: "专业的网站帮助企业成长，提升转化率，并与每位访客建立持久信任。",
    },
    outdatedTitle: { en: "Outdated Website", zh: "过时的网站" },
    outdatedItems: [
      { en: "Slow performance", zh: "性能缓慢" },
      { en: "Poor design credibility", zh: "设计缺乏可信度" },
      { en: "Weak conversion", zh: "转化率低" },
      { en: "Hard to update content", zh: "内容难以更新" },
      { en: "Not mobile-optimized", zh: "未针对移动端优化" },
    ],
    rebuildTitle: { en: "SwiftLift Rebuild", zh: "SwiftLift 重建" },
    rebuildItems: [
      { en: "Fast loading", zh: "快速加载" },
      { en: "Modern trust design", zh: "现代可信设计" },
      { en: "Optimized for conversion", zh: "优化转化率" },
      { en: "Easy-to-update structure", zh: "易于更新的结构" },
      { en: "Mobile-first responsive", zh: "移动优先响应式" },
    ],
  },
  why: {
    headline: {
      en: "We Build Two Professional Website Concepts —\nYou Choose Your Favorite",
      zh: "我们打造两个专业网站方案 —\n您选择最喜欢的",
    },
    body: {
      en: "Two FREE real preview versions delivered within 24 hours.",
      zh: "两个FREE真实预览版本，24小时内交付。",
    },
    stats: [
      { label: { en: "Preview Delivered", zh: "预览交付" }, value: { en: "24h", zh: "24h" } },
      { label: { en: "Two Real Sites", zh: "两个真实网站" }, value: { en: "2 Sites", zh: "2 站点" } },
      { label: { en: "Live Within Days", zh: "数天上线" }, value: { en: "3 Days", zh: "3 天" } },
      { label: { en: "Zero Upfront", zh: "零前期费用" }, value: { en: "$0", zh: "$0" } },
    ],
  },
  process: {
    headline: { en: "How It Works", zh: "服务流程" },
    steps: [
      {
        title: { en: "Upload", zh: "上传" },
        desc: { en: "Share your company name, logo, and vision. Two minutes.", zh: "分享您的公司名称、Logo和品牌愿景。仅需两分钟。" },
      },
      {
        title: { en: "Concept", zh: "概念" },
        desc: { en: "Receive two live homepage designs within 24 hours.", zh: "24小时内收到两个实时主页设计。" },
      },
      {
        title: { en: "Refine", zh: "优化" },
        desc: { en: "Pick your favorite. We then polish copy and assets.", zh: "选定方案，我们随后完善文案和素材。" },
      },
      {
        title: { en: "Build", zh: "搭建" },
        desc: { en: "Our team builds your complete multi-page site.", zh: "团队构建完整的多页面网站。" },
      },
      {
        title: { en: "Launch", zh: "上线" },
        desc: { en: "Your refined website goes live\nready to support your growth.", zh: "您的精致网站正式上线\n助力您的业务增长。" },
      },
    ],
  },
  portfolio: {
    headline: { en: "Concept Gallery", zh: "概念展示" },
    items: [
      { title: { en: "Import/Export Trading Company", zh: "进出口贸易公司" }, desc: { en: "Products, about, contact", zh: "产品、关于、联系" } },
      { title: { en: "Modern Wellness Clinic", zh: "现代健康诊所" }, desc: { en: "Services, booking, team", zh: "服务、预约、团队" } },
      { title: { en: "Small Law Firm", zh: "小型律师事务所" }, desc: { en: "Practice areas, attorney profile, contact", zh: "业务领域、律师简介、联系" } },
      { title: { en: "Construction Contractor", zh: "建筑装修承包商" }, desc: { en: "Past projects, services, contact", zh: "过往项目、服务、联系" } },
      { title: { en: "Wholesale Distributor", zh: "批发分销商" }, desc: { en: "Product categories, about, contact", zh: "产品类别、关于、联系" } },
      { title: { en: "Logistics Company", zh: "物流公司" }, desc: { en: "Services, routes, contact", zh: "服务、路线、联系" } },
      { title: { en: "Restaurant & Bar", zh: "餐厅酒吧" }, desc: { en: "Menu, reservations, gallery", zh: "菜单、预订、画廊" } },
      { title: { en: "Real Estate Agency", zh: "房地产中介" }, desc: { en: "Listings, agents, contact", zh: "房源、经纪人、联系" } },
      { title: { en: "Dental Clinic", zh: "牙科诊所" }, desc: { en: "Services, team, booking", zh: "服务、团队、预约" } },
    ],
  },
  pricing: {
    headline: { en: "Simple,\nTransparent Pricing", zh: "简单\n透明的价格" },
    buttonText: { en: "Claim My FREE Previews", zh: "获取FREE预览" },
    buttonSub: { en: "No credit card required. No obligation.", zh: "无需信用卡。无任何义务。" },
    cards: [
      {
        title: { en: "Starter", zh: "入门版" },
        subtitle: { en: "1–2 Pages", zh: "1–2 页" },
        price: "$350",
        originalPrice: "$800",
        features: {
          en: ["1–2 Pages", "Clean Modern Design", "Mobile Responsive", "Contact Form Setup", "Brand Color Integration", "Fast Performance Loading"],
          zh: ["1–2 页", "简洁现代设计", "移动端自适应", "联系表单配置", "品牌配色融合", "高性能加载"],
        },
      },
      {
        title: { en: "Growth", zh: "成长版" },
        subtitle: { en: "3–7 Pages", zh: "3–7 页" },
        price: "$550",
        originalPrice: "$1,200",
        badge: { en: "Most Popular", zh: "最受欢迎" },
        subtext: { en: "Save $650 — Launch Pricing", zh: "节省$650 — 上线优惠" },
        features: {
          en: ["3–7 Pages", "Modern Design", "Mobile Responsive", "Contact Form + Map + Social", "Brand Color Integration", "Fast Performance Loading"],
          zh: ["3–7 页", "现代设计", "移动端自适应", "联系表单 + 地图 + 社交", "品牌配色融合", "高性能加载"],
        },
      },
      {
        title: { en: "Custom", zh: "定制版" },
        subtitle: { en: "Up to 20 Pages", zh: "最多20页" },
        price: "$1,500+",
        originalPrice: "$2,500",
        bottomNote: { en: "Complex needs? Request a custom quote.", zh: "复杂需求？申请定制报价。" },
        features: {
          en: ["Up to 20 Pages", "Custom Design", "Mobile Responsive", "Advanced Integrations", "Deep Brand Strategy", "Fast Performance Loading"],
          zh: ["最多20页", "定制设计", "移动端自适应", "高级集成功能", "深度品牌策略", "高性能加载"],
        },
      },
    ],
    rowLabels: {
      en: ["Pages included", "Design Quality", "Mobile Responsive", "Integrations", "Brand Strategy", "Performance", "Preview Sites"],
      zh: ["页面数量", "设计品质", "移动端自适应", "集成功能", "品牌策略", "性能", "预览网站"],
    },
  },
  testimonials: {
    headline: { en: "What Clients Say", zh: "客户评价" },
    items: [
      {
        quote: {
          en: "I was skeptical about the FREE previews, but they blew me away. Paid for the full build on the spot.",
          zh: "我对FREE预览持怀疑态度，但它们让我大吃一惊。当场就付了全款。",
        },
        name: { en: "Sarah Chen", zh: "Sarah Chen" },
        role: { en: "Small Business Owner", zh: "小企业主" },
      },
      {
        quote: {
          en: "Two working homepages in 24 hours. I picked one, paid, and was live within days.",
          zh: "24小时内收到两个完整主页。选了一个，付款，数天内就上线了。",
        },
        name: { en: "Marcus Webb", zh: "Marcus Webb" },
        role: { en: "Wellness Clinic Owner", zh: "健康诊所老板" },
      },
      {
        quote: {
          en: "Best investment I've made for my business. The previews sold me instantly.",
          zh: "我为业务做的最好的投资。预览瞬间就打动了我。",
        },
        name: { en: "David Park", zh: "David Park" },
        role: { en: "Local Service Provider", zh: "本地服务商" },
      },
      {
        quote: {
          en: "Professional quality at a fraction of what agencies charge. Couldn't be happier with the results.",
          zh: "以代理机构收费的一小部分获得专业品质。对结果非常满意。",
        },
        name: { en: "Thomas Lin", zh: "Thomas Lin" },
        role: { en: "Business Owner", zh: "企业主" },
      },
      {
        quote: {
          en: "The whole process was seamless. From preview to launch in under a week — exactly what my business needed.",
          zh: "整个过程非常顺畅。从预览到上线不到一周——正是我的企业所需要的。",
        },
        name: { en: "Jessica Moore", zh: "Jessica Moore" },
        role: { en: "Restaurant Owner", zh: "餐厅老板" },
      },
      {
        quote: {
          en: "I've worked with agencies before but never got this quality this fast. SwiftLift delivered beyond expectations.",
          zh: "我以前和代理机构合作过，但从未如此快速地获得如此高的质量。SwiftLift超出了预期。",
        },
        name: { en: "Kevin Zhang", zh: "Kevin Zhang" },
        role: { en: "E-commerce Founder", zh: "电商创始人" },
      },
    ],
  },
  faq: {
    headline: { en: "Frequently Asked\nQuestions", zh: "常见问题" },
    subheadline: {
      en: "Everything you need to know. Can't find the answer you're looking for? Contact us.",
      zh: "您需要知道的一切。找不到答案？联系我们。",
    },
    items: [
      {
        q: { en: "How do the FREE previews work?", zh: "免费预览是如何运作的？" },
        a: { en: "Submit your company name, logo, and business details. Within 24 hours, you'll receive two fully designed, live homepage preview links — viewable on desktop and mobile.\n\nThese are functional previews built specifically around your business structure. There is no payment required to receive them.", zh: "提交您的公司名称、标志和业务信息。24小时内，您将收到两个专为您的业务量身设计的实时首页预览链接——可在桌面和移动设备上查看。\n\n这些是围绕您的业务结构专门构建的功能预览。无需支付任何费用即可获取。" },
      },
      {
        q: { en: "What happens after I choose a concept?", zh: "选择方案后会发生什么？" },
        a: { en: "Once you select your preferred preview direction, you choose your package and submit payment. We then expand that concept into your full website build based on your selected tier.\n\nAll builds follow SwiftLift's structured system for speed, clarity, and consistency.", zh: "选定您心仪的预览方向后，选择套餐并提交付款。我们随后会根据您选择的套餐等级，将该方案扩展为完整的网站建设。\n\n所有建设均遵循SwiftLift的结构化系统，确保速度、清晰度和一致性。" },
      },
      {
        q: { en: "Can I use my own domain name?", zh: "可以使用自己的域名吗？" },
        a: { en: "Yes. You may use your existing domain or purchase a new one. You remain the owner of your domain at all times.\n\nWe provide simple instructions to connect your domain during deployment.", zh: "可以。您可以使用现有域名或购买新域名。域名始终归您所有。\n\n我们会提供简单的说明，帮助您在部署过程中连接域名。" },
      },
    ],
  },
  about: {
    text: {
      en: "SwiftLift creates refined, conversion-focused websites built for clarity, speed, and growth.",
      zh: "SwiftLift打造精致的、以转化为核心的网站，注重清晰、速度和增长。",
    },
  },
  intake: {
    headline: { en: "Start Your Transformation", zh: "开启您的品牌蜕变" },
    subheadline: { en: "Fill out the form below and we'll send you 2 FREE design previews within 24 hours.", zh: "填写下方表格，我们将在24小时内发送2个FREE设计预览。" },
    fields: {
      description: { en: "Business Description", zh: "业务描述" },
      descriptionPlaceholder: { en: "Tell us about your business — what you do, your target audience, and any style preferences", zh: "请介绍您的业务——您做什么、目标受众以及任何风格偏好" },
      descriptionTooltip: { en: "Include your company name, what services you offer, who your customers are, and any design styles you love (or hate). The more details, the better we can match your vision.", zh: "包括您的公司名称、提供的服务、客户群体以及您喜欢（或不喜欢）的设计风格。细节越多，我们就越能匹配您的愿景。" },
      color: { en: "Brand Color", zh: "品牌颜色" },
      colorPlaceholder: { en: "e.g., Blue, #1E90FF, or Royal Blue", zh: "例如：蓝色、#1E90FF 或 皇家蓝" },
      colorTooltip: { en: "Enter a color name, hex code (like #FF0000), or describe your brand colors", zh: "输入颜色名称、十六进制代码（如 #FF0000）或描述您的品牌颜色" },
      url: { en: "Your Current Website", zh: "您的当前网站" },
      urlOptional: { en: "(Optional)", zh: "（选填）" },
      urlTooltip: { en: "Your current website or social media page.", zh: "您当前的网站或社交媒体页面。" },
      logo: { en: "Your Logo", zh: "您的Logo" },
      logoOptional: { en: "(Optional)", zh: "（选填）" },
      logoTooltip: { en: "Transparent background PNG works best. Any logo file accepted — we'll optimize it for your previews.", zh: "透明背景PNG效果最好。任何Logo文件均可——我们将为您的预览进行优化。" },
      inspiration: { en: "Inspiration URL", zh: "灵感网站URL" },
      inspirationOptional: { en: "(Optional)", zh: "（选填）" },
      inspirationTooltip: { en: "Share a competitor's site or any design you love — we'll match the vibe.", zh: "分享竞争对手的网站或您喜欢的任何设计——我们会匹配风格。" },
      name: { en: "Your Name", zh: "您的姓名" },
      namePlaceholder: { en: "Full name", zh: "全名" },
      company: { en: "Your Company Name", zh: "公司名称" },
      companyPlaceholder: { en: "Company name", zh: "公司名称" },
      email: { en: "Email Address", zh: "电子邮箱" },
      timeline: { en: "When are you planning to upgrade your website?", zh: "您计划什么时候升级您的网站？" },
      timelineOptions: {
        en: ["Within 1 week", "Within 1 month", "Within 3 months", "Exploring options", "Not sure yet"],
        zh: ["1周内", "1个月内", "3个月内", "探索中", "还不确定"],
      },
    },
    submit: { en: "Generate My FREE Previews", zh: "生成我的FREE预览" },
  },
  footer: {
    tagline: { en: "SwiftLift creates refined, conversion-focused websites built for clarity, speed, and growth.", zh: "SwiftLift打造精致的、以转化为核心的网站，注重清晰、速度和增长。" },
    privacy: { en: "Privacy", zh: "隐私政策" },
    terms: { en: "Terms", zh: "服务条款" },
    copyright: { en: "SwiftLift Copyright © 2026 All Rights Reserved.", zh: "SwiftLift 版权所有 © 2026。" },
    designBy: { en: "Web Design by", zh: "网站设计" },
    guarantee: { en: "100% Satisfaction Guarantee", zh: "100% 满意保证" },
    guaranteeSub: { en: "Professional Quality Assurance", zh: "专业质量保证" },
  },
  payment: {
    heroHeadline: { en: "Secure Your Website Build", zh: "锁定您的网站建设" },
    heroSub: { en: "You've seen the preview.\nNow reserve your build and we'll take it live.", zh: "您已看过预览。\n现在预约建设，我们将正式上线。" },
    heroCta: { en: "Reserve My Build", zh: "预约建设" },
    choosePackage: { en: "Choose Your Package", zh: "选择您的套餐" },
    afterPayHeadline: { en: "What Happens After You Pay?", zh: "付款后会怎样？" },
    faqHeadline: { en: "Frequently Asked Questions", zh: "常见问题" },
    finalCtaHeadline: { en: "Ready to Activate Your Website?", zh: "准备好激活您的网站了吗？" },
    cards: [
      {
        title: { en: "Starter", zh: "入门版" },
        sub: { en: "1–2 Pages", zh: "1–2 页" },
        features: {
          en: ["Two Professional Preview Concepts", "Mobile Responsive Build", "Fast Performance Loading", "Minor Copy Refinement", "Delivery Within Days", "1 Revision Round"],
          zh: ["两套专业预览方案", "移动端响应式构建", "快速加载性能", "轻微文案优化", "数天内交付", "1轮修改"],
        },
        button: { en: "Reserve My Build", zh: "预约建设" },
      },
      {
        title: { en: "Growth", zh: "成长版" },
        sub: { en: "3–7 Pages", zh: "3–7 页" },
        badge: { en: "Most Popular", zh: "最受欢迎" },
        features: {
          en: ["Everything in Starter", "Expanded Page Structure", "Enhanced Layout Customization", "Improved Conversion Structure", "2 Revision Rounds", "Priority Delivery"],
          zh: ["包含入门版所有功能", "扩展页面结构", "增强布局定制", "优化转化结构", "2轮修改", "优先交付"],
        },
        button: { en: "Reserve My Build", zh: "预约建设" },
      },
      {
        title: { en: "Custom", zh: "定制版" },
        sub: { en: "Up to 20 Pages", zh: "最多20页" },
        features: {
          en: ["Fully Tailored Site Structure", "Advanced Design Strategy", "Deep Copy Optimization", "Scalable Architecture", "Strategic Layout Planning", "Dedicated Build Timeline"],
          zh: ["完全定制的站点结构", "高级设计策略", "深度文案优化", "可扩展架构", "战略布局规划", "专属建设时间线"],
        },
        button: { en: "Request Custom Proposal", zh: "申请定制方案" },
      },
    ],
    steps: [
      { title: { en: "Finalize", zh: "确认" }, desc: { en: "We finalize structure and content details.", zh: "我们确认结构和内容细节。" } },
      { title: { en: "Prepare", zh: "准备" }, desc: { en: "We prepare deployment and optimization.", zh: "我们准备部署和优化。" } },
      { title: { en: "Launch", zh: "上线" }, desc: { en: "Your website goes live within days.", zh: "您的网站在数天内正式上线。" } },
    ],
    faqs: [
      { q: { en: "When does my site go live?", zh: "我的网站什么时候上线？" }, a: { en: "Most builds go live within a few days after payment and final content confirmation.", zh: "大多数网站在付款和最终内容确认后的几天内上线。" } },
      { q: { en: "Can I request changes?", zh: "可以请求修改吗？" }, a: { en: "Yes. Revision rounds are included depending on your package.", zh: "可以。修改轮次根据您的套餐而定。" } },
      { q: { en: "Can I use my own domain?", zh: "可以使用自己的域名吗？" }, a: { en: "Yes. We connect your domain during deployment.", zh: "可以。我们会在部署期间连接您的域名。" } },
      { q: { en: "Do I own the website?", zh: "我拥有网站的所有权吗？" }, a: { en: "Yes. You own your domain and website assets.", zh: "是的。您拥有域名和网站资产的所有权。" } },
      { q: { en: "What if I need additional features later?", zh: "以后需要额外功能怎么办？" }, a: { en: "We can expand and upgrade your site anytime.", zh: "我们可以随时扩展和升级您的网站。" } },
    ],
  },
  addons: {
    heroHeadline: { en: "Enhance Your\nWebsite Investment", zh: "增强您的\n网站投资价值" },
    heroSub: { en: "Add professional upgrades to strengthen your brand, visibility, and long-term performance.", zh: "添加专业升级以增强您的品牌、知名度和长期表现。" },
    heroCta: { en: "Contact Support", zh: "联系支持" },
    heroCtaSecondary: { en: "Return to Dashboard", zh: "返回首页" },
    exclusiveRate: { en: "Website Client Exclusive Rate", zh: "网站客户专享价" },
    trustHeadline: { en: "Need Help Deciding?", zh: "需要帮助选择？" },
    trustSub: { en: "Our team can guide you based on your business goals and growth plans.", zh: "我们的团队可以根据您的业务目标和增长计划为您提供指导。" },
    trustCta: { en: "Schedule Consultation", zh: "预约咨询" },
    cards: [
      {
        title: { en: "Brand Identity Package", zh: "品牌形象套餐" },
        desc: { en: "Strengthen your visual identity with a professional brand system aligned with your new website.", zh: "通过与新网站相配的专业品牌体系来增强您的视觉形象。" },
        price: "$700",
        standalone: { en: "(Standalone projects start from $1200)", zh: "（独立项目起价$1200）" },
        features: {
          en: ["3 logo concepts", "3 revision rounds", "Primary + secondary logo", "Basic brand guideline"],
          zh: ["3个标志方案", "3轮修改", "主标志 + 辅助标志", "基础品牌指南"],
        },
      },
      {
        title: { en: "Advanced SEO Setup", zh: "高级SEO设置" },
        desc: { en: "Improve visibility and search readiness beyond the basic foundation.", zh: "超越基础提升搜索可见度和搜索准备度。" },
        price: "$250",
        standalone: { en: "(Standalone SEO setup starts from $500)", zh: "（独立SEO设置起价$500）" },
        features: {
          en: ["On-page SEO structure", "Meta titles & descriptions", "Schema setup", "Basic keyword mapping", "Sitemap optimization"],
          zh: ["页面SEO结构", "Meta标题和描述", "Schema设置", "基础关键词映射", "站点地图优化"],
        },
      },
      {
        title: { en: "Hosting & Management", zh: "托管与管理" },
        desc: { en: "Let us handle the technical side while you focus on growing your business.", zh: "让我们处理技术细节，您专注于发展业务。" },
        price: "$84/yr",
        standalone: null,
        features: {
          en: ["Managed Netlify hosting", "Domain setup assistance", "SSL configuration", "1–2 minor updates/month", "Basic monitoring support"],
          zh: ["托管式Netlify主机", "域名设置协助", "SSL配置", "每月1-2次小更新", "基础监控支持"],
        },
      },
      {
        title: { en: "Performance Optimization", zh: "性能优化" },
        desc: { en: "Enhance speed and user experience for stronger engagement.", zh: "提升速度和用户体验以增强互动性。" },
        price: "$180",
        standalone: null,
        features: {
          en: ["Image optimization", "Code minification", "Load performance tuning", "Core Web Vitals improvements"],
          zh: ["图片优化", "代码压缩", "加载性能调优", "核心网页指标改进"],
        },
      },
    ],
  },
  deployment: {
    heroHeadline: { en: "Launch Your Website", zh: "发布您的网站" },
    heroSub: { en: "Choose how you'd like your website deployed. We guide you every step of the way.", zh: "选择您的网站部署方式。我们将全程指导您。" },
    heroCta1: { en: "Set Up Free Hosting (Recommended)", zh: "设置免费托管（推荐）" },
    heroCta2: { en: "Let SwiftLift Manage Everything", zh: "让SwiftLift全权管理" },
    hostingOptions: [
      {
        title: { en: "Free Hosting (You Own It)", zh: "免费托管（您拥有所有权）" },
        price: "$0",
        altPrice: null,
        paragraph: { en: "You fully own your hosting account. No monthly fees. No lock-in.", zh: "您完全拥有托管账户所有权。无月费。无锁定。" },
        button: { en: "Start Free Setup", zh: "开始免费设置" },
        features: {
          en: ["Guided Netlify account creation", "You provide login access", "Website deployment handled by us", "Domain connected for you", "SSL configured", "Basic performance optimization"],
          zh: ["引导式Netlify账户创建", "您提供登录权限", "网站部署由我们处理", "为您连接域名", "SSL配置", "基础性能优化"],
        },
      },
      {
        title: { en: "Managed Hosting & Maintenance", zh: "托管主机与维护" },
        price: "$84/yr",
        altPrice: "or $10/mo",
        paragraph: { en: "We handle everything. You focus on your business.", zh: "我们处理一切。您专注于业务。" },
        button: { en: "Choose Managed Hosting", zh: "选择托管主机" },
        features: {
          en: ["Managed hosting environment", "SSL & deployment handled", "Domain setup assistance", "1–2 minor updates per month", "Basic monitoring"],
          zh: ["托管式主机环境", "SSL和部署处理", "域名设置协助", "每月1-2次小更新", "基础监控"],
        },
      },
    ],
    stepsHeadline: { en: "What Happens Next", zh: "接下来会发生什么" },
    steps: [
      { title: { en: "Confirm Hosting Option", zh: "确认托管方案" }, desc: { en: "Choose free or managed hosting.", zh: "选择免费或托管主机。" } },
      { title: { en: "Deployment & Setup", zh: "部署与设置" }, desc: { en: "We deploy and configure everything.", zh: "我们部署并配置一切。" } },
      { title: { en: "Website Goes Live", zh: "网站正式上线" }, desc: { en: "Your website goes live within days.", zh: "您的网站在数天内正式上线。" } },
    ],
    upgradesHeadline: { en: "Optional Upgrades", zh: "可选升级" },
    exclusiveRate: { en: "Website Client Exclusive Rate", zh: "网站客户专享价" },
    upgrades: [
      {
        title: { en: "Brand Identity Package", zh: "品牌形象套餐" },
        price: "$700",
        features: {
          en: ["3 logo concepts", "3 revision rounds", "Primary + secondary logo", "Basic brand guideline"],
          zh: ["3个标志方案", "3轮修改", "主标志 + 辅助标志", "基础品牌指南"],
        },
      },
      {
        title: { en: "Advanced SEO Setup", zh: "高级SEO设置" },
        price: "$250",
        features: {
          en: ["On-page SEO structure", "Meta titles & descriptions", "Schema setup", "Basic keyword mapping", "Sitemap optimization"],
          zh: ["页面SEO结构", "Meta标题和描述", "Schema设置", "基础关键词映射", "站点地图优化"],
        },
      },
      {
        title: { en: "Performance Optimization", zh: "性能优化" },
        price: "$180",
        features: {
          en: ["Image optimization", "Code minification", "Load performance tuning", "Core Web Vitals improvements"],
          zh: ["图片优化", "代码压缩", "加载性能调优", "核心网页指标改进"],
        },
      },
    ],
    faqHeadline: { en: "Deployment FAQ", zh: "部署常见问题" },
    faqs: [
      { q: { en: "Can I use my own hosting?", zh: "我可以使用自己的托管吗？" }, a: { en: "Yes. We guide you through setting up a free Netlify account that you fully own and control.", zh: "可以。我们引导您创建完全由您拥有和控制的免费Netlify账户。" } },
      { q: { en: "What if my previous designer controls my domain?", zh: "如果之前的设计师控制着我的域名怎么办？" }, a: { en: "We can help you reclaim access or set up a new domain. Either way, we'll make sure your website is properly connected.", zh: "我们可以帮助您重新获得访问权限或设置新域名。无论哪种方式，我们都会确保您的网站正确连接。" } },
      { q: { en: "Do I own my website?", zh: "我拥有网站的所有权吗？" }, a: { en: "Absolutely. You own your domain, content, and all website assets. No lock-in contracts.", zh: "当然。您拥有域名、内容和所有网站资产的所有权。无锁定合同。" } },
      { q: { en: "Can I upgrade later?", zh: "以后可以升级吗？" }, a: { en: "Yes. You can switch from free hosting to managed hosting or add any upgrade package at any time.", zh: "可以。您可以随时从免费托管切换到托管主机，或添加任何升级套餐。" } },
    ],
    trustHeadline: { en: "Need Guidance?", zh: "需要指导？" },
    trustSub: { en: "Our team can help you choose the right deployment option for your business.", zh: "我们的团队可以帮助您为业务选择正确的部署方案。" },
    trustCta: { en: "Schedule Consultation", zh: "预约咨询" },
  },
  customBrief: {
    heroHeadline: { en: "Let's Build Something\nTailored to Your Business", zh: "让我们为您的业务\n量身打造" },
    heroSub: { en: "Tell us about your project and we'll prepare a custom proposal.", zh: "告诉我们您的项目需求，我们将为您准备定制方案。" },
    successTitle: { en: "Proposal Request Received", zh: "方案申请已收到" },
    successDesc: { en: "We'll review your details and get back to you within 24 hours.", zh: "我们将审核您的信息，并在24小时内与您联系。" },
    businessDetails: { en: "Business Details", zh: "企业信息" },
    companyName: { en: "Company Name", zh: "公司名称" },
    companyNamePlaceholder: { en: "Your company name", zh: "您的公司名称" },
    industry: { en: "Industry", zh: "行业" },
    industryPlaceholder: { en: "e.g. Real Estate, Legal", zh: "例如：房地产、法律" },
    currentWebsite: { en: "Current Website", zh: "当前网站" },
    optional: { en: "(optional)", zh: "（选填）" },
    targetAudience: { en: "Target Audience", zh: "目标受众" },
    targetAudiencePlaceholder: { en: "Who are your customers?", zh: "您的客户是谁？" },
    projectScope: { en: "Project Scope", zh: "项目范围" },
    pageCount: { en: "Estimated Page Count", zh: "预估页面数量" },
    pageCountPlaceholder: { en: "e.g. 10", zh: "例如：10" },
    timeline: { en: "Preferred Timeline", zh: "期望时间线" },
    timelinePlaceholder: { en: "e.g. 2 weeks, 1 month", zh: "例如：2周、1个月" },
    requiredFeatures: { en: "Required Features", zh: "所需功能" },
    featureOptions: {
      en: ["Booking System", "E-commerce", "Membership Area", "Blog", "Multi-language", "Advanced Forms"],
      zh: ["预约系统", "电子商务", "会员区域", "博客", "多语言", "高级表单"],
    },
    other: { en: "Other", zh: "其他" },
    otherPlaceholder: { en: "Describe any other features...", zh: "描述其他需要的功能..." },
    budgetRange: { en: "Budget Range", zh: "预算范围" },
    budgetOptions: {
      en: ["$1,500 – $3,000", "$3,000 – $5,000", "$5,000+"],
      zh: ["$1,500 – $3,000", "$3,000 – $5,000", "$5,000+"],
    },
    submitButton: { en: "Request My Custom Proposal", zh: "申请我的定制方案" },
    submitting: { en: "Sending...", zh: "发送中..." },
    toastTitle: { en: "Proposal request sent!", zh: "方案申请已发送！" },
    toastDesc: { en: "We'll be in touch within 24 hours.", zh: "我们将在24小时内与您联系。" },
  },
} as const;

export function t(obj: { en: string; zh: string }, lang: Language): string {
  return obj[lang];
}
