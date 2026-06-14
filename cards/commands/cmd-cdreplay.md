---
id: cmd-cdreplay
title: "Command: zi cdreplay"
category: commands
tags: [command, completion, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-cdlist, cmd-cdclear, cmd-compinit, cmd-snippet]
---

## Summary

Replay all `compdef` calls that were intercepted by Zinit before `compinit` was available. Run this once after calling `compinit` to register completions that plugins tried to define earlier.

## Syntax / Usage

```zsh
zi cdreplay [-q]
```

- `-q` — quiet, suppress output of each replayed `compdef`.

## Details

Zinit installs a stub `compdef` function at startup. Any `compdef` calls made by plugins before `compinit` runs are captured into an array rather than executed (since the real `compdef` doesn't exist yet). After `autoload -Uz compinit; compinit` is called, running `zi cdreplay` re-executes every captured call against the now-available real `compdef`. This allows `compinit` to be called only once (a significant startup performance win), while still honoring completion definitions from all plugins. In Turbo mode the `zicdreplay` helper function is used inside `atinit` or `atload` hooks.

## Examples

```zsh
# Non-Turbo setup: replay after compinit
autoload -Uz compinit
compinit
zi cdreplay -q

# Turbo setup: replay inside atinit hook of last completion plugin
zi for \
    atload"zicompinit; zicdreplay" \
    blockf \
    lucid \
    wait \
  zsh-users/zsh-completions
```

## Caveats / Common Mistakes

`cdreplay` must be called after `compinit`, not before. Calling it before `compinit` is a no-op because the real `compdef` function still doesn't exist. If completions from some plugins are missing, check whether `cdreplay` is being called at all.

## See Also

- cmd-cdlist
- cmd-cdclear
- cmd-compinit
