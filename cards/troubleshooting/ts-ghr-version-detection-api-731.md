---
id: ts-ghr-version-detection-api-731
title: "gh-r bpick finds no release assets due to broken version detection"
category: troubleshooting
tags: [binary, installation, troubleshooting, git]
source: https://github.com/zdharma-continuum/zinit/issues/731
related: [ts-ghr-no-assets-found-736, ts-ghr-curl-timeout-http-741]
---

## Summary

`from'gh-r'` with `bpick` fails with "bpick ice found no release assets" because the version-detection code that extracts the latest tag from GitHub's HTML page stopped working when GitHub changed its page structure.

## Symptom

```
Error: gh-r: bpick ice found no release assets
Error: gh-r: No GitHub release assets found for
```

## Cause

The detection logic used `grep -m1 -o 'href=./'$user'/'$plugin'/releases/tag/[^"]\+'` against the GitHub releases page HTML. Modern GitHub pages use different structures and dynamic loading that render this regex non-functional.

## Fix / Workaround

Update zinit to a version that uses the GitHub API (`https://api.github.com/repos/{user}/{repo}/releases/latest`) for version detection (implemented in PR #731):

```zsh
zinit self-update
```

If rate-limited by the GitHub API (anonymous limit is 60 req/hour), set a token:

```zsh
export GITHUB_TOKEN=<your-token>
```

Zinit checks `$GITHUB_TOKEN` or `$GH_TOKEN` for authenticated requests.

## Caveats

API-based detection requires network access and is subject to GitHub API rate limits. The anonymous limit (60/hour) is usually sufficient for personal use.
