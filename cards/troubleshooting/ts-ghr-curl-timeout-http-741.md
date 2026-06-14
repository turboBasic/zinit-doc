---
id: ts-ghr-curl-timeout-http-741
title: "gh-r downloads timeout connecting to GitHub on port 80"
category: troubleshooting
tags: [binary, installation, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/741
related: [ts-ghr-no-assets-found-736]
---

## Summary

`from'gh-r'` downloads hang for a long time then fail with a curl timeout because the download URL was constructed without an `https://` scheme, causing curl to default to `http://` and connect to port 80.

## Symptom

Zinit hangs for 30–60 seconds when installing or updating `gh-r` plugins, then fails with a curl timeout error. GitHub releases do not respond on port 80.

## Cause

`.zinit-download-file-stdout` was called without prepending `https://` to the `$site` variable. curl defaults to `http://` when no scheme is provided, attempting to connect to `github.com:80` instead of `github.com:443`.

## Fix / Workaround

Update zinit (fixed in PR #741, which concatenates `https://` before passing the URL):

```zsh
zinit self-update
```

## Caveats

This bug was introduced alongside the HTML-scraping breakage (issue #736). Both were fixed together.
