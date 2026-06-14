---
id: ts-starship-pkg-download-197
title: gh-r installs .pkg file for starship on macOS instead of the binary tarball
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/197
related: [ts-ghr-windows-msi-on-macos-179, ts-ghr-selects-darwin-on-linux-160]
---

## Summary

On macOS, `from"gh-r"` may download `starship-x86_64-apple-darwin.pkg` (an installer package) instead of the `.tar.gz` binary archive, causing `ziextract` to fail and `atclone` to error because the `starship` binary is never extracted.

## Symptom

```
(Requesting 'starship-x86_64-apple-darwin.pkg'…)
ziextract: WARNING: didn't recognize the archive type of 'starship-x86_64-apple-darwin.pkg'
(eval):1: no such file or directory: ./starship
```

## Cause

The automatic `gh-r` selection logic picks the first macOS asset alphabetically or by regex match, and `.pkg` files appear in the release assets alongside `.tar.gz` archives. The selection logic did not exclude `.pkg` files.

## Fix / Workaround

Use `bpick` to select only the tarball:

```zsh
zinit ice as"command" from"gh-r" bpick"*apple-darwin*.tar.gz" \
    atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
    atpull"%atclone" src"init.zsh"
zinit light starship/starship
```

Updating zinit (`zinit self-update`) also improves the selection heuristic.
