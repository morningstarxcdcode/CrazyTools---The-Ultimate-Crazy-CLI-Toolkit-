# CrazyTools - The Ultimate Crazy CLI Toolkit 🎉🚀

CrazyTools is a collection of wildly creative, colorful, and powerful command-line tools designed to supercharge your terminal experience. Combining advanced features with fun animations, vibrant colors, and intuitive interfaces, CrazyTools makes your daily CLI tasks exciting and productive.

Inspired by popular tools like ripgrep, fzf, bat, and zoxide, CrazyTools adds a crazy twist with unique plugins, animated prompts, and interactive utilities that developers will love.

## Tools

### crazygrep
A fast recursive grep tool with fuzzy matching, colorized output, and context previews.

### fuzztree
An interactive fuzzy finder for files and directories with file previews and custom actions.

### highlightcat
A cat clone with syntax highlighting and Git integration.

### smartcd
A smarter `cd` replacement that learns your directory usage and offers simple commands.

### crazy-prompt
A colorful, animated, and fun shell prompt renderer with plugin support. Displays user, current directory, git branch, fun emojis, and plugin segments like time and Node.js version.

## Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd crazytools
npm install
```

## Usage

Each tool can be run using `node` or linked globally via npm.

### crazy-prompt

Run the animated prompt renderer:

```bash
node bin/crazy-prompt.js
```

### Shell Completions

To enable shell completions for bash, source the completion scripts in your shell:

```bash
source ./completions/bash/crazygrep.sh
source ./completions/bash/fuzztree.sh
source ./completions/bash/highlightcat.sh
source ./completions/bash/smartcd.sh
```

You can add these lines to your `~/.bashrc` or `~/.bash_profile` to enable completions automatically.

To enable shell completions for zsh, source the completion scripts in your shell:

```zsh
source ./completions/zsh/_crazygrep
source ./completions/zsh/_fuzztree
source ./completions/zsh/_highlightcat
source ./completions/zsh/_smartcd
```

You can add these lines to your `~/.zshrc` to enable completions automatically.

source ./completions/zsh/_smartcd
source ./completions/bash/smartcd.sh
node bin/crazy-prompt.js
npm install

## Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd crazytools
npm install
```

## Usage

Each tool can be run using `node` or linked globally via npm.

### crazygrep

```bash
node bin/crazygrep.js [pattern] [path]
```

### Shell Completions

To enable shell completions for bash, source the completion scripts in your shell:

```bash
source ./completions/bash/crazygrep.sh
source ./completions/bash/fuzztree.sh
source ./completions/bash/highlightcat.sh
source ./completions/bash/smartcd.sh
```

You can add these lines to your `~/.bashrc` or `~/.bash_profile` to enable completions automatically.

To enable shell completions for zsh, source the completion scripts in your shell:

```zsh
source ./completions/zsh/_crazygrep
source ./completions/zsh/_fuzztree
source ./completions/zsh/_highlightcat
source ./completions/zsh/_smartcd
```

You can add these lines to your `~/.zshrc` to enable completions automatically.
source ./completions/zsh/_smartcd
source ./completions/bash/smartcd.sh

source ./completions/bash/smartcd.sh
node bin/crazygrep.js [pattern] [path]

### fuzztree

```bash
node bin/fuzztree.js [path]
```

### highlightcat

```bash
node bin/highlightcat.js [file]
```

### smartcd

```bash
node bin/smartcd.js [command] [args]
```

## Contributing

Contributions are welcome! Please open issues or pull requests.

## License

MIT License
