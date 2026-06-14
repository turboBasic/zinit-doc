---
id: ts-terminal-restore-drops-into-plugin-dir-148
title: iTerm2/terminal session restore drops user into a zinit plugin directory
category: troubleshooting
tags: [troubleshooting, turbo, installation]
source: https://github.com/zdharma-continuum/zinit/issues/148
related: [ts-turbo-oldpwd-corrupted-711, ts-prompt-shows-plugin-dir-turbo-779]
---

## Summary

After system reboot, iTerm2's session restore or VS Code terminal restore opens tabs in a zinit plugin subdirectory instead of the user's home directory or the previous working directory. This is caused by turbo mode leaving `$PWD` set to a plugin directory.

## Symptom

After reboot, terminal tabs open in paths like `~/.local/share/zinit/plugins/zdharma-continuum---fast-syntax-highlighting/` instead of the expected directory.

## Cause

Turbo-mode plugin loading changes into each plugin directory to run hooks. If the terminal session is snapshotted (for restore) at a moment during turbo loading, or if the final `$PWD` is not restored, the plugin directory is captured as the "current directory" for the session.

## Fix / Workaround

Add a `precmd` hook to reset `$PWD` and `$OLDPWD` to `$HOME` after zinit finishes loading:

```zsh
autoload -Uz add-zsh-hook
_zinit_fix_cwd() {
  builtin cd -q "$HOME"
  add-zsh-hook -d precmd _zinit_fix_cwd
}
add-zsh-hook precmd _zinit_fix_cwd
```

This runs once on the first prompt and then removes itself.

## See Also

- ts-turbo-oldpwd-corrupted-711
- ts-prompt-shows-plugin-dir-turbo-779
