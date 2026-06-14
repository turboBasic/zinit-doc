---
id: ts-zinit-delete-no-args-239
title: zinit delete with no arguments silently removes the entire snippets directory
category: troubleshooting
tags: [command, troubleshooting, snippet]
source: https://github.com/zdharma-continuum/zinit/issues/239
related: [ts-zi-delete-removes-snippets-dir-214]
---

## Summary
Running `zinit delete` with no arguments silently deletes the entire snippets directory instead of printing usage help or prompting for a target.

## Symptom
After running `zinit delete` without any argument, all cached snippets disappear from `~/.local/share/zinit/snippets/`. No confirmation prompt is shown. The snippets must be re-downloaded on next shell start.

## Cause
The `delete` subcommand's argument parsing fell through to a code path that operated on the snippets directory when no plugin-spec argument was provided.

## Fix / Workaround
Always specify the plugin or snippet to delete explicitly:

```zsh
zinit delete <user/repo>          # delete a specific plugin
zinit delete https://example.com/file.zsh  # delete a snippet by URL
zinit delete --all                 # intentionally delete everything
zinit delete --clean               # delete plugins/snippets not loaded in .zshrc
```

If you accidentally deleted your snippets, they will be re-downloaded automatically on next shell start (zinit fetches missing snippets on source).

## Caveats
In newer zinit versions this behavior may have been fixed to print usage when no argument is given. Use `zinit delete --help` to check behavior on your version.
