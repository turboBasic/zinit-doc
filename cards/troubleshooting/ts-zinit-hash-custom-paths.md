---
id: ts-zinit-hash-custom-paths
title: Customizing zinit home, plugins, snippets, and completions directories
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/426
related: [ts-zpfx-prefix-install, ts-self-update-master-branch]
---

## Summary

Zinit stores all its data in subdirectories under `ZINIT[HOME_DIR]`. Each subdirectory can be individually overridden via the `ZINIT` associative array before sourcing `zinit.zsh`.

## Question / Problem

Users want to change where zinit stores plugins, completions, snippets, or the completion dump file, for example to follow XDG conventions or to store on a faster filesystem.

## Answer / Solution

Declare the `ZINIT` hash and set the desired keys before sourcing `zinit.zsh`:

```zsh
declare -A ZINIT

# Change the base home directory (all subdirs follow)
ZINIT[HOME_DIR]="${XDG_DATA_HOME:-$HOME/.local/share}/zinit"

# Override individual directories
ZINIT[PLUGINS_DIR]="/fast-disk/zinit/plugins"
ZINIT[SNIPPETS_DIR]="${XDG_CACHE_HOME:-$HOME/.cache}/zinit/snippets"
ZINIT[COMPLETIONS_DIR]="$HOME/.local/share/zinit/completions"

# Control where .zcompdump is written
ZINIT[ZCOMPDUMP_PATH]="${XDG_CACHE_HOME:-$HOME/.cache}/zsh/.zcompdump"

# Pass -C to compinit (skip insecure check) via zicompinit
ZINIT[COMPINIT_OPTS]=-C

# Where zinit.zsh itself lives
ZINIT[BIN_DIR]="$HOME/.local/share/zinit/zinit.git"

source "${ZINIT[BIN_DIR]}/zinit.zsh"
```

Available keys:

| Key | Default | Purpose |
|-----|---------|---------|
| `BIN_DIR` | `~/.local/share/zinit/zinit.git` | zinit source code |
| `HOME_DIR` | `~/.local/share/zinit` | base for all zinit data |
| `PLUGINS_DIR` | `$HOME_DIR/plugins` | cloned plugins |
| `SNIPPETS_DIR` | `$HOME_DIR/snippets` | downloaded snippets |
| `COMPLETIONS_DIR` | `$HOME_DIR/completions` | managed completion symlinks |
| `ZCOMPDUMP_PATH` | `~/.zcompdump` | compinit dump file |
| `COMPINIT_OPTS` | (empty) | extra flags to `compinit` |
| `MAN_DIR` | `$ZPFX/man` | man pages from plugins |
| `NO_ALIASES` | `0` | suppress `zi`/`zini` aliases |
| `MUTE_WARNINGS` | `0` | silence "already registered" warnings |

## Caveats

The old global variables (`$ZPLG_HOME`, `$ZPLG_PLUGINS_DIR`, etc.) from pre-migration zinit are removed. Use only the `ZINIT` hash.
