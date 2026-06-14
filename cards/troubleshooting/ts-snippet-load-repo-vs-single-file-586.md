---
id: ts-snippet-load-repo-vs-single-file-586
title: Loading a full plugin repo vs a single file with zinit snippet
category: troubleshooting
tags: [plugin, snippet, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/586
related: []
---

## Summary
`zinit snippet <URL>` downloads only a single file. Plugins with multiple files or a `functions/` directory must be loaded with `zinit light <repo>` (full clone) or `zinit ice svn` (SVN subdirectory checkout).

## Question / Problem
The user tried `zinit snippet https://github.com/zpm-zsh/autoenv/blob/master/autoenv.plugin.zsh` and the plugin failed because zinit did not download the `functions/` directory that the plugin script references.

## Answer / Solution
Use `zinit light` to clone the full repository:

```zsh
zinit light zpm-zsh/autoenv
```

This clones the entire repo and sources the default plugin file (`*.plugin.zsh`, `init.zsh`, etc.) automatically. The `functions/` directory is present on disk alongside the plugin script.

The plugin is cached locally and updated with `zinit update zpm-zsh/autoenv`.

## Caveats
`zinit snippet <URL>` is for single-file scripts (shell functions, aliases, completions). For any plugin that sources relative paths, calls `autoload` from a bundled functions directory, or requires multiple files, use `zinit light <user/repo>` instead.
