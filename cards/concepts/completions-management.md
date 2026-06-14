---
id: completions-management
title: Completions Management
category: concepts
tags: [completion, ice, turbo, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [turbo-mode, ice-modifiers-overview, zsh-startup-order]
---

## Summary

Zinit intercepts `compdef` calls made before `compinit` runs, stores them, and replays them afterwards — allowing a single `compinit` call regardless of plugin load order, which dramatically reduces startup time.

## Details

Normally, Zsh's `compdef` function is only available after `compinit` has been called. Plugins that call `compdef` before `compinit` would error. Zinit solves this by providing a stub `compdef` that records every call in an array. After `compinit` is called, `zinit cdreplay` replays all recorded calls against the real `compdef`.

Zinit also does not use `$FPATH` for completion discovery the way traditional plugin managers do. It installs completion files into `$ZINIT[COMPLETIONS_DIR]` and manages them independently, so loading many plugins does not pollute `$FPATH` with many entries.

**Key commands:**

- `zinit cdreplay [-q]` — replay saved `compdef` calls. Run after `compinit`.
- `zinit cdclear [-q]` — discard all saved `compdef` calls (useful to ignore completions from a specific plugin).
- `zinit creinstall {plg-spec}` — install completions for a plugin.
- `zinit cuninstall {plg-spec}` — uninstall completions.
- `zinit completions` — list installed completions.
- `zinit cdisable` / `zinit cenable` — toggle individual completion.
- `zinit cclear` — remove stray or broken completions.

**Without Turbo mode:** call `autoload -Uz compinit; compinit` after all plugins load, then call `zinit cdreplay -q`.

**With Turbo mode:** do not call `compinit` in the main body of `.zshrc`. Instead, add `atinit'zicompinit; zicdreplay'` (or `atload'zicompinit'`) to the last syntax-highlighting or completion plugin loaded with `wait`. The helper `zicompinit` runs `autoload -Uz compinit; compinit`.

**Blocking unwanted completions:** use `blockf` ice to prevent a plugin from adding entries to `$FPATH`, letting Zinit manage its completions instead. Use `nocompletions` ice to skip completion installation entirely for a plugin.

**System-wide `compinit`:** on Ubuntu and NixOS, a system-wide `compinit` may fire from `/etc/zshrc` before your config runs. Suppress it (`skip_global_compinit=1` in `~/.zshenv` on Ubuntu, `programs.zsh.enableGlobalCompInit = false` on NixOS) to avoid double-initialization and slow startup.

## Examples

```zsh
# Without Turbo — call compinit once after all plugins
source "${ZINIT_HOME}/zinit.zsh"
zinit load "some/plugin"
zinit load "other/plugin"
autoload -Uz compinit
compinit
zinit cdreplay -q

# With Turbo — defer compinit into the last plugin's hook
zi for \
    atload"zicompinit; zicdreplay" \
    blockf \
    lucid \
    wait \
  zsh-users/zsh-completions

# Ignore completions from a specific plugin
zi snippet OMZP::git
zi cdclear -q   # discard git plugin's compdefs

# Mark completion directly (single _file snippet)
zi ice as"completion"
zi snippet OMZP::docker/_docker

# Block a plugin from polluting fpath
zi ice blockf
zi light zsh-users/zsh-completions

# Ubuntu: suppress global compinit (add to ~/.zshenv)
skip_global_compinit=1
```

## Caveats / Common Mistakes

- `zicdreplay` must be called after `zicompinit` — reversing the order means `compdef` is not yet available when replay happens.
- Double `compinit` calls (e.g. from system `/etc/zshrc` plus your `.zshrc`) can slow startup from ~0.16 s to ~0.98 s. Disable the system call where possible.
- `cdclear` discards all compdefs accumulated up to that point; place it immediately after the plugin whose completions you want to ignore.
