---
id: ts-yaml-py-installed-as-completions-528
title: ".yaml and .py files incorrectly installed as completions"
category: troubleshooting
tags: [completion, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/528
related: []
---

## Summary

When a plugin directory contains `.yaml` or `.py` files whose names start with `_`, zinit installed them as completions, polluting the completion system with non-completion files.

## Symptom

Running `zinit completions` shows unexpected entries like `__init__.py`, `_config.yaml`, etc. Tab completion may behave strangely or throw errors from these files being sourced as zsh completion functions.

## Cause

Zinit searched for completion files matching `_*` but did not exclude files with non-zsh extensions like `.yaml` and `.py`. For plugins like `kellyjonbrazil/jc` that generate completions via `atclone`, auxiliary Python files in the same directory were mistakenly included.

## Fix / Workaround

Update zinit (fixed in PR #528, which excludes `.yaml` and `.py` files from completion detection):

```zsh
zinit self-update
```

To clean up already-installed incorrect completions:

```zsh
zinit cclear
zinit creinstall username/plugin
```

## Examples

```zsh
# Plugin that generates a completion via atclone
zinit ice as'completions' \
    atclone'pipx install jc; jc --zsh-comp > _jc' \
    atdelete'pipx uninstall jc'
zinit for kellyjonbrazil/jc
```
