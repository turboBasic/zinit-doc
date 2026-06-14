---
id: ts-pack-alternative-source-local-110
title: Using zinit pack with a local or alternative package.json source
category: troubleshooting
tags: [package, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/110
related: []
---

## Summary

By default `zinit pack` fetches `package.json` from the `zdharma-continuum/zinit-packages` GitHub repository. Two environment variables allow pointing to a different repo or a local file instead.

## Symptom

Users with custom packages, air-gapped environments, or forks of zinit-packages cannot use `zinit pack` because the source repository is hardcoded.

## Cause

The package source is controlled by two `ZINIT` hash fields that default to the upstream monorepo.

## Fix / Workaround

Override the package source before loading zinit, or before calling `zinit pack`:

```zsh
# Use a fork or alternative GitHub repository
ZINIT[PACKAGE_REPO]=myorg/my-zinit-packages
ZINIT[PACKAGE_BRANCH]=main

# Install from a local package.json file
zinit pack for local/path/to/my/package.json
```

Both variables can be set in `~/.zshrc` before the `source zinit.zsh` line to make the override permanent.

## Caveats

The `local/path/to/package.json` form uses the literal prefix `local/` to distinguish local paths from GitHub slugs. Remote HTTP URLs are not supported directly via this mechanism.
