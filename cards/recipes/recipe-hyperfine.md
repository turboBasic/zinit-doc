---
id: recipe-hyperfine
title: "hyperfine"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `hyperfine`, a command-line benchmarking tool, from a GitHub release binary.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    sbin'**/h*e -> hyperfine' \
  @sharkdp/hyperfine
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `sbin'**/h*e -> hyperfine'` — creates a shim named `hyperfine` pointing to the binary matched by the glob `**/h*e` anywhere in the archive tree (requires `zinit-annex-bin-gem-node`). The glob avoids hardcoding platform-specific binary names.

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    sbin'**/h*e -> hyperfine' \
  @sharkdp/hyperfine
```
