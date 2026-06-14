---
id: cmd-status
title: "Command: zi status"
category: commands
tags: [command, git, plugin, snippet, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-report, cmd-zstatus, cmd-recently, cmd-update]
---

## Summary

Show the git status for a plugin or SVN status for a snippet. Use this to inspect whether a plugin directory has local modifications or is ahead/behind remote.

## Syntax / Usage

```zsh
zi status {plg-spec}|--all
```

- `--all` — show status for every managed plugin and snippet.

## Details

For git-based plugins, Zinit runs `git status` inside the plugin directory and displays the output. For SVN snippets, it runs `svn status`. This is the standard VCS status view — it reports tracked/untracked changes, merge conflicts, and branch divergence relative to the remote. Useful when troubleshooting why an update produced unexpected results or to check if local edits exist before running `zi update --reset`.

## Examples

```zsh
# Status of a single plugin
zi status zsh-users/zsh-autosuggestions

# Status of all managed plugins and snippets
zi status --all
```

## See Also

- cmd-report
- cmd-zstatus
- cmd-recently
- cmd-update
