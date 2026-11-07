'use strict';

// Built-in templates. Each file body supports {{name}}, {{year}} and {{description}} tokens.
const templates = {
  node: {
    description: 'Minimal Node.js package with tests',
    files: {
      'package.json': `{
  "name": "{{name}}",
  "version": "0.1.0",
  "description": "{{description}}",
  "main": "index.js",
  "scripts": { "test": "node --test" },
  "license": "MIT"
}
`,
      'index.js': `'use strict';\n\nmodule.exports = function hello(who = 'world') {\n  return \`hello, \${who}\`;\n};\n`,
      'test/index.test.js': `const test = require('node:test');\nconst assert = require('node:assert');\nconst hello = require('..');\n\ntest('says hello', () => {\n  assert.strictEqual(hello('cat'), 'hello, cat');\n});\n`,
      'README.md': '# {{name}}\n\n{{description}}\n',
      '.gitignore': 'node_modules/\n',
    },
  },
  python: {
    description: 'Python package with pyproject and pytest',
    files: {
      'pyproject.toml': `[project]
name = "{{name}}"
version = "0.1.0"
description = "{{description}}"
requires-python = ">=3.9"
`,
      'src/{{name}}/__init__.py': 'def hello(who: str = "world") -> str:\n    return f"hello, {who}"\n',
      'tests/test_hello.py': 'from {{name}} import hello\n\n\ndef test_hello():\n    assert hello("cat") == "hello, cat"\n',
      'README.md': '# {{name}}\n\n{{description}}\n',
      '.gitignore': '__pycache__/\n.venv/\n*.egg-info/\n',
    },
  },
  web: {
    description: 'Static HTML/CSS/JS starter',
    files: {
      'index.html': `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{name}}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main>
    <h1>{{name}}</h1>
    <p>{{description}}</p>
  </main>
  <script src="main.js"></script>
</body>
</html>
`,
      'style.css': 'body { font-family: system-ui, sans-serif; background: #0b0b0b; color: #f4efe6; display: grid; place-items: center; min-height: 100vh; margin: 0; }\n',
      'main.js': "console.log('{{name}} hatched 🐣');\n",
      'README.md': '# {{name}}\n\n{{description}}\n',
    },
  },
};

module.exports = { templates };
