---
id: ts-iterm2-session-restore-cwd-139
title: iTerm2 session restore drops shell into zinit plugin directory after reboot
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/139
related: []
---

## Summary
After a system reboot, iTerm2's session restore feature can land a shell inside a zinit plugin directory instead of the original working directory, because zinit changes `$PWD` temporarily during plugin installation.

## Question / Problem
A user with iTerm2's session restoration enabled observed that after a reboot, some tabs opened inside a zinit plugin directory rather than the directory the tab was in before the reboot.

## Answer / Solution
This is a side effect of zinit temporarily `cd`-ing into a plugin's directory during `atclone`/`atpull`/`make` hooks on first install. iTerm2 records the shell's current directory at session save time; if the reboot interrupts zinit mid-install, the saved path is inside a plugin directory.

The workaround is to ensure zinit finishes installing all plugins before iTerm2 captures the working directory. Alternatively, use `nocd` ice to prevent zinit from changing into the plugin directory during hook execution:

```zsh
zinit ice nocd atclone"make install"
zinit light some/plugin
```

`nocd` keeps `$PWD` at the shell's original directory while the hooks run, which prevents iTerm2 from recording a plugin directory as the restore path.
