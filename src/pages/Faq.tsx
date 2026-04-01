import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqItems = [
  {
    q: { en: "Is this really free to start?", zh: "真的可以免費開始嗎？" },
    a: { en: "Yes. Submitting your request costs nothing. We build two complete, live website versions for you to browse — on desktop and mobile — before you make any decision. You only pay when you've chosen a direction you love.", zh: "是的。提交請求完全免費。我們會為您建立兩個完整的即時網站版本，供您在桌面和手機上瀏覽——在您做出任何決定之前。只有當您選定了喜歡的方向後才需要付款。" },
  },
  {
    q: { en: "How do the free previews work?", zh: "免費預覽是如何運作的？" },
    a: { en: "Submit your website URL and a few basic details about your business. Within 48 hours, you'll receive two fully built, clickable website versions — not mockups, not screenshots. Real working sites you can browse on any device, especially mobile. No payment, no commitment required to receive them.", zh: "提交您的網站網址和一些基本業務資訊。48小時內，您將收到兩個完整建立的可點擊網站版本——不是模型，不是截圖。是真正可在任何設備上瀏覽的網站，尤其是手機。無需付款，無需承諾即可獲取。" },
  },
  {
    q: { en: "What if I already have a website?", zh: "如果我已經有網站呢？" },
    a: { en: "That's exactly what we specialize in. We rebuild your existing site into a faster, cleaner, mobile-optimized website designed to bring you more customers. A site that looks great on every device isn't just a bonus — it's a priority, since over 90% of visitors are browsing on their phones. Your existing site stays live throughout the entire process — we only switch over when you're ready.", zh: "這正是我們的專長。我們將您現有的網站重建為更快、更乾淨、針對手機優化的網站，旨在為您帶來更多客戶。在每台設備上看起來都很棒的網站不僅是加分項——而是優先事項，因為超過90%的訪客都在用手機瀏覽。您的現有網站在整個過程中保持上線——我們只在您準備好時才切換。" },
  },
  {
    q: { en: "I don't have a website yet. Can you still help me?", zh: "我還沒有網站。你們還能幫我嗎？" },
    a: { en: "SwiftLift specializes in rebuilding and upgrading existing websites. If you're starting from scratch and need a brand new website built, we'd love to help — please visit our Custom Quote page and we'll put together a proposal tailored to your needs.", zh: "SwiftLift專注於重建和升級現有網站。如果您從零開始需要建立全新網站，我們很樂意幫助——請訪問我們的定制報價頁面，我們將為您量身定制方案。" },
  },
  {
    q: { en: "What kind of websites do you build?", zh: "你們建什麼類型的網站？" },
    a: { en: "We build fast, modern static websites — clean code that loads quickly, ranks well on Google, and looks sharp on every screen size. Mobile-responsive design is built into every project by default. Static websites are ideal for business websites, service pages, landing pages, and professional portfolios. They are not suitable for e-commerce stores or sites requiring a shopping cart or product database. If you need e-commerce functionality, please visit our Custom Quote page.", zh: "我們建立快速、現代的靜態網站——乾淨的代碼，載入迅速，在Google上排名良好，在每個螢幕尺寸上都清晰銳利。每個項目默認內建手機響應式設計。靜態網站非常適合企業網站、服務頁面、著陸頁和專業作品集。不適用於電子商務商店或需要購物車或產品數據庫的網站。如需電子商務功能，請訪問我們的定制報價頁面。" },
  },
  {
    q: { en: "Where is my website hosted? Are there hidden fees?", zh: "我的網站託管在哪裡？有隱藏費用嗎？" },
    a: { en: "All SwiftLift websites are hosted on Netlify — one of the most reliable hosting platforms available. Your hosting is completely free with no monthly fees, and we will never use hosting costs to lock you in. If you prefer to manage your own hosting, we'll deliver your complete website as a ZIP file. You can then deploy it yourself on either Netlify or Vercel — both are free platforms and fully compatible with your site files.", zh: "所有SwiftLift網站都託管在Netlify——最可靠的託管平台之一。您的託管完全免費，無月費，我們絕不會用託管費用來綁住您。如果您偏好自行管理託管，我們會將完整網站以ZIP檔案交付。您可以自行部署在Netlify或Vercel上——兩者都是免費平台，完全兼容您的網站檔案。" },
  },
  {
    q: { en: "Can I use my own domain name?", zh: "可以使用自己的網域嗎？" },
    a: { en: "Yes. You keep full ownership of your domain at all times. Once your site is ready to launch, we'll help connect your domain to your new website. If you're able to share access with us, we'll handle the entire DNS and nameserver setup for you — the safest and fastest option. If two-factor authentication or account restrictions prevent direct access, we'll provide clear step-by-step instructions and guide you through the process personally until everything is connected correctly.", zh: "可以。您始終保有網域的完全所有權。網站準備就緒後，我們會幫助將您的網域連接到新網站。如果您能與我們共享存取權限，我們將為您處理整個DNS和名稱伺服器設置——最安全、最快的選項。如果雙重驗證或帳戶限制無法直接存取，我們會提供清晰的逐步說明，並親自引導您完成整個過程，直到一切正確連接。" },
  },
  {
    q: { en: "What about my existing email? Will it be affected?", zh: "我現有的電子郵件呢？會受影響嗎？" },
    a: { en: "This is important to understand before switching. Our websites do not include email hosting. If your current hosting provider includes a business email address such as info@yourbusiness.com, you must not cancel that hosting until your email has been moved to an independent email provider such as Google Workspace or Zoho Mail. We will flag this during your launch process and help you understand your options so nothing gets interrupted.", zh: "在切換之前了解這一點很重要。我們的網站不包含電子郵件託管。如果您目前的託管提供商包含企業電子郵件地址（如info@yourbusiness.com），在將電子郵件遷移到獨立電子郵件提供商（如Google Workspace或Zoho Mail）之前，請勿取消該託管。我們會在上線過程中提醒您，並幫助您了解選項，確保不會中斷任何服務。" },
  },
  {
    q: { en: "What about revisions and updates?", zh: "修改和更新怎麼辦？" },
    a: { en: "After launch, additional revisions are available at $45 USD per revision round. If you expect to update your site regularly, our Managed Hosting plan at $15 USD/month or $135 USD/year includes one free revision every month plus priority support — most clients find this pays for itself with the first update. More advanced additions such as booking integrations, multilingual setup, calculators, or CRM tools are available as custom upgrades and require a separate quote. All upgrades are approved and confirmed before any work begins.", zh: "上線後，額外修改每輪$45 USD。如果您預計定期更新網站，我們的託管方案每月$15 USD或每年$135 USD，包含每月一次免費修改和優先支援——大多數客戶發現第一次更新就回本了。更進階的功能如預約整合、多語言設置、計算器或CRM工具，可作為定制升級，需另行報價。所有升級在開始工作前均需確認和批准。" },
  },
  {
    q: { en: "What about refunds?", zh: "關於退款？" },
    a: { en: "Because you review two complete working websites before making any payment, the preview process is your approval step. Once you've selected a direction and submitted payment, work proceeds immediately — payments are non-refundable at that stage. If you have any hesitation, take your time reviewing both versions before committing.", zh: "因為您在付款前已審閱了兩個完整的網站，預覽過程就是您的批准步驟。一旦您選定方向並提交付款，工作立即開始——此階段款項不可退還。如有任何猶豫，請花時間審閱兩個版本後再做決定。" },
  },
  {
    q: { en: "Is there a satisfaction guarantee?", zh: "有滿意保證嗎？" },
    a: { en: "Yes — and it's built into how we work. You see both complete websites before spending a single dollar. You only pay for a direction you've already clicked through and approved. There are no surprises after payment.", zh: "是的——這已融入我們的工作方式。您在花一分錢之前就能看到兩個完整的網站。您只為已經點擊瀏覽並認可的方向付款。付款後沒有任何意外。" },
  },
];

const FaqContent = () => {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = "FAQ — SwiftLift";
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://swiftlift.app/faq");
    return () => { canonical?.setAttribute("href", "https://swiftlift.app/"); };
  }, []);

  return (
    <>
      {/* Blue Hero */}
      <section className="section-brand-dark pt-28 pb-14 md:pt-36 md:pb-20 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-white mb-4"
          >
            {lang === "en" ? "Frequently Asked Questions" : "常見問題"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[1.05rem] md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            {lang === "en" ? "Everything you need to know before and after your free preview." : "關於免費預覽前後您需要了解的一切。"}
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border border-border overflow-hidden bg-background transition-all ${isOpen ? "border-l-4 faq-expanded-bg" : ""}`}
                  style={isOpen ? { borderLeftColor: "hsl(275 51% 46%)" } : {}}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-foreground pr-4">{item.q[lang]}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                      className="flex-shrink-0"
                    >
                      <Plus size={18} style={{ color: "hsl(275 51% 46%)" }} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                          {item.a[lang]}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

const Faq = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background text-foreground">
      
      <Header />
      <FaqContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default Faq;
