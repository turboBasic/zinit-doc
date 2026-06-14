---
id: ts-migration-annex-repos-132
title: Migrated repository names for annexes and plugins after zdharma-continuum fork
category: troubleshooting
tags: [migration, annex, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/132
related: []
---

## Summary
Several repositories were migrated to the `zdharma-continuum` organization. Using old `psprint/` or `zinit-zsh/` paths will fail to clone.

## Question / Problem
Configs referencing the old repository paths below fail to clone:

```
psprint/zsh-navigation-tools
zinit-zsh/z-a-rust
zinit-zsh/z-a-as-monitor
zinit-zsh/z-a-patch-dl
zinit-zsh/z-a-bin-gem-node
```

## Answer / Solution
Use the migrated `zdharma-continuum` paths:

```zsh
zinit light-mode for \
    zdharma-continuum/zinit-annex-readurl \
    zdharma-continuum/zinit-annex-bin-gem-node \
    zdharma-continuum/zinit-annex-patch-dl \
    zdharma-continuum/zinit-annex-rust \
    zdharma-continuum/zsh-navigation-tools
```

The annex names also changed: `z-a-*` became `zinit-annex-*`.

## Caveats
GitHub may redirect some old URLs, but zinit constructs clone URLs from the repo spec directly and does not follow redirects. Always use the current `zdharma-continuum` org paths.
