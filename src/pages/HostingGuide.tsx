import { Link } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Check, X, ShieldCheck, Zap, Globe, Mail, Package } from "lucide-react";

const sectionTitle = "font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.1] tracking-tight text-foreground";

const HostingGuideContent = () => {
  const { lang } = useLanguage();
  const en = lang === "en";
  const check = (c: string) => <Check size={18} strokeWidth={2.8} className="mt-0.5 flex-shrink-0" style={{ color: c }} aria-hidden="true" />;

  const freeItems = en
    ? ["Hosted on our fast global network (Cloudflare)", "SSL security certificate included", "No monthly bill — ever", "Need a change? $45 per edit, only when you want one"]
    : ["放在我們快速的全球網路（Cloudflare）", "包含 SSL 安全憑證", "永遠沒有月費", "需要修改？每次 $45，有需要才付"];
  const careItems = en
    ? ["Everything in Free Hosting", "Up to 2 small edits every month — photos, text, hero style or re-layout of existing pages", "We make the changes for you — no dashboards", "Uptime monitoring and priority replies"]
    : ["包含免費託管的所有內容", "每月最多 2 次小修改——照片、文字、Hero 樣式或重新排版現有頁面", "由我們幫您改，不用登入任何後台", "網站運作監控與優先回覆"];
  const careExcludes = en ? "Not included: new pages, new features and blog posts (see the price list)." : "不包含：新頁面、新功能與 blog 文章（請見價目表）。";

  const steps = en
    ? [
        ["You approve your new website", "Pay only once you're happy with it."],
        ["Pick Free Hosting or the Care Plan", "One simple question before launch. You can switch later."],
        ["We connect your domain and go live", "We walk you through the domain step and check how your email works first."],
      ]
    : [
        ["您確認新網站", "滿意了才付款。"],
        ["選擇免費託管或 Care Plan", "上線前只問這一個問題，之後也可以換。"],
        ["我們連接網域並上線", "我們會一步步帶您完成網域設定，並先確認您的 email 怎麼運作。"],
      ];

  const facts = en
    ? [
        { icon: Globe, t: "Your domain stays yours", d: "We never take ownership of your domain. We only point it to your new site." },
        { icon: Mail, t: "Your email keeps working", d: "Every email setup is different, so we check yours first and recommend the best option before launch." },
        { icon: Package, t: "Want to host it yourself?", d: "No problem. We'll hand you the full website as a zip file, ready for Cloudflare, Netlify or Vercel." },
        { icon: ShieldCheck, t: "No lock-in", d: "No contracts. Cancel the Care Plan anytime and stay on Free Hosting." },
      ]
    : [
        { icon: Globe, t: "網域永遠是您的", d: "我們不會拿走您網域的所有權，只會把它指向您的新網站。" },
        { icon: Mail, t: "Email 照常運作", d: "每個人的 email 設定都不同，所以上線前我們會先確認您的設定，再推薦最好的做法。" },
        { icon: Package, t: "想自己託管？", d: "沒問題。我們會把完整網站打包成 zip 給您，可直接放到 Cloudflare、Netlify 或 Vercel。" },
        { icon: ShieldCheck, t: "沒有綁約", d: "不用簽約。Care Plan 隨時可以取消，改回免費託管。" },
      ];

  return (
    <main>
      {/* HERO */}
      <section className="px-6 pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="sl-eyebrow text-sm">{en ? "Hosting guide" : "託管說明"}</p>
          <h1 className="mt-4 font-display text-[2.2rem] font-black leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]">
            {en ? <>Free Hosting. <span className="sl-highlight italic text-[hsl(var(--accent-purple))]">No Monthly Bill.</span></> : <>免費託管，<span className="sl-highlight italic text-[hsl(var(--accent-purple))]">沒有月費。</span></>}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-foreground/80">
            {en
              ? "Every SwiftLift website is hosted for free on our servers. No plugins to update, no dashboards to learn. Want us to handle your edits too? That's the Care Plan."
              : "每個 SwiftLift 網站都免費託管在我們的伺服器上。不用更新外掛，也不用學後台。想連修改都交給我們？那就是 Care Plan。"}
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-border bg-white p-7 md:p-9">
            <p className="font-display text-xs font-extrabold italic tracking-[0.08em] text-muted-foreground">{en ? "INCLUDED" : "已包含"}</p>
            <h2 className="mt-1.5 font-display text-[1.75rem] font-black">{en ? "Free Hosting" : "免費託管"}</h2>
            <p className="mt-5 font-display text-5xl font-black leading-none">$0</p>
            <p className="mt-2 text-sm text-muted-foreground">{en ? "with every website" : "每個網站都有"}</p>
            <ul className="mt-6 flex-1 space-y-3 text-[0.95rem]">
              {freeItems.map((t) => <li key={t} className="flex items-start gap-2.5">{check("hsl(var(--accent-purple))")}{t}</li>)}
            </ul>
          </div>
          <div className="relative flex flex-col rounded-3xl bg-[hsl(var(--ink))] p-7 text-white shadow-[0_30px_60px_-24px_hsl(var(--accent-purple)/0.6)] md:p-9">
            <span className="absolute -top-3.5 right-7 rounded-full bg-[hsl(var(--highlight))] px-3.5 py-1.5 font-display text-xs font-black italic tracking-[0.06em] text-foreground">
              {en ? "MOST HANDS-OFF" : "最省事"}
            </span>
            <p className="font-display text-xs font-extrabold italic tracking-[0.08em] text-[#C4B1EE]">{en ? "OPTIONAL" : "可選"}</p>
            <h2 className="mt-1.5 font-display text-[1.75rem] font-black">Care Plan</h2>
            <p className="mt-5 font-display text-5xl font-black leading-none">$135<span className="text-xl font-bold text-white/60">/{en ? "year" : "年"}</span></p>
            <p className="mt-2 text-sm text-white/60">{en ? "billed once a year" : "每年收費一次"}</p>
            <ul className="mt-6 flex-1 space-y-3 text-[0.95rem]">
              {careItems.map((t) => <li key={t} className="flex items-start gap-2.5">{check("hsl(var(--highlight))")}{t}</li>)}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/60">{careExcludes}</p>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-5xl items-start gap-3 rounded-2xl border border-[hsl(var(--highlight))] bg-[hsl(var(--highlight)/0.25)] px-5 py-4 text-[0.95rem]">
          <Zap size={20} className="mt-0.5 flex-shrink-0 text-foreground" aria-hidden="true" />
          <p>
            {en
              ? <>One-off edits are <strong>$45 each</strong>. Need just <strong>3 edits a year</strong> and the Care Plan has already paid for itself.</>
              : <>單次修改每次 <strong>$45</strong>。一年只要改 <strong>3 次</strong>，Care Plan 就已經回本了。</>}
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className={`text-center ${sectionTitle}`}>{en ? "How Launch Works" : "上線流程"}</h2>
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={i} className="flex flex-col gap-2 rounded-[20px] border border-border bg-background p-6">
                <span className="font-display text-[2.6rem] font-black italic leading-none text-[hsl(var(--accent-purple))]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-lg font-extrabold leading-snug">{t}</h3>
                <p className="text-[0.95rem] leading-relaxed text-foreground/75">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FACTS */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className={`text-center ${sectionTitle}`}>{en ? "Good to Know" : "您需要知道的"}</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {facts.map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex items-start gap-4 rounded-[20px] border border-border bg-white p-6">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--accent-purple)/0.1)]">
                  <Icon size={22} className="text-[hsl(var(--accent-purple))]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-extrabold">{t}</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-foreground/75">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-[20px] border border-border bg-white p-6">
            <p className="font-display text-lg font-extrabold">{en ? "Compared to typical hosting" : "跟一般主機比較"}</p>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-[0.95rem] sm:grid-cols-2">
              {(en
                ? ["Monthly hosting bills", "Plugin and security updates", "Confusing control panels", "Surprise renewal charges"]
                : ["每個月的主機費", "外掛與安全性更新", "複雜的控制面板", "意外的續約費用"]
              ).map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-foreground/75"><X size={18} strokeWidth={2.6} className="flex-shrink-0 text-muted-foreground" aria-hidden="true" /><span className="line-through decoration-foreground/30">{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[hsl(var(--ink))] px-6 py-20 text-center text-white md:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.1]">
            {en ? <>Your New Website, <span className="italic text-[hsl(var(--highlight))]">Hosted Free.</span></> : <>您的新網站，<span className="italic text-[hsl(var(--highlight))]">免費託管。</span></>}
          </h2>
          <p className="mt-4 text-lg text-white/75">{en ? "Start with 2 free previews. Decide on hosting later." : "先拿 2 個免費預覽，託管之後再決定。"}</p>
          <Link to="/#contact" className="sl-cta mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-8 py-4 font-display text-lg font-extrabold">
            {en ? "Get My 2 Free Previews" : "獲取我的 2 個免費預覽"} <ArrowRight size={20} strokeWidth={2.6} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

const HostingGuide = () => (
  <LanguageProvider>
    <Header />
    <HostingGuideContent />
    <Footer />
  </LanguageProvider>
);

export default HostingGuide;
