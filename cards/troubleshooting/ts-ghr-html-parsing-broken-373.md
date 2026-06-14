---
id: ts-ghr-html-parsing-broken-373
title: "gh-r: failed to find the correct GitHub release asset to download"
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/373
related: [ts-ghr-bpick-no-assets-476, ts-ghr-bpick-regression-243]
---

## Summary

After GitHub updated their release page HTML structure in September 2022, zinit's HTML-scraping approach to finding release assets stopped working entirely, causing all `from"gh-r"` downloads to fail. The fix switched to using the GitHub releases API.

## Symptom

```
gh-r: failed to find the correct GitHub release asset to download.
```

Appears for all `from"gh-r"` plugins, even ones that were working previously. The plugin or binary is not downloaded even though assets are visible on the GitHub release page.

## Cause

Zinit originally parsed the HTML of GitHub release pages to find asset download links. When GitHub redesigned their releases page, the HTML structure changed and the parsing regex no longer matched any assets. Fixed in PR #373 by switching to the GitHub API (`/releases/latest` endpoint).

## Fix / Workaround

Update zinit to get the API-based asset discovery:

```zsh
zinit self-update
```

Delete and re-download affected plugins:

```zsh
zinit delete <user/repo>
zinit load <user/repo>
```

## Caveats

After the switch to the GitHub API, unauthenticated requests are rate-limited to 60 per hour. If you load many `gh-r` plugins in CI or on a shared IP, you may hit this limit. Set `GITHUB_API_TOKEN` in the environment to increase the limit to 5,000 requests/hour:

```zsh
# Create a PAT at https://github.com/settings/tokens (no special scopes needed for public repos)
export GITHUB_API_TOKEN="ghp_..."
```

- A PAT with no additional scopes is sufficient for reading public release metadata.
- The `GITHUB_API_TOKEN` environment variable name is the one zinit checks. Some tools use `GITHUB_TOKEN` — zinit may not read that variant.
- Rate limit resets every hour.
- Add the export to `.zshrc` (before zinit loads plugins) or to a secrets file sourced from `.zshrc`.
