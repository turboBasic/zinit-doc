---
id: recipe-procs
title: "procs"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `procs`, a modern `ps` replacement written in Rust, from a GitHub release binary.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    sbin'**/procs -> procs' \
  dalance/procs
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `sbin'**/procs -> procs'` — creates a shim named `procs` pointing to the binary anywhere in the archive tree (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    sbin'**/procs -> procs' \
  dalance/procs
```
