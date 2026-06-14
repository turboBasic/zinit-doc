---
id: ts-omzp-per-directory-history-195
title: OMZP::per-directory-history does not install correctly with zinit
category: troubleshooting
tags: [snippet, plugin, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/195
related: []
---

## Summary

Loading `OMZP::per-directory-history` as a snippet causes a "command not found" error on shell startup because the plugin contains a file (`per-directory-history.zsh`) that zinit's snippet handling does not resolve correctly when the snippet directory contains only the index file.

## Symptom

```
per-directory-history.zsh command not found
```

The file `OMZP::per-directory-history` in the zinit snippets directory contains the text `per-directory-history.zsh` rather than the actual zsh script.

## Cause

The OMZ per-directory-history plugin is a directory containing multiple files. Loading it as a bare snippet only fetches the directory index/redirect, not the plugin file. The `svn` ice is required to clone the full subdirectory.

## Fix / Workaround

Use the `svn` ice to download the full plugin directory:

```zsh
zinit ice svn
zinit snippet OMZP::per-directory-history
```

Or specify the exact file path:

```zsh
zinit snippet OMZP::per-directory-history/per-directory-history.zsh
```
