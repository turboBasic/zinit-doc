---
id: ts-sbin-completion-file-not-installed-526
title: Completion file from gh-r plugin not installed when using sbin
category: troubleshooting
tags: [completion, binary, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/526
related: []
---

## Summary
When using `sbin` to install a GitHub release binary, zinit does not automatically detect and install completion files that live in non-standard locations within the archive.

## Question / Problem
After installing `helix-editor/helix` with `from'gh-r' sbin'hx'`, the completion file at `contrib/completions/hx.zsh` was not placed under `~/.local/share/zinit/completions`.

```zsh
zi lucid light-mode \
  from'gh-r' sbin'hx' for \
  "helix-editor/helix"
```

## Answer / Solution
Zinit's auto-completion detection looks for files named `_<command>` in the plugin root. A file named `hx.zsh` in a subdirectory will not be detected.

Install the completion manually using `atclone`/`atpull` and `as"completion"`:

```zsh
zi lucid light-mode from'gh-r' sbin'hx' \
    atclone"cp contrib/completions/hx.zsh _hx" \
    atpull"%atclone" for \
  "helix-editor/helix"
```

This copies the completion file to `_hx` in the plugin root where zinit's completion scanner will find it.

## Caveats
The `_` prefix convention is required for zinit to recognize a file as a completion. Files named without a leading `_` (like `hx.zsh`) must be renamed or the completion directory registered manually.
