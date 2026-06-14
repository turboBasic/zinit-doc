---
id: ts-nixos-global-compinit-slow-717
title: "Slow shell startup on NixOS due to duplicate global compinit"
category: troubleshooting
tags: [completion, performance, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/717
related: []
---

## Summary

On NixOS, installing zsh via the system configuration automatically enables a global `compinit` call in `/etc/zshrc`. This causes double `compinit` execution and significantly slows shell startup.

## Symptom

Shell startup takes 1–2 seconds longer than expected. `compinit` appears to run twice (once from `/etc/zshrc`, once from `~/.zshrc`).

## Cause

`programs.zsh` in NixOS enables `compinit` globally by default when zsh is installed through the system configuration. This runs before and independently of any user `compinit` call.

## Fix / Workaround

Disable the global `compinit` in `/etc/nixos/configuration.nix`:

```nix
programs.zsh.enableGlobalCompInit = false;
```

Then rebuild and ensure `compinit` is called in every user's `~/.zshrc`:

```zsh
autoload -Uz compinit
compinit
```

## Caveats

After disabling the global call, system-package completions may not work for users who don't have `compinit` in their own `.zshrc`. Every user must add the call manually.
