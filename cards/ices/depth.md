---
id: depth
title: "depth"
category: ices
tags: [ice, git, plugin, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [ver, cloneopts, proto]
---

## Summary

`depth''` passes `--depth` to `git clone`, limiting the number of commits downloaded.
It reduces clone time and disk usage for large repositories when history is not needed.

## Syntax / Usage

```zsh
zi ice depth"1"     # shallow clone, only the latest commit
zi ice depth"5"     # last 5 commits
```

## Details

A shallow clone omits most of the commit history. `depth"1"` is the most common value
and is the standard recommendation for themes like powerlevel10k.

Does not work with snippets.

## Examples

```zsh
# powerlevel10k recommends depth 1
zi ice depth"1"
zi light romkatv/powerlevel10k
```

## Caveats / Common Mistakes

- Shallow clones may cause issues with plugins that use `git describe` or inspect
  commit history during their setup.

## See Also

- ver
- cloneopts
