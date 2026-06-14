---
id: install-manual
title: Install Zinit Manually (git clone)
category: installation
tags: [installation, git]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [install-curl, install-verify, install-prerequisites, zinit-init, zinit-home-directory]
---

## Summary

Manual installation clones the Zinit repository once and adds a self-bootstrapping snippet to `.zshrc` that performs the clone automatically on any new machine.

## Syntax / Usage

```zsh
# Add to .zshrc
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
```

## Details

The four lines in `.zshrc`:

1. Define `$ZINIT_HOME` using XDG-aware path (falls back to `~/.local/share/zinit/zinit.git`).
2. Create the parent directory if it does not exist.
3. Clone Zinit if it has not been cloned yet (idempotent — safe to run on every shell start).
4. Source `zinit.zsh` to activate the plugin manager.

If `zinit.zsh` is sourced **after** `compinit`, add the following immediately after the source line to register Zinit's own completion:

```zsh
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit
```

After the first install, reload the shell and compile Zinit:

```zsh
exec zsh
zinit self-update
```

Paths can be customised by setting the `$ZINIT` associative array before the source line. See [zinit-home-directory](../concepts/zinit-home-directory.md).

## Examples

```zsh
# Minimal .zshrc bootstrap
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"

# If sourced after compinit, register completion manually
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit

# Reload and compile
exec zsh
zinit self-update

# Custom install path
declare -A ZINIT
ZINIT[HOME_DIR]="$HOME/.zinit"
ZINIT_HOME="$HOME/.zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
```

## Caveats / Common Mistakes

- The old global variables (`$ZPLG_HOME`, etc.) have been removed; use the `$ZINIT` hash instead if you need path overrides.
- Sourcing `zinit.zsh` before `compinit` is the standard order. Reversing it requires the manual `_comps[zinit]=_zinit` registration shown above.
