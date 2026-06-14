---
id: ts-mandir-not-in-manpath-12
title: Custom ZINIT[MAN_DIR] is not automatically added to manpath
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/12
related: []
---

## Summary

Zinit creates `$ZINIT[MAN_DIR]` (default `$ZPFX/man`) and its subdirectories automatically, but overriding `ZINIT[MAN_DIR]` to a custom path does not cause that path to be added to `$MANPATH`.

## Symptom

After setting `ZINIT[MAN_DIR]=/custom/path/man` and installing plugins that copy manpages there, `man <plugin-command>` reports "No manual entry". The manpages exist on disk but `man` cannot find them.

## Cause

Zinit creates the directory tree but does not modify `$MANPATH`. The default `$ZPFX/man` is typically added to `MANPATH` automatically via `$ZPFX` conventions, but a custom path is not.

## Fix / Workaround

Explicitly add the custom man directory to `MANPATH` in `.zshrc` before or after sourcing zinit:

```zsh
typeset -A ZINIT
ZINIT[MAN_DIR]="$HOME/.local/man"
export MANPATH="$HOME/.local/man:$MANPATH"
source "${ZINIT[BIN_DIR]}/zinit.zsh"
```

Or, keep the default `$ZPFX/man` and ensure `$ZPFX/man` is in `MANPATH`:

```zsh
export MANPATH="$ZPFX/man:$MANPATH"
```

## Caveats

On systems where `manpath` auto-detects directories (e.g., via `/etc/manpath.config`), adding the directory to that config is an alternative to setting `$MANPATH` per-user.
