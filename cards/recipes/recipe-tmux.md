---
id: recipe-tmux
title: "tmux and tmux-mem-cpu-load"
category: recipes
tags: [recipe, command, installation, binary]
source: https://github.com/zdharma-continuum/zinit/wiki/Recipes-for-popular-programs
related: []
---

## Summary

Builds tmux (terminal multiplexer) and optionally tmux-mem-cpu-load (a CPU/RAM/load monitor for the tmux status bar) from source using Zinit's `configure`/`make`/`cmake` ices.

## Syntax / Usage

### tmux only

```zsh
zinit for \
    configure'--disable-utf8proc' \
    make \
  @tmux/tmux
```

### tmux-mem-cpu-load only

```zsh
zinit for \
    cmake \
  @thewtex/tmux-mem-cpu-load
```

### tmux + tmux-mem-cpu-load (combined)

```zsh
zinit id-as for \
    cmake \
  @thewtex/tmux-mem-cpu-load \
    configure'--disable-utf8proc' make \
  @tmux/tmux
```

## Details

### tmux

- `configure'--disable-utf8proc'` — runs `./configure --prefix=$ZPFX --disable-utf8proc` to build without the utf8proc library (avoids a common build dependency issue).
- `make` — compiles and installs tmux to `$ZPFX`.

### tmux-mem-cpu-load

- `cmake` — runs CMake to configure and build the project (installs to `$ZPFX`).

### Combined recipe

- `id-as` — assigns the repository name as the plugin ID for each plugin in the combined `for` block.
- Both plugins share one `for` statement, ensuring they are installed/updated together.

`$ZPFX/bin` is automatically on `$PATH`, so both binaries are available after installation.

## Examples

```zsh
# tmux only
zinit for \
    configure'--disable-utf8proc' \
    make \
  @tmux/tmux

# tmux-mem-cpu-load only
zinit for \
    cmake \
  @thewtex/tmux-mem-cpu-load

# combined
zinit id-as for \
    cmake \
  @thewtex/tmux-mem-cpu-load \
    configure'--disable-utf8proc' make \
  @tmux/tmux
```
