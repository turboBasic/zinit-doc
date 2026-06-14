---
id: recipe-fogg
title: "Recipe: fogg"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `fogg`, an opinionated Terraform infrastructure repository management tool, from a GitHub release binary via an `lbin` shim.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    lbin'!' \
    id-as \
    null \
  @chanzuckerberg/fogg
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `lbin'!'` — installs a lazy binary shim; the `!` flag derives the shim name automatically from the binary (requires `zinit-annex-bin-gem-node`).
- `id-as` — uses the repository name as the plugin ID.
- `null` — disables script sourcing and completion installation.

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    lbin'!' \
    id-as \
    null \
  @chanzuckerberg/fogg
```
