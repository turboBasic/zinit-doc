---
id: ts-cp-mv-multiple-files-semicolon-690
title: "cp and mv ices support multiple files separated by semicolons"
category: troubleshooting
tags: [ice, troubleshooting, binary]
source: https://github.com/zdharma-continuum/zinit/issues/690
related: []
---

## Summary

The `cp` and `mv` ices support multiple file operations in a single ice value by separating entries with `;`, consistent with other multi-value ices like `atclone`.

## Symptom

Users needing to copy or move more than one file after cloning had to chain multiple `zinit ice` calls or use `atclone` workarounds.

## Cause

Not a bug — this documents a feature added in issue #690.

## Fix / Workaround

Separate multiple file operations with `;`:

```zsh
# Move two binaries in one mv ice
zinit ice from"gh-r" as"program" \
  mv"tool-linux-amd64 -> tool; tool-extra-linux -> tool-extra"
zinit load user/repo

# Copy multiple files
zinit ice cp"config.dist -> config; defaults.dist -> defaults"
zinit load user/repo
```

The syntax for each entry is `source -> destination`. Multiple entries are delimited by `;`.

## Caveats

This feature requires a Zinit version that includes the #690 changes. On older versions, use separate `atclone`/`atpull` commands or multiple plugin load statements.
