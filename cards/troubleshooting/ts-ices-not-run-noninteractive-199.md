---
id: ts-ices-not-run-noninteractive-199
title: atclone/mv/cp ices not executed when installing plugins non-interactively
category: troubleshooting
tags: [ice, plugin, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/199
related: [ts-ices-ignored-noninteractive-97]
---

## Summary

When zinit is run non-interactively (e.g. from a bootstrap script, `zsh -c`, or Ansible), ices that rely on zsh hooks with `!` (exclamation mark) — such as `atclone`, `mv`, and `cp` — are silently skipped, leaving plugins in a broken state.

## Symptom

Running zinit from a script results in errors like:

```
.zinit-load-plugin:source:110: no such file or directory: /home/user/.zinit/plugins/direnv---direnv/zhook.zsh
bin-gem-node annex: Warning: The sbin'' ice ('direnv') didn't match any files
```

The plugin directory lacks files that `atclone` was supposed to generate. Deleting the plugin directory and letting zinit install it interactively works fine.

## Cause

Zsh history expansion treats `!` specially in interactive mode but not in non-interactive mode, causing the hook registration patterns to fail. When `!`-prefixed hook names are used to register `atclone`/`mv`/`cp` hooks, they silently do nothing in non-interactive shells.

## Fix / Workaround

Update zinit (`zinit self-update`). PR #227 fixed the issue by disabling history mark expansion during hook registration and correcting the search pattern to not rely on escaped exclamation marks.

After updating, non-interactive installation works correctly:

```zsh
zsh -i -c "source ~/.local/share/zinit/zinit.git/zinit.zsh && zinit update --all"
```

## Caveats

The `-i` flag to `zsh` forces interactive mode and is an alternative workaround before updating zinit. Some ices (particularly those requiring a TTY) may still need interactive context.

## See Also

- ts-ices-ignored-noninteractive-97
