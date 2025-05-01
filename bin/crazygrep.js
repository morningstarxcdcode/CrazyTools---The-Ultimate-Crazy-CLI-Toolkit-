#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Fuse = require('fuse.js');
const globby = require('globby');
const { Command } = require('commander');
const program = new Command();
const os = require('os');

function loadConfig() {
  const configPath = path.join(os.homedir(), '.crazygrepconfig.json');
  try {
    const data = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function readFileLines(filePath) {
  return fs.promises.readFile(filePath, 'utf-8').then(data => data.split('\\n'));
}

async function searchInFile(filePath, pattern) {
  const lines = await readFileLines(filePath);
  const fuse = new Fuse(lines, { includeScore: true, threshold: 0.4 });
  const results = fuse.search(pattern);
  return results.map(r => ({ lineNumber: r.refIndex + 1, line: lines[r.refIndex], score: r.score }));
}

async function main() {
  program
    .name('crazygrep')
    .description('Fast recursive grep with fuzzy matching and colorized output')
    .argument('<pattern>', 'Search pattern')
    .argument('[path]', 'Path to search', '.')
    .option('-v, --verbose', 'Enable verbose output')
    .option('-c, --config <path>', 'Path to config file')
    .parse(process.argv);

  const options = program.opts();
  const args = program.args;

  let config = {};
  if (options.config) {
    try {
      const data = fs.readFileSync(options.config, 'utf-8');
      config = JSON.parse(data);
    } catch (err) {
      console.error(chalk.red(`Failed to load config file: ${err.message}`));
      process.exit(1);
    }
  } else {
    config = loadConfig();
  }

  const pattern = args[0];
  const searchPath = args[1] || '.';
  const verbose = options.verbose;

  if (verbose) {
    console.log(chalk.blue(`Searching for pattern "${pattern}" in path "${searchPath}"`));
  }

  const files = await globby(['**/*.*'], { cwd: searchPath, gitignore: true, dot: false });
  for (const file of files) {
    try {
      const fullPath = path.join(searchPath, file);
      const matches = await searchInFile(fullPath, pattern);
      if (matches.length > 0) {
        console.log(chalk.green(`\nFile: ${fullPath}`));
        matches.forEach(m => {
          const lineNumStr = chalk.yellow(m.lineNumber.toString().padStart(4));
          const highlightedLine = m.line.replace(new RegExp(pattern, 'gi'), match => chalk.bgYellow.black(match));
          console.log(`${lineNumStr}: ${highlightedLine}`);
        });
      }
    } catch (err) {
      if (verbose) {
        console.error(chalk.red(`Error reading file ${file}: ${err.message}`));
      }
    }
  }
}

main();
