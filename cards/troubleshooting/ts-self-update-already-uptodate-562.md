---
id: ts-self-update-already-uptodate-562
title: "zinit self-update always recompiles even when already up to date"
category: troubleshooting
tags: [command, troubleshooting, performance]
source: https://github.com/zdharma-continuum/zinit/issues/562
related: []
---

## Summary

Older versions of `zinit self-update` always proceeded to compile and reload even when git reported "Already up to date", instead of short-circuiting like `brew update` does.

## Symptom

Running `zinit self-update` when Zinit is already on the latest commit still prints compilation and reload messages and takes extra time.

## Cause

The self-update command did not check git's output to detect the "already up to date" case before running `zcompile` and reloading.

## Fix / Workaround

Upgrade to a version that includes the fix for issue #562. After the fix, `zinit self-update` exits early with "Already up-to-date." when no new commits are pulled, matching Homebrew's behavior.

On older versions this is a minor performance annoyance only — compilation is fast and the reload is harmless.
