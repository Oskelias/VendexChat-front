import { Play } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const DemoSection = () => {
  return (
    <section id="demo" className="py-12 md:py-16 lg:py-20 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Demo</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Mirá una tienda real en acción
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            Explora cómo se ve la experiencia del cliente antes de pedir una demo.
          </p>
          <a
            href="/morfi-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-12 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-[#0D9488] transition-all shadow-elevated"
            onClick={() => trackEvent("demo_store_click")}
          >
            Abrir tienda demo <Play className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
