---
id: cmd-unload
title: "Command: zi unload"
category: commands
tags: [command, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-load, cmd-report, cmd-env-whitelist]
---

## Summary

Unload a plugin that was loaded with `zi load`, reverting all of its recorded side effects. Only works for plugins loaded with the full `load` command (not `light`).

## Syntax / Usage

```zsh
zi unload [-q] {plg-spec}
```

- `-q` — quiet, suppress output.

## Details

Zinit replays the inverse of every change the plugin registered at load time: removes aliases, functions, bindkeys, Zle widgets, zstyles, completions, and PATH/FPATH entries the plugin added. Variables are restored to their pre-load values unless they were whitelisted with `zi env-whitelist`. The plugin's directory on disk is not deleted; only its in-memory effects are undone. After unloading, the plugin can be re-loaded by running `zi load` again.

## Examples

```zsh
# Unload a plugin
zi unload zdharma-continuum/history-search-multi-word

# Unload quietly
zi unload -q zsh-users/zsh-autosuggestions
```

## Caveats / Common Mistakes

`unload` has no effect on plugins loaded with `zi light` — no investigation data was collected for those. If some variables should persist across unloads, register them with `zi env-whitelist` first.

## See Also

- cmd-load
- cmd-report
- cmd-env-whitelist
