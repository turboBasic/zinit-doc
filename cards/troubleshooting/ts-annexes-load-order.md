---
id: ts-annexes-load-order
title: Annexes must be loaded without turbo mode (synchronously)
category: troubleshooting
tags: [annex, turbo, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/256
related: [ts-update-hook-not-found-errors, ts-plugins-dir-already-exists-clone-error]
---

## Summary

Zinit annexes extend zinit with new hook functions and ices. They must be loaded synchronously (without `wait`) because plugins loaded later in the same session rely on annex hooks being available immediately.

## Question / Problem

Users sometimes put annexes in a `wait` turbo block to speed up the initial prompt. This causes all plugins loaded after the annexes — especially those using `sbin`, `cargo`, `dl`, and other annex-provided ices — to fail silently or produce hook-not-found errors.

## Answer / Solution

Always load annexes outside of any `wait` block:

```zsh
# Correct: synchronous, no wait ice
zinit light-mode for \
    zdharma-continuum/zinit-annex-bin-gem-node \
    zdharma-continuum/zinit-annex-patch-dl \
    zdharma-continuum/zinit-annex-rust \
    zdharma-continuum/zinit-annex-as-monitor

# Everything else can use turbo
zinit wait lucid for \
    ...
```

## Examples

The installer's default snippet includes exactly this pattern:

```zsh
# Load a few important annexes, without Turbo
# (this is currently required for annexes)
zinit light-mode for \
    zdharma-continuum/zinit-annex-rust \
    zdharma-continuum/zinit-annex-as-monitor \
    zdharma-continuum/zinit-annex-patch-dl \
    zdharma-continuum/zinit-annex-bin-gem-node
```

## Caveats

Annex hooks (the `∞zinit-*-hook` functions) are defined by the annex plugins when they are sourced. If they are deferred to turbo, they will not be available during synchronous plugin loading, and hooks will silently fail with exit code 127.
