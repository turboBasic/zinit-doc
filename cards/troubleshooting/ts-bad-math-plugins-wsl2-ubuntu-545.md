---
id: ts-bad-math-plugins-wsl2-ubuntu-545
title: "bad math expression error from zinit plugins command on Ubuntu WSL2"
category: troubleshooting
tags: [command, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/559
related: []
---

## Summary

Running `zinit plugins` (or the `list-plugins` command) on Ubuntu 22.04 / WSL2 produced a "bad math expression" error due to an arithmetic expression that assumed a non-empty value.

## Symptom

```
zinit: bad math expression: operand expected at `'
```

Occurs when running `zinit plugins`, `zinit list-plugins`, or similar commands on Ubuntu 22.04 with WSL2.

## Cause

An arithmetic expression in Zinit's plugin listing code did not guard against empty variables. On Ubuntu 22.04's default Zsh build, certain variables that are expected to be set can be empty, causing the math expression to fail.

## Fix / Workaround

Upgrade Zinit to a version that includes the fix for issue #545/#559, which guards the arithmetic expression against empty operands.

As a temporary workaround, try running the command from a non-interactive context or check if any plugin count variable is unset:

```zsh
# Check if plugin count is sane
echo ${#ZINIT_REGISTERED_PLUGINS[@]}
```

If the count is empty or zero where plugins are expected, try reloading your `.zshrc`:

```zsh
source ~/.zshrc
zinit plugins
```
