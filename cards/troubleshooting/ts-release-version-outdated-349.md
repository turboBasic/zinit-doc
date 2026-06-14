---
id: ts-release-version-outdated-349
title: zinit has no recent tagged release — self-update required to get fixes
category: troubleshooting
tags: [troubleshooting, installation]
source: https://github.com/zdharma-continuum/zinit/issues/349
related: [ts-self-update-master-branch-366]
---

## Summary
The last tagged zinit release (`v3.7`) was from December 2020. Hundreds of bug fixes and features since then are only available on the `main` branch. Users on package-manager installs (Homebrew, etc.) may run a very outdated version.

## Symptom
Known bugs (wrong gh-r arch, broken bpick, Ctrl-K conflict, etc.) appear on a "latest" package-manager install because the packaged version is months or years behind the `main` branch.

`zinit version` may show `v3.7.0-0-gabcdef` while `main` is hundreds of commits ahead.

## Cause
The project had no release automation until semantic-release was added (PR #415). The gap between the v3.7 tag and the actual mainline state is large.

## Fix / Workaround
Use the git-clone installation method and update from `main` directly:

```zsh
zinit self-update
```

For Homebrew users, switch to the manual install to get the latest commits:

```zsh
brew uninstall zinit

ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
mkdir -p "$(dirname $ZINIT_HOME)"
git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
```

Add to `.zshrc`:

```zsh
source "${ZINIT_HOME}/zinit.zsh"
```

## Caveats
`zinit self-update` only works with git-clone installs. It does not update Homebrew-managed installs.
