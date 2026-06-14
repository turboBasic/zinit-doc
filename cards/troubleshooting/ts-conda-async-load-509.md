---
id: ts-conda-async-load-509
title: Loading conda initialization asynchronously with turbo mode
category: troubleshooting
tags: [turbo, performance, lazy-loading, snippet]
source: https://github.com/zdharma-continuum/zinit/discussions/509
related: []
---

## Summary
The conda `__conda_setup` block can be wrapped in a snippet file and loaded with `wait` to defer it past the first prompt, reducing perceived startup time.

## Question / Problem
The standard `conda init` block is slow to evaluate and the user wanted to load it asynchronously:

```zsh
__conda_setup="$('/opt/homebrew/Caskroom/miniconda/base/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
...
```

## Answer / Solution
Save the conda init block to a file (e.g. `~/.config/conda-init.zsh`) and load it as a snippet in turbo mode:

```zsh
zinit ice wait lucid
zinit snippet ~/.config/conda-init.zsh
```

Or inline the eval with `atload`:

```zsh
zinit ice id-as"conda" wait lucid nocompile \
    atload'eval "$(/opt/homebrew/Caskloader/miniconda/base/bin/conda shell.zsh hook 2>/dev/null)"'
zinit light zdharma-continuum/null
```

## Caveats
Loading conda asynchronously means it is not available immediately at the first prompt. If your first command after opening a terminal is a conda command (e.g. `conda activate`), it may not be found until the turbo load completes (typically within a fraction of a second). Press Enter once at the prompt to trigger the load if needed.
