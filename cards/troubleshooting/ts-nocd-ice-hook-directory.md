---
id: ts-nocd-ice-hook-directory
title: Preventing zinit from changing directory when running hooks (nocd ice)
category: troubleshooting
tags: [ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/139
related: [ts-iterm2-plugin-dir-restore, ts-eval-hook-external-tool]
---

## Summary

By default, zinit `cd`s into a plugin's directory before running `atinit`, `atload`, and other hooks, so that relative paths in those hooks resolve correctly. The `nocd` ice disables this behavior when the hook does not need to run inside the plugin directory.

## Question / Problem

Hooks like `atload` and `atclone` run with `$PWD` set to the plugin directory. This can cause side-effects (e.g. iTerm2 session restore landing in a plugin dir) or problems if the hook uses relative paths that should resolve against a different directory.

## Answer / Solution

Add `nocd` to skip the directory change before hook execution:

```zsh
zinit ice nocd atload"some-setup-command"
zinit light user/plugin
```

With `nocd`, hooks run with whatever `$PWD` was at the time zinit processes the plugin — typically `$HOME` during `.zshrc` sourcing.

## Examples

Useful when `atload` sets environment variables or runs commands that do not need to be relative to the plugin:

```zsh
zinit ice nocd atload"
    export MY_VAR=value
    source $HOME/.config/tool/init.zsh
"
zinit light user/some-plugin
```

## Caveats

Do not use `nocd` when `atclone` or `atpull` hooks reference files relative to the plugin directory (e.g. `./configure`, `make`, `cp file.zsh ...`). Those hooks depend on being inside the plugin directory to find their files.
