---
id: ts-ghr-html-parsing-broke-assets-download-373
title: gh-r fails to find release assets after GitHub HTML change
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/373
related: [ts-ghr-bpick-no-assets-found-476, ts-ghr-wrong-arch-x86-linux-456]
---

## Summary
Zinit's `from"gh-r"` stopped finding release assets after GitHub changed its HTML release page structure, breaking the HTML scraping approach used to list assets.

## Symptom
```
gh-r: failed to find the correct GitHub release asset to download
```

The plugin/binary is not downloaded even though assets are present on the GitHub release page.

## Cause
Zinit was parsing the GitHub release HTML page to enumerate assets. After GitHub updated the page structure, the parsing regex no longer matched. Fixed in PR #373 by switching to the GitHub releases API endpoint instead.

## Fix / Workaround
Update zinit to a version that includes PR #373 (`zinit self-update`). The download mechanism now uses the GitHub API rather than HTML scraping.

To force re-download after fixing:

```zsh
zinit delete <user/repo>
zinit load <user/repo>
```

## Caveats
The API-based approach is subject to GitHub API rate limits (60 requests/hour for unauthenticated access). Set `GITHUB_API_TOKEN` to raise the limit.
