const DEFAULT_ALLOWED_ORIGINS = [
  "https://twillful.ooo",
  "https://www.twillful.ooo"
];

function getCorsHeaders(origin, allowedOrigins) {
  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function sanitizeLine(value) {
  return String(value || "").replace(/\r?\n/g, " ").trim();
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigins = (env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const effectiveAllowedOrigins = allowedOrigins.length ? allowedOrigins : DEFAULT_ALLOWED_ORIGINS;
    const corsHeaders = getCorsHeaders(origin, effectiveAllowedOrigins);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const url = new URL(request.url);
    if (url.pathname !== "/contact") {
      return new Response(JSON.stringify({ ok: false, error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    if (!env.DISCORD_WEBHOOK_URL) {
      return new Response(JSON.stringify({ ok: false, error: "Missing webhook secret" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const name = sanitizeLine(payload.name);
    const email = sanitizeLine(payload.email);
    const company = sanitizeLine(payload.company);
    const details = sanitizeLine(payload.details);

    if (!name || !email || !details) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const discordBody = {
      content:
        "New Twillful contact form submission\n\n" +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Brand/Company: ${company || "N/A"}\n` +
        `Project Details: ${details}`,
      allowed_mentions: { parse: [] }
    };

    const discordResponse = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordBody)
    });

    if (!discordResponse.ok) {
      return new Response(JSON.stringify({ ok: false, error: "Discord webhook request failed" }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};
