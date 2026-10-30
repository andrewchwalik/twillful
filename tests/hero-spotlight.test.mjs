import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const jsPath = html.match(/src="(\/assets\/build\/[^" ]+\.js)"/)[1];
const js = await readFile(new URL('..' + jsPath, import.meta.url), 'utf8');
async function settle(check) {
  for (let i = 0; i < 80; i++) {
    if (check()) return;
    await new Promise(resolve => setTimeout(resolve, 5));
  }
  assert.ok(check(), 'spotlight did not settle');
}

test('hero spotlight waits for all cards, cycles for two seconds, and yields to hover', async () => {
  const dom = new JSDOM(html, { url: 'https://example.invalid/', runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  const mediaListeners = new Set();
  const media = { matches: false, addEventListener: (_, fn) => mediaListeners.add(fn), removeEventListener: (_, fn) => mediaListeners.delete(fn) };
  window.matchMedia = () => media;
  window.IntersectionObserver = class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: true }]); } disconnect() {} };
  window.HTMLImageElement.prototype.decode = () => Promise.resolve();
  const animations = [];
  window.Element.prototype.animate = () => {
    const animation = { cancel() {}, onfinish: null };
    animations.push(animation);
    return animation;
  };
  const timers = new Map();
  const nativeTimeout = window.setTimeout.bind(window);
  const nativeClear = window.clearTimeout.bind(window);
  let timerId = 100000;
  window.setTimeout = (callback, delay, ...args) => {
    if (![2000, 300].includes(delay)) return nativeTimeout(callback, delay, ...args);
    timers.set(++timerId, { callback, delay });
    return timerId;
  };
  window.clearTimeout = id => { if (!timers.delete(id)) nativeClear(id); };
  const highlighted = () => [...window.document.querySelectorAll('.hero-card[data-highlighted="true"]')];
  const activeKey = () => highlighted()[0]?.dataset.cardKey;
  const fire = delay => {
    assert.equal(timers.size, 1, 'only one spotlight timer may run');
    const [id, timer] = [...timers][0];
    assert.equal(timer.delay, delay);
    timers.delete(id);
    timer.callback();
  };
  const point = (element, type, relatedTarget = null) => {
    const event = new window.MouseEvent(type, { bubbles: true, relatedTarget });
    Object.defineProperty(event, 'pointerType', { value: 'mouse' });
    element.dispatchEvent(event);
  };
  window.eval(js);
  try {
    await settle(() => animations.length === 5);
    assert.equal(highlighted().length, 0);
    assert.equal(timers.size, 0, 'no cycle may start during the entrance');
    animations.slice(0, 4).forEach(animation => animation.onfinish());
    await new Promise(resolve => setTimeout(resolve, 15));
    assert.equal(highlighted().length, 0, 'wait for the last card too');
    animations[4].onfinish();
    await settle(() => activeKey() === 'a' && timers.size === 1);
    const seen = [];
    for (let i = 0; i < 6; i++) {
      assert.equal(highlighted().length, 1);
      seen.push(activeKey());
      fire(2000);
      await settle(() => highlighted().length === 0 && timers.size === 1);
      fire(300);
      await settle(() => highlighted().length === 1 && timers.size === 1);
    }
    assert.deepEqual(seen, ['a', 'b', 'c', 'd', 'lead', 'a']);
    const lead = window.document.querySelector('[data-card-key="lead"]');
    point(lead, 'pointerover');
    await settle(() => activeKey() === 'lead' && timers.size === 0);
    assert.equal(highlighted().length, 1, 'manual hover must lower the automatic card');
    const sweaty = window.document.querySelector('[data-card-key="c"]');
    point(lead, 'pointerout', sweaty);
    point(sweaty, 'pointerover', lead);
    await settle(() => activeKey() === 'c' && timers.size === 0);
    assert.equal(highlighted().length, 1, 'moving between cards must not show two highlights');
    point(sweaty, 'pointerout', window.document.body);
    await settle(() => highlighted().length === 0 && timers.size === 1);
    fire(300);
    await settle(() => activeKey() === 'd');
    Object.defineProperty(window.document, 'visibilityState', { configurable: true, value: 'hidden' });
    window.document.dispatchEvent(new window.Event('visibilitychange'));
    await settle(() => highlighted().length === 0 && timers.size === 0);
    Object.defineProperty(window.document, 'visibilityState', { configurable: true, value: 'visible' });
    window.document.dispatchEvent(new window.Event('visibilitychange'));
    await settle(() => activeKey() === 'd' && timers.size === 1);
    media.matches = true;
    mediaListeners.forEach(listener => listener());
    await settle(() => highlighted().length === 0 && timers.size === 0);
    point(lead, 'pointerover');
    await settle(() => activeKey() === 'lead');
    assert.equal(timers.size, 0, 'reduced motion keeps manual labels but disables automatic cycling');
    point(lead, 'pointerout', window.document.body);
    await settle(() => highlighted().length === 0);
    lead.focus();
    await settle(() => activeKey() === 'lead');
    lead.blur();
    await settle(() => highlighted().length === 0);
  } finally { window.close(); }
});
