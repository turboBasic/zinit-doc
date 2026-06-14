---
id: recipe-ripgrep
title: "ripgrep"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `rg` (ripgrep), a fast regex search tool that respects `.gitignore`, from a GitHub release binary.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    sbin'**/rg -> rg' \
  BurntSushi/ripgrep
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `sbin'**/rg -> rg'` — creates a shim named `rg` pointing to the binary anywhere in the archive tree (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    sbin'**/rg -> rg' \
  BurntSushi/ripgrep
```
