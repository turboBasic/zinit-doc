---
id: ts-completions-brew-fpath-109
title: Adding Homebrew completion paths alongside zinit
category: troubleshooting
tags: [completion, installation, snippet]
source: https://github.com/zdharma-continuum/zinit/discussions/109
related: []
---

## Summary
When tools are installed via Homebrew rather than through zinit, their completions live in Homebrew-managed fpath directories and need to be registered separately.

## Question / Problem
A user on macOS with an M1 Mac wanted to know whether manually appending Homebrew completion paths to `$fpath` is the recommended approach, or whether zinit provides a better alternative.

```zsh
fpath+=( /usr/local/share/zsh/site-functions /opt/homebrew/share/zsh/site-functions )
```

## Answer / Solution
For tools managed outside zinit (e.g. via Homebrew), manually prepending their completion directories to `$fpath` before calling `compinit` is the correct approach. Zinit manages completions only for plugins and snippets it installs itself. There is no zinit-native way to register an external fpath directory, so the `fpath+=( ... )` pattern is the expected solution.

The `fpath` line must appear before `compinit` is called (or before `zicompinit` runs in turbo mode).

## Caveats
On Apple Silicon, Homebrew uses `/opt/homebrew` as its prefix; on Intel Macs the prefix is `/usr/local`. Some tools install completions to one but not the other. Include both if you target both architectures.
