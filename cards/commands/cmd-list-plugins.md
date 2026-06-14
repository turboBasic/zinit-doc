---
id: cmd-list-plugins
title: "Command: zi list-plugins"
category: commands
tags: [command, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-list-snippets, cmd-recently, cmd-report, cmd-times]
---

## Summary

Show all currently loaded plugins, optionally filtered by a keyword. Also available as `zi loaded` and `zi list`.

## Syntax / Usage

```zsh
zi list-plugins [keyword]
zi loaded [keyword]
zi list [keyword]
```

- `keyword` — optional filter string; only plugins whose spec contains the keyword are shown.

## Details

Prints the list of plugins that are loaded in the current shell session. The output includes plugin specs in `user/repo` format. Filtering with a keyword narrows the output to matching entries, useful when many plugins are loaded.

## Examples

```zsh
# List all loaded plugins
zi list-plugins

# Filter to plugins with "zsh-users" in their spec
zi list-plugins zsh-users

# Using the short alias
zi list
```

## See Also

- cmd-list-snippets
- cmd-recently
- cmd-report
- cmd-times
