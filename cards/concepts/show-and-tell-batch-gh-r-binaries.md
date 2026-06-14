---
id: show-and-tell-batch-gh-r-binaries
title: "Show & Tell: Batch-installing multiple gh-r binaries with sbin"
category: concepts
tags: [binary, annex, ice, installation, turbo]
source: https://github.com/zdharma-continuum/zinit/discussions/439
related: [ts-as-null-completions-override, ts-bpick-compressed-file]
---

## Summary

A pattern for replacing Homebrew with zinit for managing multiple CLI binaries from GitHub releases, using `as"null"` + `sbin` in a single turbo `for` block.

## Details

Key points:
- `as"null"` prevents zinit from trying to source the binary as a zsh plugin and disables completion auto-detection
- `sbin` (from `zinit-annex-bin-gem-node`) creates shims in `$ZPFX/bin`
- Per-plugin `sbin` values override the shared one for tools with non-standard binary paths
- `wait"0a"` defers to after the first prompt with the earliest possible delay

## Examples

```zsh
zinit as"null" wait"0a" lucid light-mode from"gh-r" sbin for \
    achannarasappa/ticker \
    tarkah/tickrs \
    jesseduffield/lazydocker \
    jesseduffield/lazygit \
    ekzhang/bore \
    sbin"**/rg"     BurntSushi/ripgrep \
    sbin"**/fd"     @sharkdp/fd \
    sbin"**/bat"    @sharkdp/bat \
    sbin"**/delta"  dandavison/delta \
    sbin"bin/exa"   ogham/exa
```

For tools that include completions in their release archives, add completions management:

```zsh
# After the batch load, install completions for tools that bundle them
zinit creinstall BurntSushi/ripgrep   # installs _rg
zinit creinstall @sharkdp/bat         # installs _bat
zinit creinstall @sharkdp/fd          # installs _fd
```

Run `zinit creinstall` once interactively, or add it to `atload` per plugin in the `for` block.

## See Also

- [ts-as-null-completions-override](#) — why completions are missing with `as"null"` and how to restore them
