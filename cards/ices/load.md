---
id: load
title: "Ice: load''"
category: ices
tags: [ice, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [unload, if, has, wait]
---

## Summary

`load''` provides a condition that, when true, causes a previously-unloaded plugin to
reload. Paired with `unload''`, it enables context-sensitive plugin loading.

## Syntax / Usage

```zsh
zi ice load"[[ $PWD = */github* ]]"
zi load user/github-plugin
```

## Details

The condition is evaluated on each prompt (via `precmd` hook). When it becomes true and
the plugin is not currently loaded, the plugin is loaded. Once loaded, the condition
becoming true again does not trigger a second load — the plugin must first be unloaded
via the `unload''` condition.

`load''` pairs naturally with `unload''` to create plugins that activate and deactivate
based on the current directory or other shell state.

Does not work with snippets.

## Examples

```zsh
# Load a plugin only when inside a GitHub-related directory
zi ice load'[[ $PWD = */github* ]]' unload'[[ $PWD != */github* ]]'
zi load user/github-helpers
```

## See Also

- unload
- if
- has
