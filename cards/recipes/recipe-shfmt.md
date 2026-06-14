---
id: recipe-shfmt
title: "shfmt"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `shfmt`, a shell parser, formatter, and interpreter, from a GitHub release binary.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    sbin'**/sh* -> shfmt' \
  @mvdan/sh
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `sbin'**/sh* -> shfmt'` — creates a shim named `shfmt` pointing to the binary matching `**/sh*` anywhere in the archive tree (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    sbin'**/sh* -> shfmt' \
  @mvdan/sh
```
