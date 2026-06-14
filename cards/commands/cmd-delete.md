---
id: cmd-delete
title: "Command: zi delete"
category: commands
tags: [command, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-update, cmd-unload, cmd-status]
---

## Summary

Remove a plugin or snippet from disk. Use this to free disk space or to forget an incorrectly configured plugin so it can be cleanly re-installed.

## Syntax / Usage

```zsh
zi delete {plg-spec}|{URL}|--clean|--all
```

- `--all` — delete every plugin and snippet directory Zinit manages (full purge).
- `--clean` — delete only plugins and snippets that are not currently loaded.

## Details

`delete` removes the plugin or snippet directory from `$ZINIT[PLUGINS_DIR]` or `$ZINIT[SNIPPETS_DIR]`. It does not unload the plugin from the current shell session — run `zi unload` first if needed. After deletion, the next `zi load` or `zi snippet` call will re-clone/re-download the resource. This is useful when ice modifiers were set incorrectly and need to be cleared — deleting forces a clean re-clone with the corrected ices.

## Examples

```zsh
# Delete a single plugin
zi delete zsh-users/zsh-autosuggestions

# Delete a snippet by URL
zi delete https://gist.githubusercontent.com/hightemp/5071909/raw/

# Delete only plugins/snippets not currently loaded
zi delete --clean

# Purge everything
zi delete --all
```

## Caveats / Common Mistakes

`--all` is destructive — it removes every managed plugin and snippet directory. `delete` does not affect the current shell session; combine with `zi unload` if you also want to revert in-memory changes.

## See Also

- cmd-update
- cmd-unload
- cmd-status
