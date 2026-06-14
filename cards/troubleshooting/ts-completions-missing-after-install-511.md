---
id: ts-completions-missing-after-install-511
title: "Completions installed but not available in new shells"
category: troubleshooting
tags: [completion, troubleshooting, turbo]
source: https://github.com/zdharma-continuum/zinit/issues/511
related: []
---

## Summary

A plugin's completions are installed (reported by `zinit completions`) and work in the first shell session, but new shells show no completions until `zinit compinit` is run manually.

## Symptom

After installing a plugin with completions, tab completion works in the current session. After opening a new terminal, completions are absent. Running `zinit compinit` in the new session restores them.

## Cause

`compinit` must be called after zinit installs completions so the zsh completion system picks them up. If `compinit` is not called (or not called at the right time) in `.zshrc`, newly installed completions are not loaded on subsequent shell starts.

## Fix / Workaround

Add `compinit` to `.zshrc` after all plugin loads. With Turbo mode, use `zicompinit` in an `atload` hook:

```zsh
# Without Turbo mode
autoload -Uz compinit
compinit

# With Turbo mode — run compinit after completion plugins load
zinit ice wait lucid atload'zicompinit; zicdreplay' blockf
zinit light zsh-users/zsh-completions
```

If completions are still missing after adding `compinit`, run `zinit cclear` to remove stale entries and restart the shell.

## See Also

README section "Calling compinit With Turbo Mode".
