---
id: ts-autocomplete-bad-option-P-364
title: "_autocomplete.command:local:2: bad option: -P" error when using tab completion
category: troubleshooting
tags: [completion, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/364
related: []
---

## Summary

Pressing Tab with the `zsh-autocomplete` plugin loaded shows `_autocomplete.command:local:2: bad option: -P`. This is a compatibility issue between the version of `zsh-autocomplete` and the running Zsh version, not a zinit bug.

## Symptom

```
user@host % gre
_autocomplete.command:local:2: bad option: -P
user@host % gre
gregorio  grep
```

Tab completion still works but each invocation prints the error.

## Cause

The `-P` option to `local` (for named references) was introduced in Zsh 5.8. Older Zsh versions do not support it, and the `zsh-autocomplete` plugin uses it internally. Alternatively, a newer version of `zsh-autocomplete` requires features from a more recent Zsh.

## Fix / Workaround

1. Upgrade Zsh to 5.8 or later.

2. If upgrading is not possible, pin `zsh-autocomplete` to an older version that does not use `local -P`:

```zsh
zinit ice ver"<last-compatible-tag>"
zinit light marlonrichert/zsh-autocomplete
```

3. Check the plugin's issue tracker for the minimum supported Zsh version for the current release.

## Caveats

The `local -P` flag for named references is a Zsh 5.8+ feature. Running any plugin that uses it on Zsh 5.7 or earlier will produce this error.
