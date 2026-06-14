---
id: ts-zi-alias-conflict-zoxide-312
title: "zi alias conflicts with zoxide's zi interactive jump"
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/312
related: []
---

## Summary
Zinit sets a `zi` alias for itself by default, which conflicts with zoxide's `zi` interactive mode. Setting `ZINIT[NO_ALIASES]=1` before sourcing zinit disables all zinit aliases.

## Question / Problem
A user who also uses zoxide (which maps `zi` to interactive directory jumping) found that zinit's `zi` alias shadowed zoxide's binding.

## Answer / Solution
Disable zinit's aliases entirely by setting the `NO_ALIASES` hash field before sourcing zinit:

```zsh
declare -A ZINIT
ZINIT[NO_ALIASES]=1

ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
source "${ZINIT_HOME}/zinit.zsh"
```

With this setting, only the full `zinit` command is available; the `zi`, `zini`, and other short aliases are not created.

## Caveats
After disabling aliases, all zinit invocations in `.zshrc` and scripts must use the full `zinit` command. The `ZINIT[NO_ALIASES]` key must be set **before** sourcing `zinit.zsh`.
