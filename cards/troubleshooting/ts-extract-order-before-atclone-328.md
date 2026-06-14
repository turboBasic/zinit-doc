---
id: ts-extract-order-before-atclone-328
title: extract ice must run before atclone for configure-based compile workflows
category: troubleshooting
tags: [ice, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/328
related: [ts-configure-ice-prefix-zpfx-334, ts-configure-ice-build-systems-351]
---

## Summary

For plugins downloaded as archives (e.g. via `gh-r`) where `atclone` runs `./configure`, the `extract''` ice must execute before `atclone` so that the source tree is unpacked before the build script runs. PR #328 moved `extract` earlier in the hook execution order.

## Symptom

Using `extract atclone'./configure ...' make` together fails with:

```
./configure: No such file or directory
```

An `atclone` command that runs `./configure` or another build step fails because the source files are still in an archive (e.g. `tool.tar.gz`) and have not been unpacked yet:

```
atclone"./configure --prefix=$ZPFX"
# Fails: no such file or directory: ./configure
```

because `atclone` runs before `extract` has unpacked the archive.

## Cause

The original hook execution order ran `extract` after `atclone`. When the downloaded file is a tarball that must be extracted before building, the build commands in `atclone` have no source tree to operate on. Fixed by moving `extract` earlier in the ice execution order.

## Fix / Workaround

Update zinit to include PR #328 (`zinit self-update`). The updated execution order is:

```
extract → mv → cp → atclone/atpull → make → (load) → src → atload
```

For older zinit versions, manually extract in `atclone`:

```zsh
zi ice from"gh-r" as"null" \
  atclone"tar -xzf tmux-*.tar.gz && cd tmux-*/ && ./configure --prefix=$ZPFX" \
  atpull"%atclone" \
  make"install"
zi light tmux/tmux
```

With the fix, the cleaner form works:

```zsh
zi ice from"gh-r" as"null" extract"!" \
  atclone"./configure --prefix=$ZPFX" \
  atpull"%atclone" \
  make"install"
zi light tmux/tmux
```

The `extract"!"` ice unpacks and flattens one directory level, making the `./configure` script directly accessible to `atclone`.

## Caveats

The full current order of ice execution is: `atinit` → `atpull!` → `make!!` → `mv` → `cp` → `extract` → `atclone`/`atpull` → `make` → (source) → `src` → `multisrc` → `atload`.
