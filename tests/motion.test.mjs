import test from 'node:test';
import assert from 'node:assert/strict';
import { entranceFrames, finalCardTransform } from '../src/motion.js';
import { readFile } from 'node:fs/promises';

test('entrance shares one rising stack, has no stop-and-go offsets, and lands exactly', () => {
  const left = { x: -286, y: 24, rotate: -11 };
  const right = { x: 242, y: 22, rotate: 6 };
  const a = entranceFrames(left, 900);
  const b = entranceFrames(right, 900);
  assert.equal(a.length, 181);
  for (let i = 0; i <= 50; i++) assert.equal(a[i].transform, b[i].transform, 'stack must stay hidden behind lead until the fan opens');
  assert.equal(a.at(-1).transform, finalCardTransform(left));
  assert.equal(b.at(-1).transform, finalCardTransform(right));
  assert.ok(a.every((frame, i) => frame.offset === i / 180 && !frame.easing));
  const x = a.map(frame => Number(frame.transform.match(/translate3d\(([-.\d]+)/)[1]));
  for (let i = 52; i < 179; i++) assert.ok(x[i + 1] < x[i], 'fan moves continuously, without intermediate stops or reversals');
});

test('generated page includes real content and early responsive image discovery', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /Let(?:'|&#x27;)s make your website/);
  assert.match(html, /rel="preload" as="image"/);
  assert.match(html, /srcSet="[^"]+160w/);
  assert.match(html, /loading="lazy"/);
  assert.doesNotMatch(html, /the-wash-company\.jpg/);
  assert.match(html, /https:\/\/andrewchwalik\.github\.io\/adamh-header-prototype\//);
  assert.match(html, /https:\/\/andrewchwalik\.com\//);
});

test('all portfolio and logo images have lightweight generated versions', async () => {
  const manifest = JSON.parse(await readFile(new URL('../src/images.json', import.meta.url), 'utf8'));
  for (const [source, versions] of Object.entries(manifest)) {
    for (const version of versions) {
      const bytes = await readFile(new URL('..' + version.src, import.meta.url));
      assert.ok(bytes.length < 60000, `${source} derivative exceeds the image budget`);
    }
  }
});
