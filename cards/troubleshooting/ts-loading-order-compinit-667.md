---
id: ts-loading-order-compinit-667
title: Correct plugin loading order with compinit in turbo mode
category: troubleshooting
tags: [turbo, completion, performance, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/667
related: []
---

## Summary
The correct turbo-mode loading order is: prompt first (no `wait`), then all plugins with `wait`, then call `zicompinit; zicdreplay` in the `atload` of the last completion plugin. Syntax-highlighting should be loaded last among turbo plugins.

## Question / Problem
A user was struggling with the correct order for plugins, `compinit`, and `fast-syntax-highlighting`. They had seen conflicting advice and were unsure whether completions must precede `compinit`, or whether `fast-syntax-highlighting` must be truly last.

## Answer / Solution
The zinit-recommended minimal turbo pattern:

```zsh
# 1. Load prompt synchronously (no wait — must be active before first prompt)
zinit ice depth"1"
zinit light romkatv/powerlevel10k

# 2. Load plugins in turbo mode
zinit wait lucid light-mode for \
    zsh-users/zsh-autosuggestions \
    zsh-users/zsh-completions \
    # ... other plugins ...

# 3. Call zicompinit after the last completion-related plugin
# and load syntax-highlighting last
zinit for \
    atload"zicompinit; zicdreplay" \
    blockf \
    lucid \
    wait \
  zsh-users/zsh-completions

zinit wait lucid \
    atinit"zicompinit; zicdreplay" \
  zdharma-continuum/fast-syntax-highlighting
```

Key rules:
- `zicompinit` must run after all `blockf`/completion plugins.
- `fast-syntax-highlighting` (and `zsh-syntax-highlighting`) should be loaded last.
- `atinit"zicompinit; zicdreplay"` on the syntax-highlighter ensures compinit fires first.

## See Also
- The [zinit wiki minimal setup](https://zdharma-continuum.github.io/zinit/wiki/Example-Minimal-Setup/) page shows the canonical pattern.
