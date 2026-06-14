---
id: ts-ghr-bpick-musl-linux-vs-gnu-162
title: gh-r selects GNU binary instead of musl on Alpine/musl Linux
category: troubleshooting
tags: [ice, binary, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/162
related: []
---

## Summary

On musl-based Linux systems (Alpine, Void, etc.), zinit's `gh-r` auto-selection may download the GNU/glibc variant of a binary, which fails to run because `glibc` is not available.

## Symptom

A binary installed via `from"gh-r" as"program"` fails at runtime on Alpine or another musl-based distro:

```
/bin/sh: <binary>: not found
```

or:

```
error while loading shared libraries: libc.so.6: cannot open shared object file
```

even though the file exists on disk.

## Cause

Zinit's asset-selection heuristic did not detect musl systems and therefore did not prefer the `*musl*` asset over the generic Linux one.

## Fix / Workaround

Update zinit (musl detection was improved in PR #162):

```zsh
zinit self-update
```

If the project does not publish a separate musl variant, use a statically linked build if available. Otherwise use `bpick` to force the correct asset:

```zsh
zinit ice from"gh-r" as"program" bpick"*musl*"
zinit light <repo>
```

## Caveats

Not all projects publish musl builds. If only a GNU/glibc binary is available, consider installing a compatibility layer (`gcompat` on Alpine) or building the tool from source.
