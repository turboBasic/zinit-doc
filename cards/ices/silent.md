---
id: silent
title: "silent"
category: ices
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [lucid, notify]
---

## Summary

`silent` mutes a plugin's stdout and stderr during loading and suppresses the "Loaded
…" message. It is a strict superset of `lucid`.

## Syntax / Usage

```zsh
zi ice silent
zi ice wait silent   # common turbo combination
```

## Details

`silent` applies two suppressions:
1. The plugin's own stdout and stderr are discarded during sourcing.
2. The "Loaded …" message that turbo mode prints under the prompt is hidden.

`lucid` only suppresses the "Loaded …" message, leaving the plugin's output intact.
Use `silent` when a plugin is noisy on load and you want complete silence.

## Examples

```zsh
# Completely silent turbo load
zi ice wait silent
zi light user/verbose-plugin
```

## See Also

- lucid
- notify
