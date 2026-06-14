---
id: completions
title: "Ice: completions''"
category: ices
tags: [ice, completion, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [nocompletions, blockf, as]
---

## Summary

`completions` forces Zinit to detect, install, and manage completions for a plugin,
overriding `as"null"` or `nocompletions` if either was set.

## Syntax / Usage

```zsh
zi ice completions
```

## Details

`completions` is a flag ice that re-enables completion management when it was disabled
by `as"null"` or `nocompletions`. It is the override mechanism to opt back in after an
explicit opt-out.

`completions` is a flag ice — it takes no value.

## Examples

```zsh
# as"null" disables completions; completions ice re-enables them
zi ice as"null" completions sbin"bin/*"
zi light user/tool-with-completions
```

## See Also

- nocompletions
- blockf
- as
