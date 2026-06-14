---
id: ts-ssh-proto-url-format-721
title: "proto'ssh' produces malformed URL for private repositories"
category: troubleshooting
tags: [ice, git, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/721
related: []
---

## Summary

Using `proto'ssh'` to clone a private GitHub repository fails because zinit constructed an incorrect SSH URL format.

## Symptom

`zinit load username/private-repo` with `proto'ssh'` fails to clone, producing git errors about the repository not being found or authentication failing, even when the SSH key is correctly configured.

## Cause

The SSH URL construction in `.zinit-setup-plugin-dir` produced a malformed URL (`https://` prefix instead of `git@github.com:` format expected for SSH).

## Fix / Workaround

Update zinit (fixed in PR #721):

```zsh
zinit self-update
```

After updating, the correct pattern works:

```zsh
zinit ice proto'ssh'
zinit load username/private-repo
```

## Examples

```zsh
# Load a private repo over SSH
zinit ice proto'ssh'
zinit load myorg/private-plugin
```

## Caveats

SSH key must be configured and accessible to the shell (i.e., `ssh-agent` running and key added).
