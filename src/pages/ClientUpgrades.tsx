import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { externalSupabase as supabase } from "@/lib/externalSupabase";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, X, Check, Package, Server, AlertTriangle,
  ChevronUp, ChevronDown, ExternalLink, Sparkles, Mail
} from "lucide-react";
import { Link } from "react-router-dom";
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

interface ClientData {
  display_name: string;
}

interface ProjectData {
  project_code: string;
}

interface Addon {
  id: string;
  name: string;
  public_name: string | null;
  description: string | null;
  price: number;
  currency: string;
  stripe_payment_link_url: string | null;
  sort_order: number;
}

interface Bundle {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  stripe_payment_link_url: string | null;
  sort_order: number;
}

interface ServiceItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  price_label: string | null;
  stripe_payment_link_url: string | null;
  sort_order: number;
}

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

interface BundleItem {
  id: string;
  bundle_id: string;
  addon_id: string;
}

/* ═══════════════════════════════════════════════
   INVALID / SUCCESS / CANCEL SCREENS
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

/* ═══════════════════════════════════════════════
   PRODUCT CARD
   ═══════════════════════════════════════════════ */

const ProductCard = ({
  name, description, price, priceLabel, inCart, onAdd, includedItems
}: {
  name: string;
  description: string | null;
  price: number;
  priceLabel?: string | null;
  inCart: boolean;
  onAdd: () => void;
  includedItems?: string[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
  >
    <h3 className="text-lg font-semibold text-foreground">{name}</h3>
    {description && <p className="text-sm text-muted-foreground mt-2 flex-1">{description}</p>}
    {includedItems && includedItems.length > 0 && (
      <ul className="mt-3 space-y-1">
        {includedItems.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
    <div className="mt-4 pt-4 border-t flex items-center justify-between">
      <span className="text-xl font-bold text-foreground">
        ${isNaN(price) ? 0 : price} <span className="text-sm font-normal text-muted-foreground">USD{priceLabel ? ` / ${priceLabel}` : ""}</span>
      </span>
      <Button
        onClick={onAdd}
        disabled={inCart}
        size="sm"
        className={inCart
          ? "bg-muted text-muted-foreground cursor-not-allowed"
          : "text-white hover:opacity-90"
        }
        style={!inCart ? { background: "hsl(275 51% 46%)" } : undefined}
      >
        {inCart ? (
          <><Check className="w-4 h-4 mr-1" /> Added</>
        ) : (
          <><ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart</>
        )}
      </Button>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════
   LOADING SKELETON
   ═══════════════════════════════════════════════ */

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-6xl mx-auto px-5 py-16 space-y-8">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-10 w-80" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   CART SIDEBAR (DESKTOP)
   ═══════════════════════════════════════════════ */

const CartSidebar = ({
  items, onRemove, onCheckout, loading
}: {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  loading: boolean;
}) => {
  const total = items.reduce((s, i) => s + (isNaN(i.price) ? 0 : i.price), 0);
  return (
    <div className="sticky top-6 rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Your Cart</h3>
        <span className="ml-auto text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No upgrades selected yet.</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {items.map(item => (
            <div key={item.id} className="flex items-start justify-between gap-2 py-2 border-b last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">${isNaN(item.price) ? 0 : item.price} USD</p>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-destructive mt-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between font-semibold text-foreground mb-4">
          <span>Total</span>
          <span>${total} USD</span>
        </div>
        <Button
          onClick={onCheckout}
          disabled={items.length === 0 || loading}
          className="w-full text-white hover:opacity-90"
          style={{ background: "hsl(275 51% 46%)" }}
        >
          {loading ? "Processing..." : "Checkout Selected Upgrades"}
        </Button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MOBILE CART BAR
   ═══════════════════════════════════════════════ */

const MobileCartBar = ({
  items, onRemove, onCheckout, loading
}: {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  loading: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const total = items.reduce((s, i) => s + (isNaN(i.price) ? 0 : i.price), 0);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-2xl lg:hidden">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="overflow-hidden border-b"
          >
            <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
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
      <div className="p-4 flex items-center gap-3">
        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-foreground">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <span className="font-semibold">{items.length} item{items.length !== 1 ? "s" : ""}</span>
          <span className="text-muted-foreground">·</span>
          <span className="font-semibold">${total}</span>
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
        <Button
          onClick={onCheckout}
          disabled={loading}
          className="ml-auto text-white hover:opacity-90"
          style={{ background: "hsl(275 51% 46%)" }}
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
  const [addons, setAddons] = useState<Addon[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [bundleItems, setBundleItems] = useState<BundleItem[]>([]);
  const [selectableAddons, setSelectableAddons] = useState<SelectableAddon[]>([]);
  const [selectedAddonIds, setSelectedAddonIds] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [debugData, setDebugData] = useState<any>(undefined);
  const [debugError, setDebugError] = useState<any>(undefined);

  const tokenFromUrl = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    const load = async () => {
      // DEBUG: simple token lookup only
      const { data, error } = await supabase
        .from('upgrade_access_links')
        .select('*')
        .eq('token', tokenFromUrl || '')
        .maybeSingle();

      setDebugData(data);
      setDebugError(error);

      if (data) {
        setAccessLink(data as AccessLink);

        // Fetch products + selectable addons from service_items
        const [clientRes, projectRes, addonsRes, bundlesRes, serviceRes, bundleItemsRes, selectableRes] = await Promise.all([
          supabase.from("clients").select("display_name").eq("id", data.client_id).maybeSingle(),
          supabase.from("projects").select("project_code").eq("id", data.project_id).maybeSingle(),
          supabase.from("addons").select("*").eq("organization_id", data.organization_id).eq("is_active", true).order("sort_order"),
          supabase.from("bundles").select("*").eq("organization_id", data.organization_id).eq("is_active", true).order("sort_order"),
          supabase.from("service_items").select("*").eq("organization_id", data.organization_id).eq("is_active", true).order("sort_order"),
          supabase.from("bundle_items").select("*"),
          // Selectable addons: from service_items for the specific org, sorted by price
          supabase.from("service_items").select("id, service_key, name, description, price_usd, currency, billing_type, stripe_name, stripe_payment_link_url").eq("organization_id", "1e3bf8d7-5cbb-40e3-886c-ed18e554a741").eq("service_type", "addon").eq("is_active", true).order("price_usd", { ascending: true }),
        ]);

        if (clientRes.data) setClient(clientRes.data as ClientData);
        if (projectRes.data) setProject(projectRes.data as ProjectData);
        if (addonsRes.data) setAddons(addonsRes.data as Addon[]);
        if (bundlesRes.data) setBundles(bundlesRes.data as Bundle[]);
        if (serviceRes.data) setServiceItems(serviceRes.data as ServiceItem[]);
        if (bundleItemsRes.data) setBundleItems(bundleItemsRes.data as BundleItem[]);
        if (selectableRes.data) setSelectableAddons(selectableRes.data as SelectableAddon[]);
      }

      setState("ready");
    };

    load();
  }, [tokenFromUrl]);

  const addonMap = useMemo(() => {
    const m: Record<string, Addon> = {};
    addons.forEach(a => { m[a.id] = a; });
    return m;
  }, [addons]);

  const toggleAddonSelection = useCallback((addon: SelectableAddon) => {
    setSelectedAddonIds(prev => {
      const next = new Set(prev);
      if (next.has(addon.id)) {
        next.delete(addon.id);
        // Also remove from cart
        setCart(c => c.filter(item => item.id !== addon.id));
      } else {
        next.add(addon.id);
        // Also add to cart
        setCart(c => {
          if (c.find(item => item.id === addon.id)) return c;
          return [...c, {
            id: addon.id,
            type: "service_item" as const,
            name: addon.name,
            price: Number(addon.price_usd) || 0,
            currency: addon.currency,
            stripe_url: addon.stripe_payment_link_url || undefined,
          }];
        });
      }
      return next;
    });
  }, []);

  const addonSubtotal = useMemo(() => {
    return selectableAddons
      .filter(a => selectedAddonIds.has(a.id))
      .reduce((sum, a) => sum + (Number(a.price_usd) || 0), 0);
  }, [selectableAddons, selectedAddonIds]);

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      if (prev.find(c => c.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
    // Also deselect if it's an addon
    setSelectedAddonIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const isInCart = useCallback((id: string) => cart.some(c => c.id === id), [cart]);

  const selectedAddons = useMemo(() => {
    return selectableAddons
      .filter(a => selectedAddonIds.has(a.id))
      .map(a => ({
        service_key: a.service_key,
        name: a.name,
        price_usd: Number(a.price_usd) || 0,
        stripe_name: a.stripe_name,
      }));
  }, [selectableAddons, selectedAddonIds]);

  const handleCheckout = async () => {
    if (selectedAddons.length === 0) return;
    setCheckoutLoading(true);
    setCheckoutError(null);

    const payload = {
      items: selectedAddons,
      total: addonSubtotal,
      currency: "USD",
    };

    console.log("=== CHECKOUT PAYLOAD ===", JSON.stringify(payload, null, 2));

    // Track purchase_started (non-blocking)
    if (accessLink) {
      supabase.from("upgrade_access_events").insert({
        access_link_id: accessLink.id,
        event_type: "purchase_started",
        metadata_json: { token, items: selectedAddons.map(a => a.name), total: addonSubtotal }
      }).then(() => {});
    }

    setCheckoutLoading(false);
  };

  if (isSuccess) return <SuccessScreen />;
  if (isCanceled) return <CancelScreen />;
  if (state === "loading") return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* ─── SITE HEADER ─── */}
      <header className="bg-white border-b border-gray-100" style={{ boxShadow: '0 1px 12px hsl(0 0% 0% / 0.06)' }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={swiftsiteLogo} alt="SwiftLift Studio" className="h-10 w-auto" />
          </Link>
          <a
            href="mailto:support@swiftlift.app"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={15} />
            <span className="hidden sm:inline">support@swiftlift.app</span>
          </a>
        </div>
      </header>

      {/* ─── PAGE HEADER ─── */}
      <div className="bg-card border-b">
        <div className="max-w-6xl mx-auto px-5 py-8 md:py-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(275 51% 46%)" }}>Secure Client Access</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Upgrade Options for Your Website</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground mb-2">
            {client && <span>Client: <strong className="text-foreground">{client.display_name}</strong></span>}
            {project && <span>Project: <strong className="text-foreground">{project.project_code}</strong></span>}
          </div>
          <p className="text-sm text-muted-foreground max-w-xl">
            Any upgrade selected here will be linked directly to your website project.
          </p>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="flex gap-8 items-start">
          {/* LEFT: Products */}
          <div className="flex-1 min-w-0">
            <Tabs defaultValue="addons">
              <TabsList className="w-full justify-start mb-8 bg-muted/50 sticky top-0 z-10">
                <TabsTrigger value="addons" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Add-ons
                </TabsTrigger>
                <TabsTrigger value="bundles" className="flex items-center gap-2">
                  <Package className="w-4 h-4" /> Bundles
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <Server className="w-4 h-4" /> Hosting & Support
                </TabsTrigger>
              </TabsList>

              {/* ADD-ONS (checkbox-based selection from service_items) */}
              <TabsContent value="addons">
                {selectableAddons.length === 0 ? (
                  <p className="text-muted-foreground text-center py-12">No add-ons available at this time.</p>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      {selectableAddons.map(addon => {
                        const price = Number(addon.price_usd) || 0;
                        const isSelected = selectedAddonIds.has(addon.id);
                        return (
                          <motion.div
                            key={addon.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => toggleAddonSelection(addon)}
                            className={`rounded-xl border p-5 cursor-pointer transition-all ${
                              isSelected
                                ? "border-[hsl(275,51%,46%)] bg-[hsl(275,51%,46%)]/5 shadow-md"
                                : "bg-card hover:shadow-sm hover:border-muted-foreground/20"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "border-[hsl(275,51%,46%)]" : "border-muted-foreground/30"
                              }`} style={isSelected ? { background: "hsl(275 51% 46%)" } : undefined}>
                                {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                  <h3 className="font-semibold text-foreground">{addon.name}</h3>
                                  <span className="text-lg font-bold text-foreground shrink-0">
                                    ${price} <span className="text-sm font-normal text-muted-foreground">USD</span>
                                  </span>
                                </div>
                                {addon.description && (
                                  <p className="text-sm text-muted-foreground mt-1">{addon.description}</p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Live Subtotal */}
                    <div className="rounded-xl border bg-card p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {selectedAddonIds.size} add-on{selectedAddonIds.size !== 1 ? "s" : ""} selected
                          </p>
                          <p className="text-2xl font-bold text-foreground mt-1">
                            ${addonSubtotal} <span className="text-sm font-normal text-muted-foreground">USD</span>
                          </p>
                        </div>
                        <Button
                          onClick={handleCheckout}
                          disabled={selectedAddonIds.size === 0 || checkoutLoading}
                          className="text-white hover:opacity-90"
                          style={{ background: "hsl(275 51% 46%)" }}
                        >
                          {checkoutLoading ? "Processing..." : "Continue to Checkout"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* BUNDLES */}
              <TabsContent value="bundles">
                <div className="grid md:grid-cols-2 gap-5">
                  {bundles.map(bundle => {
                    const items = bundleItems
                      .filter(bi => bi.bundle_id === bundle.id)
                      .map(bi => addonMap[bi.addon_id]?.name)
                      .filter(Boolean) as string[];
                    return (
                      <ProductCard
                        key={bundle.id}
                        name={bundle.name}
                        description={bundle.description}
                        price={Number(bundle.price) || 0}
                        inCart={isInCart(bundle.id)}
                        includedItems={items}
                        onAdd={() => addToCart({
                          id: bundle.id, type: "bundle",
                          name: bundle.name,
                          price: Number(bundle.price) || 0, currency: bundle.currency,
                          stripe_url: bundle.stripe_payment_link_url || undefined,
                        })}
                      />
                    );
                  })}
                  {bundles.length === 0 && (
                    <p className="text-muted-foreground col-span-2 text-center py-12">No bundles available at this time.</p>
                  )}
                </div>
              </TabsContent>

              {/* HOSTING & SUPPORT */}
              <TabsContent value="services">
                <div className="space-y-8">
                  {/* Explanation blocks */}
                  <div className="rounded-xl border bg-card p-6 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Every SwiftLift website includes free hosting by default.
                      <br /><br />
                      You are never locked into our system. If you prefer to host your website yourself, we can provide the full website files for you to manage independently at any time.
                      <br /><br />
                      Our managed hosting option is simply for convenience — for clients who prefer ongoing support and updates handled for them.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed border-t pt-4">
                      Updates are handled directly to ensure performance and stability.
                      <br /><br />
                      You can request changes anytime, or choose a plan for ongoing support.
                    </p>
                  </div>

                  {/* Service cards */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {serviceItems.map(item => (
                      <ProductCard
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        price={Number(item.price) || 0}
                        priceLabel={item.price_label}
                        inCart={isInCart(item.id)}
                        onAdd={() => addToCart({
                          id: item.id, type: "service_item",
                          name: item.name,
                          price: Number(item.price) || 0, currency: item.currency,
                          stripe_url: item.stripe_payment_link_url || undefined,
                        })}
                      />
                    ))}
                    {serviceItems.length === 0 && (
                      <p className="text-muted-foreground col-span-2 text-center py-12">No services available at this time.</p>
                    )}
                  </div>

                  <p className="text-center text-sm text-muted-foreground pt-2">
                    You always have full control of your website. No contracts, no lock-in.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Checkout error */}
            {checkoutError && (
              <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {checkoutError}
              </div>
            )}
          </div>

          {/* RIGHT: Cart sidebar (desktop) */}
          <div className="hidden lg:block w-80 shrink-0">
            <CartSidebar items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} loading={checkoutLoading} />
          </div>
        </div>
      </div>

      {/* MOBILE CART */}
      <MobileCartBar items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} loading={checkoutLoading} />

      {/* SUPPORT FOOTER */}
      <div className="border-t bg-card">
        <div className="max-w-6xl mx-auto px-5 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help choosing? Contact us at{" "}
            <a href="mailto:support@swiftlift.app" className="text-primary hover:underline">support@swiftlift.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
