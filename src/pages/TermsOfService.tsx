import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const TermsContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Terms of Service — SwiftLift";
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://swiftlift.app/terms");
    return () => { canonical?.setAttribute("href", "https://swiftlift.app/"); };
  }, []);

  return (
    <main>
      {/* Blue Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white font-display leading-tight"
          >
            {lang === "en" ? "Terms of Service" : "服務條款"}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <div className="py-16 md:py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-black text-foreground font-display">
          {lang === "en" ? "Terms of Service" : "服務條款"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {lang === "en" ? "Effective Date: March 24, 2026" : "生效日期：2026年3月24日"}
        </p>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
          <p>
            {lang === "en"
              ? "Welcome to SwiftLift."
              : "歡迎來到 SwiftLift。"}
          </p>
          <p>
            {lang === "en"
              ? 'SwiftLift is a website service platform operated by Bluluma Design ("Bluluma", "we", "us", or "our"). By accessing or using our services, you agree to the following terms.'
              : 'SwiftLift 是由 Bluluma Design（「Bluluma」、「我們」）運營的網站服務平台。使用我們的服務即表示您同意以下條款。'}
          </p>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "1. Services" : "1. 服務"}
            </h3>
            <p>
              {lang === "en"
                ? "SwiftLift provides website design, development, and related digital services. All services are delivered under the operational management of Bluluma Design."
                : "SwiftLift 提供網站設計、開發及相關數位服務。所有服務均由 Bluluma Design 運營管理。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "2. Payments" : "2. 付款"}
            </h3>
            <p>
              {lang === "en"
                ? "All payments are securely processed by Bluluma Design. By purchasing any service through SwiftLift, you acknowledge that the legal entity processing your payment is Bluluma Design."
                : "所有付款均由 Bluluma Design 安全處理。通過 SwiftLift 購買任何服務，即表示您確認處理付款的法律實體為 Bluluma Design。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "3. Project Scope" : "3. 項目範圍"}
            </h3>
            <p>
              {lang === "en"
                ? "Each package includes specific deliverables as outlined on the website. Any additional revisions or services beyond the included scope may require additional fees."
                : "每個套餐包含網站上所列的具體交付物。超出所含範圍的任何額外修改或服務可能需要額外費用。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "4. Revisions" : "4. 修改"}
            </h3>
            <p>
              {lang === "en"
                ? "Revision limits depend on the purchased package. Additional revisions can be requested at an additional cost."
                : "修改次數取決於所購套餐。可以額外付費申請額外修改。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "5. Delivery Timeline" : "5. 交付時間"}
            </h3>
            <p>
              {lang === "en"
                ? "Estimated timelines are provided but may vary depending on project complexity and client responsiveness."
                : "提供預計時間表，但可能因項目複雜性和客戶回應速度而有所不同。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "6. Refund Policy" : "6. 退款政策"}
            </h3>
            <p>
              {lang === "en"
                ? "Due to the nature of digital services, all sales are final unless otherwise agreed in writing."
                : "由於數位服務的性質，所有銷售均為最終交易，除非另有書面約定。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "7. Intellectual Property" : "7. 知識產權"}
            </h3>
            <p>
              {lang === "en"
                ? "Upon full payment, the final website design and content will be transferred to the client, excluding any third-party assets or licensed materials."
                : "全額付款後，最終網站設計和內容將轉移給客戶，但不包括任何第三方資產或授權材料。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "8. Limitation of Liability" : "8. 責任限制"}
            </h3>
            <p>
              {lang === "en"
                ? "Bluluma Design shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services."
                : "Bluluma Design 不對因使用我們服務而產生的任何間接、附帶或後果性損害負責。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "9. Modifications" : "9. 修訂"}
            </h3>
            <p>
              {lang === "en"
                ? "We reserve the right to update these terms at any time without prior notice."
                : "我們保留隨時更新這些條款的權利，恕不另行通知。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "10. Contact" : "10. 聯繫方式"}
            </h3>
            <p>
              {lang === "en"
                ? "For any questions, please contact: "
                : "如有任何問題，請聯繫："}
              <a href="mailto:support@swiftlift.app" className="text-primary hover:underline">support@swiftlift.app</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

const TermsOfService = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <TermsContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default TermsOfService;
