---
id: ts-annex-exclamation-hook-broken-399
title: Annex hooks registered with exclamation mark (!) do not fire
category: troubleshooting
tags: [annex, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/399
related: []
---

## Summary

Zinit annexes that register hooks using `!` (e.g. `atpull!`) via `ZINIT_EXTS` stop working after a certain version. The exclamation mark in the hook name was being escaped incorrectly, causing the registration to fail silently.

## Symptom

An annex's `atpull!` or other `!`-prefixed hooks do not execute when updating plugins. The annex itself loads without error, but its hooks are never invoked.

## Cause

PR #227 fixed exclamation mark handling for normal hooks by adding entries to `ZINIT_EXTS2`. However, when annexes registered hooks with `!` directly into `ZINIT_EXTS`, the escaping fix was not applied to that code path. The history expansion characters (`!`) caused the registration string to be mis-processed. Fixed in PR #399.

## Fix / Workaround

Update zinit and the affected annex:

```zsh
zinit self-update
zinit update zdharma-continuum/zinit-annex-patch-dl  # or the affected annex
exec zsh
```

## Caveats

This only affects annexes that explicitly register `!`-hooks via `ZINIT_EXTS`. Standard ice mods (`atpull!`, `make!`) are not affected by this bug.
