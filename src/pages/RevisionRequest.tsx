import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Lock, ChevronDown, User, Building2, Mail, AlertCircle, Upload, Link as LinkIcon, MessageSquare, Palette, Search, Zap, Share2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: typeof Palette;
}

const REVISION_ADDONS: Addon[] = [
  {
    id: "booking",
    name: "Booking Integration",
    price: 300,
    description: "Calendly, Acuity, or custom booking system integration.",
    icon: Search,
  },
  {
    id: "blog",
    name: "Blog Setup",
    price: 250,
    description: "Blog section with categories, tags, and content management.",
    icon: FileText,
  },
  {
    id: "ecommerce",
    name: "E-commerce Integration",
    price: 500,
    description: "Product listings, cart, and payment processing setup.",
    icon: Share2,
  },
  {
    id: "idx",
    name: "IDX / MLS Integration",
    price: 450,
    description: "Property listing integration for real estate websites.",
    icon: Zap,
  },
  {
    id: "multilingual",
    name: "Multilingual Setup",
    price: 350,
    description: "Multi-language support with language switcher.",
    icon: MessageSquare,
  },
  {
    id: "calculator",
    name: "Custom Calculator / Tool",
    price: 400,
    description: "Interactive calculator, estimator, or custom tool.",
    icon: Palette,
  },
];

