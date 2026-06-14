---
id: ts-ghr-i686-selected-x86-64-225
title: gh-r downloads i686 (32-bit) binary on x86_64 system
category: troubleshooting
tags: [binary, installation, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/225
related: []
---

## Summary

On x86_64 Linux systems, `from"gh-r"` incorrectly selects i686 (32-bit) release assets instead of the x86_64 binary. This was introduced by a commit that changed the gh-r asset-selection logic and failed to exclude i686 from x86_64 matches.

## Symptom

```
fd: no such file or directory: /home/user/.local/share/zinit/plugins/sharkdp---fd/fd-v8.3.2-i686-unknown-linux-gnu/fd
```

The plugin directory contains the `i686` variant of the binary rather than `x86_64`.

## Cause

The gh-r asset-selection regex did not explicitly filter out `i686` assets when running on an x86_64 host. Because `i686` appears before `x86_64` in some release asset lists, it was picked first.

## Fix / Workaround

Update zinit (`zinit self-update`) — the fix was released in PR #226 / #235. After updating, delete the plugin and reinstall:

```zsh
zinit delete sharkdp/fd
zinit update sharkdp/fd
```

To pin explicitly to the correct asset in the meantime, use `bpick`:

```zsh
zinit wait lucid for from"gh-r" as"null" bpick"*x86_64*linux*" sbin"**/fd" @sharkdp/fd
```

## Caveats

The automatic architecture detection relies on `$MACHTYPE` and `$OSTYPE`. On systems where these are set unexpectedly (e.g. some WSL environments), `bpick` is the safest override.
