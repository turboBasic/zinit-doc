---
id: ts-ice-value-typo-silent-failure-778
title: "Ice value typos silently accepted and cause unexpected behavior"
category: troubleshooting
tags: [ice, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/778
related: []
---

## Summary

Ice names are validated but ice values are not, so typos like `as'none'` instead of `as'null'` silently fall through to default behavior without any warning.

## Symptom

A plugin loads incorrectly despite what appears to be valid ice syntax. For example, `as'none'` causes the plugin to be sourced normally instead of being treated as a null load.

## Cause

Zinit validates ice names (unknown names produce an error) but did not validate ice values. Invalid values are silently accepted.

Common typos that trigger this:
- `as'none'` instead of `as'null'`
- `%at-clone` in `atpull` instead of `%atclone`
- Invalid `proto` values

## Fix / Workaround

Check ice values carefully against the documented valid options:

- `as` accepts: `null`, `program` (or `command`), `completion`
- `proto` accepts: `git`, `ftp`, `ftps`, `http`, `https`, `rsync`, `ssh`
- `atpull` substitution token is `%atclone` (not `%at-clone`)

Newer Zinit versions (post-#778) emit a warning for invalid ice values so the shell still loads but the mistake is surfaced.
