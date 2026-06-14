---
id: ts-fnm-recipe-no-assets-arm-713
title: FNM recipe fails on Apple Silicon — "No GitHub release assets found"
category: troubleshooting
tags: [troubleshooting, binary, installation, recipe]
source: https://github.com/zdharma-continuum/zinit/issues/713
related: [ts-gh-r-wrong-platform-binary-575]
---

## Summary

The wiki recipe for `Schniz/fnm` fails on Apple Silicon (M-series Macs) with "No GitHub release assets found", even though fnm does publish `arm64` builds.

## Symptom

```
==> Downloading sbinfnm (at label: sbinfnm)
Error: gh-r: No GitHub release assets found for
```

## Cause

The `gh-r` asset selection heuristic does not correctly map Apple Silicon (`arm64`/`aarch64`) to the fnm release asset naming convention, or the asset names do not match the expected platform string patterns zinit uses.

## Fix / Workaround

Use `bpick` to explicitly select the correct asset for Apple Silicon:

```zsh
zinit for \
    as'completion' \
    atclone"./fnm completions --shell zsh > _fnm.zsh" \
    atload'eval $(fnm env --shell zsh)' \
    atpull'%atclone' \
    blockf \
    bpick"*arm64*" \
    from'gh-r' \
    nocompile \
    sbin'fnm' \
  @Schniz/fnm
```

If that doesn't work, check the actual asset names on the fnm releases page and match `bpick` to the exact naming pattern (e.g. `*aarch64*` or `*macos*`).

## See Also

- ts-gh-r-wrong-platform-binary-575
