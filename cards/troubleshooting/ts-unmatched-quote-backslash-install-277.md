---
id: ts-unmatched-quote-backslash-install-277
title: "Unmatched quote" error on startup from extraneous backslash in zinit-install.zsh
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/277
related: []
---

## Summary

On default zinit installations, an `Unmatched "` error fires at shell startup. It was caused by extraneous whitespace and a stray `\` continuation character on lines 1494 and 1790 of `zinit-install.zsh`.

## Symptom

Shell reports an error similar to:

```
zinit-install.zsh:1397: Unmatched "
```

The line number in the error message may not match the actual offending lines.

## Cause

Extraneous `\` characters used for line continuation in `zinit-install.zsh` introduced a syntax error. The backslash caused the parser to treat subsequent lines as continuations, breaking string quoting.

## Fix / Workaround

Update zinit to a version that includes PR #277. The fix removes the stray `\` characters on the affected lines.

To apply manually: remove trailing `\` and any extraneous whitespace on the problematic continuation lines in `zinit-install.zsh`, then reload the shell.
