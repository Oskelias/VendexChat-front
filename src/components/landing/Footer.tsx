import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import AssistantIcon from "../icons/AssistantIcon";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <AssistantIcon className="w-8 h-8" />
            <span className="font-display text-lg font-bold text-foreground">
              VENDEx<span className="text-slate-400">Chat</span><span className="text-violet-600">.IA</span>
            </span>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("footer_contact_click")}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Contacto
          </a>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">© 2026 VendeXChat</p>
            <p className="text-xs text-muted-foreground/70">Producto desarrollado por Inteliar Stack</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
