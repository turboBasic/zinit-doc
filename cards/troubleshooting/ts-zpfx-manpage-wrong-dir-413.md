---
id: ts-zpfx-manpage-wrong-dir-413
title: zinit.1 man page installed to wrong directory when ZPFX is customized
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/413
related: []
---

## Summary

When `$ZPFX` is set to a custom value (e.g. `~/.local`), the `zinit.1` man page is still installed to the default `~/.local/share/zinit/polaris/man/man1/` instead of `$ZPFX/man/man1/`.

## Symptom

After setting a custom `$ZPFX`:

```zsh
ZPFX="$HOME/.local"
zinit id-as depth'1' null for zdharma-continuum/zinit
```

The man page appears at `~/.local/share/zinit/polaris/man/man1/zinit.1` instead of `~/.local/man/man1/zinit.1`.

## Cause

The man page copy logic in zinit was hardcoded to use the default ZPFX path rather than the runtime `$ZPFX` variable.

## Fix / Workaround

Copy the man page manually to the correct location:

```zsh
mkdir -p "$ZPFX/man/man1"
cp "$ZINIT[BIN_DIR]/doc/zinit.1" "$ZPFX/man/man1/zinit.1"
```

Then ensure `$ZPFX/man` is in `$MANPATH`:

```zsh
export MANPATH="$ZPFX/man:$MANPATH"
```

## Caveats

Set `$ZPFX` before sourcing `zinit.zsh` using the hash form to ensure all paths are resolved correctly:

```zsh
declare -A ZINIT
ZINIT[HOME_DIR]="${XDG_DATA_HOME:-$HOME/.local/share}/zinit"
export ZPFX="$HOME/.local"
source "${ZINIT[HOME_DIR]}/zinit.git/zinit.zsh"
```
