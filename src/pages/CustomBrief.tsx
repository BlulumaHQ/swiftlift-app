import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreviewSelector from "@/components/PreviewSelector";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { externalSupabase as supabase } from "@/lib/externalSupabase";
import { PRICING, formatPrice, formatRange } from "@/lib/pricing";

const FEATURES_EN = [
  "E-commerce / Online Store",
  "Booking / Appointment System",
  "Blog / Content Management",
  "Membership / Login Area",
  "Multilingual Support",
  "Custom Calculator or Tool",
  "CRM Integration",
  "IDX / MLS Integration",
  "Social Media Integration",
  "Email Marketing Setup",
  "SEO Optimization",
  "Analytics & Reporting",
];

const FEATURES_ZH = [
  "電子商務 / 在線商店",
  "預約 / 預訂系統",
  "博客 / 內容管理",
  "會員 / 登錄區域",
  "多語言支持",
  "自定義計算器或工具",
  "CRM 集成",
  "IDX / MLS 集成",
  "社交媒體集成",
  "郵件營銷設置",
  "SEO 優化",
  "數據分析與報告",
];

const TIMELINE_OPTIONS_EN = ["2–3 weeks", "1 month", "2 months", "Flexible / No rush"];
const TIMELINE_OPTIONS_ZH = ["2-3周", "1個月", "2個月", "靈活 / 不急"];

