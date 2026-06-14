---
id: ts-omz-lib-functions-missing-666
title: OMZ plugin fails — omz_urlencode and open_command not found when loaded via zinit
category: troubleshooting
tags: [troubleshooting, snippet, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/666
related: [ts-omzp-git-missing-functions-709]
---

## Summary

The OMZ `web-search` plugin (and others) call helper functions like `omz_urlencode()` and `open_command()` that live in `lib/functions.zsh`. When loading only the plugin snippet via zinit, this library file is not loaded, causing "command not found" errors.

## Symptom

```
zsh: command not found: omz_urlencode
zsh: command not found: open_command
```

Triggered when running any alias that calls `web_search`, e.g. `ddg thisisawebsearch`.

## Cause

OMZ sources all files in `lib/` during its main init. Zinit snippet loading sources only the requested file. OMZ plugins that depend on helper functions from `lib/` must have those libraries loaded separately.

## Fix / Workaround

Load the missing library before the plugin that needs it:

```zsh
zinit snippet OMZL::functions.zsh
zinit snippet OMZP::web-search
```

To discover which `lib/` files a plugin depends on, grep the plugin source for function calls and search for them in `ohmyzsh/blob/master/lib/`.

## See Also

- ts-omzp-git-missing-functions-709
