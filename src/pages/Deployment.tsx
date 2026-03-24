import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { PRICING, formatPrice, STRIPE_LINKS } from "@/lib/pricing";
import { Check, Shield, Palette, Search, Zap, Share2, Lock, ChevronDown, User, Building2, Mail, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type HostingPlan = "" | "free" | "monthly" | "yearly";

interface Addon {
  id: string;
  name: string;
  price: number;
  outcome: string;
  why: string;
  included: string[];
  badge?: string;
  icon: typeof Palette;
}

const ADDONS: Addon[] = [
  {
    id: "performance",
    name: PRICING.addons[0].name,
    price: PRICING.addons[0].price,
    outcome: "Improve loading speed and website performance for a better user experience and stronger conversion.",
    why: "Speed improves conversion rates and search ranking.",
    included: [
      "Image compression & optimization",
      "Asset minification & caching",
      "Performance tuning adjustments",
      "Core Web Vitals improvement",
    ],
    badge: "Improves Speed & SEO",
    icon: Zap,
  },
  {
    id: "seo",
    name: PRICING.addons[1].name,
    price: PRICING.addons[1].price,
    outcome: "Improve your visibility on Google with stronger structure and search-friendly setup.",
    why: "Better indexing helps customers find you organically.",
    included: [
      "Meta title & description setup",
      "Sitemap generation & submission",
      "Search console configuration",
      "Schema markup implementation",
    ],
    icon: Search,
  },
  {
    id: "social",
    name: PRICING.addons[2].name,
    price: PRICING.addons[2].price,
    outcome: "Get ready-to-use social visuals and launch content to promote your new website.",
    why: "Consistency builds recognition and authority.",
    included: [
      "Profile image formatting (up to 3 platforms)",
      "3 cover/banner designs",
      "3 launch post templates",
      "1 reusable branded post template",
      "5 highlight icons",
    ],
    badge: "Perfect for Launch Week",
    icon: Share2,
  },
  {
    id: "brand",
    name: PRICING.addons[3].name,
    price: PRICING.addons[3].price,
    outcome: "Build a stronger first impression with a cleaner and more professional brand identity.",
    why: "A consistent brand increases customer confidence and conversion.",
    included: [
      "Logo refinement system",
      "Color palette definition",
      "Typography hierarchy",
      "Brand usage guide (PDF)",
    ],
    badge: "Most Popular for New Businesses",
    icon: Palette,
  },
];

const HOSTING_OPTIONS = [
  {
    value: "free" as const,
    label: "Included Hosting",
    price: formatPrice(PRICING.hosting.freeHosting.price),
    period: "",
    badge: null,
    description: "Hosted under SwiftLift infrastructure.",
    details: [
      `Additional revisions beyond included scope are ${formatPrice(PRICING.fees.additionalRevision.price)} per submission`,
      "No priority response time",
      "No included content edits",
      "Site remains active unless manually removed",
    ],
  },
  {
    value: "monthly" as const,
    label: "Managed Hosting",
    price: formatPrice(PRICING.hosting.managedMonthly.price),
    period: "/month",
    badge: null,
    description: "Dedicated hosting under your own domain.",
    details: [
      "SSL certificate included",
      "Security monitoring",
      "3 minor content edits per year included",
      "48-hour response time",
      "Ongoing deployment support",
    ],
  },
  {
    value: "yearly" as const,
    label: "Managed Hosting",
    price: formatPrice(PRICING.hosting.managedYearly.price),
    period: "/year",
    badge: `Best Value — Save $${PRICING.hosting.managedMonthly.price * 12 - PRICING.hosting.managedYearly.price}/yr`,
    description: "Same benefits as monthly with annual savings.",
    details: [
      "SSL certificate included",
      "Security monitoring",
      "3 minor content edits per year included",
      "48-hour response time",
      "Ongoing deployment support",
    ],
  },
];

const COMPARE_ROWS = [
  {
    label: `Included Hosting (Free)`,
    note: `Best for budget • ${formatPrice(PRICING.fees.additionalRevision.price)} per revision submission`,
    value: "free",
  },
  {
    label: `Managed Monthly (${formatPrice(PRICING.hosting.managedMonthly.price)}/mo)`,
    note: "Best for flexibility • cancel anytime",
    value: "monthly",
  },
  {
    label: `Managed Yearly (${formatPrice(PRICING.hosting.managedYearly.price)}/yr)`,
    note: `Best value • save $${PRICING.hosting.managedMonthly.price * 12 - PRICING.hosting.managedYearly.price} vs monthly`,
    value: "yearly",
    badge: "Best Value",
  },
];

const DeploymentContent = () => {
  useEffect(() => {
    document.title = "Launch Your Website — SwiftLift";
  }, []);
  const [hostingPlan, setHostingPlan] = useState<HostingPlan>("");
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [expandedAddons, setExpandedAddons] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientName, setClientName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [showRequiredError, setShowRequiredError] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

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

  const handleHostingSelect = (value: HostingPlan) => {
    if (!guardDetails()) return;
    setHostingPlan(value);
  };

  const toggleExpanded = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totals = useMemo(() => {
    const oneTime = ADDONS.filter((a) => selectedAddons.has(a.id)).reduce((sum, a) => sum + a.price, 0);
    let recurring = 0;
    let recurringLabel = "";
    if (hostingPlan === "monthly") {
      recurring = PRICING.hosting.managedMonthly.price;
      recurringLabel = `${formatPrice(PRICING.hosting.managedMonthly.price)}/month`;
    } else if (hostingPlan === "yearly") {
      recurring = PRICING.hosting.managedYearly.price;
      recurringLabel = `${formatPrice(PRICING.hosting.managedYearly.price)}/year`;
    }
    const todayTotal = oneTime + recurring;
    return { oneTime, recurring, recurringLabel, todayTotal };
  }, [hostingPlan, selectedAddons]);

  const handleCheckout = async () => {
    if (!guardDetails()) return;
    if (!hostingPlan) return;
    setIsSubmitting(true);
    try {
      if (hostingPlan === "free" && selectedAddons.size === 0) {
        const { data, error } = await supabase.functions.invoke("submit-free-hosting", {
          body: { clientName, businessName, clientEmail, selectedAddons: [] },
        });
        if (error) throw error;
        alert("Free hosting request submitted successfully! We'll be in touch soon.");
        if (typeof (window as any).fbq !== 'undefined') {
          (window as any).fbq('track', 'Lead');
        }
        return;
      }

      // Hosting-only (no add-ons) → open direct Stripe Payment Link
      if (selectedAddons.size === 0) {
        const linkKey = hostingPlan === "monthly" ? "managed-monthly" : "managed-yearly";
        const url = STRIPE_LINKS[linkKey];
        if (url) {
          window.open(url, "_blank", "noopener,noreferrer");
          setIsSubmitting(false);
          return;
        }
      }

      // Combined hosting + add-ons → use edge function checkout
      const { data, error } = await supabase.functions.invoke("create-deployment-checkout", {
        body: {
          hostingPlan,
          selectedAddons: Array.from(selectedAddons),
          clientName,
          businessName,
          clientEmail,
          projectType: "Business Website",
          domainName: "yourdomain.com",
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

  const planSelected = hostingPlan !== "";
  const isFreeWithNoAddons = hostingPlan === "free" && selectedAddons.size === 0;

  const hostingLabel = hostingPlan === "free"
    ? "Included (Free)"
    : hostingPlan === "monthly"
    ? `Managed – ${formatPrice(PRICING.hosting.managedMonthly.price)}/mo`
    : hostingPlan === "yearly"
    ? `Managed – ${formatPrice(PRICING.hosting.managedYearly.price)}/yr`
    : "Not selected";

  const OrderSummary = ({ compact = false }: { compact?: boolean }) => (
    <div className={`rounded-2xl border border-border bg-background shadow-sm ${compact ? "p-4" : "p-6"}`}>
      <h3 className="font-bold text-foreground text-lg font-display mb-4">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Hosting Plan</span>
          <span className="font-semibold text-foreground">{hostingLabel}</span>
        </div>

        <div className="h-px bg-border" />

        <div className="flex justify-between">
          <span className="text-muted-foreground">Add-ons</span>
          <span className="font-semibold text-foreground">
            {selectedAddons.size === 0 ? "None" : `${selectedAddons.size} selected`}
          </span>
        </div>

        {selectedAddons.size > 0 && (
          <div className="pl-4 space-y-1">
            {ADDONS.filter((a) => selectedAddons.has(a.id)).map((a) => (
              <div key={a.id} className="flex justify-between text-xs text-muted-foreground">
                <span>{a.name}</span>
                <span>${a.price}</span>
              </div>
            ))}
          </div>
        )}

        <div className="h-px bg-border" />

        {totals.oneTime > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">One-Time Charges</span>
            <span className="font-semibold text-foreground">${totals.oneTime}</span>
          </div>
        )}

        {totals.recurringLabel && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Recurring</span>
            <span className="font-semibold text-foreground">{totals.recurringLabel}</span>
          </div>
        )}

        <div className="h-px bg-border" />

        <div className="flex justify-between text-base">
          <span className="font-bold text-foreground">Total Due Today</span>
          <span className="font-black text-foreground text-lg">${totals.todayTotal}</span>
        </div>
      </div>

      <div className="mt-4 text-[11px] text-muted-foreground leading-relaxed space-y-1">
        <p>Hosting subscriptions begin immediately upon payment.</p>
        <p>If cancelled, your website remains active for 30 days before suspension. Reactivation fee: {formatPrice(PRICING.fees.reactivationFee.price)}.</p>
      </div>

      <motion.button
        onClick={handleCheckout}
        disabled={!planSelected || isSubmitting}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#7F37AE" }}
        whileHover={planSelected ? { scale: 1.02 } : {}}
        whileTap={planSelected ? { scale: 0.98 } : {}}
      >
        <Lock size={16} />
        {isSubmitting ? "Processing…" : isFreeWithNoAddons ? "Submit & Activate" : "Proceed to Secure Checkout"}
      </motion.button>

      {!planSelected && (
        <p className="mt-2 text-xs text-center text-muted-foreground">
          Select a hosting plan to continue.
        </p>
      )}
    </div>
  );

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
            You're One Step Away from Launch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Choose your setup and get your website live. Pick a hosting plan, add optional upgrades, and proceed to secure checkout.
          </motion.p>
        </div>
      </section>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <section className="py-10 md:py-14 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* LEFT — Selection */}
            <div className="flex-1 min-w-0">

              {/* ═══ STEP 1 — Required Details ═══ */}
              <div ref={step1Ref} className="mb-10 scroll-mt-24">
                <div className="rounded-2xl border-2 border-border bg-background p-5 md:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#7F37AE" }}>1</span>
                    <h2 className="text-lg md:text-xl font-black text-foreground font-display">
                      Your Details
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 ml-9">
                    We use this to match your payment to your project.
                  </p>

                  <AnimatePresence>
                    {showRequiredError && !isDetailsComplete && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
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
                        <User size={14} className="text-muted-foreground" /> Full Name
                        <span className="text-destructive text-xs font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => { setClientName(e.target.value); if (showRequiredError) setShowRequiredError(false); }}
                        placeholder="John Lee"
                        className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 focus:border-[hsl(275,51%,46%)] transition-colors ${showRequiredError && !clientName.trim() ? "border-destructive" : "border-border"}`}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                        <Building2 size={14} className="text-muted-foreground" /> Business Name
                        <span className="text-destructive text-xs font-semibold">*</span>
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => { setBusinessName(e.target.value); if (showRequiredError) setShowRequiredError(false); }}
                        placeholder="Lee Construction"
                        className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 focus:border-[hsl(275,51%,46%)] transition-colors ${showRequiredError && !businessName.trim() ? "border-destructive" : "border-border"}`}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1.5">
                        <Mail size={14} className="text-muted-foreground" /> Email
                        <span className="text-destructive text-xs font-semibold">*</span>
                      </label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => { setClientEmail(e.target.value); if (showRequiredError) setShowRequiredError(false); }}
                        placeholder="john@domain.com"
                        className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(275,51%,46%)]/40 focus:border-[hsl(275,51%,46%)] transition-colors ${showRequiredError && !clientEmail.trim() ? "border-destructive" : "border-border"}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══ Hosting Selection ═══ */}
              <div>
                <h2 className="text-xl md:text-2xl font-black text-foreground font-display">
                  Choose Your Hosting Plan
                </h2>
                <div className="flex">
                  <span className="section-underline section-underline--light" />
                </div>

                {/* Compare Hosting Plans — collapsible */}
                <div className="mt-5 mb-4">
                  <button
                    type="button"
                    onClick={() => setCompareOpen((v) => !v)}
                    className="w-full flex items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <span>Compare Hosting Plans</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${compareOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {compareOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 rounded-xl border border-border bg-muted/20 divide-y divide-border">
                          {COMPARE_ROWS.map((row) => (
                            <div key={row.value} className="flex items-center justify-between px-4 py-3 gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-semibold text-foreground">{row.label}</span>
                                  {row.badge && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                                      {row.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">{row.note}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleHostingSelect(row.value as HostingPlan)}
                                className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${hostingPlan === row.value ? "bg-[hsl(275,51%,46%)] text-white" : "bg-muted text-foreground hover:bg-muted-foreground/10"}`}
                              >
                                {hostingPlan === row.value ? "Selected" : "Select"}
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Full hosting cards — stacked */}
                <div className="space-y-3">
                  {HOSTING_OPTIONS.map((opt) => {
                    const isSelected = hostingPlan === opt.value;
                    return (
                      <label
                        key={opt.value}
                        onClick={(e) => { e.preventDefault(); handleHostingSelect(opt.value); }}
                        className={`rounded-xl border-2 p-4 cursor-pointer transition-all block ${
                          isSelected
                            ? "border-[hsl(275,51%,46%)] bg-[hsl(275,51%,46%,0.04)]"
                            : "border-border bg-background hover:border-muted-foreground/30"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isSelected ? "border-[hsl(275,51%,46%)]" : "border-muted-foreground/40"
                            }`}
                          >
                            {isSelected && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[hsl(275,51%,46%)]" />
                            )}
                          </span>

                          <input
                            type="radio"
                            name="hosting"
                            value={opt.value}
                            checked={isSelected}
                            onChange={() => handleHostingSelect(opt.value)}
                            className="sr-only"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-foreground">{opt.label}</span>
                              {opt.badge && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
                            <ul className="mt-2 space-y-1">
                              {opt.details.map((d, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                  <span className="mt-1 w-1 h-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="text-lg font-black text-foreground font-display">{opt.price}</span>
                            <span className="text-sm text-muted-foreground">{opt.period}</span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* ═══ Add-ons ═══ */}
              <div className="mt-10">
                <h2 className="text-xl md:text-2xl font-black text-foreground font-display">
                  Enhance Your Website
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Optional upgrades to maximize your results.</p>
                <div className="flex">
                  <span className="section-underline section-underline--light" />
                </div>

                <div className="mt-6 space-y-3">
                  {ADDONS.map((addon) => {
                    const Icon = addon.icon;
                    const isSelected = selectedAddons.has(addon.id);
                    const isExpanded = expandedAddons.has(addon.id);
                    return (
                      <div key={addon.id} className="rounded-xl border-2 transition-all overflow-hidden"
                        style={{
                          borderColor: isSelected ? "hsl(275 51% 46%)" : "hsl(var(--border))",
                          backgroundColor: isSelected ? "hsl(275 51% 46% / 0.04)" : "hsl(var(--background))",
                        }}
                      >
                        <label className="flex items-start gap-4 p-4 cursor-pointer" onClick={(e) => { e.preventDefault(); toggleAddon(addon.id); }}>
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${
                              isSelected
                                ? "border-[hsl(275,51%,46%)] bg-[hsl(275,51%,46%)]"
                                : "border-muted-foreground/40"
                            }`}
                          >
                            {isSelected && <Check size={13} className="text-white" />}
                          </span>

                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleAddon(addon.id)}
                            className="sr-only"
                          />

                          <div
                            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                            style={{ background: "hsl(275 51% 46% / 0.08)" }}
                          >
                            <Icon size={18} style={{ color: "hsl(275 51% 46%)" }} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-foreground">{addon.name}</span>
                              {addon.badge && (
                                <span className="text-[10px] font-medium tracking-wide bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                  {addon.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-foreground/80 mt-1 leading-snug">{addon.outcome}</p>

                            <button
                              type="button"
                              onClick={(e) => toggleExpanded(addon.id, e)}
                              className="mt-2 inline-flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-80"
                              style={{ color: "hsl(275 51% 46%)" }}
                            >
                              {isExpanded ? "Hide details" : "View details"}
                              <ChevronDown
                                size={12}
                                className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </button>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="text-lg font-black text-foreground font-display">${addon.price}</span>
                            <span className="block text-[10px] text-muted-foreground">One-time</span>
                          </div>
                        </label>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pl-[4.25rem]">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">What's Included</p>
                                <ul className="space-y-1.5">
                                  {addon.included.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                      <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: "hsl(275 51% 46%)" }} />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT — Sticky Order Summary (desktop only) */}
            <div className="hidden lg:block w-[360px] flex-shrink-0">
              <div className="sticky top-28">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY CHECKOUT BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-header border-t border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-base font-black text-foreground font-display">${totals.todayTotal}</div>
            {totals.recurringLabel && (
              <div className="text-[11px] text-muted-foreground">+ {totals.recurringLabel} recurring</div>
            )}
          </div>
          <motion.button
            onClick={handleCheckout}
            disabled={!planSelected || isSubmitting}
            className="inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            style={{ backgroundColor: "#7F37AE" }}
            whileHover={planSelected ? { scale: 1.02 } : {}}
            whileTap={planSelected ? { scale: 0.98 } : {}}
          >
            <Lock size={14} />
            {isSubmitting ? "Processing…" : isFreeWithNoAddons ? "Submit & Activate" : "Continue to Checkout"}
          </motion.button>
        </div>
      </div>

      {/* Mobile order summary (inline, scrollable) */}
      <section className="lg:hidden py-8 bg-background">
        <div className="max-w-lg mx-auto px-6 pb-20">
          <OrderSummary compact />
        </div>
      </section>
    </main>
  );
};

const Deployment = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      <CustomCursor />
      <Header />
      <DeploymentContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default Deployment;
