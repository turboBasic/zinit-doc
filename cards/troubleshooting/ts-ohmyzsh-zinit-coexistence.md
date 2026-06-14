---
id: ts-ohmyzsh-zinit-coexistence
title: Using oh-my-zsh and zinit together in the same .zshrc
category: troubleshooting
tags: [installation, plugin, migration]
source: https://github.com/zdharma-continuum/zinit/discussions/377
related: [ts-omz-migration-snippets]
---

## Summary

Zinit and oh-my-zsh can coexist. Load OMZ first via its own bootstrap, then add zinit at the end of `.zshrc` for managing additional plugins. The two systems do not conflict.

## Question / Problem

A user migrating from antigen wanted to keep their existing oh-my-zsh setup and add zinit on top for managing external plugins. They asked if mixing the two would cause problems.

## Answer / Solution

Yes, OMZ and zinit can run together. There are no fundamental conflicts. A common approach:

```zsh
# --- oh-my-zsh setup (top of .zshrc) ---
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"
plugins=(git docker kubectl)
source $ZSH/oh-my-zsh.sh

# --- zinit (bottom of .zshrc, for additional plugins) ---
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
source "${ZINIT_HOME}/zinit.zsh"

zinit light zsh-users/zsh-autosuggestions
zinit light zdharma-continuum/fast-syntax-highlighting
```

If you must keep OMZ, load zinit **before** sourcing `oh-my-zsh.sh` so zinit controls the initialization order:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
source "${ZINIT_HOME}/zinit.zsh"

export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"
plugins=(git docker kubectl)
source $ZSH/oh-my-zsh.sh
```

The recommended migration path is to replace OMZ entirely with zinit snippets:

```zsh
zinit snippet OMZL::git.zsh
zinit snippet OMZP::git
zinit snippet OMZP::docker
```

## Caveats

Running both OMZ and zinit means two separate initialization paths for completions and compinit — OMZ's `compinit` will already have run before zinit's turbo plugins load, so zinit-managed completions may not be registered. This causes slower startup and potential completion conflicts. Migrating fully to zinit snippets is preferred.
