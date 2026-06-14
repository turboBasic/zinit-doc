---
id: ts-double-extraction-gh-r-761
title: "Double extraction of gh-r archives corrupts plugin directory"
category: troubleshooting
tags: [binary, ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/761
related: [ts-extract-skipped-on-update-780]
---

## Summary

When `extract'!'` or `extract'!!'` is combined with `from'gh-r'`, the archive is extracted twice during installation. The second pass finds no archive but detects `.jar` files (or similar) as zip archives and tries to extract them, producing errors and corrupting the plugin directory.

## Symptom

```
[ziextract] detected a zip archive in the file lib/some-library-1.2.3.jar.
[ziextract] ERROR: the file `lib/some-library-1.2.3.jar' does not exist or is not a file.
```

Plugin directory ends up in a broken state after fresh install.

## Cause

Two code paths both called `ziextract`: an inline extraction call in the gh-r download code, and the `∞zinit-extract-hook` which runs at `!atclone-pre`. On the second pass, the original archive was already deleted, so `ziextract`'s `--auto` mode fell back to `file(1)` heuristics, misidentifying unrelated files.

## Fix / Workaround

Update zinit to a version containing the fix from PR #761, then PR #780 (which fixed the subsequent regression where extraction was skipped entirely during updates):

```zsh
zinit self-update
```

To recover a broken plugin:

```zsh
zinit delete username/plugin-name
exec zsh  # triggers fresh install
```
