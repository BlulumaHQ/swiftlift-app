import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PreviewSelector from "@/components/PreviewSelector";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
  "电子商务 / 在线商店",
  "预约 / 预订系统",
  "博客 / 内容管理",
  "会员 / 登录区域",
  "多语言支持",
  "自定义计算器或工具",
  "CRM 集成",
  "IDX / MLS 集成",
  "社交媒体集成",
  "邮件营销设置",
  "SEO 优化",
  "数据分析与报告",
];

const TIMELINE_OPTIONS_EN = ["2–3 weeks", "1 month", "2 months", "Flexible / No rush"];
const TIMELINE_OPTIONS_ZH = ["2-3周", "1个月", "2个月", "灵活 / 不急"];

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
        title: lang === "en" ? "Quote Request Submitted" : "报价请求已提交",
        description: lang === "en" ? "We'll review your project and get back to you within 48 hours." : "我们将审核您的项目并在48小时内回复您。",
      });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(lang === "en" ? "Something went wrong. Please try again." : "出了点问题。请重试。");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors";

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
            {lang === "en" ? "Tell Us About Your Project" : "告诉我们您的项目需求"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {lang === "en"
              ? "Get a tailored website plan. We'll review your details and send you a custom proposal within 48 hours."
              : "获取定制网站方案。我们将审核您的需求并在48小时内发送定制方案。"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-white/50 text-sm"
          >
            {lang === "en"
              ? `Business websites starting from ${formatPrice(PRICING.customBrief.businessWebsite.startingAt)} · E-commerce from ${formatPrice(PRICING.customBrief.ecommerceWebsite.startingAt)}`
              : `企业网站起价${formatPrice(PRICING.customBrief.businessWebsite.startingAt)} · 电商网站起价${formatPrice(PRICING.customBrief.ecommerceWebsite.startingAt)}`}
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
                {lang === "en" ? "Quote Request Submitted!" : "报价请求已提交！"}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                {lang === "en"
                  ? "Thank you! We'll review your project details and send you a tailored proposal within 48 hours."
                  : "谢谢！我们将审核您的项目详情并在48小时内发送定制方案。"}
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
            <>
              {/* Pricing context */}
              <div className="rounded-2xl border border-border bg-[hsl(var(--surface-sunken))] p-5 md:p-6 mb-8">
                <h3 className="text-base font-bold text-foreground font-display mb-3">
                  {lang === "en" ? "Custom Website Pricing" : "定制网站价格"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-foreground">{lang === "en" ? "Business Website" : "企业网站"}</p>
                    <p className="text-muted-foreground mt-0.5">{lang === "en" ? "Starting from $999" : "起价$999"}</p>
                    <p className="text-xs text-muted-foreground">{lang === "en" ? "Most projects: $999 – $2,499" : "大多数项目：$999 – $2,499"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{lang === "en" ? "E-commerce Website" : "电商网站"}</p>
                    <p className="text-muted-foreground mt-0.5">{lang === "en" ? "Starting from $1,299" : "起价$1,299"}</p>
                    <p className="text-xs text-muted-foreground">{lang === "en" ? "Most projects: $1,299 – $3,299" : "大多数项目：$1,299 – $3,299"}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
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
                      {lang === "en" ? "Project Information" : "项目信息"}
                    </h3>
                    <span className="section-underline section-underline--light" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Full Name" : "姓名"} <span className="text-destructive">*</span></label>
                      <input name="fullName" required placeholder={lang === "en" ? "John Lee" : "李明"} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Business Name" : "公司名称"} <span className="text-destructive">*</span></label>
                      <input name="businessName" required placeholder={lang === "en" ? "Lee Construction" : "李氏建设"} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Email" : "电子邮箱"} <span className="text-destructive">*</span></label>
                      <input name="email" type="email" required placeholder="john@domain.com" className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Phone" : "电话"} <span className="text-xs text-muted-foreground">({lang === "en" ? "optional" : "选填"})</span></label>
                      <input name="phone" placeholder="(604) 555-1234" className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Industry" : "行业"} <span className="text-destructive">*</span></label>
                      <input name="industry" required placeholder={lang === "en" ? "e.g. Real Estate, Law, Restaurant" : "例如：房地产、法律、餐饮"} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{lang === "en" ? "Current Website" : "当前网站"} <span className="text-xs text-muted-foreground">({lang === "en" ? "optional" : "选填"})</span></label>
                      <input name="currentWebsite" placeholder="https://..." className={inputClass} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{lang === "en" ? "Project Description" : "项目描述"} <span className="text-destructive">*</span></label>
                    <textarea name="projectDescription" required rows={4} placeholder={lang === "en" ? "Describe your project goals, target audience, and any specific requirements..." : "描述您的项目目标、目标受众和任何特定需求..."} className={`${inputClass} resize-y`} />
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
                    <p className="mt-2 text-sm text-muted-foreground">{lang === "en" ? "Select all that apply to your project." : "选择适用于您项目的所有功能。"}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature) => (
                      <label
                        key={feature}
                        onClick={() => toggleFeature(feature)}
                        className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 cursor-pointer transition-all text-sm ${
                          selectedFeatures.includes(feature)
                            ? "border-[hsl(275,51%,46%)] bg-[hsl(275,51%,46%,0.04)]"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            selectedFeatures.includes(feature)
                              ? "border-[hsl(275,51%,46%)] bg-[hsl(275,51%,46%)]"
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
                      {lang === "en" ? "Preferred Timeline" : "期望时间"}
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
                              ? "border-[hsl(275,51%,46%)] bg-[hsl(275,51%,46%,0.04)] text-foreground"
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
                  <label className="text-sm font-medium text-foreground">{lang === "en" ? "Cloud Folder Link" : "云文件夹链接"} <span className="text-xs text-muted-foreground">({lang === "en" ? "optional" : "选填"})</span></label>
                  <input name="cloudLink" placeholder="https://drive.google.com/... or https://dropbox.com/..." className={inputClass} />
                  <p className="text-xs text-muted-foreground">{lang === "en" ? 'Share logos, brand assets, or reference materials. Ensure link access is set to "Anyone with the link can view."' : '分享标志、品牌素材或参考资料。请确保链接权限设置为"所有拥有链接的人都可以查看"。'}</p>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  {submitError && (
                    <p className="mb-4 text-sm font-medium text-destructive">{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors disabled:opacity-60"
                    style={{ backgroundColor: "#7F37AE" }}
                  >
                    <Send size={16} />
                    {submitting
                      ? (lang === "en" ? "Submitting..." : "提交中...")
                      : (lang === "en" ? "Submit Quote Request" : "提交报价请求")}
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
      <CustomCursor />
      <Header />
      <CustomBriefContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default CustomBrief;
