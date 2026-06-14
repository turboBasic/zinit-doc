---
id: ts-ices-not-validated-on-update-540
title: Persisted ices not validated during zinit update — silently ignored if unknown
category: troubleshooting
tags: [troubleshooting, ice, annex, command]
source: https://github.com/zdharma-continuum/zinit/issues/540
related: []
---

## Summary

During `zinit update`, ices are loaded from the plugin's `._zinit/` directory. If an ice requires an annex that is no longer loaded (e.g. after removing an annex), the ice is silently ignored rather than producing a warning or error.

## Symptom

A plugin installed with annex-provided ices (like `lbin` from `zinit-annex-bin-gem-node`) updates without error, but the annex-provided post-install steps (symlinking binaries, etc.) do not run. The plugin appears installed but functionality is broken.

## Cause

Zinit does not validate persisted ices against currently-loaded annexes before running an update. Unknown ice names are silently skipped.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/540

Ensure all required annexes are loaded before any plugin that uses their ices. Load annexes at the top of `.zshrc`:

```zsh
zinit light-mode depth"1" for \
  zdharma-continuum/zinit-annex-bin-gem-node \
  zdharma-continuum/zinit-annex-patch-dl \
  zdharma-continuum/zinit-annex-readurl
```

If a plugin update fails silently, delete and reinstall it to force a clean run with all annexes active:

```zsh
zinit delete --yes user/plugin
# Re-open shell or source .zshrc
```
