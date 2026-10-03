const DEFAULT_ALLOWED_ORIGINS = [
  "https://twillful.ooo",
  "https://www.twillful.ooo"
];
const MAX_BODY_BYTES = 8192;
const FIELD_LIMITS = { name: 100, company: 160, website: 500, phone: 50 };

async function readPayload(request) {
  if (!request.body) throw new Error("Invalid JSON payload");
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError("Request body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const configuredOrigins = (env.ALLOWED_ORIGINS || "").split(",").map(item => item.trim()).filter(Boolean);
    const allowedOrigins = configuredOrigins.length ? configuredOrigins : DEFAULT_ALLOWED_ORIGINS;
    const originAllowed = allowedOrigins.includes(origin);
    const headers = {
      "Content-Type": "application/json",
      "Vary": "Origin",
      ...(originAllowed ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      } : {})
    };
    const respond = (status, error) => new Response(JSON.stringify(error ? { ok: false, error } : { ok: true }), { status, headers });

    if (new URL(request.url).pathname !== "/contact") return respond(404, "Not found");
    if (!["POST", "OPTIONS"].includes(request.method)) return respond(405, "Method not allowed");
    // Browser-origin policy, not authentication: non-browser clients can spoof Origin.
    if (!originAllowed) return respond(403, "Origin not allowed");
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return respond(415, "Expected application/json");
    }

    let payload;
    try {
      payload = await readPayload(request);
    } catch (error) {
      return respond(error instanceof RangeError ? 413 : 400, error instanceof RangeError ? "Request body too large" : "Invalid JSON payload");
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return respond(400, "Expected a JSON object");

    const fields = {};
    for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
      const value = payload[field] === undefined && field === "website" ? "" : payload[field];
      if (typeof value !== "string") return respond(400, `Invalid ${field}`);
      if (value.length > limit) return respond(400, `${field} is too long (maximum ${limit} characters)`);
      fields[field] = value.replace(/[\r\n\t]+/g, " ").trim();
      if (field !== "website" && !fields[field]) return respond(400, "Missing required fields");
      if (/[\u0000-\u001f\u007f]/.test(fields[field])) return respond(400, `Invalid ${field}`);
    }
    if (!env.DISCORD_WEBHOOK_URL) return respond(500, "Contact service unavailable");
    const { name, company, website, phone } = fields;
    const discordBody = {
      content: "New Twillful contact form submission\n\n" +
        `Name: ${name}\nBusiness Name: ${company}\nCurrent Website: ${website || "N/A"}\nPhone Number: ${phone}`,
      allowed_mentions: { parse: [] }
    };
    try {
      const response = await fetch(env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordBody)
      });
      if (!response.ok) return respond(502, "Contact service unavailable");
    } catch {
      return respond(502, "Contact service unavailable");
    }
    return respond(200);
  }
};
