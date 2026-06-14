---
id: ts-turbo-wait-conditional
title: Conditionally loading plugins only after specific commands are run
category: troubleshooting
tags: [turbo, lazy-loading, ice, performance]
source: https://github.com/zdharma-continuum/zinit/discussions/258
related: [ts-light-mode-performance, ts-compinit-turbo-mode]
---

## Summary

Use `wait'[[ -n ${ZLAST_COMMANDS[(r)<pattern>*]} ]]'` to defer plugin loading until the user first runs a command matching a pattern. This is useful for heavy plugins that are only needed for specific workflows.

## Question / Problem

A user mentioned a technique for further optimizing startup by deferring infrequently-used plugins until they are actually needed — for example, only loading git-related plugins after the first `git` command.

## Answer / Solution

The `wait` ice accepts a condition expression. Zinit checks the condition before each prompt; when it evaluates to true, the plugin loads.

`ZLAST_COMMANDS` is an array that zinit populates with the last command words typed. The `(r)` flag searches for a matching element.

```zsh
# Only load after a git* command is entered
zinit wait'[[ -n ${ZLAST_COMMANDS[(r)git*]} ]]' lucid light-mode for \
    zdharma-continuum/history-search-multi-word

# Only load after a docker* command
zinit wait'[[ -n ${ZLAST_COMMANDS[(r)docker*]} ]]' lucid for \
    OMZP::docker

# Only load after a kubectl or k command
zinit wait'[[ -n ${ZLAST_COMMANDS[(r)(kubectl|k)]} ]]' lucid for \
    OMZP::kubectl
```

## Examples

Heroku CLI: load binary + completions on first heroku invocation:

```zsh
zi lucid light-mode \
    wait'[[ -n ${ZLAST_COMMANDS[(r)her*]} ]]' \
    extract"!-" id-as"heroku" nocompile sbin'*bin/heroku->heroku' for \
    "https://cli-assets.heroku.com/heroku-linux-x64.tar.gz"
```

## Caveats

On first use, the plugin loads after the first matching command and does not retroactively apply to that command. The user must re-run the command after the plugin loads. Using `wait'!...'` prefix (with `!`) causes zinit to reset the prompt after loading, which can partially mitigate this.
