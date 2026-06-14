---
id: ts-install-specific-commit-193
title: Installing a plugin at a specific branch, tag, or commit
category: troubleshooting
tags: [ice, git, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/193
related: []
---

## Summary
The `ver''` ice pins a plugin to a specific branch, tag, or commit hash, useful when a recent version has a bug.

## Question / Problem
A user wanted to install a plugin at a specific point in its git history (a branch or commit) to avoid a bug in the latest version.

## Answer / Solution
Use the `ver''` ice modifier. It accepts branch names, tag names, or full commit SHA hashes:

```zsh
# Pin to a branch
zinit ice ver"develop"
zinit light some/plugin

# Pin to a tag
zinit ice ver"v1.2.3"
zinit light some/plugin

# Pin to a commit SHA
zinit ice ver"abc1234def5678"
zinit light some/plugin
```

With the `for` syntax:

```zsh
zinit ice ver"v1.2.3" wait lucid
zinit light some/plugin
```

## Caveats
`ver''` does not work with snippets. After pinning, `zinit update` will check out the specified ref rather than the default branch tip. To return to tracking the latest version, remove `ver''` and run `zinit update some/plugin`.
