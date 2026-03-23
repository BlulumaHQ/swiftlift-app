import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Headphones, Zap, MonitorSmartphone, RefreshCw } from "lucide-react";

const HostingGuideContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = lang === "en" ? "Managed Hosting — SwiftLift" : "托管主机 — SwiftLift";
  }, [lang]);

  return (
    <main>
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2.2rem,5vw,3.4rem)] font-black text-white font-display leading-[1.15] tracking-tight"
          >
            {lang === "en" ? "Stop Worrying About Hosting Forever" : "从此不再为托管烦恼"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 text-white/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en"
              ? "We handle everything behind the scenes — so you never have to deal with servers, updates, or technical issues."
              : "我们在幕后处理一切 — 您无需面对服务器、更新或技术问题。"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10"
          >
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white btn-brand"
              style={{ backgroundColor: "hsl(275 51% 46%)" }}
            >
              {lang === "en" ? "Get My 2 Free Previews" : "获取我的2个免费预览"}
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-foreground font-display tracking-tight">
              {lang === "en" ? "Hosting Shouldn't Be Your Problem" : "托管不应该是您的问题"}
            </h2>
            <span className="section-underline section-underline--light mx-auto" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-10 space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed text-left max-w-lg mx-auto">
              <p>{lang === "en"
                ? "Most business owners don't want to deal with hosting. And they shouldn't have to."
                : "大多数企业主不想处理托管问题。他们也不应该处理。"}</p>
              <p>{lang === "en"
                ? "Confusing dashboards, plugin updates, security patches, random downtime — it all adds up to hours wasted on things that shouldn't break in the first place."
                : "复杂的控制面板、插件更新、安全补丁、随机宕机 — 这些加起来浪费了大量时间在本不应该出问题的事情上。"}</p>
              <p>{lang === "en"
                ? "You started a business to serve your customers — not to babysit a server."
                : "您创业是为了服务客户 — 而不是照看服务器。"}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3 — THE SOLUTION */}
      <section className="py-20 md:py-28" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-black text-foreground font-display tracking-tight">
                {lang === "en" ? "We Take Care of Everything" : "我们负责一切"}
              </h2>
              <span className="section-underline section-underline--light mx-auto" />
            </div>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {(lang === "en"
              ? [
                  { icon: ShieldCheck, title: "Secure hosting environment", desc: "Your website runs on fast, reliable infrastructure with SSL built in." },
                  { icon: RefreshCw, title: "Ongoing maintenance & updates", desc: "We keep everything running smoothly so you don't have to." },
                  { icon: Zap, title: "Performance optimization", desc: "Fast load times. No bloat. Optimized for every device." },
                  { icon: Headphones, title: "Monitoring & uptime support", desc: "We watch your site around the clock and fix issues before you notice." },
                  { icon: MonitorSmartphone, title: "No setup required", desc: "We handle everything from migration to launch. Zero effort on your end." },
                ]
              : [
                  { icon: ShieldCheck, title: "安全托管环境", desc: "您的网站运行在快速、可靠的基础设施上，内置SSL。" },
                  { icon: RefreshCw, title: "持续维护和更新", desc: "我们确保一切顺利运行，您无需操心。" },
                  { icon: Zap, title: "性能优化", desc: "快速加载。无冗余。针对每台设备优化。" },
                  { icon: Headphones, title: "监控和正常运行支持", desc: "我们全天候监控您的网站，在您发现之前修复问题。" },
                  { icon: MonitorSmartphone, title: "无需设置", desc: "我们处理从迁移到发布的一切。您零操作。" },
                ]
            ).map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
                    <item.icon size={20} style={{ color: "hsl(275 51% 46%)" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-foreground font-display tracking-tight">
              {lang === "en" ? "Simple and Automatic" : "简单且自动"}
            </h2>
            <span className="section-underline section-underline--light mx-auto" />
          </ScrollReveal>

          <div className="mt-14 space-y-10">
            {(lang === "en"
              ? [
                  { step: "1", text: "We build your website" },
                  { step: "2", text: "We host and maintain everything" },
                  { step: "3", text: "You focus on your business" },
                ]
              : [
                  { step: "1", text: "我们构建您的网站" },
                  { step: "2", text: "我们托管并维护一切" },
                  { step: "3", text: "您专注于您的业务" },
                ]
            ).map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex items-center gap-5 max-w-sm mx-auto">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full text-base font-black text-white flex-shrink-0"
                    style={{ backgroundColor: "hsl(275 51% 46%)" }}
                  >
                    {s.step}
                  </span>
                  <p className="text-foreground font-semibold text-base md:text-lg text-left">{s.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — PRICING (SUBTLE) */}
      <section className="py-20 md:py-28" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-md mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-foreground font-display tracking-tight">
              {lang === "en" ? "Simple, Transparent Pricing" : "简单透明的定价"}
            </h2>
            <span className="section-underline section-underline--light mx-auto" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 rounded-2xl border border-border bg-background p-8 shadow-sm">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {lang === "en" ? "Managed Hosting" : "托管主机"}
              </p>
              <p className="mt-4 text-4xl font-black text-foreground font-display">$15<span className="text-lg font-medium text-muted-foreground">/mo</span></p>
              <p className="mt-2 text-muted-foreground text-sm">
                {lang === "en" ? "or" : "或"} <span className="font-semibold text-foreground">$135/year</span>
              </p>
              <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
                {lang === "en"
                  ? "Most clients choose yearly and never think about hosting again."
                  : "大多数客户选择年付，从此不再为托管烦恼。"}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 6 — TRUST / REASSURANCE */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-foreground font-display tracking-tight">
              {lang === "en" ? "No Hidden Costs. No Surprises." : "无隐藏费用。无意外。"}
            </h2>
            <span className="section-underline section-underline--light mx-auto" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 space-y-5 max-w-sm mx-auto">
              {(lang === "en"
                ? ["No setup fees", "No technical maintenance required", "No unexpected charges"]
                : ["无设置费用", "无需技术维护", "无意外收费"]
              ).map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check size={20} className="flex-shrink-0" style={{ color: "hsl(275 51% 46%)" }} />
                  <p className="text-foreground font-medium text-base">{item}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="py-20 md:py-28 section-brand-dark">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
              {lang === "en" ? "Let SwiftLift Handle Everything" : "让SwiftLift处理一切"}
            </h2>
            <p className="mt-4 text-white/70 text-base leading-relaxed">
              {lang === "en"
                ? "We'll take care of everything — from design to hosting."
                : "我们负责一切 — 从设计到托管。"}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-10">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: "hsl(275 51% 46%)" }}
              >
                {lang === "en" ? "Get My 2 Free Previews" : "获取我的2个免费预览"}
              </a>
            </div>
          </ScrollReveal>
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
