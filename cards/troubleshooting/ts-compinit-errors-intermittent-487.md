---
id: ts-compinit-errors-intermittent-487
title: Intermittent compinit errors on terminal launch
category: troubleshooting
tags: [completion, troubleshooting, turbo]
source: https://github.com/zdharma-continuum/zinit/discussions/487
related: []
---

## Summary
Intermittent `compinit` errors at shell startup are usually caused by calling `compinit` too early (before all completion-defining plugins load) or by running multiple `compinit` calls across the config.

## Question / Problem
A user experienced `compinit` errors roughly 10% of shell launches. The errors were inconsistent and could not be reliably reproduced.

## Answer / Solution
The most common causes of intermittent `compinit` errors in zinit configs:

1. **Turbo race**: completions from turbo-loaded plugins sometimes register after `compinit` has already run. Fix by deferring `compinit` to after all turbo completion plugins load:

```zsh
zinit for \
    atload"zicompinit; zicdreplay" \
    blockf \
    lucid \
    wait \
  zsh-users/zsh-completions
```

2. **Multiple compinit calls**: ensure `compinit` is called exactly once. Remove any `autoload -Uz compinit; compinit` from `.zshrc` that is not gated by the turbo `atload` hook.

3. **System-wide compinit**: on Ubuntu and similar systems, `/etc/zsh/zshrc` calls `compinit`. Disable it in `~/.zshenv`:
```zsh
skip_global_compinit=1
```

4. **Stale `.zcompdump`**: delete it and let zinit regenerate:
```zsh
rm ~/.zcompdump*
exec zsh
```

## Caveats
The `blockf` ice prevents completion plugins from adding to `$fpath` directly; zinit manages `$fpath` instead. Without `blockf`, duplicate `$fpath` entries can trigger compinit warnings.
