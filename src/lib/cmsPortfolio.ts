import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

// Public catalog only: never share the site's authenticated backend client.
const cms = createClient(
  "https://uzdjwpkgldzhnoxjeyrw.supabase.co",
  "sb_publishable_ifsg2zxajGqu19GsJ2X4RQ_KHBHGIvi",
  { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
);

export type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  is_featured: boolean;
  sort_order: number | null;
  show_on: string[] | null;
  category: string | null;
  live_url: string | null;
  project_year: number | null;
  versions: { screenshot_url?: string | null; screenshot_full_url?: string | null }[] | null;
  version_count: number | null;
  featured_on: string[] | null;
  pair_title: string | null;
  pair_label: string | null;
};

export type StudyVersion = { label: string; url: string | null; image: string | null; chosen: boolean };
export type Study = { key: string; title: string; category: string | null; featured: boolean; versions: StudyVersion[] };
const STAGING = [".netlify.app", ".workers.dev", ".pages.dev", ".lovable.app", ".bluluma.com"];
// Version the client picked, for pairs where neither (or both) versions sit on a real domain yet.
const CLIENT_CHOSE: Record<string, string> = {
  "Mutt Puddles Dog Wash": "A",
  "Gene's Sausage Shop": "B",
};
// Prefer the full-length homepage capture so the hover auto-scroll has the whole page to move through.
export const fullShot = (v: PortfolioItem) =>
  v.versions?.[0]?.screenshot_full_url ?? v.featured_image_url ?? v.versions?.[0]?.screenshot_url ?? null;
const isRealDomain = (u: string | null) => !!u && !STAGING.some((d) => u.toLowerCase().includes(d));

export function buildPortfolio(rows: PortfolioItem[]) {
  const groups = new Map<string, PortfolioItem[]>();
  for (const r of rows) {
    if (r.pair_label && r.pair_title) {
      const g = groups.get(r.pair_title) ?? [];
      g.push(r);
      groups.set(r.pair_title, g);
    }
  }
  const studies: Study[] = [];
  const singles: PortfolioItem[] = [];
  const seen = new Set<string>();
  for (const r of rows) {
    const title = r.pair_title;
    const g = r.pair_label && title ? groups.get(title) : undefined;
    if (!g || g.length < 2 || !title) { singles.push(r); continue; }
    if (seen.has(title)) continue;
    seen.add(title);
    const sorted = [...g].sort((a, b) => (a.pair_label ?? "").localeCompare(b.pair_label ?? "")).slice(0, 2);
    const real = sorted.map((v) => isRealDomain(v.live_url));
    const one = real.filter(Boolean).length === 1;
    const picked = CLIENT_CHOSE[title];
    studies.push({
      key: title, title,
      category: sorted.find((v) => v.category)?.category ?? null,
      featured: g.some((v) => v.featured_on?.includes("swiftlift")),
      versions: sorted.map((v, i) => ({
        label: v.pair_label ?? "", url: v.live_url,
        image: fullShot(v),
        chosen: picked ? v.pair_label === picked : one && real[i] === true,
      })),
    });
  }
  studies.sort((a, b) => Number(b.featured) - Number(a.featured));
  return { studies, singles };
}

export function homeStudies(studies: Study[]) {
  const featured = studies.filter((study) => study.featured);
  return (featured.length ? featured : studies).slice(0, 6);
}

export function useCmsPortfolio() {
  return useQuery({
    queryKey: ["cms-portfolio", "swiftlift"],
    staleTime: 5 * 60 * 1000,
    retry: 1,
    queryFn: async () => {
      const { data, error } = await cms.from("portfolio_feed")
        .select("id,title,slug,excerpt,featured_image_url,is_featured,sort_order,show_on,category,live_url,project_year,versions,version_count,featured_on,pair_title,pair_label")
        .contains("show_on", ["swiftlift"])
        .order("is_featured", { ascending: false })
        .order("sort_order", { ascending: true })
        .order("publish_date", { ascending: false });
      if (error) throw error;
      return buildPortfolio((data ?? []) as PortfolioItem[]);
    },
  });
}