---
id: ts-zinit-zsh-slow-load-times
title: zinit.zsh itself appears slow in load times report
category: troubleshooting
tags: [performance, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/426
related: [ts-light-mode-performance, ts-compinit-turbo-mode]
---

## Summary

Seeing `zinit.zsh` listed prominently in `zinit times` output is expected — sourcing zinit.zsh is measured as part of the startup time. The time can be reduced by ensuring zinit is compiled and by moving to the current installation path.

## Question / Problem

A user saw `zinit.zsh` appear as a slow item in the plugin loading times output and asked if this was normal. They were using the old install path (`~/.zinit/bin/zinit.zsh`).

## Answer / Solution

`zinit.zsh` is the zinit core itself — its source time is always present in `zinit times`. This is expected behavior. The time reflects how long it takes to source zinit's own code.

To minimize it:

1. **Compile zinit**: run `zinit self-update` once. This compiles `zinit.zsh` to bytecode (`.zwc` file), which loads faster.

2. **Use the current install path**: the old `~/.zinit/bin/` path is the pre-migration location. The current path is `~/.local/share/zinit/zinit.git/`. Migrating ensures you get bugfixes and that `self-update` works.

3. **Avoid double compinit**: calling `compinit` both before and after turbo plugins doubles completion init time. Use zinit's `zicompinit` helper in an `atinit` hook on the last completion-related plugin.

4. **Use turbo mode** for everything possible:
   ```zsh
   zinit wait lucid light-mode for \
       zdharma-continuum/fast-syntax-highlighting \
       zsh-users/zsh-autosuggestions \
       zsh-users/zsh-completions
   ```

## Examples

Typical fast config pattern:

```zsh
source "${ZINIT_HOME}/zinit.zsh"

# Load annexes synchronously (required)
zinit light-mode for \
    zdharma-continuum/zinit-annex-bin-gem-node

# Everything else in turbo
zinit wait lucid light-mode for \
    atinit"zicompinit; zicdreplay" \
    zdharma-continuum/fast-syntax-highlighting \
    atload"_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
    blockf atpull'zinit creinstall -q .' \
    zsh-users/zsh-completions
```

## Caveats

`zinit times` measures wall-clock time per plugin from when `zinit load/light/snippet` is called to when the plugin finishes sourcing. The zinit core time is separate and shown because zinit instruments itself.
