# Twillful

The homepage uses React 18 with prerendered HTML and locally hosted JavaScript,
CSS, fonts, and optimized images. Visitors see the page before React hydrates it.
GitHub Pages continues serving the root of `main`; no hosting configuration changes
are required. ZapTap, its support/privacy pages, CNAME, robots.txt and sitemap remain
separate static files.

## Develop and verify

Use Node.js 22.12+ and the checked-in package lock:

```sh
npm ci
npm run check
python3 -m http.server 8765 --bind 127.0.0.1
```

Edit `src/App.jsx`, `src/styles.css`, and `src/index.html`, then run `npm run build`.
The build writes root `index.html` and fingerprinted assets under `assets/build/`.
Commit both source and generated output together. Do not edit generated files.
The build is deterministic; consecutive builds with the same sources and lockfile
produce identical output. React is bundled in production mode; Babel and Tailwind
no longer run in visitors' browsers. Manrope is self-hosted with its font license
under `assets/fonts/`, so initial loading requires no third-party services.

The build creates fingerprinted WebP images in `assets/optimized/` and a generated
`src/images.json` manifest from the originals in `assets/client-cards/` and
`assets/client-logos/`. Edit originals, not generated images. Cards get separate
160px gallery and 384px hero versions; logos get 120px versions for 2x displays.
The five hero images are preloaded and decoded before the shared entrance timeline
starts. Other images load lazily; the logo strip prepares when near the viewport.

`npm run test:browser` uses installed Google Chrome to check 390px through 7680px
viewports, loop boundaries and multiple cycles, hover labels, tab return, image
loading, the hero sequence, and reduced motion. Screenshots go to
`/tmp/twillful-checks/`. Set `BROWSER_CHANNEL` to use another installed channel.
Each gallery loop has two identical groups, each filled to at least the viewport
width plus overscan. A ResizeObserver updates the repeat count and constant-speed
duration after resizing; there is no fixed upper limit on viewport coverage.

Tests use mocked network requests and do not submit real inquiries. The contact
Worker is deployed separately; see `contact-relay/README.md`. Do not submit the
local preview form to test delivery.

## Accessibility

The logo marquee pauses on hover/focus. Gallery focus remains visible and skips
repeated cards. Reduced-motion mode removes animation and smooth scrolling, shows
hero text immediately, lays out the canonical logos/cards without motion, and shows
the decorative chat's final messages. Preference changes are handled while open.
Form feedback is announced through a persistent live status region.

## Dependencies

Image processing and browser testing dependencies are development-only and are
not shipped in the browser bundle. Run `npm audit` when updating dependencies;
the image optimizer is pinned to a patched release in the package lock.

## Potential spam protection (not enabled)

The Worker validates input and enforces an Origin policy, but Origin can be forged.
A hidden honeypot could cheaply filter simple bots but is bypassable. A shared rate
limit is stronger; an in-memory Worker counter is unreliable across instances.
Cloudflare rate limiting or Turnstile would need configuration/access review and
possibly new keys. No such settings, services, keys, or credentials were changed.
