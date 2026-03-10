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
