---
id: ts-xdg-open-invalid-env-block-668
title: xdg-open fails on KDE Plasma 6 Wayland — "Invalid environment block" from zinit
category: troubleshooting
tags: [troubleshooting, installation, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/668
related: []
---

## Summary

After upgrading to KDE Plasma 6 on Wayland, `xdg-open` fails with "Invalid environment block" when launched from a zsh session that uses zinit. The error comes from KDE's D-Bus service trying to launch apps with the shell's environment.

## Symptom

```
kf.kio.gui: Failed to launch process as service: "app-org.kde.gwenview@...service" "org.freedesktop.DBus.Error.InvalidArgs" "Invalid environment block."
Invalid environment block.
Exited with status code: 4
```

## Cause

Under investigation. Zinit or a plugin loaded through zinit modifies the shell environment in a way that produces environment variable values (possibly null bytes, invalid characters, or overly long values) that KDE's DBus activation rejects as an invalid environment block.

## Fix / Workaround

No confirmed fix as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/668

Bisect which plugin is causing the problematic environment variable by disabling plugins one by one, or check for environment variables with unusual values:

```zsh
env | grep -v '^[A-Za-z_][A-Za-z0-9_]*=' | head -20
```

As a temporary workaround, use `env -i` to launch xdg-open with a clean environment, or file xdg-open calls through a wrapper that sanitizes the environment.

## Caveats

This may be a KDE Plasma 6 regression in combination with non-standard environment variables rather than a zinit-specific bug.
