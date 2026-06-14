---
id: ts-iterm2-cwd-restored-plugin-dir-144
title: iTerm2 restores session inside a zinit plugin directory after reboot
category: troubleshooting
tags: [troubleshooting, plugin, installation]
source: https://github.com/zdharma-continuum/zinit/issues/144
related: []
---

## Summary

After a system reboot, iTerm2's session restoration drops the shell into a zinit plugin directory instead of the original working directory. This happens because zinit temporarily changes `$PWD` into the plugin directory during hook execution, and iTerm2 captures this mid-install directory as the restore path.

## Symptom

After reboot, iTerm2 tabs open in paths like:
```
~/.local/share/zinit/plugins/romkatv---powerlevel10k
```
instead of the directory the tab was previously in.

## Cause

During first-time plugin installation, zinit `cd`s into the plugin's directory to run `atclone`, `atpull`, `make`, and similar ices. If a reboot or shell exit happens while this is in progress, iTerm2's "restore" feature records the plugin directory as the shell's last known working directory.

## Fix / Workaround

Use the `nocd` ice on plugins that run build hooks to keep zinit from changing `$PWD`:

```zsh
zinit ice nocd make
zinit light some/plugin-with-makefile
```

Alternatively, allow zinit to finish installing all plugins before closing the initial session (or run `@zinit-scheduler burst` after a fresh install to complete all installs in one session).

To recover from an already-corrupted iTerm2 state, edit the session restoration file in `~/Library/Application Support/iTerm2/` or simply close and reopen the tab manually.

## Caveats

`nocd` changes the working directory context for ice hooks: they run with `$PWD` set to the original directory rather than the plugin directory. Hooks that rely on relative paths within the plugin directory will need to use absolute paths or `$ZINIT_PLUGIN_DIR` instead.
