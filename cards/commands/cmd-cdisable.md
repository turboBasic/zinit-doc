---
id: cmd-cdisable
title: "zi cdisable"
category: commands
tags: [command, completion]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-cenable, cmd-completions, cmd-cuninstall]
---

## Summary

Disable a specific installed completion without uninstalling it. The completion file remains on disk but is removed from the active `$fpath` symlinks.

## Syntax / Usage

```zsh
zi cdisable {cname}
```

`{cname}` is the completion name, typically the filename without the leading underscore (e.g., `git` for `_git`).

## Details

Removes the symlink for the named completion from `$ZINIT[COMPLETIONS_DIR]` (the directory in `$fpath`), making it invisible to `compinit`. The source file in the plugin directory is untouched. The completion can be re-enabled at any time with `zi cenable`. This lets you selectively suppress one completion without removing the whole plugin or running `cuninstall`.

## Examples

```zsh
# Disable the _git completion
zi cdisable git

# Disable the _docker completion
zi cdisable docker
```

## See Also

- cmd-cenable
- cmd-completions
- cmd-cuninstall
