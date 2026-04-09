import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { externalSupabase as supabase } from "@/lib/externalSupabase";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, X, Check, AlertTriangle,
  ChevronUp, ChevronDown, Shield, Mail
} from "lucide-react";
import swiftsiteLogo from "@/assets/swiftsite-logo.svg";

/* ═══════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════ */

interface CartItem {
  id: string;
  type: "addon" | "bundle" | "service";
  name: string;
  price: number;
  currency: string;
  stripe_url?: string;
  priceLabel?: string;
}

interface AccessLink {
  id: string;
  organization_id: string;
  client_id: string;
  project_id: string;
  token: string;
  status: string;
  expires_at: string | null;
  revoked_at: string | null;
}

interface ClientData { display_name: string; }
interface ProjectData { project_code: string; }

interface SelectableAddon {
  id: string;
  service_key: string;
  name: string;
  price_usd: number;
  currency: string;
  description: string | null;
  billing_type: string | null;
  stripe_name: string | null;
  stripe_payment_link_url: string | null;
}

/* ═══════════════════════════════════════════════
   HARDCODED STRIPE DATA
   ═══════════════════════════════════════════════ */

const ADDON_STRIPE_MAP: Record<string, string> = {
  "FAQ Section": "https://buy.stripe.com/cNifZg3KA2jz7Du2rzfw40U",
  "Google Map & Business Info": "https://buy.stripe.com/4gM6oG4OE8HXga03vDfw40T",
  "Analytics & Tracking Setup": "https://buy.stripe.com/6oU7sK0yo3nD0b2c29fw40S",
  "Review & Testimonial Section": "https://buy.stripe.com/9B69AS5SI4rHf5WaY5fw40R",
  "Gallery Section": "https://buy.stripe.com/4gM14m6WM5vLbTK0jrfw40Q",
  "Blog Setup": "https://buy.stripe.com/dRmcN4gxm1fv1f69U1fw40P",
  "Bilingual Content Switch": "https://buy.stripe.com/3cI4gya8Y1fvcXO0jrfw40O",
  "Multi-Language SEO Pages": "https://buy.stripe.com/3cIeVc6WMgapcXO4zHfw40N",
  "Advanced Contact Form": "https://buy.stripe.com/7sYdR82Gwf6lf5W3vDfw40M",
  "Booking Request Form": "https://buy.stripe.com/bJeaEW94U4rH8Hy5DLfw40L",
  "Multi-Step Quote Form": "https://buy.stripe.com/3cIbJ06WMbU98Hy2rzfw40K",
  "Onsite SEO Optimization": "https://buy.stripe.com/9B6cN494UcYd7Dufelfw40J",
  "Performance Optimization": "https://buy.stripe.com/9B67sK94U0bre1S9U1fw40I",
  "Brand Identity Package": "https://buy.stripe.com/fZu14m80Qf6l4rieahfw40H",
  "Payment Integration": "https://buy.stripe.com/4gMeVc80Qf6l1f63vDfw40G",
  "Membership & Client Portal": "https://buy.stripe.com/9B63cu1Cs2jz5vmeahfw40F",
};

const HARDCODED_BUNDLES: CartItem[] = [
  {
    id: "bundle-conversion-essentials",
    type: "bundle",
    name: "Conversion Essentials",
    price: 199,
    currency: "USD",
    stripe_url: "https://buy.stripe.com/eVq7sK6WMbU95vmfelfw40E",
  },
  {
    id: "bundle-lead-generation",
    type: "bundle",
    name: "Lead Generation Pack",
    price: 249,
    currency: "USD",
    stripe_url: "https://buy.stripe.com/dRmbJ0epe7DT4ri6HPfw40D",
  },
  {
    id: "bundle-conversion-upgrade",
    type: "bundle",
    name: "Conversion Upgrade Pack",
    price: 299,
    currency: "USD",
    stripe_url: "https://buy.stripe.com/bJedR84OE5vLga0c29fw40C",
  },
];

const BUNDLE_DESCRIPTIONS: Record<string, { desc: string; items: string[] }> = {
  "bundle-conversion-essentials": {
    desc: "Includes FAQ Section, Review & Testimonial Section, and Google Map & Business Info.",
    items: ["FAQ Section", "Review & Testimonial Section", "Google Map & Business Info"],
  },
  "bundle-lead-generation": {
    desc: "Includes Advanced Contact Form, Booking Request Form, and Review & Testimonial Section.",
    items: ["Advanced Contact Form", "Booking Request Form", "Review & Testimonial Section"],
  },
  "bundle-conversion-upgrade": {
    desc: "Includes Advanced Contact Form, Booking Request Form, and Multi-Step Quote Form.",
    items: ["Advanced Contact Form", "Booking Request Form", "Multi-Step Quote Form"],
  },
};

