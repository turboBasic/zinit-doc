---
id: cmd-dunload
title: "Command: zi dunload"
category: commands
tags: [command, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-dstart, cmd-dstop, cmd-dreport, cmd-dclear]
---

## Summary

Revert all shell-state changes recorded between `zi dstart` and `zi dstop`. Undoes aliases, functions, bindkeys, and other modifications captured during the session investigation window.

## Syntax / Usage

```zsh
zi dunload
```

No arguments.

## Details

Replays the inverse of every change captured during the active (or most recently stopped) session investigation. This is the session-level equivalent of `zi unload` for individual plugins. After `dunload`, the shell state is restored to what it was at the moment `dstart` was called. The investigation report is cleared after unload.

## Examples

```zsh
zi dstart
source ~/experimental-script.zsh
zi dreport      # see what changed
zi dunload      # revert everything
zi dstop
```

## See Also

- cmd-dstart
- cmd-dstop
- cmd-dreport
- cmd-dclear
