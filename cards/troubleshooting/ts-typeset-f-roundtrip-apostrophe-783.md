---
id: ts-typeset-f-roundtrip-apostrophe-783
title: Zinit breaks typeset -f round-trip — apostrophe in autoload function causes eval failure
category: troubleshooting
tags: [troubleshooting, plugin, installation]
source: https://github.com/zdharma-continuum/zinit/issues/783
related: []
---

## Summary

`:zinit-tmp-subst-autoload` contains an apostrophe (`Couldn't`) encoded as a doubled single-quote inside a single-quoted string. The function loads fine, but `typeset -f` emits it unescaped, making re-evaluation fail with a parse error.

## Symptom

Shell integrations that snapshot state via `typeset -f` and later `eval` it — such as Cursor and VS Code terminal session restore — fail to restore the session when zinit is loaded. The error is an unmatched-quote parse error sourced from zinit's own autoload function.

## Cause

The apostrophe in the string `Couldn't` is written as `''` inside a single-quoted string. Zsh parses this correctly at source time, but `typeset -f` outputs the function body with the apostrophe unescaped, producing invalid syntax when the output is re-evaluated.

## Fix / Workaround

No official fix merged as of issue filing. A fix PR (#783) was opened to encode the apostrophe differently (e.g. using `$'\''` or a double-quoted string). Track https://github.com/zdharma-continuum/zinit/issues/783

If you rely on VS Code / Cursor session restore, the workaround is to disable terminal session restore in the editor settings until the fix is released.
