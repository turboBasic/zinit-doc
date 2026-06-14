---
id: ts-zinit-compile-all-ds-store-156
title: "zinit compile --all treats .DS_Store as a plugin on macOS"
category: troubleshooting
tags: [troubleshooting, command, installation]
source: https://github.com/zdharma-continuum/zinit/issues/156
related: []
---

## Summary

On macOS, Finder creates `.DS_Store` files in the zinit plugins directory. `zinit compile --all` uses a glob without the `/` qualifier, so it treats `.DS_Store` as a plugin directory and attempts (and fails) to compile it.

## Symptom

`zinit compile --all` prints errors about `.DS_Store` being an invalid plugin. The glob at `zinit-autoload.zsh:2332` matches files as well as directories.

## Cause

The glob `"${ZINIT[PLUGINS_DIR]}"/*(DN)` matches all entries including non-directory files. Appending `/` to the glob qualifier (i.e. `*(DN/)`) would restrict matches to directories only.

## Fix / Workaround

No fix merged as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/156

Workaround: delete `.DS_Store` files from the plugins directory before compiling:

```zsh
find "${ZINIT[PLUGINS_DIR]:-~/.local/share/zinit/plugins}" -name '.DS_Store' -delete
zinit compile --all
```

Or prevent Finder from creating them:

```zsh
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
```
