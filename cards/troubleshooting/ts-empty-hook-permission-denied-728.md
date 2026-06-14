---
id: ts-empty-hook-permission-denied-728
title: "permission denied errors from empty annex hook handlers"
category: troubleshooting
tags: [annex, plugin, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/728
related: []
---

## Summary

When certain annexes (e.g. `zinit-annex-as-monitor`, `zinit-annex-bin-gem-node`) are loaded, shell startup produces multiple `permission denied:` errors because zinit tries to execute empty hook handler strings.

## Symptom

```
.zinit-load:25: permission denied:
.zinit-load:25: permission denied:
.zinit-load-snippet:63: permission denied:
.zinit-load-snippet:63: permission denied:
```

These errors appear during every shell startup without affecting actual plugin functionality.

## Cause

In `.zinit-load()` (line ~1650) and `.zinit-load-snippet()` (line ~1446), the code executed `"${___arr[5]}"` and `"${arr[5]}"` without checking whether those array elements were non-empty. When annexes don't provide a hook handler, the array element is empty, and the shell interprets executing an empty string as a permission error.

## Fix / Workaround

Update zinit to a version containing the fix from PR #729:

```zsh
zinit self-update
```

As a temporary workaround while on an older version, suppress the errors by redirecting stderr for the zinit source line — though this is not recommended as it hides real errors:

```zsh
source "${ZINIT_HOME}/zinit.zsh" 2>/dev/null
```
