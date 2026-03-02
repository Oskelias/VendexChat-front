import { useState } from "react";
import { Bot, ExternalLink, Menu, X } from "lucide-react";

const NAV_LINKS = [
  {
    label: "Para el cliente",
    href: "#cliente",
    color: "text-violet-500 hover:text-violet-400",
    dot: "bg-violet-500",
  },
  {
    label: "Gestión de tienda",
    href: "#gestion",
    color: "text-blue-500 hover:text-blue-400",
    dot: "bg-blue-500",
  },
  {
    label: "Inteligencia IA",
    href: "#ia",
    color: "text-pink-500 hover:text-pink-400",
    dot: "bg-pink-500",
  },
  {
    label: "Precios",
    href: "#pricing",
    color: "text-muted-foreground hover:text-foreground",
    dot: null,
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            VENDEx<span className="text-slate-400">Chat</span><span className="text-violet-600">.IA</span>
          </span>
        </div>

        {/* Links — desktop */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${link.color}`}
            >
              {link.dot && (
                <span className={`w-1.5 h-1.5 rounded-full ${link.dot} opacity-80`} />
              )}
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/morfi-demo"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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

        {/* CTA móvil + hamburguesa */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="https://admin.vendexchat.app/register"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-[#0D9488] transition-colors"
          >
            Gratis
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="p-2 rounded-lg text-foreground hover:bg-slate-100 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-sm px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-semibold transition-colors ${link.color}`}
            >
              {link.dot && (
                <span className={`w-2 h-2 rounded-full ${link.dot} opacity-80`} />
              )}
              {link.label}
            </a>
          ))}
          <a
            href="/morfi-demo"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-1.5 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver ejemplo <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
