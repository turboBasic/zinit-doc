---
id: ts-update-hook-not-found-errors
title: "zi update --all produces 'command not found: ∞zinit-*-hook' errors"
category: troubleshooting
tags: [troubleshooting, annex]
source: https://github.com/zdharma-continuum/zinit/discussions/256
related: [ts-self-update-master-branch]
---

## Summary

Running `zi update --all` and seeing a flood of `command not found: ∞zinit-reset-hook` (and similar `∞zinit-*-hook`) errors with exit code 127 is caused by a mismatch between a cached ice-set that references annex hooks and annexes that are not loaded during the update run.

## Question / Problem

After running `zi update --all --verbose`, a user saw errors for every plugin:

```
.zinit-update-or-status-snippet:24: command not found: .zinit-update-snippet
.zinit-update-or-status:241: command not found: ∞zinit-reset-hook
Warning: ∞zinit-reset-hook hook returned with 127
.zinit-update-or-status:288: command not found: ∞zinit-atpull-e-hook
Warning: ∞zinit-atpull-e-hook hook returned with 127
... (many more)
🚧Warning: romkatv/powerlevel10k update returned 127
```

Despite the errors, all plugins appeared to work correctly.

## Answer / Solution

The `∞zinit-*-hook` functions are provided by zinit annexes (`zinit-annex-bin-gem-node`, etc.). During `zinit update --all`, if the annexes are updated first and then the shell is reloaded, the hook functions are temporarily unavailable.

The fix is to ensure annexes are loaded before `zinit update` runs its hooks. This normally happens automatically when zinit is sourced in `.zshrc`. The errors appear because `update --all` runs in a subprocess that may not have the annexes sourced.

**Workaround**: run `exec zsh` after `zinit update --all` to reload with fresh annex state. If errors persist after `exec zsh`, the compiled `.zwc` bytecode may be stale from an older version; delete it and recompile:

```zsh
zinit uncompile --all
zinit self-update
exec zsh
```

If errors persist on interactive reload, check that annex loading is not inside a `wait` block:

```zsh
# Annexes must be loaded WITHOUT turbo (no wait ice)
zinit light-mode for \
    zdharma-continuum/zinit-annex-bin-gem-node \
    zdharma-continuum/zinit-annex-patch-dl \
    zdharma-continuum/zinit-annex-rust
```

Annexes in a `wait` block will not be available during the synchronous portion of zshrc where other plugins may be processed.

## Caveats

The errors are cosmetic if everything works post-reload. They do not indicate data loss. The actual update (git pull) succeeded — only the post-update hooks (like `atpull`) were skipped.
