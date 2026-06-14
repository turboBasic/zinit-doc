---
id: recipe-gh
title: "Recipe: gh"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs the official GitHub CLI (`gh`) from a GitHub release binary.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    sbin'**/gh' \
  cli/cli
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `sbin'**/gh'` — creates a shim named `gh` pointing to the binary anywhere in the archive tree (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    sbin'**/gh' \
  cli/cli
```
