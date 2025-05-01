#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const cliHighlight = require('cli-highlight').highlight;
const simpleGit = require('simple-git');
const { Command } = require('commander');
const program = new Command();
const os = require('os');

function loadConfig() {
  const configPath = path.join(os.homedir(), '.highlightcatconfig.json');
  try {
    const data = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function main() {
  program
    .name('highlightcat')
    .description('Cat clone with syntax highlighting and Git integration')
    .argument('<file>', 'File to display')
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

  const filePath = args[0];
  const verbose = options.verbose;

  try {
    if (verbose) {
      console.log(chalk.blue(`Reading file: ${filePath}`));
    }
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const ext = path.extname(filePath).slice(1);
    const highlighted = cliHighlight(content, { language: ext, ignoreIllegals: true });
    console.log(highlighted);

    // Show Git diff indicators if file is in a git repo
    const git = simpleGit(path.dirname(filePath));
    const status = await git.status();
    const changedFiles = status.modified.concat(status.created).concat(status.deleted);
    if (changedFiles.includes(path.basename(filePath))) {
      console.log(chalk.yellow('\nFile has uncommitted changes.'));
    }
  } catch (err) {
    console.error(chalk.red(`Error reading file: ${err.message}`));
    process.exit(1);
  }
}

main();
