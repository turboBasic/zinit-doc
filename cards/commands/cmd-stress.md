---
id: cmd-stress
title: "Command: zi stress"
category: commands
tags: [command, plugin, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-report, cmd-load]
---

## Summary

Test a plugin for compatibility with a set of Zsh options. Use this to diagnose plugins that fail under certain option combinations like `KSH_ARRAYS` or `SH_WORD_SPLIT`.

## Syntax / Usage

```zsh
zi stress {plg-spec}
```

## Details

Loads the plugin repeatedly with different Zsh option sets (options that are known to cause compatibility issues) and reports any errors or failures encountered. Helps identify whether a plugin will break in non-standard Zsh configurations. Useful before publishing a plugin or when diagnosing errors that only appear in specific shell environments.

## Examples

```zsh
zi stress zdharma-continuum/history-search-multi-word
```

## See Also

- cmd-report
- cmd-load
