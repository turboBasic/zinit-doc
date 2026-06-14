---
id: ts-musl-vs-gnu-bpick-527
title: Preferring musl binaries over GNU with bpick and conditional logic
category: troubleshooting
tags: [ice, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/527
related: []
---

## Summary
Zinit's `bpick` does not support fallback logic natively. Selecting musl vs GNU binaries requires platform detection in the ice or using separate plugin stanzas with `if''` conditions.

## Question / Problem
The user wanted to prefer musl binaries on Linux when available, fall back to GNU otherwise, and use default behavior on macOS.

## Answer / Solution
Use `if''` conditions to switch `bpick` based on OS detection:

```zsh
# Linux: prefer musl, GNU as fallback
zinit ice from"gh-r" as"null" sbin \
    if"[[ $OSTYPE == linux* ]]" \
    bpick"*musl*"
zinit light some/tool

# macOS: default auto-detection
zinit ice from"gh-r" as"null" sbin \
    if"[[ $OSTYPE == darwin* ]]"
zinit light some/tool
```

Or use a variable set conditionally before the zinit block:

```zsh
if [[ $OSTYPE == linux* ]]; then
    BPICK_FILTER="*musl*"
else
    BPICK_FILTER=""
fi

zinit ice from"gh-r" as"null" sbin bpick"${BPICK_FILTER:-*}"
zinit light some/tool
```

## Caveats
An empty `bpick` value or `bpick"*"` lets zinit's auto-detection choose the asset. Zinit uses OS and architecture heuristics to pick the best match when `bpick` is not set. The musl preference pattern is most useful on minimal Linux environments (Alpine, containers) where glibc may not be available.
