---
id: ts-enterprise-github-release-binary
title: Downloading a binary from an enterprise GitHub release (not cloning)
category: troubleshooting
tags: [binary, ice, installation, git]
source: https://github.com/zdharma-continuum/zinit/discussions/208
related: [ts-gh-r-binary-install]
---

## Summary

`from"<domain>"` with `as"program"` still clones the repository. To download a binary from an enterprise GitHub release page, you need `from"gh-r"` combined with the custom domain via the `ZINIT[GH_API_URL]` or a direct URL approach.

## Question / Problem

A user wanted to download a binary from releases on a self-hosted GitHub Enterprise instance:

```zsh
zinit light-mode for \
    from'self.hosted.github.domain' as'program' \
    mv'exec* -> exec' pick'exec' \
    myteam/myrepo
```

This clones the repo instead of downloading the release binary.

## Answer / Solution

For a public GitHub release, `from"gh-r"` selects the GitHub Releases API. For GitHub Enterprise, the releases API endpoint differs. There are two approaches:

**Option 1 — Direct URL snippet with `dl` ice** (annex-patch-dl required):

```zsh
zinit ice as"program" mv"exec* -> exec" pick"exec" \
    dl"https://self.hosted.github.domain/api/v3/repos/myteam/myrepo/releases/latest -> release.json" \
    ...
```

**Option 2 — Use `from"<domain>"` with `as"program"` for source-based install** and rely on `make`/`atclone` to build:

```zsh
zinit ice from"self.hosted.github.domain" as"program" \
    make pick"binary-name"
zinit light myteam/myrepo
```

**Option 3 — Direct archive URL with `extract` ice**:

```zsh
zinit ice as"program" pick"exec" extract
zinit snippet "https://self.hosted.github.domain/myteam/myrepo/releases/download/v1.0/binary-linux-amd64.tar.gz"
```

## Caveats

`from"gh-r"` is hard-coded to `api.github.com`. For GitHub Enterprise, use a direct URL via `zinit snippet` or the `dl` ice from `zinit-annex-patch-dl`.
