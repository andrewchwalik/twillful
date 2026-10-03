import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const jsPath = html.match(/src="(\/assets\/build\/[^" ]+\.js)"/)[1];
const cssPath = html.match(/href="(\/assets\/build\/[^" ]+\.css)"/)[1];
const js = await readFile(new URL('..' + jsPath, import.meta.url), 'utf8');
const css = await readFile(new URL('..' + cssPath, import.meta.url), 'utf8');
async function settle(check) {
  for (let i = 0; i < 40; i++) { if (check()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  assert.ok(check(), 'render did not settle');
}
test('production assets are local, minified, and reproducible', async () => {
  assert.doesNotMatch(html, /unpkg|cdn.tailwindcss|text\/babel/);
  assert.doesNotMatch(js, /Download the React DevTools|react\.development/);
  assert.match(html, /<title>twillful<\/title>/);
  await access(new URL('..' + jsPath, import.meta.url));
  await access(new URL('..' + cssPath, import.meta.url));
  execFileSync(process.execPath, ['scripts/build.mjs']);
  assert.equal(await readFile(new URL('../index.html', import.meta.url), 'utf8'), html);
  assert.equal(await readFile(new URL('..' + jsPath, import.meta.url), 'utf8'), js);
  assert.equal(await readFile(new URL('..' + cssPath, import.meta.url), 'utf8'), css);
});
test('rendered site supports motion changes, canonical links, and live feedback', async () => {
  const dom = new JSDOM(html, { url: 'https://example.invalid/', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  const listeners = new Set();
  const media = { matches: true, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
  window.matchMedia = () => media;
  window.IntersectionObserver = class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: true }]); } disconnect() {} };
  let animations = 0;
  window.Element.prototype.getAnimations = () => [];
  window.Element.prototype.animate = () => { animations++; return { cancel() {} }; };
  const requests = [];
  window.fetch = async (url, options) => { requests.push({ url, body: JSON.parse(options.body) }); return { ok: true }; };
  window.eval(js);
  try {
    await settle(() => window.document.querySelector('.contact-bubble--reply'));
    const document = window.document;
    assert.equal(animations, 0, 'reduced motion skips Web Animations');
    assert.equal(document.querySelector('#year').textContent, String(new Date().getFullYear()));
    assert.equal(document.querySelectorAll('.trust-logo:not([aria-hidden="true"])').length, 18);
    assert.equal(document.querySelectorAll('#about button').length, 0);
    const links = [...document.querySelectorAll('#about a')].filter(link => link.tabIndex >= 0);
    assert.equal(links.length, 4);
    assert.equal(new Set(links.map(link => link.href)).size, 4);
    assert.ok(links.every(link => !link.closest('[aria-hidden="true"]')));
    assert.equal(document.querySelectorAll('main').length, 1);
    assert.equal(document.querySelector('.skip-link').hash, '#main');
    assert.equal(document.querySelector('[role="status"]').getAttribute('aria-live'), 'polite');
    media.matches = false; listeners.forEach(fn => fn());
    await settle(() => animations === 5);
    media.matches = true; listeners.forEach(fn => fn());
    await settle(() => [...document.querySelectorAll('.hero-card')].every(card => card.style.opacity === '1'));
    const form = document.querySelector('form');
    const submit = () => form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    submit();
    await settle(() => document.querySelector('[role="status"]').textContent.includes('Please add'));
    assert.equal(requests.length, 0);
    for (const [name, value] of Object.entries({ name: 'Test', company: 'Example', phone: '123' })) document.querySelector(`[name="${name}"]`).value = value;
    submit();
    await settle(() => document.querySelector('[role="status"]').textContent.includes('Inquiry sent'));
    assert.equal(requests.length, 1, 'only mocked delivery occurs');
    assert.equal(document.querySelector('[name="name"]').value, '');
    window.fetch = async () => { throw new Error('mock offline'); };
    for (const [name, value] of Object.entries({ name: 'Test', company: 'Example', phone: '123' })) document.querySelector(`[name="${name}"]`).value = value;
    submit();
    await settle(() => document.querySelector('[role="status"]').textContent.includes('Submission failed'));
    assert.equal(document.querySelector('[name="name"]').value, 'Test', 'failure preserves entered values');
  } finally { window.close(); }
});
test('compiled reduced-motion CSS retains visible content and disables motion', () => {
  const ast = postcss.parse(css);
  let reduced;
  ast.walkAtRules('media', rule => { if (rule.params.includes('prefers-reduced-motion')) reduced = rule; });
  assert.ok(reduced);
  const text = reduced.toString();
  assert.match(text, /animation:none!important/);
  assert.match(text, /scroll-behavior:auto/);
  assert.match(text, /opacity:1/);
  assert.match(text, /flex-wrap:wrap/);
  assert.match(text, /aria-hidden=true/);
});

test('logo strip reserves geometry and waits for decoded images, including failed assets', async () => {
  const dom = new JSDOM(html, { url: 'https://example.invalid/', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  const pending = [];
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  window.IntersectionObserver = class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: true }]); } disconnect() {} };
  window.Element.prototype.getAnimations = () => [];
  window.Element.prototype.animate = () => ({ cancel() {} });
  window.HTMLImageElement.prototype.decode = function () {
    return new Promise((resolve, reject) => pending.push({ resolve, reject }));
  };
  window.eval(js);
  try {
    await settle(() => pending.length === 36);
    const track = window.document.querySelector('.trust-track');
    assert.equal(track.dataset.ready, 'false');
    const images = [...track.querySelectorAll('img')];
    assert.ok(images.every(image => image.getAttribute('width') === '500' && image.getAttribute('height') === '500'));
    pending.slice(0, -1).forEach(item => item.resolve());
    await new Promise(resolve => setTimeout(resolve, 20));
    assert.equal(track.dataset.ready, 'false', 'strip must not start before the final image settles');
    pending.at(-1).reject(new Error('mock image unavailable'));
    await settle(() => track.dataset.ready === 'true');
  } finally { window.close(); }
  const ast = postcss.parse(css);
  const declarations = selector => {
    const values = {};
    ast.walkRules(selector, rule => { if (rule.parent.type === 'root') rule.walkDecls(d => { values[d.prop] = d.value; }); });
    return values;
  };
  assert.equal(declarations('.trust-track')['animation-play-state'], 'paused');
  assert.equal(declarations('.trust-track[data-ready=true]')['animation-play-state'], 'running');
  assert.equal(declarations('.trust-logo').width, '3.75rem');
  assert.equal(declarations('.trust-logo-image').width, '3.75rem');
  assert.equal(declarations('.trust-marquee')['mask-image'], undefined);
  assert.equal(declarations('.trust-reveal').filter, undefined);
});
