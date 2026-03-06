import Navbar from "@/components/landing/Navbar";
import DemoSection from "@/components/landing/DemoSection";
import Footer from "@/components/landing/Footer";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <DemoSection />
      </div>
      <Footer />
    </div>
  );
}
