---
id: annex-default-ice
title: "Annex: default-ice"
category: annexes
tags: [annex, ice, turbo]
source: https://github.com/zdharma-continuum/zinit-annex-default-ice
related: []
---

## Summary

default-ice adds a `zinit default-ice` subcommand that sets persistent default ices applied automatically to all subsequent `zinit` invocations, reducing repetition when loading groups of plugins with shared options.

## Details

- **Problem it solves:** When loading multiple plugins that all need the same ices (e.g., `lucid from"gh-r"`), you'd have to repeat those ices on every call. `default-ice` lets you declare them once.

- **New subcommand:** `zinit default-ice` with options:
  - `ice1'value1' ice2'value2' …` — set the given ices as defaults
  - `--show` / `-s` — display the currently active default ices
  - `--clear` / `-c` — reset all default ices
  - `--get` / `-g` — return current ices in the `$Reply` hash
  - `--quiet` / `-q` — suppress output
  - `--stats` / `-t` — show statistics

- **Limitation:** The `wait''` ice cannot be set as a default via this subcommand.

- **Install:**
  ```zsh
  zinit light zdharma-continuum/zinit-annex-default-ice
  ```

## Examples

```zsh
# Set defaults once, then load multiple plugins without repeating ices
zinit default-ice lucid from"gh-r"

zinit wait for \
    sbin        junegunn/fzf-bin \
    sbin"**/pk" peco/peco

# Show what defaults are active
zinit default-ice --show

# Clear defaults when done
zinit default-ice --clear
```

## Caveats / Common Mistakes

- `wait''` cannot be made a default ice — it must be specified per plugin.
- Default ices persist for all subsequent `zinit` calls in the session or until `--clear` is run; clear them explicitly after a batch load to avoid unintended effects.
