---
id: ts-ghr-nightly-vs-stable-245
title: gh-r installs latest release but does not track nightly builds
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/245
related: []
---

## Summary

When a GitHub project publishes both stable releases and nightly (pre-release) builds, `from"gh-r"` defaults to "latest" which may not include pre-releases. Once a nightly is installed, subsequent updates may not detect a newer nightly if the "latest" tag still points to the last stable release.

## Symptom

After initial install via:

```zsh
zinit ice lucid from"gh-r" bpick"*linux-gnu.gz" mv"rust-analyzer-* -> rust-analyzer"
zinit light "rust-lang/rust-analyzer"
```

The plugin installs a nightly but stops updating to newer nightlies. Or conversely, it installs a nightly when the user wanted stable.

## Cause

- `ver"latest"` (the default) resolves to the most recently published release. GitHub's "latest" tag excludes pre-releases unless explicitly configured in the release settings.
- If the project publishes nightlies as pre-releases, `from"gh-r"` with no `ver` ice skips them.
- If the project publishes nightlies as the "latest" release, `from"gh-r"` will pick them up but then won't update again until another release is published.

## Fix / Workaround

To always track the latest release (including pre-releases named as the "latest"):

```zsh
zinit ice from"gh-r" ver"latest" bpick"*linux-gnu.gz"
zinit light rust-lang/rust-analyzer
```

To pin to a specific stable tag:

```zsh
zinit ice from"gh-r" ver"2024-01-01" bpick"*linux-gnu.gz"
zinit light rust-lang/rust-analyzer
```

To always get nightly builds when they are tagged as pre-releases, you must use the GitHub API with `bpick` and a known nightly asset pattern. There is no `ver"nightly"` built-in — check the actual tag names for the project.

## Caveats

`zinit update` re-checks the release against the stored `ver` ice. If `ver` is unset (defaults to "latest"), each update checks the latest release. If the version hasn't changed since the last download, zinit skips the download.
