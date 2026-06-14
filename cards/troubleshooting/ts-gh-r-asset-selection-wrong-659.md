---
id: ts-gh-r-asset-selection-wrong-659
title: gh-r downloads wrong asset — update file or non-matching binary selected
category: troubleshooting
tags: [troubleshooting, binary, installation, git]
source: https://github.com/zdharma-continuum/zinit/issues/659
related: [ts-gh-r-wrong-platform-binary-575]
---

## Summary

On some platforms, `from"gh-r"` selects an incorrect release asset — for example downloading an `*-update` metadata file rather than the actual binary tarball, or selecting a build for the wrong architecture.

## Symptom

The downloaded file is not the expected binary. With `atuin` on x86 macOS, zinit downloads an `*-update` file from the release assets instead of the `atuin*.tar.gz` binary.

## Cause

The asset scoring heuristic in zinit's GitHub-release downloader ranks candidates by matching substrings against the OS/arch. A file like `atuin-update` can score higher than the tarball if the scoring does not penalize non-binary file types or metadata files.

## Fix / Workaround

Use `bpick` to explicitly select the desired asset by glob pattern:

```zsh
zinit ice as"null" from"gh-r" bpick"atuin-*.tar.gz" \
    mv"atuin*/atuin -> atuin" lbin"!atuin -> atuin" \
    atclone"./atuin init zsh > zhook.zsh" atpull"%atclone" \
    src"zhook.zsh"
zinit light atuinsh/atuin
```

## See Also

- ts-gh-r-wrong-platform-binary-575
