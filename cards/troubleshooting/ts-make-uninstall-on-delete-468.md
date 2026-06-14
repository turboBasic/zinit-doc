---
id: ts-make-uninstall-on-delete-468
title: zinit delete leaves compiled files in ZPFX when plugin uses make install
category: troubleshooting
tags: [ice, troubleshooting, installation, command]
source: https://github.com/zdharma-continuum/zinit/issues/468
related: [ts-make-uninstall-prefix-deletion-333]
---

## Summary
When a plugin is built with `make"install PREFIX=$ZPFX"`, running `zinit delete` removes the plugin source directory but leaves compiled binaries and data files scattered throughout `$ZPFX`. PR #468 added automatic `make uninstall` invocation before directory removal.

## Symptom
After `zinit delete -y universal-ctags/ctags`, binaries like `ctags` remain at `$ZPFX/bin/ctags` and data files remain under `$ZPFX/share/`. Re-installing creates conflicts; removing and reinstalling requires manual cleanup of `$ZPFX`.

## Cause
`zinit delete` only removed the plugin source/clone directory. It had no mechanism to reverse the effects of `make install` into `$ZPFX`.

## Fix / Workaround
Update zinit to a version that includes PR #468 (`zinit self-update`). The updated `zinit delete` now checks for a `Makefile` with an `uninstall` target and runs `make -C {dir} uninstall` before removing the directory.

For plugins installed before this fix, clean up manually:

```zsh
# Run uninstall from within the plugin directory before deleting
cd ~/.local/share/zinit/plugins/universal-ctags---ctags
make uninstall
zinit delete -y universal-ctags/ctags
```

## Examples

```zsh
# Plugin with PREFIX-based install — delete now runs make uninstall automatically
zi ice configure make"install"
zi light universal-ctags/ctags

# To cleanly remove:
zinit delete -y universal-ctags/ctags
```
