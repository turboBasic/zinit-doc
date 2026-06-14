---
id: ts-fzf-binary-keybindings-completions-359
title: Installing fzf binary, key-bindings, and completions via zinit
category: troubleshooting
tags: [binary, completion, ice, snippet, turbo]
source: https://github.com/zdharma-continuum/zinit/discussions/359
related: []
---

## Summary
Installing fzf with zinit requires separate handling of the binary (from GitHub releases) and the shell integration files (key-bindings and completions), which can be fetched with the `dl''` ice.

## Question / Problem
The user had a working but verbose setup using two separate zinit stanzas and asked for a more concise approach.

## Answer / Solution
The user's working configuration combines `from"gh-r"` for the binary with `dl''` to fetch the shell integration files from the fzf source repo at the same time:

```zsh
zinit ice wait lucid from"gh-r" nocompile src'shell/key-bindings.zsh' sbin \
      dl'https://raw.githubusercontent.com/junegunn/fzf/master/shell/completion.zsh -> _fzf_completion;
         https://raw.githubusercontent.com/junegunn/fzf/master/shell/key-bindings.zsh -> key-bindings.zsh;
         https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf-tmux.1 -> $ZPFX/share/man/man1/fzf-tmux.1;
         https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf.1 -> $ZPFX/share/man/man1/fzf.1'
zinit light junegunn/fzf
```

A more modern single-stanza approach using `atclone`/`atpull`:

```zsh
zinit ice as"command" from"gh-r" \
      atclone"./fzf --zsh > fzf.zsh" \
      atpull"%atclone" \
      src"fzf.zsh" sbin"fzf"
zinit light junegunn/fzf
```

## Caveats
The `dl''` ice requires the `zinit-annex-patch-dl` annex to be loaded. Without it, `dl''` is silently ignored. The `atclone`/`atpull` approach works without any annex.
