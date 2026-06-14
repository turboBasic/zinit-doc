---
id: ts-global-alias-breaks-heredoc-720
title: Global alias named EOF or similar breaks zinit heredoc — parse error near >&
category: troubleshooting
tags: [troubleshooting, installation, snippet]
source: https://github.com/zdharma-continuum/zinit/issues/720
related: []
---

## Summary

If the user defines a global alias whose name matches a heredoc delimiter used in `zinit-autoload.zsh` (e.g. `alias -g EOF='2>&1 >'`), zinit's internal `<<EOF` heredoc expands the alias and produces a parse error.

## Symptom

```
/home/user/.local/share/zinit/zinit.git/zinit-autoload.zsh:1273: parse error near `>&'
```

Occurs when running `zinit update` (or on shell startup if `zinit update` is in `.zshrc`).

## Cause

Zsh expands global aliases anywhere in a command line, including inside heredoc delimiters. The delimiter `EOF` in `<<EOF` is treated as a global alias expansion, replacing it with `2>&1 >` and causing a syntax error.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/720

Workaround: avoid defining global aliases whose names collide with shell heredoc delimiters. Rename the alias:

```zsh
# Instead of:
alias -g EOF='2>&1 >'
# Use:
alias -g TOFILE='2>&1 >'
```

Alternatively, source zinit before defining global aliases, and unset `aliases` option only during zinit loading using the `aliases` ice — though zinit does not currently do this automatically.
