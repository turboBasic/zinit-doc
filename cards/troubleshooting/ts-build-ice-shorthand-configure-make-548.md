---
id: ts-build-ice-shorthand-configure-make-548
title: "Using the build ice as shorthand for configure + make"
category: troubleshooting
tags: [ice, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/548
related: []
---

## Summary

The `build` ice is a shorthand that automatically pulls in `null`, `configure`, and `make` ices, simplifying source-code compilation to a single ice modifier.

## Symptom

Users writing lengthy ice chains for source-compiled plugins like:

```zsh
zinit ice null configure'' make''
zinit load user/plugin
```

can simplify this but may not know the `build` ice exists.

## Cause

Not a bug — this documents the `build` ice feature added alongside `configure` and `make` ices.

## Fix / Workaround

Use `build''` as a shorthand:

```zsh
# Equivalent to: null configure'' make''
zinit build for user/plugin

# Pass arguments to the underlying make ice
zinit ice build'install PREFIX=$ZPFX'
zinit load user/plugin
```

The `build` ice:
- Sets `null` (disables sourcing)
- Sets `configure''` (runs `./configure --prefix=$ZPFX`)
- Sets `make''` (runs `make`)

Parameters given to `build''` are forwarded to `make''`.

## Caveats

`nonull` can override the implicit `null` from `build` if you also need the plugin sourced. The `build` ice requires Zinit with the configure/make/cmake ice support (added in the #613 feature set).
