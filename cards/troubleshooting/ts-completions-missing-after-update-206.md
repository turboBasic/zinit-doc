---
id: ts-completions-missing-after-update-206
title: compinit error — completion file missing after zinit update
category: troubleshooting
tags: [completion, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/206
related: []
---

## Summary

After a zinit update, `compinit` reports a "no such file or directory" error for a completion file that was previously installed (e.g. `_cheat`). The symlink in `$ZINIT[COMPLETIONS_DIR]` is stale or the source file was removed during the update.

## Symptom

```
compinit:503: no such file or directory: /home/user/.local/share/zinit/completions/_cheat
```

Appears on every new shell session.

## Cause

When a plugin is updated and its directory structure changes (or the completion filename changes), the symlink zinit created in the completions directory may point to a path that no longer exists. Zinit does not automatically refresh stale completion symlinks.

## Fix / Workaround

Reinstall completions for the affected plugin:

```zsh
zinit creinstall <plugin-name>
```

Or clear and rebuild all completion symlinks:

```zsh
zinit cclear
zinit creinstall --all
```

Then rebuild the completion cache:

```zsh
rm -f ~/.zcompdump
exec zsh
```

## Caveats

`zinit cclear` removes completion symlinks that resolve to missing files. Running it before `creinstall` is safe and often sufficient.
