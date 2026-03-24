import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // GET: Fetch greeting, botName, instructions and quick responses
  if (req.method === "GET") {
    const url = new URL(req.url);
    const storeId = url.searchParams.get("storeId");

    if (!storeId) {
      return new Response(JSON.stringify({ error: "storeId required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      // Get store config
      const { data: store, error: storeError } = await supabase
        .from("stores")
        .select("id, name, ai_prompt, welcome_message")
        .eq("id", storeId)
        .single();

      if (storeError || !store) {
        throw new Error("Store not found");
      }

      // Get quick responses
      const { data: quickResponses } = await supabase
        .from("quick_responses")
        .select("question, answer")
        .eq("store_id", storeId);

      // Format quick responses for context
      let faqContext = "";
      if (quickResponses && quickResponses.length > 0) {
        faqContext = "\n\nPREGUNTAS FRECUENTES:\n";
        quickResponses.forEach((qr: any, idx: number) => {
          faqContext += `${idx + 1}. P: ${qr.question}\n   R: ${qr.answer}\n`;
        });
      }

      return new Response(
        JSON.stringify({
          greeting: store.welcome_message || `Hola, ¿en qué puedo ayudarte?`,
          botName: `Asistente de ${store.name}`,
          systemPrompt: (store.ai_prompt || "Sos un asistente de ventas amigable.") + faqContext,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.error("store-ai-chat GET error:", err);
      return new Response(JSON.stringify({ error: "Failed to fetch config" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // POST: Chat with AI
  if (req.method === "POST") {
    try {
      const { messages, storeId } = await req.json();

      if (!Array.isArray(messages) || !storeId) {
        return new Response(JSON.stringify({ error: "Invalid request" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get store config
      const { data: store, error: storeError } = await supabase
        .from("stores")
        .select("id, name, ai_prompt")
        .eq("id", storeId)
        .single();

      if (storeError || !store) {
        throw new Error("Store not found");
      }

      // Get quick responses
      const { data: quickResponses } = await supabase
        .from("quick_responses")
        .select("question, answer")
        .eq("store_id", storeId);

      // Build system prompt with FAQ
      let systemPrompt = store.ai_prompt || "Sos un asistente de ventas amigable.";
      if (quickResponses && quickResponses.length > 0) {
        systemPrompt += "\n\nPREGUNTAS FRECUENTES:\n";
        quickResponses.forEach((qr: any, idx: number) => {
          systemPrompt += `${idx + 1}. P: ${qr.question}\n   R: ${qr.answer}\n`;
        });
      }

      const apiKey = Deno.env.get("OPENAI_API_KEY");
      if (!apiKey) {
        throw new Error("OPENAI_API_KEY not configured");
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 256,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m: any) => ({
              role: m.role || "user",
              content: m.content || m.text || "",
            })),
          ],
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`OpenAI API error: ${err}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content ?? "No pude procesar tu mensaje.";

      return new Response(JSON.stringify({ reply }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("store-ai-chat POST error:", err);
      return new Response(
        JSON.stringify({ reply: "¡Ups! Algo falló. Intentá de nuevo en un momento." }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
