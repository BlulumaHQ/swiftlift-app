import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/lib/translations";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import heroDesktopBg from "@/assets/hero-bg-desktop.webp";

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const Hero = () => {
  const { lang } = useLanguage();
  const hero = translations.hero;
  const headline = t(hero.headline, lang);
  // Split by newline to get visual lines, then split each line into words
  const lines = headline.split("\n");

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Desktop: static image background */}
      <img
        src={heroDesktopBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0 hidden lg:block"
      />
      {/* Mobile/Tablet: video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 lg:hidden"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Mobile/Tablet overlay: gradient */}
      <div className="absolute inset-0 z-[1] pointer-events-none lg:hidden" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.15) 100%)'
      }} />
      {/* Desktop overlay: uniform dark navy for readability while keeping image visible */}
      <div className="absolute inset-0 z-[1] pointer-events-none hidden lg:block" style={{
        background: 'rgba(10, 15, 30, 0.4)'
      }} />
      <div className="video-overlay lg:hidden" />

      <div className="max-w-7xl mx-auto px-6 w-full py-20 md:py-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.h1
            key={lang + "-hero-h"}
            className="text-[clamp(2.2rem,9vw,7rem)] font-black leading-[0.9] text-white font-display"
          >
            {lines.map((line, lineIdx) => {
              const words = line.split(" ");
              return (
                <span key={lineIdx}>
                  {words.map((word, wordIdx) => {
                    const globalIdx = lines.slice(0, lineIdx).reduce((acc, l) => acc + l.split(" ").length, 0) + wordIdx;
                    return (
                      <motion.span
                        key={globalIdx}
                        custom={globalIdx}
                        initial="hidden"
                        animate="visible"
                        variants={wordVariants}
                        className="inline-block mr-[0.3em]"
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                  {lineIdx < lines.length - 1 && <br />}
                </span>
              );
            })}
          </motion.h1>

          <ScrollReveal delay={0.4}>
            <motion.p
              key={lang + "-hero-p"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mt-8 text-base md:text-lg max-w-2xl leading-relaxed text-white/80"
            >
              {t(hero.subheadline, lang)}
            </motion.p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="mt-3 text-sm font-semibold" style={{ color: "hsl(214 58% 60%)" }}>
              {t(hero.launchPricing, lang)}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="mt-8 flex flex-col items-center gap-2">
              <MagneticButton
                as="a"
                href="/#contact"
                className="inline-block bg-white text-primary font-semibold px-10 py-4 rounded-full text-base hover:bg-white/90 transition-colors shadow-lg"
              >
                {t(hero.cta, lang)}
              </MagneticButton>
              <p className="text-sm text-white/60 mt-1 whitespace-pre-line md:whitespace-normal">
                {t(hero.ctaSub, lang)}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-scroll-bounce">
        <ArrowDown size={20} className="text-white/70" />
      </div>
    </section>
  );
};

export default Hero;
