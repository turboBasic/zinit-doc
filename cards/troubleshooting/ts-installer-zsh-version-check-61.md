---
id: ts-installer-zsh-version-check-61
title: Installer warns about zsh version below 5.5.1
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/61
related: []
---

## Summary

The zinit installer checks the zsh version and warns (but does not abort) if the detected version is below 5.5.1, since some zinit features depend on newer zsh capabilities.

## Symptom

The installer prints a warning such as:

```
Warning: zsh version 5.4.2 detected. Zinit requires zsh >= 5.5.1 for full functionality.
```

Some features may not work correctly on older zsh.

## Cause

Zinit uses zsh features introduced in 5.5 and later. Installations on older systems (e.g., macOS pre-Catalina shipping zsh 5.3) may encounter subtle failures.

## Fix / Workaround

Upgrade zsh to at least 5.5.1. Options:

- **macOS**: install via Homebrew: `brew install zsh`
- **Linux**: use the system package manager or build from source
- **Portable static binary**: use [romkatv/zsh-bin](https://github.com/romkatv/zsh-bin)

After upgrading, verify the version:

```zsh
zsh --version
```

## Caveats

The installer does not block installation on old zsh — the warning is informational. Basic usage may still work, but Turbo mode and some ices may behave unexpectedly on zsh < 5.5.1.
