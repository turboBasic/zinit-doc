---
id: ts-gh-r-older-release-not-found-403
title: gh-r fails to find release assets unless ver ice is set explicitly — regression
category: troubleshooting
tags: [troubleshooting, binary, installation, git]
source: https://github.com/zdharma-continuum/zinit/issues/403
related: [ts-ver-file-blocks-update-441]
---

## Summary

Without a `ver` ice, `from"gh-r"` fails to find release assets for some projects with the error "failed to find the correct GitHub release asset to download". Adding `ver' '` (empty string) or a specific version makes the download succeed.

## Symptom

```
Downloading nivekuil/rip…
gh-r: failed to find the correct GitHub release asset to download.
No such (plugin or snippet): nivekuil/rip.
```

The same plugin downloads correctly with `ver'0.11.3'` appended.

## Cause

A regression in the `gh-r` asset discovery logic. The "latest" release resolution changed and now fails for projects that don't follow the standard GitHub releases API format, or for projects where the latest release has no assets matching the platform heuristic.

## Fix / Workaround

Specify the version explicitly:

```zsh
zinit ice as'null' from'gh-r' lbin'!' nocompile nocompletions ver'0.11.3'
zinit light nivekuil/rip
```

Or try `ver'latest'` to explicitly request the latest release:

```zsh
zinit ice as'null' from'gh-r' lbin'!' ver'latest'
zinit light nivekuil/rip
```

Track https://github.com/zdharma-continuum/zinit/issues/403 for a fix.

## See Also

- ts-ver-file-blocks-update-441
