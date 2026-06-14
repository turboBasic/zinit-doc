---
id: ts-ghr-api-rate-limit-tests-291
title: gh-r zunit tests fail randomly due to GitHub API rate limiting
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/291
related: [ts-ghr-bpick-no-assets-found-476]
---

## Summary
Zinit's `gh-r` unit tests fail intermittently because repeated API calls to enumerate GitHub release assets trigger rate limiting (60 requests/hour for unauthenticated clients).

## Symptom
Tests that individually pass will fail when run as a suite. Re-running the same test immediately afterwards succeeds. No consistent reproducer — failures are timing-dependent.

## Cause
Each `gh-r` download calls the GitHub releases API. In a test suite running many tests in sequence, the 60 requests/hour unauthenticated rate limit is reached. Subsequent requests return HTTP 403/429, causing asset enumeration to fail.

## Fix / Workaround
Set a `GITHUB_API_TOKEN` environment variable before running tests or loading plugins in scripts to raise the rate limit:

```zsh
export GITHUB_API_TOKEN="ghp_your_token_here"
```

For personal `.zshrc` usage, unauthenticated rate limits are rarely hit. The issue primarily affects automated test runs and CI pipelines without token authentication.

For CI pipelines, pass the token as a secret:

```yaml
env:
  GITHUB_API_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Caveats
The `GITHUB_TOKEN` auto-injected by GitHub Actions has the same rate limit as authenticated requests (5000/hour), which is sufficient for test suites.
