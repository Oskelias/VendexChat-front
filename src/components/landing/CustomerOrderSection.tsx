import { Link, ShoppingCart, MessageCircle, Bot } from "lucide-react";

const steps = [
  {
    icon: Link,
    title: "El cliente abre el link de tu tienda",
    description: "Funciona en cualquier dispositivo y carga rápido.",
  },
  {
    icon: ShoppingCart,
    title: "Selecciona productos del catálogo",
    description: "Elige ítems, cantidades y extras por su cuenta.",
  },
  {
    icon: Bot,
    title: "Asistente IA lo ayuda a elegir",
    description: "Tu bot inteligente responde dudas y sugiere productos en tiempo real.",
  },
  {
    icon: MessageCircle,
    title: "El pedido llega listo a WhatsApp",
    description: "Vos confirmás el pedido, no lo armás.",
  },
];

const CustomerOrderSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Cómo compra tu cliente</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Un flujo simple que entienden al instante
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground">Paso {index + 1}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerOrderSection;
