import { useEffect, useRef, useState } from "react";

/**
 * Full-page website screenshot in a fixed frame (ported from the SwiftSite showcase; same behaviour as bluluma.com):
 * desktop hover auto-scrolls down the whole homepage, mouse wheel scrolls it manually,
 * mouse leave eases back to the top. On touch / small screens it's a static crop.
 */
export function ScrollShot({ src, alt, wide = false, eager = false }: { src: string | null; alt: string; wide?: boolean; eager?: boolean }) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const screen = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const manual = useRef(false);

  const cancel = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  };
  useEffect(() => () => cancel(), []);

  const enabled = () =>
    window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const enter = () => {
    if (!enabled()) return;
    cancel();
    manual.current = false;
    let previous: number | null = null;
    const tick = (time: number) => {
      const el = screen.current;
      if (!el || manual.current || !enabled()) { cancel(); return; }
      if (previous !== null) el.scrollTop += (140 * Math.min(time - previous, 100)) / 1000;
      previous = time;
      if (!el.querySelector("img")?.complete || el.scrollTop < el.scrollHeight - el.clientHeight) {
        frame.current = requestAnimationFrame(tick);
      } else frame.current = null;
    };
    frame.current = requestAnimationFrame(tick);
  };

  const leave = () => {
    cancel();
    if (!enabled() || manual.current) return;
    const el = screen.current;
    if (!el) return;
    const top = el.scrollTop;
    const start = performance.now();
    const tick = (time: number) => {
      if (!enabled() || manual.current) { cancel(); return; }
      const p = Math.min((time - start) / 600, 1);
      el.scrollTop = top * Math.pow(1 - p, 3);
      if (p < 1) frame.current = requestAnimationFrame(tick);
      else frame.current = null;
    };
    frame.current = requestAnimationFrame(tick);
  };

  return (
    <div className={`ss-shot ${wide ? "ss-shot--wide" : ""}`} onMouseEnter={enter} onMouseLeave={leave}>
      {src && !loaded && <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-[var(--shot-bg)]" />}
      <div
        ref={screen}
        className="ss-shot-screen"
        onWheel={() => { manual.current = true; cancel(); }}
        onScroll={(e) => { if (e.currentTarget.scrollTop > 0) setHasScrolled(true); }}
      >
        {src && <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} className="block h-auto w-full" />}
      </div>
      {!hasScrolled && <span className="ss-shot-hint" aria-hidden="true">↕ Scroll</span>}
    </div>
  );
}
