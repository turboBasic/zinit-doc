---
id: ts-installer-zdotdir-path-missing-120
title: Installer writes zshrc path incorrectly when ZDOTDIR is set but ZSHRC is not
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/120
related: []
---

## Summary

When `$ZDOTDIR` is set and `$ZSHRC` is unset, the installer generated the wrong path for `.zshrc` — it evaluated to just `$ZDOTDIR` instead of `$ZDOTDIR/.zshrc`.

## Symptom

After running the installer with a custom `ZDOTDIR`, the zinit bootstrap code is appended to the wrong file, or the installer reports it wrote to the directory path rather than the `.zshrc` file inside it.

## Cause

The path-generation expression evaluated `${ZSHRC:-$ZDOTDIR}` without appending `/.zshrc`. The correct expression should be `${ZSHRC:-${ZDOTDIR}/.zshrc}`.

## Fix / Workaround

Update to a zinit release that contains the installer fix, then re-run the installer. Alternatively, set `ZSHRC` explicitly before running the installer:

```zsh
ZSHRC="${ZDOTDIR}/.zshrc" bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

If the installer already ran incorrectly, manually add the zinit bootstrap lines to `$ZDOTDIR/.zshrc`:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)" && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
```

## Caveats

This bug only manifests when `ZDOTDIR` is set to a non-default location and `ZSHRC` is not explicitly set. Standard installations with the default `$HOME/.zshrc` are unaffected.
