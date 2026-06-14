---
id: cmd-dstop
title: "Command: zi dstop"
category: commands
tags: [command, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-dstart, cmd-dreport, cmd-dunload, cmd-dclear]
---

## Summary

Stop the active session investigation started with `zi dstart`/`zi dtrace`. No further changes are recorded after this point.

## Syntax / Usage

```zsh
zi dstop
```

No arguments.

## Details

Ends the session tracking window opened by `zi dstart`. The accumulated report remains available for `zi dreport` and the recorded changes can still be reverted with `zi dunload`. Calling `dstop` without a preceding `dstart` is a no-op.

## Examples

```zsh
zi dstart
source ~/some-script.zsh
zi dstop
zi dreport  # report is still available after dstop
```

## See Also

- cmd-dstart
- cmd-dreport
- cmd-dunload
- cmd-dclear
