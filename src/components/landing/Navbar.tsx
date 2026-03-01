import { Bot, ExternalLink } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            VENDEx<span className="text-slate-400">Chat</span><span className="text-violet-600">.IA</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#problema" className="hover:text-foreground transition-colors">Problema</a>
          <a href="#solucion" className="hover:text-foreground transition-colors">Solución</a>
          <a href="#como-funciona" className="hover:text-foreground transition-colors">Cómo funciona</a>
          <a href="#funcionalidades" className="hover:text-foreground transition-colors">Funcionalidades</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Precios</a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/morfi-demo"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver ejemplo <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://admin.vendexchat.app/register"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-[#0D9488] transition-colors"
          >
            Probar Gratis
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
