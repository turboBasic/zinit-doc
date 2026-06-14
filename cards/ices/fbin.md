---
id: fbin
title: "Ice: fbin''"
category: ices
tags: [ice, binary, annex]
source: https://github.com/zdharma-continuum/zinit-annex-bin-gem-node
related: [sbin, annex-bin-gem-node, as]
---

## Summary

`fbin''` creates a Zsh wrapper function that forwards calls to a binary via an
embedded path. The function lives only in the current shell session; no files are
written to disk. For a persistent, session-independent alternative use `sbin''`.

## Syntax / Usage

```zsh
fbin'[{g|n|c|N|E|O}:]{path-to-binary}[ -> {name-of-the-function}]'
```

Multiple entries are separated by `;`. The rename `-> name` is optional; without it
the function takes the last path segment of `{path-to-binary}` as its name.

**Flags:**

- `g` – set `$GEM_HOME` to the plugin directory
- `n` – set `$NODE_PATH` to `{plugin-dir}/node_modules`
- `c` – `cd` into the plugin directory before running, then `cd` back afterward
- `N` – redirect both stdout and stderr to `/dev/null`
- `E` – redirect stderr to `/dev/null`
- `O` – redirect stdout to `/dev/null`

## Details

Unlike `sbin''`, `fbin''` does not write anything to `$ZPFX/bin`. The wrapper is a
regular Zsh function defined at plugin-load time. It exists only within the running
shell; a new session or a non-interactive script will not have it unless the plugin is
loaded again.

Because the function is defined in the live session, the binary is available on the
command line without any `$PATH` change and without any persistent file on disk.

**Empty ice:** when `fbin` is given with no value, the annex auto-detects the binary
by checking (in order):

1. trailing component of the `id_as''` ice (e.g. `id_as'exts/git-my'` → `git-my`)
2. the plugin name (e.g. `paulirish/git-open` → `git-open`)
3. trailing component of the snippet URL
4. the alphabetically first executable file in the plugin directory

## Examples

```zsh
# Basic usage — function named after the binary
zinit ice from"gh-r" fbin"fzf"
zinit load junegunn/fzf-bin

# Rename the function and set GEM_HOME
zinit ice from"gh-r" fbin"g:fzf -> myfzf"
zinit load junegunn/fzf-bin

# Inspect the generated function
% which myfzf
myfzf () {
    local bindir="/home/sg/.zinit/plugins/junegunn---fzf-bin"
    local -x GEM_HOME="/home/sg/.zinit/plugins/junegunn---fzf-bin"
    "$bindir"/"fzf" "$@"
}
```

## Caveats / Common Mistakes

- The wrapper function only exists in the current interactive shell session. Scripts
  or other processes launched outside of Zinit will not have it. Use `sbin''` when
  the command must be accessible from scripts or external tools.
- `fbin` and `sbin` are mutually exclusive approaches: use one or the other for a
  given binary, not both.

## See Also

- sbin
- annex-bin-gem-node
- as
