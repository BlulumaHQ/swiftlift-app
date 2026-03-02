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
  }, []);

  const sections = lang === "en"
    ? [
        { title: "Introduction", content: "SwiftLift Studio respects your privacy and complies with applicable Canadian privacy laws." },
        { title: "Information We Collect", content: "We may collect:", list: ["Name, email address, and contact details", "Business information submitted through forms", "Project-related materials", "Payment confirmation data (processed securely by Stripe)", "Technical data such as IP address and browser type", "Analytics data"] },
        { title: "How We Collect Information", content: "Information is collected when you submit forms, communicate via email, purchase services, or use our website.\n\nCertain technical information may be collected automatically via cookies or analytics tools." },
        { title: "How We Use Information", content: "We use information to provide services, deliver previews and revisions, process payments, respond to inquiries, and improve website performance." },
        { title: "Third-Party Sharing", content: "We do not sell personal data.\n\nInformation may be shared with Stripe, hosting providers, CRM tools, and our parent company Bluluma Design for project fulfillment." },
        { title: "Cookies & Analytics", content: "We may use cookies and analytics tools to improve user experience. Users may disable cookies in their browser settings." },
        { title: "Data Retention", content: "We retain data only as long as necessary to fulfill services or comply with legal obligations." },
        { title: "Data Security", content: "We implement reasonable safeguards to protect your information." },
        { title: "Your Rights", content: "You may request access, correction, or deletion of your personal data by contacting hello@swiftlift.app.", hasEmail: true },
        { title: "International Transfers", content: "Some third-party services may process data outside Canada." },
        { title: "Contact", content: "SwiftLift Studio\nVancouver, BC, Canada\nEmail: hello@swiftlift.app", hasEmail: true },
      ]
    : [
        { title: "简介", content: "SwiftLift Studio尊重您的隐私，并遵守适用的加拿大隐私法律。" },
        { title: "我们收集的信息", content: "我们可能收集：", list: ["姓名、电子邮箱地址和联系方式", "通过表单提交的业务信息", "项目相关材料", "付款确认数据（通过Stripe安全处理）", "技术数据，如IP地址和浏览器类型", "分析数据"] },
        { title: "我们如何收集信息", content: "当您提交表单、通过电子邮件沟通、购买服务或使用我们的网站时，会收集相关信息。\n\n某些技术信息可能通过Cookie或分析工具自动收集。" },
        { title: "我们如何使用信息", content: "我们使用信息来提供服务、交付预览和修改、处理付款、回复咨询和改进网站性能。" },
        { title: "第三方共享", content: "我们不出售个人数据。\n\n信息可能与Stripe、托管提供商、CRM工具和我们的母公司Bluluma Design共享，用于项目交付。" },
        { title: "Cookie与分析", content: "我们可能使用Cookie和分析工具来改善用户体验。用户可以在浏览器设置中禁用Cookie。" },
        { title: "数据保留", content: "我们仅在履行服务或遵守法律义务所需的时间内保留数据。" },
        { title: "数据安全", content: "我们实施合理的安全措施来保护您的信息。" },
        { title: "您的权利", content: "您可以通过联系 hello@swiftlift.app 请求访问、更正或删除您的个人数据。", hasEmail: true },
        { title: "国际传输", content: "某些第三方服务可能在加拿大境外处理数据。" },
        { title: "联系方式", content: "SwiftLift Studio\n温哥华，不列颠哥伦比亚省，加拿大\n电子邮箱：hello@swiftlift.app", hasEmail: true },
      ];

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
            {lang === "en" ? "Privacy Policy" : "隐私政策"}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <div className="py-16 md:py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-black text-foreground font-display">
          {lang === "en" ? "SwiftLift Studio Privacy Policy" : "SwiftLift Studio 隐私政策"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{lang === "en" ? `Last Updated: ${import.meta.env.VITE_BUILD_DATE || "N/A"}` : `最后更新：${import.meta.env.VITE_BUILD_DATE || "N/A"}`}</p>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
          {sections.map((section, i) => (
            <section key={i}>
              <h3 className="text-lg font-bold text-foreground mb-2">{section.title}</h3>
              {section.content.split("\n\n").map((p, j) => (
                <p key={j} className={j > 0 ? "mt-2" : ""}>
                  {section.hasEmail
                    ? p.split("hello@swiftlift.app").map((part, k, arr) => (
                        <span key={k}>
                          {part}
                          {k < arr.length - 1 && (
                            <a href="mailto:hello@swiftlift.app" className="text-primary hover:underline">hello@swiftlift.app</a>
                          )}
                        </span>
                      ))
                    : p}
                </p>
              ))}
              {"list" in section && section.list && (
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
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
