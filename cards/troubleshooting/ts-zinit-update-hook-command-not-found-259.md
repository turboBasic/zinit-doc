---
id: ts-zinit-update-hook-command-not-found-259
title: zinit update outputs "command not found" for all internal hook functions
category: troubleshooting
tags: [troubleshooting, ice, command]
source: https://github.com/zdharma-continuum/zinit/issues/259
related: [ts-update-command-not-found-hook-256]
---

## Summary
Running `zinit update --all` produces dozens of "command not found" warnings for internal zinit hook functions (e.g. `∞zinit-reset-hook`, `∞zinit-ps-on-update-hook`) for every updated plugin, caused by a syntax error introduced in the update processing code.

## Symptom
Every plugin update outputs warnings like:

```
∞zinit-reset-hook: command not found
∞zinit-atpull-e-hook: command not found
∞zinit-make-ee-hook: command not found
∞zinit-mv-hook: command not found
∞zinit-cp-hook: command not found
∞zinit-compile-plugin-hook: command not found
∞zinit-make-e-hook: command not found
∞zinit-atpull-hook: command not found
∞zinit-make-hook: command not found
∞zinit-extract-hook: command not found
∞zinit-ps-on-update-hook: command not found
```

Plugin updates still succeed despite the errors.

## Cause
An invalid syntax `if ((...)) && {` in `zinit-install.zsh` caused a parse error that prevented hook functions from being registered during the update run. The condition should be `if ((...)) {`. Fixed in PR #259.

## Fix / Workaround
Update zinit to include PR #259:

```zsh
zinit self-update
```

After updating, run `zinit update --all` again — the warnings will be gone.
