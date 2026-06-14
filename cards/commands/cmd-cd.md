---
id: cmd-cd
title: "Command: zi cd"
category: commands
tags: [command, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-edit, cmd-create, cmd-glance, cmd-changes]
---

## Summary

Change the current directory to a plugin's local directory. Also supports snippets when given their URL.

## Syntax / Usage

```zsh
zi cd {plg-spec}
zi cd {URL}
```

## Details

Resolves the plugin spec to its directory under `$ZINIT[PLUGINS_DIR]` (or the snippet cache path for URLs) and `cd`s into it. This is a convenience shortcut for navigating directly to a managed plugin's source without needing to know the full path. For `_local` plugins, the `_local/` prefix is optional.

## Examples

```zsh
# cd into a GitHub plugin directory
zi cd zsh-users/zsh-autosuggestions

# cd into a local plugin (both forms work)
zi cd _local/my-helpers
zi cd my-helpers
```

## See Also

- cmd-edit
- cmd-create
- cmd-glance
- cmd-changes
