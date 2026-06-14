---
id: ts-pin-plugin-specific-commit
title: How to install a plugin at a specific branch or commit hash
category: troubleshooting
tags: [ice, git, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/193
related: []
---

## Summary

Use the `ver` ice to pin a plugin to a specific branch, tag, or commit hash at clone time.

## Question / Problem

A user wanted to install a plugin at a specific point in the repo's history (a specific branch or commit) because a bug existed in the latest version.

## Answer / Solution

Use `ver"<ref>"` where `<ref>` is a branch name, tag, or full commit SHA:

```zsh
# Pin to a branch
zinit ice ver"some-branch"
zinit light user/plugin

# Pin to a tag
zinit ice ver"v1.2.3"
zinit light user/plugin

# Pin to a specific commit SHA
zinit ice ver"abc1234def5678"
zinit light user/plugin
```

`ver` is passed to `git checkout` after cloning, so any valid git ref works.

## Caveats

Pinning to a commit SHA prevents `zinit update` from advancing to newer commits — the repo will stay at that SHA until the `ver` ice is removed or changed. To unpin, remove `ver` from the ice and run `zinit update <plugin>`.

When using `from"gh-r"` (downloading a release binary), `ver` selects the release tag to download instead of controlling a git checkout.
