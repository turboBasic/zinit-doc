---
id: ts-creinstall-broken-symlinks-453
title: Broken completion symlinks after creinstall . in atpull hook
category: troubleshooting
tags: [completion, troubleshooting, ice]
source: https://github.com/zdharma-continuum/zinit/issues/453
related: [ts-compinit-missing-completions-463]
---

## Summary

Using `atpull'zinit creinstall -q .'` to refresh completions on plugin update creates broken symlinks in the zinit completions directory. Two related bugs were fixed in PR #453: (1) old symlinks were not removed before creating new ones, leaving stale entries when completion filenames changed; (2) `creinstall .` used a relative path based on `$PWD` at execution time, so symlinks created in the completions directory pointed to relative paths that didn't resolve correctly.

## Symptom

After `zinit update`, broken symlinks accumulate in `~/.local/share/zinit/completions/`:

```zsh
find ~/.local/share/zinit/completions -xtype l | wc -l
# Returns a non-zero count of broken symlinks
```

Symlinks may look like `_afew -> ./src/_afew` — relative paths that are relative to the completions directory rather than the plugin directory, so they never resolve. Tab completion for affected commands stops working.

## Cause

Two bugs in `creinstall .` when called from an `atpull` hook:
1. Old symlinks were not removed before creating new ones, leaving stale entries when completion filenames changed.
2. The path was computed relative to `$PWD` (the plugin directory at execution time), but symlinks were created in the completions directory, so the relative source path no longer resolved.

Both were fixed in PR #453 by cleaning up stale symlinks and switching to absolute paths.

## Fix / Workaround

Update zinit to get the symlink cleanup fix:

```zsh
zinit self-update
```

Manually clean up broken symlinks if they already exist:

```zsh
find ~/.local/share/zinit/completions -xtype l -delete
```

Then reinstall completions cleanly:

```zsh
zinit creinstall --all
```

The recommended pattern for zsh-completions with auto-refresh on update:

```zsh
zinit lucid wait light-mode for \
    blockf atpull'zinit creinstall -q .' \
  zsh-users/zsh-completions
```

As a workaround for older zinit versions, pass an explicit absolute path:

```zsh
zi ice blockf atpull'zinit creinstall -q "$PWD"'
zi light zsh-users/zsh-completions
```

Or reinstall completions manually after an affected update:

```zsh
zinit creinstall zsh-users/zsh-completions
```

## Caveats

Running `zinit cclear` before `creinstall` ensures stale entries are removed first, but the correct fix is to update zinit.
