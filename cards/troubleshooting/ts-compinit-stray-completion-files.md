---
id: ts-compinit-stray-completion-files
title: "compinit: no such file or directory for zinit completion symlinks"
category: troubleshooting
tags: [completion, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/487
related: [ts-compinit-turbo-mode, ts-blockf-zsh-completions]
---

## Summary

Intermittent `compinit: no such file or directory: /…/zinit/completions/_foo` errors on shell start mean zinit's completions directory has stale symlinks pointing to completion files that no longer exist. Cleaning them with `zinit cclear` resolves the issue.

## Question / Problem

A user saw errors like:

```
compinit:527: no such file or directory: /home/nick/.local/share/zinit/completions/_caffeinate
compinit:527: no such file or directory: /home/nick/.local/share/zinit/completions/_vagrant
compinit:shift:529: shift count must be <= $#
```

on roughly 10% of shell starts. Updating zinit and clearing caches did not help.

## Answer / Solution

These errors mean zinit's completions directory (`~/.local/share/zinit/completions/`) contains symlinks that point to files no longer present on disk — e.g. after a plugin was uninstalled or moved.

**Fix:**

```zsh
zinit cclear    # removes stray/invalid completion symlinks
exec zsh        # reload to rebuild completion cache
```

If the problem recurs, check which plugins registered completions that are now gone:

```zsh
zinit completions    # list all managed completions with plugin names
zinit csearch        # search for available completions
```

**Prevent future stray completions** by always removing plugins cleanly:

```zsh
zinit delete user/plugin   # removes plugin AND its completion symlinks
```

**For completions installed manually** with `zinit creinstall`, uninstall with:

```zsh
zinit cuninstall user/plugin
```

## Caveats

The `cclear` command only removes completions that are stray (target file missing). It does not remove completions for plugins that are still installed but have changed their completion file paths. In that case, run `zinit cuninstall <plugin>` then `zinit creinstall <plugin>`.
