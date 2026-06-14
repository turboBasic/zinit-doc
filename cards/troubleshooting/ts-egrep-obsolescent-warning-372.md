---
id: ts-egrep-obsolescent-warning-372
title: zinit outputs "egrep is obsolescent" warnings during update
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/375
related: []
---

## Summary
On systems with GNU grep 3.8+, `zinit update --all` prints deprecation warnings because zinit internally used `egrep` instead of `grep -E`.

## Symptom
During `zinit update --all`, for every plugin that has output processed:

```
egrep: warning: egrep is obsolescent; using grep -E
```

The warnings are harmless but noisy.

## Cause
GNU grep 3.8 deprecated the `egrep` and `fgrep` command aliases. Zinit's update code contained `egrep` invocations. Fixed in PR #372 by replacing all `egrep` with `grep -E`.

## Fix / Workaround
Update zinit to include PR #372 (`zinit self-update`).

On systems where you cannot update zinit immediately, the warnings are cosmetic only — all functionality continues to work.
