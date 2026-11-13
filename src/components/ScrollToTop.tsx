import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      // Target sections (e.g. /#contact) may render after this effect; retry briefly.
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const timer = window.setInterval(() => {
        const el = document.getElementById(id);
        if (el || ++tries > 30) {
          window.clearInterval(timer);
          el?.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => window.clearInterval(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
