import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";

const TermsContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Terms of Service — SwiftLift";
  }, []);

  const sections = lang === "en"
    ? [
        { title: "Services", paragraphs: ["SwiftLift Studio provides structured website design and integration services. Our services are built using predefined layout systems, templates, and third-party integrations.", "SwiftLift Studio does not provide custom software development, custom backend engineering, proprietary system architecture, or multi-user database systems unless explicitly agreed to in writing under a separate contract.", "We provide:"], list: ["Rapid homepage previews", "Structured website builds", "Optional fixed-price feature integrations", "Premium custom project consultations"] },
        { title: "Free Previews", paragraphs: ["Two homepage previews may be provided at no cost and no obligation. Previews remain the intellectual property of SwiftLift Studio unless a package is purchased."] },
        { title: "Payment & Delivery", paragraphs: ["Payment is required before development begins.", "Delivery timelines begin once payment has cleared and required materials have been received.", "All payments are processed securely through Stripe or approved payment processors."] },
        { title: "Revision Policy", paragraphs: ["Each package includes a defined revision structure.", "Clients must submit revisions in one consolidated submission via the designated revision page.", "Additional revisions beyond the included scope may incur additional charges.", "Changes that significantly alter the original project direction, structure, or scope may be treated as a new project or upgrade request."] },
        { title: "Fixed-Price Add-Ons", paragraphs: ["Optional fixed-price add-ons may be offered such as booking integrations, calculators, CRM integrations, multilingual setup, or e-commerce integrations.", "Add-on work begins only after payment is received.", "Fixed-price add-ons include setup and integration only. They do not include custom software engineering or third-party subscription costs unless explicitly stated.", "Add-on payments are non-refundable once integration work has commenced."] },
        { title: "Custom Feature Requests", paragraphs: ["Requests not listed in fixed-price add-ons require a separate written quote.", "No custom feature development will begin without written approval and confirmed payment.", "SwiftLift Studio reserves the right to decline requests outside its structured service model."] },
        { title: "Third-Party Services", paragraphs: ["Websites may integrate with third-party tools including hosting providers, booking platforms, IDX providers, CRM platforms, payment processors, and email systems.", "Clients are responsible for maintaining subscriptions and complying with third-party terms.", "SwiftLift Studio is not liable for interruptions or changes made by third-party providers."] },
        { title: "Intellectual Property", paragraphs: ["Upon full payment, the client owns the final website design created for their project.", "SwiftLift Studio retains the right to display completed projects in its portfolio unless otherwise agreed in writing."] },
        { title: "Refund Policy", paragraphs: ["Payments are non-refundable once development begins.", "Payment constitutes approval of concept and project direction."] },
        { title: "Limitation of Liability", paragraphs: ["SwiftLift Studio shall not be liable for third-party failures, hosting downtime, content inaccuracies, or indirect damages.", "Total liability shall not exceed the total amount paid for the service."] },
        { title: "Governing Law", paragraphs: ["These Terms are governed by the laws of British Columbia, Canada."] },
        { title: "Contact", paragraphs: ["SwiftLift Studio\nVancouver, BC, Canada\nEmail: support@swiftlift.app"], hasEmail: true },
      ]
    : [
        { title: "服务", paragraphs: ["SwiftLift Studio提供结构化的网站设计和集成服务。我们的服务使用预定义的布局系统、模板和第三方集成构建。", "SwiftLift Studio不提供定制软件开发、定制后端工程、专有系统架构或多用户数据库系统，除非在单独的合同中明确以书面形式同意。", "我们提供："], list: ["快速首页预览", "结构化网站建设", "可选的固定价格功能集成", "高级定制项目咨询"] },
        { title: "免费预览", paragraphs: ["可免费提供两个首页预览，无任何义务。除非购买了套餐，否则预览仍为SwiftLift Studio的知识产权。"] },
        { title: "付款与交付", paragraphs: ["开发开始前需要付款。", "交付时间从付款清算和收到所需材料后开始计算。", "所有付款均通过Stripe或经批准的支付处理器安全处理。"] },
        { title: "修改政策", paragraphs: ["每个套餐包含定义的修改结构。", "客户必须通过指定的修改页面以一次整合提交的方式提交修改。", "超出所含范围的额外修改可能会产生额外费用。", "显著改变原始项目方向、结构或范围的变更可能会被视为新项目或升级请求。"] },
        { title: "固定价格附加服务", paragraphs: ["可提供可选的固定价格附加服务，如预约集成、计算器、CRM集成、多语言设置或电子商务集成。", "附加服务仅在收到付款后开始。", "固定价格附加服务仅包括设置和集成。除非明确说明，否则不包括定制软件工程或第三方订阅费用。", "一旦集成工作开始，附加服务的付款不可退还。"] },
        { title: "定制功能请求", paragraphs: ["未在固定价格附加服务中列出的请求需要单独的书面报价。", "未经书面批准和确认付款，不会开始任何定制功能开发。", "SwiftLift Studio保留拒绝超出其结构化服务模式的请求的权利。"] },
        { title: "第三方服务", paragraphs: ["网站可能会与第三方工具集成，包括托管提供商、预约平台、IDX提供商、CRM平台、支付处理器和电子邮件系统。", "客户有责任维护订阅并遵守第三方条款。", "SwiftLift Studio对第三方提供商造成的中断或更改不承担责任。"] },
        { title: "知识产权", paragraphs: ["全额付款后，客户拥有为其项目创建的最终网站设计。", "SwiftLift Studio保留在其作品集中展示已完成项目的权利，除非另有书面约定。"] },
        { title: "退款政策", paragraphs: ["一旦开发开始，付款不可退还。", "付款即构成对概念和项目方向的批准。"] },
        { title: "责任限制", paragraphs: ["SwiftLift Studio对第三方故障、托管停机、内容不准确或间接损害不承担责任。", "总责任不超过为服务支付的总金额。"] },
        { title: "管辖法律", paragraphs: ["这些条款受加拿大不列颠哥伦比亚省法律管辖。"] },
        { title: "聯絡方式", paragraphs: ["SwiftLift Studio\n溫哥華，不列顛哥倫比亞省，加拿大\n電子郵箱：support@swiftlift.app"], hasEmail: true },
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
            {lang === "en" ? "Terms of Service" : "服务条款"}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <div className="py-16 md:py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-black text-foreground font-display">
          {lang === "en" ? "SwiftLift Studio Terms of Service" : "SwiftLift Studio 服务条款"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{lang === "en" ? `Last Updated: ${import.meta.env.VITE_BUILD_DATE || "N/A"}` : `最后更新：${import.meta.env.VITE_BUILD_DATE || "N/A"}`}</p>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
          {sections.map((section, i) => (
            <section key={i}>
              <h3 className="text-lg font-bold text-foreground mb-2">{section.title}</h3>
              {section.paragraphs.map((p, j) => (
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

const TermsOfService = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <CustomCursor />
      <Header />
      <TermsContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default TermsOfService;
