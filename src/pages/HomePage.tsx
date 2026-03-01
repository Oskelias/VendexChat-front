import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import CustomerOrderSection from "@/components/landing/CustomerOrderSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import InteractiveAISection from "@/components/landing/InteractiveAISection";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import PricingSection from "@/components/landing/PricingSection";
import DemoSection from "@/components/landing/DemoSection";
import SEOContentSection from "@/components/landing/SEOContentSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import WhatsAppFloatingButton from "@/components/landing/WhatsAppFloatingButton";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <InteractiveAISection />
      <CustomerOrderSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <BeforeAfterSection />
      <PricingSection />
      <DemoSection />
      <SEOContentSection />
      <CTASection />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
