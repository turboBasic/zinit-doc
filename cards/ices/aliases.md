---
id: aliases
title: "Ice: aliases''"
category: ices
tags: [ice, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [subst, light-mode]
---

## Summary

`aliases` loads a plugin with Zsh's aliases mechanism enabled. It is required for
plugins that both define and use aliases within their own scripts.

## Syntax / Usage

```zsh
zi ice aliases
zi light user/plugin-using-own-aliases
```

## Details

By default, Zinit loads plugins with `ALIASES` option unset in certain contexts, which
means a plugin that defines an alias in line 1 and invokes it in line 2 may fail. The
`aliases` ice sets the option so aliases are expanded during plugin loading.

`aliases` is a flag ice — it takes no value. It is only needed for plugins that
actively depend on alias expansion during their own initialization.

## Examples

```zsh
zi ice aliases
zi light user/plugin-that-defines-and-uses-aliases
```

## See Also

- subst
