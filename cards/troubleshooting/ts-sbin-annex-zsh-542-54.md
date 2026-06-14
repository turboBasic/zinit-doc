---
id: ts-sbin-annex-zsh-542-54
title: sbin annex creates no shims on zsh 5.4.2 or older
category: troubleshooting
tags: [annex, binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/41
related: []
---

## Summary

On systems with zsh 5.4.2 (e.g. CentOS 7), the `sbin` ice from `zinit-annex-bin-gem-node` fails silently — no shim is created in `$ZPFX/bin`, and when deleting the plugin zinit warns that the shim doesn't exist.

## Symptom

```
bin-gem-node annex: The fzf shim didn't exist in $ZPFX/bin (or isn't a regular file)
```

After loading a plugin with `sbin"fzf"`, the shim file is not present in `$ZPFX/bin`.

## Cause

The `zinit-annex-bin-gem-node` annex uses zsh features or syntax that require zsh 5.5 or later. On zsh 5.4.2, the annex's internal logic silently fails to create the shim without reporting an error.

## Fix / Workaround

Upgrade zsh to at least version 5.5. The zinit installer checks for zsh 5.5.1 as a minimum recommended version.

On systems locked to an older zsh (e.g. CentOS 7 with zsh 5.0.2 or 5.4.2), use `as"program"` with `pick` as a workaround instead of `sbin`:

```zsh
zinit wait lucid from"gh-r" as"program" pick"fzf" for \
    @junegunn/fzf
```

Or install a newer zsh via a package manager, zinit pack, or compile from source:

```zsh
zinit pack'5.9' for zsh
```

## Caveats

Zinit itself also works better on zsh 5.5+. Many annex features are untested on older versions. CentOS 7 ships zsh 5.0.2, which is particularly problematic.
