import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
]);

/** Per-route canonical (index.html ships "/" for every page) and robots. */
export default function RouteHead() {
  const { pathname } = useLocation();
  useEffect(() => {
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
