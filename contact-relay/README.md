# Contact Relay (Cloudflare Worker)

This relay keeps your Discord webhook secret off the public website.

## 1. Install Wrangler

```bash
npm install -g wrangler
```

## 2. Login to Cloudflare

```bash
wrangler login
```

## 3. Set the Discord webhook as a secret

From this folder (`contact-relay`):

```bash
wrangler secret put DISCORD_WEBHOOK_URL
```

Paste your Discord webhook URL when prompted.

## 4. Deploy the worker

```bash
wrangler deploy
```

After deploy, copy the worker URL (example: `https://twillful-contact-relay.<subdomain>.workers.dev`).

## 5. Update the website

In `/index.html`, set:

```js
const CONTACT_RELAY_URL = "https://YOUR-WORKER-URL.workers.dev/contact";
```

Then deploy your website update.

## Important

Your Discord webhook was previously exposed in client-side code and git history. Rotate/revoke it in Discord and create a new webhook, then store the new one only in Worker secrets.

## Validation and local regression checks

Run from the repository root with Node.js 18 or later:

```bash
node --test tests/contact-relay.test.mjs
```

All outbound requests in these tests are mocked; they never contact Discord.
The relay accepts JSON objects with string fields: `name` (required, maximum 100
UTF-16 code units), `company` (required, 160), `phone` (required, 50), and `website`
(optional, 500). Whitespace-only required values and non-string values are rejected.
The streamed request body is limited to 8 KiB, independently of Content-Length.
These limits keep the resulting Discord message below its content limit.

POST and OPTIONS requests must carry an exact allowed Origin. Missing and foreign
origins receive 403; configured ALLOWED_ORIGINS replaces the default apex/www list.
This is a browser-origin policy, **not authentication or spam prevention**: clients
can forge Origin. Rate limiting and bot protection remain separate future work.
Local browser previews are intentionally not on the production allowlist. Do not
submit the preview's form to test delivery; use the mocked tests above.
