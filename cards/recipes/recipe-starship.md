---
id: recipe-starship
title: "starship"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs the Starship cross-shell prompt from a GitHub release binary and makes `starship` available on `$PATH`.

## Syntax / Usage

```zsh
zi for \
    from'gh-r' \
    sbin'**/starship -> starship' \
  starship/starship
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `sbin'**/starship -> starship'` — creates a shim named `starship` pointing to the binary anywhere in the archive tree (requires `zinit-annex-bin-gem-node`).

This recipe only installs the binary. To activate the Starship prompt, add `eval "$(starship init zsh)"` to `.zshrc` after this block, or use `atload'eval "$(starship init zsh)"'` in the recipe.

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r' \
    sbin'**/starship -> starship' \
  starship/starship

# Activate the prompt after installation
eval "$(starship init zsh)"
```
