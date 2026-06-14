---
id: ts-bindkey-priority-turbo-621
title: bindkey set at bottom of .zshrc overridden by turbo-loaded plugin
category: troubleshooting
tags: [turbo, troubleshooting, ice]
source: https://github.com/zdharma-continuum/zinit/discussions/621
related: []
---

## Summary
`bindkey` calls at the bottom of `.zshrc` are overwritten by turbo-loaded plugins that run after the first prompt, because turbo loads run asynchronously after the synchronous part of `.zshrc` finishes.

## Question / Problem
The user set `bindkey '^r' _atuin_search_widget` at the bottom of `.zshrc` but had to `source ~/.zshrc` to make it take effect. Without re-sourcing, the binding was overwritten by a turbo-loaded plugin (zsh-autocomplete).

## Answer / Solution
Move the `bindkey` call into an `atload` hook on the plugin that is being loaded last (or that overwrites the binding):

```zsh
zinit light zdharma-continuum/zinit-annex-binary-symlink
zinit load asdf-vm/asdf

zinit from"gh-r" lbin"!atuin" \
    atload'bindkey "^r" _atuin_search_widget' \
  atuinsh/atuin
```

This ensures the binding is set after atuin's init code runs, overriding whatever the plugin set up.

Alternatively, use the `bindmap` ice to redirect the plugin's own binding:

```zsh
zinit ice bindmap"^R -> ^A"  # redirect the plugin's ^R bind to ^A instead
zinit light some/plugin
```

## Caveats
Turbo mode fires hooks in the order plugins are loaded, not in `.zshrc` source order. Any synchronous `bindkey` call below a `zinit wait` block will run before the turbo plugins do, not after.