const HARDCODED_HOSTING: CartItem[] = [
  {
    id: "hosting-monthly",
    type: "service",
    name: "Managed Monthly Hosting",
    price: 15,
    currency: "USD",
    priceLabel: "month",
    stripe_url: "https://buy.stripe.com/dRmeVcch62jz0b20jrfw40z",
  },
  {
    id: "hosting-yearly",
    type: "service",
    name: "Managed Yearly Hosting",
    price: 135,
    currency: "USD",
    priceLabel: "year",
    stripe_url: "https://buy.stripe.com/fZubJ0bd2e2hbTKd6dfw40y",
  },
  {
    id: "revision-additional",
    type: "service",
    name: "Additional Revision",
    price: 45,
    currency: "USD",
    stripe_url: "https://buy.stripe.com/4gM3cugxm1fv0b2c29fw40x",
  },
  {
    id: "reactivation-fee",
    type: "service",
    name: "Reactivation Fee",
    price: 50,
    currency: "USD",
    stripe_url: "https://buy.stripe.com/00w14m2Gw1fv7Du1nvfw40d",
  },
];

/* ═══════════════════════════════════════════════
   STATUS SCREENS
   ═══════════════════════════════════════════════ */

const InvalidScreen = () => (
  <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "hsl(var(--surface-sunken))" }}>
    <div className="text-center max-w-md space-y-6">
      <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">This upgrade link is invalid or has expired.</h1>
      <p className="text-muted-foreground">Please contact SwiftLift and we'll send you a new secure upgrade link.</p>
      <a href="mailto:support@swiftlift.app">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-2">Contact Support</Button>
      </a>
    </div>
  </div>
);

const SuccessScreen = () => (
  <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "hsl(var(--surface-sunken))" }}>
    <div className="text-center max-w-md space-y-6">
      <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "hsl(150 60% 94%)" }}>
        <Check className="w-8 h-8" style={{ color: "hsl(150 60% 36%)" }} />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Thank you. Your upgrade request has been received.</h1>
      <p className="text-muted-foreground">We'll process your order and follow up shortly.</p>
    </div>
  </div>
);

const CancelScreen = () => (
  <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "hsl(var(--surface-sunken))" }}>
    <div className="text-center max-w-md space-y-6">
      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <X className="w-8 h-8 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Your checkout was canceled.</h1>
      <p className="text-muted-foreground">No charges were made. You can try again anytime.</p>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="min-h-screen" style={{ background: "hsl(var(--surface-sunken))" }}>
    <div className="h-16 bg-background border-b" />
    <div className="max-w-5xl mx-auto px-5 py-12 space-y-6">
      <Skeleton className="h-24 w-full rounded-xl" />
      <div className="grid md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   CART SIDEBAR (DESKTOP)
   ═══════════════════════════════════════════════ */

