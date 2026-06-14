---
id: trigger-load
title: "trigger-load"
category: ices
tags: [ice, lazy-loading, plugin, snippet]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [wait, load, has]
---

## Summary

`trigger-load''` creates one or more stub functions that, when called, load the
associated plugin or snippet on demand and optionally forward the call to the real
command.

## Syntax / Usage

```zsh
# Create a stub function; prepend ! to forward the call after loading
zi ice trigger-load"!funcname"
zi ice trigger-load"!func1;func2"  # multiple stubs, separated by ;
```

## Details

Each name in the semicolon-separated list becomes a shell function. When that function
is first called, Zinit loads the plugin/snippet. If the name is prefixed with `!`, the
original call is forwarded to a command of the same name after the plugin loads,
enabling transparent lazy loading.

Without `!`, the stub just triggers loading and the original invocation is not
re-dispatched.

Multiple stubs can be defined in one ice by separating them with `;`.

## Examples

```zsh
# Lazy-load nvm: first call to `nvm` triggers the load and runs the real nvm
zi ice trigger-load"!nvm"
zi light lukechilds/zsh-nvm

# Create a trigger that loads a helper plugin silently
zi ice trigger-load"my-helper-fn" lucid
zi light user/helper-plugin
```

## See Also

- wait
- load
