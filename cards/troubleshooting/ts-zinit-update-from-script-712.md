---
id: ts-zinit-update-from-script-712
title: Running zinit update from a non-interactive script
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/712
related: []
---

## Summary
`zinit` is a shell function loaded only in interactive zsh sessions. Calling it from a plain shell script fails because the function is not defined. Use `zsh -i -c` to run it in an interactive subshell.

## Question / Problem
A user wanted a standalone script to run `zinit update`. A basic script failed because `zinit` was not in `$PATH` — it is a shell function defined only when `.zshrc` is sourced.

```sh
echo "zinit update" > update.sh
./update.sh
# ./update.sh: line 1: zinit: command not found
```

## Answer / Solution
Run the command in an interactive zsh subshell that sources `.zshrc`:

```zsh
#!/usr/bin/env zsh
zsh -i -c 'zinit update --all'
```

Or source zinit directly:

```zsh
#!/usr/bin/env zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
source "${ZINIT_HOME}/zinit.zsh"
zinit update --all
```

## Caveats
`zsh -i -c` starts a full interactive shell including all `.zshrc` processing, which may be slow if startup is heavy. The direct source approach is faster but requires knowing the zinit installation path and will miss plugins loaded earlier in `.zshrc`.
