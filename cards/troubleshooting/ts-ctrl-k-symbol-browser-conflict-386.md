---
id: ts-ctrl-k-symbol-browser-conflict-386
title: Ctrl-K hijacked by zinit symbol browser instead of kill-line
category: troubleshooting
tags: [troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/386
related: []
---

## Summary
Zinit's ctags symbol browser widget was bound to Ctrl-K by default, conflicting with the standard `kill-line` ZLE binding. Additionally, the widget errors when widgets `zle-line-pre-redraw` or `saved-pre-redraw` do not exist (e.g. in tmux without a prompt theme that defines them).

## Symptom
Pressing Ctrl-K displays:

```
Symbol index NOT found, NO DATA to show, sleeping…
```

instead of deleting to end of line. Further widget errors may appear:

```
zi-browse-symbol:zle:384: no such widget 'zle-line-pre-redraw'
zi-browse-symbol:zle:460: no such widget 'saved-pre-redraw'
```

The issue is most reproducible inside tmux without powerlevel10k or a theme that defines `zle-line-pre-redraw`.

## Cause
Zinit bound `zi-browse-symbol` to Ctrl-K unconditionally. This conflicts with the standard `kill-line` binding. Fixed in PR #387 by reassigning the default key to Alt-Shift-Q.

## Fix / Workaround
Update zinit to a version that includes PR #387 (`zinit self-update`). The symbol browser is now on Alt-Q (uppercase Q, i.e. Alt-Shift-Q) by default.

To customize the key binding:

```zsh
zstyle ':zinit:browse-symbol:key' key '^K'  # restore old binding if desired
```

To restore the standard Ctrl-K `kill-line` binding explicitly:

```zsh
bindkey '^K' kill-line
```
