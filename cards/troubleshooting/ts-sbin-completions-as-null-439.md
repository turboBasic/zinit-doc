---
id: ts-sbin-completions-as-null-439
title: "as\"null\" disables completions: use completions ice to re-enable"
category: troubleshooting
tags: [ice, completion, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/439
related: []
---

## Summary
`as"null"` is a shorthand for `pick"/dev/null" nocompletions`, so completions and man pages from `gh-r` binaries are not installed automatically. Use the `completions` ice to re-enable completion management.

## Question / Problem
A user installed several binaries with `as"null" sbin` and found that completions and man pages were absent:

```zsh
zinit as"null" wait"0a" lucid light-mode from"gh-r" sbin for \
  BurntSushi/ripgrep \
  @sharkdp/fd \
  @sharkdp/bat
```

## Answer / Solution
`as"null"` equals `pick"/dev/null" nocompletions`. It intentionally skips sourcing any plugin script and disables automatic completion detection.

To install completions alongside the binary, add `completions` ice (which overrides the `nocompletions` effect of `as"null"`):

```zsh
zinit as"null" wait"0a" lucid light-mode from"gh-r" sbin completions for \
  BurntSushi/ripgrep \
  @sharkdp/fd \
  @sharkdp/bat
```

For man pages, use `atclone` to copy them to `$ZPFX/share/man`:

```zsh
zinit ice as"null" from"gh-r" sbin"**/bat" \
    atclone"cp -vf bat/bat.1 $ZPFX/share/man/man1/" \
    atpull"%atclone"
zinit light @sharkdp/bat
```

## Caveats
Not all `gh-r` releases include completion files. Even with `completions` ice, zinit can only install completions that are present in the downloaded archive. Check the release asset contents manually if completions are missing.
