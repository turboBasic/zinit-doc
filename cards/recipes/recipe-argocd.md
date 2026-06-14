---
id: recipe-argocd
title: "Recipe: argo cd"
category: recipes
tags: [recipe, binary, completion, command, git, installation]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs the Argo CD CLI (`argocd`) from a GitHub release binary and generates its Zsh completion file on clone and pull.

## Syntax / Usage

```zsh
zi for \
    as'completions' \
    atclone'
      ./argocd* completion zsh > _argocd' \
    atpull'%atclone' \
    from'gh-r' \
    if'[[ "$(uname -m)" == x86_64 ]]' \
    sbin'argocd* -> argocd' \
  argoproj/argo-cd
```

## Details

- `from'gh-r'` — downloads the binary from GitHub Releases.
- `as'completions'` — tells Zinit this plugin provides completions rather than a script to source.
- `atclone` — runs `./argocd* completion zsh > _argocd` after the initial download to generate the `_argocd` completion file.
- `atpull'%atclone'` — repeats the same command on every update so completions stay in sync.
- `if'[[ "$(uname -m)" == x86_64 ]]'` — gates loading to x86_64 machines only; omit or adjust for other architectures.
- `sbin'argocd* -> argocd'` — creates a shim named `argocd` pointing to the downloaded binary (requires the `zinit-annex-bin-gem-node` annex).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    as'completions' \
    atclone'
      ./argocd* completion zsh > _argocd' \
    atpull'%atclone' \
    from'gh-r' \
    if'[[ "$(uname -m)" == x86_64 ]]' \
    sbin'argocd* -> argocd' \
  argoproj/argo-cd
```

## Caveats / Common Mistakes

- The `if` condition restricts installation to x86_64. On Apple Silicon or other architectures the plugin will silently skip loading.
- The `sbin` ice requires `zinit-annex-bin-gem-node` to be loaded first; without it the shim is not created and `argocd` will not be on `$PATH`.
