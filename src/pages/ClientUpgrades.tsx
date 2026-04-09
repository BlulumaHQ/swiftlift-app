import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { externalSupabase as supabase } from "@/lib/externalSupabase";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, X, Check, AlertTriangle,
  ChevronUp, ChevronDown, Mail, Shield, Sparkles, Package, Server
} from "lucide-react";
import swiftsiteLogo from "@/assets/swiftsite-logo.svg";

/* ═══════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════ */

interface CartItem {
  id: string;
  type: "addon" | "bundle" | "service_item";
  name: string;
  price: number;
  currency: string;
  stripe_url?: string;
  priceLabel?: string;
  billing_type?: string;
  service_key?: string;
  stripe_name?: string;
  service_type?: string;
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
   STATIC DATA — BUNDLES
   ═══════════════════════════════════════════════ */

const STATIC_BUNDLES: CartItem[] = [
  {
    id: "bundle-conversion-essentials",
    type: "bundle",
    name: "Conversion Essentials",
    price: 199,
    currency: "USD",
    billing_type: "one_time",
  },
  {
    id: "bundle-lead-generation",
    type: "bundle",
    name: "Lead Generation Pack",
    price: 249,
    currency: "USD",
    billing_type: "one_time",
  },
  {
    id: "bundle-conversion-upgrade",
    type: "bundle",
    name: "Conversion Upgrade Pack",
    price: 299,
    currency: "USD",
    billing_type: "one_time",
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

/* ═══════════════════════════════════════════════
   STATIC DATA — HOSTING & SUPPORT
   ═══════════════════════════════════════════════ */

const STATIC_HOSTING: (CartItem & { description: string })[] = [
  {
    id: "hosting-monthly",
    type: "service_item",
    name: "Managed Monthly Hosting",
    price: 15,
    currency: "USD",
    priceLabel: "month",
    billing_type: "recurring_monthly",
    description: "Managed hosting and ongoing support for your launched SwiftLift website.",
  },
  {
    id: "hosting-yearly",
    type: "service_item",
    name: "Managed Yearly Hosting",
    price: 135,
    currency: "USD",
    priceLabel: "year",
    billing_type: "recurring_yearly",
    description: "Managed hosting and ongoing support billed yearly.",
  },
  {
    id: "additional-revision",
    type: "service_item",
    name: "Additional Revision",
    price: 45,
    currency: "USD",
    billing_type: "one_time",
    description: "Request a one-time website update without a monthly hosting plan.",
  },
  {
    id: "reactivation-fee",
    type: "service_item",
    name: "Reactivation Fee",
    price: 50,
    currency: "USD",
    billing_type: "one_time",
    description: "Restart a paused or inactive project.",
  },
];

/* ═══════════════════════════════════════════════
   ADDON STRIPE LINK MAP
   ═══════════════════════════════════════════════ */

const ADDON_STRIPE_LINKS: Record<string, string> = {
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

/* ═══════════════════════════════════════════════
   STATUS SCREENS
   ═══════════════════════════════════════════════ */

const InvalidScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-6">
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
  <div className="min-h-screen flex items-center justify-center bg-background px-6">
    <div className="text-center max-w-md space-y-6">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Thank you. Your upgrade request has been received.</h1>
      <p className="text-muted-foreground">We'll process your order and follow up shortly.</p>
    </div>
  </div>
);

const CancelScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-6">
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
  <div className="min-h-screen bg-background">
    <div className="h-14 border-b bg-card" />
    <div className="max-w-5xl mx-auto px-5 py-10 space-y-6">
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-8 w-60" />
      <div className="grid md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════ */

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) => (
  <div className="mb-5">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="w-5 h-5 text-primary" />
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
    </div>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </div>
);

/* ═══════════════════════════════════════════════
   CART SIDEBAR
   ═══════════════════════════════════════════════ */

const CartSidebar = ({ items, onRemove, onCheckout, loading, error }: {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  loading: boolean;
  error: string | null;
}) => {
  const total = items.reduce((s, i) => s + (isNaN(i.price) ? 0 : i.price), 0);
  return (
    <div className="sticky top-[72px] rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">Your Cart</h3>
          <span className="ml-auto text-xs text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</span>
        </div>
      </div>
      <div className="px-5 py-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No upgrades selected yet.</p>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {items.map(item => (
              <div key={item.id} className="flex items-start justify-between gap-2 py-2 border-b last:border-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ${isNaN(item.price) ? 0 : item.price} USD{item.priceLabel ? ` / ${item.priceLabel}` : ""}
                  </p>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-destructive mt-0.5 shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-5 py-4 border-t bg-muted/20">
        <div className="flex justify-between font-semibold text-foreground text-sm mb-3">
          <span>Total</span>
          <span>${total} USD</span>
        </div>
        {error && (
          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2.5 mb-3 leading-relaxed">{error}</p>
        )}
        <Button
          onClick={onCheckout}
          disabled={items.length === 0 || loading}
          className="w-full text-white hover:opacity-90 text-sm h-10"
          style={{ background: "hsl(var(--accent-purple))" }}
        >
          {loading ? "Processing..." : "Continue to Checkout"}
        </Button>
        <p className="text-[11px] text-muted-foreground text-center mt-2.5">Secure checkout powered by Stripe</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MOBILE CART BAR
   ═══════════════════════════════════════════════ */

const MobileCartBar = ({ items, onRemove, onCheckout, loading, error }: {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  loading: boolean;
  error: string | null;
}) => {
  const [expanded, setExpanded] = useState(false);
  const total = items.reduce((s, i) => s + (isNaN(i.price) ? 0 : i.price), 0);
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-2xl lg:hidden">
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-b">
            <div className="p-4 space-y-2 max-h-52 overflow-y-auto">
              {error && <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2 mb-1">{error}</p>}
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">${isNaN(item.price) ? 0 : item.price} USD</p>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-destructive">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="p-3 flex items-center gap-3">
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-foreground">
          <ShoppingCart className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">{items.length}</span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-sm font-semibold">${total}</span>
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
        <Button
          onClick={onCheckout}
          disabled={loading}
          className="ml-auto text-white hover:opacity-90 text-sm"
          style={{ background: "hsl(var(--accent-purple))" }}
          size="sm"
        >
          {loading ? "..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
};

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

  const tokenFromUrl = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("upgrade_access_links")
        .select("*")
        .eq("token", tokenFromUrl || "")
        .maybeSingle();

      if (data) {
        setAccessLink(data as AccessLink);
        const [clientRes, projectRes, selectableRes] = await Promise.all([
          supabase.from("clients").select("display_name").eq("id", data.client_id).maybeSingle(),
          supabase.from("projects").select("project_code").eq("id", data.project_id).maybeSingle(),
          supabase
            .from("service_items")
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

  /* ── selection helpers ── */

  const toggleItem = useCallback((item: CartItem) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) return prev.filter(c => c.id !== item.id);
      return [...prev, item];
    });
    // sync addon selection set
    setSelectedAddonIds(prev => {
      const next = new Set(prev);
      if (next.has(item.id)) next.delete(item.id); else next.add(item.id);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
    setSelectedAddonIds(prev => { const n = new Set(prev); n.delete(id); return n; });
  }, []);

  const isInCart = useCallback((id: string) => cart.some(c => c.id === id), [cart]);

  /* ── checkout ── */

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);
    setCheckoutError(null);

    // Track event (non-blocking)
    if (accessLink) {
      supabase.from("upgrade_access_events").insert({
        access_link_id: accessLink.id,
        event_type: "purchase_started",
        metadata_json: { token, items: cart.map(c => c.name), total: cart.reduce((s, c) => s + c.price, 0) },
      }).then(() => {});
    }

    try {
      const payload = {
        token: tokenFromUrl,
        project_id: accessLink?.project_id,
        client_uuid: accessLink?.client_id,
        organization_id: accessLink?.organization_id,
        access_link_id: accessLink?.id,
        items: cart.map(item => ({
          id: item.id,
          type: item.type,
          service_key: item.service_key || null,
          name: item.name,
          stripe_name: item.stripe_name || item.name,
          price_usd: item.price,
          currency: item.currency || "USD",
          billing_type: item.billing_type || "one_time",
          service_type: item.service_type || item.type,
        })),
      };

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/create-upgrade-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout. Please try again.");
      }

      window.location.href = data.url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to start checkout. Please try again.";
      setCheckoutError(msg);
      setCheckoutLoading(false);
    }
  };

  /* ── renders ── */

  if (isSuccess) return <SuccessScreen />;
  if (isCanceled) return <CancelScreen />;
  if (state === "loading") return <LoadingSkeleton />;

  const addonItems: CartItem[] = selectableAddons.map(a => ({
    id: a.id,
    type: "service_item" as const,
    name: a.name,
    price: Number(a.price_usd) || 0,
    currency: a.currency,
    stripe_url: ADDON_STRIPE_LINKS[a.name] || a.stripe_payment_link_url || undefined,
  }));

  return (
    <div className="min-h-screen bg-[hsl(210,20%,97%)] pb-24 lg:pb-0">
      {/* ─── HEADER ─── */}
      <header className="bg-white border-b border-border sticky top-0 z-40" style={{ boxShadow: "0 1px 8px hsl(0 0% 0% / 0.04)" }}>
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={swiftsiteLogo} alt="SwiftLift Studio" className="h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full">
              <Shield className="w-3 h-3" /> Secure Client Access
            </span>
            <a href="mailto:support@swiftlift.app" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Support</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-5 py-6 md:py-8">
          <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">Upgrade Options for Your Website</h1>
          <p className="text-sm text-muted-foreground mb-3 max-w-lg">
            Enhance your current SwiftLift website with add-ons, bundles, hosting, and support options.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            {project && <span>Project: <strong className="text-foreground">{project.project_code}</strong></span>}
            {client && <span>Client: <strong className="text-foreground">{client.display_name}</strong></span>}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Any upgrade selected here will be linked directly to your website project.</p>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="max-w-5xl mx-auto px-5 pt-8 pb-8">
        <div className="flex gap-7 items-start">
          {/* LEFT */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* ── ADD-ONS ── */}
            <section>
              <SectionHeader icon={Sparkles} title="Add-ons" subtitle="Choose individual upgrades for your website." />
              {selectableAddons.length === 0 ? (
                <p className="text-muted-foreground text-center py-10 text-sm">No add-ons available at this time.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-3">
                  {addonItems.map(item => {
                    const addon = selectableAddons.find(a => a.id === item.id);
                    const selected = isInCart(item.id);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => toggleItem(item)}
                        className={`rounded-lg border p-4 cursor-pointer transition-all ${
                          selected
                            ? "border-primary bg-primary/[0.04] shadow-sm"
                            : "bg-white hover:shadow-sm hover:border-muted-foreground/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                            selected ? "bg-primary border-primary" : "border-muted-foreground/30"
                          }`}>
                            {selected && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                              <span className="text-sm font-bold text-foreground shrink-0">${item.price}</span>
                            </div>
                            {addon?.description && (
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{addon.description}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ── BUNDLES ── */}
            <section>
              <SectionHeader icon={Package} title="Bundles" subtitle="Save more by choosing grouped upgrade packages." />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STATIC_BUNDLES.map(bundle => {
                  const info = BUNDLE_DESCRIPTIONS[bundle.id];
                  const selected = isInCart(bundle.id);
                  return (
                    <motion.div
                      key={bundle.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-lg border p-5 flex flex-col transition-all cursor-pointer ${
                        selected
                          ? "border-primary bg-primary/[0.04] shadow-sm"
                          : "bg-white hover:shadow-sm hover:border-muted-foreground/20"
                      }`}
                      onClick={() => toggleItem(bundle)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-foreground">{bundle.name}</h3>
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          selected ? "bg-primary border-primary" : "border-muted-foreground/30"
                        }`}>
                          {selected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                      </div>
                      <p className="text-xl font-bold text-foreground mb-2">${bundle.price} <span className="text-xs font-normal text-muted-foreground">USD</span></p>
                      {info && (
                        <ul className="space-y-1 mt-auto">
                          {info.items.map((it, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ── HOSTING & SUPPORT ── */}
            <section>
              <SectionHeader icon={Server} title="Hosting & Support" subtitle="" />
              <div className="rounded-lg border bg-white p-4 mb-5">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every SwiftLift website includes free hosting by default. You are not locked in. If you prefer to host the website yourself later, your website files can be provided to you. Managed hosting is for clients who want convenience, support, and ongoing updates handled for them.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {STATIC_HOSTING.map(item => {
                  const selected = isInCart(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => toggleItem(item)}
                      className={`rounded-lg border p-4 cursor-pointer transition-all ${
                        selected
                          ? "border-primary bg-primary/[0.04] shadow-sm"
                          : "bg-white hover:shadow-sm hover:border-muted-foreground/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          selected ? "bg-primary border-primary" : "border-muted-foreground/30"
                        }`}>
                          {selected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                            <span className="text-sm font-bold text-foreground shrink-0">
                              ${item.price}{item.priceLabel ? <span className="text-xs font-normal text-muted-foreground"> / {item.priceLabel}</span> : ""}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-4">You always have full control of your website. No contracts, no lock-in.</p>
            </section>
          </div>

          {/* RIGHT: Cart */}
          <div className="hidden lg:block w-72 shrink-0">
            <CartSidebar items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} loading={checkoutLoading} error={checkoutError} />
          </div>
        </div>
      </div>

      {/* MOBILE CART */}
      <MobileCartBar items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} loading={checkoutLoading} error={checkoutError} />

      {/* FOOTER */}
      <div className="border-t bg-white">
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
