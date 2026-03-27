import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";

const PrivacyContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Privacy Policy — SwiftLift";
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://swiftlift.app/privacy");
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
            {lang === "en" ? "Privacy Policy" : "隱私政策"}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <div className="py-16 md:py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-black text-foreground font-display">
          {lang === "en" ? "Privacy Policy" : "隱私政策"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {lang === "en" ? "Effective Date: March 24, 2026" : "生效日期：2026年3月24日"}
        </p>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
          <p>
            {lang === "en"
              ? "SwiftLift is operated by Bluluma Design. This Privacy Policy explains how we collect, use, and protect your information."
              : "SwiftLift 由 Bluluma Design 運營。本隱私政策說明我們如何收集、使用和保護您的資訊。"}
          </p>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "1. Information We Collect" : "1. 我們收集的資訊"}
            </h3>
            <p>
              {lang === "en"
                ? "We may collect personal information such as your name, email address, business details, and website URL when you submit forms on our website."
                : "當您在我們的網站上提交表單時，我們可能會收集個人資訊，例如您的姓名、電子郵件地址、業務詳情和網站網址。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "2. How We Use Information" : "2. 我們如何使用資訊"}
            </h3>
            <p className="mb-2">
              {lang === "en" ? "We use your information to:" : "我們使用您的資訊來："}
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{lang === "en" ? "Provide services" : "提供服務"}</li>
              <li>{lang === "en" ? "Communicate with you" : "與您溝通"}</li>
              <li>{lang === "en" ? "Improve our platform" : "改善我們的平台"}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "3. Payment Information" : "3. 付款資訊"}
            </h3>
            <p>
              {lang === "en"
                ? "All payments are processed securely through third-party providers. SwiftLift does not store your payment details."
                : "所有付款均通過第三方提供商安全處理。SwiftLift 不會儲存您的付款詳情。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "4. Data Sharing" : "4. 資料共享"}
            </h3>
            <p>
              {lang === "en"
                ? "We do not sell or share your personal data with third parties, except as necessary to provide our services."
                : "我們不會向第三方出售或分享您的個人資料，除非為提供服務所必需。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "5. Cookies" : "5. Cookies"}
            </h3>
            <p>
              {lang === "en"
                ? "Our website may use cookies to enhance user experience and track analytics."
                : "我們的網站可能使用 Cookie 來增強用戶體驗和追蹤分析。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "6. Data Security" : "6. 資料安全"}
            </h3>
            <p>
              {lang === "en"
                ? "We implement reasonable security measures to protect your information."
                : "我們實施合理的安全措施來保護您的資訊。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "7. Third-Party Services" : "7. 第三方服務"}
            </h3>
            <p>
              {lang === "en"
                ? "We may use third-party tools (e.g., analytics, payment processors) that have their own privacy policies."
                : "我們可能使用具有自己隱私政策的第三方工具（例如分析工具、支付處理器）。"}
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {lang === "en" ? "8. Contact" : "8. 聯繫方式"}
            </h3>
            <p>
              {lang === "en"
                ? "If you have any questions, contact: "
                : "如有任何問題，請聯繫："}
              <a href="mailto:support@swiftlift.app" className="text-primary hover:underline">support@swiftlift.app</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

const PrivacyPolicy = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <CustomCursor />
      <Header />
      <PrivacyContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default PrivacyPolicy;
