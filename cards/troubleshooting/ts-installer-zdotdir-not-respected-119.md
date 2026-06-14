---
id: ts-installer-zdotdir-not-respected-119
title: Install script ignores ZDOTDIR and writes to HOME/.zshrc
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/119
related: []
---

## Summary

When `$ZDOTDIR` is set (e.g. to `~/.config/zsh`), the zinit installer writes its bootstrap lines to `$HOME/.zshrc` instead of `$ZDOTDIR/.zshrc`, or fails with a "Is a directory" error.

## Symptom

```
sh: 214: cannot create /home/username/.zsh: Is a directory
```

Or: the installer succeeds but writes to `~/.zshrc` even though `$ZDOTDIR` is set, leaving the actual config file untouched.

## Cause

The installer computed the `.zshrc` path using `${ZDOTDIR:-$HOME}` but concatenated without the trailing `/.zshrc` in certain code paths, resulting in a path like `$ZDOTDIR` instead of `$ZDOTDIR/.zshrc`.

## Fix / Workaround

Update zinit and re-run the installer — fixed in PR #120.

On an older installer, set `$ZSHRC` explicitly before running:

```zsh
ZSHRC="${ZDOTDIR}/.zshrc" bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

Or manually append the bootstrap block to `$ZDOTDIR/.zshrc` after running the installer.

## Caveats

After installation the installer adds three lines to `.zshrc`. If you used the workaround or manual append, verify there are no duplicates in your config file.
