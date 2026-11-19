import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import { ShieldCheck, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swiftsiteLogo from "@/assets/swiftsite-logo.svg";
import { INDUSTRY_PAGES } from "@/lib/industryContent";

const Footer = () => {
  const { lang } = useLanguage();
  const footer = translations.footer;
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: lang === "en" ? "Home" : "首頁", href: "/" },
    { label: t(translations.nav.pricing, lang), href: "/#pricing" },
    { label: t(translations.nav.portfolio, lang), href: "/portfolio" },
    { label: lang === "en" ? "About" : "關於", href: "/about" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "/" || href === "/portfolio" || href === "/about") {
      navigate(href);
      if (href === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname !== "/") {
        navigate("/" + "#" + id);
      } else {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const linkCls = "text-sm text-white/70 hover:text-white transition-colors py-1 md:py-0 block";
  const headCls = "text-sm font-semibold text-white mb-3";

  const columns = (
    <>
      <div>
        <h4 className={headCls}>{lang === "en" ? "Navigation" : "導航"}</h4>
        <nav className="flex flex-col gap-2" aria-label="Footer navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className={linkCls}>
              {item.label}
            </a>
          ))}
          <Link to="/work-with-us" className={linkCls}>
            {lang === "en" ? "Partner Program" : "合作夥伴計畫"}
          </Link>
        </nav>
      </div>
      <div>
        <h4 className={headCls}>{lang === "en" ? "Industries" : "產業"}</h4>
        <div className="flex flex-col gap-2">
          {INDUSTRY_PAGES.map((p) => (
            <Link key={p.slug} to={`/website-redesign/${p.slug}`} className={linkCls}>
              {p.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className={headCls}>{lang === "en" ? "Resources" : "資源"}</h4>
        <div className="flex flex-col gap-2">
          <Link to="/faq" className={linkCls}>{lang === "en" ? "FAQ" : "常見問題"}</Link>
          <Link to="/features" className={linkCls}>{lang === "en" ? "Add Features" : "追加功能"}</Link>
          <Link to="/hosting-guide" className={linkCls}>{lang === "en" ? "Hosting Guide" : "託管指南"}</Link>
          <Link to="/support" className={linkCls}>{lang === "en" ? "Support" : "聯繫客服"}</Link>
        </div>
      </div>
    </>
  );

  return (
    <footer className="py-12 md:py-16" style={{ background: "#0E1424" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-8">
          {/* Brand + guarantee */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-flex items-center">
              <img src={swiftsiteLogo} alt="SwiftLift Studio" className="h-[calc(4rem-10px)] w-auto brightness-0 invert" />
            </Link>
            <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-xs mx-auto md:mx-0">
              {lang === "en" ? "Real designer. Real websites. No templates." : "真正的設計師。真正的網站。沒有模板。"}
            </p>
            <a href="mailto:support@swiftlift.app" className="mt-3 inline-flex items-center gap-1.5 py-2 md:py-0 text-sm text-white/85 hover:text-white transition-colors">
              <Mail size={14} />
              support@swiftlift.app
            </a>
            <p className="mt-1 text-xs text-white/50">
              {lang === "en" ? "We reply within 1 business day" : "1個工作天內回覆"}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: "hsl(267 55% 45%)", background: "hsl(267 55% 45% / 0.1)" }}>
                <ShieldCheck size={22} style={{ color: "hsl(267 55% 45%)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t(footer.guarantee, lang)}</p>
                <p className="mt-0.5 text-xs text-white/60">{t(footer.guaranteeSub, lang)}</p>
              </div>
            </div>
          </div>

          {/* Link columns: 3-up on mobile, separate grid cells on desktop */}
          <div className="grid grid-cols-3 gap-4 md:contents">{columns}</div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:justify-between">
          <p className="text-center md:text-left">
            © 2026 SwiftLift. All rights reserved. Operated by{" "}
            <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Bluluma Design</a>
            <span className="hidden md:inline"> · Payments securely processed by Stripe.</span>
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="py-2 hover:text-white transition-colors md:py-0">{t(footer.privacy, lang)}</Link>
            <Link to="/terms" className="py-2 hover:text-white transition-colors md:py-0">{t(footer.terms, lang)}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
