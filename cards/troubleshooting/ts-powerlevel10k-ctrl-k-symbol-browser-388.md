---
id: ts-powerlevel10k-ctrl-k-symbol-browser-388
title: Ctrl-K shows symbol browser instead of kill-line when powerlevel10k is loaded
category: troubleshooting
tags: [troubleshooting, plugin, turbo]
source: https://github.com/zdharma-continuum/zinit/issues/388
related: [ts-ctrl-k-symbol-browser-conflict-386]
---

## Summary
When powerlevel10k is loaded alongside zinit, pressing Ctrl-K activates the zinit ctags symbol browser widget instead of the standard `kill-line` ZLE action.

## Symptom
Pressing Ctrl-K displays:

```
Symbol index NOT found, NO DATA to show, sleeping…
```

The line-kill behavior is gone. The regression started after a specific zinit commit (`17fd453dc1`) that introduced the symbol browser. The issue is reliably reproducible on macOS with iTerm2 and powerlevel10k.

## Cause
Zinit bound `zi-browse-symbol` to Ctrl-K unconditionally at load time, overriding the standard `kill-line` binding. The binding was later moved to Alt-Shift-Q (PR #387).

## Fix / Workaround
Update zinit to include PR #387 (`zinit self-update`). The symbol browser moves to Alt-Shift-Q by default.

If you want to restore Ctrl-K to `kill-line` explicitly after updating:

```zsh
bindkey '^K' kill-line
```

To customize the symbol browser key:

```zsh
zstyle ':zinit:browse-symbol:key' key '^[Q'  # Alt-Shift-Q (default post-fix)
```