const RevisionContent = () => {
  useEffect(() => {
    document.title = "Revision Request — SwiftLift";
  }, []);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showRequiredError, setShowRequiredError] = useState(false);
  const [screenshots, setScreenshots] = useState<File[]>([]);

  const step1Ref = useRef<HTMLDivElement>(null);

  const isDetailsComplete = clientName.trim() !== "" && businessName.trim() !== "" && clientEmail.trim() !== "";

  const guardDetails = useCallback((): boolean => {
    if (isDetailsComplete) {
      setShowRequiredError(false);
      return true;
    }
    setShowRequiredError(true);
    step1Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    return false;
  }, [isDetailsComplete]);

  const toggleAddon = (id: string) => {
    if (!guardDetails()) return;
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const total = useMemo(() => {
    return REVISION_ADDONS.filter((a) => selectedAddons.has(a.id)).reduce((sum, a) => sum + a.price, 0);
  }, [selectedAddons]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setScreenshots(Array.from(e.target.files));
    }
  };

  const handleCheckout = async () => {
    if (!guardDetails()) return;
    if (!agreed) return;
    setIsSubmitting(true);

    try {
      if (total === 0) {
        // Free submission — just revision notes
        const { error } = await supabase.functions.invoke("submit-free-hosting", {
          body: {
            clientName,
            businessName,
            clientEmail,
            selectedAddons: [],
            type: "revision-request",
          },
        });
        if (error) throw error;
        setSubmitted(true);
        return;
      }

      // Paid checkout — revision add-ons
      const { data, error } = await supabase.functions.invoke("create-revision-checkout", {
        body: {
          selectedAddons: Array.from(selectedAddons),
          clientName,
          businessName,
          clientEmail,
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main>
        <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20 section-brand-dark">
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white font-display leading-tight">
              Revision Submitted
            </h1>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-lg mx-auto px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-display">Revision Request Received</h2>
            <p className="mt-3 text-muted-foreground">We'll review your submission and get back to you within 48 hours.</p>
            <a
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors"
              style={{ backgroundColor: "#7F37AE" }}
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
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20 section-brand-dark">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(2rem,4.5vw,3rem)] font-black text-white font-display leading-tight"
          >
            Revision & Upgrade Submission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Submit your revisions and optional feature upgrades below.
          </motion.p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="max-w-2xl mx-auto px-6 space-y-10">

          {/* Section 1 — Project Info */}
          <div ref={step1Ref} className="scroll-mt-24">
            <div className="rounded-2xl border-2 border-border bg-background p-5 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#7F37AE" }}>1</span>
                <h2 className="text-lg md:text-xl font-black text-foreground font-display">Project Info</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-5 ml-9">Identify your project so we can match this submission.</p>

              <AnimatePresence>
                {showRequiredError && !isDetailsComplete && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-2.5 mb-5">
                      <AlertCircle size={16} className="text-destructive flex-shrink-0" />
                      <span className="text-sm text-destructive font-medium">Please fill in all required fields before continuing.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                    <User size={14} className="text-muted-foreground" /> Full Name <span className="text-destructive text-xs font-semibold">*</span>
                  </label>
                  <input type="text" value={clientName} onChange={(e) => { setClientName(e.target.value); if (showRequiredError) setShowRequiredError(false); }} placeholder="John Lee" className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors ${showRequiredError && !clientName.trim() ? "border-destructive" : "border-border"}`} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                    <Building2 size={14} className="text-muted-foreground" /> Business Name <span className="text-destructive text-xs font-semibold">*</span>
                  </label>
                  <input type="text" value={businessName} onChange={(e) => { setBusinessName(e.target.value); if (showRequiredError) setShowRequiredError(false); }} placeholder="Lee Construction" className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors ${showRequiredError && !businessName.trim() ? "border-destructive" : "border-border"}`} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                    <Mail size={14} className="text-muted-foreground" /> Email <span className="text-destructive text-xs font-semibold">*</span>
                  </label>
                  <input type="email" value={clientEmail} onChange={(e) => { setClientEmail(e.target.value); if (showRequiredError) setShowRequiredError(false); }} placeholder="john@domain.com" className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors ${showRequiredError && !clientEmail.trim() ? "border-destructive" : "border-border"}`} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-divider" />

          {/* Section 2 — Revision Notes */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#7F37AE" }}>2</span>
              <h2 className="text-lg md:text-xl font-black text-foreground font-display">Revision Notes</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 ml-9">Describe all changes in one consolidated submission.</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Revision Details <span className="text-destructive">*</span></label>
                <textarea rows={5} placeholder="Describe all changes you'd like made to your website. Be as specific as possible — reference page names, sections, colors, text changes, etc." className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors resize-y" required />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                  <Upload size={14} className="text-muted-foreground" /> Screenshot Upload <span className="text-xs text-muted-foreground">(optional)</span>
                </label>
                <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4 text-center">
                  <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" id="screenshot-upload" />
                  <label htmlFor="screenshot-upload" className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Upload size={20} className="mx-auto mb-2 text-muted-foreground" />
                    {screenshots.length > 0
                      ? `${screenshots.length} file(s) selected`
                      : "Click to upload screenshots"}
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                  <LinkIcon size={14} className="text-muted-foreground" /> Cloud Link <span className="text-xs text-muted-foreground">(optional)</span>
                </label>
                <input type="url" placeholder="https://drive.google.com/..." className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors" />
                <p className="text-xs text-muted-foreground mt-1">Share screenshots, reference images, or documents. Ensure link access is set to "Anyone with the link can view."</p>
              </div>
            </div>
          </div>

          <div className="form-divider" />

          {/* Section 3 — Fixed-Price Add-Ons */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#7F37AE" }}>3</span>
              <h2 className="text-lg md:text-xl font-black text-foreground font-display">Fixed-Price Add-Ons</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 ml-9">Optional feature upgrades — select any that apply.</p>

            <div className="space-y-3">
              {REVISION_ADDONS.map((addon) => {
                const Icon = addon.icon;
                const isSelected = selectedAddons.has(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`rounded-xl border-2 p-4 cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? "border-[hsl(275,51%,46%)] bg-[hsl(275,51%,46%,0.04)]"
                        : "border-border bg-background hover:border-muted-foreground/30"
                    }`}
                  >
                    <span className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${isSelected ? "border-[hsl(275,51%,46%)] bg-[hsl(275,51%,46%)]" : "border-muted-foreground/40"}`}>
                      {isSelected && <Check size={13} className="text-white" />}
                    </span>
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5" style={{ background: "hsl(275 51% 46% / 0.08)" }}>
                      <Icon size={18} style={{ color: "hsl(275 51% 46%)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-foreground">{addon.name}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{addon.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg font-black text-foreground font-display">${addon.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {total > 0 && (
              <div className="mt-4 rounded-xl bg-muted/30 border border-border px-4 py-3 flex justify-between items-center">
                <span className="font-semibold text-foreground">Add-On Total</span>
                <span className="text-xl font-black text-foreground font-display">${total}</span>
              </div>
            )}
          </div>

          <div className="form-divider" />

          {/* Section 4 — Complex Feature Request */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#7F37AE" }}>4</span>
              <h2 className="text-lg md:text-xl font-black text-foreground font-display">Complex Feature Request</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 ml-9">Need something not listed above? Describe it here and we'll provide a custom quote.</p>
            <textarea rows={3} placeholder="Describe any complex features or custom requirements..." className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 transition-colors resize-y" />
          </div>

          <div className="form-divider" />

          {/* Section 5 — Agreement */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#7F37AE" }}>5</span>
              <h2 className="text-lg md:text-xl font-black text-foreground font-display">Agreement</h2>
            </div>
            <label className="flex items-start gap-3 cursor-pointer" onClick={() => setAgreed(!agreed)}>
              <span className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${agreed ? "border-[hsl(275,51%,46%)] bg-[hsl(275,51%,46%)]" : "border-muted-foreground/40"}`}>
                {agreed && <Check size={13} className="text-white" />}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">
                I confirm that the above revision notes represent one consolidated submission. I understand that additional revisions beyond my package scope may incur additional charges, and that add-on payments are non-refundable once work begins. I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
              </span>
            </label>
          </div>

          <div className="form-divider" />

          {/* Section 6 — Checkout */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#7F37AE" }}>6</span>
              <h2 className="text-lg md:text-xl font-black text-foreground font-display">
                {total > 0 ? "Checkout" : "Submit"}
              </h2>
            </div>

            {total > 0 && (
              <div className="rounded-2xl border border-border bg-background p-5 shadow-sm mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Add-Ons</span>
                  <span className="font-semibold text-foreground">{selectedAddons.size} selected</span>
                </div>
                {REVISION_ADDONS.filter((a) => selectedAddons.has(a.id)).map((a) => (
                  <div key={a.id} className="flex justify-between text-xs text-muted-foreground pl-4 mb-1">
                    <span>{a.name}</span>
                    <span>${a.price}</span>
                  </div>
                ))}
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between">
                  <span className="font-bold text-foreground">Total Due Today</span>
                  <span className="text-xl font-black text-foreground font-display">${total}</span>
                </div>
              </div>
            )}

            <motion.button
              onClick={handleCheckout}
              disabled={!agreed || isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#7F37AE" }}
              whileHover={agreed ? { scale: 1.02 } : {}}
              whileTap={agreed ? { scale: 0.98 } : {}}
            >
              <Lock size={16} />
              {isSubmitting ? "Processing…" : total > 0 ? "Proceed to Secure Checkout" : "Submit Revision Request"}
            </motion.button>

            {!agreed && (
              <p className="mt-2 text-xs text-center text-muted-foreground">
                Please agree to the terms above to continue.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

const RevisionRequest = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      
      <Header />
      <RevisionContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default RevisionRequest;
