---
id: ts-migration-wiki-trailing-spaces-207
title: Migration wiki snippet breaks zinit due to trailing spaces after backslashes
category: troubleshooting
tags: [installation, migration, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/207
related: []
---

## Summary

The migration wiki code snippet for loading annexes had trailing spaces after the line-continuation backslashes, causing zsh to treat each line as a separate command and fail to find the annex plugins.

## Symptom

```
fatal: destination path '/root/.local/share/zinit/plugins' already exists and is not an empty directory.
Clone failed (code: 128).
/root/.zshrc:78: no such file or directory: zdharma-continuum/zinit-annex-readurl
/root/.zshrc:79: no such file or directory: zdharma-continuum/zinit-annex-bin-gem-node
```

## Cause

In zsh, a backslash followed by a space (` \ ` with trailing space) does not act as a line continuation — it must be `\` immediately followed by a newline. Copy-pasting from the wiki included invisible trailing spaces after the `\`.

## Fix / Workaround

Ensure there is no space between the backslash and the newline in multi-line zinit commands:

```zsh
# Correct — no space after backslash
zinit light-mode for \
    zdharma-continuum/zinit-annex-readurl \
    zdharma-continuum/zinit-annex-bin-gem-node \
    zdharma-continuum/zinit-annex-patch-dl \
    zdharma-continuum/zinit-annex-rust
```

If pasting from documentation and getting errors, inspect with `cat -A` to reveal trailing spaces (`$` marks line endings, `\ $` means space after backslash).
