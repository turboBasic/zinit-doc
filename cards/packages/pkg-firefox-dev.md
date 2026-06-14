---
id: pkg-firefox-dev
title: "Package: firefox-dev"
category: packages
tags: [package, binary, command, snippet, annex, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview]
---

## Summary

Downloads Firefox Developer Edition from Mozilla's distribution server for the current OS, extracts the archive, and makes the `firefox` binary available.

## Syntax / Usage

```zsh
zi pack for firefox-dev
zi pack"bgn" for firefox-dev
```

Available profiles: `default`, `bgn`.

## Details

- Provides: the `firefox` (or `firefox-bin`) executable, accessible via `pick` (default) or `sbin` shim (bgn).
- `default` profile ices: `is-snippet`, `as"command"`, `nocompile`, `lucid`, `pick"**/firefox(|-bin)(|.exe)"`, `mv"%ID% -> ff.pkg"`, `atclone` (uses `ziextract` with platform-appropriate format: `tar.bz2` on Linux, `dmg` on macOS, `exe` on Windows), `atpull"%atclone"`.
- `bgn` profile ices: `is-snippet`, `as"null"`, `nocompile`, `lucid`, `sbin"**/firefox(.exe|-bin) -> firefox"`, same `mv`/`atclone`/`atpull`. Requires the `bin-gem-node` annex.
- The download URL is constructed dynamically using `$OSTYPE` to select `linux64`, `osx`, or Windows variants, with `lang=en-US`.
- `ziextract --norm` is used on Linux to normalize the extracted directory structure; on macOS the `.dmg` is handled without `--move`.

## Examples

```zsh
# Install Firefox Developer Edition, accessible as a command
zi pack for firefox-dev

# bgn shim variant
zi pack"bgn" for firefox-dev
```

## Caveats / Common Mistakes

- On macOS, the `.dmg` extraction requires `ziextract` from `zdharma-continuum/zinit-annex-bin-gem-node` or a compatible annex.
- The binary is downloaded for the current OS at install time; switching OS requires reinstalling.

## See Also

- [pkg-overview](pkg-overview.md) — how `zi pack` works
