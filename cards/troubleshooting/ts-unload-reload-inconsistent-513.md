---
id: ts-unload-reload-inconsistent-513
title: zinit unload/load cycle leaves plugin in inconsistent state on second unload
category: troubleshooting
tags: [troubleshooting, plugin, command]
source: https://github.com/zdharma-continuum/zinit/issues/513
related: []
---

## Summary

After `zinit load` → `zinit unload` → `zinit load` → `zinit unload`, the plugin is not cleanly unloaded on the second cycle. The report shows duplicate registrations and ZLE widget conflicts.

## Symptom

The second `zinit unload` produces warnings about widgets that were already unregistered, or ZLE widget bindings remain after unload. The report shows "Note: a new widget" entries suggesting widgets were registered multiple times.

## Cause

The unload mechanism tracks what was registered during a single load session. On reload, registration tracking may not correctly account for previously-existing state, causing double-registration that the unload code cannot cleanly undo.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/513

If you need reliable load/unload cycling, delete and reinstall the plugin instead:

```zsh
zinit delete --yes user/plugin
zinit load user/plugin
```

For toggling plugin functionality, consider using the `trigger-load` ice instead of manual load/unload cycles.
