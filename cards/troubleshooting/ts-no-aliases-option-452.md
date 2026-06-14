---
id: ts-no-aliases-option-452
title: Disable zinit aliases (zi, zplg, zini) to avoid conflicts
category: troubleshooting
tags: [troubleshooting, installation, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/452
related: [ts-zi-alias-conflict-276, ts-zi-alias-conflict-zoxide-312]
---

## Summary
Zinit automatically defines aliases `zi`, `zplg`, `zini`, and `zinit` on load. These can conflict with other tools (e.g. `zoxide` creates `zi`) or be unwanted. The `ZINIT[NO_ALIASES]=1` option disables all aliases.

## Symptom
After sourcing zinit, the `zi` alias conflicts with another tool's alias or function, causing unexpected behavior.

## Fix / Workaround
Set `ZINIT[NO_ALIASES]=1` **before** sourcing `zinit.zsh`:

```zsh
declare -A ZINIT
ZINIT[NO_ALIASES]=1

source "${ZINIT_HOME}/zinit.zsh"

# Then use the full `zinit` command name only
zinit load user/plugin
```

This suppresses all short aliases. You must use `zinit` (the full command) in your `.zshrc` after setting this option.

## Caveats
Setting `ZINIT[NO_ALIASES]=1` requires using `zinit` everywhere in your config instead of `zi`. If you use other people's dotfile snippets that use `zi`, they will not work without adjusting.
