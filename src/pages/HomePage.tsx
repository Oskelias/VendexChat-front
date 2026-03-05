import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import InteractiveAISection from "@/components/landing/InteractiveAISection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import DemoSection from "@/components/landing/DemoSection";
import ModuleDemosSection from "@/components/landing/ModuleDemosSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import WhatsAppFloatingButton from "@/components/landing/WhatsAppFloatingButton";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* BLOQUE 1: Para el cliente */}
      <InteractiveAISection />
      {/* BLOQUE 2: Gestión de tienda */}
      <HowItWorksSection />
      {/* Demo: tienda del cliente + dashboard IA */}
      <DemoSection />
      {/* BLOQUE 3: Inteligencia IA (tabs: Cliente / Gestión / IA) */}
      <ModuleDemosSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
