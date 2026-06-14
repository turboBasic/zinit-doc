---
id: ts-times-duplicate-plugins-594
title: zinit times shows duplicate plugin entries
category: troubleshooting
tags: [troubleshooting, performance]
source: https://github.com/zdharma-continuum/zinit/discussions/594
related: []
---

## Summary
Duplicate entries in `zinit times` output indicate a plugin is being loaded twice in `.zshrc`, which doubles its initialization overhead.

## Question / Problem
`zinit times` showed every plugin listed twice:

```
1 ms - zdharma-continuum/zinit-annex-as-monitor
2 ms - zdharma-continuum/zinit-annex-bin-gem-node
...
1 ms - zdharma-continuum/zinit-annex-as-monitor   ← duplicate
2 ms - zdharma-continuum/zinit-annex-bin-gem-node ← duplicate
```

## Answer / Solution
Search `.zshrc` for duplicate `zinit light`/`zinit load`/`zinit snippet` lines for the affected plugins. The duplication is usually caused by:

1. Having the plugin listed in two places (e.g. once individually and once in a `for` block).
2. Sourcing `.zshrc` twice within the same session (e.g. a `source ~/.zshrc` inside `.zshrc`).
3. Having an old install block from a previous config that was not fully removed during migration.

```zsh
# Check for duplicates in .zshrc
grep -n 'zinit\|zi ' ~/.zshrc | sort | uniq -d
```

Remove the duplicate entry. Use `zinit list-plugins` to see what is actually loaded, then compare to your `.zshrc`.

## Caveats
Zinit will log `plugin already registered` warnings when `ZINIT[MUTE_WARNINGS]` is not set to `1`. If you are not seeing warnings, set it to `0` temporarily to confirm duplicates are occurring.
