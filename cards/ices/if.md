---
id: if
title: "Ice: if''"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [has, load, wait]
---

## Summary

`if''` conditionally loads a plugin or snippet based on an arbitrary shell expression.
If the expression evaluates to false, loading is skipped entirely.

## Syntax / Usage

```zsh
zi ice if"<shell-expression>"
zi ice if'[[ -n "$commands[otool]" ]]'
zi ice if'(( $+commands[brew] ))'
```

## Details

The expression is evaluated once at load time. If it returns a non-zero exit status,
the plugin or snippet is not loaded.

`if''` is evaluated before any hooks run, so a failing condition prevents cloning,
sourcing, and all `at*` hooks.

Works with both plugins and snippets.

## Examples

```zsh
# Load macOS-only plugin only on macOS
zi ice if'[[ "$OSTYPE" == darwin* ]]'
zi light user/macos-plugin

# Load only when otool (Xcode developer tools) is available
zi ice if'[[ -n "$commands[otool]" ]]'
zi load some/plugin
```

## See Also

- has
- load
