---
id: ts-curl-tcp-fastopen-298
title: 'curl reports "option --tcp-fastopen: is unknown" when downloading snippets'
category: troubleshooting
tags: [snippet, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/298
related: []
---

## Summary

On systems with an older curl (e.g. curl 7.29 on RHEL/CentOS), zinit's download helper fails with `curl: option --tcp-fastopen: is unknown` because `--tcp-fastopen` was added in curl 7.49.

## Symptom

```
Downloading `OMZ::plugins/bedtools` (with curl, wget, lftp)…
curl: option --tcp-fastopen: is unknown
curl: try 'curl --help' or 'curl --manual' for more information
ERROR: Download failed.
```

## Cause

Zinit passed `--tcp-fastopen` to curl as a performance optimization. Older curl versions do not support this flag and treat it as a fatal error, aborting the download entirely. Fixed in PR #299.

## Fix / Workaround

Update zinit to get the fix (the `--tcp-fastopen` option was removed):

```zsh
zinit self-update
```

If zinit cannot be updated, work around by installing a newer curl or by using `wget` or `lftp` as the downloader (zinit tries curl, wget, and lftp in order — if curl fails entirely, zinit falls back).

## Caveats

This affects any RHEL/CentOS 7 or similarly old enterprise Linux system where the system curl is 7.29.x.
