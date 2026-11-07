'use strict';

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { hatch, plan, render, listTemplates } = require('../src');

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'hatchcat-'));

test('render replaces known tokens and keeps unknown ones', () => {
  assert.strictEqual(render('{{a}}-{{b}}', { a: 1 }), '1-{{b}}');
});

test('lists built-in templates', () => {
  const ids = listTemplates().map((t) => t.id);
  assert.deepStrictEqual(ids.sort(), ['node', 'python', 'web']);
});

test('plan renders file paths', () => {
  const files = plan({ name: 'kitty', template: 'python' });
  assert.ok(files.some((f) => f.path === 'src/kitty/__init__.py'));
});

test('rejects bad names and unknown templates', () => {
  assert.throws(() => plan({ name: '../evil' }), /Invalid project name/);
  assert.throws(() => plan({ name: 'ok', template: 'nope' }), /Unknown template/);
});

test('hatch writes files to disk', () => {
  const cwd = tmp();
  const { dir } = hatch({ name: 'demo', template: 'node', cwd });
  const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
  assert.strictEqual(pkg.name, 'demo');
});

test('dry run writes nothing', () => {
  const cwd = tmp();
  hatch({ name: 'ghost', cwd, dryRun: true });
  assert.strictEqual(fs.existsSync(path.join(cwd, 'ghost')), false);
});

test('refuses non-empty directory without force', () => {
  const cwd = tmp();
  fs.mkdirSync(path.join(cwd, 'taken'));
  fs.writeFileSync(path.join(cwd, 'taken', 'x'), '');
  assert.throws(() => hatch({ name: 'taken', cwd }), /not empty/);
  assert.doesNotThrow(() => hatch({ name: 'taken', cwd, force: true }));
});
