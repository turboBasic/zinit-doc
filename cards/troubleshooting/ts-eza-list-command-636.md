---
id: ts-eza-list-command-636
title: "Zinit list command uses exa but not eza (exa fork)"
category: troubleshooting
tags: [command, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/636
related: []
---

## Summary

Zinit's `LIST_COMMAND` setting checked for `exa` (now unmaintained) but not `eza` (the active fork). Users with `eza` installed did not get the enhanced listing output.

## Symptom

`zinit list-snippets` or directory-listing commands inside Zinit fall back to plain `ls` even though `eza` is installed.

## Cause

`exa` was deprecated and its development moved to the `eza` fork. Zinit's auto-detection only checked for `exa` in `$PATH`.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #636, which adds `eza` detection. Zinit now checks for `eza` first, then `exa`, then falls back to `ls`.

Alternatively, set `ZINIT[LIST_COMMAND]` manually before sourcing Zinit:

```zsh
declare -A ZINIT
ZINIT[LIST_COMMAND]='eza --tree'   # or: 'eza -la', 'lsd --tree', etc.
source "${ZINIT_HOME}/zinit.zsh"
```

## Caveats

`exa` remains supported alongside `eza` for backwards compatibility since `eza` does not release prebuilt macOS binaries in all versions.
