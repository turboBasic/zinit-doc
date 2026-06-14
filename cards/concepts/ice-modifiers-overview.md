---
id: ice-modifiers-overview
title: Ice Modifiers Overview
category: concepts
tags: [ice, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [turbo-mode, load-vs-light, completions-management, github-syntax]
---

## Summary

Ice modifiers are per-command options passed to `zinit ice ...` that modify the very next `zinit` command and then dissolve — like ice added to a drink, they melt after a single use.

## Details

The `zinit ice <modifiers>` command stages options that apply to the immediately following `zinit load`, `zinit light`, or `zinit snippet` call. After that call completes, all staged ices are consumed. Ices persist to disk (in a `._zinit` subdirectory inside the plugin's directory) so that update operations can replay them without requiring the user to re-specify them.

Ices are grouped by function:

**Cloning** — control how the repository is cloned: `depth`, `from`, `ver`, `proto`, `cloneopts`, `pullopts`, `svn`, `bpick`.

**File selection** — choose which file to source or expose as a command: `pick`, `src`, `multisrc`.

**Conditional loading** — gate loading on environment state: `if`, `has`, `load`, `unload`, `wait`, `trigger-load`, `subscribe`, `cloneonly`.

**Output control** — manage what is printed during load: `lucid`, `silent`, `notify`.

**Completions** — control completion installation: `blockf`, `completions`, `nocompletions`.

**Command execution hooks** — run arbitrary code at lifecycle points: `atinit`, `atclone`, `atpull`, `atload`, `make`, `configure`, `mv`, `cp`, `reset`, `run-atpull`, `countdown`, `nocd`.

**Shell emulation** — source scripts under a different shell's option set: `sh`, `bash`, `ksh`, `csh` (and their `!`-prefixed variants).

**Miscellaneous** — `as`, `id-as`, `link`, `aliases`, `autoload`, `bindmap`, `compile`, `extract`, `service`, `light-mode`, `nocompile`, `trackbinds`, `wrap-track`, `reset-prompt`, `subst`.

### Order of execution

When multiple hooks are active on the same plugin, they fire in this order:

`atinit` → `atpull!` → `make!!` → `mv` → `cp` → `make!` → `atclone`/`atpull` → `make` → _(plugin script loading)_ → `src` → `multisrc` → `atload`

## Examples

```zsh
# Depth-limited clone (saves bandwidth for large repos)
zinit ice depth"1"
zinit light romkatv/powerlevel10k

# Pick a specific file to source, plus an additional file
zinit ice pick"async.zsh" src"pure.zsh"
zinit light sindresorhus/pure

# Binary from GitHub Releases, renamed on install
zinit ice from"gh-r" as"program" mv"docker* -> docker-compose" bpick"*linux*"
zinit load docker/compose

# Conditional: only load if `git` is in $PATH
zinit ice has"git" wait lucid
zinit load zdharma-continuum/history-search-multi-word

# Build from source with configure + make
zinit ice as"program" atclone"./configure --prefix=$ZPFX" atpull"%atclone" make pick"src/vim"
zinit light vim/vim

# Run atclone command to generate init script, then source it
zinit ice as"program" from"gh-r" \
  atclone"./starship init zsh > init.zsh; ./starship completions zsh > _starship" \
  atpull"%atclone" src"init.zsh"
zinit light starship/starship
```

## Caveats / Common Mistakes

- Ices apply only to the **immediately following** zinit command. Two consecutive `zinit ice` calls overwrite each other — only the last one counts.
- Several ices are plugin-only (`depth`, `from`, `bpick`, `ver`, `proto`, `bindmap`, `trackbinds`, `wrap-track`) and silently have no effect on snippets.
- `svn` and `link` are snippet-only ices and do not apply to plugins.
- `atpull` with a `!` prefix runs **before** `mv`/`cp` and before the git pull; without `!` it runs after.
