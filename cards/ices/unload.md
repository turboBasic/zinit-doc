---
id: unload
title: "unload"
category: ices
tags: [ice, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [load, if]
---

## Summary

`unload''` provides a condition that, when true, unloads a currently-loaded plugin.
It is the counterpart to `load''` for context-sensitive plugin management.

## Syntax / Usage

```zsh
zi ice unload"[[ $PWD != */github* ]]"
```

## Details

The condition is evaluated on each prompt. When it becomes true and the plugin is
currently loaded, Zinit unloads it (reverting the changes it tracked). Once unloaded,
the condition becoming true again does not trigger a second unload — the plugin must
first be reloaded via the `load''` condition.

`unload''` only functions for plugins loaded with `zinit load` (investigating enabled),
since unloading requires the tracking data that `zinit light` does not collect.

Does not work with snippets.

## Examples

```zsh
# Auto-load inside github dirs, auto-unload outside
zi ice load'[[ $PWD = */github* ]]' unload'[[ $PWD != */github* ]]'
zi load user/github-helpers
```

## See Also

- load
- if
