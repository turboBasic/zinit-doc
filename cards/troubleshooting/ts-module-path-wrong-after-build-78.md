---
id: ts-module-path-wrong-after-build-78
title: zinit module build reports wrong module path after compilation
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/78
related: []
---

## Summary

After `zinit module build` completes successfully, the printed path to the compiled `.so` module was incorrect because the source path was reorganized but the print statement was not updated.

## Symptom

`zinit module build` succeeds but the displayed `zmodload` path points to a location where the module file does not exist, causing confusion when trying to load the module.

## Cause

The zinit-module repository moved the compiled module from `zmodules/Src/zdharma/` to the root of the module directory. The `.zinit-module` shell function still printed the old path.

## Fix / Workaround

Update zinit — the path output was corrected in PR #78:

```zsh
zinit self-update
```

To find the actual module location regardless of the displayed path:

```zsh
find "${ZINIT[BIN_DIR]:h}/zinit-module" -name "*.so" 2>/dev/null
```

Then load it with:

```zsh
zmodload zdharma_continuum/zinit
```

## Caveats

The module is now hosted in its own repository (`zdharma-continuum/zinit-module`) and is no longer bundled with zinit. `zinit module build` clones and builds it separately.
