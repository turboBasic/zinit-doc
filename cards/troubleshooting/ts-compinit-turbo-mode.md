---
id: ts-compinit-turbo-mode
title: Correct way to call compinit with turbo-mode plugins
category: troubleshooting
tags: [completion, turbo, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/109
related: [ts-compinit-stray-completion-files, ts-blockf-zsh-completions]
---

## Summary

With turbo mode, `compinit` must be called inside an `atinit` or `atload` hook of the last completion-related plugin. Use `zicompinit` and `zicdreplay` helpers to do this correctly without calling `compinit` twice.

## Question / Problem

When plugins are loaded in turbo mode (`wait`), they register completions after the shell has started. Simply calling `compinit` at the top of `.zshrc` misses turbo-loaded completions.

## Answer / Solution

Place `zicompinit; zicdreplay` in the `atinit` hook of the syntax-highlighting plugin (which should be loaded last), or in the `atload` hook of the last completion-related plugin:

```zsh
zinit wait lucid for \
    "some/plugin" \
    "other/plugin"

zinit for \
    atload"zicompinit; zicdreplay" \
    blockf \
    lucid \
    wait \
  zsh-users/zsh-completions
```

**Without turbo** (simpler — call compinit normally):

```zsh
source "${ZINIT_HOME}/zinit.zsh"

zinit load "some/plugin"
zinit load "other/plugin"

autoload -Uz compinit
compinit
zinit cdreplay -q
```

## Examples

Full turbo pattern from the README:

```zsh
zinit wait lucid light-mode for \
    atinit"zicompinit; zicdreplay" \
    zdharma-continuum/fast-syntax-highlighting \
    atload"_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
    blockf atpull'zinit creinstall -q .' \
    zsh-users/zsh-completions
```

**Speed:** calling `compinit` once via `zicompinit` vs calling it twice (before and after plugins): 0.156 s vs 0.980 s.

## Caveats

`zicompinit` is just `autoload -Uz compinit; compinit`. `zicdreplay` replays any `compdef` calls that were intercepted before `compinit` ran. Always call both together when using turbo.
