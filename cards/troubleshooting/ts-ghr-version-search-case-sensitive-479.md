---
id: ts-ghr-version-search-case-sensitive-479
title: gh-r fails to find release assets when version tag uses mixed case
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/479
related: [ts-ghr-bpick-no-assets-476]
---

## Summary

When using `from"gh-r"`, zinit may report no assets found even though the release page clearly shows matching files. This happens when the release version tag or asset names use mixed case (e.g. `V1.2.3` instead of `v1.2.3`) and zinit's version-search `grep` was case-sensitive. Fixed in PR #479.

## Symptom

```
[gh-r] Error: No GitHub release assets found
```

or assets appear but no version is selected, even with a valid `ver` ice or when downloading the latest release.

## Cause

Zinit used a case-sensitive `grep` to match version tags in the GitHub Releases API response. Projects that tag releases with an uppercase `V` prefix (e.g. `V2.1.0`) or use other mixed-case conventions were not matched, causing zinit to skip all assets. PR #479 made the grep call case-insensitive.

## Fix / Workaround

Update zinit to a version that includes the case-insensitive fix:

```zsh
zinit self-update
```

If updating is not possible, use an explicit `ver` ice with the exact tag as it appears in the release (matching the case exactly):

```zsh
# If the tag is "V1.2.3" (uppercase V), use that exactly
zinit ice from"gh-r" ver"V1.2.3"
zinit light some-user/some-tool
```

## Caveats

After updating zinit, previously failing `from"gh-r"` entries should start working automatically on the next `zinit update`.
