---
id: ts-readurl-annex-parse-error-339
title: zinit-annex-readurl parse error floods terminal after update
category: troubleshooting
tags: [annex, troubleshooting, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/339
related: [ts-annex-exclamation-hook-broken-399]
---

## Summary
After updating zinit or its annexes, every new terminal session floods with repeated errors about `za-readurl-preinit-handler` having a parse error and the function definition file not being found.

## Symptom
On every shell start:

```
za-readurl-preinit-handler:179: parse error near `elif'
.zinit-load:25: za-readurl-preinit-handler: function definition file not found
.zinit-load-snippet:63: za-readurl-preinit-handler: function definition file not found
```

The error repeats for every snippet and plugin loaded. Started after running `zinit update --all`.

## Cause
The `zinit-annex-readurl` annex's pre-init handler function contains a syntax error (parse error near `elif`) that prevents it from loading. When zinit tries to call the hook for each plugin/snippet load, it fails to find the now-broken function. This is a bug in the annex code itself.

## Fix / Workaround
Update the `zinit-annex-readurl` annex specifically:

```zsh
zinit update zdharma-continuum/zinit-annex-readurl
```

If the annex update is not yet available, temporarily remove the annex from your `.zshrc`:

```zsh
# Comment out or remove the readurl annex until fixed:
# zi light zdharma-continuum/zinit-annex-readurl
```

Then restart zsh and restore it once a fixed version is available.

## Caveats
Removing `zinit-annex-readurl` disables the `dlink''` and URL-scraping features provided by that annex.
