---
id: ts-prezto-snippet-not-loaded-683
title: Prezto module snippets fail to load — "Snippet not loaded (PZT::modules/git)"
category: troubleshooting
tags: [troubleshooting, snippet, installation]
source: https://github.com/zdharma-continuum/zinit/issues/683
related: [ts-svn-not-found-703]
---

## Summary

Attempting to load Prezto modules via `zinit snippet PZT::modules/git` or `PZTM::git` results in "Snippet not loaded". The module requires SVN to download a subdirectory, and likely SVN is unavailable or the path format is wrong.

## Symptom

```
Snippet not loaded (PZT::modules/git)
```

Loading specific files directly produces a path resolution error: `init.zsh` is treated as a directory.

## Cause

Multi-file Prezto modules require the `svn` ice to clone the entire subdirectory. Without it, zinit tries to download a single file and fails. Additionally, some path combinations cause double-path errors.

## Fix / Workaround

Use the `svn` ice when loading Prezto modules with multiple files:

```zsh
zinit ice svn
zinit snippet PZT::modules/git
```

Or with `PZTM::` shorthand:

```zsh
zinit ice svn pick"init.zsh"
zinit snippet PZTM::git
```

If SVN is unavailable, load individual files directly:

```zsh
zinit snippet https://raw.githubusercontent.com/sorin-ionescu/prezto/master/modules/git/alias.zsh
zinit snippet https://raw.githubusercontent.com/sorin-ionescu/prezto/master/modules/git/init.zsh
```

## See Also

- ts-svn-not-found-703
