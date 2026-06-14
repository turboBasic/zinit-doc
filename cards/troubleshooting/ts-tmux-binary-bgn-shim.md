---
id: ts-tmux-binary-bgn-shim
title: Installing tmux binary from GitHub releases with a bin-gem-node sbin shim
category: troubleshooting
tags: [binary, annex, ice, installation]
source: https://github.com/zdharma-continuum/zinit/discussions/391
related: [ts-gh-r-binary-install, ts-sbin-shim]
---

## Summary

The tmux GitHub releases page provides source tarballs, not pre-built binaries. Installing tmux from `gh-r` with the for-syntax requires compilation via `./configure` + `make`. The simpler `from"gh-r" as"program" mv"tmux* -> tmux"` approach does not work for tmux because there are no pre-built release binaries.

## Question / Problem

A user had a working `from"gh-r" as"program" mv"tmux* -> tmux"` config and wanted to migrate to the `for`-syntax with `sbin` shims. All combinations with `sbin` failed. The wiki recipe compiles from source and the `ver'latest'` ice also caused errors.

## Answer / Solution

**Why the simple recipe fails:** tmux releases only distribute source tarballs, not compiled binaries. `from"gh-r"` downloads the tarball, but there is no binary to pick.

**Correct recipe — compile from source:**

```zsh
zinit for \
    as'null' \
    atclone'./configure --disable-utf8proc --prefix=$PWD' \
    atpull'%atclone' \
    extract'!' \
    from'gh-r' \
    id-as'tmux' \
    make'PREFIX=$PWD install' \
    nocompile \
    sbin \
  @tmux/tmux
```

Remove `ver'latest'` — it can fail if the latest release tag format changes. Let zinit pick the latest release automatically.

**Why the wiki recipe compiles:** `extract'!'` flattens the source tarball one level, then `./configure` + `make install` builds and installs to `$PWD`. `sbin` without arguments then creates a shim for any executable found.

**Question 1 — why compile?** No advantage over a package manager for tmux. The benefit is a declarative, version-pinnable config that travels with your dotfiles.

**Simplest approach:** Install tmux via your OS package manager (Homebrew, apt) and let zinit manage only shell plugins. This avoids the compile overhead entirely.

If you still want `sbin` for PATH management of other tools:

```zsh
# For binaries that DO have gh-r pre-built releases (not tmux)
zinit for \
    from'gh-r' \
    as'null' \
    sbin'**/nvim -> nvim' \
  neovim/neovim
```

## Caveats

`ver'latest'` is sometimes fragile if the GitHub API returns an unexpected release tag. Omitting it lets zinit resolve the latest release tag automatically.
