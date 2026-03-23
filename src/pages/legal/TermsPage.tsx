import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-20 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Términos y Condiciones</h1>
        <p className="text-sm text-muted-foreground mb-10">Última actualización: marzo 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Aceptación de los términos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Al acceder y utilizar VendexChat.IA ("el Servicio"), usted acepta estar sujeto a estos Términos y
            Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al Servicio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Descripción del Servicio</h2>
          <p className="text-muted-foreground leading-relaxed">
            VendexChat.IA es una plataforma de asistente de ventas con inteligencia artificial que permite a
            comercios gestionar su catálogo, atender clientes por WhatsApp y automatizar sus procesos de venta.
            El servicio es desarrollado y operado por Inteliar Stack.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Uso aceptable</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Usted se compromete a utilizar el Servicio únicamente para fines lícitos y de acuerdo con estos
            términos. Queda prohibido:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Utilizar el Servicio para actividades ilegales o fraudulentas.</li>
            <li>Intentar acceder de forma no autorizada a sistemas o datos.</li>
            <li>Transmitir contenido dañino, ofensivo o que infrinja derechos de terceros.</li>
            <li>Revender o sublicenciar el acceso al Servicio sin autorización previa.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Cuentas y responsabilidad</h2>
          <p className="text-muted-foreground leading-relaxed">
            Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las
            actividades que ocurran bajo su cuenta. Debe notificarnos de inmediato ante cualquier uso no
            autorizado.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Propiedad intelectual</h2>
          <p className="text-muted-foreground leading-relaxed">
            El Servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad
            exclusiva de Inteliar Stack. Nuestras marcas comerciales no pueden ser utilizadas en conexión con
            ningún producto o servicio sin el consentimiento previo por escrito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitación de responsabilidad</h2>
          <p className="text-muted-foreground leading-relaxed">
            En ningún caso Inteliar Stack, sus directores, empleados o proveedores serán responsables por daños
            indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso o la imposibilidad
            de uso del Servicio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Modificaciones</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Le notificaremos los
            cambios publicando los nuevos términos en esta página. El uso continuado del Servicio después de
            dichos cambios constituye su aceptación de los nuevos términos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Contacto</h2>
          <p className="text-muted-foreground leading-relaxed">
            Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos a través de los
            canales disponibles en nuestra página principal.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
