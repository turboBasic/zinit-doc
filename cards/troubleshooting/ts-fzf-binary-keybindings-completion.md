---
id: ts-fzf-binary-keybindings-completion
title: Installing fzf binary with key-bindings and completions from GitHub releases
category: troubleshooting
tags: [binary, completion, ice, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/359
related: [ts-gh-r-binary-install, ts-as-null-completions-override]
---

## Summary

fzf is best installed from GitHub releases with zinit using `from"gh-r"` for the binary and `dl` ice (from `zinit-annex-patch-dl`) to download key-bindings and completion scripts separately, since those are not bundled in the release archive.

## Question / Problem

A user had a working two-block fzf config and asked for a shorter, single-block version that avoids full raw URLs and reuses the fzf plugin already installed via the `for` syntax.

## Answer / Solution

**With `zinit-annex-patch-dl` (recommended — single block):**

```zsh
zinit ice wait lucid from"gh-r" \
    nocompile \
    src'shell/key-bindings.zsh' \
    sbin \
    dl'https://raw.githubusercontent.com/junegunn/fzf/master/shell/completion.zsh -> _fzf_completion;
       https://raw.githubusercontent.com/junegunn/fzf/master/shell/key-bindings.zsh -> key-bindings.zsh;
       https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf-tmux.1 -> $ZPFX/share/man/man1/fzf-tmux.1;
       https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf.1 -> $ZPFX/share/man/man1/fzf.1'
zinit light junegunn/fzf
```

**Without any annex (single block via `atclone`/`atpull`):**

```zsh
zinit ice as"command" from"gh-r" \
    atclone"./fzf --zsh > fzf.zsh" \
    atpull"%atclone" \
    src"fzf.zsh" sbin"fzf"
zinit light junegunn/fzf
```

**Without `patch-dl` annex (two blocks):**

```zsh
# Binary
zinit ice wait lucid from"gh-r" as"program" mv"fzf* -> fzf" pick"fzf/fzf"
zinit light junegunn/fzf-bin

# Key-bindings and completion from the source repo
zinit ice wait lucid as"completion" \
    multisrc'shell/completion.zsh shell/key-bindings.zsh'
zinit light junegunn/fzf
```

**For Termux (fzf installed via package manager):**

```zsh
zinit wait lucid is-snippet for \
    $PREFIX/share/fzf/key-bindings.zsh \
    $PREFIX/share/fzf/completion.zsh
```

## Caveats

The `dl` ice requires `zinit-annex-patch-dl` loaded without turbo. The paths inside `dl` for man pages use `$ZPFX` which defaults to `~/.local/share/zinit/polaris`. The `atclone`/`atpull` approach works without any annex.
