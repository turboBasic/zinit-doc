---
id: cmd-dreport
title: "zi dreport"
category: commands
tags: [command, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-dstart, cmd-dstop, cmd-dunload, cmd-dclear, cmd-report]
---

## Summary

Print a report of everything that happened in the current interactive session between `dstart`/`dtrace` and `dstop`. Shows aliases, functions, bindkeys, and other changes made during the tracked period.

## Syntax / Usage

```zsh
zi dreport
```

No arguments.

## Details

Displays the session investigation report accumulated since `zi dstart` (or `zi dtrace`) was called. The report format mirrors `zi report` for individual plugins but covers all shell activity — not just plugin loads. Useful for diagnosing what an interactive command or script changed in the shell environment.

## Examples

```zsh
zi dstart
# ... run some commands or load something ...
zi dreport  # see what changed
zi dstop
```

## See Also

- cmd-dstart
- cmd-dstop
- cmd-dunload
- cmd-dclear
- cmd-report
