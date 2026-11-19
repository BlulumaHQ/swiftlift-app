import { useState } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Check, X, Cpu, PenTool, Rocket } from "lucide-react";

import genesBefore from "@/assets/portfolio-genes-before.webp";
import genesAfter from "@/assets/portfolio-genes-b.webp";

const sectionTitle = "font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.1] tracking-tight text-foreground";

const FounderPhoto = () => {
  const [failed, setFailed] = useState(false);
  const cls = "h-full w-full rounded-[28px] object-cover";
  return failed ? (
    <div className="flex aspect-[4/5] w-full items-center justify-center rounded-[28px] bg-[hsl(var(--accent-purple))] font-display text-6xl font-black text-white">SL</div>
  ) : (
    <img src="/images/sony-lin.jpg" alt="Sony Lin, founder and lead designer of SwiftLift" width={480} height={600} onError={() => setFailed(true)} className={`aspect-[4/5] ${cls}`} />
  );
};

const AboutContent = () => {
  const { lang } = useLanguage();
  const en = lang === "en";

  const how = en
    ? [
        { icon: Cpu, t: "AI does the heavy lifting", d: "Our automation system reads your current website, keeps your content and photos, and builds two new versions — work that used to take a designer weeks." },
        { icon: PenTool, t: "A real designer makes the calls", d: "Sony reviews every preview, fixes what AI gets wrong and adds the details that make a site feel like yours, not a template." },
        { icon: Rocket, t: "You get it fast and affordable", d: "No meetings, no long agency process. That's how a fully custom facelift costs $299 instead of $3,000 — and takes 48 hours instead of 8 weeks." },
      ]
    : [
        { icon: Cpu, t: "AI 負責繁重的工作", d: "我們的自動化系統會讀取您現有的網站，保留您的內容與照片，做出兩個新版本——這些以前要設計師花好幾週。" },
        { icon: PenTool, t: "真正的設計師做決定", d: "Sony 親自檢查每一個預覽，修正 AI 做不好的地方，加入讓網站有您自己風格的細節，而不是模板。" },
        { icon: Rocket, t: "所以又快又實惠", d: "不用開會，也沒有漫長的代理商流程。這就是為什麼完全客製的改版只要 $299 而不是 $3,000——48 小時而不是 8 週。" },
      ];

  const compare = en
    ? {
        them: ["Weeks before anything starts", "Multiple meetings and calls", "One design — take it or leave it", "Pay a deposit up front", "$1,500–$3,000+"],
        diy: ["You build it yourself", "Template that looks like everyone else", "Hours of your time every month"],
        us: ["2 live previews in 48 hours", "No calls or meetings", "Pick the version you like", "Pay only when you're happy", "From $299, one time"],
      }
    : {
        them: ["要等好幾週才開始", "多次開會與電話", "只有一個設計——要或不要", "先付訂金", "$1,500–$3,000+"],
        diy: ["您得自己動手做", "看起來跟別人一樣的模板", "每個月花掉您好幾個小時"],
        us: ["48 小時內 2 個即時預覽", "不用電話或開會", "選您喜歡的版本", "滿意才付款", "一次性 $299 起"],
      };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* ═══ HERO ═══ */}
        <section className="px-6 pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="sl-eyebrow text-sm">{en ? "About SwiftLift" : "關於 SwiftLift"}</p>
              <h1 className="mt-4 font-display text-[2.3rem] font-black leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem]">
                {en ? <>20 Years of Seeing the Same Problem. <span className="sl-highlight italic text-[hsl(var(--accent-purple))]">So I Built a System.</span></> : <>20 年來看到同樣的問題，<br /><span className="sl-highlight italic text-[hsl(var(--accent-purple))]">所以我做了一套系統。</span></>}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
                {en
                  ? "Hi, I'm Sony Lin. I've designed 500+ websites for small businesses over 20 years. Most owners I meet already have a website — it just looks old and doesn't bring in customers. A full rebuild costs too much and takes too long. SwiftLift fixes that."
                  : "我是 Sony Lin，20 年來為中小企業設計了 500+ 個網站。我遇到的大多數老闆其實已經有網站——只是看起來過時、帶不來客人。全部重做太貴又太久，SwiftLift 就是為了解決這個問題。"}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/#contact" className="sl-cta inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-8 py-4 font-display text-lg font-extrabold">
                  {en ? "Get My 2 Free Previews" : "獲取我的 2 個免費預覽"} <ArrowRight size={20} strokeWidth={2.6} aria-hidden="true" />
                </Link>
                <Link to="/portfolio" className="inline-flex min-h-14 items-center justify-center rounded-2xl border-[1.5px] border-input bg-white px-6 font-bold hover:border-[hsl(var(--accent-purple))]">
                  {en ? "See the Work" : "看作品"}
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="rotate-2 overflow-hidden rounded-[28px] shadow-[0_30px_60px_-24px_rgba(14,20,36,0.45)]">
                <FounderPhoto />
              </div>
              <div className="absolute -bottom-5 -left-4 rounded-2xl bg-[hsl(var(--ink))] px-5 py-4 text-white shadow-lg">
                <p className="font-display text-lg font-black leading-tight">Sony Lin</p>
                <p className="text-sm text-white/70">{en ? "Founder & Lead Designer" : "創辦人暨首席設計師"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ NUMBERS ═══ */}
        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-5xl grid-cols-3 gap-3 sm:gap-5">
            {[
              { n: "20", l: en ? "years designing websites" : "年網站設計經驗" },
              { n: "500+", l: en ? "websites built" : "個網站作品" },
              { n: "48h", l: en ? "to your 2 previews" : "內收到 2 個預覽" },
            ].map((s) => (
              <div key={s.n} className="rounded-[20px] border border-border bg-white p-5 text-center sm:p-7">
                <p className="font-display text-3xl font-black text-[hsl(var(--accent-purple))] sm:text-5xl">{s.n}</p>
                <p className="mt-2 text-xs font-semibold text-foreground/70 sm:text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ HOW IT'S SO FAST ═══ */}
        <section className="border-y border-border bg-white px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="sl-eyebrow text-sm">{en ? "How we do it" : "我們怎麼做到"}</p>
            <h2 className={`mt-2 max-w-3xl ${sectionTitle}`}>
              {en ? <>Why It's Fast, Affordable — <span className="sl-highlight">and Still Custom</span></> : <>為什麼又快又實惠，<span className="sl-highlight">而且還是客製</span></>}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
              {en
                ? "We specialize in AI website automation. Think of it like fast food — but every website is made to order for your business, not pulled from a Wix template."
                : "我們專精 AI 網站自動化。就像速食一樣快——但每個網站都是為您的生意量身製作，不是從 Wix 模板拿來改。"}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {how.map(({ icon: Icon, t, d }, i) => (
                <div key={i} className="rounded-[20px] border border-border bg-background p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--accent-purple))] text-white">
                    <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-extrabold">{t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/75">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-foreground/70">
              {en ? "Sell websites yourself? The same system is available to designers and agencies — " : "您自己也賣網站嗎？同一套系統也提供給設計師與 agency——"}
              <Link to="/work-with-us" className="font-bold text-[hsl(var(--accent-purple))] hover:underline">{en ? "see the Partner Program" : "看合作夥伴計畫"}</Link>
            </p>
          </div>
        </section>

        {/* ═══ REAL BEFORE / AFTER ═══ */}
        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className={`text-center ${sectionTitle}`}>{en ? <>Same Business. <span className="sl-highlight italic text-[hsl(var(--accent-purple))]">Brand-New Website.</span></> : <>同一間店，<span className="sl-highlight italic text-[hsl(var(--accent-purple))]">全新的網站。</span></>}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-foreground/75 md:text-lg">
              {en ? "We keep your content and your photos. The facelift does the rest." : "我們保留您的內容與照片，其餘交給改版。"}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                { img: genesBefore, label: en ? "BEFORE" : "改版前", dark: false },
                { img: genesAfter, label: en ? "AFTER · 48 HOURS" : "改版後 · 48 小時", dark: true },
              ].map((c) => (
                <figure key={c.label} className="overflow-hidden rounded-[22px] border border-border bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={c.img} alt={`${c.label} — website facelift example`} loading="lazy" className="h-full w-full object-cover object-top" />
                  </div>
                  <figcaption className={`px-5 py-3 font-display text-sm font-black italic tracking-[0.06em] ${c.dark ? "bg-[hsl(var(--ink))] text-[hsl(var(--highlight))]" : "text-muted-foreground"}`}>{c.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ COMPARE ═══ */}
        <section className="border-t border-border bg-white px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className={`text-center ${sectionTitle}`}>{en ? "Why SwiftLift Is Different" : "SwiftLift 有什麼不同"}</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { h: en ? "Traditional agency" : "傳統代理商", items: compare.them, good: false },
                { h: en ? "DIY website builders" : "自己用網站產生器", items: compare.diy, good: false },
                { h: "SwiftLift", items: compare.us, good: true },
              ].map((col) => (
                <div key={col.h} className={`rounded-[22px] p-7 ${col.good ? "bg-[hsl(var(--ink))] text-white shadow-[0_30px_60px_-24px_hsl(var(--accent-purple)/0.6)]" : "border border-border bg-background"}`}>
                  <h3 className={`font-display text-xl font-black ${col.good ? "text-[hsl(var(--highlight))]" : ""}`}>{col.h}</h3>
                  <ul className="mt-5 space-y-3 text-[0.95rem]">
                    {col.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5">
                        {col.good ? <Check size={18} strokeWidth={2.8} className="mt-0.5 flex-shrink-0 text-[hsl(var(--highlight))]" aria-hidden="true" /> : <X size={18} strokeWidth={2.6} className="mt-0.5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />}
                        <span className={col.good ? "" : "text-foreground/75"}>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="bg-[hsl(var(--ink))] px-6 py-20 text-center text-white md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.1]">
              {en ? <>See Both Versions. <span className="italic text-[hsl(var(--highlight))]">Pay Only If You Love One.</span></> : <>先看兩個版本，<span className="italic text-[hsl(var(--highlight))]">喜歡再付款。</span></>}
            </h2>
            <p className="mt-4 text-lg text-white/75">{en ? "Paste your current website. I'll take it from there." : "貼上您現在的網站，剩下的交給我。"}</p>
            <Link to="/#contact" className="sl-cta mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-8 py-4 font-display text-lg font-extrabold">
              {en ? "Get My 2 Free Previews" : "獲取我的 2 個免費預覽"} <ArrowRight size={20} strokeWidth={2.6} aria-hidden="true" />
            </Link>
            <p className="mt-5 text-sm text-white/60">{en ? "No upfront payment · No calls · Built by Sony Lin" : "不用預付 · 不用電話 · 由 Sony Lin 打造"}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const About = () => (
  <LanguageProvider>
    <AboutContent />
  </LanguageProvider>
);

export default About;
