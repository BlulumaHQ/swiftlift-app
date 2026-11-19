import { useState } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";
import { ArrowRight, Check, Shield } from "lucide-react";
import { externalSupabase as supabase } from "@/lib/externalSupabase";

const WorkWithUsContent = () => {
  const { lang } = useLanguage();
  const [formLoadedAt] = useState(() => Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const fd = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.functions.invoke("send-intake-confirmation", {
        body: {
            _t: formLoadedAt,
            website_hp: (document.getElementById("website_hp") as HTMLInputElement | null)?.value || "",
          client_name: fd.get("name") as string,
          client_email: fd.get("email") as string,
          business_name: (fd.get("company") as string) || "Partner Inquiry",
          service: `Partner Program — ${fd.get("program") || "Not sure"}`,
          message: [
            `Program: ${fd.get("program") || "Not sure"}`,
            `Sites per month: ${fd.get("volume") || "-"}`,
            `Builds with: ${fd.get("tools") || "-"}`,
            "",
            (fd.get("message") as string) || "",
          ].join("\n"),
          website: fd.get("portfolio") as string || "",
          form_type: "designer",
        },
      });

      if (error) throw new Error(error.message || "Email sending failed");
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(lang === "en" ? "Something went wrong. Please try again." : "出了點問題。請重試。");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-[1.5px] border-input bg-[#FBFAF7] px-4 py-3.5 text-base font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-purple))]/30 focus:border-[hsl(var(--accent-purple))] transition-all";
  const en = lang === "en";
  const check = (color: string) => <Check size={18} strokeWidth={2.8} className="mt-0.5 flex-shrink-0" style={{ color }} aria-hidden="true" />;
  const sectionTitle = "font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.1] tracking-tight text-foreground";
  const scrollToApply = () => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });

  const audiences = en
    ? [
        { t: "Web designers", d: "Still building page by page in WordPress? Ship three times the sites without hiring." },
        { t: "Agencies", d: "Add website facelifts to your services without growing your team." },
        { t: "Marketing & SEO companies", d: "Your clients need better websites before ads and SEO can work. Now you can sell them." },
        { t: "Consultants & resellers", d: "Already talking to small businesses? Offer a website service under your own brand." },
      ]
    : [
        { t: "網站設計師", d: "還在用 WordPress 一頁一頁拉？不用請人，產能變 3 倍。" },
        { t: "Agency", d: "不用擴編團隊，就能加入網站改版服務。" },
        { t: "行銷與 SEO 公司", d: "客戶的網站要先變好，廣告和 SEO 才有效。現在你可以直接賣網站。" },
        { t: "顧問與經銷商", d: "已經在接觸中小企業？用你自己的品牌提供網站服務。" },
      ];

  const partnerSteps = en
    ? [
        ["Send us the URL", "Forward your client's current website. That's the whole brief."],
        ["2 unbranded previews in 48 hours", "A Classic and a Growth version on a neutral domain — no SwiftLift name anywhere."],
        ["You talk to your client", "You present, collect feedback and send us revisions. We never contact your client."],
        ["We launch it", "We connect the domain and go live. You bill your client whatever you like."],
      ]
    : [
        ["把網址交給我們", "轉給我們客戶現在的網站，這就是全部的需求。"],
        ["48 小時內 2 個無品牌預覽", "Classic 和 Growth 兩個版本，放在中性網域，完全不出現 SwiftLift。"],
        ["你和客戶溝通", "由你提案、收集意見、把修改交給我們。我們絕不聯絡你的客戶。"],
        ["我們幫你上線", "我們連接網域並上線。要向客戶收多少，由你決定。"],
      ];

  const systemIncludes = en
    ? [
        "Your own branded copy of the SwiftLift website — landing page, pricing and intake form",
        "The full preview pipeline: intake, 2 live previews, revision and launch forms",
        "Automated client emails for every step, sent from your brand",
        "Payments through your own Stripe account — you keep 100%",
        "Studio console: describe a change in plain words and the client's site updates and redeploys",
        "Setup, onboarding and system updates",
      ]
    : [
        "一個換成你品牌、幾乎和 SwiftLift 一模一樣的網站——首頁、價格與需求表單",
        "完整的預覽流程：需求、2 個即時預覽、修改與上線表單",
        "每個步驟的客戶 email 全自動寄出，用你的品牌",
        "透過你自己的 Stripe 收款——收入 100% 歸你",
        "Studio 介面：用一句話描述修改，客戶網站就會自動更新並重新上線",
        "開通、上手教學與系統更新",
      ];

  return (
    <main className="bg-background">
      {/* ═══ HERO ═══ */}
      <section className="px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <p className="sl-eyebrow text-sm">{en ? "White label & partner program" : "白牌與合作夥伴計畫"}</p>
          <h1 className="mt-4 font-display text-[2.2rem] font-black leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[3.4rem]">
            {en ? <>Your Clients. Your Brand. <span className="sl-highlight italic text-[hsl(var(--accent-purple))]">Our Build System.</span></> : <>你的客戶，你的品牌，<span className="sl-highlight italic text-[hsl(var(--accent-purple))]">我們的建站系統。</span></>}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
            {en
              ? "Sell website facelifts under your own name. Send us the work — or run the whole SwiftLift system yourself."
              : "用你自己的品牌賣網站改版。把案子交給我們做——或直接買下整套 SwiftLift 系統自己經營。"}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={scrollToApply} className="sl-cta inline-flex min-h-14 items-center gap-2 rounded-2xl px-8 py-4 font-display text-lg font-extrabold">
              {en ? "Apply to Partner" : "申請成為合作夥伴"} <ArrowRight size={20} strokeWidth={2.6} aria-hidden="true" />
            </button>
            <a href="#options" className="inline-flex min-h-14 items-center rounded-2xl border-[1.5px] border-input bg-white px-6 font-bold text-foreground hover:border-[hsl(var(--accent-purple))]">
              {en ? "Compare the two options" : "比較兩種合作方式"}
            </a>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            {en ? "Built by a designer with 500+ websites and 20 years of experience" : "由打造過 500+ 個網站、擁有 20 年經驗的設計師打造"}
          </p>
        </div>
      </section>

      {/* ═══ WHO IT'S FOR ═══ */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className={`text-center ${sectionTitle}`}>{en ? "Built for People Who Sell Websites" : "為賣網站的人打造"}</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <div key={i} className="rounded-[20px] border border-border bg-white p-6">
                <h3 className="font-display text-lg font-extrabold">{a.t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/75">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TWO OPTIONS ═══ */}
      <section id="options" className="border-y border-border bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className={`text-center ${sectionTitle}`}>{en ? "Two Ways to Work With Us" : "兩種合作方式"}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-foreground/75 md:text-lg">
            {en ? "Pick the one that fits how you work. You can start with one and switch later." : "選擇最適合你的方式。可以先從一種開始，之後再換。"}
          </p>
          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
            {/* A */}
            <div className="flex flex-col rounded-3xl border border-border bg-background p-7 md:p-9">
              <p className="font-display text-xs font-extrabold italic tracking-[0.08em] text-muted-foreground">{en ? "OPTION A" : "方案 A"}</p>
              <h3 className="mt-1.5 font-display text-[1.75rem] font-black">Build Partner</h3>
              <p className="mt-2 text-[0.95rem] text-foreground/75">{en ? "We build it. You sell it under your brand." : "我們來做，你用自己的品牌賣。"}</p>
              <p className="mt-6 font-display text-5xl font-black leading-none">30% <span className="text-xl font-extrabold">off</span></p>
              <p className="mt-2 text-sm text-muted-foreground">{en ? "every service on our public price list" : "公開價目表上的所有服務"}</p>
              <ul className="mt-6 flex-1 space-y-3 text-[0.95rem]">
                <li className="flex items-start gap-2.5">{check("hsl(var(--accent-purple))")}{en ? "Classic Facelift: $209 (retail $299)" : "Classic Facelift：$209（零售 $299）"}</li>
                <li className="flex items-start gap-2.5">{check("hsl(var(--accent-purple))")}{en ? "Growth Facelift: $349 (retail $499)" : "Growth Facelift：$349（零售 $499）"}</li>
                <li className="flex items-start gap-2.5">{check("hsl(var(--accent-purple))")}<span>{en ? <>Add-ons, extra pages and hosting at 30% off — see the <Link to="/features" className="font-bold text-[hsl(var(--accent-purple))] hover:underline">price list</Link></> : <>加購功能、額外頁面與託管一樣 7 折——見<Link to="/features" className="font-bold text-[hsl(var(--accent-purple))] hover:underline">價目表</Link></>}</span></li>
                <li className="flex items-start gap-2.5">{check("hsl(var(--accent-purple))")}{en ? "2 unbranded previews in 48 hours, on a neutral domain" : "48 小時內 2 個無品牌預覽，放在中性網域"}</li>
                <li className="flex items-start gap-2.5">{check("hsl(var(--accent-purple))")}{en ? "No setup fee, no monthly fee — pay per project" : "沒有開通費、沒有月費——按案計費"}</li>
              </ul>
            </div>
            {/* B */}
            <div className="relative flex flex-col rounded-3xl bg-[hsl(var(--ink))] p-7 text-white shadow-[0_30px_60px_-24px_hsl(var(--accent-purple)/0.6)] md:p-9">
              <span className="absolute -top-3.5 right-7 rounded-full bg-[hsl(var(--highlight))] px-3.5 py-1.5 font-display text-xs font-black italic tracking-[0.06em] text-foreground">
                {en ? "RUN IT YOURSELF" : "自己經營"}
              </span>
              <p className="font-display text-xs font-extrabold italic tracking-[0.08em] text-[#C4B1EE]">{en ? "OPTION B" : "方案 B"}</p>
              <h3 className="mt-1.5 font-display text-[1.75rem] font-black">White-label System</h3>
              <p className="mt-2 text-[0.95rem] text-white/75">{en ? "Your own SwiftLift. You control everything." : "你自己的 SwiftLift，一切由你掌控。"}</p>
              <p className="mt-6 font-display text-5xl font-black leading-none">$2,500 <span className="text-base font-bold text-white/60">{en ? "setup" : "開通費"}</span></p>
              <p className="mt-2 text-lg font-bold">+ $99<span className="text-sm font-medium text-white/60">/{en ? "month" : "月"}</span></p>
              <ul className="mt-6 flex-1 space-y-3 text-[0.95rem]">
                {systemIncludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">{check("hsl(var(--highlight))")}{item}</li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-white/60">
                {en
                  ? "You connect your own AI and hosting accounts, so usage is billed to you directly by those providers — no markup. Need a hand on a busy week? Send any project to us at Build Partner rates."
                  : "你連結自己的 AI 與主機帳號，用量由這些服務商直接向你收費，我們不加價。忙不過來的時候，也可以把任何案子以 Build Partner 價格交給我們。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OPTION A FLOW ═══ */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="sl-eyebrow text-sm">{en ? "Build Partner" : "Build Partner 流程"}</p>
          <h2 className={`mt-2 ${sectionTitle}`}>{en ? "How Option A Works" : "方案 A 怎麼運作"}</h2>
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerSteps.map(([t, d], i) => (
              <li key={i} className="flex flex-col gap-2 rounded-[20px] border border-border bg-white p-6">
                <span className="font-display text-[2.6rem] font-black italic leading-none text-[hsl(var(--accent-purple))]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-lg font-extrabold leading-snug">{t}</h3>
                <p className="text-[0.95rem] leading-relaxed text-foreground/75">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ PROMISE ═══ */}
      <section className="bg-[hsl(var(--ink))] px-6 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <Shield size={40} strokeWidth={2} className="text-[hsl(var(--highlight))]" aria-hidden="true" />
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black leading-[1.1]">
              {en ? <>Your Clients <span className="italic text-[hsl(var(--highlight))]">Stay Yours.</span></> : <>你的客戶，<span className="italic text-[hsl(var(--highlight))]">永遠是你的。</span></>}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {en ? "We work behind the scenes. Your client only ever sees your brand." : "我們只在幕後工作，你的客戶只會看到你的品牌。"}
            </p>
          </div>
          <ul className="space-y-3">
            {(en
              ? ["We never contact your clients", "No SwiftLift name or credit on any site or preview", "Previews live on a neutral domain, not swiftlift.app", "You set your own prices and keep the client relationship"]
              : ["我們絕不聯絡你的客戶", "網站與預覽上不出現 SwiftLift 名稱或署名", "預覽放在中性網域，不是 swiftlift.app", "價格由你決定，客戶關係由你掌握"]
            ).map((t, i) => (
              <li key={i} className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-base font-semibold md:text-lg">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--highlight))] text-foreground" aria-hidden="true">
                  <Check size={16} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ WORK (hover a preview to scroll) ═══ */}
      <Portfolio variant="home" />

      {/* ═══ APPLY ═══ */}
      <section id="apply" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-xl">
          <h2 className={`text-center ${sectionTitle}`}>{en ? "Apply to Partner" : "申請成為合作夥伴"}</h2>
          <p className="mt-4 text-center text-base text-foreground/75">
            {en ? "Tell us a little about your business. We'll reply within 1 business day." : "簡單介紹你的業務，我們會在 1 個工作天內回覆。"}
          </p>
          {submitted ? (
            <div className="mt-10 rounded-[20px] border border-border bg-white p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--accent-purple)/0.1)]">
                <Check size={28} strokeWidth={2.6} className="text-[hsl(var(--accent-purple))]" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{en ? "Thanks — we got your application." : "謝謝，我們已收到你的申請。"}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{en ? "We'll be in touch within 1 business day." : "我們會在 1 個工作天內與你聯絡。"}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-[20px] border border-border bg-white p-5 shadow-[0_18px_40px_-18px_rgba(14,20,36,0.25)] sm:p-7">
              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
                <label htmlFor="website_hp">Leave this field empty</label>
                <input type="text" id="website_hp" name="website_hp" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>
              <fieldset>
                <legend className="mb-2 block text-sm font-semibold text-foreground">{en ? "Which option interests you?" : "你對哪種合作方式有興趣？"} *</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[
                    { v: "A — Build Partner", l: en ? "A · Build Partner" : "A · Build Partner" },
                    { v: "B — White-label System", l: en ? "B · White-label System" : "B · 白牌系統" },
                    { v: "Not sure", l: en ? "Not sure yet" : "還不確定" },
                  ].map((o, i) => (
                    <label key={o.v} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border-[1.5px] border-input bg-[#FBFAF7] px-3 text-sm font-semibold has-[:checked]:border-[hsl(var(--accent-purple))] has-[:checked]:bg-[#F7F2FD]">
                      <input type="radio" name="program" value={o.v} required defaultChecked={i === 0} className="accent-[hsl(var(--accent-purple))]" />
                      {o.l}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
                  {en ? "Name" : "姓名"} *
                  <input name="name" required className={inputClass} placeholder={en ? "Your name" : "你的姓名"} />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
                  {en ? "Email" : "電子郵件"} *
                  <input name="email" type="email" required className={inputClass} placeholder="you@company.com" />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
                  {en ? "Company" : "公司名稱"}
                  <input name="company" className={inputClass} placeholder={en ? "Your company" : "你的公司"} />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
                  {en ? "Portfolio / Website" : "作品集 / 網站"}
                  <input name="portfolio" className={inputClass} placeholder="https://yourcompany.com" />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
                  {en ? "Websites per month" : "每月網站數量"}
                  <select name="volume" className={inputClass} defaultValue="">
                    <option value="">{en ? "Select" : "請選擇"}</option>
                    <option value="1-2">1–2</option>
                    <option value="3-5">3–5</option>
                    <option value="6-10">6–10</option>
                    <option value="10+">10+</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
                  {en ? "You currently build with" : "目前使用的工具"}
                  <select name="tools" className={inputClass} defaultValue="">
                    <option value="">{en ? "Select" : "請選擇"}</option>
                    <option value="WordPress">WordPress</option>
                    <option value="Wix / Squarespace">Wix / Squarespace</option>
                    <option value="Webflow">Webflow</option>
                    <option value="Custom code">{en ? "Custom code" : "自己寫程式"}</option>
                    <option value="I don't build websites">{en ? "I don't build websites" : "我不自己做網站"}</option>
                  </select>
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-foreground">
                {en ? "Message" : "留言"} *
                <textarea name="message" required rows={4} className={inputClass + " min-h-[120px] resize-none"} placeholder={en ? "Tell us about your clients and how you'd like to work together…" : "介紹一下你的客戶，以及你希望怎麼合作…"} />
              </label>
              {submitError && <p className="text-sm font-medium text-destructive">{submitError}</p>}
              <button type="submit" disabled={submitting} className="sl-cta flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-display text-[1.05rem] font-extrabold disabled:opacity-60">
                {submitting ? (en ? "Submitting…" : "提交中…") : (en ? "Apply to Partner" : "提交申請")}
                {!submitting && <ArrowRight size={20} strokeWidth={2.6} aria-hidden="true" />}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

const WorkWithUs = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background scroll-smooth">
      
      <Header />
      <WorkWithUsContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default WorkWithUs;
