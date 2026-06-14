---
id: ts-manpath-zpfx-man-missing-8
title: MANPATH does not include $ZPFX/man and the directory does not exist
category: troubleshooting
tags: [installation, troubleshooting, binary]
source: https://github.com/zdharma-continuum/zinit/issues/8
related: []
---

## Summary

After installing plugins that copy man pages to `$ZPFX/man`, the `man` command cannot find them because `$ZPFX/man` does not exist and is not in `$MANPATH`. Zinit did not originally create the `man` subdirectories automatically.

## Symptom

Man pages installed via `atclone"cp -vf ... $ZPFX/man/man1"` are not accessible via `man`. Running `man some-command` returns "No manual entry".

Checking `$ZPFX/man` finds the directory does not exist.

## Cause

Zinit created `$ZPFX` but did not create `$ZPFX/man/man{1..9}` subdirectories. Additionally, `$ZPFX/man` was not automatically added to `$MANPATH`.

## Fix / Workaround

Update zinit (`zinit self-update`) — PR #12 automated the creation of `$ZPFX/man/man{1..9}` at startup.

On older versions, create the directories and update `$MANPATH` manually in `.zshrc`:

```zsh
# Before sourcing zinit.zsh or after
mkdir -p "${ZPFX:-${HOME}/.local/share/zinit/polaris}/man/man"{1..9}
export MANPATH="${ZPFX:-${HOME}/.local/share/zinit/polaris}/man:${MANPATH}"
```

## Examples

```zsh
# Example: install gh CLI and its man pages to $ZPFX
zinit wait'0b' lucid for \
    id-as'github-cli' from"gh-r" sbin'usr/bin/gh' \
    atclone'ln -sf $PWD/usr/share/man/man1/* $ZPFX/man/man1' \
    atpull'%atclone' \
    cli/cli
```

## Caveats

`$ZPFX/bin` is automatically prepended to `$PATH` by zinit, but `$ZPFX/man` is not automatically added to `$MANPATH`. The manual `MANPATH` export is still needed unless your system's `manpath` configuration picks it up automatically.
