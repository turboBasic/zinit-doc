---
id: ts-zi-alias-conflict-zoxide
title: Preventing zinit from defining the 'zi' alias when it conflicts with zoxide
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/312
related: []
---

## Summary

Zinit sets several aliases (`zi`, `zini`, `zinit`) by default. If another tool (e.g. zoxide's `zi` interactive jump) also uses `zi`, set `ZINIT[NO_ALIASES]=1` before sourcing zinit to suppress all aliases.

## Question / Problem

A user combined zinit with zoxide, which uses `zi` for interactive directory jumping. Zinit claimed the `zi` alias and broke zoxide's `zi` command.

## Answer / Solution

Set `ZINIT[NO_ALIASES]` to `1` in the `ZINIT` hash before sourcing `zinit.zsh`. This prevents zinit from defining `zi`, `zini`, and other short aliases:

```zsh
declare -A ZINIT
ZINIT[NO_ALIASES]=1

ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
source "${ZINIT_HOME}/zinit.zsh"
```

After this, use the full `zinit` command instead of the `zi` shorthand:

```zsh
zinit load user/plugin
zinit update --all
```

## Caveats

`ZINIT[NO_ALIASES]=1` must be set **before** `source zinit.zsh`. Setting it after sourcing has no effect because the aliases are defined during source.
