---
id: recipe-neovim
title: "Recipe: neovim"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs the nightly build of Neovim from a GitHub release binary and makes `nvim` available on `$PATH`.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    sbin'**/nvim -> nvim' \
    ver'nightly' \
  neovim/neovim
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `ver'nightly'` — pins the download to the `nightly` release tag instead of the latest stable release.
- `sbin'**/nvim -> nvim'` — creates a shim named `nvim` pointing to the binary anywhere in the archive tree (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    sbin'**/nvim -> nvim' \
    ver'nightly' \
  neovim/neovim
```

## Caveats / Common Mistakes

- Using `ver'nightly'` means every `zinit update` may pull a new nightly build. Remove `ver'nightly'` or change it to `ver'stable'` to track the stable release channel instead.
