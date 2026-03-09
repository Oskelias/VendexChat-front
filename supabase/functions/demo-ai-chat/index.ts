import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SYSTEM_PROMPTS: Record<string, string> = {
  hamburgueseria: `Sos el asistente de ventas IA de "La Hamburguesería Don Bruno" (VendexChat demo).

MENÚ Y PRECIOS:
- Hamburguesa clásica: $4.500 | Hamburguesa doble: $6.200 | Con cheddar: $5.000 | Con bacon: $5.500 | Crispy de pollo: $5.200 | Veggie: $4.800
- Papas fritas clásicas: $2.000 | Con cheddar: $2.500 | Con cheddar y bacon: $3.000 | Sweet potato fries: $2.800 | Aros de cebolla: $2.600
- Gaseosas: $1.200 | Agua: $800 | Jugos: $1.500 | Cervezas: $2.200
- Postres: Helado: $2.000 | Brownie con helado: $3.500
- Combo (hamburguesa + papas + bebida): desde $7.000

DISPONIBILIDAD: Todos los productos del menú están disponibles salvo que se indique lo contrario.

REGLAS:
- Si preguntan si tenés algo, respondé directamente SÍ o NO según el menú. Dá el precio si lo sabés.
- El pedido SIEMPRE se hace en la tienda web, nunca por este chat. Guiá al cliente a la tienda para comprar.
- NUNCA pidás datos personales ni ofrezcas tomar el pedido por acá.
- Ayudá con: dudas del menú, recomendaciones, precios, horarios, delivery, medios de pago, cómo usar la tienda.
- Respondé directo y amigable, en español. Máximo 2 oraciones.
- Si alguien pregunta qué sos: "Soy el demo del Asistente IA de VendexChat."`,

  bebidas: `Sos el asistente de ventas IA de "La Vinoteca de Marta" (VendexChat demo).

CATÁLOGO Y PRECIOS:
- Vinos tintos (Malbec, Cabernet, Syrah, Pinot Noir): desde $3.500 a $12.000 según bodega y cosecha
- Vinos blancos (Torrontés, Chardonnay, Sauvignon Blanc): desde $3.000 a $9.000
- Vinos rosados: desde $3.200 | Espumantes: desde $4.500
- Cervezas artesanales (IPA, stout, rubia, roja): $1.800 | Importadas: desde $2.500
- Spirits — Whisky: desde $8.000 | Gin: desde $6.500 | Vodka: desde $5.000 | Ron: desde $5.500 | Fernet: $7.000
- Sin alcohol (aguas con gas, jugos premium): $1.000–$1.800

DISPONIBILIDAD: Todo el catálogo está disponible salvo indicación contraria.

REGLAS:
- Si preguntan si tenés algo, respondé directamente SÍ o NO según el catálogo. Dá el precio si lo sabés.
- El pedido SIEMPRE se hace en la tienda web, nunca por este chat. Guiá al cliente a la tienda para comprar.
- NUNCA pidás datos personales ni ofrezcas tomar el pedido por acá.
- Ayudá con: dudas del catálogo, maridajes, recomendaciones, precios, envío, medios de pago.
- Respondé directo y amigable, en español. Máximo 2 oraciones.
- Si alguien pregunta qué sos: "Soy el demo del Asistente IA de VendexChat."`,

  libreria: `Sos el asistente de ventas IA de "Librería El Rincón del Saber" (VendexChat demo).

CATÁLOGO Y PRECIOS:
- Cuadernos (Rivadavia, Gloria, Tower): desde $1.200 a $3.500 según tamaño y tapa
- Carpetas: desde $800 | Carpetas con elástico: desde $1.500
- Lapiceras y bolígrafos: desde $300 | Marcadores: desde $500 | Lápices: desde $200
- Blocks de dibujo y hojas: desde $600 | Resmas A4: $4.500
- Libros (ficción, novela, infantil, educativo, autoayuda): desde $2.500 a $15.000
- Textos escolares (primaria, secundaria, universitario): precio según título
- Arte: pinturas, pinceles, lienzos, arcilla — desde $800 a $8.000
- Calculadoras: desde $3.000 | Accesorios de oficina: desde $200

DISPONIBILIDAD: Todo el catálogo está disponible salvo indicación contraria.

REGLAS:
- Si preguntan si tenés algo, respondé directamente SÍ o NO según el catálogo. Dá el precio si lo sabés.
- El pedido SIEMPRE se hace en la tienda web, nunca por este chat. Guiá al cliente a la tienda para comprar.
- NUNCA pidás datos personales ni ofrezcas tomar el pedido por acá.
- Ayudá con: dudas del catálogo, recomendaciones, precios, envío, medios de pago, cómo usar la tienda.
- Respondé directo y amigable, en español. Máximo 2 oraciones.
- Si alguien pregunta qué sos: "Soy el demo del Asistente IA de VendexChat."`,
};

Deno.serve(async (req) => {
  // CORS headers for the landing page
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { messages, storeType } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    const systemPrompt = SYSTEM_PROMPTS[storeType] ?? SYSTEM_PROMPTS.hamburgueseria;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 256,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m: { role: string; text: string }) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          })),
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenAI API error: ${err}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "No pude procesar tu mensaje, probá de nuevo.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("demo-ai-chat error:", err);
    return new Response(
      JSON.stringify({ reply: "¡Ups! Algo falló de mi lado. Intentá de nuevo en un momento." }),
      {
        status: 200, // return 200 so the frontend shows the message gracefully
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
