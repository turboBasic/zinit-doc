---
id: cmd-creinstall
title: "zi creinstall"
category: commands
tags: [command, completion, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-cuninstall, cmd-completions, cmd-csearch, cmd-cclear]
---

## Summary

Install completions for a plugin without loading the plugin itself. Use this to set up completions from a local directory or a plugin that has already been downloaded.

## Syntax / Usage

```zsh
zi creinstall [-q] [-Q] {plg-spec}
```

- `-q` — quiet.
- `-Q` — quiet all (suppress all output).

`{plg-spec}` can be an absolute local path (e.g., `%HOME/my_completions`).

## Details

Scans the plugin directory for underscore-prefixed completion files (`_*`) and installs (symlinks) them into `$ZINIT[COMPLETIONS_DIR]`. If completions were previously installed they are first removed and reinstalled. This is useful for handling completions without loading any plugin code, or for re-syncing completions after a manual update.

## Examples

```zsh
# Install completions from a local directory (run once, interactively)
zi creinstall %HOME/my_completions

# Reinstall completions for a plugin
zi creinstall zsh-users/zsh-completions
```

## Caveats / Common Mistakes

`%HOME` is a Zinit shorthand for `$HOME` in plugin spec notation. Use it instead of `$HOME` when passing paths to Zinit commands.

## See Also

- cmd-cuninstall
- cmd-completions
- cmd-csearch
- cmd-cclear
