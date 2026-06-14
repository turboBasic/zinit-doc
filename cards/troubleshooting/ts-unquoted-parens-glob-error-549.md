---
id: ts-unquoted-parens-glob-error-549
title: "Zinit output garbled or errors due to unquoted parentheses in messages"
category: troubleshooting
tags: [troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/549
related: []
---

## Summary

Unquoted parentheses in Zinit's internal message strings were interpreted as glob patterns by Zsh, causing garbled output or errors when displaying plugin load messages.

## Symptom

Zinit displays garbled output, missing text, or errors like `no matches found` when loading certain plugins or running update commands that trigger messages containing parentheses.

## Cause

The `+zi-log` (formerly `+zinit-message`) function had message strings with unquoted `(...)` sequences. In Zsh, parentheses in unquoted contexts can be interpreted as glob qualifiers.

## Fix / Workaround

Upgrade Zinit to a version that includes the fix for issue #549. On older versions, the garbled output is cosmetic only and does not affect plugin loading. No user-side workaround is needed.

## Caveats

This is a display-only issue. Plugin loading, completion setup, and all functional behavior are unaffected.
