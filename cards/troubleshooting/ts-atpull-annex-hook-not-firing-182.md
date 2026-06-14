---
id: ts-atpull-annex-hook-not-firing-182
title: atpull annex hook not running when plugin updates are downloaded
category: troubleshooting
tags: [annex, ice, git, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/issues/182
related: []
---

## Summary

When a plugin is updated and new commits are downloaded, the `atpull` hook registered by an annex (e.g. `zinit-annex-patch-dl`) does not fire. The annex's post-update logic is silently skipped.

## Symptom

After `zinit update`, an annex that patches or post-processes a plugin on update produces no effect. For example, patches from `zinit-annex-patch-dl` are not re-applied after a plugin update.

## Cause

The annex `atpull` hook dispatch was not triggered when new commits were pulled for a plugin. This is distinct from the user-defined `atpull` ice, which does run; the issue is specifically with annex-registered hooks.

## Fix / Workaround

Track the zinit issue for a fix. As a workaround, manually re-trigger the annex hook by running `zinit delete` and re-installing the plugin, or apply patches manually after update.

## See Also

- `ts-atclone-not-rerun-on-update-172.md` — covers the related case where `atclone` output is missing after update (use `atpull"%atclone"` to re-run user-defined `atclone` ice on update).
