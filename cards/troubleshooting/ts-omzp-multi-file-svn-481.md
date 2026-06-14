---
id: ts-omzp-multi-file-svn-481
title: "Cannot load OMZ plugin with multiple files (SVN not found or unavailable)"
category: troubleshooting
tags: [snippet, ice, installation, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/issues/481
related: [ts-svn-github-dropped-support-664]
---

## Summary

Loading a multi-file OMZ plugin (e.g. `aliases` which ships a Python helper) via `zinit ice svn` either fails because SVN is not installed, or because GitHub dropped SVN support in 2024.

## Symptom

```
/Users/xx/.local/share/zinit/snippets/OMZP::aliases/cheatsheet.py: [Errno 2] No such file or directory
```

Or SVN connection errors when SVN is absent or GitHub's bridge is down.

## Cause

Zinit's `svn` ice depended on both a local `svn` binary and GitHub's SVN bridge (shut down January 2024) to clone entire subdirectories. Without either, only the entry-point `.zsh` file is downloaded, not the accompanying helper files.

## Fix / Workaround

For `OMZP::aliases` specifically, which requires `cheatsheet.py`:

```zsh
# Load from the GitHub repo directly using atclone to pull auxiliary files
zinit ice wait lucid \
    atclone"mkdir -p $ZINIT[SNIPPETS_DIR]/OMZP::aliases; \
            curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/plugins/aliases/cheatsheet.py \
              -o $ZINIT[SNIPPETS_DIR]/OMZP::aliases/cheatsheet.py"
zinit snippet OMZP::aliases
```

For multi-file plugins in general, load them as full plugins instead of snippets:

```zsh
zinit ice pick"plugins/aliases/aliases.plugin.zsh"
zinit light ohmyzsh/ohmyzsh
```

## Caveats

As of January 2024, `zinit ice svn` for GitHub-hosted content no longer works regardless of whether `svn` is installed locally.
