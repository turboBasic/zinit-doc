---
id: ts-update-parse-error-257
title: "zinit update fails with parse error near '}' and command not found: ∞zinit-reset-hook"
category: troubleshooting
tags: [troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/257
related: []
---

## Summary

Running `zinit update --all` produces a parse error and "command not found" errors for internal hooks like `∞zinit-reset-hook` and `∞zinit-ps-on-update-hook`. This was caused by an invalid syntax introduced in a PR.

## Symptom

```
.zinit/bin/zinit-install.zsh:1217: parse error near `}'
.zinit-update-or-status:331: command not found: ∞zinit-ps-on-update-hook
.zinit-update-or-status-snippet:24: command not found: .zinit-update-snippet
```

## Cause

A syntax error was introduced in `zinit-install.zsh`: `if ((...)) && {` is invalid zsh syntax (it should be `if ((...)) {`). This caused the parser to fail, leaving internal hook functions undefined. Fixed in PR #259.

## Fix / Workaround

Update zinit to get the parse error fix:

```zsh
# If zinit update itself is broken, pull manually
cd ~/.local/share/zinit/zinit.git
git pull
exec zsh
```

After updating:

```zsh
zinit self-update
zinit update --all
```

## Caveats

If the shell session is already broken, start a new session with `exec zsh` before running `zinit update`.
