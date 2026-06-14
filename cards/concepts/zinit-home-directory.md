---
id: zinit-home-directory
title: Zinit Home Directory Structure
category: concepts
tags: [installation]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [zinit-init, install-manual, install-curl]
---

## Summary

Zinit stores all its data under a single home directory (defaulting to `~/.local/share/zinit`) configured via the `$ZINIT` associative array; each subdirectory has a dedicated purpose and can be overridden independently.

## Details

The default layout under `$ZINIT[HOME_DIR]` (`~/.local/share/zinit`):

| Path | Purpose |
|---|---|
| `zinit.git/` | Zinit's own source code (`$ZINIT[BIN_DIR]`) |
| `plugins/` | Cloned plugin repositories (`$ZINIT[PLUGINS_DIR]`) |
| `snippets/` | Cached snippet files (`$ZINIT[SNIPPETS_DIR]`) |
| `completions/` | Managed completion files (`$ZINIT[COMPLETIONS_DIR]`) |
| `polaris/` | Install prefix for compiled software (`$ZPFX`) |

Inside each plugin directory Zinit creates a `._zinit/` subdirectory that stores the ice modifiers used when the plugin was loaded. This allows `zinit update` to replay the correct ices without the plugin being active.

A `.zinit_lstupd` file in the plugin directory records the log of newly pulled commits from the last update.

All paths are configurable via the `$ZINIT` associative array, which must be declared **before** sourcing `zinit.zsh`. The old per-variable approach (`$ZPLG_HOME`, etc.) has been removed.

`$ZPFX` defaults to `~/.local/share/zinit/polaris` and acts as the installation prefix for software built with `configure''` and `make''` ices. `$ZPFX/bin` is automatically prepended to `$PATH`.

## Examples

```zsh
# Declare overrides before sourcing zinit
declare -A ZINIT
ZINIT[HOME_DIR]="$HOME/.zinit"
ZINIT[PLUGINS_DIR]="/opt/zsh/plugins"
ZINIT[SNIPPETS_DIR]="/opt/zsh/snippets"
ZINIT[COMPLETIONS_DIR]="/opt/zsh/completions"
ZINIT[ZCOMPDUMP_PATH]="$HOME/.zcompdump"
ZINIT[COMPINIT_OPTS]="-C"   # skip re-checking on every shell start

# Custom install prefix for compiled software
export ZPFX="$HOME/.local"

source "${ZINIT[HOME_DIR]}/zinit.git/zinit.zsh"

# Explore installed data
ls "$ZINIT[PLUGINS_DIR]"
ls "$ZPFX/bin"
```

## Caveats / Common Mistakes

- Path overrides must be set before `source zinit.zsh`; setting them after has no effect.
- `ZINIT[MAN_DIR]` stores manpages installed by plugins via `atclone`, but the directory is not automatically registered with `man` — you may need to add it to `$MANPATH`.
