---
id: ts-slow-startup-not-using-turbo-337
title: Zinit startup is slow (not using Turbo mode)
category: troubleshooting
tags: [turbo, performance, troubleshooting, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/issues/337
related: []
---

## Summary

Zinit loaded without the `wait` (Turbo) ice is no faster than other plugin managers because plugins are sourced synchronously at shell startup. Turbo mode is the key feature that gives zinit its 50-80% startup time reduction.

## Symptom

Shell startup takes 0.9–1.4 seconds per `time zsh -i -c exit` measurement with many plugins loaded via `zinit light` or `zinit load` without `wait`.

## Cause

Without `wait''`, every plugin is sourced in sequence during `.zshrc` evaluation. The performance advantage only activates when plugins are deferred to after the first prompt via `wait''`.

## Fix / Workaround

Add `wait lucid` to plugin loads that are not needed before the first prompt:

```zsh
# Before (slow)
zinit light zsh-users/zsh-autosuggestions
zinit light zdharma-continuum/fast-syntax-highlighting
zinit light zsh-users/zsh-completions

# After (fast — deferred until after first prompt)
zinit lucid wait for \
  zsh-users/zsh-autosuggestions \
  zdharma-continuum/fast-syntax-highlighting \
  blockf zsh-users/zsh-completions
```

For completions loaded in Turbo mode, call `compinit` in the `atload` hook of the last completion plugin:

```zsh
zinit lucid wait for \
    atload"zicompinit; zicdreplay" blockf \
  zsh-users/zsh-completions
```

Use `zinit times` to identify which plugins are slowest:

```zsh
zinit times
```

## Caveats

Plugins that set aliases, `$PATH`, or key bindings needed before the first prompt (e.g. prompt themes, `fzf` key bindings) should NOT use `wait`. Keep those loads synchronous.
