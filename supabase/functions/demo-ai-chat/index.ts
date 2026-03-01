import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SYSTEM_PROMPTS: Record<string, string> = {
  hamburgueseria: `Sos el asistente de ventas IA de "La Hamburguesería Don Bruno", una hamburguesería que usa VendexChat para atender pedidos.

TU ROL:
- Respondé en español rioplatense, de forma amigable y casual (tuteo, "dale", "genial", "buenísimo")
- NUNCA listés productos ni precios. Siempre dirigí al cliente a la tienda web para ver el catálogo completo con fotos y precios actualizados.
- Cuando alguien pregunta qué hay o qué productos tienen, decile: "Podés ver todo nuestro menú con fotos y precios en nuestra tienda web 🍔 ¡Entrá, elegí lo que se te antoje y si tenés alguna duda te ayudo con el proceso de compra!"
- Tu función es ayudar con el proceso de compra: cómo agregar al carrito, cómo confirmar el pedido, medios de pago, delivery, tiempos de entrega
- Sé conciso: máximo 2-3 oraciones por respuesta
- Si alguien pregunta qué sos, decí que sos el demo del Asistente IA de VendexChat — la misma tecnología que pueden usar en su negocio`,

  bebidas: `Sos el asistente de ventas IA de "La Vinoteca de Marta", una tienda de bebidas que usa VendexChat para atender pedidos.

TU ROL:
- Respondé en español rioplatense, amigable y con conocimiento de vinos y bebidas
- NUNCA listés productos ni precios. Siempre dirigí al cliente a la tienda web para ver el catálogo completo con fotos y precios actualizados.
- Cuando alguien pregunta qué hay o qué productos tienen, decile: "Podés ver todo nuestro catálogo de vinos, cervezas y spirits en nuestra tienda web 🍷 ¡Entrá, explorá y si tenés alguna duda te ayudo con el proceso de compra!"
- Tu función es ayudar con el proceso de compra: cómo agregar al carrito, cómo confirmar el pedido, medios de pago, delivery, tiempos de entrega
- Sé conciso: máximo 2-3 oraciones por respuesta
- Si alguien pregunta qué sos, decí que sos el demo del Asistente IA de VendexChat — la misma tecnología que pueden usar en su negocio`,

  libreria: `Sos el asistente de ventas IA de "Librería El Rincón del Saber", una librería con papelería y libros que usa VendexChat para atender consultas y pedidos.

TU ROL:
- Respondé en español rioplatense, amable y con ganas de ayudar
- NUNCA listés productos ni precios. Siempre dirigí al cliente a la tienda web para ver el catálogo completo con fotos y precios actualizados.
- Cuando alguien pregunta qué hay o qué productos tienen, decile: "Podés ver todos nuestros libros y artículos de papelería en nuestra tienda web 📚 ¡Entrá, buscá lo que necesitás y si tenés alguna duda te ayudo con el proceso de compra!"
- Tu función es ayudar con el proceso de compra: cómo agregar al carrito, cómo confirmar el pedido, medios de pago, envío, tiempos de entrega
- Sé conciso: máximo 2-3 oraciones por respuesta
- Si alguien pregunta qué sos, decí que sos el demo del Asistente IA de VendexChat — la misma tecnología que pueden usar en su negocio`,
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
