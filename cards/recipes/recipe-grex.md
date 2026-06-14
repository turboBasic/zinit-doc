---
id: recipe-grex
title: "Recipe: grex"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `grex`, a command-line tool for generating regular expressions from test cases, from a GitHub release binary.

## Syntax / Usage

```zsh
zi for \
    from'gh-r'  \
    sbin'g*x -> grex'  \
  pemistahl/grex
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `sbin'g*x -> grex'` — creates a shim named `grex` pointing to the binary matching the glob `g*x` in the archive (requires `zinit-annex-bin-gem-node`). The glob avoids hardcoding platform-specific filenames.

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r'  \
    sbin'g*x -> grex'  \
  pemistahl/grex
```
