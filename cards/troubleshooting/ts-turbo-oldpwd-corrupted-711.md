---
id: ts-turbo-oldpwd-corrupted-711
title: Turbo mode corrupts OLDPWD — "cd -" drops into a plugin directory
category: troubleshooting
tags: [troubleshooting, turbo, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/issues/711
related: [ts-prompt-shows-plugin-dir-turbo-779]
---

## Summary

After turbo-mode plugins finish loading, `$OLDPWD` is set to the last plugin directory that zinit changed into during loading. As a result, `cd -` drops the user into a plugin directory instead of the expected previous directory.

## Symptom

After a fresh shell opens and turbo plugins load, `cd -` navigates to a path like `~/.local/share/zinit/plugins/zdharma-continuum---fast-syntax-highlighting` instead of the last directory visited before opening the terminal.

## Cause

Zinit's turbo scheduler `cd`s into each plugin directory to run hooks. It restores `$PWD` but does not reset `$OLDPWD`, so the last plugin directory lingers as OLDPWD.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/711

The approach of using a zinit null plugin with `atload"cd $HOME"` results in "maximum nested functions" error from the scheduler. A reliable workaround is a one-shot `precmd` hook:

```zsh
autoload -Uz add-zsh-hook
_zinit_reset_oldpwd() {
  OLDPWD=$HOME
  add-zsh-hook -d precmd _zinit_reset_oldpwd
}
add-zsh-hook precmd _zinit_reset_oldpwd
```

## See Also

- ts-prompt-shows-plugin-dir-turbo-779
