import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.webp': 'image/webp', '.woff2': 'font/woff2', '.png': 'image/png' };
const server = createServer(async (request, response) => {
  const file = path.resolve(root, '.' + new URL(request.url, 'http://localhost').pathname.replace(/\/$/, '/index.html'));
  if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  try { response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream'); response.end(await readFile(file)); }
  catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*.workers.dev/**', route => route.abort());
  await page.goto(base);
  await page.waitForSelector('.saas-hero-shell.is-ready');
  await page.evaluate(() => {
    window.heroAnimations = [...document.querySelectorAll('.hero-card')].map(card => card.getAnimations()[0]);
    window.heroAnimations.forEach(animation => animation?.pause());
  });
  await mkdir('/tmp/twillful-checks', { recursive: true });
  for (const time of [0, 350, 700, 1100, 1600, 2199]) {
    await page.evaluate(time => window.heroAnimations.forEach(animation => { if (animation) animation.currentTime = time; }), time);
    await page.screenshot({ path: `/tmp/twillful-checks/entrance-${time}.png` });
  }
  await page.evaluate(() => window.heroAnimations.forEach(animation => animation?.finish()));
  await page.waitForTimeout(150);
  assert.equal(await page.locator('.contact-bubble--incoming').count(), 0, 'contact chat should not start at page load');
  for (const width of [320, 360, 390, 430, 480, 540, 620, 639, 640, 768, 900, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.waitForTimeout(80);
    const fan = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.hero-card')].map(card => card.getBoundingClientRect());
      return { count: cards.length, left: Math.min(...cards.map(card => card.left)), right: Math.max(...cards.map(card => card.right)),
        top: Math.min(...cards.map(card => card.top)), bottom: Math.max(...cards.map(card => card.bottom)),
        heading: document.querySelector('h1').getBoundingClientRect().bottom,
        description: document.querySelector('.hero-subcopy').getBoundingClientRect().top };
    });
    assert.equal(fan.count, 5);
    assert.ok(fan.left >= 8 && fan.right <= width - 8, `header cards leave the screen at ${width}px: ${JSON.stringify(fan)}`);
    assert.ok(Math.abs((fan.left + fan.right) / 2 - width / 2) < 8, `header fan is not centered at ${width}px`);
    assert.ok(fan.top > fan.heading + 12, `header cards overlap the title at ${width}px`);
    assert.ok(fan.bottom + 4 < fan.description, `header cards overlap the description at ${width}px`);
    await page.screenshot({ path: `/tmp/twillful-checks/header-${width}.png` });
    console.log(`All five header cards fit and stay centered at ${width}px.`);
  }
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  mobile.on('pageerror', error => errors.push(error.message));
  await mobile.goto(base);
  await mobile.waitForSelector('.saas-hero-shell.is-ready');
  await mobile.evaluate(() => {
    window.heroAnimations = [...document.querySelectorAll('.hero-card')].map(card => card.getAnimations()[0]);
    window.heroAnimations.forEach(animation => animation?.pause());
  });
  for (const time of [0, 350, 700, 1100, 1600, 2199]) {
    await mobile.evaluate(time => window.heroAnimations.forEach(animation => { if (animation) animation.currentTime = time; }), time);
    await mobile.waitForTimeout(20);
    const bounds = await mobile.evaluate(() => [...document.querySelectorAll('.hero-card')].map(card => {
      const rect = card.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top };
    }));
    assert.ok(bounds.every(rect => rect.left >= 8 && rect.right <= 382), `mobile entrance leaves the screen at ${time}ms`);
    if (time === 0) assert.ok(bounds.every(rect => rect.top > 844), 'mobile cards must still begin below the fold');
  }
  await mobile.evaluate(() => window.heroAnimations.forEach(animation => animation?.finish()));
  await mobile.waitForTimeout(2800);
  await mobile.screenshot({ path: '/tmp/twillful-checks/mobile-header-final.png' });
  await mobile.setViewportSize({ width: 844, height: 390 });
  await mobile.waitForTimeout(100);
  assert.ok(await mobile.evaluate(() => [...document.querySelectorAll('.hero-card')].every(card => {
    const rect = card.getBoundingClientRect();
    return rect.left >= 8 && rect.right <= innerWidth - 8;
  })), 'cards must stay together when the phone rotates');
  await mobile.emulateMedia({ reducedMotion: 'reduce' });
  await mobile.setViewportSize({ width: 320, height: 740 });
  await mobile.waitForTimeout(100);
  assert.ok(await mobile.evaluate(() => [...document.querySelectorAll('.hero-card')].every(card => {
    const rect = card.getBoundingClientRect();
    return rect.left >= 8 && rect.right <= innerWidth - 8;
  })), 'reduced-motion cards must also fit the mobile viewport');
  await mobile.close();
  console.log('Mobile entrance, phone rotation, and reduced-motion fan verified.');
  for (const width of [390, 1440, 2560, 5120, 7680]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.mouse.move(0, 0);
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    for (const phase of [0, 0.25, 0.5, 0.9999, 1.0001, 7.75]) {
      const rows = await page.evaluate(phase => [...document.querySelectorAll('.gallery-track')].map(track => {
        const animation = track.getAnimations().find(item => item.animationName?.startsWith('gallery-scroll'));
        animation.pause();
        animation.currentTime = animation.effect.getTiming().duration * phase;
        return animation;
      }).length, phase);
      assert.equal(rows, 2);
      await page.waitForTimeout(25);
      const coverage = await page.evaluate(() => [...document.querySelectorAll('.gallery-track')].map(track => {
        const cards = [...track.querySelectorAll('.gallery-mini-card')].map(card => card.getBoundingClientRect())
          .filter(rect => rect.right >= 0 && rect.left <= innerWidth).sort((a, b) => a.left - b.left);
        return { first: cards[0]?.left, last: cards.at(-1)?.right, gap: Math.max(0, ...cards.slice(1).map((card, i) => card.left - cards[i].right)) };
      }));
      for (const row of coverage) {
        assert.ok(row.first <= 20, `empty left edge: ${width}px phase ${phase}: ${JSON.stringify(row)}`);
        assert.ok(row.last >= width - 20, `empty right edge: ${width}px phase ${phase}: ${JSON.stringify(row)}`);
        assert.ok(row.gap < 22, `gap within row: ${width}px phase ${phase}`);
      }
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `horizontal overflow at ${width}px`);
    await page.screenshot({ path: `/tmp/twillful-checks/portfolio-${width}.png` });
    console.log(`Continuous rows verified at ${width}px, including loop boundaries and 7+ cycles.`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelectorAll('.gallery-track').forEach(track => track.getAnimations().forEach(animation => { animation.currentTime = 0; animation.play(); })));
  await page.mouse.move(600, 100);
  const target = page.locator('.gallery-wave').first().locator('.gallery-mini-card').filter({ has: page.locator('img') }).nth(5);
  await page.locator('.gallery-wave').first().scrollIntoViewIfNeeded();
  const point = await target.evaluate(element => {
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });
  await page.mouse.move(point.x, point.y);
  await page.waitForTimeout(350);
  assert.equal(await page.locator('.gallery-track').first().getAttribute('data-paused'), 'true');
  const pill = await target.locator('.gallery-hover-pill').evaluate(element => ({ opacity: getComputedStyle(element).opacity, height: element.getBoundingClientRect().height }));
  assert.equal(pill.opacity, '1');
  assert.ok(pill.height > 30);
  await page.screenshot({ path: '/tmp/twillful-checks/portfolio-hover.png' });
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  await page.waitForTimeout(50);
  assert.equal(await page.locator('.gallery-track').first().getAttribute('data-paused'), 'false', 'tab changes must clear stale pauses');
  await page.mouse.move(0, 0);
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.trust-track').dataset.ready === 'true');
  const logos = page.locator('.trust-marquee');
  const logoBounds = await logos.boundingBox();
  await page.mouse.move(logoBounds.x + logoBounds.width / 2, logoBounds.y + logoBounds.height / 2);
  assert.equal(await page.locator('.trust-track').evaluate(track => getComputedStyle(track).animationPlayState), 'paused');
  await page.mouse.click(logoBounds.x + logoBounds.width / 2, logoBounds.y + logoBounds.height / 2);
  await page.mouse.move(0, 0);
  assert.equal(await page.locator('.trust-track').evaluate(track => getComputedStyle(track).animationPlayState), 'running', 'pointer focus must not leave the client logos permanently paused');
  const beforeResume = await page.locator('.trust-track').evaluate(track => track.getBoundingClientRect().x);
  await page.waitForTimeout(200);
  const afterResume = await page.locator('.trust-track').evaluate(track => track.getBoundingClientRect().x);
  assert.ok(Math.abs(beforeResume - afterResume) > 1, 'logos must actually move after pointer leaves');
  assert.equal(await page.locator('footer a[href="/zaptap/"]').count(), 0);
  const broken = await page.evaluate(() => [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.src));
  assert.deepEqual(broken, []);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  const motion = await page.evaluate(() => document.querySelector('.gallery-track').getAnimations().length);
  assert.equal(motion, 0, 'reduced-motion preference disables marquee animation');
  assert.deepEqual(errors, []);
  console.log('Hero timeline, hover labels, tab resume, lazy logos, reduced motion, and image loading verified.');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
