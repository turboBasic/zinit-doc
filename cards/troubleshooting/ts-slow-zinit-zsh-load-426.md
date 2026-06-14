---
id: ts-slow-zinit-zsh-load-426
title: zinit.zsh itself appearing slow in plugin load times
category: troubleshooting
tags: [performance, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/426
related: []
---

## Summary
Zinit's own `zinit.zsh` appearing in `zinit times` with high load time is normal on first run or after updates; subsequent shells use the compiled `.zwc` file and are faster.

## Question / Problem
A user noticed `zinit.zsh` listed with significant load time in `zinit times` output and asked whether the configuration was wrong.

## Answer / Solution
Zinit reports its own source file in `zinit times`. The load time is higher when:
- The `.zwc` compiled cache does not exist yet (first run after install or after `self-update`).
- The `.zwc` file is stale and needs recompilation.

To ensure zinit is compiled:
```zsh
zinit self-update
```

After `self-update`, restart the shell:
```zsh
exec zsh
```

On subsequent starts, zinit loads from the compiled `.zwc` and will appear much faster in `zinit times`.

Using an old `~/.zinit/bin` path (from pre-migration installs) rather than the current `~/.local/share/zinit/zinit.git` path can also cause repeated compilation overhead if the path is not consistent.

## Caveats
If the user is still on the old `DHARMA` Initiative installer path (`~/.zinit/bin`), consider migrating to the current path to benefit from ongoing improvements.
