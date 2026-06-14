---
id: ts-annex-exclamation-hook-not-firing-399
title: Annex hooks with ! prefix do not fire (registered into wrong hash)
category: troubleshooting
tags: [annex, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/399
related: []
---

## Summary
Annexes that register hooks with a `!` prefix (e.g. `hook:!atclone-20`) for pre-execution ordering did not fire because the fix for `!` handling only patched `ZINIT_EXTS2` but missed `ZINIT_EXTS` where annex hooks are registered.

## Symptom
An annex hook that should run before `atclone`/`atpull` (indicated by `!` prefix in the hook name) does not execute. For example, `zinit-annex-patch-dl` patch hooks fail to apply before the build step, causing build failures.

## Cause
PR #227 fixed `!` mark handling for normal hooks stored in `ZINIT_EXTS2` but did not modify the annex hook registration path that writes into `ZINIT_EXTS`. The `!` character was also subject to shell history expansion in that code path. Fixed in PR #399.

## Fix / Workaround
Update zinit and the affected annex:

```zsh
zinit self-update
zinit update zdharma-continuum/zinit-annex-patch-dl  # or the affected annex
exec zsh
```

## Examples

```zsh
# After fix, patch-dl hooks correctly fire before atclone:
zi ice dl'https://example.com/patch.diff' patch'patch.diff' atclone'./configure'
zi light user/project
```

## Caveats
This fix is specifically required for annexes that explicitly register pre-execution hooks with `!` via `ZINIT_EXTS`. Standard ice mods (`atclone`, `atpull`, `make!`) are not affected by this bug.
