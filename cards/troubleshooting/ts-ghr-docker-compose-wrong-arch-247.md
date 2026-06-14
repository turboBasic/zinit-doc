---
id: ts-ghr-docker-compose-wrong-arch-247
title: gh-r downloads ppc64le docker-compose on x86_64 Linux
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/247
related: [ts-ghr-wrong-arch-linux-431]
---

## Summary

On x86_64 Linux, zinit downloads the `ppc64le` variant of docker-compose instead of `x86_64`. The gh-r architecture filter was not strict enough to exclude non-matching architectures when multiple architectures had similar-looking names.

## Symptom

```
Downloading docker/compose...
(Requesting `docker-compose-linux-ppc64le'...)
```

Running the binary fails:

```
zsh: exec format error: docker-compose
```

## Cause

The gh-r asset selection logic was filtering by CPU architecture patterns but the ordering and pattern specificity allowed `ppc64le` to match before `x86_64` patterns were fully evaluated. Fixed in a series of PRs (#405, #414, #444, #457).

## Fix / Workaround

Update zinit to get the improved architecture filtering:

```zsh
zinit self-update
zinit delete docker/compose
exec zsh
```

If still affected, use explicit `bpick` and `mv`:

```zsh
zinit ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux-x86_64*"
zinit load docker/compose
```

## Caveats

Architecture filtering for `gh-r` has been iteratively improved across multiple releases. When automatic detection fails, `bpick` with the exact platform string from the release page is the reliable fallback.
