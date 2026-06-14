---
id: ts-readurl-parse-error-339
title: za-readurl-preinit-handler parse error and function not found on startup
category: troubleshooting
tags: [annex, troubleshooting, installation, plugin]
source: https://github.com/zdharma-continuum/zinit/issues/339
related: [ts-annex-exclamation-hook-broken-399]
---

## Summary

After updating zinit or the `zinit-annex-readurl` annex, every shell startup emits `za-readurl-preinit-handler: parse error near 'elif'` and multiple `function definition file not found` errors, making it impossible to load snippets or plugins via readurl. The error repeats for every snippet and plugin loaded.

## Symptom

On every shell start (typically after running `zinit update --all`):

```
za-readurl-preinit-handler:179: parse error near `elif'
.zinit-load:25: za-readurl-preinit-handler: function definition file not found
.zinit-load-snippet:63: za-readurl-preinit-handler: function definition file not found
.zinit-load-snippet:63: za-readurl-preinit-handler: function definition file not found
```

The error repeats for every snippet and plugin loaded.

## Cause

The `zinit-annex-readurl` annex was updated with syntax incompatible with the compiled (`.zwc`) version still cached on disk. The stale compiled annex is loaded instead of the updated source, causing a parse error. When the parse fails, the function body is never defined, triggering the "function definition file not found" error for all subsequent calls. This is a bug in the annex code itself.

## Fix / Workaround

Delete the compiled cache for the annex and restart the shell:

```zsh
# Remove compiled annex files
zinit uncompile zdharma-continuum/zinit-annex-readurl

# Or manually remove .zwc files
rm -f ~/.local/share/zinit/plugins/zdharma-continuum---zinit-annex-readurl/**/*.zwc

# Update the annex
zinit update zdharma-continuum/zinit-annex-readurl

# Restart
exec zsh
```

If the annex update is not yet available, temporarily remove the annex from your `.zshrc` until a fixed version is available:

```zsh
# Comment out or remove the readurl annex until fixed:
# zi light zdharma-continuum/zinit-annex-readurl
```

Then restart zsh and restore it once a fixed version is released.

If the annex itself is broken (GitHub-reported parse error), pin to an earlier working commit using `ver`:

```zsh
zinit ice ver"<working-commit>"
zinit light zdharma-continuum/zinit-annex-readurl
```

## Caveats

Always update annexes together with zinit (`zinit self-update` then `zinit update --all`) to keep the interface contracts in sync. Removing `zinit-annex-readurl` disables the `dlink''` and URL-scraping features provided by that annex.
