---
id: ts-id-as-local-snippet-nickname
title: Using id-as to give a nickname to a plugin or long-URL snippet
category: troubleshooting
tags: [ice, snippet, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/365
related: [ts-heroku-snippet-not-loaded-warning]
---

## Summary

`id-as` assigns a short identifier to a plugin or snippet so you can reference it by that name in `zinit update`, `zinit delete`, and other commands, instead of the full URL or repo path.

## Question / Problem

When installing tools from long URLs (e.g. Heroku CLI tarball, custom download endpoints), the default ID zinit uses is the full URL — unwieldy to type for updates and deletes.

## Answer / Solution

```zsh
# Without id-as: referenced by full URL
zinit ice extract"!-" nocompile sbin'*bin/heroku->heroku'
zinit snippet "https://cli-assets.heroku.com/heroku-linux-x64.tar.gz"

# With id-as: referenced by short name
zinit ice id-as"heroku" extract"!-" nocompile sbin'*bin/heroku->heroku'
zinit snippet "https://cli-assets.heroku.com/heroku-linux-x64.tar.gz"

# Now manageable by short name
zinit update heroku
zinit delete heroku
```

Also useful for avoiding conflicts when loading the same repo multiple times with different ices:

```zsh
zinit ice id-as"fast-syntax-highlighting-extra" from"gh-r" ...
zinit light zdharma-continuum/fast-syntax-highlighting
```

## Examples

`recall` shows the stored ices for a given id:

```zsh
zinit recall heroku
# outputs: zinit ice id-as"heroku" extract"!-" nocompile sbin'*bin/heroku->heroku'
```

## Caveats

`id-as` must be unique across all loaded plugins and snippets. Using the same `id-as` for two different entries causes the second to be ignored (zinit will warn with "plugin already registered" unless `ZINIT[MUTE_WARNINGS]=1` is set).
