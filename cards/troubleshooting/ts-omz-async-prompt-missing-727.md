---
id: ts-omz-async-prompt-missing-727
title: "command not found: _omz_register_handler when loading OMZ themes"
category: troubleshooting
tags: [snippet, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/issues/727
related: []
---

## Summary

When migrating from Oh My Zsh to zinit and loading `OMZL::git.zsh`, the shell reports `command not found: _omz_register_handler` because `async_prompt.zsh` (which defines that function) is not loaded first.

## Symptom

```
command not found: _omz_register_handler
```

Appears during shell startup after loading `OMZL::git.zsh` via zinit snippet.

## Cause

`OMZL::git.zsh` depends on `_omz_register_handler` defined in `OMZL::async_prompt.zsh`. In a full OMZ installation, all libraries are sourced in a defined order. When loading individual libraries via zinit snippets, the dependency is not automatically resolved.

## Fix / Workaround

Load `OMZL::async_prompt.zsh` before `OMZL::git.zsh`:

```zsh
zi snippet OMZL::async_prompt.zsh
zi snippet OMZL::git.zsh

zi snippet OMZP::git
zi cdclear -q

setopt promptsubst
zi snippet OMZT::robbyrussell
```

## See Also

README section "Migration from Oh-My-ZSH".
