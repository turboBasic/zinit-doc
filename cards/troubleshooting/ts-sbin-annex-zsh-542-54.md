---
id: ts-sbin-annex-zsh-542-54
title: sbin annex creates no shims on zsh 5.4.2 or older
category: troubleshooting
tags: [annex, binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/41
related: [ts-rust-annex-global-array-old-zsh-19]
---

## Summary

On systems with zsh 5.4.2 or older (e.g. CentOS 7, Ubuntu 18.04), the `sbin` ice from `zinit-annex-bin-gem-node` fails silently — no shim is created in `$ZPFX/bin`, and when deleting the plugin zinit warns that the shim doesn't exist.

## Symptom

```
bin-gem-node annex: The fzf shim didn't exist in $ZPFX/bin (or isn't a regular file)
```

After loading a plugin with `sbin"fzf"`, the shim file is not present in `$ZPFX/bin`. Commands installed via `sbin` (e.g. `fzf`, `fd`, `bat`) are not available in `$PATH`.

## Cause

The `zinit-annex-bin-gem-node` annex requires zsh 5.5 or later. On zsh 5.4.2, the shim creation logic silently fails due to associative array or function-scoping behavior not available in 5.4.x.

## Fix / Workaround

Upgrade to zsh 5.5.1 or later. On Ubuntu 18.04, install from a PPA or compile from source. Alternatively, install a pre-built static zsh binary with zinit:

```zsh
zinit pack for zsh-bin
```

On systems locked to an older zsh (e.g. CentOS 7 with zsh 5.0.2 or 5.4.2), use `as"program"` with `pick` as a workaround instead of `sbin`:

```zsh
zinit wait lucid from"gh-r" as"program" pick"fzf" for \
    @junegunn/fzf
```

Or install a specific zsh version via zinit pack:

```zsh
zinit pack'5.9' for zsh
```

## Caveats

Zinit's minimum supported version is zsh >= 5.3, but several annexes (including `zinit-annex-bin-gem-node` for `sbin`) require >= 5.5.1. Check the annex README for version requirements. CentOS 7 ships zsh 5.0.2, which is particularly problematic. Many annex features are untested on older versions.
