import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-20 max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Política de Privacidad</h1>
        <p className="text-sm text-muted-foreground mb-10">Última actualización: marzo 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Información que recopilamos</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Recopilamos información que usted nos proporciona directamente al registrarse o usar el Servicio,
            incluyendo:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Nombre y datos de contacto (correo electrónico, teléfono).</li>
            <li>Información de su negocio (nombre comercial, catálogo de productos).</li>
            <li>Datos de uso del Servicio y registros de conversaciones con la IA.</li>
            <li>Información técnica como dirección IP y tipo de navegador.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Uso de la información</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Utilizamos la información recopilada para:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Proveer, operar y mejorar el Servicio.</li>
            <li>Personalizar la experiencia del usuario.</li>
            <li>Enviar comunicaciones técnicas y de soporte.</li>
            <li>Detectar y prevenir actividades fraudulentas o ilegales.</li>
            <li>Cumplir con obligaciones legales aplicables.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Compartición de información</h2>
          <p className="text-muted-foreground leading-relaxed">
            No vendemos, alquilamos ni compartimos su información personal con terceros para fines de marketing.
            Podemos compartir información con proveedores de servicios que nos asisten en la operación del
            Servicio, siempre bajo acuerdos de confidencialidad. También podemos divulgar información cuando sea
            requerido por ley o para proteger nuestros derechos legales.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Seguridad de los datos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Implementamos medidas de seguridad técnicas y organizativas para proteger su información contra
            acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de
            transmisión por Internet es 100% seguro, por lo que no podemos garantizar seguridad absoluta.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Retención de datos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Conservamos su información personal durante el tiempo que sea necesario para cumplir con los fines
            descritos en esta política, salvo que la ley exija o permita un período de retención más largo.
            Cuando su cuenta sea eliminada, procederemos a eliminar o anonimizar sus datos en un plazo razonable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Sus derechos</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Dependiendo de su ubicación, puede tener derecho a:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Acceder a los datos personales que tenemos sobre usted.</li>
            <li>Solicitar la corrección de datos inexactos.</li>
            <li>Solicitar la eliminación de sus datos.</li>
            <li>Oponerse al procesamiento de sus datos.</li>
            <li>Solicitar la portabilidad de sus datos.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Utilizamos cookies y tecnologías similares para mejorar la experiencia en el Servicio, analizar el
            tráfico y personalizar el contenido. Puede configurar su navegador para rechazar cookies, aunque
            algunas funcionalidades del Servicio podrían verse afectadas.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Cambios a esta política</h2>
          <p className="text-muted-foreground leading-relaxed">
            Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos los cambios
            significativos publicando la nueva política en esta página con la fecha de actualización. Le
            recomendamos revisar esta página regularmente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Contacto</h2>
          <p className="text-muted-foreground leading-relaxed">
            Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, contáctenos a
            través de los canales disponibles en nuestra página principal.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
