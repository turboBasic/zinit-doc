---
id: ts-bpick-tmate-dbg-symbols-358
title: bpick selects debug-symbols release asset instead of main binary
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/358
related: [ts-bpick-negation-unwanted-assets-449, ts-ghr-bpick-asset-filtered-before-bpick-385]
---

## Summary
When a GitHub repository publishes both a debug-symbols archive and the real binary archive with similar names, `bpick` may select the debug-symbols asset instead of the intended binary.

## Symptom
With `bpick'tmate*static-linux-amd64.tar.xz'`, zinit downloads `dbg-symbols-tmate-2.4.0-static-linux-amd64.tar.xz` instead of `tmate-2.4.0-static-linux-amd64.tar.xz`. The downloaded binary is unusable.

## Cause
Both asset names match the `bpick` glob pattern. Zinit picks the first match, which alphabetically is the `dbg-symbols-*` variant.

## Fix / Workaround
Use `bpick` negation with `^` to exclude unwanted patterns, or use a more specific pattern that only matches the real binary:

```zsh
# Exclude debug symbols variant with negation
zi ice from"gh-r" as"program" bpick'^*dbg*' extract
zi light tmate-io/tmate

# OR use a more specific positive pattern
zi ice from"gh-r" as"program" bpick"tmate-[0-9]*-static-linux-amd64.tar.xz" extract
zi light tmate-io/tmate
```

The `^` prefix in `bpick` acts as a negation: assets matching the pattern are excluded, and the remaining asset is selected.
