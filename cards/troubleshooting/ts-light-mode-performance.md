---
id: ts-light-mode-performance
title: Using light-mode to reduce shell startup time
category: troubleshooting
tags: [performance, turbo, lazy-loading, plugin]
source: https://github.com/zdharma-continuum/zinit/discussions/258
related: [ts-turbo-wait-conditional, ts-zinit-times-command]
---

## Summary

`zinit load` (with reporting) is measurably slower than `zinit light` (without reporting). For most plugins, the reporting overhead is not needed in daily use. Switching to `light-mode` across all turbo-loaded plugins can reduce startup time by 60% or more.

## Question / Problem

A user asked why `light-mode` is not the default, noting that switching from `load` to `light-mode` reduced their shell startup from 0.263 s to 0.099 s.

## Answer / Solution

`zinit load` tracks everything the plugin does (aliases, functions, bindkeys, PATH changes) to enable `zinit unload` and `zinit report`. `zinit light` skips all tracking for faster loading. Reporting is the default because zinit's investigation features are a key differentiator, but in production `.zshrc` files most users do not need to unload plugins.

**Apply `light-mode` globally in turbo blocks:**

```zsh
zinit wait lucid light-mode for \
    zsh-users/zsh-autosuggestions \
    zdharma-continuum/fast-syntax-highlighting \
    zdharma-continuum/history-search-multi-word \
    zsh-users/zsh-completions
```

**Measure impact with `zinit times`:**

```zsh
zinit times        # show load times for each plugin
zinit times -s     # in seconds
zinit times -m     # show loading moments
zinit times -a     # both times and moments
```

## Examples

Conditional loading for rarely-used tools (suggested in the discussion):

```zsh
# Only load git-related completions after a git command is typed
zinit wait'[[ -n ${ZLAST_COMMANDS[(r)git*]} ]]' lucid light-mode for \
    some-git-plugin
```

## Caveats

With `light-mode`, `zinit unload <plugin>` and `zinit report <plugin>` will not work for those plugins. If you need to debug a plugin's side-effects, temporarily reload it with `zinit load <plugin>` in an interactive session.
