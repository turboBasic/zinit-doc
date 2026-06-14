---
id: ts-install-script-no-exit-on-clone-failure-297
title: Install script continues silently after git clone failure
category: troubleshooting
tags: [troubleshooting, installation, git]
source: https://github.com/zdharma-continuum/zinit/issues/297
related: []
---

## Summary

The zinit installation script (`install.sh`) does not exit when `git clone` fails. If the network is unavailable or GitHub is unreachable, the script reports a fatal git error but continues, leaving an incomplete or empty installation.

## Symptom

```
Cloning into 'zinit.git'...
fatal: unable to access 'https://github.com/zdharma-continuum/zinit': ...
SUCCESS: Download finished!
```

The install reports success despite the clone failing. Subsequent shell launches fail because zinit is not properly installed.

## Cause

The install script does not check the exit code of `git clone` and does not use `set -e` consistently throughout the clone step.

## Fix / Workaround

No fix merged as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/297

If the install script ran but clone failed, re-run the install command:

```bash
bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

Or clone manually:

```zsh
mkdir -p ~/.local/share/zinit
git clone https://github.com/zdharma-continuum/zinit ~/.local/share/zinit/zinit.git
```
