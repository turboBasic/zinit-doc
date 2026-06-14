---
id: ts-build-ice-shorthand-458
title: Using build'' ice as shorthand for as'null' configure'' make'install'
category: troubleshooting
tags: [ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/458
related: [ts-configure-ice-prefix-zpfx-334, ts-configure-ice-build-systems-351]
---

## Summary

When building plugins from source using `as'null' configure'' make'install'`, the `build''` ice provides a single shorthand that enables all three. If `build''` ice has no effect, the annex providing it may not be installed.

## Symptom

Using `build''` ice produces no build output or the plugin is not compiled:

```zsh
zi id-as from"gitlab.matrix.org" build for matrix-org/olm
# Expected: ./configure && make && make install run automatically
# Actual: nothing happens, or "unknown ice: build"
```

## Cause

`build''` is a shorthand ice introduced in PR #458 that internally enables `as'null'`, `configure''`, and `make'install'`. It is only available in zinit versions that include this PR. Without it, users must specify the three ices manually.

## Fix / Workaround

Update zinit to get `build''` support:

```zsh
zinit self-update
```

Then use the shorthand:

```zsh
zi id-as from"gitlab.matrix.org" build for matrix-org/olm
```

If on an older zinit version, use the explicit form instead:

```zsh
zi id-as as"null" from"gitlab.matrix.org" configure make'install' for matrix-org/olm
```

To pass custom flags to `./configure`:

```zsh
zi id-as build"--enable-shared --disable-debug" for user/project
```

## Caveats

`build''` sets the install prefix to the plugin directory (not `$ZPFX`), which allows `zinit delete user/project --yes` to cleanly remove the built files. If you need system-wide installation at `$ZPFX`, use `configure'' make'install'` explicitly with `make"install PREFIX=$ZPFX"`.
