---
id: ts-pack-default-branch-not-main-22
title: zinit pack fails when package repo default branch is not named "main"
category: troubleshooting
tags: [package, installation, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/22
related: []
---

## Summary

`zinit pack` hardcoded `main` as the default branch for package repositories, causing failures when a package repo uses a different default branch name.

## Symptom

`zinit pack for <package>` fails with a git error or downloads nothing, even though the package repository exists and is accessible.

## Cause

Earlier versions of zinit assumed the package repository's default branch was named `main`. If the repo used `master` or another name, the fetch would fail.

## Fix / Workaround

This was fixed in zdharma-continuum/zinit. Update zinit to a current release:

```zsh
zinit self-update
```

If using an older release or a custom package repo, override the branch explicitly via the `ZINIT[PACKAGE_BRANCH]` environment variable before loading:

```zsh
ZINIT[PACKAGE_BRANCH]=master
zinit pack for <package>
```

## Caveats

The fix only applies to the package fetching logic; individual plugin repos cloned via `zinit light` are unaffected and always use the branch specified by `ver''` ice or the remote's default.
