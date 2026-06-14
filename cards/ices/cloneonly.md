---
id: cloneonly
title: "cloneonly"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [as, nocompletions]
---

## Summary

`cloneonly` downloads (clones) a plugin or snippet without loading (sourcing) it. The
plugin is available on disk but not active in the current shell.

## Syntax / Usage

```zsh
zi ice cloneonly
```

## Details

`cloneonly` is a flag ice — it takes no value. It prevents the plugin from being
sourced or initialized. The plugin directory exists and can be used by other means (e.g.
referencing files directly).

Useful for pre-fetching a plugin for later use, or for plugins that are only needed
as data sources (e.g. completions installed via `zinit creinstall` separately).

Works with both plugins and snippets.

## Examples

```zsh
# Pre-fetch a completion file without activating the plugin
zi ice cloneonly
zi light user/completions-repo
```

## See Also

- as
- nocompletions
