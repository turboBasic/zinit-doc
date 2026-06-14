---
id: ts-system-compinit-disable-ubuntu-nixos
title: Disabling system-wide compinit on Ubuntu and NixOS to speed up startup
category: troubleshooting
tags: [completion, installation, performance, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/109
related: [ts-compinit-turbo-mode, ts-compinit-stray-completion-files]
---

## Summary

On Ubuntu and NixOS, `/etc/zshrc` calls `compinit` system-wide before your `.zshrc` runs. This double-compinit significantly slows startup. Disable it per-user (Ubuntu) or system-wide (NixOS).

## Question / Problem

Users on Ubuntu and NixOS notice that completions work even without calling `compinit` in `.zshrc`, and that adding a `compinit` call makes startup noticeably slower (two compinit calls).

## Answer / Solution

**Ubuntu — disable per user** (add to `~/.zshenv`):

```zsh
# Skip the not really helping Ubuntu global compinit
skip_global_compinit=1
```

**NixOS — disable system-wide** (in `/etc/nixos/configuration.nix`):

```nix
# Disable global completion init to speed up `compinit` call in `~/.zshrc`.
programs.zsh.enableGlobalCompInit = false;
```

After disabling, ensure your `.zshrc` calls compinit (or `zicompinit` in turbo mode) — otherwise completions for system packages will not work.

## Caveats

On NixOS, after setting `enableGlobalCompInit = false`, every user's `.zshrc` must call compinit. If a user has no zinit config, they need a plain `autoload -Uz compinit; compinit` in their `.zshrc`.
