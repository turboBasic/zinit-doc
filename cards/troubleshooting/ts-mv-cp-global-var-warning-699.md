---
id: ts-mv-cp-global-var-warning-699
title: "scalar parameter pair created globally warning during mv/cp ice operations"
category: troubleshooting
tags: [ice, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/699
related: []
---

## Summary

Using the `mv` or `cp` ice produces a zsh warning `scalar parameter pair created globally in function ∞zinit-file-cp-mv-operation` because the `pair` variable was not declared local in that function.

## Symptom

```
∞zinit-file-cp-mv-operation:16: scalar parameter pair created globally in function ∞zinit-file-cp-mv-operation
```

The warning appears when a plugin with a `mv` or `cp` ice is loaded or updated, but the operation still succeeds.

## Cause

The `pair` variable inside `∞zinit-file-cp-mv-operation` was not declared with `local`, causing zsh's `LOCAL_LOOPS`/`WARN_CREATE_GLOBAL` option (or strict mode) to emit a warning.

## Fix / Workaround

Update zinit (fixed in PR #699):

```zsh
zinit self-update
```

No configuration change is needed; the fix is a one-line `local pair` addition in the function.
