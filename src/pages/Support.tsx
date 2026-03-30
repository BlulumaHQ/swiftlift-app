import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SupportContent = () => {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    document.title = "Support — SwiftLift";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.functions.invoke("send-intake-confirmation", {
        body: {
          client_name: formData.get("name") as string,
          business_name: formData.get("subject") as string || "Support Request",
          client_email: formData.get("email") as string,
          service: "Support Request",
          message: formData.get("message") as string || "",
          form_type: "support",
        },
      });

      if (error) throw new Error(error.message || "Email sending failed");
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(lang === "en" ? "Something went wrong. Please try again." : "出了点问题。请重试。");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

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
            {lang === "en" ? "Get Help from SwiftLift" : "獲取SwiftLift幫助"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en"
              ? "Have a question or need assistance? Send us a message and we'll get back to you as soon as possible."
              : "有問題或需要幫助？給我們發送消息，我們會盡快回覆您。"}
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            {lang === "en"
              ? "For general questions or help, use this form. If you want free previews, please use the "
              : "如需一般问题或帮助，请使用此表单。如需免费预览，请使用首页的"}
            <a href="/#contact" className="text-primary hover:underline">
              {lang === "en" ? "preview request form on the Home page" : "预览申请表单"}
            </a>
            {lang === "en" ? "." : "。"}
          </p>

          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground font-display">
                {lang === "en" ? "Thanks — we received your message." : "谢谢 — 我们已收到您的消息。"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {lang === "en" ? "We'll get back to you as soon as possible." : "我们会尽快回复您。"}
              </p>
              <a
                href="/"
                className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors"
                style={{ backgroundColor: "#7F37AE" }}
              >
                {lang === "en" ? "Back to Home" : "返回首页"}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  {lang === "en" ? "Full Name" : "姓名"} <span className="text-destructive">*</span>
                </label>
                <input name="name" required placeholder={lang === "en" ? "Your full name" : "您的全名"} className={inputClass} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  {lang === "en" ? "Email" : "电子邮箱"} <span className="text-destructive">*</span>
                </label>
                <input name="email" type="email" required placeholder="you@email.com" className={inputClass} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  {lang === "en" ? "Subject" : "主题"} <span className="text-xs text-muted-foreground">({lang === "en" ? "optional" : "选填"})</span>
                </label>
                <input name="subject" placeholder={lang === "en" ? "What is this about?" : "关于什么问题？"} className={inputClass} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  {lang === "en" ? "Message" : "消息"} <span className="text-destructive">*</span>
                </label>
                <textarea name="message" required rows={5} placeholder={lang === "en" ? "How can we help?" : "我们能如何帮助您？"} className={`${inputClass} resize-y`} />
              </div>

              {submitError && (
                <p className="text-sm font-medium text-destructive">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors disabled:opacity-50"
                style={{ backgroundColor: "#7F37AE" }}
              >
                <Send size={16} />
                {submitting
                  ? (lang === "en" ? "Sending..." : "发送中...")
                  : (lang === "en" ? "Send Message" : "发送消息")}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

const Support = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <SupportContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default Support;
