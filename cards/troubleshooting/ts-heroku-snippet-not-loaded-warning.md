---
id: ts-heroku-snippet-not-loaded-warning
title: "Snippet not loaded (heroku)" warning when using trigger-load with sbin
category: troubleshooting
tags: [snippet, ice, troubleshooting, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/discussions/365
related: [ts-mv-ice-rename-file]
---

## Summary

When loading a binary archive from a URL with `sbin` and then loading a companion OMZ snippet, zinit may show a "Snippet not loaded" warning. This has two causes: (1) the two load directives share the same deferred `wait` condition but the snippet tracker has not yet registered the snippet when the status display runs; (2) the `id-as` identifier on the binary block collides with the auto-generated ID zinit assigns to the snippet.

## Question / Problem

A user loaded the heroku CLI binary from a tarball URL and a companion OMZ plugin for aliases, both with the same `wait` condition:

```zsh
zi lucid light-mode wait'[[ -n ${ZLAST_COMMANDS[(r)her*]} ]]' \
    extract"!-" id-as"heroku" \
    nocompile sbin'*bin/heroku->heroku' for \
    "https://cli-assets.heroku.com/heroku-linux-x64.tar.gz"

zi lucid ice wait'[[ -n ${ZLAST_COMMANDS[(r)her*]} ]]'
zi snippet "OMZ::plugins/heroku/heroku.plugin.zsh"
```

The binary worked fine but zinit printed `Snippet not loaded (heroku)`.

## Answer / Solution

The warning appears because zinit tracks snippets by their URL/id. The `id-as"heroku"` on the first block creates an internal ID `heroku`, and when the snippet is evaluated, zinit checks if that ID is already registered and reports it as not loaded if the tracking state is inconsistent.

Fix: give the snippet an explicit `id-as` that does not conflict:

```zsh
zi lucid light-mode \
    wait'[[ -n ${ZLAST_COMMANDS[(r)her*]} ]]' \
    id-as"heroku-completions" \
    for "OMZ::plugins/heroku/heroku.plugin.zsh"
```

Or remove `id-as` from the binary block so zinit uses the URL as the ID (less likely to conflict with the snippet's auto-generated ID).

## Examples

Also noted in the discussion: to hide a vendored binary that shadows a system binary (e.g. heroku's bundled `node`), use `mv`:

```zsh
sbin'*bin/heroku->heroku' mv"bin/node -> bin/node.BAK"
```

## Caveats

The `Snippet not loaded` message is cosmetic — it does not prevent the plugin from functioning. It appears on each shell startup until the load condition is first met.
