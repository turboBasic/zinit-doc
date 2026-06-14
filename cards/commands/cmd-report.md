---
id: cmd-report
title: "Command: zi report"
category: commands
tags: [command, plugin, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-load, cmd-unload, cmd-status, cmd-times, cmd-dreport]
---

## Summary

Display the investigation report for a plugin loaded with `zi load`. Shows every alias, function, bindkey, completion, variable, and PATH/FPATH change the plugin registered.

## Syntax / Usage

```zsh
zi report {plg-spec}|--all
```

- `--all` — print reports for every investigated plugin.

## Details

The report is populated only for plugins loaded with `zi load` (not `zi light`). It lists the exact changes recorded at load time: new aliases, functions defined, bindkeys bound, Zle widgets registered, zstyles set, completions installed, variables modified, and PATH/FPATH entries added. This data is also what `zi unload` uses to reverse a plugin's effects. Reports remain available until the shell exits or the plugin is unloaded.

## Examples

```zsh
# View report for a single plugin
zi report zdharma-continuum/history-search-multi-word

# View reports for all investigated plugins
zi report --all
```

## Caveats / Common Mistakes

A plugin loaded with `zi light` has no report — `zi report` will show nothing or an error. Switch to `zi load` if investigation data is needed.

## See Also

- cmd-load
- cmd-unload
- cmd-status
- cmd-times
- cmd-dreport
