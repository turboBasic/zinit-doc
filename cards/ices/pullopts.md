---
id: pullopts
title: "Ice: pullopts''"
category: ices
tags: [ice, git, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cloneopts, depth, proto]
---

## Summary

`pullopts''` passes arbitrary flags to the `git pull` command used when updating
plugins.

## Syntax / Usage

```zsh
zi ice pullopts"--rebase"
zi ice pullopts"--ff-only"
```

## Details

The contents of `pullopts''` are appended to the `git pull` invocation during `zinit
update`. Useful for enforcing a specific merge strategy (e.g. rebase, fast-forward
only) for a particular plugin.

Does not work with snippets.

## Examples

```zsh
# Always rebase instead of merge when updating
zi ice pullopts"--rebase"
zi light some/plugin
```

## See Also

- cloneopts
- depth
