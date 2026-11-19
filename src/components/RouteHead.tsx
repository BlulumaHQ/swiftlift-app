import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO_ROUTES } from "@/lib/seoRoutes";

const SITE = "https://swiftlift.app";
const PLATFORM_HOST = /(^|\.)(lovable\.app|workers\.dev|pages\.dev|netlify\.app)$/i;
/** Preview/platform hosts stay noindex (set by index.html); never override that. */
const onPlatformHost = () => PLATFORM_HOST.test(window.location.hostname.replace(/\.$/, ""));
/** Checkout, payment, revision and private client-link pages: keep out of search. */
const NOINDEX = new Set([
  "/deployment",
  "/custom-brief",
  "/revision-request",
  "/revision-payment",
  "/payment-success",
  "/pay-build",
  "/client-upgrades",
  "/start",
  "/support",
  "/work-with-us",
  "/addons",
  "/go-live",
  "/review",
  "/admin/send",
]);

/** Per-route canonical (index.html ships "/" for every page) and robots. */
let firstRoute = true;

export default function RouteHead() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Meta Pixel fires PageView on initial load (index.html); track SPA navigations here.
    if (firstRoute) firstRoute = false;
    else (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "PageView");
    const clean = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${SITE}${clean}`;
    let og = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (og) og.content = `${SITE}${clean}`;
    // Keep <title> and descriptions in sync on client-side navigation (prerendered HTML already has them).
    const meta = SEO_ROUTES[clean];
    if (meta) {
      document.title = meta.title;
      const set = (sel: string, value: string) => {
        const el = document.head.querySelector<HTMLMetaElement>(sel);
        if (el) el.content = value;
      };
      set('meta[name="description"]', meta.description);
      set('meta[property="og:title"]', meta.title);
      set('meta[property="og:description"]', meta.description);
      set('meta[name="twitter:title"]', meta.title);
      set('meta[name="twitter:description"]', meta.description);
    }
    if (onPlatformHost()) return;
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = NOINDEX.has(clean) ? "noindex, follow" : "index, follow, max-image-preview:large";
  }, [pathname]);
  return null;
}
