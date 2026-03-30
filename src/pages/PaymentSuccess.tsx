import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { CheckCircle, ArrowRight, Mail, Copy, CheckCircle2 } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { getOrCreateProjectId } from "@/lib/projectId";

type PaymentType = "build" | "deployment" | "custom_quote" | "default";

interface PaymentConfig {
  heroTitle: string;
  heroSubtitle: string;
  steps: string[];
  primaryLabel: string;
  primaryTo: string;
  secondaryLinks: { label: string; to: string }[];
}

const CONFIGS: Record<PaymentType, PaymentConfig> = {
  build: {
    heroTitle: "Payment Confirmed — Build Phase Activated",
    heroSubtitle: "We've received your build payment. Next we finalize your site structure and content.",
    steps: [
      "We'll email you within 1 business day with your project checklist + timeline.",
      "Reply with any missing logo/images/content (or share a Drive/Dropbox link).",
      "We begin building immediately based on the preview you selected.",
      "You'll receive a live progress link for review.",
      "Revisions are handled in one organized round to keep delivery fast.",
    ],
    primaryLabel: "View Next Steps",
    primaryTo: "/support",
    secondaryLinks: [
      { label: "Hosting Guide", to: "/hosting-guide" },
      { label: "FAQ", to: "/faq" },
      { label: "Features", to: "/features" },
    ],
  },
  deployment: {
    heroTitle: "Payment Confirmed — Deployment Starting",
    heroSubtitle: "We're now preparing launch and hosting setup.",
    steps: [
      "We'll deploy your site to your chosen hosting plan.",
      "If you're using your own domain, follow the Hosting Guide to point DNS to Netlify.",
      "If you selected add-ons, we'll implement them next.",
      "You'll receive a launch confirmation email when everything is live.",
    ],
    primaryLabel: "Read Hosting Guide",
    primaryTo: "/hosting-guide",
    secondaryLinks: [
      { label: "Contact Support", to: "/support" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  custom_quote: {
    heroTitle: "Payment Confirmed — Custom Project Initiated",
    heroSubtitle: "Thanks — your custom build is now scheduled.",
    steps: [
      "We'll review your Custom Brief and confirm scope/timeline.",
      "We may request clarifying details by email (no calls required).",
      "You'll receive a milestone plan and build schedule.",
      "We'll deliver staged previews as the build progresses.",
    ],
    primaryLabel: "View Custom Brief",
    primaryTo: "/custom-brief",
    secondaryLinks: [
      { label: "Support", to: "/support" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  default: {
    heroTitle: "Payment Confirmed",
    heroSubtitle: "Thank you — we've received your payment.",
    steps: [
      "We've received your payment and will be in touch shortly.",
      "If you have any questions, reach out to our support team.",
    ],
    primaryLabel: "Contact Support",
    primaryTo: "/support",
    secondaryLinks: [
      { label: "FAQ", to: "/faq" },
      { label: "Hosting Guide", to: "/hosting-guide" },
    ],
  },
};

const PaymentSuccessContent = () => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const projectId = useMemo(() => getOrCreateProjectId(), []);

  useEffect(() => {
    document.title = "Payment Confirmed — SwiftLift";
  }, []);

  const paymentType = useMemo<PaymentType>(() => {
    const t = searchParams.get("type");
    if (t === "build" || t === "deployment" || t === "custom_quote") return t;
    return "default";
  }, [searchParams]);

  const config = CONFIGS[paymentType];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative bg-[hsl(var(--brand-blue,220,80%,50%))] pt-32 pb-16 text-center text-white"
        style={{ background: "linear-gradient(135deg, hsl(220 80% 45%), hsl(260 70% 55%))" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {config.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg md:text-xl opacity-90"
          >
            {config.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Status Card */}
      <section className="container mx-auto px-4 -mt-8 relative z-10 max-w-2xl">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-14 h-14 text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-semibold mb-1">Payment Confirmed</h2>
          <p className="text-muted-foreground text-sm">Your transaction was successful.</p>
          {/* Project ID */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-5 py-2">
            <span className="text-muted-foreground text-sm font-medium">Project ID:</span>
            <span className="text-foreground font-bold text-base tracking-wide font-mono">{projectId}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(projectId);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
              title="Copy"
            >
              {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="container mx-auto px-4 py-16 max-w-2xl">
        <h3 className="text-xl font-semibold mb-8 text-center">What happens next</h3>
        <ol className="space-y-5">
          {config.steps.map((step, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                {i + 1}
              </span>
              <p className="text-foreground/80 pt-1">{step}</p>
            </li>
          ))}
        </ol>

        {/* CTAs */}
        <div className="mt-12 text-center space-y-4">
          <Link
            to={config.primaryTo}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            {config.primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {config.secondaryLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const PaymentSuccess = () => (
  <LanguageProvider>
    
    <Header />
    <PaymentSuccessContent />
    <Footer />
  </LanguageProvider>
);

export default PaymentSuccess;
