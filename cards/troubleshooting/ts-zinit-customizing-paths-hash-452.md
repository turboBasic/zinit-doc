---
id: ts-zinit-customizing-paths-hash-452
title: Customizing zinit directory paths using the ZINIT hash
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/452
related: []
---

## Summary

Zinit's working directories (plugins, snippets, completions, etc.) can all be customized via the `ZINIT` associative array. The old string variables (`$ZPLG_HOME`, etc.) were removed — only the hash form works.

## Symptom

Users migrating from older zinit installs may have `$ZPLG_HOME` or similar variables set, which are silently ignored. Zinit uses its defaults despite the variable being set.

## Fix / Workaround

Declare `ZINIT` as an associative array and set fields before sourcing `zinit.zsh`:

```zsh
declare -A ZINIT

# Common customizations
ZINIT[HOME_DIR]="$HOME/.zinit"
ZINIT[BIN_DIR]="$HOME/.zinit/bin"
ZINIT[PLUGINS_DIR]="$HOME/.zinit/plugins"
ZINIT[COMPLETIONS_DIR]="$HOME/.zinit/completions"
ZINIT[SNIPPETS_DIR]="$HOME/.zinit/snippets"
ZINIT[ZCOMPDUMP_PATH]="$HOME/.zcompdump"
ZINIT[COMPINIT_OPTS]="-C"   # skip compinit security check for faster startup
ZINIT[MUTE_WARNINGS]=1      # suppress "plugin already registered" warnings

source "${ZINIT[BIN_DIR]}/zinit.zsh"
```

Available hash fields:

| Field | Default | Purpose |
|---|---|---|
| `HOME_DIR` | `~/.local/share/zinit` | Parent of all zinit directories |
| `BIN_DIR` | `HOME_DIR/zinit.git` | Zinit source code |
| `PLUGINS_DIR` | `HOME_DIR/plugins` | Cloned plugins |
| `SNIPPETS_DIR` | `HOME_DIR/snippets` | Cached snippets |
| `COMPLETIONS_DIR` | `HOME_DIR/completions` | Managed completion symlinks |
| `ZCOMPDUMP_PATH` | `~/.zcompdump` | Path to compdump file |
| `COMPINIT_OPTS` | (empty) | Extra flags for `compinit` |
| `MUTE_WARNINGS` | (unset) | Set to `1` to suppress warnings |
| `NO_ALIASES` | (unset) | Set to `1` to disable zi/zplg aliases |

## Caveats

The `declare -A ZINIT` line must appear before `source zinit.zsh`. Setting fields after sourcing has no effect as zinit reads the hash only at startup.
