---
id: recipe-lazygit
title: "Recipe: LazyGit"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `lazygit`, a simple terminal UI for git commands, from a GitHub release binary.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    sbin'**/lazygit' \
  jesseduffield/lazygit
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `sbin'**/lazygit'` — creates a shim named `lazygit` pointing to the binary anywhere in the archive tree (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    sbin'**/lazygit' \
  jesseduffield/lazygit
```
