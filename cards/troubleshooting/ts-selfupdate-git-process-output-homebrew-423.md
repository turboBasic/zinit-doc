---
id: ts-selfupdate-git-process-output-homebrew-423
title: zinit self-update fails with missing git-process-output.zsh on Homebrew
category: troubleshooting
tags: [troubleshooting, installation, git]
source: https://github.com/zdharma-continuum/zinit/issues/423
related: [ts-self-update-hardcoded-main-751, ts-self-update-master-branch-366]
---

## Summary
On macOS with zinit installed via Homebrew, `zinit self-update` fails because it looks for `git-process-output.zsh` at the wrong path — missing one level of directory nesting.

## Symptom
Running `zinit self-update` produces:

```
fatal: couldn't find remote ref main
.zinit-self-update:zcompile:42: can't open file: /opt/homebrew/opt/zinit/share/git-process-output.zsh
```

The file actually lives at `/opt/homebrew/opt/zinit/share/share/git-process-output.zsh` (extra `share/` prefix introduced by how Homebrew lays out the package).

## Cause
The Homebrew formula installs zinit's `share/` contents one level deeper than zinit's runtime path computation expects. The path concatenation produces `/opt/homebrew/opt/zinit/share/git-process-output.zsh` while the real location is `/opt/homebrew/opt/zinit/share/share/git-process-output.zsh`.

## Fix / Workaround
Install zinit using the manual (non-Homebrew) method to avoid the path mismatch:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
[ ! -d $ZINIT_HOME ] && mkdir -p "$(dirname $ZINIT_HOME)"
[ ! -d $ZINIT_HOME/.git ] && git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
source "${ZINIT_HOME}/zinit.zsh"
```

Alternatively, create a symlink to work around the Homebrew path layout:

```zsh
ln -s /opt/homebrew/opt/zinit/share/share/git-process-output.zsh \
      /opt/homebrew/opt/zinit/share/git-process-output.zsh
```

## Caveats
The symlink workaround is fragile and will need to be recreated after Homebrew upgrades zinit.
