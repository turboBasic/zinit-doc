---
id: reset-prompt
title: "reset-prompt"
category: ices
tags: [ice, turbo, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [wait, lucid]
---

## Summary

`reset-prompt` issues `zle .reset-prompt` after a plugin or snippet loads, refreshing
the prompt. It is an alternative to prefixing `wait''` with `!` for prompt updates.

## Syntax / Usage

```zsh
zi ice wait reset-prompt
zi light user/prompt-plugin
```

## Details

When a turbo-loaded plugin changes the prompt appearance, the prompt needs to be redrawn
after loading. The conventional way is `wait'!...'` (the `!` prefix on `wait''`). The
`reset-prompt` ice provides the same effect declaratively without needing to use the
`!` syntax on `wait''`.

## Examples

```zsh
# Redraw prompt after plugin loads
zi ice wait lucid reset-prompt
zi light user/my-prompt-modifier
```

## Caveats / Common Mistakes

- Normally prefixing `wait''` with `!` (e.g. `wait'!'`) is sufficient and is the more
  common pattern. Use `reset-prompt` when you want to be explicit or cannot use `!`.

## See Also

- wait
- lucid
