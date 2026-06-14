---
id: cmd-list-snippets
title: "zi list-snippets"
category: commands
tags: [command, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-list-plugins, cmd-recently, cmd-snippet]
---

## Summary

List all snippets managed by Zinit in a formatted, colorized tree view. Requires the `tree` program to be installed.

## Syntax / Usage

```zsh
zi list-snippets
```

No arguments.

## Details

Displays the contents of `$ZINIT[SNIPPETS_DIR]` using the `tree` utility (or the command set in `$ZINIT[LIST_COMMAND]`). Each snippet is shown with its cached file structure. If `tree` is not installed, the command will fail with an error about the missing program.

## Examples

```zsh
zi list-snippets
```

## Caveats / Common Mistakes

Requires `tree` or a compatible directory-listing tool. On macOS, install via `brew install tree`. The `$ZINIT[LIST_COMMAND]` hash field can override which command is used.

## See Also

- cmd-list-plugins
- cmd-recently
- cmd-snippet
