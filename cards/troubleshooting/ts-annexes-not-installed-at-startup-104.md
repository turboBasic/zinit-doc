---
id: ts-annexes-not-installed-at-startup-104
title: Annexes not available on first shell launch after fresh zinit install
category: troubleshooting
tags: [annex, installation, turbo, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/104
related: []
---

## Summary

After a fresh zinit installation, annexes defined in `.zshrc` are not available immediately because the Turbo scheduler has not run yet. The first interactive shell after install downloads them in the background.

## Symptom

On the first shell launched after installing zinit, commands provided by annexes (e.g., `sbin`, `fbin`) are missing or unknown. They become available in subsequent shells after the Turbo scheduler has installed them.

## Cause

Annexes loaded with `wait` (Turbo mode) are installed asynchronously after the prompt appears. On the very first launch, the downloads have not yet completed. The installer was updated to run `@zinit-scheduler burst` at install time to pre-install annexes before the user's first interactive session.

## Fix / Workaround

If annexes are missing after a fresh install, trigger their installation manually:

```zsh
@zinit-scheduler burst
```

Or force-reinstall the annexes:

```zsh
zinit update --all
```

For a scripted/automated install, run the scheduler burst as part of the post-install step:

```zsh
zsh -i -c '@zinit-scheduler burst'
```

## Caveats

The `burst` mode runs all pending Turbo jobs synchronously in a single pass. It is intended for install-time setup, not regular use.
