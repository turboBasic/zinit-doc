---
id: ts-ssh-clone-instead-of-https-522
title: Cloning plugins over SSH instead of HTTPS
category: troubleshooting
tags: [installation, git, ice]
source: https://github.com/zdharma-continuum/zinit/discussions/522
related: []
---

## Summary
The `proto''` ice modifier changes the clone protocol from the default HTTPS to SSH, enabling SSH-based authentication for plugin clones.

## Question / Problem
A user whose GitHub authentication required SSH (after GitHub deprecated password authentication) found that zinit's default HTTPS cloning was slow or produced SSL errors.

## Answer / Solution
Use the `proto"ssh"` ice to clone via SSH:

```zsh
zinit ice proto"ssh"
zinit light some/plugin
```

To set SSH as the default for all plugins, configure git globally to rewrite GitHub HTTPS URLs to SSH:

```zsh
git config --global url."git@github.com:".insteadOf "https://github.com/"
```

This affects all git operations system-wide, not just zinit.

## Caveats
`proto''` only works with plugins (not snippets). Snippets fetched with `zinit snippet <URL>` use `curl` or `wget`, which ignore the `proto` ice. Ensure your SSH key is added to `ssh-agent` before shell startup, otherwise zinit will prompt for SSH credentials on every new terminal.
