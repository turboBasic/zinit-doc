---
id: cmd-dclear
title: "Command: zi dclear"
category: commands
tags: [command, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-dstart, cmd-dstop, cmd-dreport, cmd-dunload]
---

## Summary

Clear the session investigation report without reverting any changes. Resets the tracking data accumulated since `zi dstart`.

## Syntax / Usage

```zsh
zi dclear
```

No arguments.

## Details

Discards the accumulated session report from the current investigation window without undoing the recorded changes. After `dclear`, `zi dreport` will show an empty report and `zi dunload` will have nothing to revert. Use this when you want to start tracking fresh without stopping and restarting with `dstop`/`dstart`, or when you simply want to discard the report without reverting.

## Examples

```zsh
zi dstart
source ~/script-a.zsh
zi dclear          # discard report for script-a
source ~/script-b.zsh
zi dreport         # only shows changes from script-b
zi dstop
```

## See Also

- cmd-dstart
- cmd-dstop
- cmd-dreport
- cmd-dunload
