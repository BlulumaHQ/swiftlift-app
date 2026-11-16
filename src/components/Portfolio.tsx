import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homeStudies, useCmsPortfolio, type StudyVersion } from "@/lib/cmsPortfolio";

function PreviewImage({ image, alt }: { image: string | null; alt: string }) {
  return (
    <div className="aspect-[16/10] overflow-hidden bg-muted">
      {image ? <img src={image} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
        : <div role="img" aria-label={alt} className="flex h-full items-center justify-center"><ImageIcon className="h-8 w-8 text-muted-foreground" aria-hidden="true" /></div>}
    </div>
  );
}

function SiteLink({ url, children, className }: { url: string | null; children: ReactNode; className: string }) {
  return url ? <a href={url} target="_blank" rel="noopener noreferrer" className={`${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4`}>{children}</a>
    : <div className={className}>{children}</div>;
}

function VersionFrame({ title, version }: { title: string; version: StudyVersion }) {
  const label = version.label.startsWith("Version ") ? version.label : `Version ${version.label}`;
  return (
    <SiteLink url={version.url} className="group relative block min-w-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
      <div className="flex h-11 items-center gap-3 border-b border-border bg-secondary px-4">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">{[0, 1, 2].map((dot) => <span key={dot} className="h-2 w-2 rounded-full bg-muted-foreground/40" />)}</span>
        <span className="truncate text-xs font-semibold">{label}</span>
        {version.url && <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />}
      </div>
      <div className="relative">
        <PreviewImage image={version.image} alt={`${title} website, ${label}`} />
        {version.chosen && <span className="absolute bottom-3 left-3 right-3 w-fit max-w-[calc(100%-1.5rem)] rounded-md bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground shadow-sm">Client chose {label}</span>}
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
    <section id="portfolio" aria-labelledby={`portfolio-heading-${variant}`} className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-3 text-sm font-semibold text-[hsl(var(--accent-purple))]">Two directions</p>
          <h2 id={`portfolio-heading-${variant}`} className="font-display text-3xl font-black leading-tight tracking-normal text-foreground md:text-4xl">Two designs, one business</h2>
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
                {singles.map((item) => <SiteLink key={item.id} url={item.live_url} className="group block min-w-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
                  <PreviewImage image={item.featured_image_url ?? item.versions?.[0]?.screenshot_url ?? null} alt={`${item.title} website`} />
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
