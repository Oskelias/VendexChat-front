"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const faqs = [
  {
    q: "¿Necesito saber programar para usar VENDExChat?",
    a: "No, para nada. Está diseñado para que cualquier comerciante pueda usarlo sin conocimientos técnicos. Desde cargar el catálogo hasta configurar el bot, todo es visual e intuitivo. Si tenés dudas, nuestro equipo te acompaña en el proceso.",
  },
  {
    q: "¿Funciona con MercadoPago o MercadoLibre?",
    a: "Sí. Podés integrar MercadoPago para que tus clientes paguen directamente desde el chat de WhatsApp. La integración con MercadoLibre está en desarrollo y estará disponible próximamente.",
  },
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí, podés subir o bajar de plan cuando quieras desde el panel de administración. Los cambios se aplican de inmediato y el cobro se prorratea automáticamente.",
  },
  {
    q: "¿Qué pasa si supero el límite de productos de mi plan?",
    a: "No se borran tus productos. El sistema te avisa cuando estás por alcanzar el límite y te ofrece actualizar el plan. Nada se interrumpe de golpe.",
  },
  {
    q: "¿Mis datos y los de mis clientes están seguros?",
    a: "Sí. Usamos servidores con cifrado SSL, backups automáticos diarios y nunca compartimos ni vendemos datos de ningún cliente. Cumplimos con las normativas de protección de datos.",
  },
  {
    q: "¿Cuántos pedidos puede manejar el bot de WhatsApp al mismo tiempo?",
    a: "Sin límite práctico. El bot atiende conversaciones en paralelo las 24 horas, los 7 días de la semana. No importa si llegan 5 o 500 mensajes a la vez.",
  },
  {
    q: "¿Funciona para cualquier tipo de negocio?",
    a: "Funciona para cualquier comercio que venda productos o servicios: ropa, comida, electrónica, perfumería, ferretería, pastelerías, y mucho más. Si tenés un catálogo, VENDExChat lo digitaliza.",
  },
  {
    q: "¿Hay un período de prueba gratis?",
    a: "Sí. El plan Free es gratis para siempre, sin tarjeta de crédito. Podés empezar hoy mismo y pasar a un plan pago cuando tu negocio lo necesite.",
  },
];

const FAQItem = ({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) => (
  <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-violet-200 shadow-md shadow-violet-100/50" : "border-slate-100"}`}>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50/80 transition-colors"
    >
      <span className="font-bold text-slate-900 text-sm md:text-base">{q}</span>
      <ChevronDown
        className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-primary-dynamic" : ""}`}
      />
    </button>
    {open && (
      <div className="px-6 pb-5 bg-white">
        <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
      </div>
    )}
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 md:py-24 overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 bg-slate-50/60 -z-20" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-50/70 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-dynamic" />
            Preguntas frecuentes
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            ¿Tenés dudas?{" "}
            <span className="text-primary-dynamic text-gradient">Las respondemos</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Todo lo que necesitás saber antes de empezar.
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            ¿No encontraste tu respuesta?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary-dynamic hover:underline"
            >
              Hablá con nosotros por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
