---
id: ts-disable-zinit-aliases-452
title: Disabling zinit's built-in aliases (zi, zplg, zini)
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/452
related: [ts-zi-alias-conflict-276, ts-zi-alias-conflict-zoxide-312]
---

## Summary

Zinit automatically creates several aliases (`zi`, `zplg`, `zini`, `zpl`) pointing to `zinit`. These can conflict with existing commands or aliases. Setting `ZINIT[NO_ALIASES]=1` before sourcing zinit disables all of them.

## Symptom

Conflicts such as `zi` being shadowed by zinit's alias, or existing shell functions named `zi` breaking after zinit is loaded. A common example: `zoxide` also creates a `zi` alias (`zoxide init zsh` adds `alias zi='cd'`), which gets overwritten by zinit's alias.

## Fix / Workaround

Set `ZINIT[NO_ALIASES]` before sourcing `zinit.zsh`:

```zsh
declare -A ZINIT
ZINIT[NO_ALIASES]=1
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
source "${ZINIT_HOME}/zinit.zsh"

# Now use the full 'zinit' command name
zinit light zsh-users/zsh-autosuggestions
```

To keep some aliases but not others, manually unalias after sourcing:

```zsh
source "${ZINIT_HOME}/zinit.zsh"
unalias zplg zpl zini 2>/dev/null  # keep only 'zi'
```

## Caveats

- When `NO_ALIASES=1` is set, all zinit shorthand aliases are disabled. You must type `zinit` in full for all commands.
- The setting must be in place before `source "${ZINIT_HOME}/zinit.zsh"` — it has no effect if set afterwards.
- If you use other people's dotfile snippets that use `zi`, they will not work without adjusting.
