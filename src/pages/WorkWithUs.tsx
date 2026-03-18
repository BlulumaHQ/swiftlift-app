import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { supabase } from "@/integrations/supabase/client";

const WorkWithUsContent = () => {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);

    try {
      await fetch("https://formspree.io/f/mbdabbql", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          subject: "Designer Inquiry",
          message: `Designer Inquiry\n\nName: ${fd.get("name")}\nEmail: ${fd.get("email")}\nPortfolio: ${fd.get("portfolio") || "N/A"}\nMessage: ${fd.get("message")}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(275_51%_46%)]/30 focus:border-[hsl(275_51%_46%)] transition-all";

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-xl mx-auto px-6">
        <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black text-foreground font-display leading-tight">
          {lang === "en" ? "Work With Us" : "與我們合作"}
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {lang === "en"
            ? "We're always looking for talented designers to collaborate with. If you're interested in working with SwiftLift or learning more about our system, reach out below."
            : "我們一直在尋找有才華的設計師進行合作。如果您有興趣與 SwiftLift 合作或了解更多關於我們系統的信息，請在下方聯繫我們。"}
        </p>

        {submitted ? (
          <div className="mt-12 rounded-2xl border border-border bg-secondary/50 p-10 text-center">
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "hsl(275 51% 46% / 0.1)" }}>
              <svg className="w-7 h-7" style={{ color: "hsl(275 51% 46%)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {lang === "en" ? "Thanks for reaching out." : "感謝您的聯繫。"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "en"
                ? "We'll review your information and get back to you if there's a fit."
                : "我們會審查您的信息，如果合適會與您聯繫。"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {lang === "en" ? "Name" : "姓名"} *
              </label>
              <input name="name" required className={inputClass} placeholder={lang === "en" ? "Your name" : "您的姓名"} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {lang === "en" ? "Email" : "電子郵件"} *
              </label>
              <input name="email" type="email" required className={inputClass} placeholder={lang === "en" ? "you@example.com" : "you@example.com"} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {lang === "en" ? "Portfolio / Website" : "作品集 / 網站"}
              </label>
              <input name="portfolio" className={inputClass} placeholder={lang === "en" ? "https://yourportfolio.com" : "https://yourportfolio.com"} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {lang === "en" ? "Message" : "留言"} *
              </label>
              <textarea name="message" required rows={4} className={inputClass + " min-h-[120px] resize-none"} placeholder={lang === "en" ? "Tell us about yourself and how you'd like to collaborate…" : "告訴我們您自己以及您希望如何合作…"} />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl py-4 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "hsl(275 51% 46%)" }}
            >
              {submitting
                ? (lang === "en" ? "Submitting…" : "提交中…")
                : (lang === "en" ? "Submit Inquiry" : "提交詢問")}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

const WorkWithUs = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <CustomCursor />
      <Header />
      <WorkWithUsContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default WorkWithUs;
