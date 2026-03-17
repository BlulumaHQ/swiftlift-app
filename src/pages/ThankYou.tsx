import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Monitor, FileText, Zap, CheckCircle2, Clock, ArrowRight, Upload, Palette, Globe, Mail } from "lucide-react";
import { useState } from "react";

const ThankYouContent = () => {
  const { lang } = useLanguage();
  const [cloudLink, setCloudLink] = useState("");

  useEffect(() => {
    document.title = "Request Received — SwiftLift";
  }, []);

  const cards = [
    {
      icon: Monitor,
      title: lang === "en" ? "2 Live Preview Links" : "2個即時預覽連結",
      text: lang === "en"
        ? "Two functional homepage previews you can click through and view on desktop + mobile."
        : "兩個功能齊全的首頁預覽，可在桌面和移動裝置上查看。",
    },
    {
      icon: FileText,
      title: lang === "en" ? "Your Copy Included" : "包含您的文案",
      text: lang === "en"
        ? "We'll structure the preview using your company details and the information you submitted (not generic filler)."
        : "我們將使用您提交的公司資訊來構建預覽（而非通用內容）。",
    },
    {
      icon: Zap,
      title: lang === "en" ? "Fast Next Step" : "快速下一步",
      text: lang === "en"
        ? "Reply with your chosen preview + your revision notes, and we'll proceed based on your package."
        : "回覆您選擇的預覽和修改意見，我們將根據您的套餐繼續。",
    },
  ];

  const steps = [
    {
      label: lang === "en" ? "Today: Request Submitted" : "今天：請求已提交",
      active: true,
    },
    {
      label: lang === "en" ? "Within 48 hours: 2 Live Previews Delivered by Email" : "48小時內：透過電子郵件發送2個即時預覽",
      note: lang === "en"
        ? "Check your inbox (and spam folder) for updates from support@swiftlift.app."
        : "請檢查您的收件匣（和垃圾郵件資料夾），查找來自 support@swiftlift.app 的更新。",
      active: false,
    },
    {
      label: lang === "en"
        ? "You Choose a Direction → We Build the Full Site (If you proceed)"
        : "您選擇方向 → 我們構建完整網站（如果您繼續）",
      active: false,
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-black text-white font-display leading-tight"
          >
            {lang === "en"
              ? "Request Received — Your 2 FREE Live Previews Are Coming"
              : "請求已收到 — 您的2個免費即時預覽即將到來"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en"
              ? "You can expect your preview concepts within 48 hours."
              : "您可以在48小時內收到預覽方案。"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-white/60 text-sm"
          >
            {lang === "en"
              ? "No calls required. Just review the previews and pick a direction."
              : "無需致電。只需查看預覽並選擇方向。"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ backgroundColor: "#7F37AE" }}
            >
              {lang === "en" ? "Back to Home" : "返回首页"}
            </Link>
            <a
              href="/#process"
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              {lang === "en" ? "View Our Process" : "查看我们的流程"}
            </a>
          </motion.div>
        </div>
      </section>

      {/* What You'll Receive — 3 Cards */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-black text-foreground font-display text-center mb-2">
            {lang === "en" ? "What You'll Receive" : "您将收到"}
          </h2>
          <div className="flex justify-center">
            <span className="section-underline section-underline--light" />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="rounded-2xl border border-border bg-background p-6 shadow-sm"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "hsl(275 51% 46% / 0.08)" }}
                  >
                    <Icon size={20} style={{ color: "hsl(275 51% 46%)" }} />
                  </div>
                  <h3 className="font-bold text-foreground font-display text-base">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-black text-foreground font-display text-center mb-2">
            {lang === "en" ? "Timeline" : "时间线"}
          </h2>
          <div className="flex justify-center">
            <span className="section-underline section-underline--light" />
          </div>

          <div className="mt-8 space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                {/* Stepper line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.active ? "text-white" : "border-2 border-muted-foreground/30 text-muted-foreground"
                    }`}
                    style={step.active ? { backgroundColor: "hsl(275 51% 46%)" } : {}}
                  >
                    {step.active ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px h-12 bg-border" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <p className={`text-sm font-semibold ${step.active ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                  {step.note && (
                    <p className="mt-1 text-xs text-muted-foreground">{step.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* While You Wait */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-black text-foreground font-display text-center mb-2">
            {lang === "en" ? "Want even better previews?" : "想要更精準的預覽？"}
          </h2>
          <div className="flex justify-center">
            <span className="section-underline section-underline--light" />
          </div>

          <p className="mt-4 text-sm text-muted-foreground text-center">
            {lang === "en"
              ? "(Optional) Help us create more accurate designs for your business:"
              : "（選填）幫助我們為您的業務創建更精準的設計："}
          </p>

          <div className="mt-6 rounded-2xl border border-border bg-background p-6 shadow-sm">
            <ul className="space-y-3">
              {[
                { icon: Palette, text: lang === "en" ? "Share your logo (SVG/PNG) and brand colors" : "分享您的標誌（SVG/PNG）和品牌顏色" },
                { icon: Palette, text: lang === "en" ? "Add 5–10 photos or describe your preferred style" : "添加5–10張照片或描述您偏好的風格" },
                { icon: Globe, text: lang === "en" ? "Send 2–3 websites you like" : "發送2–3個您喜歡的網站" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Icon size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                    {item.text}
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                {lang === "en" ? "Optional: Paste a cloud folder link (Google Drive / Dropbox)" : "選填：貼上雲端資料夾連結（Google Drive / Dropbox）"}
              </label>
              <input
                type="url"
                value={cloudLink}
                onChange={(e) => setCloudLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors"
              />
              <p className="text-xs text-muted-foreground">
                {lang === "en"
                  ? 'Make sure access is set to "Anyone with the link can view."'
                  : '確保存取權限設定為「任何擁有連結的人皆可檢視」。'}
              </p>
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center italic">
              {lang === "en"
                ? "All fields above are optional — you can skip this step."
                : "以上所有欄位均為選填——您可以跳過此步驟。"}
            </p>
          </div>
        </div>
      </section>

      {/* Confirmation Footer Note */}
      <section className="py-8 md:py-12" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="rounded-xl border border-border bg-background p-5 flex items-start gap-3">
            <Mail size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {lang === "en" ? "Need to update something you submitted?" : "需要更新您提交的内容？"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {lang === "en"
                  ? "Reply to our email or message us at "
                  : "回复我们的邮件或发送消息至 "}
                <a href="mailto:hello@swiftlift.app" className="text-primary hover:underline">hello@swiftlift.app</a>
                {lang === "en" ? " with your project name." : " 并附上您的项目名称。"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ThankYou = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <CustomCursor />
      <Header />
      <ThankYouContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default ThankYou;
