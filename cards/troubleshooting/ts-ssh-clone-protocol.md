---
id: ts-ssh-clone-protocol
title: Using SSH instead of HTTPS for cloning plugin repositories
category: troubleshooting
tags: [installation, git, ice]
source: https://github.com/zdharma-continuum/zinit/discussions/522
related: [ts-pin-plugin-specific-commit]
---

## Summary

Zinit clones plugins over HTTPS by default. To use SSH instead (e.g. when HTTPS is slow or has SSL errors), set the `proto` ice or configure git to rewrite URLs globally.

## Question / Problem

Since GitHub changed authentication from password to SSH, HTTPS cloning can be slow or produce SSL errors in some network environments. A user requested a way to switch the default clone method to SSH.

## Answer / Solution

**Option 1 — `proto` ice per plugin:**

```zsh
zinit ice proto"ssh"
zinit load user/plugin
```

**Option 2 — Git URL rewrite (global, affects all git operations):**

Add to `~/.gitconfig`:

```ini
[url "git@github.com:"]
    insteadOf = https://github.com/
```

This rewrites all `https://github.com/` URLs to SSH transparently, including zinit clones.

**Option 3 — `cloneopts` ice for individual plugins:**

```zsh
zinit ice cloneopts"--depth=1"  # combine with proto ice
zinit ice proto"ssh" cloneopts"--recursive"
zinit load user/plugin
```

## Caveats

`proto"ssh"` does not work with `zinit snippet` (snippets use curl/wget, not git). The git URL rewrite approach is the most comprehensive as it affects all git-based operations including `zinit update`.
