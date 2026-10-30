import test from 'node:test';
import assert from 'node:assert/strict';
import { siteProjects, includeAllProjects } from '../src/projects.js';

test('portfolio rows include newly registered projects without changing their existing layout', () => {
  const existing = { ...siteProjects.bluebird, offset: 15, delay: '0.4s' };
  const placeholder = { label: 'Studio', background: '#95b475', offset: 8, delay: '0.8s' };
  const future = { label: 'Future client', company: 'Future Client', url: 'https://example.invalid/', image: 'future.webp' };
  const catalog = [...Object.values(siteProjects), future];
  const original = [existing, placeholder];
  const result = includeAllProjects(original, catalog);
  assert.deepEqual(original, [existing, placeholder], 'input layout is not mutated');
  assert.equal(result[0], existing);
  assert.equal(result[1], placeholder);
  for (const project of catalog) {
    const matches = result.filter(card => card.url === project.url);
    assert.equal(matches.length, 1, `${project.company} must appear exactly once per sequence`);
    assert.equal(matches[0].image, project.image);
    assert.equal(typeof matches[0].offset, 'number');
    assert.match(matches[0].delay, /^\d+(\.\d+)?s$/);
  }
  assert.deepEqual(includeAllProjects(result, catalog), result, 'filling a complete row does not add duplicates');
});
