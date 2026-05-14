export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({ error: "API key not configured. Add OPENAI_API_KEY in Netlify env vars." }), { status: 500, headers: { "Content-Type": "application/json" } });
  try {
    const body = await req.json();
    const userMessage = body.messages?.[0]?.content || "";
    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "gpt-4o-mini", tools: [{ type: "web_search_preview" }], input: userMessage }),
    });
    const data = await resp.json();
    let textContent = "";
    if (data.output) {
      for (const item of data.output) {
        if (item.type === "message" && item.content) {
          for (const c of item.content) {
            if (c.type === "output_text") textContent += c.text;
          }
        }
      }
    } else if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
    const normalized = { content: [{ type: "text", text: textContent }] };
    return new Response(JSON.stringify(normalized), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
export const config = { path: "/api/reaper-check" };
