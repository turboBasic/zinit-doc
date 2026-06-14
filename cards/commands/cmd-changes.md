---
id: cmd-changes
title: "zi changes"
category: commands
tags: [command, plugin, git]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-status, cmd-recently, cmd-update, cmd-cd]
---

## Summary

View the git log for a plugin's repository. Shows the commit history to review recent changes after an update.

## Syntax / Usage

```zsh
zi changes {plg-spec}
```

## Details

Runs `git log` inside the plugin's directory and displays the commit history. Useful for reviewing what changed after `zi update` reports new commits, or for getting a sense of a plugin's activity level. The output format is Zinit's default git log view.

## Examples

```zsh
# View recent commits for a plugin
zi changes zsh-users/zsh-autosuggestions
```

## See Also

- cmd-status
- cmd-recently
- cmd-update
- cmd-cd
