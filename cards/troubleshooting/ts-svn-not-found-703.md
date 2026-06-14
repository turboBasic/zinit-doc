---
id: ts-svn-not-found-703
title: "svn ice fails — command not found: svn"
category: troubleshooting
tags: [troubleshooting, snippet, installation]
source: https://github.com/zdharma-continuum/zinit/issues/703
related: []
---

## Summary

Using the `svn` ice to download OMZ subdirectory snippets requires the `svn` (Subversion) binary. On systems where Subversion is not installed, every `zinit snippet` with `svn` prints an error and the snippet is not loaded.

## Symptom

```
Warning: Subversion not found , please install it to use `svn' ice.
.zinit-mirror-using-svn:27: command not found: svn
```

Affects snippets like `OMZ::lib` and `OMZ::plugins/osx` that contain multiple files.

## Cause

Zinit uses SVN to download GitHub subdirectories (since GitHub does not support partial git clone of subdirectories directly). SVN support was GitHub-native but GitHub deprecated SVN access.

## Fix / Workaround

Install Subversion:
- macOS: `brew install subversion`
- Debian/Ubuntu: `apt-get install subversion`
- Arch: `pacman -S subversion`

Alternatively, avoid `svn` ice by loading individual files as separate snippets, or cloning the full repo and using `pick` / `multisrc` to source only the needed files:

```zsh
# Instead of: zinit ice svn; zinit snippet OMZ::lib
zinit snippet OMZL::completion.zsh
zinit snippet OMZL::git.zsh
```

## Caveats

GitHub deprecated SVN support. Long-term, `svn` ice may stop working entirely. Track issue #504 for a `git sparse-checkout` replacement.
