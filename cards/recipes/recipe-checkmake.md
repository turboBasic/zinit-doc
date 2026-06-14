---
id: recipe-checkmake
title: "checkmake"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `checkmake`, an experimental Makefile linter, from a GitHub release binary via an `lbin` shim.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    lbin'!checkmake* -> checkmake' \
    id-as \
    null \
  @mrtazz/checkmake
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `lbin'!checkmake* -> checkmake'` — creates a lazy binary shim named `checkmake` pointing to the first file matching `checkmake*` in the downloaded archive (requires `zinit-annex-bin-gem-node`).
- `id-as` — uses the repository name as the plugin ID.
- `null` — disables script sourcing and completion installation.

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    lbin'!checkmake* -> checkmake' \
    id-as \
    null \
  @mrtazz/checkmake
```
