---
id: annex-test
title: "Annex: test"
category: annexes
tags: [annex, ice, plugin]
source: https://github.com/zdharma-continuum/zinit-annex-test
related: []
---

## Summary

zinit-annex-test adds a `test` ice that automatically runs `make test` after a plugin is installed or updated, and a `notest` ice to skip testing for individual plugins when tests are enabled globally.

## Details

- **Problem it solves:** Verifying that a plugin passes its own test suite after installation or update requires manual intervention. This annex hooks the test run into the install/update lifecycle automatically.

- **New ices:**
  - `test` — runs `make test` in the plugin directory after install or update
  - `notest` — opt-out ice; skips the test run for the specific plugin even when `test` would otherwise apply

- **Verbosity control:** By default the annex runs quietly. To see test output:
  ```zsh
  zstyle :zinit:annex:test quiet 0
  ```

- **Install:**
  ```zsh
  zinit light zdharma-continuum/zinit-annex-test
  ```

## Examples

```zsh
# Run tests after installing fzf (for syntax)
zinit for load make test junegunn/fzf

# Run tests after installing fzf (ice syntax)
zinit ice make test
zinit load junegunn/fzf

# Enable verbose test output then install
zstyle :zinit:annex:test quiet 0
zinit ice make test
zinit load junegunn/fzf

# Skip tests for a single plugin
zinit for load make notest junegunn/fzf
```

## Caveats / Common Mistakes

- The annex only invokes `make test`; plugins without a `Makefile` or without a `test` target will silently produce no results (or an error if `make` itself is missing).
- The `test` ice is additive — combine it with `make` if the plugin also needs to be built before testing.
