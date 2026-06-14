---
id: ts-sbin-tmux-gh-r-391
title: Installing tmux binary from GitHub releases with sbin shims
category: troubleshooting
tags: [binary, annex, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/391
related: []
---

## Summary
Installing `tmux/tmux` from GitHub releases with `sbin` fails because the tmux release tarball contains a source tree, not a pre-built binary; the binary must be compiled with `make`.

## Question / Problem
The user's original working setup used `as"program" mv"tmux* -> tmux"`. Switching to the newer `sbin`-based syntax with `as"null"` caused failures:

```zsh
zinit for \
    from'gh-r' \
    as'null' \
    sbin'**/tmux* -> tmux' \
  tmux/tmux
```

## Answer / Solution
`tmux/tmux` on GitHub releases ships a source tarball, not a compiled binary. The `sbin` approach works for repos that release pre-built binaries. For tmux, either:

1. Keep the original approach and compile:
   ```zsh
   zinit ice from"gh-r" as"program" mv"tmux* -> tmux"
   zinit load tmux/tmux
   ```
   This only works if the release actually contains a binary for your platform.

2. Build from source using `make`:
   ```zsh
   zinit ice as"program" atclone"./configure" atpull"%atclone" make pick"tmux"
   zinit light tmux/tmux
   ```

3. Use a package manager (Homebrew, apt) and let zinit manage only shell plugins.

## Caveats
`as"null"` combined with `sbin` disables default file sourcing and completions. It is designed for repos that publish pre-built binary archives, not source releases.
