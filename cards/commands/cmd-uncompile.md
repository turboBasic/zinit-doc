---
id: cmd-uncompile
title: "Command: zi uncompile"
category: commands
tags: [command, plugin, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-compile, cmd-compiled]
---

## Summary

Remove compiled `.zwc` bytecode files for a plugin or for all managed plugins. Use this when a plugin update leaves stale compiled files that cause unexpected behavior.

## Syntax / Usage

```zsh
zi [options] uncompile {plg-spec}
```

| Option | Description |
|--------|-------------|
| `-a`, `--all` | Remove compiled files for all plugins |
| `-q`, `--quiet` | Suppress output |
| `-h`, `--help` | Print usage |

## Details

Deletes `.zwc` files from the target plugin directory. After uncompiling, Zsh will parse the raw `.zsh` source on next load. Zinit will recompile on the next load unless the `nocompile` ice is set. Useful for troubleshooting when a plugin behaves differently from its source because a stale `.zwc` is being loaded.

## Examples

```zsh
# Uncompile a single plugin
zi uncompile zsh-users/zsh-autosuggestions

# Remove all compiled files
zi uncompile --all
```

## See Also

- cmd-compile
- cmd-compiled
