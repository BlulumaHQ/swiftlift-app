import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import { ShieldCheck, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swiftsiteLogo from "@/assets/swiftsite-logo.svg";

const Footer = () => {
  const { lang } = useLanguage();
  const footer = translations.footer;
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: lang === "en" ? "Home" : "首页", href: "/" },
    { label: t(translations.nav.pricing, lang), href: "/#pricing" },
    { label: t(translations.nav.portfolio, lang), href: "/portfolio" },
    { label: lang === "en" ? "About" : "關於", href: "/about" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "/" || href === "/portfolio") {
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

  return (
    <footer className="py-12 md:py-16" style={{ background: "hsl(var(--footer-bg))" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop: multi-column grid */}
        <div className="hidden md:grid grid-cols-[2fr_0.5fr_1fr_1fr_1fr_1.2fr] gap-8">
          {/* Column 1: Logo + Description + Email */}
          <div>
            <Link to="/" className="flex items-center">
              <img src={swiftsiteLogo} alt="SwiftLift Studio" className="h-[calc(4rem-10px)] w-auto brightness-0 invert" />
            </Link>
            <p className="mt-3 text-sm text-blue-200/70 leading-relaxed max-w-xs">
              {lang === "en"
                ? "Faster than agencies. Easier than freelancers. Safer than traditional services."
                : "比機構更快。比自由職業者更簡單。比傳統服務更安全。"}
            </p>
            <a href="mailto:support@swiftlift.app" className="mt-3 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white transition-colors">
              <Mail size={14} />
              support@swiftlift.app
            </a>
          </div>

          {/* Column 2: Empty Spacer */}
          <div />

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">
              {lang === "en" ? "Navigation" : "導航"}
            </h4>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm text-blue-200/70 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">
              {lang === "en" ? "Resources" : "資源"}
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/faq" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                {lang === "en" ? "FAQ" : "常見問題"}
              </Link>
              <Link to="/features" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                {lang === "en" ? "Add Features" : "追加功能"}
              </Link>
              <Link to="/hosting-guide" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                {lang === "en" ? "Hosting Guide" : "託管指南"}
              </Link>
              <Link to="/support" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                {lang === "en" ? "Support" : "聯繫客服"}
              </Link>
              <Link to="/work-with-us" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                {lang === "en" ? "Are You a Designer?" : "你是設計師嗎？"}
              </Link>
            </div>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">
              {lang === "en" ? "Legal" : "法律"}
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                {t(footer.privacy, lang)}
              </Link>
              <Link to="/terms" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                {t(footer.terms, lang)}
              </Link>
            </div>
          </div>

          {/* Column 6: Satisfaction Guarantee */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2" style={{ borderColor: "hsl(275 51% 46%)", background: "hsl(275 51% 46% / 0.1)" }}>
                <ShieldCheck size={32} style={{ color: "hsl(275 51% 46%)" }} />
              </div>
              <p className="text-sm font-semibold text-white">
                {t(footer.guarantee, lang)}
              </p>
              <p className="mt-1 text-xs text-blue-200/60">
                {t(footer.guaranteeSub, lang)}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="md:hidden space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center">
              <img src={swiftsiteLogo} alt="SwiftLift Studio" className="h-[calc(4rem-10px)] w-auto brightness-0 invert" />
            </Link>
            <p className="mt-3 text-sm text-blue-200/70 leading-relaxed max-w-xs mx-auto">
              {lang === "en"
                ? "Faster than agencies. Easier than freelancers. Safer than traditional services."
                : "比機構更快。比自由職業者更簡單。比傳統服務更安全。"}
            </p>
            <a href="mailto:support@swiftlift.app" className="mt-3 inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white transition-colors">
              <Mail size={14} />
              support@swiftlift.app
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                {lang === "en" ? "Navigation" : "導航"}
              </h4>
              <nav className="flex flex-col gap-2" aria-label="Footer navigation">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-blue-200/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                {lang === "en" ? "Resources" : "資源"}
              </h4>
              <div className="flex flex-col gap-2">
                <Link to="/faq" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                  {lang === "en" ? "FAQ" : "常見問題"}
                </Link>
                <Link to="/features" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                  {lang === "en" ? "Add Features" : "追加功能"}
                </Link>
                <Link to="/hosting-guide" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                  {lang === "en" ? "Hosting Guide" : "託管指南"}
                </Link>
                <Link to="/support" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                  {lang === "en" ? "Support" : "聯繫客服"}
                </Link>
                <Link to="/work-with-us" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                  {lang === "en" ? "Are You a Designer?" : "你是設計師嗎？"}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                {lang === "en" ? "Legal" : "法律"}
              </h4>
              <div className="flex flex-col gap-2">
                <Link to="/privacy" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                  {t(footer.privacy, lang)}
                </Link>
                <Link to="/terms" className="text-sm text-blue-200/70 hover:text-white transition-colors">
                  {t(footer.terms, lang)}
                </Link>
              </div>
            </div>
          </div>

          {/* Guarantee seal */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-2" style={{ borderColor: "hsl(275 51% 46%)", background: "hsl(275 51% 46% / 0.1)" }}>
              <ShieldCheck size={32} style={{ color: "hsl(275 51% 46%)" }} />
            </div>
            <p className="text-sm font-semibold text-white">
              {t(footer.guarantee, lang)}
            </p>
            <p className="mt-1 text-xs text-blue-200/60">
              {t(footer.guaranteeSub, lang)}
            </p>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-blue-200/50">
          © 2026 SwiftLift. All rights reserved. | Operated by{" "}
          <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">Bluluma Design</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
