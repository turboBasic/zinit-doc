---
id: cmd-create
title: "Command: zi create"
category: commands
tags: [command, plugin, git]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-load, cmd-edit, cmd-cd]
---

## Summary

Create a new plugin skeleton in the Zinit plugins directory, optionally also creating a matching GitHub repository.

## Syntax / Usage

```zsh
zi create {plg-spec}
```

- `{plg-spec}` — use `_local/plugin-name` to create a local-only plugin (no GitHub repo). Use `username/plugin-name` with a real GitHub username to also create and link a GitHub repository.

## Details

Scaffolds a new plugin directory under `$ZINIT[PLUGINS_DIR]`. When the user portion of the spec is `_local` (the default), the directory is created locally with no remote. When a real GitHub username is given, Zinit creates the repository on GitHub and configures the remote origin. The `cd` command can then be used with just the plugin name (omitting `_local`) to enter the directory.

## Examples

```zsh
# Create a local-only plugin
zi create _local/my-helpers

# Enter the plugin directory (omit _local/)
zi cd my-helpers
```

## See Also

- cmd-load
- cmd-edit
- cmd-cd
