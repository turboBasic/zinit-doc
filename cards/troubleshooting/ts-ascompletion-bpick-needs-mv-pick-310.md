---
id: ts-ascompletion-bpick-needs-mv-pick-310
title: as"completion" with bpick does not install completion without mv and pick ices
category: troubleshooting
tags: [completion, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/310
related: []
---

## Summary

Using `as"completion"` together with `from"gh-r"` and `bpick` is not enough to get the completion file installed. The downloaded file must also be renamed with `mv` and explicitly selected with `pick` for zinit to link it into the completions directory.

## Symptom

The following minimal form silently downloads the file but does not install the completion:

```zsh
zinit for as"completion" from"gh-r" bpick"completions_zsh" @dbrgn/tealdeer
```

Running `zinit csearch` or trying to use the completion shows nothing.

## Cause

Zinit's `as"completion"` mode looks for a file matching the `_*` naming convention (underscore-prefixed). A file named `completions_zsh` does not match this pattern. Without `mv` renaming it to `_tldr` and `pick` explicitly selecting it, zinit does not recognize the file as a completion to install.

## Fix / Workaround

Add `mv` to rename the file to the `_<command>` format, and `pick` to select it:

```zsh
zinit for \
    as"completion" \
    from"gh-r" \
    id-as"tldr-completion/gh-r" \
    bpick"completions_zsh" \
    mv"completions_zsh -> _tldr" \
    pick"_tldr" \
  @dbrgn/tealdeer
```

## Caveats

The `as"completion"` ice requires the completion file to either be named with a leading underscore (`_foo`) or to be explicitly selected via `pick`. The `mv` ice runs after extraction, so rename to the `_` prefix form before zinit tries to install it.
