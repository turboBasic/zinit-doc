---
id: ts-install-url-old-master-branch-6
title: Installation fails — old install URL or master branch no longer exists
category: troubleshooting
tags: [installation, git, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/issues/6
related: []
---

## Summary

The original install script URL pointed to `zdharma/zinit` (deleted account) or fetched from the `master` branch, which was renamed to `main`. Both cause installation to fail.

## Symptom

```
curl: (22) The requested URL returned error: 404
```

Or the `git clone` step fails because the referenced repository or branch no longer exists.

## Cause

1. The `zdharma` GitHub account was deleted; the project moved to `zdharma-continuum`.
2. The default branch was renamed from `master` to `main`.

Older documentation and bookmarks still reference the defunct URL or branch.

## Fix / Workaround

Use the current install command:

```zsh
bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

For a manual install, clone from the new location:

```zsh
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
mkdir -p "$(dirname "$ZINIT_HOME")"
git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
```

## Caveats

The shortened install URL (`git.io/zinit-install`) that was briefly used is no longer reliable. Always use the full `raw.githubusercontent.com` URL.
