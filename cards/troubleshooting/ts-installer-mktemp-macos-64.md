---
id: ts-installer-mktemp-macos-64
title: Automatic install fails on macOS with "illegal option" from mktemp
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/64
related: []
---

## Summary

The zinit install script failed on macOS because it invoked `mktemp` with Linux-specific flags that BSD `mktemp` (macOS default) does not support.

## Symptom

```
mktemp: illegal option -- -
```

The installation aborts before any files are written.

## Cause

The installer used `mktemp --suffix=...` or other GNU-specific long options. macOS ships BSD `mktemp` which only accepts `-d` and a template argument; it does not support `--suffix` or other GNU extensions.

## Fix / Workaround

Update zinit and use the current installer — fixed in PR #65 by switching to `mktemp -d` which is compatible with both BSD and GNU implementations.

Use the canonical install command:

```zsh
bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```
