import { describe, expect, it } from "vitest";
import { buildPortfolio, homeStudies, type PortfolioItem } from "@/lib/cmsPortfolio";

const row = (id: string, values: Partial<PortfolioItem> = {}): PortfolioItem => ({
  id, title: `Project - ${id}`, slug: id, excerpt: null, featured_image_url: null,
  is_featured: false, sort_order: 0, show_on: ["swiftlift"], category: null,
  live_url: null, project_year: null, versions: null, version_count: null,
  featured_on: null, pair_title: "Project", pair_label: id, ...values,
});

describe("CMS portfolio rules", () => {
  it("groups paired rows and orders A before B", () => {
    const { studies, singles } = buildPortfolio([row("B"), row("A")]);
    expect(studies[0].title).toBe("Project");
    expect(studies[0].versions.map((v) => v.label)).toEqual(["A", "B"]);
    expect(singles).toHaveLength(0);
  });
  it("marks only the sole real-domain version as chosen", () => {
    for (const domain of [".netlify.app", ".workers.dev", ".pages.dev", ".lovable.app", ".bluluma.com"]) {
      const { studies } = buildPortfolio([row("A", { live_url: "https://business.com" }), row("B", { live_url: `https://preview${domain}` })]);
      expect(studies[0].versions.map((v) => v.chosen)).toEqual([true, false]);
    }
    const { studies } = buildPortfolio([row("A", { live_url: "https://business.com" }), row("B", { live_url: "https://other.com" })]);
    expect(studies[0].versions.map((v) => v.chosen)).toEqual([false, false]);
  });
  it("uses swiftlift featured_on rather than global is_featured", () => {
    const { studies } = buildPortfolio([row("A", { is_featured: true }), row("B"), row("A2", { pair_title: "Featured", featured_on: ["swiftlift"] }), row("B2", { pair_title: "Featured" })]);
    expect(homeStudies(studies).map((s) => s.title)).toEqual(["Featured"]);
  });
  it("falls back to six studies when none is featured", () => {
    const rows = Array.from({ length: 8 }, (_, i) => [row("A", { pair_title: `Study ${i}` }), row("B", { pair_title: `Study ${i}` })]).flat();
    expect(homeStudies(buildPortfolio(rows).studies)).toHaveLength(6);
  });
  it("limits featured homepage studies to six", () => {
    const rows = Array.from({ length: 8 }, (_, i) => [row("A", { pair_title: `Study ${i}`, featured_on: ["swiftlift"] }), row("B", { pair_title: `Study ${i}` })]).flat();
    expect(homeStudies(buildPortfolio(rows).studies)).toHaveLength(6);
  });
  it("keeps unpaired rows as singles and falls back to version screenshot", () => {
    const single = row("solo", { pair_label: null });
    const { studies, singles } = buildPortfolio([single, row("A", { versions: [{ screenshot_url: "https://example.com/a.jpg" }] }), row("B")]);
    expect(singles).toEqual([single]);
    expect(studies[0].versions[0].image).toBe("https://example.com/a.jpg");
  });
});