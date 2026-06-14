---
id: ts-ghr-skips-compile-590
title: "gh-r plugins were unnecessarily compiled with zcompile"
category: troubleshooting
tags: [binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/590
related: []
---

## Summary

Zinit previously attempted to `zcompile` binary files downloaded via `from'gh-r'`, which is meaningless for compiled executables and produced warnings or errors. This was fixed so `gh-r` plugins skip compilation by default.

## Symptom

After installing a binary tool with `from'gh-r'`, zinit prints compile-related messages or errors about the binary file not being valid zsh code.

## Cause

The compilation logic did not exclude `gh-r` plugins, so zinit tried to `zcompile` the downloaded executable.

## Fix / Workaround

Update zinit (fixed in PR #590). After updating, `gh-r` plugins are skipped by `zcompile` automatically unless you explicitly add the `compile` ice:

```zsh
zinit self-update
```

If you explicitly want compilation (unusual for gh-r), use:

```zsh
zinit ice from'gh-r' compile'*.zsh'
zinit light some/plugin
```
