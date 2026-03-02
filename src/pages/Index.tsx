import { useEffect, useState, useCallback } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import WhySection from "@/components/WhySection";
import ProcessSteps from "@/components/ProcessSteps";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import IntakeForm from "@/components/IntakeForm";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const PRELOADER_KEY = "swiftlift_visited";

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(() => {
    return !sessionStorage.getItem(PRELOADER_KEY);
  });

  useEffect(() => {
    document.title = "SwiftLift — 2 Free Website Previews in 24 Hours";
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    sessionStorage.setItem(PRELOADER_KEY, "1");
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background scroll-smooth">
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        <CustomCursor />
        <Header />
        <main>
          <Hero />
          <ProblemSolution />
          <WhySection />
          <ProcessSteps />
          <Portfolio />
          <Testimonials />
          <Pricing />
          <FAQ />
          <IntakeForm />
        </main>
        <Footer />
        <MobileNav />
      </div>
    </LanguageProvider>
  );
};

export default Index;
