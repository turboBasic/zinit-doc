---
id: subscribe
title: "Ice: subscribe'' / on-update-of''"
category: ices
tags: [ice, lazy-loading, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [wait, trigger-load]
---

## Summary

`subscribe''` (alias `on-update-of''`) postpones loading a plugin or snippet until
one or more specified files are modified on disk.

## Syntax / Usage

```zsh
zi ice subscribe"{~/files-*,/tmp/files-*}"
zi ice on-update-of"~/my-config-file"
```

## Details

The ice value is a glob pattern (or brace-expanded list of patterns) pointing to
file paths. Zinit checks whether any matching file has been updated since the last
check. When a modification is detected, the plugin/snippet is loaded.

`subscribe''` and `on-update-of''` are interchangeable aliases.

Works with both plugins and snippets.

## Examples

```zsh
# Load a plugin only after a config file is updated
zi ice subscribe"~/.my-tool-config" lucid
zi light user/my-tool-plugin
```

## See Also

- wait
- trigger-load
