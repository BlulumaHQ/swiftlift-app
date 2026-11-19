import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fullShot, homeStudies, useCmsPortfolio, type StudyVersion } from "@/lib/cmsPortfolio";
import { ScrollShot } from "@/components/ScrollShot";

function SiteLink({ url, children, className }: { url: string | null; children: ReactNode; className: string }) {
  return url ? <a href={url} target="_blank" rel="noopener noreferrer" className={`${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4`}>{children}</a>
    : <div className={className}>{children}</div>;
}

function VersionFrame({ title, version }: { title: string; version: StudyVersion }) {
  const raw = version.label.replace(/^Version\s+/i, "").trim();
  const label = raw === "A" ? "A · Classic Facelift" : raw === "B" ? "B · Growth Facelift" : version.label;
  return (
    <SiteLink url={version.url} className={`ss-shot-card group relative block min-w-0 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-xl ${version.chosen ? "border-2 border-[hsl(var(--accent-purple))]" : "border-border"}`}>
      <div className="flex h-11 items-center gap-3 border-b border-border bg-secondary px-4">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">{[0, 1, 2].map((dot) => <span key={dot} className="h-2 w-2 rounded-full bg-muted-foreground/40" />)}</span>
        <span className="truncate text-xs font-bold">{label}</span>
        {version.url && <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />}
      </div>
      <div className="relative">
        <ScrollShot src={version.image} alt={`${title} website, ${label}`} />
        {version.chosen && <span className="pointer-events-none absolute left-3 top-3 w-fit rounded-full bg-[hsl(var(--accent-purple))] px-3 py-1.5 text-xs font-bold text-white shadow-sm">Client chose {raw === "A" || raw === "B" ? raw : label}</span>}
      </div>
    </SiteLink>
  );
}

export default function Portfolio({ variant }: { variant: "home" | "all" }) {
  const { data, isPending, isError } = useCmsPortfolio();
  const studies = data ? (variant === "home" ? homeStudies(data.studies) : data.studies) : [];
  const singles = variant === "all" ? data?.singles ?? [] : [];
  if (isError || (!isPending && studies.length === 0 && singles.length === 0)) return null;

  return (
    <section id="portfolio" aria-labelledby={`portfolio-heading-${variant}`} className="border-y border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center md:mb-12">
          <p className="sl-eyebrow mb-3 text-sm">Two directions</p>
          <h2 id={`portfolio-heading-${variant}`} className="font-display text-3xl font-black leading-tight tracking-tight text-foreground md:text-[2.6rem]">Two designs, one business</h2>
        </div>
        {isPending ? (
          <div role="status" aria-label="Loading portfolio" className="space-y-10">
            {[0, 1].map((study) => <div key={study} aria-hidden="true">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{[0, 1].map((version) => <div key={version} className="overflow-hidden rounded-xl border border-border motion-safe:animate-pulse"><div className="h-11 bg-secondary" /><div className="aspect-[16/10] bg-muted" /></div>)}</div>
              <div className="mt-5 h-5 w-40 rounded bg-muted motion-safe:animate-pulse" />
            </div>)}
          </div>
        ) : (
          <>
            <div className="space-y-10 md:space-y-14">
              {studies.map((study) => <article key={study.key}>
                <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
                  {study.versions.map((version, i) => <VersionFrame key={`${version.label}-${i}`} title={study.title} version={version} />)}
                </div>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <h3 className="font-display text-lg font-bold tracking-normal text-foreground md:text-xl">{study.title}</h3>
                  {study.category && <p className="text-sm text-muted-foreground">{study.category}</p>}
                </div>
              </article>)}
            </div>
            {singles.length > 0 && <div className={studies.length ? "mt-16 border-t border-border pt-12" : ""}>
              <h3 className="mb-7 font-display text-2xl font-bold tracking-normal text-foreground">More launched sites</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {singles.map((item) => <SiteLink key={item.id} url={item.live_url} className="ss-shot-card group block min-w-0 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-xl">
                  <ScrollShot src={fullShot(item)} alt={`${item.title} website`} />
                  <div className="p-5"><h4 className="flex items-start justify-between gap-3 font-display text-base font-bold tracking-normal">{item.title}{item.live_url && <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />}</h4>{item.category && <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>}</div>
                </SiteLink>)}
              </div>
            </div>}
            {variant === "home" && <div className="mt-10 text-center"><Button asChild variant="link" className="font-semibold text-[hsl(var(--accent-purple))]"><Link to="/portfolio">See all work <ArrowRight aria-hidden="true" /></Link></Button></div>}
          </>
        )}
      </div>
    </section>
  );
}
