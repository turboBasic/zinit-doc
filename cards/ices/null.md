---
id: "null"
title: "Ice: as'null'"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [as, nocompletions, sbin]
---

## Summary

`as"null"` is a shorthand that disables both file sourcing and completion installation.
It is equivalent to `pick"/dev/null" nocompletions` and is used when a plugin is loaded
purely for its side-effects via hooks or annexe-provided ices like `sbin''`.

## Syntax / Usage

```zsh
zi ice as"null"
```

## Details

`as"null"` sets `pick` to `/dev/null` (no file sourced) and sets `nocompletions`
(completions not managed). This makes the plugin a "no-op" from Zinit's perspective
except for any `at*` hooks or other ices like `sbin''`, `fbin''`, or `make''`.

Common use case: installing binary-only tools from GitHub where no sourcing is needed
and binaries are exposed via `sbin''`.

## Examples

```zsh
# Install multiple git binary tools without sourcing anything
zi as'null' lucid sbin wait'1' for \
  Fakerr/git-recall \
  davidosomething/git-my \
  tj/git-extras

# Prezto archive module has no init file to source
zi ice svn as"null"
zi snippet PZTM::archive
```

## See Also

- as
- nocompletions
- sbin
