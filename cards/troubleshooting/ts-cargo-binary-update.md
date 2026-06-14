---
id: ts-cargo-binary-update
title: Rust/cargo-installed binaries not updating with 'zi update'
category: troubleshooting
tags: [binary, annex, troubleshooting]
source: https://github.com/zdharma-continuum/zinit/discussions/370
related: [ts-update-hook-not-found-errors]
---

## Summary

When using the `zinit-annex-rust` `cargo` ice to install Rust binaries (fd, ripgrep, bat, etc.), running `zi update` does not reinstall them. You must delete the plugin directory to force a recompile.

## Question / Problem

A user installed fd, ripgrep, and bat via:

```zsh
zinit ice id-as'nullcargo' cargo'fd <- !E:fd-find -> fd;rg <- !E:ripgrep -> rg;!E:bat -> bat'
zinit load zdharma-continuum/null
```

`zi update` updated everything except these cargo binaries. The only fix was manually deleting `.zinit/plugins/nullcargo`.

## Answer / Solution

The `cargo` ice (from `zinit-annex-rust`) installs crates at first load and does not automatically rebuild on `zinit update`. This is by design — cargo manages its own versioning and zinit does not know when a crate needs rebuilding.

To force a rebuild of cargo-installed binaries:

```zsh
zinit delete nullcargo   # removes the plugin directory
exec zsh                 # next shell start re-runs the cargo install
```

Or use `run-atpull` ice to force the cargo re-install on every update:

```zsh
zinit ice id-as'nullcargo' run-atpull \
    cargo'fd <- !E:fd-find -> fd;rg <- !E:ripgrep -> rg;!E:bat -> bat'
zinit load zdharma-continuum/null
```

`run-atpull` makes zinit always execute `atpull` hooks even when there are no new git commits.

## Caveats

`run-atpull` causes cargo to reinstall on every `zi update`, which can be slow. Use it only if you need to always track the latest crate versions.
