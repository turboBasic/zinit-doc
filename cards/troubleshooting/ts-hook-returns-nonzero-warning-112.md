---
id: ts-hook-returns-nonzero-warning-112
title: Warning printed when a zinit hook (atclone/atpull/make) returns non-zero
category: troubleshooting
tags: [ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/112
related: []
---

## Summary

Zinit now explicitly warns when a hook such as `atclone`, `atpull`, or `make` exits with a non-zero status, making failures visible instead of silently continuing.

## Symptom

After a plugin install or update, a warning appears:

```
Warning: ∞zinit-compile-plugin-hook hook returned with 1
```

The plugin may be partially installed or broken.

## Cause

A hook command (the value of `atclone`, `atpull`, `make`, etc.) exited with a non-zero return code. Earlier versions of zinit did not surface this, so failures were silent. The warning was added as an improvement.

## Fix / Workaround

Investigate the specific hook that failed by running it manually inside the plugin directory:

```zsh
zinit cd <plugin-spec>
# then run the hook command manually, e.g.:
make
# or
./configure
```

Fix the underlying command (missing dependency, wrong path, etc.) and then reinstall:

```zsh
zinit delete <plugin-spec>
zinit load <plugin-spec>
```

To suppress the warning for a hook that is expected to sometimes fail, use `|| true` at the end of the hook command:

```zsh
zinit ice atclone"./configure || true"
```

## Caveats

Suppressing with `|| true` hides real errors. Only use it when the non-zero exit is intentional and harmless.
