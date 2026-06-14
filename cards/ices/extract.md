---
id: extract
title: "extract"
category: ices
tags: [ice, binary, annex, plugin]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [from, as, mv, bpick]
---

## Summary

`extract''` unpacks archives (zip, tar.gz, gz, xz, dmg, etc.) found in the plugin or
snippet directory. Without a value it auto-detects archives; with a filename it unpacks
that specific file.

## Syntax / Usage

```zsh
zi ice extract                    # auto-detect and extract archives
zi ice extract"file.tar.gz"       # extract a specific file
zi ice extract"file1.zip file2.tar.gz"  # multiple files

# Prefix modifiers
zi ice extract"!"                 # flatten one directory level after extraction
zi ice extract"!!"                # flatten two directory levels
zi ice extract"-"                 # keep the archive after extraction (do not delete)
zi ice extract"!-"                # flatten one level AND keep archive
zi ice extract"!file.tar.gz"      # extract specific file and flatten one level
```

## Details

Without a filename, Zinit scans the plugin/snippet directory at most one level deep for
files with recognized archive extensions. If none are found, it runs the `file` Unix
command on all files to detect archives without standard extensions.

With a filename, only that specific archive is extracted. Multiple space-separated
filenames are supported.

Prefix modifiers control post-extraction behavior:
- `!` flattens one directory level (e.g. `tool-1.2.3/binary` → `binary`)
- `!!` flattens two levels (e.g. `tool-1.2.3/bin/binary` → `binary`)
- `-` retains the archive instead of deleting it after extraction

Modifiers can be combined: `!-` or `-!`.

Requires the `zinit-annex-unscope` or equivalent annex, or is built into newer Zinit
distributions.

## Examples

```zsh
# Download a release archive and extract the binary (flatten one level)
zi ice from"gh-r" as"program" extract"!"
zi light BurntSushi/ripgrep

# Extract a specific embedded archive and keep the archive file
zi ice extract"!-tool.tar.gz"
zi light user/plugin-with-embedded-archive
```

## See Also

- from
- as
- mv
