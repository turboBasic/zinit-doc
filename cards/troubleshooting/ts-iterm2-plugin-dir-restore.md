---
id: ts-iterm2-plugin-dir-restore
title: iTerm2 session restore drops into zinit plugin directory
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/139
related: []
---

## Summary

After a system reboot, iTerm2's session restoration can land the shell inside a zinit plugin directory instead of the original working directory. This is caused by zinit changing `$PWD` during plugin loading.

## Question / Problem

A user with iTerm2 session restoration enabled found that after a reboot, new tabs opened inside a zinit plugin directory (e.g. `~/.local/share/zinit/plugins/some-plugin`) rather than the directory they were in before the reboot.

## Answer / Solution

Zinit temporarily changes the working directory into a plugin's directory when running hooks (`atclone`, `atload`, etc.) to resolve relative paths. iTerm2 records `$PWD` at session-save time; if a hook was executing at that moment, the recorded path is a plugin directory.

Workarounds:

1. **Use `nocd` ice** on plugins whose hooks do not need to run inside the plugin directory:
   ```zsh
   zinit ice nocd atload"some-hook"
   zinit light some/plugin
   ```

2. **Reset directory in atload**: add `atload"cd \$HOME"` to the last turbo-loaded plugin to ensure the shell ends up in `$HOME` after all hooks finish.

3. **Defer to turbo mode** (`wait"0"`): turbo-loaded plugins run their hooks after the prompt appears, so iTerm2 captures the correct cwd at prompt time.

## Caveats

This is an interaction between iTerm2's cwd tracking and zinit's hook execution model, not a zinit bug per se. The `nocd` ice is the cleanest fix for individual plugins whose hooks don't need to `cd` into the plugin dir.
