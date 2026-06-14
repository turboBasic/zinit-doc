---
id: ts-ver-file-blocks-update-441
title: gh-r plugin update ignored — ._zinit/ver file caches wrong version
category: troubleshooting
tags: [troubleshooting, binary, git, command]
source: https://github.com/zdharma-continuum/zinit/issues/441
related: [ts-gh-r-update-not-fetching-new-release-606]
---

## Summary

The `._zinit/ver` file stored inside each plugin directory caches the last installed version. When a new release is available, `zinit update` reads this file, finds the version unchanged, and reports "Binary release already up to date" without actually checking GitHub.

## Symptom

```
Binary release already up to date (version: 0.34.0)
```

A newer version (e.g. 0.35.1) is available on GitHub but zinit does not download it.

## Cause

The version check compares the content of `._zinit/ver` against the latest release tag. If the file was written incorrectly or the release tag format changed, the comparison may falsely conclude that the installed version is current.

## Fix / Workaround

Delete the `._zinit/ver` file to force a version re-check:

```zsh
rm ~/.local/share/zinit/plugins/junegunn---fzf/._zinit/ver
zinit update junegunn/fzf
```

Or force a full re-install:

```zsh
zinit delete --yes junegunn/fzf
# Reload .zshrc or re-run the zinit load line
```

## See Also

- ts-gh-r-update-not-fetching-new-release-606
