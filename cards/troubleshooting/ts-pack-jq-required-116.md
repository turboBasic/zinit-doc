---
id: ts-pack-jq-required-116
title: zinit pack fails silently because jq is not installed
category: troubleshooting
tags: [package, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/116
related: []
---

## Summary

The `pack` ice requires `jq` for JSON parsing. If `jq` is not available in `$PATH`, `zinit pack` silently exits without installing anything. After PR #202, zinit loudly reports the missing `jq` instead of failing silently.

## Symptom

Running `zinit pack for fzf` produces no output and no installation occurs. On older zinit versions there is no error message.

After PR #202, the error is explicit:

```
Error: `jq` is required but not found in $PATH. Please install jq.
```

## Cause

The internal `.zinit-get-package` function calls `jq` to parse `package.json`. Prior to PR #202, missing `jq` caused an unhandled error that zinit swallowed. PR #116 introduced `jq` as a hard requirement; PR #202 added the explicit check.

## Fix / Workaround

Install `jq`:

```zsh
# macOS
brew install jq

# Debian/Ubuntu
apt install jq

# Via zinit itself (after initial install):
zinit from"gh-r" as"null" wait lucid sbin"jq" for @stedolan/jq
```

After installing `jq`, pack commands work normally:

```zsh
zinit pack for fzf
zinit pack'binary+keys' for fzf
```

## Caveats

`jq` is only required for `pack` ice. Regular plugin/snippet loading does not need `jq`.
