---
id: zinit-init
title: Zinit Bootstrap and Initialization
category: concepts
tags: [installation, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [zinit-home-directory, zsh-startup-order, install-manual, install-curl]
---

## Summary

Zinit bootstraps by sourcing `zinit.zsh` from its install directory; this single source call sets up all commands, aliases, and the `compdef` intercept mechanism needed before any plugins are loaded.

## Details

The canonical bootstrap snippet clones Zinit on first run and sources it on every run:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
```

What sourcing `zinit.zsh` does:

1. Defines the `zinit` function and its aliases (`zi`, `zini`, etc., unless `ZINIT[NO_ALIASES]=1`).
2. Intercepts `compdef` calls so that plugins loaded before `compinit` can still register completions (replayed later with `zinit cdreplay`).
3. Reads the `$ZINIT` associative array for any path overrides set before the source call.
4. Does **not** load any plugins itself — that is left entirely to the user's `.zshrc`.

If `zinit.zsh` is sourced **after** `compinit`, you must manually register Zinit's own completion:

```zsh
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit
```

After installation, run `zinit self-update` once to compile Zinit's source files for faster subsequent loads.

## Examples

```zsh
# Minimal bootstrap (auto-installs on first run)
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"

# Optional: register Zinit completion if sourced after compinit
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit

# Compile Zinit after first install
zinit self-update
```

## Caveats / Common Mistakes

- The old variable-per-path style (`$ZPLG_HOME`, etc.) has been removed; use the `$ZINIT` associative array instead.
- `ZINIT[NO_ALIASES]=1` must be set **before** sourcing `zinit.zsh` to prevent alias creation.
