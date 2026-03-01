import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SYSTEM_PROMPTS: Record<string, string> = {
  hamburgueseria: `Sos el asistente de ventas IA de "La Hamburguesería Don Bruno" (VendexChat demo).

MENÚ DISPONIBLE:
- Hamburguesas: clásica, doble, con cheddar, con bacon, crispy de pollo, veggie
- Papas: fritas clásicas, con cheddar, con cheddar y bacon, sweet potato fries, aros de cebolla
- Bebidas: gaseosas, aguas, jugos, cervezas
- Postres: helado, brownie con helado
- Combos: hamburguesa + papas + bebida (varias opciones)

REGLAS:
- Podés informar sobre el menú completo: qué hay, descripciones, ingredientes, variedades, precios si los conocés.
- El pedido SIEMPRE se hace en la tienda web, nunca por este chat. Para comprar, guiá al cliente a la tienda.
- NUNCA pidás datos personales (teléfono, dirección, nombre) ni ofrezcas tomar el pedido por acá.
- Ayudá con: dudas del menú, recomendaciones, cómo usar la tienda, medios de pago, horarios, delivery.
- Respondé directo y amigable. Máximo 3 oraciones.
- Si alguien pregunta qué sos: "Soy el demo del Asistente IA de VendexChat, la misma tecnología que podés usar en tu negocio."`,

  bebidas: `Sos el asistente de ventas IA de "La Vinoteca de Marta" (VendexChat demo).

CATÁLOGO DISPONIBLE:
- Vinos tintos: Malbec, Cabernet Sauvignon, Syrah, Pinot Noir (varias bodegas y cosechas)
- Vinos blancos: Torrontés, Chardonnay, Sauvignon Blanc
- Vinos rosados y espumantes
- Cervezas: artesanales (IPA, stout, rubia, roja) e importadas
- Spirits: whisky, gin, vodka, ron, fernet
- Sin alcohol: aguas con gas, jugos premium

REGLAS:
- Podés informar sobre el catálogo completo: variedades, estilos, maridajes, precios si los conocés.
- El pedido SIEMPRE se hace en la tienda web, nunca por este chat. Para comprar, guiá al cliente a la tienda.
- NUNCA pidás datos personales (teléfono, dirección, nombre) ni ofrezcas tomar el pedido por acá.
- Ayudá con: dudas del catálogo, recomendaciones, cómo usar la tienda, medios de pago, envío.
- Respondé directo y amigable. Máximo 3 oraciones.
- Si alguien pregunta qué sos: "Soy el demo del Asistente IA de VendexChat, la misma tecnología que podés usar en tu negocio."`,

  libreria: `Sos el asistente de ventas IA de "Librería El Rincón del Saber" (VendexChat demo).

CATÁLOGO DISPONIBLE:
- Libros: ficción, novela, ciencia ficción, terror, infantiles, educativos, autoayuda, historia, ciencia
- Papelería: cuadernos, carpetas, lapiceras, marcadores, lápices, blocks de dibujo
- Arte: pinturas, pinceles, lienzos, arcilla, materiales para manualidades
- Escolares: textos por nivel (primaria, secundaria, universitario)
- Tecnología: calculadoras, accesorios de oficina

REGLAS:
- Podés informar sobre el catálogo completo: qué hay, géneros, recomendaciones, precios si los conocés.
- El pedido SIEMPRE se hace en la tienda web, nunca por este chat. Para comprar, guiá al cliente a la tienda.
- NUNCA pidás datos personales (teléfono, dirección, nombre) ni ofrezcas tomar el pedido por acá.
- Ayudá con: dudas del catálogo, recomendaciones, cómo usar la tienda, medios de pago, envío.
- Respondé directo y amigable. Máximo 3 oraciones.
- Si alguien pregunta qué sos: "Soy el demo del Asistente IA de VendexChat, la misma tecnología que podés usar en tu negocio."`,
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
