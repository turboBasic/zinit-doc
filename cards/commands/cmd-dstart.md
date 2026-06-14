---
id: cmd-dstart
title: "Command: zi dstart / zi dtrace"
category: commands
tags: [command, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-dstop, cmd-dreport, cmd-dunload, cmd-dclear]
---

## Summary

Start investigating the current interactive session — Zinit begins recording all aliases, functions, bindkeys, and other shell-state changes from this point forward.

## Syntax / Usage

```zsh
zi dstart
zi dtrace   # alias for dstart
```

No arguments.

## Details

Activates session-level investigation mode. From this point, Zinit tracks every shell-state modification (new aliases, functions, bindkeys, etc.) until `zi dstop` is called. The recorded data can then be viewed with `zi dreport` or reverted with `zi dunload`. This mirrors the per-plugin investigation done by `zi load`, but applied to arbitrary interactive activity rather than a specific plugin.

## Examples

```zsh
# Start tracking, perform some actions, inspect and revert
zi dstart
source ~/some-script.zsh
zi dreport
zi dunload
zi dstop
```

## See Also

- cmd-dstop
- cmd-dreport
- cmd-dunload
- cmd-dclear
