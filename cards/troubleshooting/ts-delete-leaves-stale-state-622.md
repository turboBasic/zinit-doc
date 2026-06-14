---
id: ts-delete-leaves-stale-state-622
title: "zinit delete does not unset plugin state variables"
category: troubleshooting
tags: [troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/622
related: []
---

## Summary

Running `zinit delete username/plugin` removed the plugin files but left internal zinit state variables set, causing incorrect output from commands like `zinit plugins` and `zinit status` until the shell was restarted.

## Symptom

After `zinit delete username/plugin`, the plugin still appears in `zinit plugins` output. The state only clears after `exec zsh`.

## Cause

The delete command did not call the variable-unsetting logic that clears plugin registration from the in-memory zinit state hash. File deletion succeeded but the runtime state was not updated.

## Fix / Workaround

Update zinit (fixed in PR #622, which adds proper state unsetting to the delete command):

```zsh
zinit self-update
```

As a temporary workaround, restart the shell after deleting a plugin:

```zsh
zinit delete username/plugin
exec zsh
```
