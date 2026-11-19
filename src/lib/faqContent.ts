// Single source of truth for SwiftLift FAQs.
// Used by the homepage (items with a `home` order number), the /faq page (all, grouped),
// and the build-time prerender (FAQPage JSON-LD for /faq).

export type Bilingual = { en: string; zh: string };
export type FaqItem = { q: Bilingual; a: Bilingual; home?: number };
export type FaqCategory = { title: Bilingual; items: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: { en: "About SwiftLift", zh: "關於 SwiftLift" },
    items: [
      {
        home: 1,
        q: { en: "Why is it so affordable?", zh: "為什麼價格這麼實惠？" },
        a: {
          en: "Because we built a faster way to work. Our Lead Designer, Sony Lin, has 20 years and 500+ websites behind him, and he designed an AI automation system that handles the heavy lifting. Your previews, revisions and launch all run through that system — so you get a custom website at a fraction of agency prices, and you get it fast. That's why we're called SwiftLift: we give your old website a quick facelift.",
          zh: "因為我們打造了更快的工作方式。首席設計師 Sony Lin 擁有 20 年經驗、打造過 500+ 個網站，他設計了一套 AI 自動化系統來處理繁重的工作。您的預覽、修改和上線全部透過這套系統完成——所以您能以遠低於 agency 的價格，快速拿到客製化網站。這就是我們叫 SwiftLift 的原因：快速幫您的舊網站改頭換面。",
        },
      },
      {
        home: 2,
        q: { en: "Is this a template?", zh: "這是模板嗎？" },
        a: {
          en: "No. Every SwiftLift website is fully custom-built around your business, your content and your photos. Wix and Squarespace hand you a template and leave you to figure it out. We build it for you — then shape it to your vision during your revisions.",
          zh: "不是。每個 SwiftLift 網站都是根據您的業務、內容和照片完全客製化打造的。Wix 和 Squarespace 給您一個模板，讓您自己摸索；我們直接幫您做好，並在修改階段照您的想法調整。",
        },
      },
      {
        q: { en: "Who builds my website?", zh: "誰來製作我的網站？" },
        a: {
          en: "Our AI system builds it, and Sony Lin personally reviews every website before you see it.",
          zh: "由我們的 AI 系統製作，每個網站在您看到之前，Sony Lin 都會親自審核。",
        },
      },
      {
        home: 4,
        q: { en: "How fast is it?", zh: "速度有多快？" },
        a: {
          en: "You'll get 2 live previews within 48 hours. Most websites go live within 7 days of your approval.",
          zh: "48 小時內收到 2 個即時預覽。大多數網站在您確認後 7 天內上線。",
        },
      },
      {
        q: { en: "What kind of websites do you build?", zh: "你們製作什麼類型的網站？" },
        a: {
          en: "Fast, modern business websites — clean code that loads quickly, works well on Google and looks sharp on every screen. They're ideal for service businesses, restaurants, contractors, clinics, portfolios and landing pages. They're not built for online stores with a shopping cart or product database.",
          zh: "快速、現代的企業網站——程式碼乾淨、載入快速、對 Google 友善，在每種螢幕上都清晰好看。非常適合服務業、餐廳、營造商、診所、作品集和著陸頁。不適用於有購物車或商品資料庫的線上商店。",
        },
      },
      {
        q: { en: "I don't have a website yet. Can you still help?", zh: "我還沒有網站，你們能幫忙嗎？" },
        a: {
          en: "SwiftLift is built for businesses that already have a website. For a brand-new site, an online store or a custom project, visit our Lead Designer at Sonykun Design (sonykundesign.com).",
          zh: "SwiftLift 專為已經有網站的企業打造。如需全新網站、線上商店或客製化專案，請前往我們首席設計師的 Sonykun Design（sonykundesign.com）。",
        },
      },
    ],
  },
  {
    title: { en: "Previews & Revisions", zh: "預覽與修改" },
    items: [
      {
        home: 3,
        q: { en: "Is it really free to start?", zh: "真的可以免費開始嗎？" },
        a: {
          en: "Yes. Send us your website and we'll build two live versions — a Classic Facelift and a Growth Facelift. You only pay after your revisions, once you're happy. Don't love either? Walk away and pay nothing.",
          zh: "是的。把您的網站給我們，我們會做出兩個即時版本——Classic Facelift 和 Growth Facelift。修改完、滿意了才付款。兩個都不喜歡？直接離開，不用付任何費用。",
        },
      },
      {
        q: { en: "What do you need from me?", zh: "我需要提供什麼？" },
        a: {
          en: "Just your website URL and email. We reuse your existing content and photos, so there's nothing to prepare.",
          zh: "只要網站網址和電子郵箱。我們會沿用您現有的內容和照片，您什麼都不用準備。",
        },
      },
      {
        q: { en: "How long are previews available?", zh: "預覽開放多久？" },
        a: {
          en: "Your preview links stay open for 72 hours, and we'll send you reminders before they expire.",
          zh: "預覽連結開放 72 小時，到期前我們會寄提醒給您。",
        },
      },
      {
        q: { en: "What if my preview links expire?", zh: "預覽連結過期了怎麼辦？" },
        a: {
          en: "Just reply to your preview email and we'll reopen them. Requests older than 3 months need a fresh submission — it only takes 30 seconds.",
          zh: "直接回覆預覽郵件，我們會重新開放。超過 3 個月的請求需要重新提交——只需 30 秒。",
        },
      },
      {
        home: 6,
        q: { en: "How do I get the website I actually want?", zh: "怎樣才能得到我真正想要的網站？" },
        a: {
          en: "Tell us everything during your revision rounds — colors, layout, wording, photos, even \"A's colors with B's layout.\" The more complete your notes, the closer we get to your dream website. You get 2 full rounds, so send all your changes at once.",
          zh: "在修改階段把所有想法都告訴我們——顏色、版面、文字、照片，甚至「A 的配色加 B 的版面」。您的說明越完整，我們越能做出您理想中的網站。總共 2 輪完整修改，請一次送出所有修改。",
        },
      },
      {
        q: { en: "What counts as a revision round?", zh: "怎樣算一輪修改？" },
        a: {
          en: "One round is one complete set of changes sent through our online revision form (you can attach screenshots). You get 2 rounds included. Extra rounds are $45 each.",
          zh: "一輪是透過線上修改表單送出的一整組修改（可附截圖）。包含 2 輪，額外每輪 $45。",
        },
      },
    ],
  },
  {
    title: { en: "Pricing & Payment", zh: "價格與付款" },
    items: [
      {
        q: { en: "What's the difference between Classic and Growth?", zh: "Classic 和 Growth 有什麼差別？" },
        a: {
          en: "Classic Facelift ($299) is a clean, modern refresh of your website. Growth Facelift ($499) adds a conversion-focused layout — strategic calls to action, trust-building sections and a stronger flow — built to turn more visitors into inquiries. You'll see both before you decide.",
          zh: "Classic Facelift（$299）是乾淨、現代的網站翻新。Growth Facelift（$499）加入以轉換為重點的版面——策略性 CTA、建立信任的區塊和更強的動線——讓更多訪客變成詢問。兩個您都會先看到再決定。",
        },
      },
      {
        q: { en: "When do I pay?", zh: "什麼時候付款？" },
        a: {
          en: "After your revisions, when you approve your final website. Payment is made securely by card through Stripe.",
          zh: "修改完、確認最終網站時才付款。透過 Stripe 以信用卡安全付款。",
        },
      },
      {
        q: { en: "Are there any hidden fees?", zh: "有隱藏費用嗎？" },
        a: {
          en: "No. Hosting is free forever. You only pay for the version you choose, plus any optional edits or add-ons you ask for.",
          zh: "沒有。主機託管永久免費。您只需支付所選版本，以及您主動要求的修改或加購項目。",
        },
      },
      {
        q: { en: "What about refunds?", zh: "可以退款嗎？" },
        a: {
          en: "Because you only pay after you've reviewed, revised and approved your website, all payments are final.",
          zh: "因為您是在審閱、修改並確認網站之後才付款，所有款項一經支付即不予退還。",
        },
      },
    ],
  },
  {
    title: { en: "Hosting, Domain & Email", zh: "託管、網域與郵箱" },
    items: [
      {
        q: { en: "What's included in hosting?", zh: "主機託管包含什麼？" },
        a: {
          en: "Fast, secure hosting with SSL — free, forever, with no monthly fees and no lock-in. Your website has no complicated back end, so when you need a change, we make it for you at $45 per edit, or you can join the Care Plan.",
          zh: "快速、安全、含 SSL 的託管——永久免費，沒有月費，不綁約。網站沒有複雜的後台，需要修改時由我們幫您改，每次 $45，或加入 Care Plan。",
        },
      },
      {
        home: 5,
        q: { en: "What if I need changes later? Can I reach you?", zh: "之後需要修改怎麼辦？找得到你們嗎？" },
        a: {
          en: "Always. Changes run through our automated system, so your requests are handled quickly — you're never stuck waiting on a busy freelancer who stopped replying. Edits are $45 each, or join the Care Plan — $135/year or $15/month (up to 2 small edits every month).",
          zh: "隨時都找得到。修改透過我們的自動化系統處理，速度很快——不會遇到忙碌的接案者不回訊息。每次修改 $45，或加入 Care Plan——每年 $135 或每月 $15（每月最多 2 次小修改）。",
        },
      },
      {
        q: { en: "What does the Care Plan cover?", zh: "Care Plan 包含什麼？" },
        a: {
          en: "For $135/year (or $15/month), you get up to 2 small edits every month: swap photos, update text, change your hero style, or even re-layout an existing page. It doesn't include new pages, new features or blog posts. It pays for itself after 3 edits.",
          zh: "每年 $135（或每月 $15），每月最多 2 次小修改：換照片、改文字、換 Hero 樣式，甚至重新排版現有頁面。不包含新頁面、新功能或 blog 文章。改 3 次就回本。",
        },
      },
      {
        q: { en: "Do I own my website?", zh: "網站是我的嗎？" },
        a: {
          en: "Yes. If you'd rather manage it yourself, we'll send you the complete website files as a ZIP you can host for free on Cloudflare, Netlify or Vercel.",
          zh: "是的。如果您想自己管理，我們會把完整網站檔案以 ZIP 交給您，您可以免費放在 Cloudflare、Netlify 或 Vercel 上。",
        },
      },
      {
        q: { en: "Can I keep my domain name?", zh: "可以保留我的網域嗎？" },
        a: {
          en: "Yes — you keep full ownership of your domain. After you approve and pay, we help connect it to your new website. If you can share access, we handle the setup for you. If not, we'll guide you step by step until everything is connected.",
          zh: "可以——網域始終完全屬於您。確認並付款後，我們會協助連接到新網站。如果您能共享權限，我們幫您設定；不行的話，我們會一步步引導您完成。",
        },
      },
      {
        q: { en: "Will my business email be affected?", zh: "我的企業郵箱會受影響嗎？" },
        a: {
          en: "Every business sets up email differently, so before we connect your domain, we check exactly how your email works today. Then we recommend the best option for you, so your email keeps running without interruption.",
          zh: "每家企業的郵箱設定都不一樣，所以在連接網域之前，我們會先確認您目前的郵箱是怎麼運作的，再為您推薦最好的方案，確保郵箱不中斷。",
        },
      },
      {
        q: { en: "What about my old website host (Wix, GoDaddy, etc.)?", zh: "原本的網站主機（Wix、GoDaddy 等）怎麼處理？" },
        a: {
          en: "Your old site stays live until your new one is ready. Once your new website is live, turn off your old plan's auto-renewal — we'll remind you.",
          zh: "新網站準備好之前，舊網站會持續上線。新網站上線後，記得關閉舊方案的自動續約——我們會提醒您。",
        },
      },
    ],
  },
  {
    title: { en: "After Launch", zh: "上線之後" },
    items: [
      {
        q: { en: "Will I lose my Google ranking?", zh: "Google 排名會掉嗎？" },
        a: {
          en: "We keep your page structure and basic SEO in place, and your new site loads faster on mobile, which Google likes. Advanced SEO is available as an add-on.",
          zh: "我們會保留頁面結構和基本 SEO，而且新網站在手機上載入更快，對 Google 更友善。進階 SEO 可另外加購。",
        },
      },
      {
        q: { en: "Can you add new pages or features later?", zh: "之後可以加新頁面或新功能嗎？" },
        a: {
          en: "Yes. New pages, booking forms, bilingual setup and other upgrades are available as add-ons. Every upgrade is quoted and approved before any work begins.",
          zh: "可以。新頁面、預約表單、雙語設定等升級都可以加購。所有升級在開始前都會先報價並經您確認。",
        },
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
export const HOME_FAQS: FaqItem[] = ALL_FAQS.filter((f) => f.home).sort((a, b) => (a.home ?? 0) - (b.home ?? 0));
