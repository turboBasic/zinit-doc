---
id: ts-annex-repos-renamed-z-a-to-zinit-annex-38
title: Annex repositories renamed from z-a-* to zinit-annex-*
category: troubleshooting
tags: [annex, installation, migration, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/38
related: []
---

## Summary

All zinit annex repositories were renamed from `z-a-<name>` to `zinit-annex-<name>` for better discoverability. Configurations referencing old names continue to work due to GitHub redirects, but explicit references should be updated.

## Symptom

No hard failure — GitHub redirects the old `z-a-*` names to the new `zinit-annex-*` names. However, warning messages or unexpected redirect behavior may appear in some git clients or CI environments.

## Cause

The annex repos were renamed as part of a project cleanup. The old names (`z-a-bin-gem-node`, `z-a-patch-dl`, etc.) now redirect to the new names.

## Fix / Workaround

Update `.zshrc` references from the old names to the new names:

```zsh
# Old (still works via redirect, but should be updated)
zinit light zdharma-continuum/z-a-bin-gem-node
zinit light zdharma-continuum/z-a-patch-dl
zinit light zdharma-continuum/z-a-rust

# New (canonical)
zinit light zdharma-continuum/zinit-annex-bin-gem-node
zinit light zdharma-continuum/zinit-annex-patch-dl
zinit light zdharma-continuum/zinit-annex-rust
```

Full rename map:
- `z-a-as-monitor` → `zinit-annex-as-monitor`
- `z-a-bin-gem-node` → `zinit-annex-bin-gem-node`
- `z-a-default-ice` → `zinit-annex-default-ice`
- `z-a-man` → `zinit-annex-man`
- `z-a-patch-dl` → `zinit-annex-patch-dl`
- `z-a-rust` → `zinit-annex-rust`
- `z-a-submods` → `zinit-annex-submods`

## Caveats

GitHub redirects are permanent but not guaranteed forever. Updating to the canonical names is the safe long-term choice.
