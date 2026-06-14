---
id: ts-turbo-lucid-one-plugin-per-session-192
title: Only one Turbo/lucid plugin installs per shell session on new machine
category: troubleshooting
tags: [turbo, installation, lazy-loading, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/192
related: []
---

## Summary

On a machine where no plugins are yet installed, only the first `wait`/`lucid` plugin is downloaded per shell session. Each subsequent session installs one more plugin. This is expected behavior, not a bug — Turbo plugins are installed in the background after the prompt, one at a time per session by default.

## Symptom

Copying `.zshrc` to a new machine: plugins without `wait` install immediately, but plugins with `wait lucid` install only one per session. Requires relaunching the shell N times for N Turbo plugins.

## Cause

Turbo mode (`wait""`) defers loading to after the first prompt. When a plugin is not yet downloaded, zinit normally installs it synchronously before the first prompt to avoid missing functionality. However, some configurations or older versions of zinit limit how many Turbo plugins are installed in a single non-interactive burst.

## Fix / Workaround

To install all pending plugins at once, run the scheduler in burst mode:

```zsh
@zinit-scheduler burst
```

Or reinstall from a non-interactive script context that sources zinit:

```zsh
zsh -i -c '@zinit-scheduler burst || true'
```

Alternatively, remove the `wait` ice from plugins during an initial bootstrap run, then add it back.

## Caveats

`@zinit-scheduler burst` loads all pending plugins synchronously in one shot. This is slower than the normal async behavior but ensures all plugins are present after a single run.
