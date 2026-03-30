import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqItems = [
  {
    q: { en: "How do the FREE previews work?", zh: "免费预览是如何运作的？" },
    a: { en: "Submit your company name, logo, and business details. Within 48 hours, you'll receive two fully designed, live homepage preview links — viewable on desktop and mobile.\n\nThese are functional previews built specifically around your business structure. There is no payment required to receive them.", zh: "提交您的公司名稱、標誌和業務資訊。48小時內，您將收到兩個專為您的業務量身設計的即時首頁預覽連結——可在桌面和移動裝置上查看。\n\n這些是圍繞您的業務結構專門構建的功能預覽。無需支付任何費用即可獲取。" },
  },
  {
    q: { en: "What happens after I choose a concept?", zh: "选择方案后会发生什么？" },
    a: { en: "Once you select your preferred preview direction, you choose your package and submit payment. We then expand that concept into your full website build based on your selected tier.\n\nAll builds follow SwiftLift's structured system for speed, clarity, and consistency.", zh: "选定您心仪的预览方向后，选择套餐并提交付款。我们随后会根据您选择的套餐等级，将该方案扩展为完整的网站建设。\n\n所有建设均遵循SwiftLift的结构化系统，确保速度、清晰度和一致性。" },
  },
  {
    q: { en: "What happens to my current hosting or website?", zh: "我目前的托管或网站会怎样？" },
    a: { en: "We take care of everything for you.\n\nIf your website is on Wix, Squarespace, or WordPress, we rebuild and launch your new site seamlessly.\n\nNo need to cancel anything upfront. Your existing website stays live until you're ready to switch.\n\nWe guide you step by step to ensure a smooth transition.", zh: "我们会为您处理一切。\n\n如果您的网站在Wix、Squarespace或WordPress上，我们会无缝地重建并启动您的新网站。\n\n无需提前取消任何东西。您的现有网站会保持上线状态，直到您准备好切换。\n\n我们会一步步引导您，确保顺利过渡。" },
  },
  {
    q: { en: "Can I use my own domain name?", zh: "可以使用自己的域名吗？" },
    a: { en: "Yes. You may use your existing domain or purchase a new one. You remain the owner of your domain at all times.\n\nWe provide simple instructions to connect your domain during deployment.", zh: "可以。您可以使用现有域名或购买新域名。域名始终归您所有。\n\n我们会提供简单的说明，帮助您在部署过程中连接域名。" },
  },
  {
    q: { en: "Do I need hosting?", zh: "我需要托管吗？" },
    a: { en: "We provide a free hosting option or an optional managed hosting upgrade. Hosting subscriptions begin upon activation.\n\nYou may also choose to host independently if preferred.", zh: "我们提供免费的托管方案或可选的托管主机升级。托管订阅在激活后开始。\n\n如果您愿意，也可以选择自行托管。" },
  },
  {
    q: { en: "Can I host the website myself?", zh: "我可以自己托管网站吗？" },
    a: { en: "Yes — if you prefer to use your own hosting, just let us know before we launch. We'll package your complete website files and send them to you as a zip file so you can deploy wherever you'd like. No lock-in, no restrictions.", zh: "可以 — 如果您更喜欢使用自己的托管，只需在启动前告知我们。我们将打包您的完整网站文件，以zip文件形式发送给您，您可以部署到任何您想要的地方。无锁定，无限制。" },
  },
  {
    q: { en: "What about refunds?", zh: "关于退款政策？" },
    a: { en: "Because of the structured and digital nature of our services, payments are non-refundable once development begins after preview selection.\n\nSelecting a package and submitting payment confirms approval to proceed.", zh: "由于我们服务的结构化和数字化特性，一旦在预览选择后开始开发，款项将不予退还。\n\n选择套餐并提交付款即表示确认同意继续。" },
  },
  {
    q: { en: "Is there a satisfaction guarantee?", zh: "有满意保证吗？" },
    a: { en: "Yes — our guarantee is built into the process. You receive two free live previews before making any purchase decision.\n\nThis ensures you approve the direction before committing.", zh: "是的——我们的保证已融入流程之中。在做出任何购买决定之前，您会收到两个免费的实时预览。\n\n这确保您在承诺之前认可方向。" },
  },
  {
    q: { en: "Can I request future updates?", zh: "可以请求后续更新吗？" },
    a: { en: "Yes. After launch, you may request structured upgrades such as booking integrations, calculators, multilingual setup, CRM tools, and more.\n\nMore advanced custom features require a custom quote.\n\nAll upgrades must be approved and paid before development begins.", zh: "可以。上线后，您可以请求结构化升级，如预约集成、计算器、多语言设置、CRM工具等。\n\n更高级的自定义功能需要定制报价。\n\n所有升级必须在开发开始前获得批准并支付费用。" },
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
            {lang === "en" ? "Frequently Asked Questions" : "常见问题"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[1.05rem] md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            {lang === "en" ? "Everything you need to know before and after your free preview." : "关于免费预览前后您需要了解的一切。"}
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
      <CustomCursor />
      <Header />
      <FaqContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default Faq;
