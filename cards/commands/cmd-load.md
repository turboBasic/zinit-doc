---
id: cmd-load
title: "Command: zi load"
category: commands
tags: [command, plugin, installation]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-light, cmd-snippet, cmd-unload, cmd-ice]
---

## Summary

Load a plugin with full reporting and investigation enabled. Use this when you want Zinit to track what aliases, functions, bindkeys, completions, and PATH/FPATH changes the plugin makes.

## Syntax / Usage

```zsh
zi load {plg-spec}
```

`{plg-spec}` is `user/repo` for GitHub plugins or an absolute local path.

## Details

`load` clones the plugin repository under `$ZINIT[PLUGINS_DIR]` (default: `~/.local/share/zinit/plugins`) on first use, then sources the plugin's main file. It instruments the shell environment before and after sourcing so Zinit can record every side effect the plugin produces (aliases, functions, bindkeys, Zle widgets, zstyles, completions, variables, PATH and FPATH entries). That data is stored per-plugin and can be retrieved with `zi report` or used to fully undo the plugin's changes with `zi unload`. Ice modifiers set via `zi ice` immediately before this call apply to this load only and are persisted in the plugin's `._zinit/` subdirectory.

## Examples

```zsh
# Load with investigation (full reporting)
zi load zdharma-continuum/history-search-multi-word

# Load a local plugin
zi load /home/user/my-plugin

# With Turbo mode (load 2 seconds after prompt)
zi ice wait"2" lucid
zi load zsh-users/zsh-autosuggestions

# Using for-syntax to load multiple plugins
zinit for \
  zdharma-continuum/history-search-multi-word \
  zsh-users/zsh-autosuggestions
```

## Caveats / Common Mistakes

Prefer `zi light` for plugins you trust and don't need to investigate — `load` has a small overhead from instrumentation. Using `load` in Turbo mode (`wait''`) is fine; the reporting still works.

## See Also

- cmd-light
- cmd-snippet
- cmd-unload
- cmd-ice
