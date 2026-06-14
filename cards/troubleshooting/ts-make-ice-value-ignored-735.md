---
id: ts-make-ice-value-ignored-735
title: make ice value (target/arguments) is ignored — always runs bare "make"
category: troubleshooting
tags: [troubleshooting, ice, installation]
source: https://github.com/zdharma-continuum/zinit/issues/735
related: [ts-make-prefix-detection-734]
---

## Summary

In `zinit-make-base-hook`, the build command is hardcoded as `make -C ${dir} --jobs 4` regardless of the value passed to the `make''` ice. Custom targets or flags in `make'install PREFIX=/opt'` are silently dropped.

## Symptom

`make'target'` or `make'OPTION=value'` ice has no effect. Zinit always runs the bare default make target.

## Cause

The hook constructs the build command string directly without interpolating the ice's value. The ice value is present in `$make` but never appended to `$build`.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/735

Workaround: replace `make''` with an explicit `atclone` / `atpull` hook:

```zsh
zinit ice atclone"make install PREFIX=$ZPFX" atpull"%atclone"
zinit light someuser/someplugin
```

## See Also

- ts-make-prefix-detection-734
