---
id: ts-completions-from-external-cache-dir-524
title: Registering completions generated into an external cache directory
category: troubleshooting
tags: [completion, troubleshooting, snippet]
source: https://github.com/zdharma-continuum/zinit/discussions/524
related: []
---

## Summary
When OMZ plugins (like `poetry` or `kubectl`) generate completions into `$ZSH_CACHE_DIR/completions`, zinit can register that directory with `zinit creinstall` for persistent use across reinstalls.

## Question / Problem
The OMZ `poetry` and `kubectl` plugins generate completion files into `$ZSH_CACHE_DIR/completions` at runtime. The user discovered `zinit creinstall $ZSH_CACHE_DIR/completions` works, but it must be run once interactively and is not portable in a dotfile.

## Answer / Solution
Add the cache completions directory to `$fpath` and ensure it is registered before `compinit` runs. This is repeatable and dotfile-safe:

```zsh
# Add the OMZ completion cache directory to fpath
fpath+=("$ZSH_CACHE_DIR/completions")

# Then load plugins that generate completions there
zinit snippet OMZP::kubectl
zinit snippet OMZP::poetry
```

Alternatively, use `zinit creinstall` in an `atload` hook so zinit tracks the completions:

```zsh
zinit ice atload"zinit creinstall -q $ZSH_CACHE_DIR/completions"
zinit snippet OMZP::kubectl
```

## Caveats
`zinit creinstall` on a directory makes zinit symlink every `_*` file it finds there into `ZINIT[COMPLETIONS_DIR]`. This is a one-time operation; subsequent plugin updates that regenerate files in the cache dir will not automatically update zinit's symlinks. Re-running `creinstall` is needed after updates.
