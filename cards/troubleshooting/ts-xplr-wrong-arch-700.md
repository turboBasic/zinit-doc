---
id: ts-xplr-wrong-arch-700
title: Wrong architecture selected by zinit gh-r auto-detection
category: troubleshooting
tags: [binary, ice, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/700
related: []
---

## Summary
When zinit's automatic architecture detection for `from"gh-r"` picks the wrong binary variant, use `bpick` to explicitly match the correct asset filename pattern.

## Question / Problem
A user building a zsh config with multiple binaries from GitHub releases found that `sayanarijit/xplr` was being downloaded for the wrong architecture. The install block used auto-detection without `bpick`:

```zsh
zinit wait lucid from="gh-r" as "null" for \
    sbin'fzf' junegunn/fzf \
    sbin"**/fd" @sharkdp/fd \
    sbin'**/xplr' sayanarijit/xplr
```

## Answer / Solution
Add `bpick` to select the correct asset for the target architecture:

```zsh
# On Linux x86_64 with glibc:
zinit ice from"gh-r" as"null" sbin'**/xplr' bpick'*x86_64*linux*gnu*'
zinit light sayanarijit/xplr

# On macOS ARM:
zinit ice from"gh-r" as"null" sbin'**/xplr' bpick'*aarch64*apple*'
zinit light sayanarijit/xplr
```

For a portable config that works across machines, use a conditional:

```zsh
if [[ $OSTYPE == darwin* ]] && [[ $(uname -m) == arm64 ]]; then
    XPLR_BPICK="*aarch64*apple*"
else
    XPLR_BPICK="*x86_64*linux*gnu*"
fi

zinit ice from"gh-r" as"null" sbin'**/xplr' bpick"${XPLR_BPICK}"
zinit light sayanarijit/xplr
```

## Caveats
Asset naming varies by project. Check the release page to find the exact filename pattern before writing the `bpick` glob. Running `zinit delete sayanarijit/xplr && exec zsh` forces a fresh download with the corrected ice.
