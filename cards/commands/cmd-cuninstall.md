---
id: cmd-cuninstall
title: "zi cuninstall"
category: commands
tags: [command, completion, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-creinstall, cmd-completions, cmd-cdisable]
---

## Summary

Uninstall (remove) completions for a plugin from Zinit's completions directory. The plugin itself is not deleted.

## Syntax / Usage

```zsh
zi cuninstall {plg-spec}
```

## Details

Removes the completion symlinks installed by `zi creinstall` or automatically at plugin load time. After uninstalling, the completions will no longer appear in `zi completions` and will not be available to `compinit`. The plugin source directory is untouched. Useful when you want to stop using a plugin's completions without fully removing the plugin.

## Examples

```zsh
# Remove completions for a plugin
zi cuninstall zsh-users/zsh-completions
```

## See Also

- cmd-creinstall
- cmd-completions
- cmd-cdisable
