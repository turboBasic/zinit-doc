---
id: wrap-track
title: "Ice: wrap-track''"
category: ices
tags: [ice, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [trackbinds, light-mode]
---

## Summary

`wrap-track''` wraps named functions to enable Zinit's investigating (reporting) during
their first execution, extending tracking beyond the initial load event to cover
plugins that defer initialization until first use.

## Syntax / Usage

```zsh
zi ice wrap-track"function-name"
zi ice wrap-track"func1;func2"   # semicolon-separated list
```

## Details

Plugins like powerlevel10k or zsh-autosuggestions postpone their full initialization
until the first prompt or first use. Because Zinit normally only tracks changes during
the load phase, deferred initialization escapes the investigator.

`wrap-track''` solves this by wrapping the specified functions: the first time each
wrapped function is called, Zinit temporarily re-enables investigating, runs the
function, then disables investigating again. This captures the changes the function
makes (aliases, bindkeys, PATH entries, etc.) in the plugin's report.

Multiple functions are separated by `;`.

Does not work with snippets.

## Examples

```zsh
# Track powerlevel10k's deferred precmd initialization
zi ice wrap-track"_p9k_precmd"
zi load romkatv/powerlevel10k
```

## See Also

- trackbinds
- light-mode
