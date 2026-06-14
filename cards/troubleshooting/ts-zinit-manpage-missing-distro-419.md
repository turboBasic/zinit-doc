---
id: ts-zinit-manpage-missing-distro-419
title: man zinit fails when zinit.1 is absent from the distribution package
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/419
related: [ts-man-zinit-not-accessible-350, ts-zpfx-manpage-wrong-dir-413]
---

## Summary

On distributions that install zinit from a package manager (e.g. NixOS), the `doc/zinit.1` man page may not be included in the distributed package. Zinit's startup script that copies it to `$ZPFX/man/man1/` then fails silently or with an error because the source file does not exist.

## Symptom

```
man zinit
No manual entry for zinit
```

Or on startup after a zinit package install:

```
cp: cannot stat '$ZINIT[BIN_DIR]/doc/zinit.1': No such file or directory
```

## Cause

Some distribution packages (e.g. the NixOS `zinit` derivation) omit `doc/zinit.1` from the installed share. PR #419 added a guard to zinit's startup code to only attempt the copy if `doc/zinit.1` exists, preventing the error. The man page still won't be accessible unless the distro package ships it.

## Fix / Workaround

Update zinit to eliminate the startup error (the guard in PR #419):

```zsh
zinit self-update
```

To get the man page on a system where the package doesn't include it, download it manually from the zinit repository:

```zsh
mkdir -p "$ZPFX/man/man1"
curl -fsSL \
  "https://raw.githubusercontent.com/zdharma-continuum/zinit/main/doc/zinit.1" \
  -o "$ZPFX/man/man1/zinit.1"
```

Ensure `$ZPFX/man` is in `$MANPATH`:

```zsh
# In .zshrc before sourcing zinit
export MANPATH="$ZPFX/man:${MANPATH}"
```

## Caveats

If zinit is managed by a distribution package manager (NixOS, Homebrew, etc.) rather than installed via the standard install script, `zinit self-update` may not work or may be overridden by the package manager. In that case, use the manual download workaround or report the missing file to the distribution package maintainer.
