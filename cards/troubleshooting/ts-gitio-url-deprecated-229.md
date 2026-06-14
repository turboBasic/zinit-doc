---
id: ts-gitio-url-deprecated-229
title: git.io short URLs in zinit install commands stopped working after April 2022
category: troubleshooting
tags: [installation, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/229
related: []
---

## Summary

GitHub deprecated and removed all `git.io` URL redirects on April 29, 2022. Install commands from older zinit documentation that used `git.io` short URLs now return 404 and fail silently or with an error.

## Symptom

Running a zinit install one-liner copied from older docs or blog posts produces an HTTP 404 error or downloads an empty file, resulting in a broken installation.

## Cause

GitHub's `git.io` URL shortening service was [shut down on April 29, 2022](https://github.blog/changelog/2022-04-25-git-io-deprecation/). All existing redirects were removed at that date.

## Fix / Workaround

Use the full direct URL from the zinit README instead of any `git.io` short URL. The current install command is available at:

```
https://github.com/zdharma-continuum/zinit#install
```

Example current form:

```bash
bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```
