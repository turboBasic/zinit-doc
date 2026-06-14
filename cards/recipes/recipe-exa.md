---
id: recipe-exa
title: "Recipe: exa"
category: recipes
tags: [recipe, binary, command, completion, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs `exa`, a modern `ls` replacement, from a GitHub release binary and installs its Zsh completion file.

## Syntax / Usage

```zsh
zi for \
    atclone'cp -vf completions/exa.zsh _exa'  \
    from'gh-r' \
    sbin'**/exa -> exa' \
  ogham/exa
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `atclone'cp -vf completions/exa.zsh _exa'` — copies the bundled Zsh completion file to `_exa` in the plugin directory after the initial download, making it available to Zinit's completion management.
- `sbin'**/exa -> exa'` — creates a shim named `exa` pointing to the binary anywhere in the archive tree (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    atclone'cp -vf completions/exa.zsh _exa'  \
    from'gh-r' \
    sbin'**/exa -> exa' \
  ogham/exa
```
