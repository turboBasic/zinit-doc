---
id: ts-zinit-metadata-committed-to-git-395
title: Zinit's ._zinit metadata directory shows up as untracked in git
category: troubleshooting
tags: [git, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/395
related: []
---

## Summary

Zinit stores ice metadata in a `._zinit/` directory inside each plugin's cloned repository. Without a `.gitignore` entry, this directory appears as untracked changes in `git status` within the plugin's directory.

## Symptom

Running `git status` inside a zinit-managed plugin directory (e.g. `~/.local/share/zinit/plugins/user---plugin`) shows:

```
?? ._zinit/
```

## Cause

Zinit creates `._zinit/` to persist ice modifiers (wait, depth, lucid, etc.) for use on updates. This directory is not part of the plugin's source tree and should not be tracked by git.

Starting from PR #397, zinit automatically creates `._zinit/.gitignore` with content `*` to prevent the metadata from appearing in git status.

## Fix / Workaround

Update zinit to get the automatic `.gitignore` creation fix:

```zsh
zinit self-update
```

For existing plugin directories, create the `.gitignore` manually:

```zsh
for dir in ~/.local/share/zinit/plugins/*; do
  mkdir -p "$dir/._zinit"
  echo '*' > "$dir/._zinit/.gitignore"
done
```

## Caveats

This only matters if you run `git status` or `git diff` inside plugin directories. Zinit does not commit to plugin repositories — the metadata is purely local.
