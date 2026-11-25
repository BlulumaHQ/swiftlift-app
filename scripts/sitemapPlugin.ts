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
  { path: "/work-with-us", priority: 0.6, changefreq: "monthly" },
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
      const outDir = path.resolve(config.root, config.build.outDir);
      const assetDir = path.join(outDir, "assets");
      const assets = fs.existsSync(assetDir) ? fs.readdirSync(assetDir) : [];
      const portfolioShots = assets.filter((f) => /^portfolio-.+\.webp$/.test(f)).map((f) => `${SITE}/assets/${f}`);
      // Image sitemap entries: portfolio shots on the homepage and portfolio page, founder photo on About.
      const imagesFor = (p: string): string[] =>
        p === "/" || p === "/portfolio"
          ? portfolioShots
          : p === "/about"
            ? [`${SITE}/images/sony-lin-swiftlift-lead-designer.webp`]
            : [];
      const urls = SITEMAP_ROUTES.map((r) =>
        [
          "  <url>",
          `    <loc>${SITE}${r.path}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>${r.changefreq}</changefreq>`,
          `    <priority>${r.priority.toFixed(1)}</priority>`,
          ...imagesFor(r.path).map((src) => `    <image:image><image:loc>${src}</image:loc></image:image>`),
          "  </url>",
        ].join("\n"),
      );
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join("\n")}\n</urlset>\n`;
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml);
      config.logger.info(`swiftlift-sitemap: ${SITEMAP_ROUTES.length} URLs`);
    },
  };
}
