---
id: ts-as-none-silent-fallback-766
title: "as'none' silently falls back to default sourcing instead of erroring"
category: troubleshooting
tags: [ice, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/766
related: []
---

## Summary

A typo such as `as'none'` (instead of the correct `as'null'`) is silently accepted and falls through to default script-sourcing behavior, giving no indication that the ice value is invalid.

## Symptom

Plugin behaves unexpectedly — it sources the default script file even though the intent was `as'null'` (no sourcing). No error or warning is displayed.

## Cause

Ice names were validated (unknown names produce an error), but ice values were not. Any string was accepted as a valid value for `as`, `proto`, and other ices with enumerated valid values.

## Fix / Workaround

Update zinit to a version with ice-value validation (implemented in PR #778), which warns:

```
WARNING: ice 'as' has invalid value 'none'; valid values are: null, command, program, completion
```

Until then, double-check ice values against the documentation. Valid values for `as`:
- `as'null'` — disable sourcing and completions
- `as'command'` / `as'program'` — add to `$PATH`
- `as'completion'` — treat as completion file

## Examples

```zsh
# Wrong — silently falls through to source
zinit ice as'none'

# Correct
zinit ice as'null'
```
