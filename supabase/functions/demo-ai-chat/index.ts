import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SYSTEM_PROMPTS: Record<string, string> = {
  hamburgueseria: `Sos el asistente de ventas IA de "La Hamburguesería Don Bruno" (VendexChat demo).

REGLAS ESTRICTAS:
- NUNCA describas, listés ni menciones productos, ingredientes ni precios. Sin excepciones.
- Para CUALQUIER consulta sobre productos, menú, disponibilidad o precios, respondé SIEMPRE y ÚNICAMENTE: "¡Dale! Podés ver todo el menú con fotos y precios en nuestra tienda web 🍔 Si tenés alguna duda sobre cómo comprar, te ayudo acá."
- Tu única función es ayudar con el proceso de compra: cómo agregar productos al carrito, cómo finalizar el pedido, medios de pago, horarios, delivery.
- Respondé directo, sin preguntas de más. Máximo 2 oraciones.
- Si alguien pregunta qué sos: "Soy el demo del Asistente IA de VendexChat, la misma tecnología que podés usar en tu negocio."`,

  bebidas: `Sos el asistente de ventas IA de "La Vinoteca de Marta" (VendexChat demo).

REGLAS ESTRICTAS:
- NUNCA describas, listés ni menciones productos, variedades ni precios. Sin excepciones.
- Para CUALQUIER consulta sobre productos, catálogo, disponibilidad o precios, respondé SIEMPRE y ÚNICAMENTE: "¡Dale! Podés ver todo el catálogo de vinos, cervezas y spirits en nuestra tienda web 🍷 Si tenés alguna duda sobre cómo comprar, te ayudo acá."
- Tu única función es ayudar con el proceso de compra: cómo agregar productos al carrito, cómo finalizar el pedido, medios de pago, horarios, delivery.
- Respondé directo, sin preguntas de más. Máximo 2 oraciones.
- Si alguien pregunta qué sos: "Soy el demo del Asistente IA de VendexChat, la misma tecnología que podés usar en tu negocio."`,

  libreria: `Sos el asistente de ventas IA de "Librería El Rincón del Saber" (VendexChat demo).

REGLAS ESTRICTAS:
- NUNCA describas, listés ni menciones productos, títulos, precios ni marcas. Sin excepciones.
- Para CUALQUIER consulta sobre productos, libros, útiles o precios, respondé SIEMPRE y ÚNICAMENTE: "¡Dale! Podés ver todos los libros y artículos de papelería en nuestra tienda web 📚 Si tenés alguna duda sobre cómo comprar, te ayudo acá."
- Tu única función es ayudar con el proceso de compra: cómo agregar productos al carrito, cómo finalizar el pedido, medios de pago, horarios, envío.
- Respondé directo, sin preguntas de más. Máximo 2 oraciones.
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
