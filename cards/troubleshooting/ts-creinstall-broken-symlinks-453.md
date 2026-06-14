---
id: ts-creinstall-broken-symlinks-453
title: Broken completion symlinks after creinstall . in atpull hook
category: troubleshooting
tags: [completion, troubleshooting, ice]
source: https://github.com/zdharma-continuum/zinit/issues/453
related: [ts-compinit-missing-completions-463]
---

## Summary

Using `atpull'zinit creinstall -q .'` to refresh completions on plugin update creates broken symlinks in the zinit completions directory. The old symlinks are not removed before the new ones are created.

## Symptom

After `zinit update`, broken symlinks accumulate in `~/.local/share/zinit/completions/`:

```zsh
find ~/.local/share/zinit/completions -xtype l | wc -l
# Returns a non-zero count of broken symlinks
```

## Cause

Running `creinstall .` from within a plugin's directory during `atpull` creates new symlinks pointing to the updated completion files. However, if the plugin was updated and completion filenames changed, the old symlinks remain pointing to now-nonexistent files. Fixed in PR #453.

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

## Caveats

Running `zinit cclear` before `creinstall` ensures stale entries are removed first, but the correct fix is to update zinit.
