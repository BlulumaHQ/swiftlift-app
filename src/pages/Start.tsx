import { useState, useCallback } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Preloader from "@/components/Preloader";
import { IndexContent } from "./Index";
import { Link } from "react-router-dom";
import swiftsiteLogo from "@/assets/swiftsite-logo.svg";

const PRELOADER_KEY = "swiftlift_visited";

const MinimalHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
        <Link to="/start" className="flex items-center py-[5px]">
          <img src={swiftsiteLogo} alt="SwiftLift Studio" className="h-[calc(5rem-10px)] w-auto" />
        </Link>
      </div>
    </header>
  );
};

const MinimalFooter = () => {
  return (
    <footer className="py-8" style={{ background: "#0f172a" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center text-xs text-blue-200/50 space-y-1">
          <p>© 2026 SwiftLift. All rights reserved.<span className="hidden md:inline"> | </span><br className="md:hidden" />Operated by{" "}
          <a href="https://www.bluluma.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">Bluluma Design</a></p>
        </div>
      </div>
    </footer>
  );
};

const Start = () => {
  const [showPreloader, setShowPreloader] = useState(() => !sessionStorage.getItem(PRELOADER_KEY));

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    sessionStorage.setItem(PRELOADER_KEY, "1");
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background scroll-smooth">
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        <MinimalHeader />
        <IndexContent />
        <MinimalFooter />
      </div>
    </LanguageProvider>
  );
};

export default Start;
