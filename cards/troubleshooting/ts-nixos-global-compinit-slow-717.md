---
id: ts-nixos-global-compinit-slow-717
title: "Slow shell startup due to duplicate global compinit (NixOS and Ubuntu)"
category: troubleshooting
tags: [completion, performance, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/717
related: []
---

## Summary

On NixOS and Ubuntu, the system ships a global `/etc/zshrc` that calls `compinit` for all users. When zinit (or any plugin manager) also calls `compinit` from `~/.zshrc`, completion initialization runs twice, significantly slowing shell startup.

## Symptom

Shell startup takes 1–2 seconds longer than expected. `compinit` appears to run twice. Removing `compinit` from `~/.zshrc` breaks plugin completions.

## Cause

- **NixOS**: `programs.zsh` in the system configuration enables `compinit` globally by default when zsh is installed via `programs.zsh`.
- **Ubuntu**: Ubuntu ships a global `/etc/zshrc` that calls `compinit` for all users.

Both cases cause a second `compinit` call from `~/.zshrc` to double the initialization time.

## Fix / Workaround

### NixOS

Disable the global `compinit` in `/etc/nixos/configuration.nix`:

```nix
programs.zsh.enableGlobalCompInit = false;
```

Then rebuild the system and ensure `compinit` is called in every user's `~/.zshrc`:

```zsh
autoload -Uz compinit
compinit
```

After disabling the global call, system-package completions may not work for users who don't have `compinit` in their own `.zshrc`. Every user must add the call manually.

### Ubuntu

Skip the global `compinit` call by setting `skip_global_compinit` in `~/.zshenv`:

```zsh
# In ~/.zshenv
skip_global_compinit=1
```

Then ensure `~/.zshrc` calls `compinit` explicitly:

```zsh
autoload -Uz compinit
compinit
```

## Caveats

- NixOS: disabling the global call affects all users system-wide — every user must have `compinit` in their own `.zshrc`.
- Ubuntu: `skip_global_compinit` only affects the current user. Other users on the same system still get the global call.
