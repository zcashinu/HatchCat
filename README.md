<p align="center">
  <img src="assets/logo.png" alt="HatchCat logo" width="160" />
</p>

<h1 align="center">HatchCat</h1>

<p align="center">
  Hatch new projects from tiny templates. One command, zero dependencies.
</p>

---

## What it does

HatchCat is a small command-line tool that sets up a ready-to-run project folder. Pick a template, give it a name, and it writes the files for you: package config, a starter module, a passing test and a README.

```
$ hatchcat my-api

🐣 Hatched /home/you/my-api

  + package.json
  + index.js
  + test/index.test.js
  + README.md
  + .gitignore

Done.
```

## Install

Requires Node.js 18 or newer.

```bash
git clone https://github.com/zcashinu/HatchCat.git
cd HatchCat
npm link
```

Or run it without installing:

```bash
node bin/hatchcat.js my-project
```

## Usage

| Option | Description |
| --- | --- |
| `-t, --template <id>` | Template to use (default: `node`) |
| `-d, --description <text>` | Project description |
| `-f, --force` | Write into a non-empty directory |
| `--dry-run` | Show files without writing them |
| `-h, --help` | Show help |

## Templates

| ID | What you get |
| --- | --- |
| `node` | Node.js package with tests |
| `python` | `pyproject.toml`, `src/` layout, pytest test |
| `web` | Static HTML / CSS / JS starter |

## Development

```bash
npm test
```

## License

MIT
