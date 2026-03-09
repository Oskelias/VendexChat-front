import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const WhatsAppFloatingButton = () => {

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      title="Contactanos por WhatsApp"
      aria-label="Contactanos por WhatsApp"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated hover:shadow-card transition-shadow"
      onClick={() => trackEvent("whatsapp_floating_click")}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-6 w-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 17.45c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.37-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.44-.46-.61-.46-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16.04 5.33c-5.86 0-10.61 4.75-10.61 10.61 0 1.87.49 3.69 1.41 5.29L5.24 26.7l5.72-1.5c1.54.84 3.27 1.29 5.08 1.29 5.86 0 10.61-4.75 10.61-10.61 0-5.86-4.75-10.61-10.61-10.61zm0 19.31c-1.64 0-3.24-.44-4.63-1.27l-.33-.19-3.4.89.91-3.31-.21-.34c-.87-1.41-1.33-3.03-1.33-4.68 0-4.93 4.01-8.94 8.94-8.94 4.93 0 8.94 4.01 8.94 8.94 0 4.93-4.01 8.94-8.94 8.94z" />
      </svg>
    </a>
  );
};

export default WhatsAppFloatingButton;
