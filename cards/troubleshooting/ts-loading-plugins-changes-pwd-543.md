---
id: ts-loading-plugins-changes-pwd-543
title: "Loading plugins corrupts or changes PWD"
category: troubleshooting
tags: [plugin, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/543
related: []
---

## Summary

Loading certain plugins (especially `fast-syntax-highlighting`) causes `$PWD` to change to a garbled string like `~/-M fsh_sy_h_append 2 2 -fsh_sy_h_shappend`.

## Symptom

After sourcing `.zshrc` with zinit plugin loads, `$PWD` becomes a nonsensical string containing plugin internal function names:

```
zinit light zsh-users/zsh-autosuggestions
zinit light zdharma-continuum/fast-syntax-highlighting
# PWD is now: ~/-M fsh_sy_h_append 2 2 -fsh_sy_h_shappend
```

## Cause

The `atload`, `atinit`, and similar ices execute their code with `cd` into the plugin directory by default. If the plugin itself modifies `$PWD` or if the hook code has an error that leaves the directory set to an internal variable, `$PWD` is not restored correctly. The `nocd` ice was introduced to address the general case; the specific symptom often traces back to a plugin bug.

## Fix / Workaround

Use the `nocd` ice to prevent zinit from changing into the plugin directory when running hooks:

```zsh
zinit ice nocd
zinit light zdharma-continuum/fast-syntax-highlighting
```

Alternatively, add `atload'cd $OLDPWD'` — though `nocd` is the cleaner solution:

```zsh
zinit ice atload'true'  # ensure directory is restored
zinit light zdharma-continuum/fast-syntax-highlighting
```

If `$PWD` is already corrupted in a session, reset it:

```zsh
cd ~
```
