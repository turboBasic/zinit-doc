---
id: subst
title: "subst"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [aliases]
---

## Summary

`subst''` performs text substitution in the plugin's source script before it is sourced,
replacing one string with another without modifying the file on disk.

## Syntax / Usage

```zsh
zi ice subst"old-string → new-string"
zi ice subst"autoload → autoload -Uz"
```

## Details

The substitution is applied to the sourced content at load time. The original file on
disk is unchanged. This allows fixing or patching plugin scripts that use patterns
incompatible with the user's Zsh setup.

The separator is ` → ` (Unicode right arrow) or ` -> ` (ASCII arrow).

## Examples

```zsh
# Ensure all autoload calls use -Uz flags
zi ice subst"autoload → autoload -Uz"
zi light user/old-plugin
```

## See Also

- aliases
