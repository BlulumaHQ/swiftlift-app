import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Check, User, Mail, Hash, Link as LinkIcon, Upload, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type PlanTier = "L" | "LP" | "G" | "GP" | "C" | "unknown";

const LEGACY_PLAN_MAP: Record<string, PlanTier> = {
  "350": "L",
  "350p": "LP",
  "550": "G",
  "750": "GP",
  launch: "L",
  growth: "G",
  conversion: "C",
  pro: "C",
};

function normalizePlan(raw: string): PlanTier {
  if (["L", "LP", "G", "GP", "C"].includes(raw)) return raw as PlanTier;
  return LEGACY_PLAN_MAP[raw] || "unknown";
}

function getRevisionRules(plan: PlanTier) {
  switch (plan) {
    case "L":
      return { included: "Includes 1 free revision.", showExtra: true };
    case "LP":
      return { included: "Includes 2 free revisions.", showExtra: true };
    case "G":
      return { included: "Includes 1 free revision.", showExtra: true };
    case "GP":
      return { included: "Includes 2 free revisions.", showExtra: true };
    case "C":
      return {
        included:
          "Includes unlimited revisions during the active production phase.\nProduction phase ends upon final approval and website launch.\nPost-launch updates are billed at $25 per request.",
        showExtra: false,
      };
    default:
      return null;
  }
}

const RevisionSubmitContent = () => {
  const [searchParams] = useSearchParams();
  const planParam = normalizePlan(searchParams.get("plan") || "unknown");
  const codeParam = searchParams.get("code") || "";

  const planRules = useMemo(() => getRevisionRules(planParam), [planParam]);

  useEffect(() => {
    document.title = "Revision Request — SwiftLift";
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const { error: fnError } = await supabase.functions.invoke("send-intake-confirmation", {
        body: {
          client_name: formData.get("name") as string,
          client_email: formData.get("email") as string,
          business_name: formData.get("project_code") as string || "Revision",
          service: "Revision Request",
          message: `Revision Details: ${formData.get("revision_details") || ""}\nCloud Link: ${formData.get("cloud_link") || "N/A"}\nPlan: ${planParam}`,
        },
      });

      if (fnError) throw new Error(fnError.message || "Email sending failed");

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors";

  if (submitted) {
    return (
      <main>
        <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14 section-brand-dark">
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-white font-display leading-tight">
              Revision Request
            </h1>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-lg mx-auto px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-display">Revision Received</h2>
            <p className="mt-3 text-muted-foreground">We've received your revision request and will get started shortly. You'll hear from us within 48 hours.</p>
            <a
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors"
              style={{ backgroundColor: "hsl(275 51% 46%)" }}
            >
              Back to Home
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Header */}
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-white font-display leading-tight"
          >
            Submit Your Revision Request
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            Group all your changes in one clear submission for the fastest turnaround.
          </motion.p>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-background">
        <div className="max-w-2xl mx-auto px-6 space-y-8">
          {/* Revision Guidance */}
          <div className="rounded-2xl border-2 border-border bg-muted/30 p-5 md:p-6">
            <h2 className="text-base font-bold text-foreground font-display mb-3">How Revisions Work</h2>

            {planRules ? (
              <div className="space-y-2 text-sm text-muted-foreground mb-3">
                {planRules.included.split("\n").map((line, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {line}
                  </p>
                ))}
                {planRules.showExtra && (
                  <>
                    <p className="flex items-start gap-2">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      Combine all changes into one submission for the best results.
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      Additional submissions beyond your included revisions are $25 per request.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <ul className="space-y-2 text-sm text-muted-foreground mb-3">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  Launch Ready plan includes 1 free revision.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  Growth Optimized plan includes 2 free revisions.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  Combine ALL changes into ONE submission for fastest turnaround.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  Additional submissions are $25 per request.
                </li>
              </ul>
            )}

            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              Upload all website content (images, videos, documents, copywriting) to your own cloud storage and share via the link field below. Do NOT upload website content directly to this form.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                <User size={14} className="text-muted-foreground" /> Full Name <span className="text-destructive">*</span>
              </label>
              <input type="text" name="name" required placeholder="John Lee" className={inputClass} />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                <Mail size={14} className="text-muted-foreground" /> Email <span className="text-destructive">*</span>
              </label>
              <input type="email" name="email" required placeholder="john@domain.com" className={inputClass} />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                <Hash size={14} className="text-muted-foreground" /> Project Code <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="project_code"
                required
                defaultValue={codeParam}
                placeholder="SWL-2026-001"
                className={inputClass}
              />
              <p className="text-xs text-muted-foreground mt-1">Include your Project Code in all revision communications so we can locate your project quickly.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Revision Details <span className="text-destructive">*</span>
              </label>
              <textarea
                name="revision_details"
                required
                rows={6}
                placeholder="List ALL changes clearly. Use bullet points if needed. The clearer your request, the faster we can deliver."
                className={`${inputClass} resize-y min-h-[120px]`}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                <LinkIcon size={14} className="text-muted-foreground" /> Cloud Link (Website Content Files) <span className="text-destructive">*</span>
              </label>
              <input type="url" name="cloud_link" required placeholder="https://drive.google.com/..." className={inputClass} />
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Upload ALL website content (images, videos, documents, copywriting) to your own cloud storage such as Google Drive, Dropbox, OneDrive, or WeTransfer.<br />
                Make sure the link is set to "Anyone with the link can view".<br />
                Paste the share link here.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                <Upload size={14} className="text-muted-foreground" /> Upload Screenshots (Optional)
              </label>
              <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4 text-center">
                <input type="file" name="attachment" accept="image/*,.pdf,.svg" className="hidden" id="revision-upload" />
                <label htmlFor="revision-upload" className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Upload size={20} className="mx-auto mb-2 text-muted-foreground" />
                  Click to upload
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Upload screenshots only. You may mark changes on screenshots and upload the marked image here.
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-2.5">
                <AlertCircle size={16} className="text-destructive flex-shrink-0" />
                <span className="text-sm text-destructive font-medium">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full py-3.5 text-base font-bold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: "hsl(275 51% 46%)" }}
            >
              {isSubmitting ? "Submitting…" : "Submit Revision Request"}
            </button>
          </form>

          <div className="text-center space-y-3 pt-2 pb-4">
            <p className="text-xs text-muted-foreground">
              If you have used all included revisions, you will receive a payment link for additional revisions.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full border-2 border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

const RevisionSubmit = () => (
  <LanguageProvider>
    <CustomCursor />
    <Header />
    <RevisionSubmitContent />
    <Footer />
  </LanguageProvider>
);

export default RevisionSubmit;
