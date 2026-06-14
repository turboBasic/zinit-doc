---
id: ts-bpick-negation-unwanted-assets-449
title: Using bpick negation to exclude unwanted release assets
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/449
related: [ts-ghr-bpick-no-assets-476]
---

## Summary

When a GitHub release includes multiple assets with similar names (e.g. `dstask-linux-amd64` and `dstask-import-linux-amd64`), zinit may pick the wrong one. The `^` negation in `bpick` excludes matching assets, allowing the correct one to be selected.

## Symptom

Zinit downloads an `import` or debug binary instead of the main tool binary:

```
(Requesting `dbg-symbols-tmate-2.4.0-static-linux-amd64.tar.xz'…)
```

## Cause

Zinit's automatic asset scoring picks the first matching asset when multiple candidates score equally. If the unwanted asset name sorts before the desired one, it gets downloaded.

## Fix / Workaround

Use `^` in `bpick` to negate (exclude) assets whose names match the pattern:

```zsh
# Exclude anything with "import" in the name
zinit ice from"gh-r" sbin'dstask*->tsk' bpick'^*import*'
zinit light dstask/dstask
```

```zsh
# Exclude debug symbols for tmate
zinit ice from"gh-r" as"program" bpick'^*dbg*'
zinit light tmate-io/tmate
```

The `^` prefix inverts the glob match — only assets that do NOT match `*import*` are considered.

## Caveats

The `bpick` negation pattern `^*string*` works as a zsh glob negation when the `EXTENDED_GLOB` option is active, which zinit enables during its own processing. This does not require you to set `setopt EXTENDED_GLOB` in your `.zshrc`.
