---
id: ts-omzp-aliases-cheatsheet-missing-571
title: "OMZP::aliases als command fails — cheatsheet.py not found"
category: troubleshooting
tags: [snippet, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/571
related: []
---

## Summary

Loading the OMZ `aliases` plugin via `zinit wait lucid for OMZP::aliases` causes the `als` command to fail because it tries to run `cheatsheet.py` from the snippet directory, which is a single-file snippet and does not contain the full plugin directory.

## Symptom

```
/path/.local/share/zinit/snippets/OMZP::aliases/cheatsheet.py: [Errno 2] No such file or directory
```

Running `als git` or any `als` call fails with a Python "no such file" error.

## Cause

The OMZ `aliases` plugin (`OMZP::aliases`) consists of multiple files including `aliases.plugin.zsh` and `cheatsheet.py`. When loaded as a single-file snippet using the `OMZP::` shorthand without `svn`, only `aliases.plugin.zsh` is downloaded. The plugin script references `cheatsheet.py` relative to its own directory, which doesn't exist in the snippet cache.

## Fix / Workaround

Load the plugin using `svn` ice to clone the entire directory:

```zsh
zinit ice svn wait lucid
zinit snippet OMZP::aliases
```

Or use the full GitHub URL with `svn`:

```zsh
zinit ice svn wait lucid
zinit snippet https://github.com/ohmyzsh/ohmyzsh/trunk/plugins/aliases
```

## See Also

- Use `zi ice svn` for any OMZ plugin that contains multiple files or subdirectories.
