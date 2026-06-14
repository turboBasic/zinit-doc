---
id: ts-delete-no-args-snippets-239
title: "zinit delete without arguments silently deletes the snippets directory"
category: troubleshooting
tags: [troubleshooting, snippet, command]
source: https://github.com/zdharma-continuum/zinit/issues/239
related: [ts-zi-delete-removes-snippets-dir-214]
---

## Summary

Running `zinit delete` without any arguments prompts to delete the entire snippets directory rather than printing usage. This is surprising and destructive behavior. In some versions, no confirmation prompt is shown at all.

## Symptom

```
$ zinit delete
Delete /Users/user/.local/share/zinit/snippets/? (it holds: OMZL::clipboard.zsh, ...)
[yY/n…]
y
Done (action executed, exit code: 0)
```

All snippets are deleted. In other versions, `zinit delete` with no arguments silently deletes the entire snippets directory from `~/.local/share/zinit/snippets/` without any confirmation prompt.

## Cause

`zinit delete` with no arguments defaulted to targeting the snippets directory. The `delete` subcommand's argument parsing fell through to a code path that operated on the snippets directory when no plugin-spec argument was provided. This was a design gap — the command should print usage or error when no target is specified.

## Fix / Workaround

Always specify an explicit target when using `zinit delete`:

```zsh
# Delete a specific plugin
zinit delete user/plugin

# Delete a specific snippet
zinit delete https://example.com/script.zsh

# Delete all plugins and snippets (use with care)
zinit delete --all

# Delete plugins/snippets that are not currently loaded
zinit delete --clean
```

If you accidentally deleted your snippets directory, re-source your `.zshrc` to trigger re-download — zinit fetches missing snippets on source:

```zsh
exec zsh
```

## Caveats

`zinit delete` is irreversible. Always specify the exact plugin spec or URL to avoid unintended deletions. In newer zinit versions this behavior may have been fixed to print usage when no argument is given. Use `zinit delete --help` to check behavior on your version.
