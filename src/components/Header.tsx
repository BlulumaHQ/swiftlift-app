import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import { Menu, X, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import swiftsiteLogo from "@/assets/swiftsite-logo.svg";

const Header = () => {
  const { lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = translations.nav;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: lang === "en" ? "Home" : "首页", href: "/" },
    { label: t(nav.process, lang), href: "/#process" },
    { label: t(nav.pricing, lang), href: "/#pricing" },
    { label: t(nav.portfolio, lang), href: "/portfolio" },
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
    setMobileOpen(false);
  };

  const headerBg = scrolled ? "header-scrolled" : "header-brand-solid";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between transition-all duration-500">
        <Link to="/" className="flex items-center py-[5px]">
          <img src={swiftsiteLogo} alt="SwiftLift Studio" className="h-[calc(5rem-10px)] w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-[0.9rem] font-bold transition-colors duration-300 ${
                !scrolled
                  ? "text-white hover:text-white/90"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="mailto:support@swiftlift.app"
            className={`hidden md:flex items-center transition-colors ${
              !scrolled ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Email us"
          >
            <Mail size={17} />
          </a>
          <div className={`flex items-center rounded-full border overflow-hidden text-[0.85rem] transition-colors duration-300 ${
            !scrolled ? "border-white/30" : "border-border"
          }`}>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 font-medium transition-colors ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : !scrolled
                    ? "text-white/70 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("zh")}
              className={`px-3 py-1.5 font-medium transition-colors ${
                lang === "zh"
                  ? "bg-primary text-primary-foreground"
                  : !scrolled
                    ? "text-white/70 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              中文
            </button>
          </div>

          <button
            className={`md:hidden transition-colors duration-300 ${!scrolled ? "text-white" : "text-foreground"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-background border-t border-border px-6 py-4 space-y-3" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
