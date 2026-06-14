---
id: cmd-env-whitelist
title: "Command: zi env-whitelist"
category: commands
tags: [command, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-unload, cmd-load]
---

## Summary

Specify environment variable names (or patterns) that should not be reverted when a plugin is unloaded. Use this to preserve variables that plugins set and that you want to keep after unloading.

## Syntax / Usage

```zsh
zi env-whitelist [-v] [-h] {pattern...}
```

- `-v` — verbose, show which variables are being whitelisted.
- `-h` — print usage.

Patterns follow standard Zsh glob rules.

## Details

When `zi unload` reverts a plugin's effects it also restores modified variables to their pre-load values. `env-whitelist` exempts named variables (or those matching a glob pattern) from that rollback. Call it before loading the plugin whose variables you want to preserve. This is useful when a plugin exports a variable (e.g., a token, a PATH component set via a variable) that should survive an unload cycle.

## Examples

```zsh
# Keep MY_TOKEN and any variable starting with AWS_ across unloads
zi env-whitelist MY_TOKEN 'AWS_*'

# Verbose — confirm what was whitelisted
zi env-whitelist -v SOME_VAR
```

## See Also

- cmd-unload
- cmd-load
