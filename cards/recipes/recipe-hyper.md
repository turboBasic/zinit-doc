---
id: recipe-hyper
title: "Recipe: hyper"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs the Hyper terminal (built on web technologies) from a GitHub release zip archive.

## Syntax / Usage

```zsh
zi for \
    bpick'*.zip' \
    from'gh-r' \
    sbin'!**/bin/hyper' \
  @vercel/hyper
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `bpick'*.zip'` — selects only the `.zip` asset from the release (Hyper provides multiple formats per platform).
- `sbin'!**/bin/hyper'` — creates a lazy shim named `hyper` pointing to the binary at `**/bin/hyper` anywhere inside the extracted archive (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    bpick'*.zip' \
    from'gh-r' \
    sbin'!**/bin/hyper' \
  @vercel/hyper
```
