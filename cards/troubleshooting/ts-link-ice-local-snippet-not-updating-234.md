---
id: ts-link-ice-local-snippet-local-changes-lost-234
title: Local snippet changes not reflected until zinit update — use link ice
category: troubleshooting
tags: [snippet, ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/234
related: []
---

## Summary

When loading a local file as a zinit snippet (e.g. from a dotfiles repo), zinit copies the file into the snippets cache. Edits to the source file are invisible until `zinit update` is run. The `link` ice was introduced to use a symlink instead of a copy, so source changes take effect immediately.

## Symptom

Editing a sourced dotfile managed as a zinit snippet requires running `zinit update <snippet>` or restarting the shell multiple times before the change is visible in a new session.

## Cause

By default, `zinit snippet /path/to/file` copies the file into `$ZINIT[SNIPPETS_DIR]`. The original source file and the cached copy are independent; changes to the source do not propagate automatically.

## Fix / Workaround

Use the `link` ice to create a symlink instead of copying:

```zsh
zinit ice link
zinit snippet /path/to/my/rc-file.zsh
```

With `link`, zinit creates a symlink in the snippets directory pointing to the original file. Edits to the source file are immediately visible in new shell sessions with no `zinit update` required.

## Caveats

- The `link` ice only works with local file paths. It has no effect on URL-based snippets.
- It does not work with plugins (`zinit load`/`zinit light`).
- Uses relative symlinks when `realpath` >= 8.23 is available, otherwise absolute symlinks.
