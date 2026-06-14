---
id: ts-docker-completion-not-working-157
title: Docker completion from OMZP does not work
category: troubleshooting
tags: [completion, troubleshooting, snippet, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/157
related: []
---

## Summary

Loading Docker completions via `OMZP::docker/_docker` with `as"completion"` appears to install but completions do not function. This is usually caused by `compinit` running before the completion file is registered, or by loading the snippet without `as"completion"`.

## Symptom

Tab-completing `docker` commands produces no results or falls back to filename completion.

## Cause

Two common mistakes:
1. The snippet is loaded without `as"completion"`, so zinit sources it as a script instead of installing it as a completion file.
2. `compinit` was called before the completion was registered, so `_docker` is not in the fpath.

## Fix / Workaround

Use `as"completion"` and ensure `compinit` runs after all completions are registered:

```zsh
zinit ice as"completion"
zinit snippet OMZP::docker/_docker

zinit ice as"completion"
zinit snippet OMZP::docker-compose/_docker-compose

# Call compinit after all plugins/snippets
autoload -Uz compinit
compinit
zinit cdreplay -q
```

With Turbo mode:

```zsh
zinit wait lucid as"completion" for \
    OMZP::docker/_docker \
    OMZP::docker-compose/_docker-compose

zinit for \
    atinit"zicompinit; zicdreplay" \
    blockf \
    lucid \
    wait \
  zsh-users/zsh-completions
```

## Caveats

`OMZP::docker` (the whole plugin directory) requires `svn` ice. For just the completion file, `OMZP::docker/_docker` with `as"completion"` is the correct approach.
