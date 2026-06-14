---
id: recipe-git-sizer
title: "Recipe: git-sizer"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `git-sizer`, a tool that computes size metrics for a Git repository, from a GitHub release binary.

## Syntax / Usage

```zsh
zi for \
    from'gh-r'      \
    sbin'git-sizer' \
  @github/git-sizer
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `sbin'git-sizer'` — creates a shim named `git-sizer` for the binary in the archive (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r'      \
    sbin'git-sizer' \
  @github/git-sizer
```
