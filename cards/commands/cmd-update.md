---
id: cmd-update
title: "Command: zi update"
category: commands
tags: [command, plugin, snippet, git]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-self-update, cmd-status, cmd-delete]
---

## Summary

Pull the latest commits for a plugin or snippet, or update all managed plugins and snippets at once. Supports parallel updates for speed.

## Syntax / Usage

```zsh
zi update [-q] [-r|--reset] {plg-spec}|{URL}|--all [--parallel [N]]
```

- `--all` — update every plugin and snippet Zinit manages.
- `-q` — quiet output.
- `-r` / `--reset` — run `git reset --hard` (plugins) or `svn revert` (SVN snippets) before pulling, to discard any local modifications.
- `--parallel [N]` — run updates concurrently. `N` sets the number of parallel jobs (default is determined by Zinit; example: `--parallel 40`).

## Details

For plugins, Zinit runs `git pull` inside the plugin directory. For snippets, it re-downloads the file. Ice modifiers are re-read from the `._zinit/` subdirectory, so `atpull` hooks fire correctly. A log of new commits is written to `.zinit_lstupd` in the plugin directory. If no new commits were downloaded, `atpull` does not fire unless the `run-atpull` ice is set.

## Examples

```zsh
# Update a single plugin
zi update zsh-users/zsh-autosuggestions

# Update a snippet by URL
zi update https://gist.githubusercontent.com/hightemp/5071909/raw/

# Update all plugins and snippets
zi update --all

# Parallel update with 40 concurrent jobs
zi update --parallel 40

# Reset local changes then update
zi update --reset zsh-users/zsh-syntax-highlighting
```

## Caveats / Common Mistakes

`--reset` discards any local edits inside the plugin directory — do not use it if you have intentional local modifications. Without `--all`, the argument must be the exact plugin spec or URL used at load time.

## See Also

- cmd-self-update
- cmd-status
- cmd-delete
