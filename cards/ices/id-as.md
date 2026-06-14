---
id: id-as
title: "Ice: id-as''"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [as, from]
---

## Summary

`id-as''` assigns a nickname (alias) to a plugin or snippet, decoupling the handler
name Zinit uses internally from the actual URL or repository path.

## Syntax / Usage

```zsh
zi ice id-as"<alias>"
zi snippet https://very.long.url/path/to/file.zsh
```

## Details

Zinit tracks plugins and snippets by their identifier. For snippets sourced from long
URLs this identifier becomes unwieldy in `zinit list`, `zinit update`, and similar
commands. `id-as''` replaces the identifier with a short human-readable name.

The alias is used for `zinit update <alias>`, `zinit delete <alias>`, and anywhere else
a plugin-spec is expected.

Works with both plugins and snippets.

## Examples

```zsh
# Give a long URL snippet a short handle
zi ice id-as"clipboard" lucid
zi snippet https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/lib/clipboard.zsh

# Disambiguate two forks of the same repo loaded side-by-side
zi ice id-as"my-fork/plugin"
zi load myfork/plugin
```

## See Also

- as
