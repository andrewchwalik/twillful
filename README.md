# Twillful

The homepage uses React 18 with precompiled, locally hosted JavaScript and CSS.
GitHub Pages continues serving the root of `main`; no hosting configuration changes
are required. ZapTap, its support/privacy pages, CNAME, robots.txt and sitemap remain
separate static files.

## Develop and verify

Use Node.js 22.12+ and the checked-in package lock:

```sh
npm ci --ignore-scripts
npm run check
python3 -m http.server 8765 --bind 127.0.0.1
```

Edit `src/App.jsx`, `src/styles.css`, and `src/index.html`, then run `npm run build`.
The build writes root `index.html` and fingerprinted assets under `assets/build/`.
Commit both source and generated output together. Do not edit generated files.
The build is deterministic; consecutive builds with the same sources and lockfile
produce identical output. React is bundled in production mode; Babel and Tailwind
no longer run in visitors' browsers. Google Fonts remains the existing font source.

Tests use mocked network requests and do not submit real inquiries. The contact
Worker is deployed separately; see `contact-relay/README.md`. Do not submit the
local preview form to test delivery.

## Accessibility

The logo marquee pauses on hover/focus. Gallery focus remains visible and skips
repeated cards. Reduced-motion mode removes animation and smooth scrolling, shows
hero text immediately, lays out the canonical logos/cards without motion, and shows
the decorative chat's final messages. Preference changes are handled while open.
Form feedback is announced through a persistent live status region.

## Dependency audit limitation

The runtime-only audit reports no known vulnerabilities as of this change.
The full audit reports five high-severity package entries stemming from the same
unpatched `braces <=3.0.3` build-time denial-of-service advisory:
https://github.com/advisories/GHSA-vfj7-8cjw-p6xm . Tailwind 3 depends on that glob
parser. This build accepts only repository-controlled source paths, not visitor
input, and the parser is not shipped in browser assets. A Tailwind 4 migration is
outside this design-preserving pass. Recheck the advisory before updating tooling.

## Potential spam protection (not enabled)

The Worker validates input and enforces an Origin policy, but Origin can be forged.
A hidden honeypot could cheaply filter simple bots but is bypassable. A shared rate
limit is stronger; an in-memory Worker counter is unreliable across instances.
Cloudflare rate limiting or Turnstile would need configuration/access review and
possibly new keys. No such settings, services, keys, or credentials were changed.
