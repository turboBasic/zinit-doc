---
id: cloneopts
title: "Ice: cloneopts''"
category: ices
tags: [ice, git, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [depth, proto, ver]
---

## Summary

`cloneopts''` passes arbitrary flags directly to `git clone`. The default is
`--recursive`; supplying this ice replaces that default entirely.

## Syntax / Usage

```zsh
zi ice cloneopts"--depth 1 --single-branch"
zi ice cloneopts""    # empty string: disables --recursive (no extra clone flags)
```

## Details

The contents of `cloneopts''` replace the default `--recursive` flag passed to `git
clone`. To disable recursive cloning without adding other flags, pass an empty value.

Does not work with snippets.

## Examples

```zsh
# Shallow clone without submodules
zi ice cloneopts"--depth 1"
zi light some/large-plugin

# Disable recursive submodule cloning
zi ice cloneopts""
zi light some/plugin-with-submodules-you-dont-want
```

## See Also

- depth
- proto
