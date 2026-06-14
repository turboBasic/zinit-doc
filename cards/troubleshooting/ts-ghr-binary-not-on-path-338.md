---
id: ts-ghr-binary-not-on-path-338
title: gh-r binary downloaded but not accessible on PATH or as a named command
category: troubleshooting
tags: [ice, binary, command, troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/338
related: []
---

## Summary

Using `from"gh-r" as"program"` downloads the binary into the plugin's directory and adds that directory to `$PATH`, but the binary is not symlinked to a central `bin/` directory. Users expecting a single directory in `$PATH` or a named symlink are confused by this behavior.

## Symptom

Binary is downloaded and functional but scattered across many per-plugin directories added to `$PATH`. Running `which rg` shows a path inside `~/.local/share/zinit/plugins/`.

## Cause

By design, `as"program"` adds the plugin's directory to `$PATH`. It does not create a symlink in `$ZPFX/bin`. The annex `zinit-annex-bin-gem-node` provides the `sbin` ice that creates a forwarder script in `$ZPFX/bin`.

## Fix / Workaround

Use the `sbin` ice (from `zinit-annex-bin-gem-node`) to create a forwarder in `$ZPFX/bin` and expose only one directory:

```zsh
# Load the annex first (once in .zshrc)
zinit light zdharma-continuum/zinit-annex-bin-gem-node

# Then use sbin instead of (or in addition to) as"program"
zinit ice from"gh-r" sbin"rg"
zinit light BurntSushi/ripgrep
```

`$ZPFX/bin` (`~/.local/share/zinit/polaris/bin` by default) is automatically added to `$PATH` by zinit.

## Examples

```zsh
# Load multiple tools from gh-r with sbin forwarders
zi as'null' lucid sbin wait'1' for \
  sbin'fzf'        junegunn/fzf \
  sbin'rg'         BurntSushi/ripgrep \
  sbin'bat'        sharkdp/bat
```

## Caveats

`sbin` requires the `zinit-annex-bin-gem-node` annex. Without it, `sbin` is not a recognized ice and will be silently ignored.
