---
id: autoload
title: "Ice: autoload''"
category: ices
tags: [ice, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atinit]
---

## Summary

`autoload''` marks functions from the plugin for autoloading. It is equivalent to
calling `atinit'autoload the-function'` but supports convenient renaming syntax.

## Syntax / Usage

```zsh
zi ice autoload"my-function"
zi ice autoload"func1 func2"
zi ice autoload"original-name → new-name"
zi ice autoload"fun → my-fun; fun2 → my-fun2"
```

## Details

Functions named in the `autoload''` value are set up for autoloading from the plugin's
directory. The renaming syntax (`→` or `->`) allows the function to be exposed under a
different name.

Multiple functions are separated by spaces; multiple rename pairs by `;`.

Equivalent to `atinit'autoload fun'` but more declarative.

## Examples

```zsh
# Autoload two functions from a utility plugin
zi ice autoload"my-util other-util"
zi light user/zsh-functions

# Rename on autoload
zi ice autoload"long-function-name → shortfn"
zi light user/zsh-utils
```

## See Also

- atinit
