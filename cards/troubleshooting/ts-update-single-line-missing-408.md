---
id: ts-update-single-line-missing-408
title: zinit update fails with "no such file or directory: single-line.zsh"
category: troubleshooting
tags: [troubleshooting, installation, snippet]
source: https://github.com/zdharma-continuum/zinit/issues/408
related: [ts-selfupdate-git-process-output-423]
---

## Summary

Running `zinit update` with a Homebrew-managed zinit installation fails mid-update with a download error referencing a missing `single-line.zsh` support file. The Homebrew package installed zinit's share files to a non-standard path.

## Symptom

```
Updating snippet: OMZP::docker-compose/_docker-compose
Downloading `OMZP::docker-compose/_docker-compose` (with curl, wget, lftp)…
.zinit-download-file-stdout:34: no such file or directory: /opt/homebrew/opt/zinit/share/single-line.zsh
```

## Cause

The zinit Homebrew formula installed support scripts (`single-line.zsh`) to `share/share/` instead of the expected `share/` path. The zinit code that drives single-line downloads cannot find the helper script.

## Fix / Workaround

Reinstall zinit via Homebrew to get a corrected formula:

```zsh
brew reinstall zinit
```

Or switch to the recommended git-clone installation to avoid Homebrew packaging issues:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
```

## Caveats

This is a Homebrew packaging issue, not a bug in zinit itself. The git-clone install puts support files in the correct location automatically.
