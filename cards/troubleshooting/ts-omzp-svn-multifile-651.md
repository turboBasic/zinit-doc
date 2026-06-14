---
id: ts-omzp-svn-multifile-651
title: "OMZP snippet fails: plugin references sibling files not downloaded"
category: troubleshooting
tags: [snippet, migration, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/651
related: []
---

## Summary
OMZ plugins that source files relative to their own directory (e.g. `gitfast` sourcing `git-prompt.sh`) require `zinit ice svn` to download the entire plugin subdirectory, not just the main plugin file.

## Question / Problem
Loading `OMZP::gitfast` in turbo mode failed with:

```
no such file or directory: /home/wsl/.local/share/zinit/snippets/OMZP::gitfast/git-prompt.sh
```

The snippet directory contained only `OMZP::gitfast` (the plugin file) but not `git-prompt.sh` which is a sibling file in the same OMZ plugin directory.

```zsh
zinit lucid depth=1 for \
  wait \
    OMZP::gitfast
```

## Answer / Solution
Use `svn` ice to check out the entire `gitfast` subdirectory from OMZ via Subversion:

```zsh
zinit ice svn wait lucid depth=1
zinit snippet OMZP::gitfast
```

GitHub supports SVN protocol access, and `svn` ice makes zinit use it to download the entire plugin directory rather than a single file.

## Caveats
`svn` ice requires `svn` (Subversion) to be installed on the system. On macOS it is not installed by default; install with `brew install subversion`. On Debian/Ubuntu: `apt install subversion`.
