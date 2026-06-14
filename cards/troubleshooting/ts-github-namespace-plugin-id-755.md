---
id: ts-github-namespace-plugin-id-755
title: "Plugins under the 'github' namespace fail to load"
category: troubleshooting
tags: [plugin, installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/755
related: []
---

## Summary

Trying to install plugins from the `github` GitHub organization (e.g. `github/copilot-cli`) fails with a parser error because zinit interprets `github` as a special keyword rather than an organization name.

## Symptom

```
Error: No plugin or snippet ID given (the last recognized ice was: github/copilot-cli'').
You can try to prepend `@' to the ID if the last ice is in fact a plugin.
```

## Cause

The string `github` conflicts with zinit's internal parsing or subcommand recognition. Zinit does not treat `github/repo` as a plain `user/repo` pair in this case.

## Fix / Workaround

Prepend `@` to the plugin ID to force zinit to treat it as a plugin identifier rather than a subcommand:

```zsh
zinit lucid \
  wait'2' \
  as'command' \
  from'gh-r' \
  bpick"*$(uname | awk '{print tolower($0)}')-$(dpkg --print-architecture | sed 's,amd,x,').tar.*" \
    for \
      @github/copilot-cli
```

## Examples

```zsh
# Force plugin interpretation with @
zinit light @github/some-repo
```
