---
id: ts-xdg-default-install-dir-40
title: Default zinit install directory changed from ~/.zinit to XDG_DATA_HOME
category: troubleshooting
tags: [installation, migration, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/40
related: []
---

## Summary

The default zinit installation directory changed from `$HOME/.zinit/bin` to `$XDG_DATA_HOME/zinit/zinit.git` (i.e., `~/.local/share/zinit/zinit.git`). Existing installations at the old path continue to work but new installs land in the XDG location.

## Symptom

After re-running the installer or following new documentation, zinit is installed at `~/.local/share/zinit/zinit.git` while the existing `.zshrc` still sources from `~/.zinit/bin/zinit.zsh`. The shell may load the wrong or stale copy, or fail to find zinit.

## Cause

The installer was updated to follow XDG Base Directory conventions. The old default (`~HOME/.zinit`) cluttered the home directory root.

## Fix / Workaround

Option 1 — migrate the existing install to the new location:

```zsh
# Move the existing install
mkdir -p ~/.local/share/zinit
mv ~/.zinit/bin ~/.local/share/zinit/zinit.git

# Update .zshrc
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
source "${ZINIT_HOME}/zinit.zsh"
```

Option 2 — keep the old path by setting `ZINIT[BIN_DIR]` before sourcing:

```zsh
typeset -A ZINIT
ZINIT[BIN_DIR]="$HOME/.zinit/bin"
source "${ZINIT[BIN_DIR]}/zinit.zsh"
```

## Caveats

Plugin and snippet data directories follow `ZINIT[HOME_DIR]`. If only `BIN_DIR` is moved, existing plugins at `~/.zinit/plugins` remain accessible as long as `HOME_DIR` is also set correctly.
