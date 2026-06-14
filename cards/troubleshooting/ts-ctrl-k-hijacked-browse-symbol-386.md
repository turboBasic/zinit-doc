---
id: ts-ctrl-k-hijacked-browse-symbol-386
title: Ctrl+K hijacked by zi-browse-symbol widget showing "Symbol index NOT found"
category: troubleshooting
tags: [troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/386
related: []
---

## Summary

After a zinit update, pressing Ctrl+K in the shell triggers the `zi-browse-symbol` widget instead of the standard `kill-line` ZLE action, displaying "Symbol index NOT found, NO DATA to show, sleeping…".

## Symptom

Pressing Ctrl+K shows:

```
Symbol index NOT found, NO DATA to show, sleeping…
zi-browse-symbol:zle:384: no such widget `zle-line-pre-redraw'
zi-browse-symbol:zle:385: no such widget `zle-line-pre-redraw'
```

## Cause

A commit introduced the `zi-browse-symbol` feature and bound it to Ctrl+K by default, conflicting with standard terminal usage. The binding was later changed to Alt+Q.

## Fix / Workaround

Update zinit to a version that moved the binding to Alt+Q:

```zsh
zinit self-update
exec zsh
```

If still affected after updating, manually rebind or disable the widget in `.zshrc`:

```zsh
# Remove the zi-browse-symbol binding from Ctrl-K
bindkey -r '^K'

# Or customize the key via zstyle before loading zinit
zstyle ':zinit:browse-symbol:key' key '^[q'  # Alt-q
```

## Caveats

The `zi-browse-symbol` widget requires a ctags index (`TAGS` file). Without it the widget always shows "Symbol index NOT found". If you never use ctags integration, disabling the binding entirely is the cleanest solution.
