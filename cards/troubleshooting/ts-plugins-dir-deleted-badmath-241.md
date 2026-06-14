---
id: ts-plugins-dir-deleted-badmath-241
title: "Bad math expression error after manually deleting the plugins directory"
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/241
related: []
---

## Summary

After manually deleting `~/.local/share/zinit/plugins/`, starting a new shell session silently fails to register hooks. Plugins that rely on `atclone`/`atpull` hooks do not run their hooks during re-installation in that session. The root cause is a math expression error swallowed by `/dev/null` redirection.

## Symptom

No visible error (redirected to `/dev/null`), but `atclone`/`atpull` hooks from annexes do not fire during plugin (re-)installation in the same session. The next session works correctly after the plugins directory is recreated.

## Cause

When `~/.local/share/zinit/plugins/` does not exist, zinit calls `.zinit-compinit &>/dev/null` during directory recreation. At that point `$OPTS` is unset, causing `[[: bad math expression: operand expected`. The error is hidden by the redirection, but the compinit call exits early without registering annex hooks. Fixed in PR #241.

## Fix / Workaround

After manually deleting the plugins directory, start a **new** shell session rather than re-sourcing in the current session. The first new session will recreate the directory cleanly and hooks will register correctly:

```zsh
exec zsh
```

Alternatively, update zinit before deleting the plugins directory to get the fix.

## Caveats

Do not delete zinit's working directories manually while in an active session. Use `zinit delete --all` or `zinit delete --clean` instead, which handle the cleanup sequence correctly.
