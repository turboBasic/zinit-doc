---
id: ts-selfupdate-git-process-output-423
title: zinit self-update fails with "can't open file: git-process-output.zsh"
category: troubleshooting
tags: [troubleshooting, installation, git]
source: https://github.com/zdharma-continuum/zinit/issues/423
related: []
---

## Summary

Running `zinit self-update` on a Homebrew-managed zinit installation fails with a `zcompile` error because `git-process-output.zsh` is in a `share/share/` subdirectory instead of `share/`.

## Symptom

```
fatal: couldn't find remote ref main
[self-update] compiling zinit via zcompile
.zinit-self-update:zcompile:42: can't open file: /opt/homebrew/opt/zinit/share/git-process-output.zsh
```

## Cause

In the Homebrew formula, zinit's support files (`git-process-output.zsh`, etc.) were installed to `share/share/` instead of `share/`. This caused zinit's self-update to search for the file at the wrong path.

## Fix / Workaround

Reinstall or upgrade the Homebrew formula, which should place the files in the correct location:

```zsh
brew reinstall zinit
```

Or, if managing zinit manually (not via Homebrew), ensure zinit is installed via git clone and self-update from the git checkout:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
```

## Caveats

The Homebrew zinit formula has had path inconsistencies in some versions. The recommended installation method from the zinit README uses a direct git clone, which avoids Homebrew packaging issues.
