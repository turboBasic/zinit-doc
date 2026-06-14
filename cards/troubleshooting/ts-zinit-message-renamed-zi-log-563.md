---
id: ts-zinit-message-renamed-zi-log-563
title: "+zinit-message renamed to +zi-log in annexes and plugins"
category: troubleshooting
tags: [annex, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/issues/563
related: []
---

## Summary

The internal Zinit logging function `+zinit-message` was renamed to `+zi-log`. Community plugins and annexes using the old name still work via a compatibility shim, but new code should use `+zi-log`.

## Symptom

Custom annexes or community plugins calling `+zinit-message` may produce warnings in newer Zinit versions, or log calls may silently route through a compatibility wrapper.

## Cause

Refactor renamed the function for consistency. A compatibility forward (`+zinit-message` calls `+zi-log`) was maintained for existing code.

## Fix / Workaround

If you maintain an annex or plugin that calls `+zinit-message`, update it to use `+zi-log`:

```zsh
# Old
+zinit-message "{info}Loading plugin{rst}"

# New
+zi-log "{info}Loading plugin{rst}"
```

The compatibility shim remains in place so old code continues to work, but `+zi-log` is the canonical function going forward.
