import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import { Layers, Briefcase, DollarSign, MessageSquare } from "lucide-react";

const MobileNav = () => {
  const { lang } = useLanguage();
  const nav = translations.nav;

  const items = [
    { label: t(nav.process, lang), href: "/#process", icon: Layers },
    { label: t(nav.portfolio, lang), href: "/#portfolio", icon: Briefcase },
    { label: t(nav.pricing, lang), href: "/#pricing", icon: DollarSign },
    { label: t(nav.contact, lang), href: "/#contact", icon: MessageSquare },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden glass-header rounded-2xl shadow-lg border border-border" aria-label="Mobile bottom navigation">
      <div className="flex items-center justify-around py-2.5">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors px-3 py-1"
          >
            <item.icon size={18} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
