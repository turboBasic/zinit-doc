---
id: ts-creinstall-broken-symlinks-relative-453
title: creinstall inside atpull creates broken relative symlinks in completions directory
category: troubleshooting
tags: [completion, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/453
related: []
---

## Summary
Running `zinit creinstall .` from within a plugin directory (e.g. as part of an `atpull` hook) creates broken relative symlinks in `~/.local/share/zinit/completions/` instead of absolute symlinks.

## Symptom
After `zinit update` with a plugin that uses `blockf atpull'zinit creinstall -q .'`, completion symlinks like:

```
_afew -> ./src/_afew
```

appear in the completions directory. The relative path `./src/_afew` is relative to the completions directory, not to the plugin directory, so the symlink is broken. Tab completion for affected commands stops working.

## Cause
`creinstall .` was using a relative path based on `$PWD` at the time of execution, which is the plugin directory. When the symlink was created in the completions directory, the relative source path no longer resolved correctly.

## Fix / Workaround
Update zinit to include PR #453 (`zinit self-update`). The fix ensures absolute paths are used when creating completion symlinks.

As a workaround for older versions, use `atpull'zinit creinstall -q $PWD'` with the expanded absolute path:

```zsh
zi ice blockf atpull'zinit creinstall -q "$PWD"'
zi light zsh-users/zsh-completions
```

Or reinstall completions manually after an affected update:

```zsh
zinit creinstall zsh-users/zsh-completions
```
