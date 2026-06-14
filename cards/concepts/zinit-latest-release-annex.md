---
id: zinit-latest-release-annex
title: "zinit-annex-latest-release — pin to latest stable GitHub release"
category: concepts
tags: [annex, ice, git, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/754
related: []
---

## Summary
The `zinit-annex-latest-release` annex adds a `latest-release` ice that resolves the most recent GitHub release tag and assigns it to the `ver` ice, ensuring source-built plugins use a stable release rather than the HEAD commit.

## Details
The annex is useful when a repo does not publish pre-built binaries but does cut release tags. Without it, zinit checks out HEAD (the default branch tip), which may be unstable. With `latest-release`, zinit resolves the newest tag via the GitHub API and checks out that ref.

The annex was created by community member alberti42 and is hosted at `https://github.com/alberti42/zinit-annex-latest-release`.

## Examples

Load the annex first:

```zsh
zinit light alberti42/zinit-annex-latest-release
```

Then use the `latest-release` ice on any plugin that should be pinned to its newest release:

```zsh
zinit ice latest-release make"install PREFIX=$ZPFX"
zinit light some/source-only-tool
```

On `zinit update`, the annex re-queries the GitHub API for the newest release tag and updates `ver` accordingly, so the plugin is rebuilt from the latest stable source.

## See Also
This is a community annex not hosted under `zdharma-continuum`. Verify the annex is maintained before adding it to a production config.
