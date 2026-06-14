---
id: reset
title: "Ice: reset''"
category: ices
tags: [ice, git, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [atclone, atpull, run-atpull]
---

## Summary

`reset` discards local changes in the plugin directory before pulling updates. For git
plugins it runs `git reset --hard HEAD`; for SVN snippets it runs `svn revert`; for
file snippets and `gh-r` plugins it runs `rm -rf *`.

## Syntax / Usage

```zsh
zi ice reset
```

## Details

When `atclone''` or other hooks modify files in the plugin directory, subsequent `git
pull` calls may report conflicts. `reset` clears those local modifications before the
pull so updates proceed cleanly.

`reset` is a flag ice — it takes no value. It runs before `git pull` during `zinit
update`.

## Examples

```zsh
# LS_COLORS: atclone generates c.zsh; reset clears it before update
zi ice reset atclone"dircolors -b LS_COLORS > c.zsh" atpull'%atclone' pick"c.zsh" nocompile'!'
zi light trapd00r/LS_COLORS
```

## See Also

- atclone
- atpull
- run-atpull
