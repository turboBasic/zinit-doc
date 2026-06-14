---
id: ts-prompt-shows-plugin-dir-turbo-779
title: Prompt displays plugin directory path instead of current directory on shell startup
category: troubleshooting
tags: [troubleshooting, turbo, plugin, performance]
source: https://github.com/zdharma-continuum/zinit/issues/779
related: []
---

## Summary

When turbo-mode plugins change the working directory during loading, `$PWD` is correct but the prompt renders a plugin directory path. Running `pwd` resets the display to the real path.

## Symptom

Prompt shows something like `user@host~plugins/zdharma-continuum---fast-syntax-highlighting %` instead of `user@host~ %`. Running `pwd` immediately corrects the prompt. The issue is intermittent — not every shell open reproduces it.

## Cause

Turbo-mode plugin loading uses `chpwd`-like directory switching internally. If the prompt is rendered before zinit finishes restoring the original working directory, the prompt theme reads the stale plugin directory path. The root cause is that OLDPWD is also corrupted by turbo loading (see issue #711).

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/779

Workaround: add a final turbo-loaded null entry that restores directory:

```zsh
zinit wait'2c' as'null' lucid atload'builtin cd -q $HOME' light-mode for zdharma-continuum/null
```

Note: deep nesting of zinit's scheduler may reject this approach with "maximum nested functions" — if so, put the `cd $HOME` in a `precmd` hook instead:

```zsh
autoload -Uz add-zsh-hook
_zinit_fix_cwd() { [[ $PWD != $HOME ]] && builtin cd -q $HOME; add-zsh-hook -d precmd _zinit_fix_cwd }
add-zsh-hook precmd _zinit_fix_cwd
```
