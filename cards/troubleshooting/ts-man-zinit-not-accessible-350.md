---
id: ts-man-zinit-not-accessible-350
title: "man zinit" command fails — man page not accessible
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/350
related: [ts-zpfx-manpage-wrong-dir-413]
---

## Summary

Zinit ships a `zinit.1` man page inside its git repository at `doc/zinit.1`, but it is not accessible via `man zinit` because it is not copied to a location in `$MANPATH`. Starting from PR #350 / #382, zinit copies the man page to `$ZPFX/man/man1/` on startup.

## Symptom

```
$ man zinit
No manual entry for zinit
```

## Cause

The man page exists in `$ZINIT[BIN_DIR]/doc/zinit.1` but this path is not in `$MANPATH`. After PR #350, zinit copies the man page to `$ZPFX/man/man1/zinit.1` when the shell starts, if the destination is absent or older than the source.

## Fix / Workaround

Update zinit and start a new shell — the man page will be copied automatically:

```zsh
zinit self-update
exec zsh
man zinit
```

If running an old version, copy manually:

```zsh
mkdir -p "$ZPFX/man/man1"
cp "${ZINIT[BIN_DIR]}/doc/zinit.1" "$ZPFX/man/man1/"
```

Ensure `$ZPFX/man` is in `$MANPATH`:

```zsh
# Add to .zshrc before sourcing zinit
export MANPATH="$ZPFX/man:$MANPATH"
```

## Caveats

`$ZPFX/man` is added to `$MANPATH` automatically by zinit only in newer versions. Explicitly setting it in `.zshrc` is safer.
