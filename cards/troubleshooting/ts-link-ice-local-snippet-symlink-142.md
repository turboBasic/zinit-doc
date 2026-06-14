---
id: ts-link-ice-local-snippet-symlink-142
title: link ice — local snippet changes not reflected without zinit update
category: troubleshooting
tags: [ice, snippet, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/142
related: []
---

## Summary

Without the `link` ice, zinit copies local snippet files into its cache directory. Edits to the source file are not reflected until `zinit update` is run. The `link` ice replaces the copy with a symlink so changes take effect immediately on the next shell start.

## Symptom

A local dotfile managed as a zinit snippet is edited, but the new shell still loads the old version. Running `zinit update <snippet>` is required every time a change is made.

## Cause

By default `zinit snippet /path/to/file` copies the file into `$ZINIT[SNIPPETS_DIR]`. The cached copy is stale until explicitly refreshed.

## Fix / Workaround

Add the `link` ice to create a symlink instead of a copy:

```zsh
zinit ice link
zinit snippet /path/to/your/rc-file.zsh
```

With `link`, the cached entry is a symlink to the original file. Changes to the source are immediately visible when a new shell is started, with no `zinit update` required.

## Caveats

- `link` only works with local path snippets. URL-based snippets and plugins are not supported.
- Uses relative symlinks when `realpath` >= 8.23 is available; otherwise uses absolute symlinks.
- If the source file is moved or deleted, the symlink becomes dangling and the snippet will fail to load.
