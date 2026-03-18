import { useEffect, useMemo, useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Monitor, FileText, Zap, CheckCircle2, Clock, Mail, Copy, Palette, Globe } from "lucide-react";
import { getOrCreateProjectId } from "@/lib/projectId";

const ThankYouContent = () => {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [cloudLink, setCloudLink] = useState("");
  const projectId = useMemo(() => getOrCreateProjectId(), []);
  const email = useMemo(() => {
    try { return sessionStorage.getItem("swiftlift_email") || "your email"; } catch { return "your email"; }
  }, []);

  useEffect(() => {
    document.title = "Your Preview Request Is In — SwiftLift";
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: "hsl(275 51% 46% / 0.15)" }}
          >
            <CheckCircle2 size={32} style={{ color: "hsl(275 51% 46%)" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-black text-white font-display leading-tight"
          >
            {lang === "en" ? "Your Preview Request Is In" : "您的預覽請求已收到"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en"
              ? "We've received your website details and we're preparing your 2 preview directions now."
              : "我們已收到您的網站詳情，正在為您準備2個預覽方向。"}
          </motion.p>

          {/* Project ID Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-2.5"
          >
            <span className="text-white/70 text-sm font-medium">
              {lang === "en" ? "Project ID:" : "專案編號："}
            </span>
            <span className="text-white font-bold text-base tracking-wide font-mono">{projectId}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(projectId);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="ml-1 text-white/60 hover:text-white transition-colors"
              title="Copy"
            >
              {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            </button>
          </motion.div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-black text-foreground font-display text-center mb-8">
            {lang === "en" ? "What You'll Receive" : "您將收到"}
          </h2>

          <div className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} style={{ color: "hsl(275 51% 46%)" }} className="flex-shrink-0" />
              <span className="text-muted-foreground">
                {lang === "en" ? "Previews will be sent to:" : "預覽將發送至："}{" "}
                <span className="text-foreground font-medium">{email}</span>
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{lang === "en" ? "Version A — Clean & Professional" : "版本A — 簡潔專業"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{lang === "en" ? "Version B — Conversion Focused" : "版本B — 轉化導向"}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center gap-3">
              <Clock size={16} className="text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                {lang === "en" ? "Estimated delivery: Within 24–48 hours" : "預計交付：24–48小時內"}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            {lang === "en"
              ? "We'll send your previews to your email as soon as they're ready."
              : "預覽準備好後，我們會立即發送到您的電子郵箱。"}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "hsl(275 51% 46%)" }}
            >
              {lang === "en" ? "Back to Home" : "返回首页"}
            </Link>
          </div>
        </div>
      </section>

      {/* Optional: Better previews */}
      <section className="py-12 md:py-16" style={{ background: "hsl(var(--surface-sunken))" }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-lg md:text-xl font-black text-foreground font-display text-center mb-6">
            {lang === "en" ? "Want even better previews?" : "想要更精準的預覽？"}
          </h2>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <p className="text-sm text-muted-foreground mb-4">
              {lang === "en"
                ? "(Optional) Help us create more accurate designs for your business:"
                : "（選填）幫助我們為您的業務創建更精準的設計："}
            </p>
            <ul className="space-y-3">
              {[
                { icon: Palette, text: lang === "en" ? "Share your logo (SVG/PNG) and brand colors" : "分享您的標誌（SVG/PNG）和品牌顏色" },
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
                {lang === "en" ? "Optional: Paste a cloud folder link (Google Drive / Dropbox)" : "選填：貼上雲端資料夾連結"}
              </label>
              <input
                type="url"
                value={cloudLink}
                onChange={(e) => setCloudLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors"
              />
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center italic">
              {lang === "en"
                ? "All fields above are optional — you can skip this step."
                : "以上所有欄位均為選填——您可以跳過此步驟。"}
            </p>
          </div>
        </div>
      </section>

      {/* Contact note */}
      <section className="py-8 md:py-12 bg-background">
        <div className="max-w-2xl mx-auto px-6">
          <div className="rounded-xl border border-border bg-background p-5 flex items-start gap-3">
            <Mail size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {lang === "en" ? "Need to update something?" : "需要更新內容？"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {lang === "en"
                  ? "Reply to our email or contact us at "
                  : "回覆我們的電子郵件或聯絡 "}
                <a href="mailto:support@swiftlift.app" className="text-primary hover:underline">support@swiftlift.app</a>
                {lang === "en"
                  ? ". Please include your Project ID so we can quickly locate your request."
                  : "。請附上您的專案編號以便快速找到您的請求。"}
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
