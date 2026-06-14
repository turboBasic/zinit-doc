---
id: pkg-zsh
title: "zsh"
category: packages
tags: [package, binary, command, git, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview, pkg-zsh-static]
---

## Summary

Clones the zsh-users/zsh repository and compiles Zsh from source, installing it to `$ZPFX` and optionally replacing `/bin/zsh` — useful for running a specific or newer version of Zsh alongside the system-installed one.

## Syntax / Usage

```zsh
zi pack for zsh-users/zsh
zi pack"<version>" for zsh-users/zsh
zi pack"<version>-tcsetpgrp" for zsh-users/zsh
```

Available profiles: `default` (latest HEAD), `5.1.1`, `5.2.4`, `5.3.1`, `5.4.2`, `5.5.1`, `5.6.2`, `5.7.1`, `5.8`, `5.9` — each also with a `-tcsetpgrp` variant.

## Details

- Provides: `zsh` binary compiled and installed to `$ZPFX`; optionally copies it to `/bin/zsh` (backing up the original as `/bin/zsh.bkp`) if `sudo` is available.
- All profiles share the same base ices: `git`, `as"null"`, `nocompile`, `nocompletions`, `lucid`, `countdown`, `id-as"zsh-users/zsh"`, `atpull"%atclone"`.
- `default` profile: clones the current HEAD and runs `./.preconfig` then `./configure --prefix=$ZPFX && make install` (falls back to `make install.bin install.fns install.modules` if `yodl` is missing for man pages).
- Versioned profiles (e.g. `5.9`): run `git checkout --quiet zsh-5.9` before the configure/make step.
- `-tcsetpgrp` variants add `--with-tcsetpgrp` to the `./configure` invocation for systems that need explicit `tcsetpgrp` support.
- Requires: `cc`, `make`, `cp`, `rm`.

## Examples

```zsh
# Build latest Zsh from source
zi pack for zsh-users/zsh

# Build a specific version
zi pack"5.9" for zsh-users/zsh

# Build 5.8 with tcsetpgrp support
zi pack"5.8-tcsetpgrp" for zsh-users/zsh
```

## Caveats / Common Mistakes

- The `countdown` ice causes a visible countdown before the build starts — this is intentional to give the user a chance to cancel.
- If `yodl` is not installed, man pages are skipped; the build proceeds with a warning.
- The package attempts to replace `/bin/zsh` via `sudo cp` only if `sudo` is available and `/bin/zsh` exists — no error is raised if it cannot.
- Build time can be several minutes; not suitable for lazy-loading or turbo mode.

## See Also

- [pkg-zsh-static](pkg-zsh-static.md) — hermetic static Zsh binary (no build required)
- [pkg-overview](pkg-overview.md) — how `zi pack` works
