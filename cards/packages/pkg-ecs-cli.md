---
id: pkg-ecs-cli
title: "Package: ecs-cli"
category: packages
tags: [package, binary, command, snippet, annex, installation]
source: https://github.com/zdharma-continuum/zinit-packages
related: [pkg-overview]
---

## Summary

Downloads the Amazon ECS CLI binary from the AWS S3 distribution URL for the current OS, copies it to `$ZPFX/bin`, and makes it available as the `ecs-cli` command.

## Syntax / Usage

```zsh
zi pack for ecs-cli
zi pack"bgn" for ecs-cli
```

Available profiles: `default`, `bgn`.

## Details

- Provides: `ecs-cli` binary in `$ZPFX/bin` (default) or as an `sbin` shim (bgn).
- `default` profile ices: `is-snippet`, `as"null"`, `nocompile`, `lucid`, `mv"*ecs-cli* -> ecs-cli"`, `atclone"chmod +x ecs-cli; cp -vf ecs-cli $ZPFX/bin"`, `atpull"%atclone"`. Downloads the platform-appropriate binary from `https://amazon-ecs-cli.s3.amazonaws.com/ecs-cli-${OSTYPE}-amd64-latest`.
- `bgn` profile ices: `is-snippet`, `as"null"`, `nocompile`, `lucid`, `sbin"*ecs-cli* -> ecs-cli"`, `atpull"%atclone"`. Requires the `bin-gem-node` annex.
- The download URL uses `${(M)OSTYPE#(linux|darwin)}` to select the correct binary for Linux or macOS (amd64 only).

## Examples

```zsh
# Direct install to $ZPFX/bin
zi pack for ecs-cli

# bgn shim variant
zi pack"bgn" for ecs-cli
```

## Caveats / Common Mistakes

- Only `amd64` architecture is supported by the download URL; ARM systems are not covered.

## See Also

- [pkg-overview](pkg-overview.md) — how `zi pack` works
