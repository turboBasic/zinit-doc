---
id: pkg-zsh-static
title: "zsh-static"
category: packages
tags: [package, binary, command, annex, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-zsh]
---

## Summary

Installs a statically-linked, hermetic, relocatable Zsh binary from romkatv/zsh-bin — no system dependencies required, runnable without installing to system paths.

## Syntax / Usage

```zsh
zi pack"bgn" for romkatv/zsh-bin
zi pack for romkatv/zsh-bin
zi pack"rootless" for romkatv/zsh-bin
```

Available profiles: `default`, `bgn`, `rootless`.

## Details

- Provides: a static `zsh` binary (and related `zsh*` tools).
- `default` profile ices: `git`, `depth"1"`, `as"null"`, `nocompile`, `nocompletions`, `lucid`, `atclone"./install -e yes -d /usr/local"`, `atpull"%atclone"`. Installs to `/usr/local` — requires write access or `sudo`.
- `rootless` profile ices: identical but `atclone"./install -e no -d ~/.local"`. Installs to `~/.local` without `sudo`.
- `bgn` profile ices: `from"gh-r"`, `bpick"*.tar.gz"`, `as"null"`, `sbin"bin/zsh*"`, `nocompile`, `nocompletions`, `lucid`, `atclone""`, `atpull"%atclone"`. Downloads the pre-built release tarball and exposes the binary via `sbin` shim. Requires `bin-gem-node` annex, `cp`, `tar`.
- `nocompletions` prevents zinit from running completion installation for this entry.

## Examples

```zsh
# Download release binary, bgn shim (no install script)
zi pack"bgn" for romkatv/zsh-bin

# Clone and install to ~/.local (no sudo)
zi pack"rootless" for romkatv/zsh-bin
```

## Caveats / Common Mistakes

- The `default` and `rootless` profiles run the `./install` script which may require `sudo` or write permissions to the target directory.
- The `bgn` profile requires the `bin-gem-node` annex.

## See Also

- [pkg-zsh](pkg-zsh.md) — build Zsh from source instead of using a static binary
- [pkg-overview](pkg-overview.md) — how `zi pack` works
