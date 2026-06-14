---
id: ts-param-ice-not-exported-376
title: Variables set with param ice are not visible in subprocesses
category: troubleshooting
tags: [ice, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/376
related: []
---

## Summary

The `param'name→value'` ice sets a local variable before loading a plugin, but the variable is not exported, so child processes and services launched by the plugin cannot see it. Fixed in PR #376.

## Symptom

A plugin or service configured via `param` ice reads an environment variable that evaluates to empty in child processes:

```zsh
zi service'make' param'MAKE_SERVER_SRC_DIRS→~/github/mc' for zservices/make-server
# Child process sees MAKE_SERVER_SRC_DIRS as empty
```

## Cause

`param` ice set the variable using `local name=value`, which is local to the calling context and not exported to child processes. The fix adds `-x` to the `local` call: `local -x name=value`.

## Fix / Workaround

Update zinit to get the export fix (PR #376):

```zsh
zinit self-update
```

As a workaround before updating, set the variable manually with `export` in `atload` or `atinit`:

```zsh
zinit ice service'make' atinit'export MAKE_SERVER_SRC_DIRS=~/github/mc'
zinit light zservices/make-server
```

## Caveats

After the fix, variables set via `param` are exported to child processes. This matches the expected behavior when configuring services or programs that read from the environment.
