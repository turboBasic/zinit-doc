---
id: ts-single-branch-clone-depth-138
title: Reducing clone bandwidth with depth and single-branch options
category: troubleshooting
tags: [ice, git, performance, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/138
related: []
---

## Summary

By default zinit clones the full history of plugin repositories. Using `depth` and `cloneopts` ices limits the clone to a shallow, single-branch fetch, significantly reducing network usage.

## Symptom

Plugin installs or `zinit update` are slow on limited-bandwidth connections because full git history is transferred.

## Cause

The default `git clone` fetches the entire history of all branches. For most plugin use cases, only the latest commit on the default branch is needed.

## Fix / Workaround

Use the `depth` ice to request a shallow clone:

```zsh
zinit ice depth"1"
zinit light romkatv/powerlevel10k
```

For a single-branch shallow clone:

```zsh
zinit ice depth"1" cloneopts"--single-branch"
zinit light zsh-users/zsh-autosuggestions
```

To apply to all plugins via `zinit-annex-default-ice`:

```zsh
zinit ice-default depth"1"
```

## Caveats

- `depth"1"` prevents browsing full history with `zinit changes <plugin>`.
- Shallow clones cannot be easily deepened later without a full re-clone.
- `cloneopts` replaces the default `--recursive`; add it back if the plugin uses submodules: `cloneopts"--single-branch --recursive"`.
