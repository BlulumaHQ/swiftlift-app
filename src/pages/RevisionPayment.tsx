import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Check, CreditCard, AlertCircle, Hash, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const RevisionPaymentContent = () => {
  const [searchParams] = useSearchParams();
  const codeParam = searchParams.get("code") || "";
  const planParam = searchParams.get("plan") || "";
  const paid = searchParams.get("paid") === "true";
  const cancelled = searchParams.get("cancelled") === "true";

  const [projectCode, setProjectCode] = useState(codeParam);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRequired, setShowRequired] = useState(false);

  useEffect(() => {
    document.title = "Revision Payment — SwiftLift";
  }, []);

  const handlePay = async () => {
    if (!projectCode.trim()) {
      setShowRequired(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-revision-payment-checkout",
        { body: { projectCode: projectCode.trim(), planTier: planParam || "unknown" } }
      );
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      console.error("Revision payment checkout error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors";

  /* ── Success state ── */
  if (paid) {
    return (
      <main>
        <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14 section-brand-dark">
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-white font-display leading-tight">
              Revision Payment
            </h1>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-lg mx-auto px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-display">Payment received successfully.</h2>
            <p className="mt-3 text-muted-foreground">You may now submit your revision request.</p>
            <a
              href={`/revision-request?code=${encodeURIComponent(codeParam)}`}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors"
              style={{ backgroundColor: "hsl(275 51% 46%)" }}
            >
              Go to Revision Form <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
    );
  }

  /* ── Payment form ── */
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(1.75rem,4vw,2.5rem)] font-black text-white font-display leading-tight"
          >
            Revision Payment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            Additional revision request — $25 per submission
          </motion.p>
        </div>
      </section>

      <section className="py-8 md:py-14 bg-background">
        <div className="max-w-lg mx-auto px-6 space-y-8">
          {/* Cancelled notice */}
          {cancelled && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3">
              <AlertCircle size={16} className="text-destructive flex-shrink-0" />
              <span className="text-sm text-destructive font-medium">Payment was canceled. You can try again below.</span>
            </div>
          )}

          {/* Explanation */}
          <div className="rounded-2xl border-2 border-border bg-muted/30 p-5 md:p-6 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your plan includes a limited number of free revisions.<br />
              If you have used your included revisions, you may submit an additional revision request here.
            </p>
            <p className="text-sm text-muted-foreground">
              Each submission covers one consolidated revision request.
            </p>
          </div>

          {/* Project info */}
          <div className="rounded-2xl border-2 border-border bg-background p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-foreground font-display">Project Information</h3>

            {codeParam && planParam ? (
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Project Code:</span> {codeParam}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Plan:</span> {planParam}
                </p>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                  <Hash size={14} className="text-muted-foreground" /> Project Code <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={projectCode}
                  onChange={(e) => { setProjectCode(e.target.value); setShowRequired(false); }}
                  placeholder="SWL-2026-001"
                  className={`${inputClass} ${showRequired && !projectCode.trim() ? "border-destructive" : ""}`}
                />
                {showRequired && !projectCode.trim() && (
                  <p className="text-xs text-destructive mt-1">Project code is required before payment.</p>
                )}
              </div>
            )}
          </div>

          {/* Payment card */}
          <div className="rounded-2xl border-2 border-border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-foreground font-display">Revision Fee</h3>
              <span className="text-2xl font-black text-foreground font-display">$25 <span className="text-sm font-medium text-muted-foreground">USD</span></span>
            </div>
            <p className="text-xs text-muted-foreground">
              This covers one additional consolidated revision submission.
            </p>
          </div>

          {/* Hidden fields for reference */}
          <input type="hidden" name="site_name" value="SwiftLift" />
          <input type="hidden" name="mode" value="revision_payment" />

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "hsl(275 51% 46%)" }}
          >
            <CreditCard size={18} />
            {isSubmitting ? "Redirecting…" : "Pay $25 & Continue"}
          </button>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Stripe. You'll be redirected to complete checkout.
          </p>

          {/* Back to home */}
          <div className="text-center pt-2 pb-4">
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

const RevisionPayment = () => (
  <LanguageProvider>
    <CustomCursor />
    <Header />
    <RevisionPaymentContent />
    <Footer />
  </LanguageProvider>
);

export default RevisionPayment;
