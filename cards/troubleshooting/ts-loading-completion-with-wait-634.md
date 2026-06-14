---
id: ts-loading-completion-with-wait-634
title: Completions loaded with wait ice do not work — compinit timing issue with turbo
category: troubleshooting
tags: [troubleshooting, completion, turbo, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/issues/634
related: [ts-completions-not-active-until-update-726]
---

## Summary

Loading completion plugins with `wait` (turbo mode) and then calling `compinit` synchronously means `compinit` runs before turbo-loaded completions are available, so completions are not registered.

## Symptom

Tab completion does not work after loading `zsh-users/zsh-completions` with a `wait` ice. The completions work after a second source or after running `compinit` again manually.

## Cause

`compinit` is called synchronously during `.zshrc` processing. Turbo-loaded plugins (including completions) load after the first prompt. If `compinit` already ran, it doesn't know about fpath entries added by turbo plugins.

## Fix / Workaround

The correct pattern is to defer `compinit` to run inside the last turbo-loaded completion plugin:

```zsh
zinit lucid wait for \
    atload"zicompinit; zicdreplay" \
    blockf \
  zsh-users/zsh-completions
```

Do not call `compinit` at the top level of `.zshrc` when using turbo for completions — let `zicompinit` handle it inside the `atload` hook of the last completion plugin.

## See Also

- ts-completions-not-active-until-update-726
