---
id: ts-ubuntu-global-compinit-slow
title: "Slow shell startup on Ubuntu due to global compinit in /etc/zshrc"
category: troubleshooting
tags: [completion, performance, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/717
related: [ts-nixos-global-compinit-slow-717]
---

## Summary

On Ubuntu, `/etc/zshrc` calls `compinit` globally, doubling completion initialization time when users also call `compinit` from `~/.zshrc`.

## Symptom

Shell startup is noticeably slow. Removing `compinit` from `~/.zshrc` breaks plugin completions.

## Cause

Ubuntu ships a global `/etc/zshrc` that calls `compinit` for all users. When zinit (or any plugin manager) also calls `compinit`, the initialization runs twice.

## Fix / Workaround

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

This setting only affects the current user. Other users on the same system still get the global call.
