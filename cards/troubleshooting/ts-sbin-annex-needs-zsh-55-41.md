---
id: ts-sbin-annex-needs-zsh-55-41
title: sbin annex shims not created on zsh 5.4.2 (Ubuntu 18.04)
category: troubleshooting
tags: [annex, binary, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/41
related: [ts-rust-annex-global-array-old-zsh-19]
---

## Summary

On Ubuntu 18.04 with zsh 5.4.2, the `sbin` ice from `zinit-annex-bin-gem-node` does not create shim files in `$ZPFX/bin`. On plugin deletion, zinit warns the shim never existed.

## Symptom

```
bin-gem-node annex: The fzf shim didn't exist in $ZPFX/bin (or isn't a regular file)
```

Commands installed via `sbin` (e.g. `fzf`, `fd`, `bat`) are not available in `$PATH`.

## Cause

The `zinit-annex-bin-gem-node` annex requires zsh 5.5 or later. On zsh 5.4.2, the shim creation logic silently fails due to associative array or function-scoping behavior not available in 5.4.x.

## Fix / Workaround

Upgrade to zsh 5.5.1 or later. On Ubuntu 18.04, install from a PPA or compile from source. Alternatively, install a pre-built static binary with zinit:

```zsh
zinit pack for zsh-bin
```

## Caveats

Zinit's minimum supported version is zsh >= 5.3, but several annexes (including `zinit-annex-bin-gem-node` for `sbin`) require >= 5.5.1. Check the annex README for version requirements.

## See Also

- ts-rust-annex-global-array-old-zsh-19
