---
id: ts-egrep-deprecated-warning-375
title: "egrep: warning: egrep is obsolescent" during zinit update
category: troubleshooting
tags: [troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/375
related: []
---

## Summary

Running `zinit update --all` prints `egrep: warning: egrep is obsolescent; using grep -E` for each plugin on systems with GNU grep 3.8 or later. The warning clutters update output but does not cause failures.

## Symptom

```
Updating aperezdc/zsh-fzy
egrep: warning: egrep is obsolescent; using grep -E
Depuis https://github.com/aperezdc/zsh-fzy
Déjà à jour.
```

## Cause

Zinit's internal scripts called `egrep` directly. GNU grep 3.8 (released 2022) deprecated `egrep` and `fgrep` in favor of `grep -E` and `grep -F`. The warning is printed to stderr for each `egrep` invocation. Fixed in PR #372.

## Fix / Workaround

Update zinit to get the fix (all `egrep` calls replaced with `grep -E`):

```zsh
zinit self-update
```

The warning is cosmetic and does not affect functionality if you cannot update immediately.

## Caveats

Fedora Linux and Arch Linux were among the first distributions to ship GNU grep 3.8, so this warning appeared prominently on those systems first.
