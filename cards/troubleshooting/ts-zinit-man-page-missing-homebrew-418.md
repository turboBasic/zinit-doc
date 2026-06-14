---
id: ts-zinit-man-page-missing-homebrew-418
title: "cp: zinit.1 no such file or directory — man page missing in Homebrew install"
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/418
related: []
---

## Summary

When zinit is installed via Homebrew, sourcing `zinit.zsh` prints a `cp` error about the missing `zinit.1` man page. The Homebrew formula does not include the man page file.

## Symptom

```
cp: /opt/homebrew/Cellar/zinit/3.8.0/doc/zinit.1: No such file or directory
```

Appears on every shell open when zinit is sourced from the Homebrew installation path.

## Cause

The zinit Homebrew formula does not package the man page (`doc/zinit.1`). When zinit's startup code tries to copy the man page to the system man directory, the source file is absent.

## Fix / Workaround

The issue was marked as released in a later version. If it persists, upgrade zinit via Homebrew:

```zsh
brew upgrade zinit
```

Or suppress the error by removing the `doc/zinit.1` copy step — switching to the git-based installation avoids the Homebrew packaging issue entirely:

```zsh
# Manual install (git-based)
git clone https://github.com/zdharma-continuum/zinit ~/.local/share/zinit/zinit.git
source ~/.local/share/zinit/zinit.git/zinit.zsh
```
