import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PRICING, formatPrice } from "@/lib/pricing";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreviewSelector from "@/components/PreviewSelector";
import { Check, CreditCard, AlertCircle, User, Building2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { getOrCreateProjectId } from "@/lib/projectId";

const STARTER_INCLUDED = [
  "1–2 custom-designed pages",
  "Fully responsive (mobile + desktop)",
  "SEO-ready structure & meta tags",
  "Contact form integration",
  "Fast-loading, optimized build",
];

const GROWTH_INCLUDED = [
  "Up to 7 custom-designed pages",
  "Fully responsive (mobile + desktop)",
  "SEO-ready structure & meta tags",
  "Contact form integration",
  "Fast-loading, optimized build",
  "One round of revisions included",
];

type Tier = "starter" | "growth";

const TIER_CONFIG: Record<Tier, { label: string; price: number; priceLabel: string; included: string[]; delivery: string }> = {
  starter: { label: "Starter Build Package", price: PRICING.websitePackages.multiPage[0].price, priceLabel: formatPrice(PRICING.websitePackages.multiPage[0].price), included: STARTER_INCLUDED, delivery: "3–5 business days after receiving all content." },
  growth: { label: "Growth Build Package", price: PRICING.websitePackages.multiPage[1].price, priceLabel: formatPrice(PRICING.websitePackages.multiPage[1].price), included: GROWTH_INCLUDED, delivery: "5–7 business days after receiving all content." },
};

const PayBuildContent = () => {
  const [searchParams] = useSearchParams();
  const canceled = searchParams.get("canceled") === "1";
  const projectId = useMemo(() => getOrCreateProjectId(), []);

  const imgA = searchParams.get("imgA");
  const imgB = searchParams.get("imgB");
  const linkA = searchParams.get("linkA");
  const linkB = searchParams.get("linkB");
  const tierParam = searchParams.get("tier");
  const previewParam = searchParams.get("preview");

  const tier: Tier = tierParam === "starter" ? "starter" : "growth";
  const config = TIER_CONFIG[tier];

  const [selectedPreview, setSelectedPreview] = useState<"A" | "B" | null>(
    previewParam === "a" ? "A" : previewParam === "b" ? "B" : null
  );
  const [confirmed, setConfirmed] = useState(false);
  const [clientName, setClientName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRequired, setShowRequired] = useState(false);

  const hasPreviewCards = !!(imgA || imgB || linkA || linkB);

  useEffect(() => {
    document.title = "Start Your Build — SwiftLift";
  }, []);

  const isValid =
    clientName.trim() &&
    businessName.trim() &&
    clientEmail.trim() &&
    (!hasPreviewCards || selectedPreview) &&
    confirmed;

  const handlePay = async () => {
    if (!isValid) {
      setShowRequired(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const previewLink = selectedPreview === "A" ? linkA : selectedPreview === "B" ? linkB : null;
      const { data, error } = await supabase.functions.invoke("create-build-checkout", {
        body: {
          clientName,
          businessName,
          clientEmail,
          tier,
          selectedPreview: selectedPreview || undefined,
          previewLink: previewLink || undefined,
          projectId,
        },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      console.error("Build checkout error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Start Your Build
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            You've chosen your preview direction. Complete payment to begin the full website build.
          </motion.p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-lg mx-auto px-6 space-y-8">
          {canceled && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3">
              <AlertCircle size={16} className="text-destructive flex-shrink-0" />
              <span className="text-sm text-destructive font-medium">Payment was canceled. You can try again below.</span>
            </div>
          )}

          {/* Preview Selection */}
          <PreviewSelector
            imgA={imgA}
            imgB={imgB}
            linkA={linkA}
            linkB={linkB}
            selected={selectedPreview}
            onSelect={(v) => { setSelectedPreview(v); setShowRequired(false); }}
            showError={showRequired}
          />

          {/* Summary card */}
          <div className="rounded-2xl border-2 border-border bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-foreground font-display">{config.label}</h2>
              <span className="text-2xl font-black text-foreground font-display">{config.priceLabel}</span>
            </div>
            <ul className="space-y-2.5 mb-5">
              {config.included.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-lg bg-muted/30 border border-border px-4 py-3 text-sm text-muted-foreground">
              <strong className="text-foreground">Delivery:</strong> {config.delivery}
            </div>
          </div>

          {/* Client details */}
          <div className="rounded-2xl border-2 border-border bg-background p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-foreground font-display">Your Details</h3>
            {showRequired && !(clientName.trim() && businessName.trim() && clientEmail.trim()) && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-2.5">
                <AlertCircle size={16} className="text-destructive flex-shrink-0" />
                <span className="text-sm text-destructive font-medium">All fields are required.</span>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                <User size={14} className="text-muted-foreground" /> Full Name <span className="text-destructive text-xs font-semibold">*</span>
              </label>
              <input type="text" value={clientName} onChange={(e) => { setClientName(e.target.value); setShowRequired(false); }} placeholder="John Lee" className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${showRequired && !clientName.trim() ? "border-destructive" : "border-border"}`} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                <Building2 size={14} className="text-muted-foreground" /> Business Name <span className="text-destructive text-xs font-semibold">*</span>
              </label>
              <input type="text" value={businessName} onChange={(e) => { setBusinessName(e.target.value); setShowRequired(false); }} placeholder="Lee Construction" className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${showRequired && !businessName.trim() ? "border-destructive" : "border-border"}`} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                <Mail size={14} className="text-muted-foreground" /> Email <span className="text-destructive text-xs font-semibold">*</span>
              </label>
              <input type="email" value={clientEmail} onChange={(e) => { setClientEmail(e.target.value); setShowRequired(false); }} placeholder="john@domain.com" className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors ${showRequired && !clientEmail.trim() ? "border-destructive" : "border-border"}`} />
            </div>
          </div>

          {/* Confirmation checkbox */}
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => { setConfirmed(e.target.checked); setShowRequired(false); }}
              className="mt-1 h-4 w-4 rounded border-border text-primary accent-primary"
            />
            <span className={`text-sm ${showRequired && !confirmed ? "text-destructive" : "text-muted-foreground"}`}>
              I confirm I want SwiftLift to build the selected preview direction. <span className="text-destructive text-xs font-semibold">*</span>
            </span>
          </label>

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#7F37AE" }}
          >
            <CreditCard size={18} />
            {isSubmitting ? "Redirecting…" : `Pay ${config.priceLabel} with Stripe`}
          </button>

          <p className="text-xs text-center text-muted-foreground/60">
            Secure checkout powered by Stripe
          </p>
        </div>
      </section>
    </main>
  );
};

const PayBuild = () => (
  <LanguageProvider>
    <Header />
    <PayBuildContent />
    <Footer />
  </LanguageProvider>
);

export default PayBuild;
