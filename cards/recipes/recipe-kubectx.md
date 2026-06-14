---
id: recipe-kubectx
title: "kubectx"
category: recipes
tags: [recipe, binary, command, installation, git]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Installs both `kubectx` (switch Kubernetes contexts) and `kubens` (switch Kubernetes namespaces) from a single GitHub release.

## Syntax / Usage

```zsh
zi for \
    bpick'kubectx;kubens' \
    from'gh-r' \
    sbin'kubectx;kubens'  \
  ahmetb/kubectx
```

## Details

- `from'gh-r'` — downloads the release assets from GitHub Releases.
- `bpick'kubectx;kubens'` — selects both the `kubectx` and `kubens` assets from the release (semicolon-separated list).
- `sbin'kubectx;kubens'` — creates shims for both binaries (requires `zinit-annex-bin-gem-node`).

The annex `zdharma-continuum/zinit-annex-bin-gem-node` must be loaded before this recipe.

## Examples

```zsh
# prerequisite — load once at the top of .zshrc
zinit light-mode for zdharma-continuum/zinit-annex-bin-gem-node

zi for \
    bpick'kubectx;kubens' \
    from'gh-r' \
    sbin'kubectx;kubens'  \
  ahmetb/kubectx
```
