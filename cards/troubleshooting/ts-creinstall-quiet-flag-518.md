---
id: ts-creinstall-quiet-flag-518
title: "zinit creinstall -q / -Q not quiet — still prints installation messages"
category: troubleshooting
tags: [troubleshooting, command, completion]
source: https://github.com/zdharma-continuum/zinit/issues/518
related: []
---

## Summary

`zinit creinstall -Q` (or `-q`) is documented to suppress output, but continues to print "==> Installed 1 completion" messages. A fix PR (#520) was opened.

## Symptom

```
❯ zinit creinstall -Q ~/.config/zsh/completions
Symlinking completion _cargo to /home/user/.local/share/zinit/completions
==> Installed 1 completion
```

Output is printed despite the quiet flag.

## Cause

The `--quiet` / `--force` flag parsing for `creinstall` was broken. The fix is tracked in PR #520 which was opened but not yet merged.

## Fix / Workaround

A fix PR (#520) is under review. Track https://github.com/zdharma-continuum/zinit/issues/518

Workaround: redirect output to `/dev/null`:

```zsh
zinit creinstall ~/.config/zsh/completions > /dev/null 2>&1
```

Or avoid calling `creinstall` in `.zshrc` on every shell open — run it once manually after adding new completions.
