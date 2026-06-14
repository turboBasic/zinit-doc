---
id: ts-self-update-requires-github-auth-59
title: zinit update or self-update unexpectedly requires GitHub credentials
category: troubleshooting
tags: [installation, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/59
related: []
---

## Summary

After certain commits, `zinit update` and `zinit self-update` started prompting for GitHub credentials even for public repositories, which was not required in earlier versions.

## Symptom

Running `zinit update` or `zinit self-update` displays a credential prompt or fails with a 401/403 error from GitHub.

## Cause

A change in zinit's update logic switched from a plain `git pull` to operations that triggered GitHub API calls (e.g., checking the latest release version). The GitHub API rate-limits unauthenticated requests and may prompt for credentials in some git configurations.

## Fix / Workaround

For plain plugin and zinit updates via `git pull`, credentials should not be required. If they are, check whether `git` is configured to use a credential helper that intercepts HTTPS requests:

```zsh
git config --global credential.helper
```

To avoid credential prompts for zinit's own repository, ensure the remote uses HTTPS (not a broken SSH URL):

```zsh
git -C "${ZINIT[BIN_DIR]:-${HOME}/.local/share/zinit/zinit.git}" remote -v
```

If the `gh-r` annex or GitHub API calls are triggering rate limits, set a GitHub token:

```zsh
export GITHUB_API_TOKEN=<your-token>
```

## Caveats

Public repos accessed via HTTPS never require a password for read-only `git` operations. Credential prompts almost always indicate a misconfigured credential helper or an SSH remote that lacks a key.
