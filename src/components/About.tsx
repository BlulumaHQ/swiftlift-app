import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";

const About = () => {
  const { lang } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-6 pb-8">
      <ScrollReveal>
        <p className="text-sm text-muted-foreground max-w-xl">
          {t(translations.about.text, lang)}
        </p>
      </ScrollReveal>
    </div>
  );
};

export default About;
