---
id: ts-ghr-musl-os-selection-162
title: gh-r selects Linux binary on macOS or misses musl variant on musl systems
category: troubleshooting
tags: [ice, binary, git, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/162
related: []
---

## Summary

A regression in zinit's `bpick` regex caused `gh-r` to select Linux release assets when running on macOS, and also failed to select the `musl` variant on musl-based Linux systems (Alpine, Void, etc.).

## Symptom

On macOS: `zinit ice from"gh-r" as"program"` installs a Linux binary instead of the macOS one, causing a "bad CPU type in executable" or "exec format error" at runtime.

On musl Linux (e.g., Alpine): the musl-linked variant of a binary is not selected even when it is the only viable option. The binary installed via `from"gh-r" as"program"` fails at runtime:

```
/bin/sh: <binary>: not found
```

or:

```
error while loading shared libraries: libc.so.6: cannot open shared object file
```

even though the file exists on disk (because the GNU/glibc variant was downloaded instead).

## Cause

A bpick regex group update (#158) broke the OS-detection logic. The fix was reverted and then re-implemented correctly in PR #162, which also added `macos` as a recognised macOS descriptor and improved musl detection. Zinit's asset-selection heuristic did not detect musl systems and therefore did not prefer the `*musl*` asset over the generic Linux one.

## Fix / Workaround

Update zinit to include the fix:

```zsh
zinit self-update
```

If still affected, use explicit `bpick` to force the correct asset:

```zsh
# macOS
zinit ice from"gh-r" as"program" bpick"*darwin*"

# musl Linux
zinit ice from"gh-r" as"program" bpick"*musl*"
zinit light <repo>
```

## Caveats

The automatic OS/arch detection is a best-effort heuristic. When a project's asset naming is non-standard, `bpick` is always the reliable fallback. Not all projects publish musl builds. If only a GNU/glibc binary is available, consider installing a compatibility layer (`gcompat` on Alpine) or building the tool from source.
