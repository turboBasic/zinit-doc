---
id: ts-for-syntax-multi-plugin
title: Loading multiple plugins with the for-syntax and per-plugin ices
category: troubleshooting
tags: [ice, plugin, turbo, performance]
source: https://github.com/zdharma-continuum/zinit/discussions/258
related: [ts-light-mode-performance, ts-compinit-turbo-mode, ts-blockf-zsh-completions]
---

## Summary

The `for` syntax loads multiple plugins with shared ices while allowing per-plugin ice overrides inline. It is more concise than repeating `zinit ice` + `zinit load/light` for each plugin.

## Question / Problem

Users coming from other plugin managers want to know how to load several plugins with a mix of shared and per-plugin configuration in zinit.

## Answer / Solution

Ices before the `for` keyword are shared across all plugins in the block. Ices placed immediately before a plugin name (before the next plugin or the end of the block) apply only to that plugin:

```zsh
# All plugins share: wait lucid light-mode
# Per-plugin ices are placed before the plugin they apply to
zinit wait lucid light-mode for \
    atinit"zicompinit; zicdreplay" \
        zdharma-continuum/fast-syntax-highlighting \
    atload"_zsh_autosuggest_start" \
        zsh-users/zsh-autosuggestions \
    blockf atpull'zinit creinstall -q .' \
        zsh-users/zsh-completions
```

Per-plugin ices accumulate until the next plugin spec. Indenting them under the plugin they belong to (as shown) makes the structure readable.

## Examples

Mixed batch of binaries and plugins:

```zsh
zinit for \
    light-mode \
  zsh-users/zsh-autosuggestions \
    light-mode \
  zdharma-continuum/fast-syntax-highlighting \
  zdharma-continuum/history-search-multi-word \
    light-mode \
    pick"async.zsh" \
    src"pure.zsh" \
  sindresorhus/pure
```

gh-r binaries with per-plugin sbin overrides:

```zsh
zinit as"null" wait lucid from"gh-r" sbin for \
    jesseduffield/lazygit \
    sbin"**/rg" BurntSushi/ripgrep \
    sbin"**/fd" @sharkdp/fd
```

## Caveats

In the `for` syntax, `load` and `light` are not used as subcommands — use the `light-mode` ice instead for light loading. The `@` prefix on a plugin spec (e.g. `@sharkdp/fd`) is optional syntax for disambiguation when the repo name starts with a special character.
