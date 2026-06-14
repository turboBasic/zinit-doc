---
id: ts-turbo-eval-hook-external-cmd-123
title: Running eval-based completions for externally installed tools in turbo mode
category: troubleshooting
tags: [turbo, completion, ice, snippet, lazy-loading]
source: https://github.com/zdharma-continuum/zinit/discussions/123
related: []
---

## Summary
Tools installed outside zinit (e.g. via pipx) that require `eval "$(cmd)"` for completions can be loaded in turbo mode using `if''` to gate on command availability and `atinit''` to run prerequisites.

## Question / Problem
The user wanted to load completions for `nox` (installed via pipx) efficiently in turbo mode. The completion requires:
1. `autoload -U bashcompinit; bashcompinit` to run first.
2. Then `eval "$(register-python-argcomplete nox)"`.

Their working but non-optimal approach used a wrapper `.zsh` file sourced as a snippet.

## Answer / Solution
The pattern of wrapping the `eval` call in a small snippet file and loading it with `if''` to gate on command presence is the correct approach. The `atinit''` ice handles prerequisites that must run before the snippet is sourced.

## Examples

```zsh
zinit wait lucid light-mode for \
    if"builtin command -v nox > /dev/null 2>&1" \
        atinit"autoload -U bashcompinit; bashcompinit;" \
            is-snippet $HOME/rc_files/nox.zsh
```

Where `nox.zsh` contains:
```zsh
eval "$(register-python-argcomplete nox)"
```

Alternatively, the snippet file can be replaced with an inline `atload` hook if the eval output is small enough to inline directly.

## Caveats
The `if''` ice is evaluated at shell startup, so `nox` must already be in `$PATH` at that point for the condition to pass. If the tool is managed by something that modifies `$PATH` lazily, the condition may fail even when the tool is installed.
