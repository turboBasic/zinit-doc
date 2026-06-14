---
id: ts-blockf-zsh-completions
title: Using blockf with zsh-completions to let zinit manage completions
category: troubleshooting
tags: [completion, ice, plugin]
source: https://github.com/zdharma-continuum/zinit/discussions/109
related: [ts-compinit-turbo-mode, ts-as-null-completions-override]
---

## Summary

`blockf` prevents `zsh-completions` from adding itself to `$fpath` the traditional way. Instead, zinit installs its completion files as managed completions, giving you `zinit completions`, `zinit creinstall`, and `zinit cuninstall` control over them.

## Question / Problem

When loading `zsh-users/zsh-completions`, the plugin normally adds its directory to `$fpath`. This bypasses zinit's completion management. Using `blockf` redirects completion management to zinit.

## Answer / Solution

```zsh
zinit wait lucid for \
    blockf atpull'zinit creinstall -q .' \
    zsh-users/zsh-completions
```

- `blockf` blocks the plugin from modifying `$fpath`
- `atpull'zinit creinstall -q .'` reinstalls the completions into zinit's managed completions directory after every update

## Examples

Full context in a turbo block:

```zsh
zinit wait lucid for \
    atinit"zicompinit; zicdreplay" \
    zdharma-continuum/fast-syntax-highlighting \
    atload"_zsh_autosuggest_start" \
    zsh-users/zsh-autosuggestions \
    blockf atpull'zinit creinstall -q .' \
    zsh-users/zsh-completions
```

After running, use `zinit completions` to see which completions zinit is managing from the plugin.

## Caveats

Without `atpull'zinit creinstall -q .'`, updating `zsh-completions` will not update the managed completion files — you would need to run `zinit creinstall zsh-users/zsh-completions` manually after each update.
