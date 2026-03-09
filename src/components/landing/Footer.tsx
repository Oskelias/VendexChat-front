import { MessageSquare } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">VendexChat</span>
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
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VendexChat. Desarrollado por @InteliarStack. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