const CartSidebar = ({
  items, onRemove, onCheckout, loading, error
}: {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  loading: boolean;
  error: string | null;
}) => {
  const total = items.reduce((s, i) => s + i.price, 0);
  return (
    <div className="sticky top-24 rounded-2xl border bg-background p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground text-sm">Your Cart</h3>
        <span className="ml-auto text-xs text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">No upgrades selected yet.</p>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {items.map(item => (
            <div key={item.id} className="flex items-start justify-between gap-2 py-2 border-b last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
                <p className="text-xs text-muted-foreground">${item.price} USD{item.priceLabel ? ` / ${item.priceLabel}` : ""}</p>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-destructive mt-0.5 shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 pt-4 border-t space-y-3">
        <div className="flex justify-between font-bold text-foreground">
          <span>Total</span>
          <span>${total} USD</span>
        </div>
        {error && (
          <p className="text-xs text-destructive leading-snug">{error}</p>
        )}
        <Button
          onClick={onCheckout}
          disabled={items.length === 0 || loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          {loading ? "Processing..." : "Continue to Checkout"}
        </Button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MOBILE CART BAR
   ═══════════════════════════════════════════════ */

const MobileCartBar = ({
  items, onRemove, onCheckout, loading, error
}: {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  loading: boolean;
  error: string | null;
}) => {
  const [expanded, setExpanded] = useState(false);
  const total = items.reduce((s, i) => s + i.price, 0);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-2xl lg:hidden">
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-b">
            <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">${item.price} USD{item.priceLabel ? ` / ${item.priceLabel}` : ""}</p>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-destructive">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {error && <p className="text-xs text-destructive pt-1">{error}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="p-4 flex items-center gap-3">
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-foreground">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">{items.length} item{items.length !== 1 ? "s" : ""}</span>
          <span className="text-muted-foreground">·</span>
          <span className="font-bold text-sm">${total}</span>
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
        <Button onClick={onCheckout} disabled={loading} className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
          {loading ? "..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════ */

const SectionHeader = ({ title, subtitle, id }: { title: string; subtitle: string; id?: string }) => (
  <div id={id} className="mb-6">
    <h2 className="text-xl font-bold text-foreground">{title}</h2>
    <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

export default function ClientUpgrades() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  const [state, setState] = useState<"loading" | "invalid" | "ready">("loading");
  const [accessLink, setAccessLink] = useState<AccessLink | null>(null);
  const [client, setClient] = useState<ClientData | null>(null);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [selectableAddons, setSelectableAddons] = useState<SelectableAddon[]>([]);
  const [selectedAddonIds, setSelectedAddonIds] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const tokenFromUrl = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('upgrade_access_links')
        .select('*')
        .eq('token', tokenFromUrl || '')
        .maybeSingle();

      if (data) {
        setAccessLink(data as AccessLink);

        const [clientRes, projectRes, selectableRes] = await Promise.all([
          supabase.from("clients").select("display_name").eq("id", data.client_id).maybeSingle(),
          supabase.from("projects").select("project_code").eq("id", data.project_id).maybeSingle(),
          supabase.from("service_items")
            .select("id, service_key, name, description, price_usd, currency, billing_type, stripe_name, stripe_payment_link_url")
            .eq("organization_id", "1e3bf8d7-5cbb-40e3-886c-ed18e554a741")
            .eq("service_type", "addon")
            .eq("is_active", true)
            .order("price_usd", { ascending: true }),
        ]);

        if (clientRes.data) setClient(clientRes.data as ClientData);
        if (projectRes.data) setProject(projectRes.data as ProjectData);
        if (selectableRes.data) setSelectableAddons(selectableRes.data as SelectableAddon[]);
      }

      setState("ready");
    };
    load();
  }, [tokenFromUrl]);

  /* ── Selection logic ── */

  const toggleAddonSelection = useCallback((addon: SelectableAddon) => {
    const stripeUrl = ADDON_STRIPE_MAP[addon.name] || addon.stripe_payment_link_url || undefined;
    setSelectedAddonIds(prev => {
      const next = new Set(prev);
      if (next.has(addon.id)) {
        next.delete(addon.id);
        setCart(c => c.filter(item => item.id !== addon.id));
      } else {
        next.add(addon.id);
        setCart(c => {
          if (c.find(item => item.id === addon.id)) return c;
          return [...c, {
            id: addon.id,
            type: "addon" as const,
            name: addon.name,
            price: Number(addon.price_usd) || 0,
            currency: addon.currency,
            stripe_url: stripeUrl,
          }];
        });
      }
      return next;
    });
  }, []);

  const toggleCartItem = useCallback((item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.filter(c => c.id !== item.id);
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
    setSelectedAddonIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setCheckoutError(null);
  }, []);

  const isInCart = useCallback((id: string) => cart.some(c => c.id === id), [cart]);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);
    setCheckoutError(null);

    if (cart.length > 1) {
      setCheckoutError("Multi-item checkout is not enabled yet. Please complete one upgrade purchase at a time.");
      setCheckoutLoading(false);
      return;
    }

    const item = cart[0];
    if (!item.stripe_url) {
      setCheckoutError("Payment link is not available for this item. Please contact support.");
      setCheckoutLoading(false);
      return;
    }

    // Track
    if (accessLink) {
      supabase.from("upgrade_access_events").insert({
        access_link_id: accessLink.id,
        event_type: "purchase_started",
        metadata_json: { token, item: item.name, price: item.price }
      }).then(() => {});
    }

    window.open(item.stripe_url, "_blank");
    setCheckoutLoading(false);
  };

  if (isSuccess) return <SuccessScreen />;
  if (isCanceled) return <CancelScreen />;
  if (state === "loading") return <LoadingSkeleton />;

  return (
    <div className="min-h-screen pb-24 lg:pb-0" style={{ background: "hsl(var(--surface-sunken))" }}>
      {/* ─── BRANDED HEADER ─── */}
      <header className="bg-background border-b sticky top-0 z-40" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <img src={swiftsiteLogo} alt="SwiftLift Studio" className="h-12 w-auto" />
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-primary" />
              Secure Client Access
            </div>
            <a href="mailto:support@swiftlift.app" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Support</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO / CONTEXT ─── */}
      <div className="bg-background border-b" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="max-w-5xl mx-auto px-5 py-8">
          <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(var(--accent-purple))" }}>
            Secure Client Access
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Upgrade Options for Your Website
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mb-3">
            Enhance your current SwiftLift website with add-ons, bundles, hosting, and support options.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            {project && (
              <span>Project: <strong className="text-foreground">{project.project_code}</strong></span>
            )}
            {client && (
              <span>Client: <strong className="text-foreground">{client.display_name}</strong></span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Any upgrade selected here will be linked directly to your website project.
          </p>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex gap-8">
          {/* LEFT: All Sections */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* ══ ADD-ONS ══ */}
            <section>
              <SectionHeader title="Add-ons" subtitle="Choose individual upgrades for your website." id="addons" />
              {selectableAddons.length === 0 ? (
                <p className="text-muted-foreground text-center py-8 text-sm">No add-ons available at this time.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-3">
                  {selectableAddons.map(addon => {
                    const price = Number(addon.price_usd) || 0;
                    const isSelected = selectedAddonIds.has(addon.id);
                    return (
                      <motion.div
                        key={addon.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => toggleAddonSelection(addon)}
                        className={`rounded-xl border p-4 cursor-pointer transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-md"
                            : "bg-background hover:shadow-sm hover:border-muted-foreground/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-[18px] h-[18px] rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-semibold text-sm text-foreground leading-tight">{addon.name}</h3>
                              <span className="text-sm font-bold text-foreground shrink-0">
                                ${price} <span className="text-xs font-normal text-muted-foreground">USD</span>
                              </span>
                            </div>
                            {addon.description && (
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{addon.description}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ══ BUNDLES ══ */}
            <section>
              <SectionHeader title="Bundles" subtitle="Save more by choosing grouped upgrade packages." id="bundles" />
              <div className="grid md:grid-cols-2 gap-3">
                {HARDCODED_BUNDLES.map(bundle => {
                  const info = BUNDLE_DESCRIPTIONS[bundle.id];
                  const inCart = isInCart(bundle.id);
                  return (
                    <motion.div
                      key={bundle.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => toggleCartItem(bundle)}
                      className={`rounded-xl border p-4 cursor-pointer transition-all ${
                        inCart
                          ? "border-primary bg-primary/5 shadow-md"
                          : "bg-background hover:shadow-sm hover:border-muted-foreground/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-[18px] h-[18px] rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          inCart ? "bg-primary border-primary" : "border-muted-foreground/30"
                        }`}>
                          {inCart && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-sm text-foreground leading-tight">{bundle.name}</h3>
                            <span className="text-sm font-bold text-foreground shrink-0">
                              ${bundle.price} <span className="text-xs font-normal text-muted-foreground">USD</span>
                            </span>
                          </div>
                          {info && (
                            <>
                              <p className="text-xs text-muted-foreground mt-1.5">{info.desc}</p>
                              <ul className="mt-2 space-y-0.5">
                                {info.items.map((item, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <Check className="w-3 h-3 text-primary shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ══ HOSTING & SUPPORT ══ */}
            <section>
              <SectionHeader title="Hosting & Support" subtitle="" id="hosting" />
              <div className="rounded-xl border bg-background p-4 mb-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every SwiftLift website includes free hosting by default. You are not locked in. If you prefer to host the website yourself later, your website files can be provided to you. Managed hosting is for clients who want convenience, support, and ongoing updates handled for them.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {HARDCODED_HOSTING.map(item => {
                  const inCart = isInCart(item.id);
                  const descriptions: Record<string, string> = {
                    "hosting-monthly": "Managed hosting and ongoing support for your launched SwiftLift website.",
                    "hosting-yearly": "Managed hosting and ongoing support billed yearly.",
                    "revision-additional": "Request a one-time website update without a monthly hosting plan.",
                    "reactivation-fee": "Restart a paused or inactive project.",
                  };
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => toggleCartItem(item)}
                      className={`rounded-xl border p-4 cursor-pointer transition-all ${
                        inCart
                          ? "border-primary bg-primary/5 shadow-md"
                          : "bg-background hover:shadow-sm hover:border-muted-foreground/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-[18px] h-[18px] rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          inCart ? "bg-primary border-primary" : "border-muted-foreground/30"
                        }`}>
                          {inCart && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-sm text-foreground leading-tight">{item.name}</h3>
                            <span className="text-sm font-bold text-foreground shrink-0">
                              ${item.price} <span className="text-xs font-normal text-muted-foreground">USD{item.priceLabel ? ` / ${item.priceLabel}` : ""}</span>
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{descriptions[item.id] || ""}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT: Cart Sidebar (desktop) */}
          <div className="hidden lg:block w-72 shrink-0">
            <CartSidebar items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} loading={checkoutLoading} error={checkoutError} />
          </div>
        </div>
      </div>

      {/* MOBILE CART */}
      <MobileCartBar items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} loading={checkoutLoading} error={checkoutError} />

      {/* SUPPORT FOOTER */}
      <div className="border-t bg-background">
        <div className="max-w-5xl mx-auto px-5 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            Need help choosing? Contact us at{" "}
            <a href="mailto:support@swiftlift.app" className="text-primary hover:underline">support@swiftlift.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
