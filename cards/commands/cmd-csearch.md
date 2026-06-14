---
id: cmd-csearch
title: "zi csearch"
category: commands
tags: [command, completion, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-completions, cmd-creinstall, cmd-cuninstall]
---

## Summary

Search all downloaded plugin directories for available completion files, whether or not those completions are currently installed.

## Syntax / Usage

```zsh
zi csearch
```

No arguments.

## Details

Scans every directory under `$ZINIT[PLUGINS_DIR]` for underscore-prefixed files (`_*`) that look like Zsh completion functions, and reports them along with their installation status (installed/not installed, enabled/disabled). This helps discover completions provided by plugins you have downloaded but whose completions you may not have explicitly installed.

## Examples

```zsh
# Find all available completions across all downloaded plugins
zi csearch
```

## See Also

- cmd-completions
- cmd-creinstall
- cmd-cuninstall
