---
id: ts-iterm2-cwd-drops-to-plugin-dir-144
title: iTerm2 session restore after reboot drops shell into a zinit plugin directory
category: troubleshooting
tags: [plugin, troubleshooting, turbo]
source: https://github.com/zdharma-continuum/zinit/issues/144
related: []
---

## Summary

After a system reboot, iTerm2's session restoration feature restores tabs but the working directory becomes a zinit plugin directory instead of the original working directory.

## Symptom

After reboot and iTerm2 session restore, the shell starts in a directory like:

```
~/.local/share/zinit/plugins/some---plugin/
```

instead of the directory the tab was in before the reboot.

## Cause

Zinit changes the working directory into a plugin's directory when executing `atclone`, `atpull`, `atload`, or `atinit` ices (unless the `nocd` ice is used). If iTerm2's session saver captures the CWD during plugin loading (which happens asynchronously at shell startup in Turbo mode), it may record a plugin directory as the "last directory."

## Fix / Workaround

Use the `nocd` ice to prevent zinit from changing into the plugin directory during hook execution:

```zsh
zinit ice nocd atclone"./configure" atpull"%atclone" make
zinit light some/plugin
```

Alternatively, set iTerm2's session restoration to not restore the working directory, or ensure zinit's Turbo loading completes before iTerm2 captures the CWD.

## Caveats

`nocd` changes where `atclone`/`atpull`/`atload` commands run — they execute in the calling shell's `$PWD` rather than the plugin directory. Scripts that reference local files via relative paths will break.