const CustomBriefContent = () => {
  const { lang } = useLanguage();
  const [searchParams] = useSearchParams();

  const imgA = searchParams.get("imgA");
  const imgB = searchParams.get("imgB");
  const linkA = searchParams.get("linkA");
  const linkB = searchParams.get("linkB");
  const previewParam = searchParams.get("preview");

  const hasPreviewCards = !!(imgA || imgB || linkA || linkB);

  useEffect(() => {
    document.title = "Custom Website Quote — SwiftLift";
  }, []);

  const [formLoadedAt] = useState(() => Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [selectedPreview, setSelectedPreview] = useState<"A" | "B" | null>(
    previewParam === "a" ? "A" : previewParam === "b" ? "B" : null
  );
  const [showPreviewError, setShowPreviewError] = useState(false);

  const features = lang === "en" ? FEATURES_EN : FEATURES_ZH;
  const timelineOptions = lang === "en" ? TIMELINE_OPTIONS_EN : TIMELINE_OPTIONS_ZH;

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasPreviewCards && !selectedPreview) {
      setShowPreviewError(true);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    const formData = new FormData(e.currentTarget);
    const previewLink = selectedPreview === "A" ? linkA : selectedPreview === "B" ? linkB : null;

    try {
      const { error } = await supabase.functions.invoke("send-intake-confirmation", {
        body: {
            _t: formLoadedAt,
            website_hp: (document.getElementById("website_hp") as HTMLInputElement | null)?.value || "",
          client_name: formData.get("fullName") as string,
          business_name: formData.get("businessName") as string,
          client_email: formData.get("email") as string,
          phone: formData.get("phone") as string || "",
          website: formData.get("currentWebsite") as string || "",
          service: "Custom Quote Request",
          message: `Project Description: ${formData.get("projectDescription") || ""}\nFeatures: ${selectedFeatures.join(", ") || "None"}\nTimeline: ${timeline || "Not specified"}\nCloud Link: ${formData.get("cloudLink") || "N/A"}\nSelected Preview: ${selectedPreview || "N/A"}\nPreview Link: ${previewLink || "N/A"}`,
          form_type: "custom_quote",
        },
      });

      if (error) throw new Error(error.message || "Email sending failed");

      setSubmitted(true);
      toast({
        title: lang === "en" ? "Quote Request Submitted" : "報價請求已提交",
        description: lang === "en" ? "We'll review your project and get back to you within 48 hours." : "我們將審核您的項目並在48小時內回覆您。",
      });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(lang === "en" ? "Something went wrong. Please try again." : "出了點問題。請重試。");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(267,55%,45%)]/40 transition-colors";

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
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white font-display leading-tight"
          >
            {lang === "en" ? "Tell Us About Your Project" : "告訴我們您的項目需求"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en"
              ? "Get a tailored website plan. We'll review your details and send you a custom proposal within 48 hours."
              : "獲取客製網站方案。我們將審核您的需求並在48小時內發送客製方案。"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-white/50 text-sm"
          >
            {lang === "en"
              ? `Business websites starting from ${formatPrice(PRICING.customBrief.businessWebsite.startingAt)} · E-commerce from ${formatPrice(PRICING.customBrief.ecommerceWebsite.startingAt)}`
              : `企業網站起價${formatPrice(PRICING.customBrief.businessWebsite.startingAt)} · 電商網站起價${formatPrice(PRICING.customBrief.ecommerceWebsite.startingAt)}`}
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-2xl mx-auto px-6">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground font-display">
                {lang === "en" ? "Quote Request Submitted!" : "報價請求已提交！"}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                {lang === "en"
                  ? "Thank you! We'll review your project details and send you a tailored proposal within 48 hours."
                  : "謝謝！我們將審核您的項目詳情並在48小時內發送客製方案。"}
              </p>
              <a
                href="/"
                className="sl-cta font-display mt-8 inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-base font-extrabold text-white transition-colors"
                
              >
                {lang === "en" ? "Back to Home" : "返回首頁"}
              </a>
            </div>
          ) : (
            <>
              {/* Pricing context */}
              <div className="rounded-2xl border border-border bg-[hsl(var(--surface-sunken))] p-5 md:p-6 mb-8">
                <h3 className="text-base font-bold text-foreground font-display mb-3">
                  {lang === "en" ? "Custom Website Pricing" : "客製網站價格"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-foreground">{lang === "en" ? "Business Website" : "企業網站"}</p>
                    <p className="text-muted-foreground mt-0.5">{lang === "en" ? `Starting from ${formatPrice(PRICING.customBrief.businessWebsite.startingAt)}` : `起價${formatPrice(PRICING.customBrief.businessWebsite.startingAt)}`}</p>
                    <p className="text-xs text-muted-foreground">{lang === "en" ? `Most projects: ${formatRange(PRICING.customBrief.businessWebsite.typicalRangeMin, PRICING.customBrief.businessWebsite.typicalRangeMax)}` : `大多數項目：${formatRange(PRICING.customBrief.businessWebsite.typicalRangeMin, PRICING.customBrief.businessWebsite.typicalRangeMax)}`}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{lang === "en" ? "E-commerce Website" : "電商網站"}</p>
                    <p className="text-muted-foreground mt-0.5">{lang === "en" ? `Starting from ${formatPrice(PRICING.customBrief.ecommerceWebsite.startingAt)}` : `起價${formatPrice(PRICING.customBrief.ecommerceWebsite.startingAt)}`}</p>
                    <p className="text-xs text-muted-foreground">{lang === "en" ? `Most projects: ${formatRange(PRICING.customBrief.ecommerceWebsite.typicalRangeMin, PRICING.customBrief.ecommerceWebsite.typicalRangeMax)}` : `大多數項目：${formatRange(PRICING.customBrief.ecommerceWebsite.typicalRangeMin, PRICING.customBrief.ecommerceWebsite.typicalRangeMax)}`}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
                  <label htmlFor="website_hp">Leave this field empty</label>
                  <input type="text" id="website_hp" name="website_hp" tabIndex={-1} autoComplete="off" defaultValue="" />
                </div>
                {/* Preview Selection (if query params present) */}
                {hasPreviewCards && (
                  <>
                    <PreviewSelector
                      imgA={imgA}
                      imgB={imgB}
                      linkA={linkA}
                      linkB={linkB}
                      selected={selectedPreview}
                      onSelect={(v) => { setSelectedPreview(v); setShowPreviewError(false); }}
                      showError={showPreviewError}
                    />
                    <div className="form-divider" />
                  </>
                )}

                {/* Section 1 — Project Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground font-display">
                      {lang === "en" ? "Project Information" : "項目信息"}
                    </h3>
                    <span className="section-underline section-underline--light" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Full Name" : "姓名"} <span className="text-destructive">*</span></label>
                      <input name="fullName" required placeholder={lang === "en" ? "John Lee" : "李明"} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Business Name" : "公司名稱"} <span className="text-destructive">*</span></label>
                      <input name="businessName" required placeholder={lang === "en" ? "Lee Construction" : "李氏建設"} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Email" : "電子郵箱"} <span className="text-destructive">*</span></label>
                      <input name="email" type="email" required placeholder="john@domain.com" className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Phone" : "電話"} <span className="text-xs text-muted-foreground">({lang === "en" ? "optional" : "選填"})</span></label>
                      <input name="phone" placeholder="(604) 555-1234" className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Industry" : "行業"} <span className="text-destructive">*</span></label>
                      <input name="industry" required placeholder={lang === "en" ? "e.g. Real Estate, Law, Restaurant" : "例如：房地產、法律、餐飲"} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Current Website" : "當前網站"} <span className="text-xs text-muted-foreground">({lang === "en" ? "optional" : "選填"})</span></label>
                      <input name="currentWebsite" placeholder="https://..." className={inputClass} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{lang === "en" ? "Project Description" : "項目描述"} <span className="text-destructive">*</span></label>
                    <textarea name="projectDescription" required rows={4} placeholder={lang === "en" ? "Describe your project goals, target audience, and any specific requirements..." : "描述您的項目目標、目標受眾和任何特定需求..."} className={`${inputClass} resize-y`} />
                  </div>
                </div>

                <div className="form-divider" />

                {/* Section 2 — Required Features */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground font-display">
                      {lang === "en" ? "Required Features" : "所需功能"}
                    </h3>
                    <span className="section-underline section-underline--light" />
                    <p className="mt-2 text-sm text-muted-foreground">{lang === "en" ? "Select all that apply to your project." : "選擇適用於您項目的所有功能。"}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature) => (
                      <label
                        key={feature}
                        onClick={() => toggleFeature(feature)}
                        className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 cursor-pointer transition-all text-sm ${
                          selectedFeatures.includes(feature)
                            ? "border-[hsl(267,55%,45%)] bg-[hsl(267,55%,45%,0.04)]"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            selectedFeatures.includes(feature)
                              ? "border-[hsl(267,55%,45%)] bg-[hsl(267,55%,45%)]"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {selectedFeatures.includes(feature) && <Check size={10} className="text-white" />}
                        </span>
                        <span className="text-foreground">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-divider" />

                {/* Section 3 — Timeline */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground font-display">
                      {lang === "en" ? "Preferred Timeline" : "期望時間"}
                    </h3>
                    <span className="section-underline section-underline--light" />
                  </div>

                  <div>
                    <div className="grid grid-cols-2 gap-3">
                      {timelineOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTimeline(opt)}
                          className={`rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                            timeline === opt
                              ? "border-[hsl(267,55%,45%)] bg-[hsl(267,55%,45%,0.04)] text-foreground"
                              : "border-border text-muted-foreground hover:border-muted-foreground/30"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-divider" />

                {/* Cloud Folder Link */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{lang === "en" ? "Cloud Folder Link" : "雲文件夾鏈接"} <span className="text-xs text-muted-foreground">({lang === "en" ? "optional" : "選填"})</span></label>
                  <input name="cloudLink" placeholder="https://drive.google.com/... or https://dropbox.com/..." className={inputClass} />
                  <p className="text-xs text-muted-foreground">{lang === "en" ? 'Share logos, brand assets, or reference materials. Ensure link access is set to "Anyone with the link can view."' : '分享標誌、品牌素材或參考資料。請確保鏈接權限設置為"所有擁有鏈接的人都可以查看"。'}</p>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  {submitError && (
                    <p className="mb-4 text-sm font-medium text-destructive">{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="sl-cta font-display w-full inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-base font-extrabold text-white transition-colors disabled:opacity-60"
                    
                  >
                    <Send size={16} />
                    {submitting
                      ? (lang === "en" ? "Submitting..." : "提交中...")
                      : (lang === "en" ? "Submit Quote Request" : "提交報價請求")}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

const CustomBrief = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      
      <Header />
      <CustomBriefContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default CustomBrief;
