---
id: cmd-completions
title: "Command: zi completions"
category: commands
tags: [command, completion]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-csearch, cmd-creinstall, cmd-cuninstall, cmd-cdisable, cmd-cenable, cmd-cclear]
---

## Summary

List all completions currently installed and managed by Zinit, displayed in a multi-column layout. Also available as `zi clist`.

## Syntax / Usage

```zsh
zi completions [columns]
zi clist [columns]
```

- `columns` — number of completions to display per line (default: 3). Example: `zi clist 5` prints 5 per line.

## Details

Scans `$ZINIT[COMPLETIONS_DIR]` and lists every completion file Zinit has installed, including its enabled/disabled status. Enabled completions are symlinked into `$fpath`; disabled ones are stored but not linked. This command does not modify anything.

## Examples

```zsh
# List completions, 3 per line (default)
zi completions

# List with 5 per line
zi clist 5
```

## See Also

- cmd-csearch
- cmd-creinstall
- cmd-cuninstall
- cmd-cdisable
- cmd-cenable
- cmd-cclear
