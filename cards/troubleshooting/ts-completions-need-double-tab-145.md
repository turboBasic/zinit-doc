---
id: ts-completions-need-double-tab-145
title: Completions don't work until Tab is pressed twice on first open
category: troubleshooting
tags: [completion, troubleshooting, turbo, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/issues/145
related: []
---

## Summary

In a freshly opened terminal, completions fail on the first Tab press but work normally after pressing Tab once or twice more. This is a Turbo mode ordering issue: `compinit` has not yet run when the first Tab is pressed.

## Symptom

On the first Tab press in a new session, an error like `command not found: compdef` or a completion widget error is shown. Subsequent Tab presses work correctly.

## Cause

With Turbo mode (`wait""`), completion-related plugins load asynchronously after the prompt appears. If `compinit` is called inside an `atinit` or `atload` hook of a plugin that hasn't loaded yet, the completion system is uninitialized when the first Tab is pressed.

## Fix / Workaround

Call `zicompinit` and `zicdreplay` in the `atinit` of the last synchronously-loaded plugin, or — better — restructure the config to call `compinit` before Turbo plugins start:

```zsh
# Option 1: call compinit before any wait"" blocks
autoload -Uz compinit
compinit
zinit cdreplay -q

# Then load Turbo plugins
zinit ice wait lucid
zinit light zsh-users/zsh-autosuggestions
```

```zsh
# Option 2: trigger compinit inside the last Turbo plugin's atinit
zinit for \
    atinit"zicompinit; zicdreplay" \
    blockf \
    lucid \
    wait \
  zsh-users/zsh-completions
```

## Caveats

`zicompinit` is a convenience wrapper for `autoload -Uz compinit; compinit`. Using `atinit` (runs before the plugin sources) rather than `atload` (runs after) ensures completions are available immediately after the plugin loads.
