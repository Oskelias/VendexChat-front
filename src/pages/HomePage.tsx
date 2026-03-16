import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import InteractiveAISection from "@/components/landing/InteractiveAISection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";

import ModuleDemosSection from "@/components/landing/ModuleDemosSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import SalesAiWidget from "@/components/landing/SalesAiWidget";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* BLOQUE 1: Para el cliente */}
      <InteractiveAISection />
      {/* BLOQUE 2: Gestión de tienda */}
      <HowItWorksSection />

      {/* BLOQUE 3: Inteligencia IA (tabs: Cliente / Gestión / IA) */}
      <ModuleDemosSection />
      {/* BLOQUE 4: Listado completo de funcionalidades del panel IA */}
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <SalesAiWidget />
    </div>
  );
}
