---
id: recipe-fzf
title: "fzf"
category: recipes
tags: [recipe, binary, command, completion, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs the `fzf` fuzzy finder from a GitHub release binary and sources its Zsh key bindings and completion integration on shell startup.

## Syntax / Usage

```zsh
zi for \
    from'gh-r'  \
    lbin'!fzf'  \
    atclone'fzf --zsh > fzf.zsh' \
    atpull'%atclone' \
    src'fzf.zsh'
  junegunn/fzf
```

## Details

- `from'gh-r'` — downloads the release archive from GitHub Releases.
- `lbin'!fzf'` — installs a lazy binary shim named `fzf` (requires `zinit-annex-bin-gem-node`).
- `atclone'fzf --zsh > fzf.zsh'` — runs `fzf --zsh` after initial download to generate the shell integration script (key bindings: `Ctrl-T`, `Ctrl-R`, `Alt-C`; completion triggers).
- `atpull'%atclone'` — regenerates `fzf.zsh` on every update.
- `src'fzf.zsh'` — sources the generated integration script so bindings and completions are active in every new shell.

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    from'gh-r'  \
    lbin'!fzf'  \
    atclone'fzf --zsh > fzf.zsh' \
    atpull'%atclone' \
    src'fzf.zsh'
  junegunn/fzf
```
