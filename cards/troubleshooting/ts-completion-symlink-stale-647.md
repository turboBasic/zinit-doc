---
id: ts-completion-symlink-stale-647
title: compinit reports missing completion file that actually exists — stale symlink in completions dir
category: troubleshooting
tags: [troubleshooting, completion, installation]
source: https://github.com/zdharma-continuum/zinit/issues/647
related: []
---

## Summary

`compinit` prints an error about a missing completion file (e.g. `_nvm`) even though the file physically exists. The zinit completions directory contains a stale or broken symlink pointing to the real file.

## Symptom

```
compinit:527: no such file or directory: ~/.local/share/zinit/completions/_nvm
```

The file at the reported path exists when checked with `ls`, but the error appears on every shell start.

## Cause

The zinit `completions/` directory uses symlinks to plugin completion files. If a plugin was updated and zinit recreated the plugin directory with a different inode or path, the old symlink becomes dangling. `compinit` resolves the symlink and finds the target missing.

## Fix / Workaround

Reinstall completions to refresh symlinks:

```zsh
zinit cclear       # remove broken/stray completion symlinks
zinit creinstall   # reinstall completions for all loaded plugins
```

Or target the specific plugin:

```zsh
zinit creinstall nvm-sh/nvm
```

If the error persists, delete the stale symlink manually:

```zsh
rm ~/.local/share/zinit/completions/_nvm
zinit creinstall nvm-sh/nvm
```
