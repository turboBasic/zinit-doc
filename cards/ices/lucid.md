---
id: lucid
title: "lucid"
category: ices
tags: [ice, turbo, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [wait, silent, notify]
---

## Summary

`lucid` suppresses the "Loaded …" message that Zinit prints under the prompt when a
plugin is loaded via turbo mode (`wait''`). It is the standard companion to `wait''`.

## Syntax / Usage

```zsh
zi ice wait lucid
zi load some/plugin
```

## Details

In turbo mode, Zinit prints a "Loaded …" notification after each deferred plugin
finishes loading. `lucid` silences that specific message. It is a subset of `silent`:
`silent` also mutes the plugin's own stdout/stderr, while `lucid` does not.

`lucid` has no effect outside of turbo mode (i.e. when `wait''` is not set), because
the loading message only appears for deferred plugins.

## Examples

```zsh
# Standard turbo pair – fast startup, no output noise
zi ice wait lucid
zi light zsh-users/zsh-autosuggestions

# for-syntax equivalent
zinit lucid wait for \
  zsh-users/zsh-autosuggestions \
  zdharma-continuum/fast-syntax-highlighting
```

## See Also

- wait
- silent
- notify
