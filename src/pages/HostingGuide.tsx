import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Server, Shield, Globe, Key } from "lucide-react";

const ClaimPreviewsCTA = () => {
  const { lang } = useLanguage();
  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href="/#contact"
        className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all hover:scale-105"
        style={{ backgroundColor: "#7F37AE" }}
      >
        {lang === "en" ? "Claim FREE Previews" : "领取免费预览"}
      </a>
      <Link
        to="/deployment"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
      >
        {lang === "en" ? "Already a client? Go to Deployment" : "已经是客户？前往部署页面"}
      </Link>
    </div>
  );
};

const HostingGuideContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Hosting Guide — SwiftLift";
  }, []);

  const domainSteps = lang === "en"
    ? [
        { step: "1", title: "Purchase a Domain", desc: "If you don't already have one, purchase a domain from a registrar like Namecheap, GoDaddy, or Google Domains." },
        { step: "2", title: "Access DNS Settings", desc: "Log in to your domain registrar and navigate to the DNS settings for your domain." },
        { step: "3", title: "Point to Hosting", desc: "Update your nameservers or add an A record pointing to your hosting provider (Netlify)." },
        { step: "4", title: "SSL Auto-Provisioned", desc: "Once DNS propagates (usually within a few hours), your SSL certificate will be automatically activated." },
      ]
    : [
        { step: "1", title: "购买域名", desc: "如果您还没有域名，可以从Namecheap、GoDaddy或Google Domains等注册商购买。" },
        { step: "2", title: "访问DNS设置", desc: "登录您的域名注册商，导航到域名的DNS设置。" },
        { step: "3", title: "指向托管", desc: "更新您的域名服务器或添加A记录，指向您的托管提供商（Netlify）。" },
        { step: "4", title: "SSL自动配置", desc: "DNS传播完成后（通常几小时内），您的SSL证书将自动激活。" },
      ];

  const ownershipItems = lang === "en"
    ? [
        "You own your domain — SwiftLift does not purchase or control your domain on your behalf.",
        "You control your hosting account — credentials and access remain yours.",
        "SwiftLift assists with initial setup — we help configure DNS and deploy your site.",
        "Third-party platform terms apply — hosting providers, domain registrars, and other services have their own terms of service.",
      ]
    : [
        "您拥有您的域名 — SwiftLift不会代您购买或控制您的域名。",
        "您控制您的托管账户 — 凭据和访问权限归您所有。",
        "SwiftLift协助初始设置 — 我们帮助配置DNS并部署您的网站。",
        "第三方平台条款适用 — 托管提供商、域名注册商和其他服务有各自的服务条款。",
      ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white font-display leading-tight"
          >
            {lang === "en" ? "Hosting & Deployment Guide" : "托管与部署指南"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en" ? "Understand how your SwiftLift website is launched and managed." : "了解您的SwiftLift网站是如何发布和管理的。"}
          </motion.p>
          <div className="mt-8">
            <ClaimPreviewsCTA />
          </div>
        </div>
      </section>

      {/* Section 1 — Free Hosting */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
              <Server size={24} style={{ color: "hsl(275 51% 46%)" }} />
            </div>
            <h2 className="text-2xl font-black text-foreground font-display">{lang === "en" ? "Free Hosting Option" : "免费托管方案"}</h2>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {lang === "en" ? "Your SwiftLift website can be hosted for free using Netlify's infrastructure. Here's what's included:" : "您的SwiftLift网站可以使用Netlify的基础设施免费托管。包含以下内容："}
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3"><Shield size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />{lang === "en" ? "Secure SSL certificate — your site runs on HTTPS automatically" : "安全SSL证书 — 您的网站自动运行在HTTPS上"}</li>
              <li className="flex items-start gap-3"><Globe size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />{lang === "en" ? "Fast global CDN — your site loads quickly for visitors worldwide" : "全球CDN加速 — 您的网站在全球范围内快速加载"}</li>
              <li className="flex items-start gap-3"><Server size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />{lang === "en" ? "No ongoing hosting fees — free tier covers most small business websites" : "无持续托管费用 — 免费版本满足大多数小企业网站需求"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 — Managed Hosting */}
      <section className="py-14 md:py-20" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
              <Shield size={24} style={{ color: "hsl(275 51% 46%)" }} />
            </div>
            <h2 className="text-2xl font-black text-foreground font-display">{lang === "en" ? "Managed Hosting Option" : "托管主机方案"}</h2>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {lang === "en" ? "For clients who want hands-off maintenance, our managed hosting upgrade includes:" : "对于希望免除维护烦恼的客户，我们的托管主机升级包括："}
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3"><Shield size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />{lang === "en" ? "Annual managed hosting with technical monitoring" : "年度托管主机及技术监控"}</li>
              <li className="flex items-start gap-3"><Server size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />{lang === "en" ? "Priority update support and deployment management" : "优先更新支持和部署管理"}</li>
              <li className="flex items-start gap-3"><Globe size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />{lang === "en" ? "3 minor content edits per year included" : "每年包含3次小型内容编辑"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3 — Domain Setup */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
              <Globe size={24} style={{ color: "hsl(275 51% 46%)" }} />
            </div>
            <h2 className="text-2xl font-black text-foreground font-display">{lang === "en" ? "Domain Setup Instructions" : "域名设置说明"}</h2>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {lang === "en" ? "Connecting your domain to your new website is straightforward. Here are the basic steps:" : "将您的域名连接到新网站非常简单。以下是基本步骤："}
            </p>
            <div className="space-y-4">
              {domainSteps.map((s) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: "#7F37AE" }}>{s.step}</span>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Ownership */}
      <section className="py-14 md:py-20" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
              <Key size={24} style={{ color: "hsl(275 51% 46%)" }} />
            </div>
            <h2 className="text-2xl font-black text-foreground font-display">{lang === "en" ? "Ownership & Responsibility" : "所有权与责任"}</h2>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm space-y-3">
            {ownershipItems.map((text, i) => (
              <p key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                <Shield size={14} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 section-brand-dark">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white font-display mb-6">{lang === "en" ? "Ready to Launch?" : "准备好发布了吗？"}</h2>
          <ClaimPreviewsCTA />
        </div>
      </section>
    </main>
  );
};

const HostingGuide = () => (
  <LanguageProvider>
    <CustomCursor />
    <Header />
    <HostingGuideContent />
    <Footer />
  </LanguageProvider>
);

export default HostingGuide;
