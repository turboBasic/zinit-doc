---
id: ts-pack-jq-missing-135
title: zinit pack fails silently when jq is not installed
category: troubleshooting
tags: [package, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/135
related: []
---

## Summary

The `zinit pack` command (and `.zinit-get-package`) requires `jq` to parse `package.json`. Without it the command fails, but earlier versions did not produce a clear error message.

## Symptom

`zinit pack for <package>` exits immediately with no output or a cryptic error, even though the network request succeeds and the package repository exists.

## Cause

`jq` was absent from the system. The `pack` mechanism downloads `package.json` and then pipes it through `jq` to extract the install recipe. Without `jq`, the pipeline fails silently.

## Fix / Workaround

Install `jq`:

```zsh
# macOS
brew install jq

# Debian/Ubuntu
sudo apt install jq

# Alpine
apk add jq
```

Then retry:

```zsh
zinit pack for fzf
```

Zinit now explicitly checks for `jq` availability and emits a clear error if it is missing.

## Caveats

`jq` is a hard runtime dependency for the `pack` feature. All other zinit functionality (plugins, snippets, `gh-r`) works without it.
