---
id: ts-compdef-not-defined-after-source-654
title: compdef not available after sourcing zinit — command not found
category: troubleshooting
tags: [troubleshooting, completion, installation]
source: https://github.com/zdharma-continuum/zinit/issues/654
related: []
---

## Summary

After sourcing `zinit.zsh`, calling `compdef` in user code fails with "command not found", even though zinit's README states that `compdef` should be intercepted and available after zinit is loaded.

## Symptom

```
zsh: command not found: compdef
```

Called from a file sourced after zinit but before `compinit`.

## Cause

Zinit provides a stub `compdef` function only after its own initialization code sets it up. If zinit is sourced with a non-standard bootstrap snippet or in a way that skips the stub registration (e.g. missing `autoload -Uz _zinit` line), the stub may not be installed.

## Fix / Workaround

Ensure the full zinit bootstrap is used, including the completion registration lines:

```zsh
source "${ZINIT_HOME}/zinit.zsh"
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit
```

After this, `compdef` calls are intercepted by zinit's stub and replayed when `zinit cdreplay` is called after `compinit`. If you need `compdef` available in sourced files, source zinit first and ensure the above three lines are all present.

## Caveats

The zinit `compdef` stub only works for capturing calls to replay later — it does not define completions immediately. Always call `compinit` and `zinit cdreplay -q` before relying on completions to work.
