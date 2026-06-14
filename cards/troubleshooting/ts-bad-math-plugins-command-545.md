---
id: ts-bad-math-plugins-command-545
title: "Bad math expression illegal character in zinit plugins on Ubuntu WSL2"
category: troubleshooting
tags: [troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/545
related: []
---

## Summary

Running `zinit plugins` on Ubuntu 22.04 / WSL2 with zsh 5.8.1 produces `bad math expression: illegal character: "` when no plugins are loaded, due to a string used in an arithmetic context.

## Symptom

```
% zi plugins
==> Plugins
.zinit-list-plugins:18: bad math expression: illegal character: "
U %/home/user/.local/share/zinit/repo
```

## Cause

The `zinit plugins` command used a bare string in an arithmetic expression that included a quote character, which zsh rejected as invalid math syntax. The bug appeared on zsh 5.8.1 but not newer versions.

## Fix / Workaround

Update zinit (fixed in PR #559):

```zsh
zinit self-update
```

No configuration change is needed.
