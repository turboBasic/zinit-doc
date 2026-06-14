---
id: ts-zi-alias-conflict-276
title: "'defining function based on alias zi' parse error on startup"
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/276
related: []
---

## Summary

On shell startup, zinit emits `(eval):25: defining function based on alias 'zi'` and `parse error near '()'`. This happens when `zi` is already defined as an alias (e.g. by an Oh My Zsh plugin) before zinit tries to define its own `zi` function.

## Symptom

```
(eval):25: defining function based on alias `zi'
(eval):25: parse error near `()'
```

## Cause

Zinit sets `alias zi=zinit` during initialization. If another plugin or framework has already defined `zi` as an alias before zinit loads, Zsh cannot then define a function with the same name as an existing alias, causing a parse error.

## Fix / Workaround

Option 1 — Disable zinit's built-in aliases so the conflict never occurs:

```zsh
declare -A ZINIT
ZINIT[NO_ALIASES]=1
source "${ZINIT_HOME}/zinit.zsh"
# Use 'zinit' as the full command name instead of 'zi'
```

Option 2 — Unalias `zi` before sourcing zinit:

```zsh
unalias zi 2>/dev/null
source "${ZINIT_HOME}/zinit.zsh"
```

Option 3 — Source zinit before any other plugin or framework that might define `zi`.

## Caveats

`ZINIT[NO_ALIASES]=1` must be set before sourcing `zinit.zsh`. When aliases are disabled, all zinit commands must be entered as `zinit <subcommand>` — the `zi`, `zplg`, and `zini` short forms will not be available.
