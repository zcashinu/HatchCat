#!/usr/bin/env node
'use strict';

const { hatch, listTemplates } = require('../src');
const pkg = require('../package.json');

const HELP = `
  🐣 hatchcat v${pkg.version}

  Usage
    hatchcat <name> [options]
    hatchcat list

  Options
    -t, --template <id>     Template to use (default: node)
    -d, --description <txt> Project description
    -f, --force             Write into a non-empty directory
        --dry-run           Show files without writing them
    -h, --help              Show this help
    -v, --version           Show version

  Examples
    hatchcat my-api
    hatchcat site -t web -d "My landing page"
`;

function parseArgs(argv) {
  const opts = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '-t': case '--template': opts.template = argv[++i]; break;
      case '-d': case '--description': opts.description = argv[++i]; break;
      case '-f': case '--force': opts.force = true; break;
      case '--dry-run': opts.dryRun = true; break;
      case '-h': case '--help': opts.help = true; break;
      case '-v': case '--version': opts.version = true; break;
      default: opts._.push(a);
    }
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.version) return console.log(pkg.version);
  if (opts.help || opts._.length === 0) return console.log(HELP);

  if (opts._[0] === 'list') {
    console.log('\nAvailable templates:\n');
    for (const t of listTemplates()) console.log(`  ${t.id.padEnd(8)} ${t.description}`);
    return console.log();
  }

  try {
    const { dir, files } = hatch({ name: opts._[0], ...opts });
    console.log(`\n🐣 ${opts.dryRun ? 'Would hatch' : 'Hatched'} ${dir}\n`);
    for (const f of files) console.log(`  + ${f}`);
    console.log('\nDone.\n');
  } catch (err) {
    console.error(`\n✖ ${err.message}\n`);
    process.exitCode = 1;
  }
}

main();
