// Build-time pre-render: after `vite build`, write dist/<route>.html for every
// indexable marketing route with its own <title>, description, canonical, og:url
// and JSON-LD, so crawlers see correct metadata without running JS.
// The SPA still boots on top. Netlify serves /faq → /faq.html (pretty URLs).
import fs from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { SEO_ROUTES, SITE } from "../src/lib/seoRoutes";
import { INDUSTRY_PAGES } from "../src/lib/industryContent";
import { ALL_FAQS, HOME_FAQS } from "../src/lib/faqContent";

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
  email: "support@swiftlift.app",
  founder: { "@type": "Person", name: "Sony Lin", jobTitle: "Founder & Lead Designer", url: "https://sonykundesign.com/" },
};
const SERVICE = {
  "@type": "ProfessionalService",
  "@id": `${SITE}/#service`,
  name: "SwiftLift",
  url: SITE,
  image: `${SITE}/og-image.jpg`,
  description: SEO_ROUTES["/"].description,
  serviceType: ["Website Facelift", "Website Redesign", "Small Business Website Design"],
  areaServed: { "@type": "Country", name: "United States" },
  priceRange: "$299–$499",
  makesOffer: [
    { "@type": "Offer", name: "Classic Facelift", price: "299", priceCurrency: "USD", description: "A clean, professional website redesign of your existing site." },
    { "@type": "Offer", name: "Growth Facelift", price: "499", priceCurrency: "USD", description: "Redesign with a conversion-focused layout built to turn more visitors into inquiries." },
    { "@type": "Offer", name: "Care Plan", price: "135", priceCurrency: "USD", description: "Yearly plan with up to 2 small website edits every month." },
  ],
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
        if (route === "/") graph.push(SERVICE, { "@type": "WebSite", "@id": `${SITE}/#website`, name: "SwiftLift", url: SITE, publisher: { "@id": `${SITE}/#organization` } }, {
          "@type": "FAQPage",
          mainEntity: HOME_FAQS.map((f) => ({ "@type": "Question", name: f.q.en, acceptedAnswer: { "@type": "Answer", text: f.a.en } })),
        });
        else {
          const ind = INDUSTRY_PAGES.find((p) => route === `/website-redesign/${p.slug}`);
          if (ind) {
            graph.push(
              {
                "@type": "Service",
                name: `Website Redesign for ${ind.label}`,
                serviceType: "Website Redesign",
                url,
                description: ind.description,
                provider: { "@id": `${SITE}/#organization` },
                areaServed: { "@type": "Country", name: "United States" },
                offers: [
                  { "@type": "Offer", name: "Classic Facelift", price: "299", priceCurrency: "USD" },
                  { "@type": "Offer", name: "Growth Facelift", price: "499", priceCurrency: "USD" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: ind.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            );
          }
          if (route === "/faq") {
            graph.push({
              "@type": "FAQPage",
              mainEntity: ALL_FAQS.map((f) => ({
                "@type": "Question",
                name: f.q.en,
                acceptedAnswer: { "@type": "Answer", text: f.a.en },
              })),
            });
          }
          graph.push({
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: m.title.split(/ [|—] /)[0], item: url },
            ],
          });
        }
        const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
        html = html.replace("</head>", `    <script type="application/ld+json">${ld}</script>\n  </head>`);
        const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
        fs.mkdirSync(path.dirname(path.join(out, file)), { recursive: true });
        fs.writeFileSync(path.join(out, file), html);
        n++;
      }
      console.log(`swiftlift-prerender: wrote ${n} pages`);
    },
  };
}
