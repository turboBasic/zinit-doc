---
id: nocompletions
title: "Ice: nocompletions''"
category: ices
tags: [ice, completion, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [completions, blockf, as]
---

## Summary

`nocompletions` disables Zinit's automatic detection, installation, and management of
completions for a plugin. Completions can still be installed manually later.

## Syntax / Usage

```zsh
zi ice nocompletions
```

## Details

By default Zinit detects `_*` completion files in a plugin and installs them. `nocompletions` suppresses this. Completions can still be installed later with:

```zsh
zinit creinstall {plugin-spec}
```

`as"null"` sets `nocompletions` internally as part of its shorthand.

`nocompletions` is a flag ice — it takes no value.

## Examples

```zsh
# Load a plugin but skip its completions
zi ice nocompletions
zi light user/plugin-with-completions-i-dont-want

# as"null" implicitly sets nocompletions
zi ice as"null" sbin"bin/*"
zi light user/binary-only-tool
```

## See Also

- completions
- blockf
- as
