#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { Command } = require('commander');
const program = new Command();

const dataFile = path.join(os.homedir(), '.smartcd_usage.json');

function loadUsage() {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function saveUsage(usage) {
  fs.writeFileSync(dataFile, JSON.stringify(usage, null, 2), 'utf-8');
}

function updateUsage(dir) {
  const usage = loadUsage();
  usage[dir] = (usage[dir] || 0) + 1;
  saveUsage(usage);
}

function getMostUsedDirs() {
  const usage = loadUsage();
  return Object.entries(usage)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
}

async function main() {
  program
    .name('smartcd')
    .description('Smarter cd replacement with usage learning')
    .argument('[command]', 'Command to run (add or empty)')
    .argument('[dir]', 'Directory to add')
    .option('-v, --verbose', 'Enable verbose output')
    .parse(process.argv);

  const options = program.opts();
  const args = program.args;
  const verbose = options.verbose;

  if (args.length === 0) {
    // Show most used directories
    const dirs = getMostUsedDirs();
    if (dirs.length === 0) {
      console.log(chalk.yellow('No directory usage data found.'));
      process.exit(0);
    }
    const { selectedDir } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedDir',
        message: 'Select a directory to cd into:',
        choices: dirs,
        pageSize: 10,
      },
    ]);
    console.log(selectedDir);
    process.exit(0);
  } else if (args[0] === 'add' && args[1]) {
    // Add a directory to usage
    const dir = path.resolve(args[1]);
    updateUsage(dir);
    if (verbose) {
      console.log(chalk.green(`Added usage for directory: ${dir}`));
    }
    process.exit(0);
  } else {
    console.log(chalk.red('Usage: smartcd [add <dir>] or no args to select directory'));
    process.exit(1);
  }
}

main();
