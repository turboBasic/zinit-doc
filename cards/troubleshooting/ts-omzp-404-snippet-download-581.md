---
id: ts-omzp-404-snippet-download-581
title: "curl 404 error when downloading OMZ snippets with completion files"
category: troubleshooting
tags: [snippet, troubleshooting, completion, installation]
source: https://github.com/zdharma-continuum/zinit/issues/581
related: []
---

## Summary

Downloading an OMZ snippet that contains underscore-prefixed completion files (e.g. `OMZP::ag` which has `_ag`) fails with a curl 404 error because zinit tries to download the completion file as a separate URL that does not exist.

## Symptom

```
Setting up snippet: OMZP::ag
Downloading `OMZP::ag` (with curl, wget, lftp)...
curl: (22) The requested URL returned error: 404
curl: (22) The requested URL returned error: 404
ERROR: Download failed.
```

## Cause

When zinit downloads a single-file snippet that is also a plugin directory containing a `_*` completion file, it may attempt to fetch the completion file as a standalone URL, which returns 404 because it does not exist at that direct URL.

## Fix / Workaround

For OMZ plugins that are multi-file directories, load them as zinit plugins rather than snippets. For completion-only plugins, use `as'completion'` and point directly at the completion file:

```zsh
# Load the completion file directly
zinit ice as'completion'
zinit snippet OMZP::ag/_ag
```

Or load the whole plugin directory (requires git clone approach since SVN is gone):

```zsh
zinit ice pick'ag.plugin.zsh'
zinit light ohmyzsh/ohmyzsh
```

## Caveats

With GitHub's SVN deprecation, multi-file OMZ plugin snippets that previously worked via `svn` are now broken. Direct completion file URLs are the most reliable fallback.
