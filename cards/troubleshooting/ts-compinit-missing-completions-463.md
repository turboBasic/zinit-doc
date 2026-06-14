---
id: ts-compinit-missing-completions-463
title: compinit reports missing completion files and shift count error on startup
category: troubleshooting
tags: [completion, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/463
related: []
---

## Summary

On shell startup, compinit emits a flood of "no such file or directory" warnings for completion files followed by `shift count must be <= $#`. The completion symlinks in zinit's completions directory point to files that no longer exist.

## Symptom

```
compinit:527: no such file or directory: /home/user/.local/share/zinit/completions/_android
compinit:527: no such file or directory: /home/user/.local/share/zinit/completions/_artisan
compinit:shift:529: shift count must be <= $#
```

## Cause

Stale symlinks in `~/.local/share/zinit/completions/` point to completion files that have been moved, renamed, or deleted — often after a `zinit update` or after manually removing a plugin.

## Fix / Workaround

Remove the broken symlinks and rebuild the completion database:

```zsh
# Remove stray/broken completions
zinit cclear

# Then reinstall completions for all loaded plugins
zinit creinstall --all

# Rebuild the completion index
autoload -Uz compinit && compinit
```

Alternatively, check for broken symlinks directly and remove them:

```zsh
find ~/.local/share/zinit/completions -xtype l -delete
```

Then restart the shell or run `compinit` to regenerate the index.

## Caveats

On Ubuntu/NixOS, a system-wide `compinit` call may run before your `.zshrc` and mask this error. Disable the system-wide call per the zinit README instructions.
