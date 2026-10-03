import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../contact-relay/worker.js', import.meta.url), 'utf8');
const worker = (await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)).default;
const valid = { name: 'Test Name', company: 'Example', phone: '+1 (555) 010-1234' };
const env = { DISCORD_WEBHOOK_URL: 'https://example.invalid/mock-only' };
const origin = 'https://twillful.ooo';
function request(body, options = {}) {
  const headers = { 'Content-Type': 'application/json', Origin: origin, ...options.headers };
  if (headers.Origin === null) delete headers.Origin;
  const method = options.method || 'POST';
  return new Request(`https://example.invalid${options.path || '/contact'}`, {
    method, headers, ...(!['GET', 'OPTIONS'].includes(method) ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {})
  });
}
// Every outbound request is intercepted; these tests cannot submit to Discord.
test('relay validation and origin policy', async t => {
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => { calls.push(JSON.parse(options.body)); return new Response(null, { status: 204 }); };
  try {
    for (const allowed of [origin, 'https://www.twillful.ooo']) {
      await t.test(`accepts ${allowed}`, async () => {
        const response = await worker.fetch(request(valid, { headers: { Origin: allowed } }), env);
        assert.equal(response.status, 200);
        assert.equal(response.headers.get('Access-Control-Allow-Origin'), allowed);
        assert.equal(response.headers.get('Vary'), 'Origin');
        assert.deepEqual(calls.at(-1).allowed_mentions, { parse: [] });
      });
    }
    for (const [label, payload, status, options = {}] of [
      ['malformed JSON', '{', 400], ['null', 'null', 400], ['array', [], 400],
      ['string', '"hello"', 400], ['missing fields', {}, 400],
      ['whitespace', { ...valid, name: ' \n ' }, 400],
      ['object field', { ...valid, company: {} }, 400],
      ['numeric phone', { ...valid, phone: 123 }, 400],
      ['null optional field', { ...valid, website: null }, 400],
      ['control character', { ...valid, name: 'Test\u0000' }, 400],
      ...Object.entries({ name: 100, company: 160, website: 500, phone: 50 }).map(([key, max]) => [`oversized ${key}`, { ...valid, [key]: 'x'.repeat(max + 1) }, 400]),
      ['oversized body', JSON.stringify({ ...valid, extra: 'x'.repeat(8192) }), 413],
      ['unicode oversized body', JSON.stringify({ ...valid, extra: '🙂'.repeat(2100) }), 413],
      ['wrong content type', valid, 415, { headers: { 'Content-Type': 'text/plain' } }],
      ['foreign origin', valid, 403, { headers: { Origin: 'https://example.invalid' } }],
      ['missing origin', valid, 403, { headers: { Origin: null } }],
      ['lookalike origin', valid, 403, { headers: { Origin: origin + '.evil.test' } }],
      ['foreign preflight', valid, 403, { method: 'OPTIONS', headers: { Origin: 'https://example.invalid' } }],
      ['wrong path', valid, 404, { path: '/other' }], ['wrong method', valid, 405, { method: 'GET' }]
    ]) {
      await t.test(label, async () => {
        const before = calls.length;
        const response = await worker.fetch(request(payload, options), env);
        assert.equal(response.status, status);
        assert.equal(calls.length, before, 'invalid input must never be forwarded');
        if (status === 403) assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
      });
    }
    await t.test('allowed preflight never forwards', async () => {
      const before = calls.length;
      assert.equal((await worker.fetch(request(valid, { method: 'OPTIONS' }), env)).status, 204);
      assert.equal(calls.length, before);
    });
    await t.test('configured allowlist replaces defaults', async () => {
      const custom = { ...env, ALLOWED_ORIGINS: ' https://custom.example, ' };
      assert.equal((await worker.fetch(request(valid), custom)).status, 403);
      assert.equal((await worker.fetch(request(valid, { headers: { Origin: 'https://custom.example' } }), custom)).status, 200);
    });
    await t.test('maximum fields and newline sanitation fit the outbound message', async () => {
      const maximum = { name: 'x'.repeat(100), company: 'x'.repeat(160), website: 'x'.repeat(500), phone: 'x'.repeat(50) };
      assert.equal((await worker.fetch(request(maximum), env)).status, 200);
      assert.ok(calls.at(-1).content.length < 2000);
      await worker.fetch(request({ ...valid, name: 'Test\r\nName' }), env);
      assert.match(calls.at(-1).content, /Name: Test Name\n/);
    });
    await t.test('streaming byte limit ignores misleading Content-Length', async () => {
      const response = await worker.fetch(request(JSON.stringify({ ...valid, extra: 'x'.repeat(8192) }), { headers: { 'Content-Length': '1' } }), env);
      assert.equal(response.status, 413);
    });
    await t.test('upstream failure is controlled', async () => {
      globalThis.fetch = async () => { throw new Error('mock network failure'); };
      assert.equal((await worker.fetch(request(valid), env)).status, 502);
      globalThis.fetch = async () => new Response(null, { status: 429 });
      assert.equal((await worker.fetch(request(valid), env)).status, 502);
    });
  } finally { globalThis.fetch = originalFetch; }
});
