---
id: ts-rust-annex-global-array-old-zsh-19
title: za-rust-atclone-handler "array parameter created globally in function" error
category: troubleshooting
tags: [annex, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/19
related: []
---

## Summary

On zsh 5.0.2 (e.g. CentOS 7), loading any plugin or theme produces a `za-rust-atclone-handler:8: array parameter za_rust_ef created globally in function` warning and neither themes nor plugins load correctly. This is a zsh version compatibility issue with the rust annex.

## Symptom

```
za-rust-atclone-handler:8: array parameter za_rust_ef created globally in function
```

Every plugin and theme fails to load. The user has no root privileges and cannot upgrade zsh system-wide.

## Cause

The `zinit-annex-rust` handler uses `local` array parameter declarations in a way that is not supported by zsh 5.0.x. Zsh 5.0.2 does not allow `local` array parameters inside functions in certain contexts, emitting the global-creation warning and then failing.

## Fix / Workaround

The root cause is an incompatible zsh version. Options:

1. **Do not load zinit-annex-rust** on old zsh systems. Remove it from the annex list:

```zsh
zinit light-mode for \
    zdharma-continuum/zinit-annex-bin-gem-node \
    zdharma-continuum/zinit-annex-patch-dl
    # omit zinit-annex-rust
```

2. **Install a newer zsh** without root via zinit's zsh package (requires a working zinit first):

```zsh
zinit pack'5.9' for zsh
```

3. On CentOS 7 without root, compile zsh from source or use a container.

## Caveats

Zsh 5.0.2 is very old (2012). Many modern zinit features and annexes require 5.5+. This error specifically affects the rust annex's `atclone` handler.
