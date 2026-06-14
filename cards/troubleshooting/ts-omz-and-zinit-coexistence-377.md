---
id: ts-omz-and-zinit-coexistence-377
title: Using Oh My Zsh and zinit together
category: troubleshooting
tags: [migration, snippet, plugin, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/377
related: []
---

## Summary
Zinit and Oh My Zsh can coexist in the same `.zshrc`, but the recommended approach is to migrate OMZ plugins to zinit snippets rather than running both frameworks simultaneously.

## Question / Problem
A user coming from OMZ + antigen wanted to keep using OMZ's framework while using zinit to manage additional external plugins. They asked whether appending zinit at the end of `.zshrc` (after sourcing `oh-my-zsh.sh`) is safe.

## Answer / Solution
Appending zinit after OMZ works in practice but has potential issues:
- Both frameworks manage `$fpath` and `compinit`, leading to double initialization and slower startup.
- OMZ's `compinit` call will already have run before zinit's plugins load, so zinit-managed completions may not be registered.

The recommended migration path is to replace OMZ entirely with zinit snippets:

```zsh
# Replace OMZ framework with zinit snippets
zinit snippet OMZL::git.zsh
zinit snippet OMZP::git
zinit snippet OMZP::docker
# ... other OMZ plugins via OMZP::

# Manage external plugins through zinit directly
zinit light zsh-users/zsh-autosuggestions
zinit light zdharma-continuum/fast-syntax-highlighting
```

If keeping OMZ is required, load zinit **before** sourcing `oh-my-zsh.sh` so zinit controls the initialization order.

## Caveats
Running both frameworks increases startup time. OMZ's global `compinit` call can conflict with zinit's turbo-mode completion setup.
