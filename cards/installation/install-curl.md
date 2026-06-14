---
id: install-curl
title: Install Zinit via curl (Automatic)
category: installation
tags: [installation]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [install-manual, install-verify, install-prerequisites, zinit-init]
---

## Summary

The easiest way to install Zinit is a single `curl` one-liner that downloads and runs the official install script, which clones Zinit and patches `.zshrc` automatically.

## Syntax / Usage

```zsh
bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

## Details

The install script:

1. Clones the Zinit repository to `~/.local/share/zinit/zinit.git`.
2. Appends three lines to `~/.zshrc` that source `zinit.zsh` and register its completion.
3. Does not load any plugins — plugin declarations are the user's responsibility.

After the script completes, reload the shell and compile Zinit for faster subsequent loads.

The install location (`~/.local/share/zinit/zinit.git`) respects the XDG base directory convention: if `$XDG_DATA_HOME` is set, the path becomes `$XDG_DATA_HOME/zinit/zinit.git`.

## Examples

```zsh
# Run the installer
bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"

# Reload the shell
exec zsh

# Compile Zinit for faster loads
zinit self-update
```

## Caveats / Common Mistakes

- The script appends to `.zshrc`. If you run it multiple times, you will get duplicate bootstrap lines. Check `.zshrc` and remove duplicates.
- `curl` must be installed. On minimal systems, use the manual install instead.
