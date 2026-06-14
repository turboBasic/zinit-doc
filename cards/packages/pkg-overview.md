---
id: pkg-overview
title: "Overview"
category: packages
tags: [package, ice, installation, recipe]
source: https://github.com/zdharma-continuum/zinit-packages
related: []
---

## Summary

Zinit packages are pre-authored `package.json` recipes that bundle a set of ices for installing a specific tool. Instead of hand-crafting ices for every binary or plugin, you invoke `zi pack` and let the package apply the correct ices automatically.

## Syntax / Usage

```zsh
zi pack for <package-name>
zi pack"<profile>" for <package-name>
```

The `pack` ice tells zinit to fetch `package.json` from the zinit-packages registry and apply the ices defined in the chosen profile. If no profile is specified, the `default` profile is used.

## Details

- A package is a `package.json` file stored in the zdharma-continuum/zinit-packages repository. The `zsh-data.zinit-ices` object contains one or more named profiles, each mapping ice names to values.
- Profiles let a single package serve different use-cases — for example `default` (builds from source), `bgn` (uses the `bin-gem-node` annex for PATH-free shims), `binary` (downloads a pre-built release), and variants with `+keys` to also source key-bindings.
- The `requires` field in a profile lists annexes or system commands that must be present; zinit will error early if they are missing.
- `param-default` defines the default value for parametric packages (e.g. `any-gem`, `any-node`) that accept a `%GEM%` or `%MOD%` substitution at call time.
- Packages differ from manual ice config in that the recipe is maintained upstream — updating the package (via `zi update`) pulls a revised `package.json` with potentially newer ices, without requiring changes to your `.zshrc`.

## Examples

```zsh
# Install fzf using the default profile (builds from source)
zi pack for junegunn/fzf

# Install fzf using the bgn-binary profile (pre-built, bin-gem-node shim)
zi pack"bgn-binary" for junegunn/fzf

# Install a Ruby gem via the any-gem package
zi pack param'GEM -> colorls' for any-gem
```

## Caveats / Common Mistakes

- The `bgn`-prefixed profiles require the `bin-gem-node` annex to be loaded before use. Load it once at the top of `.zshrc` with `zi light zdharma-continuum/zinit-annex-bin-gem-node`.
- Profiles that build from source (e.g. the `default` profile for `fzf`, `zsh`, `apr`) require system build tools (`go`, `cc`, `make`) listed in the `requires` field. The install will fail silently or with a cryptic error if those tools are absent.
- Do not mix `zi pack` with manual ices for the same plugin — the package ices will be overridden unpredictably.
