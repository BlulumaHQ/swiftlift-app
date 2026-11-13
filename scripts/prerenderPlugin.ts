// Build-time pre-render: after `vite build`, write dist/<route>.html for every
// indexable marketing route with its own <title>, description, canonical, og:url
// and JSON-LD, so crawlers see correct metadata without running JS.
// The SPA still boots on top. Netlify serves /faq → /faq.html (pretty URLs).
import fs from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { SEO_ROUTES, SITE } from "../src/lib/seoRoutes";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const setTag = (html: string, re: RegExp, tag: string) =>
  re.test(html) ? html.replace(re, tag) : html.replace("</head>", `  ${tag}\n</head>`);

const ORG = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "SwiftLift",
  url: SITE,
  logo: `${SITE}/swiftsite-logo.png`,
  parentOrganization: { "@type": "Organization", name: "Bluluma Design", url: "https://bluluma.com" },
};
const SERVICE = {
  "@type": "ProfessionalService",
  "@id": `${SITE}/#service`,
  name: "SwiftLift",
  url: SITE,
  image: `${SITE}/og-image.jpg`,
  description: SEO_ROUTES["/"].description,
  serviceType: ["Website Redesign", "Small Business Website Design", "Managed Website Hosting"],
  areaServed: { "@type": "Country", name: "United States" },
  priceRange: "$$",
  provider: { "@id": `${SITE}/#organization` },
};

export default function prerenderPlugin(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "swiftlift-prerender",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    closeBundle() {
      const out = path.resolve(config.root, config.build.outDir);
      const template = fs.readFileSync(path.join(out, "index.html"), "utf8");
      let n = 0;
      for (const [route, m] of Object.entries(SEO_ROUTES)) {
        const url = `${SITE}${route}`;
        const t = esc(m.title);
        const d = esc(m.description);
        let html = template;
        html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
        html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${d}" />`);
        html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}" />`);
        html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${d}" />`);
        html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
        html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
        const graph: object[] = [ORG];
        if (route === "/") graph.push(SERVICE, { "@type": "WebSite", "@id": `${SITE}/#website`, name: "SwiftLift", url: SITE, publisher: { "@id": `${SITE}/#organization` } });
        else
          graph.push({
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: m.title.split(/ [|—] /)[0], item: url },
            ],
          });
        const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
        html = html.replace("</head>", `    <script type="application/ld+json">${ld}</script>\n  </head>`);
        const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
        fs.writeFileSync(path.join(out, file), html);
        n++;
      }
      console.log(`swiftlift-prerender: wrote ${n} pages`);
    },
  };
}
