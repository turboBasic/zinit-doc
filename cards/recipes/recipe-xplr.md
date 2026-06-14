---
id: recipe-xplr
title: "Recipe: xplr"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `xplr`, a hackable and minimal TUI file explorer, from a GitHub release binary.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    nocompile \
    sbin'**/xplr -> xplr' \
  sayanarijit/xplr
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `nocompile` — skips Zinit's Zsh compilation step (not applicable to a binary).
- `sbin'**/xplr -> xplr'` — creates a shim named `xplr` pointing to the binary anywhere in the archive tree (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    nocompile \
    sbin'**/xplr -> xplr' \
  sayanarijit/xplr
```
