---
id: ts-ghr-assets-not-found-api-rate-373
title: GitHub API rate limit causes gh-r downloads to fail
category: troubleshooting
tags: [ice, binary, git, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/373
related: [ts-ghr-html-parsing-broken-373]
---

## Summary

After zinit switched from HTML scraping to the GitHub API for release asset discovery, unauthenticated API requests are limited to 60 per hour per IP. Loading many `gh-r` plugins (e.g. in CI, on fresh install) can hit this limit.

## Symptom

Download fails with an HTTP 403 or 429 response, or with a message like:

```
gh-r: failed to find the correct GitHub release asset to download.
```

The GitHub API may also return:

```json
{"message":"API rate limit exceeded for x.x.x.x."}
```

## Cause

GitHub's REST API enforces 60 requests/hour for unauthenticated requests. Each `from"gh-r"` plugin requires at least one API call to discover release assets.

## Fix / Workaround

Set a GitHub personal access token (PAT) in the environment to raise the limit to 5,000 requests/hour:

```zsh
# Create a PAT at https://github.com/settings/tokens (no special scopes needed for public repos)
export GITHUB_API_TOKEN="ghp_your_token_here"
```

Add this to `.zshrc` (before zinit loads plugins) or to a secrets file sourced from `.zshrc`.

## Caveats

- A PAT with no additional scopes is sufficient for reading public release metadata.
- The `GITHUB_API_TOKEN` environment variable name is the one zinit checks. Some tools use `GITHUB_TOKEN` — zinit may not read that variant.
- Rate limit resets every hour.
