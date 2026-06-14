---
id: ts-omzp-rate-limit-429-745
title: "OMZP snippet download fails with HTTP 429 (rate limit)"
category: troubleshooting
tags: [snippet, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/745
related: []
---

## Summary
Intermittent `curl: (56) The requested URL returned error: 429` errors when downloading OMZ snippets are caused by GitHub's rate limiting on unauthenticated raw content requests.

## Question / Problem
During `zinit update --all`, some OMZ snippets failed to download with HTTP 429 errors:

```
Updating snippet: OMZP::dotenv
==> Downloading OMZP::dotenv (with curl, wget, lftp)
curl: (56) The requested URL returned error: 429
curl: (56) The requested URL returned error: 429
ERROR: Download failed.
```

## Answer / Solution
GitHub rate-limits unauthenticated requests to `raw.githubusercontent.com`. Options:

1. **Retry later**: the rate limit resets within a few minutes.

2. **Authenticate curl**: set a GitHub personal access token for raw content requests (not officially supported by zinit, but effective):
   ```zsh
   export GITHUB_TOKEN=ghp_yourtoken
   ```
   Then configure git to use the token for GitHub raw content fetches. Zinit uses `curl` directly for snippets, which does not read the `GITHUB_TOKEN` env var automatically.

3. **Reduce update frequency**: avoid running `zinit update --all` frequently for snippet-heavy configs.

4. **Cache locally**: after a successful download, snippets are cached. Updates only re-download if zinit detects a change.

## Caveats
This is a GitHub infrastructure limitation, not a zinit bug. The issue is more likely to occur in CI environments or when updating many snippets in rapid succession.
