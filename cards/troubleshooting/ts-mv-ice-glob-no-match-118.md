---
id: ts-mv-ice-glob-no-match-118
title: mv ice does not rename binary when glob pattern lacks separator character
category: troubleshooting
tags: [ice, binary, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/118
related: []
---

## Summary

The `mv` ice silently fails to rename a downloaded binary when the glob pattern does not uniquely match because the wildcard `*` is too broad and matches the target name itself, or because the separator between the base name and the wildcard is missing.

## Symptom

The binary is downloaded but not renamed. For example, only `git-absorb-linux-x86_64` is present in the plugin directory instead of `git-absorb`.

```
Downloading tummychow/git-absorb…
(Requesting 'git-absorb-linux-x86_64'…)
ziextract: Successfully extracted and assigned +x chmod to the file: 'git-absorb-linux-x86_64'.
# No rename message — mv ice silently failed
```

## Cause

The pattern `mv"git-absorb* -> git-absorb"` matches both `git-absorb-linux-x86_64` (the file to rename) and the target name `git-absorb` (which doesn't exist yet). When the pattern is ambiguous or doesn't use a delimiter before `*`, zinit's glob matching may not yield the expected source file.

## Fix / Workaround

Add a separator character (e.g. a hyphen) before the wildcard to make the pattern unambiguous:

```zsh
# Wrong — pattern may not match when base name equals prefix
mv"git-absorb* -> git-absorb"

# Correct — hyphen before wildcard disambiguates
mv"git-absorb-* -> git-absorb"
```

## Examples

```zsh
zinit ice from"gh-r" as"program" mv"git-absorb-* -> git-absorb"
zinit light tummychow/git-absorb
```

## Caveats

When `mv` fails to match, zinit now logs a warning listing the available files (since PR #126), making diagnosis easier:

```
Warning: mv ice didn't match any file. [DOES_NOT_EXIST* -> fd]
Available files: fd-v8.3.0-x86_64-unknown-linux-musl
```
