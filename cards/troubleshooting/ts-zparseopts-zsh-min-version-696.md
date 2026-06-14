---
id: ts-zparseopts-zsh-min-version-696
title: "Zinit requires minimum Zsh 5.8 — older versions not supported"
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/696
related: [ts-zparseopts-F-zsh-old-687.md]
---

## Summary

The Zinit installer enforces a minimum Zsh version of 5.8. Systems running older Zsh versions are not supported and will fail to install or run Zinit correctly.

## Symptom

Installation fails or Zinit produces errors on Zsh versions below 5.8. Errors may include syntax errors, unknown options to `zparseopts`, or other parsing failures.

## Cause

Zinit uses Zsh features (notably `zparseopts -F` and other 5.8+ capabilities) that are not available in older releases. The minimum version was explicitly set to 5.8 to reflect this.

## Fix / Workaround

Upgrade Zsh to 5.8 or later. Check your version:

```zsh
zsh --version
```

On macOS, the system Zsh (usually 5.9 on recent macOS) is fine. On older macOS, upgrade via Homebrew:

```zsh
brew install zsh
```

On Linux, use your package manager or build from source. On NixOS:

```nix
programs.zsh.enable = true;
# Ensure a recent Zsh package is selected
```

## See Also

- ts-zparseopts-F-zsh-old-687.md
