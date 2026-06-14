---
id: ts-pack-ice-not-working-in-zshrc-149
title: zinit pack ice does nothing when called from .zshrc
category: troubleshooting
tags: [package, ice, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/149
related: []
---

## Summary

`zinit pack'...' for <package>` produces no output and installs nothing when called inside `.zshrc`, even though the exact same command works when run interactively in an existing session.

## Symptom

Running `zinit pack'binary+keys' for fzf` in `.zshrc` results in no output and no installation. The command works correctly when typed directly in the terminal.

## Cause

The `pack` ice depends on `jq` to parse `package.json`. If `jq` is not in `$PATH` at the time `.zshrc` is sourced (e.g. `jq` itself is loaded via Turbo mode and not yet available), the pack operation silently fails. Since `jq` is required and was not checked explicitly, early versions exited silently.

Additionally, the packages monorepo URL was incorrect in early versions of the `zdharma-continuum` fork, causing package lookups to fail silently.

## Fix / Workaround

1. Ensure `jq` is installed and available in `$PATH` before zinit loads:

```zsh
# Check jq is present
command -v jq || echo "jq is required for zinit pack"
```

2. Update zinit (`zinit self-update`) — PR #202 added explicit `jq` availability checking with a loud error instead of a silent exit.

3. If `jq` is managed by zinit itself (Turbo-loaded), load it synchronously first:

```zsh
zinit wait"0" lucid for @pschmitt/jq  # example
# Then pack commands can follow
```

4. Verify the pack ice by running it interactively first to confirm the package name is correct.

## Examples

```zsh
zinit wait"1" lucid if'[[ -z "$commands[fzf]" ]]' pack"bgn-binary+keys" for fzf
```

## Caveats

The `pack` ice requires `jq` since PR #116 replaced the custom JSON parser. This is only needed for pack-based installation; regular plugin/snippet loading does not require `jq`.
