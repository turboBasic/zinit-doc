---
id: ts-atclone-exit-code-not-propagated-111
title: atclone failure not reported — zinit exits 0 even when hook script fails
category: troubleshooting
tags: [ice, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/111
related: []
---

## Summary

Before PR #112, when an `atclone` script failed (non-zero exit), zinit printed its output but still exited with code 0 and printed no warning. This made it impossible to detect failed hook execution in scripts or CI.

## Symptom

```zsh
zinit id-as"atclone-fails" atclone'echo atclone; false' for zdharma-continuum/null && echo okay || echo failed
# prints "okay" even though atclone returned non-zero
```

No warning is shown when the `atclone` script fails. The plugin appears to load successfully.

## Cause

Hook exit codes were not checked or propagated. The `zinit` command always returned 0 regardless of hook outcome.

## Fix / Workaround

Update zinit (`zinit self-update`) — PR #112 added hook exit code propagation and a warning message:

```
Warning: ∞zinit-compile-plugin-hook hook returned with 1
```

After the fix, a failed `atclone` will cause zinit to report the failure both as a warning and via a non-zero exit code.

If pinned to an older version, verify hook success by checking for expected output files in the plugin directory after installation.

## Caveats

After the fix, scripts that previously silently failed will now loudly fail. This may reveal pre-existing issues with `atclone`/`atpull` scripts that were previously hidden.
