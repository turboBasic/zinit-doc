---
id: ts-unicode-filenames-break-zcompile-58
title: zcompile fails on annex handler files with Unicode/emoji in filename
category: troubleshooting
tags: [annex, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/58
related: []
---

## Summary

Using the `compile` ice on `zinit-annex-bin-gem-node` produces errors because `zcompile` cannot open files whose names contain Unicode characters (emoji), which some annex handler files used.

## Symptom

```
(anon):zcompile:2: can't open file: /home/user/.local/share/zinit/plugins/zdharma-continuum---zinit-annex-bin-gem-node/\M-b\M-^\M-^Rza-bgn-atclone-handler
(anon):zcompile:2: can't open file: ...za-bgn-atload-handler
```

## Cause

Zsh's `zcompile` builtin does not support filenames with non-ASCII (Unicode) characters. The annex handler files previously had emoji characters in their names (the raw bytes are visible as `\M-b\M-...` escape sequences).

## Fix / Workaround

Update zinit and the affected annex (`zinit self-update`). The Unicode characters were removed from all handler filenames in PR #58's remediation.

As a workaround, avoid using `compile'*handler'` on annexes known to contain Unicode filenames:

```zsh
# Instead of compiling annex handlers, load without compile ice
zinit light-mode for \
    zdharma-continuum/zinit-annex-bin-gem-node
```

## Caveats

This affected only the old filenames; updated versions of the annex use ASCII-only names. If you cloned the annex before the fix, run `zinit delete zdharma-continuum/zinit-annex-bin-gem-node` and let it reinstall.
