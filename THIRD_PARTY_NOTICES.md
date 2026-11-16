# Third-party components

- @michengai/dsh-codex-ui 2.0.19 — Apache-2.0; https://github.com/MichengAI/dsh-codex-ui ; full license: vendor/codex-ui/LICENSE.
- dsh-conv-progress 0.3.0 — BSD-3-Clause; copyright picklerick422; https://github.com/picklerick422/dsh-conv-progress ; full license: vendor/conv-progress/LICENSE.

Modifications: browser registration IDs are scoped beneath dsh-ui-workbench/client.* for native HMR ownership. The market host reports the built-in UI version and routes that component update to the containing package. Other upstream host/controller logic is retained. Independent vendor client files are compiled into lib/client.js instead of duplicated. Session-title code is retained but not activated, preserving native keyword titles.
