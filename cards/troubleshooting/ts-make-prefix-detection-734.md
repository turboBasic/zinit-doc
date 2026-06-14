---
id: ts-make-prefix-detection-734
title: make ice PREFIX detection fails for Makefile variables using ?= assignment
category: troubleshooting
tags: [troubleshooting, ice, installation]
source: https://github.com/zdharma-continuum/zinit/issues/734
related: [ts-make-ice-value-ignored-735]
---

## Summary

The `zinit-make-base-hook` detects whether a Makefile accepts `PREFIX` by grepping for `PREFIX =` (with `=`), but many Makefiles use `PREFIX ?=` (conditional assignment). The detection fails and `$ZPFX` is not passed to `make`.

## Symptom

Software installs to the system default prefix (e.g. `/usr/local`) instead of `$ZPFX` (`~/.local/share/zinit/polaris`). Affects projects like `tj/git-extras` that use `PREFIX ?=`.

## Cause

The grep pattern `grep -w -- "PREFIX =" ${dir}/[Mm]akefile` only matches `=` and not `?=`, `+=`, or `:=` assignment forms.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/734

Workaround: pass PREFIX explicitly via `atclone`/`atpull` instead of relying on `make''` auto-detection:

```zsh
zinit ice as"program" pick"$ZPFX/bin/git-*" \
    atclone"make PREFIX=$ZPFX install" atpull"%atclone"
zinit light tj/git-extras
```

## See Also

- ts-make-ice-value-ignored-735
