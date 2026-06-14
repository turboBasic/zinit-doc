---
id: ts-as-null-completions-override
title: Getting completions when using as"null" with gh-r binaries
category: troubleshooting
tags: [completion, ice, binary, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/439
related: [ts-blockf-zsh-completions, ts-bpick-compressed-file]
---

## Summary

`as"null"` is shorthand for `pick"/dev/null" nocompletions`. Using it with `sbin` installs the binary shim but disables completion detection. Use `completions` ice to re-enable completion management, or install completions separately via `zinit creinstall`.

## Question / Problem

A user loaded multiple gh-r binaries with `as"null" sbin`:

```zsh
zinit as"null" wait"0a" lucid light-mode from"gh-r" sbin for \
    jesseduffield/lazygit \
    jesseduffield/lazydocker \
    sbin"**/rg" BurntSushi/ripgrep \
    sbin"**/fd" @sharkdp/fd \
    sbin"**/bat" @sharkdp/bat
```

Completions were absent. Tried adding `completions` ice but zinit tried to download it as if it were a program name.

## Answer / Solution

`as"null"` hardcodes `nocompletions`, and the `completions` ice overrides `as"null"` for completion detection — but its syntax is tricky in `for` blocks where it can be parsed as a plugin name.

**Option 1 — install completions after the fact** (most reliable):

```zsh
zinit creinstall BurntSushi/ripgrep
zinit creinstall @sharkdp/bat
```

Run once interactively. Zinit will find and symlink `_rg`, `_bat`, etc. into the completions directory.

**Option 2 — separate completion snippet** for tools that bundle them:

```zsh
# ripgrep ships _rg in its release archive
zinit ice as"completion" id-as"rg-completion"
zinit snippet "https://raw.githubusercontent.com/BurntSushi/ripgrep/master/crates/core/flags/completions/rg.zsh"
```

**Option 3 — use `completions` ice explicitly per plugin** (not in a shared `for` block):

```zsh
zinit ice from"gh-r" as"null" sbin"**/bat" completions
zinit light @sharkdp/bat
```

## Caveats

Not all gh-r releases include completion files in the archive. Check the release asset contents first. Tools like `exa` may not include zsh completions in the GitHub release, requiring a separate snippet.
