// Writes dist/sitemap.xml at build time with a fresh <lastmod>.
// Only public marketing pages; checkout, payment, revision and client-link pages stay out.
import fs from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { INDUSTRY_PAGES } from "../src/lib/industryContent";

const SITE = "https://swiftlift.app";
export const SITEMAP_ROUTES: { path: string; priority: number; changefreq: string }[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/portfolio", priority: 0.9, changefreq: "weekly" },
  { path: "/features", priority: 0.8, changefreq: "monthly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/faq", priority: 0.7, changefreq: "monthly" },
  { path: "/hosting-guide", priority: 0.6, changefreq: "monthly" },
  ...INDUSTRY_PAGES.map((p) => ({ path: `/website-redesign/${p.slug}`, priority: 0.8, changefreq: "monthly" })),
  { path: "/privacy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms", priority: 0.3, changefreq: "yearly" },
];

export default function sitemapPlugin(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "swiftlift-sitemap",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = SITEMAP_ROUTES.map((r) =>
        [
          "  <url>",
          `    <loc>${SITE}${r.path}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>${r.changefreq}</changefreq>`,
          `    <priority>${r.priority.toFixed(1)}</priority>`,
          "  </url>",
        ].join("\n"),
      );
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
      fs.writeFileSync(path.join(path.resolve(config.root, config.build.outDir), "sitemap.xml"), xml);
      config.logger.info(`swiftlift-sitemap: ${SITEMAP_ROUTES.length} URLs`);
    },
  };
}
