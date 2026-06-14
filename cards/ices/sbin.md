---
id: sbin
title: "Ice: sbin''"
category: ices
tags: [ice, binary, annex]
source: https://github.com/zdharma-continuum/zinit-annex-bin-gem-node
related: [fbin, annex-bin-gem-node, as, "null"]
---

## Summary

`sbin''` creates a forwarder script (shim) in `$ZPFX/bin` that calls the actual
binary via an embedded path. The plugin directory never needs to be added to `$PATH`.
This is the recommended approach for exposing binaries from plugins or GitHub Releases.

## Syntax / Usage

```zsh
sbin'[{g|n|c|N|E|O}:]{path-to-binary}[ -> {name-of-the-script}]'
```

Multiple entries are separated by `;`. The rename `-> name` is optional; without it
the script takes the last path segment of `{path-to-binary}` as its name.

Prefix the whole ice value with `!` to generate a shim with `#!/usr/bin/env -S zsh -fd`
(no-RCS mode) instead of the default `#!/usr/bin/env zsh`. This skips `.zshrc` /
`.zshenv` on every invocation and reduces startup time by 100–200 ms.

**Flags:**

- `g` – set `$GEM_HOME` to the plugin directory
- `n` – set `$NODE_PATH` to `{plugin-dir}/node_modules`
- `c` – `cd` into the plugin directory before running, then `cd` back afterward
- `N` – redirect both stdout and stderr to `/dev/null`
- `E` – redirect stderr to `/dev/null`
- `O` – redirect stdout to `/dev/null`

## Details

The shim is a small Zsh script placed in `$ZPFX/bin` (default:
`~/.zinit/polaris/bin`), which Zinit already adds to `$PATH` at startup. Because only
`$ZPFX/bin` is in `$PATH` — not each plugin's own directory — `$PATH` stays clean
regardless of how many plugins expose binaries.

The generated shim wraps the binary in a function and then calls it, forwarding all
arguments via `"$@"`.

**Empty ice:** when `sbin` is given with no value, the annex auto-detects the binary
to shim by checking (in order):

1. trailing component of the `id_as''` ice (e.g. `id_as'exts/git-my'` → `git-my`)
2. the plugin name (e.g. `paulirish/git-open` → `git-open`)
3. trailing component of the snippet URL
4. the alphabetically first executable file in the plugin directory

**Cygwin:** on Cygwin, an additional `.cmd` Windows batch script is created alongside
the standard shim, enabling the command to be launched from the Windows Run dialog or
any process that searches the Windows `PATH`.

## Examples

```zsh
# Expose fzf from GitHub Releases without touching $PATH
zinit ice from"gh-r" sbin"fzf"
zinit load junegunn/fzf-bin

# Rename the shim
zinit ice from"gh-r" sbin"fzf -> myfzf"
zinit load junegunn/fzf-bin

# Use ! prefix to skip RC files (faster startup)
zinit ice from"gh-r" sbin"!fzf"
zinit load junegunn/fzf-bin

# Multiple binaries in one ice
zinit ice as'null' sbin'bin/git-open;bin/git-recent'
zinit load paulirish/git-open

# Combine with as'null' when nothing should be sourced
zi as'null' lucid sbin wait'1' for \
  Fakerr/git-recall \
  tj/git-extras
```

## Caveats / Common Mistakes

- `!` (no-RCS mode) skips `.zshrc` and `.zshenv`. Do not use it if the binary relies
  on variables or functions defined there.
- For simple binaries with no subprocess or plugin-directory dependencies, the
  `lbin''` ice from `zinit-annex-binary-symlink` creates a direct symlink instead of
  a shim and may be preferable.
- `sbin` and `fbin` are mutually exclusive approaches: `sbin` produces a persistent
  script file; `fbin` produces a shell function that only exists in the live session.

## See Also

- fbin
- annex-bin-gem-node
- as
- null
