---
id: cmd-compile
title: "zi compile"
category: commands
tags: [command, plugin, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-compiled, cmd-uncompile, cmd-self-update]
---

## Summary

Compile a plugin's Zsh scripts to `.zwc` bytecode to speed up loading. Can target a single plugin or all managed plugins at once.

## Syntax / Usage

```zsh
zi [options] compile {plg-spec}
```

| Option | Description |
|--------|-------------|
| `-a`, `--all` | Compile all managed plugins |
| `-q`, `--quiet` | Suppress build output |
| `-h`, `--help` | Print usage |

## Details

Zinit compiles plugin scripts using `zcompile`, producing `.zwc` files alongside the originals. Zsh loads `.zwc` files faster than raw `.zsh` files because the parser step is skipped. Compilation is normally done automatically by Zinit at load time, but the `compile` command lets you trigger it manually or in batch. The `nocompile` ice modifier disables automatic compilation for a specific plugin.

## Examples

```zsh
# Compile a single plugin
zi compile zsh-users/zsh-autosuggestions

# Compile all managed plugins quietly
zi compile --all --quiet
```

## See Also

- cmd-compiled
- cmd-uncompile
- cmd-self-update
