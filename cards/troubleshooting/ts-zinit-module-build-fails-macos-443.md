---
id: ts-zinit-module-build-fails-macos-443
title: zinit module fails to load after build — .bundle file not found on macOS
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/443
related: []
---

## Summary

After running `zinit module build` on macOS, adding the module to `.zshrc` via `module_path` and restarting the terminal produces "failed to load module" because the built `.bundle` file does not exist at the expected path.

## Symptom

```
/Users/user/.zshrc:3: failed to load module `zdharma_continuum/zinit': dlopen(.../zinit.bundle, 0x0009): tried: '...' (no such file)
```

`zinit module build` appears to succeed but the output file is missing.

## Cause

Under investigation. The build may fail silently or install the file to a different path depending on the Xcode / macOS version. The expected path is `~/.local/share/zinit/module/Src/zdharma_continuum/zinit.bundle`.

## Fix / Workaround

No fix available as of issue filing; track https://github.com/zdharma-continuum/zinit/issues/443

Check whether the build actually succeeded and where it placed output:

```zsh
find ~/.local/share/zinit/module -name "*.bundle" -o -name "*.so" 2>/dev/null
```

Try rebuilding with verbose output:

```zsh
zinit module build -- --verbose
```

If the module is not critical, remove the `module_path` and `zmodload` lines from `.zshrc` — the zinit module is optional and primarily speeds up plugin loading.

## Caveats

The zinit module is now hosted at a separate repository (zdharma-continuum/zinit-module). The module is optional.
