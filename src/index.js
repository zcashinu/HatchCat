'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { templates } = require('./templates');

const NAME_RE = /^[a-z0-9][a-z0-9-_]*$/i;

function render(text, vars) {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match
  );
}

function listTemplates() {
  return Object.entries(templates).map(([id, t]) => ({ id, description: t.description }));
}

/**
 * Plan the files a template would produce, without touching disk.
 * @returns {{ path: string, content: string }[]}
 */
function plan({ name, template = 'node', description = '' }) {
  if (!name || !NAME_RE.test(name)) {
    throw new Error(`Invalid project name "${name}". Use letters, numbers, - or _.`);
  }
  const tpl = templates[template];
  if (!tpl) {
    const known = Object.keys(templates).join(', ');
    throw new Error(`Unknown template "${template}". Available: ${known}`);
  }
  const vars = { name, description: description || `${name}, hatched with HatchCat.`, year: new Date().getFullYear() };
  return Object.entries(tpl.files).map(([file, body]) => ({
    path: render(file, vars),
    content: render(body, vars),
  }));
}

/**
 * Write a new project to `<cwd>/<name>`.
 * @returns {{ dir: string, files: string[] }}
 */
function hatch({ name, template, description, cwd = process.cwd(), force = false, dryRun = false }) {
  const files = plan({ name, template, description });
  const dir = path.resolve(cwd, name);

  if (fs.existsSync(dir) && fs.readdirSync(dir).length > 0 && !force) {
    throw new Error(`Directory "${dir}" is not empty. Use --force to write anyway.`);
  }

  if (!dryRun) {
    for (const f of files) {
      const target = path.join(dir, f.path);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, f.content);
    }
  }
  return { dir, files: files.map((f) => f.path) };
}

module.exports = { hatch, plan, render, listTemplates };
