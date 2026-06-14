---
id: ts-xdg-home-dir-default-changed-95
title: zinit home directory changed from ~/.zinit to XDG_DATA_HOME/zinit
category: troubleshooting
tags: [installation, migration, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/95
related: []
---

## Summary

In PR #95, zinit's default `HOME_DIR` changed from `~/.zinit` to `${XDG_DATA_HOME:-~/.local/share}/zinit`. Users migrating from the old default path will find zinit looking for data in a new location, requiring a migration step.

## Symptom

After updating zinit, the shell starts with warnings about missing plugins or zinit fails to find its data because it now looks in `~/.local/share/zinit` while all data is in `~/.zinit`.

## Cause

The installer and zinit source were updated to follow XDG Base Directory Specification. The default changed from `$HOME/.zinit` to `$XDG_DATA_HOME/zinit` (which defaults to `$HOME/.local/share/zinit`).

## Fix / Workaround

**Option 1 — Move existing data:**

```zsh
mv ~/.zinit ~/.local/share/zinit
```

Update any hardcoded paths in `.zshrc`.

**Option 2 — Override to keep the old path:**

```zsh
# In .zshrc, before sourcing zinit.zsh:
declare -A ZINIT
ZINIT[HOME_DIR]="$HOME/.zinit"
source "${ZINIT[HOME_DIR]}/bin/zinit.zsh"
```

**Option 3 — Fresh install (recommended):**

Delete the old directory and re-run the installer, which will use the new default path and update `.zshrc` automatically.

## Caveats

The `$ZPLG_HOME` and similar old-style string variables were removed. Only the `$ZINIT` hash is supported for path customization. Set `ZINIT[HOME_DIR]` before sourcing `zinit.zsh`.
