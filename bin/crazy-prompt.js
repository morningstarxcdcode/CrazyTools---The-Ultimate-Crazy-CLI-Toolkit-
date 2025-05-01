#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import { execSync } from 'child_process';
import { examplePlugin } from '../plugins/examplePlugin.js';
import { timePlugin } from '../plugins/timePlugin.js';
import { nodeVersionPlugin } from '../plugins/nodeVersionPlugin.js';

function getGitBranch() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    return branch ? chalk.green(` ${branch}`) : '';
  } catch {
    return '';
  }
}

function getCrazyIndicator() {
  const emojis = ['🤪', '🦄', '🚀', '🔥', '💥', '🍕', '🍔', '🍣', '🍩', '🍦'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function renderPrompt() {
  const user = chalk.yellowBright.bold(process.env.USER || 'user');
  const cwd = chalk.cyanBright.underline(process.cwd());
  const gitBranch = getGitBranch();
  const crazy = getCrazyIndicator();

  // Load plugins and get their segments
  const plugins = [examplePlugin(), timePlugin(), nodeVersionPlugin()];
  const pluginSegments = plugins.map(p => p.getSegment()).filter(Boolean).join(chalk.magenta(' | '));

  let prompt = `${user} ${cwd}`;
  if (gitBranch) {
    prompt += ` ${gitBranch}`;
  }
  prompt += ` ${crazy}`;
  if (pluginSegments) {
    prompt += ` ${chalk.magenta(' | ')} ${pluginSegments}`;
  }
  prompt += `\n$ `;

  // Animate the prompt text
  const animation = chalkAnimation.rainbow(prompt);
  setTimeout(() => {
    animation.stop();
    process.stdout.write(prompt);
  }, 1500);
}

renderPrompt();
