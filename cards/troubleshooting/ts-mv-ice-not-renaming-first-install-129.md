---
id: ts-mv-ice-not-renaming-first-install-129
title: mv ice does not rename file on the very first install — works on second install
category: troubleshooting
tags: [troubleshooting, ice, binary, installation]
source: https://github.com/zdharma-continuum/zinit/issues/129
related: []
---

## Summary

On initial plugin installation (first `zinit load`), the `mv` ice does not rename the file. The rename works correctly on the second install (after deleting the plugin directory and restarting).

## Symptom

```
ziextract: Successfully extracted and assigned +x chmod to the file: `direnv.linux-amd64'.
# No rename occurs — direnv.linux-amd64 is NOT renamed to direnv
```

After deleting `~/.local/share/zinit/plugins/direnv---direnv` and restarting zsh, the rename works:

```
ziextract: Successfully extracted and assigned +x chmod to the file: `direnv.linux-amd64'.
renamed 'direnv.linux-amd64' -> 'direnv'
```

## Cause

On the first install, `mv` ice runs before the extracted file exists in the plugin directory. The extraction completes after `mv` has already checked for files to rename, so the rename is skipped.

## Fix / Workaround

Delete the plugin directory and reinstall:

```zsh
zinit delete --yes direnv/direnv
# Open a new shell to trigger re-installation
```

Or use `atclone` to do the rename explicitly after extraction:

```zsh
zinit ice from"gh-r" as"program" \
    atclone"mv direnv* direnv && chmod +x direnv" atpull"%atclone" \
    pick"direnv" src="zhook.zsh"
zinit light direnv/direnv
```

Track https://github.com/zdharma-continuum/zinit/issues/129 for a fix.
