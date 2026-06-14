---
id: zsh-startup-order
title: Zsh Startup Order and Zinit Placement
category: concepts
tags: [performance, turbo, installation]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [zinit-init, turbo-mode, completions-management]
---

## Summary

Zinit is sourced early in `.zshrc` and replaces the traditional plugin-load-then-compinit pattern with a deferred loading model that keeps the prompt fast regardless of how many plugins are configured.

## Details

Traditional `.zshrc` evaluation order:

1. Environment variables and path setup
2. Source each plugin (blocking)
3. Call `compinit`
4. Prompt appears

With Zinit the order becomes:

1. Declare any `$ZINIT` hash overrides
2. Source `zinit.zsh` (bootstrap + intercept `compdef`)
3. Optionally load synchronous plugins (those that must be available before the first prompt)
4. Declare Turbo-mode plugins with `wait` ice (they are queued, not yet loaded)
5. If not using Turbo: call `autoload -Uz compinit; compinit`, then `zinit cdreplay -q`
6. Prompt appears immediately
7. Turbo-queued plugins load asynchronously in the background

With Turbo mode, `compinit` is deferred into an `atinit` or `atload` hook on the last completion-related plugin. Zinit's `compdef` intercept ensures completions work correctly even though `compinit` has not yet run when the plugins are declared.

Zinit does not use `$FPATH` entries per plugin (unlike traditional managers), so `$FPATH` stays clean regardless of the number of plugins loaded.

On systems where `/etc/zshrc` calls `compinit` globally (Ubuntu, NixOS), that call should be suppressed to avoid double-initialization overhead.

## Examples

```zsh
# ~/.zshrc skeleton with Zinit (non-Turbo)
ZINIT_HOME="${XDG_DATA_HOME:-$HOME/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"

zinit load some/plugin
zinit light other/plugin

autoload -Uz compinit
compinit
zinit cdreplay -q

# ~/.zshrc skeleton with Zinit (Turbo)
source "${ZINIT_HOME}/zinit.zsh"

zinit lucid wait for \
  zsh-users/zsh-autosuggestions \
  zdharma-continuum/fast-syntax-highlighting

zi for \
    atload"zicompinit; zicdreplay" \
    blockf lucid wait \
  zsh-users/zsh-completions
# compinit is called inside zicompinit, deferred — prompt appears immediately
```
