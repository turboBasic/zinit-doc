---
id: ts-omzp-macos-missing-files-255
title: OMZP::macos plugin missing auxiliary files (music, spotify scripts)
category: troubleshooting
tags: [snippet, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/255
related: []
---

## Summary

Loading `OMZP::macos` via zinit's snippet shorthand fails because the plugin requires multiple files (including `music` and `spotify` helper scripts) that live in the same directory. Loading a single file snippet does not fetch the entire plugin directory.

## Symptom

```
/Users/user/.local/share/zinit/snippets/OMZP::macos/OMZP::macos:source:265: no such file or directory: .../music
/Users/user/.local/share/zinit/snippets/OMZP::macos/OMZP::macos:source:268: no such file or directory: .../spotify
```

## Cause

`zinit snippet OMZP::macos` downloads only the main plugin file. The `macos` OMZ plugin `source`s auxiliary scripts (`music`, `spotify`) from relative paths, which are not present in the single-file snippet directory. Multi-file OMZ plugins require the `svn` ice to clone the full subdirectory.

## Fix / Workaround

Use the `svn` ice to download the entire plugin directory:

```zsh
zinit ice svn
zinit snippet OMZP::macos
```

Or with Turbo mode:

```zsh
zinit lucid wait svn for OMZP::macos
```

## Caveats

GitHub deprecated SVN support (announced January 2023, removed January 2024). If SVN is unavailable, load the `macos` plugin directly from a full git clone:

```zsh
zinit ice pick"plugins/macos/macos.plugin.zsh" \
    atclone"cp -r plugins/macos/* ." depth"1" \
    nocompile
zinit light ohmyzsh/ohmyzsh
```

Alternatively, find a standalone port of the macos plugin that does not depend on sibling files.
