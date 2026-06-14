---
id: ts-install-script-path-doc-to-scripts-45
title: Install script moved from doc/ to scripts/ — old curl URL fails
category: troubleshooting
tags: [installation, troubleshooting, migration]
source: https://github.com/zdharma-continuum/zinit/issues/45
related: []
---

## Summary

The zinit installation script was relocated from `doc/install.sh` to `scripts/install.sh`. Any bookmarked or hardcoded install commands using the old `doc/` path return a 404.

## Symptom

```
curl: (22) The requested URL returned error: 404
```

When running an install command that references the old path:

```zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma-continuum/zinit/master/doc/install.sh)"
```

## Cause

The script was moved to a more semantically correct location (`scripts/`) as part of a repository cleanup.

## Fix / Workaround

Use the current install command that references the new path and the `main` branch:

```zsh
bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

## Caveats

The `HEAD` ref always points to the latest commit on the default branch (`main`), making the URL stable across future branch changes.
