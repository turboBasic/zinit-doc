---
id: ts-metadata-gitignore-plugin-dir-395
title: zinit metadata files in ._zinit get accidentally committed to git
category: troubleshooting
tags: [troubleshooting, git, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/395
related: []
---

## Summary

Zinit creates a `._zinit/` directory in each plugin directory to store metadata (ice configurations, wait, depth, lucid, etc.). Without a `.gitignore` in that subdirectory, these files can be accidentally staged and committed when working in a plugin's git repository.

## Symptom

Running `git status` inside a zinit-managed plugin directory (e.g. `~/.local/share/zinit/plugins/user---plugin`) shows `._zinit/` files (e.g. `._zinit/teleid`, `._zinit/wait`, `._zinit/lucid`) as untracked or staged:

```
?? ._zinit/
```

leading to accidental inclusion in commits.

## Cause

Zinit created the `._zinit/` metadata directory without placing a `.gitignore` inside it. This directory is not part of the plugin's source tree and should not be tracked by git. Fixed in PR #397 by adding `._zinit/.gitignore` with content `*` to each plugin directory on first write.

## Fix / Workaround

Update zinit to include PR #397 (`zinit self-update`). Newly created plugin directories will have `._zinit/.gitignore` with `*`, preventing metadata from being tracked.

For existing plugin directories, add the gitignore manually:

```zsh
# For all existing plugins:
for dir in ~/.local/share/zinit/plugins/*/._zinit; do
  echo '*' > "$dir/.gitignore"
done
```

```zsh
# Alternative: create with mkdir -p for safety
for dir in ~/.local/share/zinit/plugins/*; do
  mkdir -p "$dir/._zinit"
  echo '*' > "$dir/._zinit/.gitignore"
done
```

Or add `._zinit/` to the global gitignore:

```zsh
echo '._zinit/' >> ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
```

## Caveats

This only matters if you run `git status` or `git diff` inside plugin directories. Zinit does not commit to plugin repositories — the metadata is purely local.
