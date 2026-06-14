---
id: ts-make-uninstall-prefix-deletion-333
title: zinit delete does not clean up files installed with make to ZPFX
category: troubleshooting
tags: [ice, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/333
related: [ts-configure-ice-prefix-zpfx-334]
---

## Summary

Plugins built with `configure`/`make` that install to `$ZPFX` are not fully removed by `zinit delete`. The plugin's source directory is deleted but the installed binaries and library files in `$ZPFX` are left behind.

## Symptom

After `zinit delete some-project/tool`, the tool's binary is still present in `$ZPFX/bin/` and `$ZPFX/lib/`.

## Cause

`zinit delete` removes the plugin's cloned source directory. Files installed to `$ZPFX` via `make install PREFIX=$ZPFX` are outside the plugin directory and are not tracked by zinit's deletion logic.

As of PR #468, zinit calls `make uninstall` (if the `Makefile` has an `uninstall` target) before removing the plugin directory, which handles this case for compliant projects.

## Fix / Workaround

Update zinit to get the `make uninstall` support (PR #468):

```zsh
zinit self-update
```

For projects without an `uninstall` target, clean up manually:

```zsh
# Find and remove files installed to ZPFX by a specific plugin
# (check Makefile or build output for the installed file list)
rm -f "$ZPFX/bin/ctags"
rm -f "$ZPFX/share/man/man1/ctags.1"
```

To avoid the issue entirely, use `--prefix=$PWD` (the plugin directory) instead of `$ZPFX`:

```zsh
zinit ice configure'--prefix=$PWD' make
zinit light universal-ctags/ctags
```

With `--prefix=$PWD`, `zinit delete` removes everything since it's all inside the plugin directory.

## Caveats

`--prefix=$PWD` means `$ZPFX/bin` is not used. You must add the plugin's own `bin/` directory to `$PATH` using `as"program" pick"bin/*"` or the `sbin` ice from `zinit-annex-bin-gem-node`.

## Quality Notes

Related card from the same issue (#333): `ts-pkg-config-path-zpfx-333` covers a distinct problem — libraries installed to `$ZPFX` not being found by `pkg-config` during builds.
