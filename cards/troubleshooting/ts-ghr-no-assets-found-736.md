---
id: ts-ghr-no-assets-found-736
title: "gh-r: No GitHub release assets found"
category: troubleshooting
tags: [binary, git, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/736
related: []
---

## Summary

`from'gh-r'` downloads fail with `Error: gh-r: No GitHub release assets found for` because the HTML-scraping approach zinit used to extract the latest release tag broke when GitHub changed its page structure.

## Symptom

```
==> Downloading jqlang/jq
Error: gh-r: No GitHub release assets found for
```

Any plugin using `from'gh-r'` produces this error on new installs or after updating zinit.

## Cause

The version-detection code parsed `https://github.com/user/repo/releases/latest` HTML using a `grep` regex tied to a specific page structure. GitHub changed its frontend, making the pattern match nothing, so the download URL was never constructed.

## Fix / Workaround

Update zinit to a version that uses the GitHub API for release detection (fixed in PR #731 / issue #741). Run:

```zsh
zinit self-update
```

If `self-update` itself is broken, manually pull the latest zinit:

```zsh
git -C "${ZINIT[BIN_DIR]}" pull
```

## Caveats

The HTML-scraping fix also affected the `https://` scheme — an earlier bug caused curl to connect to port 80 instead of 443, resulting in timeouts. Both issues were resolved together.
