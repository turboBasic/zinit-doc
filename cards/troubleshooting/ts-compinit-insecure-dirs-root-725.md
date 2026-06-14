---
id: ts-compinit-insecure-dirs-root-725
title: "zsh compinit: insecure directories warning when running as root"
category: troubleshooting
tags: [completion, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/725
related: []
---

## Summary
The `compinit: insecure directories` warning when sourcing zinit as root is caused by zinit's completion directory having group-write permissions. The fix is to ensure the completions directory is owned by root with strict permissions.

## Question / Problem
A root user received `zsh compinit: insecure directories` after sourcing `zinit.zsh`. `compaudit` returned no output. The warning disappeared if zinit was not sourced.

## Answer / Solution
Zinit creates its completions directory with `g-rwX` permissions on install, but if run as root the group may still trigger the insecure directories check. Fix permissions explicitly:

```zsh
chmod -R 755 "${ZINIT[COMPLETIONS_DIR]:-$HOME/.local/share/zinit/completions}"
chmod -R 755 "${ZINIT[BIN_DIR]:-$HOME/.local/share/zinit/zinit.git}"
```

If `compaudit` returns output (even for root), fix those directories:
```zsh
compaudit | xargs chmod go-w
```

Alternatively, pass `-u` to `compinit` to skip the security check:
```zsh
autoload -Uz compinit
compinit -u
```

The `-u` flag is acceptable when you control the system and trust all paths in `$fpath`.

## Caveats
The `-u` flag suppresses security checks entirely. Only use it on single-user or trusted systems. For multi-user systems, fix the directory permissions instead.
