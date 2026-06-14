---
id: ts-compdef-replay-not-called-turbo-463
title: Completions from plugins not available when using Turbo mode
category: troubleshooting
tags: [completion, turbo, troubleshooting, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/issues/463
related: [ts-slow-startup-not-using-turbo-337]
---

## Summary

When plugins are loaded in Turbo mode (`wait`), completions defined via `compdef` may not be active because `compinit` and `cdreplay` must be called after the plugins load, not before. The timing of `compinit` relative to plugin loading is critical in Turbo mode.

## Symptom

Commands loaded in Turbo mode have no completions even though the plugin ships `_command` completion functions. Pressing Tab shows nothing or falls back to file completion.

## Cause

In Turbo mode, plugin loading happens after the first prompt. If `compinit` is called in `.zshrc` before the `wait` plugins load, `compdef` calls from those plugins are not yet available. Zinit intercepts `compdef` calls and stores them, but `cdreplay` must be called after the last Turbo plugin loads to re-apply them.

## Fix / Workaround

Call `compinit` and `cdreplay` inside the `atload` hook of the last completion-related Turbo plugin:

```zsh
# At the end of .zshrc, after all plugin declarations
zinit lucid wait for \
    atload"zicompinit; zicdreplay" \
    blockf \
  zsh-users/zsh-completions
```

Or after all other Turbo loads, attach `zicompinit` to the syntax-highlighting plugin (which should be last):

```zsh
zinit lucid wait atinit"zicompinit; zicdreplay" for \
  zdharma-continuum/fast-syntax-highlighting
```

Helper functions:
- `zicompinit` — runs `autoload -Uz compinit; compinit`
- `zicdreplay` — replays all captured `compdef` calls
- `zicdclear` — clears the compdef replay list (use before loading unwanted compdefs)

## Examples

```zsh
# Full recommended Turbo setup with completions
zinit lucid wait for \
  zsh-users/zsh-autosuggestions \
  blockf atpull'zinit creinstall -q .' \
    zsh-users/zsh-completions

zinit lucid wait atinit"zicompinit; zicdreplay" for \
  zdharma-continuum/fast-syntax-highlighting
```

## Caveats

Do not call `compinit` directly in `.zshrc` if all completions are loaded in Turbo mode. Use `zicompinit` inside an `atload` or `atinit` hook instead.

## Quality Notes

Related: `ts-compinit-missing-completions-463` covers a different completion problem from the same issue — stale symlinks in the completions directory causing `compinit` errors on startup, not Turbo mode timing.
