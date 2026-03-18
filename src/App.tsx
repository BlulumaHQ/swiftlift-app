import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Deployment from "./pages/Deployment";
import CustomBrief from "./pages/CustomBrief";
import RevisionSubmit from "./pages/RevisionSubmit";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import HostingGuide from "./pages/HostingGuide";
import Faq from "./pages/Faq";
import Support from "./pages/Support";
import PaymentSuccess from "./pages/PaymentSuccess";
import PayBuild from "./pages/PayBuild";
import RevisionPayment from "./pages/RevisionPayment";
import Portfolio from "./pages/Portfolio";
import WorkWithUs from "./pages/WorkWithUs";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/deployment" element={<Deployment />} />
          <Route path="/custom-brief" element={<CustomBrief />} />
          <Route path="/revision-request" element={<RevisionSubmit />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/features" element={<Features />} />
          <Route path="/hosting-guide" element={<HostingGuide />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/support" element={<Support />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/pay-build" element={<PayBuild />} />
          <Route path="/revision-payment" element={<RevisionPayment />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
