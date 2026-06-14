---
id: ts-ssh-clone-instead-https-284
title: Using SSH instead of HTTPS for plugin cloning
category: troubleshooting
tags: [git, ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/284
related: []
---

## Summary

Zinit defaults to cloning plugins via HTTPS. Users on networks with HTTPS restrictions, or who prefer SSH authentication, can switch to SSH using the `proto` ice.

## Symptom

HTTPS cloning is slow, fails with SSL errors, or requires password authentication on networks that block HTTPS to GitHub.

## Fix / Workaround

Use the `proto` ice to clone via SSH:

```zsh
zinit ice proto"ssh"
zinit load user/plugin
```

To set SSH as the default protocol for all plugins, configure a git URL rewrite in `~/.gitconfig`:

```ini
[url "git@github.com:"]
    insteadOf = https://github.com/
```

This rewrites all HTTPS GitHub URLs to SSH transparently without needing the `proto` ice on each plugin.

## Examples

```zsh
# SSH clone for a single plugin
zinit ice proto"ssh" depth"1"
zinit light romkatv/powerlevel10k
```

## Caveats

- The `proto` ice only affects `zinit load`/`zinit light` (plugin cloning). Snippets loaded via `zinit snippet` use `curl`/`wget` for direct URL downloads, which is separate from git.
- SSH requires an SSH key configured for GitHub authentication. HTTPS is more universally available.
- The git URL rewrite in `~/.gitconfig` is a system-wide change affecting all git operations, not just zinit.
