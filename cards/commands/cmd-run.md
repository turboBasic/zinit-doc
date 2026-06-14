---
id: cmd-run
title: "Command: zi run"
category: commands
tags: [command, plugin, binary]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-cd, cmd-load]
---

## Summary

Run an arbitrary shell command inside a plugin's directory. Useful for executing plugin-provided scripts or tools without changing your current directory.

## Syntax / Usage

```zsh
zi run [-l] [plugin] {command}
```

- `-l` — reuse the previous plugin (skip specifying `plugin` again).
- `plugin` — the plugin spec whose directory should be used as the working directory. Omit when using `-l`.
- `{command}` — the shell command to execute.

## Details

Changes into the specified plugin's directory for the duration of the command, then returns. When `-l` is given, the last plugin directory used in a `run` call is reused, allowing multiple commands to be run in the same plugin directory without repeating the spec.

## Examples

```zsh
# Run make in a plugin's directory
zi run tj/git-extras make install

# Run a command and then another in the same directory
zi run some-user/some-plugin ./build.sh
zi run -l ./test.sh
```

## See Also

- cmd-cd
- cmd-load
