---
id: ts-infinite-recursion-wait-atload-cd-315
title: Infinite recursion crash when combining wait, atload, and cd
category: troubleshooting
tags: [troubleshooting, turbo, ice, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/315
related: []
---

## Summary

Using `wait` with an `atload` hook that calls `cd` causes infinite recursion: zinit's `chpwd` hook re-triggers the scheduler, which re-loads the plugin, which calls `cd` again.

## Symptom

Zsh crashes or prints "maximum nested function calls" when a plugin is loaded with `wait` and its `atload` hook contains a `cd` call.

```zsh
zinit wait'0a' atload'echo before; cd test; echo after' light-mode for @Aloxaf/fzf-tab
# → zsh: maximum nested function calls
```

## Cause

Zinit's turbo scheduler hooks into `chpwd`. When `atload` calls `cd`, it fires `chpwd`, which triggers the scheduler again, which re-evaluates the pending `atload`, causing unbounded recursion.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/315

Workarounds:
1. Avoid calling `cd` inside `atload`. If you need to change directory after loading, use a `precmd` hook that runs once:

```zsh
zinit wait'0a' atload'autoload -Uz add-zsh-hook; _fix() { cd /desired/path; add-zsh-hook -d precmd _fix }; add-zsh-hook precmd _fix' light-mode for @Aloxaf/fzf-tab
```

2. Use `builtin cd` — it still triggers `chpwd` so the recursion risk remains; prefer the precmd approach.
