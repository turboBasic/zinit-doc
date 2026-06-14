---
id: ts-mv-ice-hook-returns-1-125
title: mv ice reports hook returned 1 even when file moved successfully
category: troubleshooting
tags: [ice, installation, troubleshooting, binary]
source: https://github.com/zdharma-continuum/zinit/issues/125
related: []
---

## Summary

Using the `mv` ice to rename a downloaded binary produces a false-positive warning "hook returned with 1" even though the file is correctly moved. The exit code from `mv` was not being captured properly.

## Symptom

```
Warning: ∞zinit-compile-plugin-hook hook returned with 1
```

The file is actually renamed correctly, but zinit reports a hook failure.

## Cause

A change to hook error-propagation (PR #112) made zinit check and report non-zero exit codes from hooks. The `mv` ice implementation returned a non-zero exit code in certain code paths even on success, triggering the false warning.

## Fix / Workaround

Update zinit (`zinit self-update`) — fixed in PR #126.

If the warning appears on an older version but the rename succeeded (verify with `ls` in the plugin dir), you can safely ignore it. The plugin will work correctly.

## Examples

```zsh
zinit ice as"command" from"gh-r" bpick"*musl*" mv"fd* -> fd" pick"fd/fd"
zinit light sharkdp/fd
```

## Caveats

After the fix, a `mv` ice that genuinely fails to match any file will show a different, actionable warning listing the available files to help correct the glob pattern.
