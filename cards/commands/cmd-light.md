---
id: cmd-light
title: "zi light"
category: commands
tags: [command, plugin, installation, performance]
source: https://github.com/zdharma-continuum/zinit/blob/main/README.md
related: [cmd-load, cmd-snippet, cmd-ice]
---

## Summary

Load a plugin without reporting or investigation for maximum performance. Use this for trusted plugins where you do not need Zinit to track their side effects.

## Syntax / Usage

```zsh
zi light [-b] {plg-spec}
```

- `-b` — investigate `bindkey` calls only, even though full investigation is disabled. Equivalent to the `trackbinds` ice modifier.

## Details

`light` clones and sources the plugin the same way `load` does but skips all instrumentation. No report data is collected, so `zi report` and `zi unload` will not work for plugins loaded this way. This makes startup faster, especially for plugins that register many aliases or functions. The `light-mode` ice modifier achieves the same effect when using the `for`-syntax where no explicit `load`/`light` subcommand is written.

## Examples

```zsh
# Fast load without investigation
zi light zsh-users/zsh-autosuggestions
zi light zdharma-continuum/fast-syntax-highlighting

# Track only bindkeys (for remapping with bindmap'')
zi light -b some-user/some-plugin

# Via for-syntax with light-mode ice
zinit for \
    light-mode \
  zsh-users/zsh-autosuggestions \
    light-mode \
  zdharma-continuum/fast-syntax-highlighting
```

## Caveats / Common Mistakes

Because no unload data is collected, `zi unload` will silently do nothing for plugins loaded with `light`. Switch to `zi load` if you need to be able to unload a plugin at runtime.

## See Also

- cmd-load
- cmd-snippet
- cmd-ice
