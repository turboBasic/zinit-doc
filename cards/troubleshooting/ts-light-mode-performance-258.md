---
id: ts-light-mode-performance-258
title: Using light-mode and turbo together for maximum startup performance
category: troubleshooting
tags: [turbo, performance, ice, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/discussions/258
related: []
---

## Summary
Combining `light-mode` with `wait` (turbo) and `lucid` gives the best startup time by disabling plugin tracking and deferring load. A conditional `wait` trigger can defer rarely-used plugins even further.

## Question / Problem
A user reduced shell startup from 0.263 s to 0.099 s by prepending `zi lucid light-mode wait for \` to their plugin list, and asked why `light-mode` is not the default.

`light-mode` disables zinit's reporting and unloading features. The trade-off is losing the ability to inspect what a plugin sets up and to unload it cleanly.

## Answer / Solution
For production configs where investigation is not needed, use:

```zsh
zi lucid light-mode wait for \
    zsh-users/zsh-autosuggestions \
    zsh-users/zsh-completions \
    zdharma-continuum/fast-syntax-highlighting
```

For plugins used only in specific contexts, a condition-based `wait` defers loading until after a matching command is run:

```zsh
zinit lucid light-mode wait'[[ -n ${ZLAST_COMMANDS[(r)git*]} ]]' for \
    some/git-plugin
```

This loads the plugin only after the user has run a `git*` command, saving load time for plugins that are rarely needed at startup.

## Caveats
`light-mode` disables `zinit report`, `zinit unload`, and bind-key tracking. If you need those features for debugging, use `zinit load` (without `light-mode`) temporarily.
