---
id: ts-installer-wrong-path-zshrc-689
title: "Installer writes wrong zinit.zsh path into .zshrc"
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/689
related: []
---

## Summary

The automatic installer appends `source ~/.local/share/zinit/zinit.zsh` to `.zshrc` but zinit is installed at `~/.local/share/zinit/zinit.git/zinit.zsh`, causing a "no such file or directory" error on every shell start.

## Symptom

```
/home/user/.zshrc:source:2: no such file or directory: /home/user/.local/share/zinit/zinit.zsh
```

## Cause

The installer wrote the legacy path (`zinit.zsh` directly under `zinit/`) instead of the correct path inside the `zinit.git` subdirectory.

## Fix / Workaround

Edit `.zshrc` and correct the source line:

```zsh
# Wrong (written by old installer)
source ~/.local/share/zinit/zinit.zsh

# Correct
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
source "${ZINIT_HOME}/zinit.zsh"
```

Or reinstall using the current installer which produces the correct snippet:

```bash
bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```
