---
id: ts-iterm2-cwd-drops-to-plugin-dir-144
title: iTerm2 session restore after reboot drops shell into a zinit plugin directory
category: troubleshooting
tags: [plugin, troubleshooting, turbo]
source: https://github.com/zdharma-continuum/zinit/issues/144
related: []
---

## Summary

After a system reboot, iTerm2's session restoration feature restores tabs but the working directory becomes a zinit plugin directory instead of the original working directory. This happens because zinit temporarily changes `$PWD` into the plugin directory during hook execution, and iTerm2 captures this mid-install directory as the restore path.

## Symptom

After reboot and iTerm2 session restore, the shell starts in a directory like:

```
~/.local/share/zinit/plugins/some---plugin/
~/.local/share/zinit/plugins/romkatv---powerlevel10k
```

instead of the directory the tab was in before the reboot.

## Cause

Zinit changes the working directory into a plugin's directory when executing `atclone`, `atpull`, `atload`, `atinit`, `make`, and similar ices (unless the `nocd` ice is used). If iTerm2's session saver captures the CWD during plugin loading (which happens asynchronously at shell startup in Turbo mode), it may record a plugin directory as the "last directory." If a reboot or shell exit happens while this is in progress, iTerm2's "restore" feature records the plugin directory as the shell's last known working directory.

## Fix / Workaround

Use the `nocd` ice to prevent zinit from changing into the plugin directory during hook execution:

```zsh
zinit ice nocd atclone"./configure" atpull"%atclone" make
zinit light some/plugin
```

```zsh
zinit ice nocd make
zinit light some/plugin-with-makefile
```

Alternatively, allow zinit to finish installing all plugins before closing the initial session, or run `@zinit-scheduler burst` after a fresh install to complete all installs in one session:

```zsh
@zinit-scheduler burst
```

Set iTerm2's session restoration to not restore the working directory, or ensure zinit's Turbo loading completes before iTerm2 captures the CWD.

To recover from an already-corrupted iTerm2 state, edit the session restoration file in `~/Library/Application Support/iTerm2/` or simply close and reopen the tab manually.

## Caveats

`nocd` changes where `atclone`/`atpull`/`atload` commands run — they execute in the calling shell's `$PWD` rather than the plugin directory. Hooks that rely on relative paths within the plugin directory will need to use absolute paths or `$ZINIT_PLUGIN_DIR` instead.
