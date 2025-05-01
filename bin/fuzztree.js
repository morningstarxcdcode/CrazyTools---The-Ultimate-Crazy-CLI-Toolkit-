#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const globby = require('globby');
const Fuse = require('fuse.js');
const chalk = require('chalk');
const { Command } = require('commander');
const program = new Command();
const os = require('os');

function loadConfig() {
  const configPath = path.join(os.homedir(), '.fuzztreeconfig.json');
  try {
    const data = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function listFiles(searchPath) {
  return globby(['**/*'], { cwd: searchPath, dot: true, gitignore: true });
}

async function previewFile(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const lines = content.split('\\n').slice(0, 20);
    return lines.join('\\n');
  } catch {
    return chalk.red('Unable to preview file.');
  }
}

async function main() {
  program
    .name('fuzztree')
    .description('Interactive fuzzy finder for files and directories with previews')
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

  const searchPath = args[0] || '.';
  const verbose = options.verbose;

  if (verbose) {
    console.log(chalk.blue(`Searching files in path "${searchPath}"`));
  }

  const files = await listFiles(searchPath);
  const fuse = new Fuse(files, { threshold: 0.3 });

  let filteredFiles = files;

  while (true) {
    const { query } = await inquirer.prompt([
      {
        type: 'input',
        name: 'query',
        message: 'Search files (empty to exit):',
      },
    ]);

    if (!query) {
      console.log('Exiting fuzztree.');
      break;
    }

    filteredFiles = fuse.search(query).map(r => r.item);

    if (filteredFiles.length === 0) {
      console.log(chalk.red('No matches found.'));
      continue;
    }

    const { selectedFile } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedFile',
        message: 'Select a file:',
        choices: filteredFiles,
        pageSize: 10,
      },
    ]);

    const fullPath = path.join(searchPath, selectedFile);
    const preview = await previewFile(fullPath);
    console.log(chalk.blue('\n--- File Preview ---'));
    console.log(preview);
    console.log(chalk.blue('--------------------\n'));
  }
}

main();
