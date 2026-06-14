---
id: ts-pkg-config-path-zpfx-333
title: Libraries installed to ZPFX not found by pkg-config during builds
category: troubleshooting
tags: [ice, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/333
related: [ts-configure-ice-prefix-zpfx-334]
---

## Summary

When building C/C++ tools with zinit's `configure`/`make` ices, dependencies installed to `$ZPFX` are not found by `pkg-config` or autotools, causing build failures. Adding `$ZPFX/lib/pkg-config` to `$PKG_CONFIG_PATH` resolves this.

## Symptom

Building a tool that depends on a library previously installed to `$ZPFX`:

```
checking for pcre2... no
configure: error: Package requirements (libpcre2-8) were not met
```

Even though `pcre2` was previously installed to `$ZPFX` by zinit.

## Cause

`pkg-config` searches `$PKG_CONFIG_PATH` for `.pc` files. Libraries installed to `$ZPFX` place their `.pc` files in `$ZPFX/lib/pkg-config`, which is not in the default `$PKG_CONFIG_PATH`. Starting from PR #333, zinit appends `$ZPFX/lib/pkg-config` to `$PKG_CONFIG_PATH` automatically.

## Fix / Workaround

Update zinit to get the automatic `$PKG_CONFIG_PATH` setup:

```zsh
zinit self-update
```

Or add it manually to `.zshrc` (before sourcing zinit or in the zinit config):

```zsh
export PKG_CONFIG_PATH="$ZPFX/lib/pkg-config:$PKG_CONFIG_PATH"
```

## Caveats

`$ZPFX` defaults to `~/.local/share/zinit/polaris`. If you set a custom `$ZPFX`, the path is updated accordingly.

## Quality Notes

Related card from the same issue (#333): `ts-make-uninstall-prefix-deletion-333` covers a distinct problem — `zinit delete` not cleaning up files installed to `$ZPFX` via `make install`.
