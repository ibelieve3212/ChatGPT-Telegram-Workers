# Changelog

- Unreleased (this fork)
  - New `/av` command: random picks from the javranking.cc rankings (year/scope/category filters, code or performer lookup, `换一个` re-roll, `帮助`), with spoiler-covered artwork, score, ranking history and synopsis
  - Replying to a message containing a code with `/av` or `.av` now looks up that code directly (a manually selected quote takes priority), with no need to retype it
  - Fix group image messages that only `@bot` being silently treated as textless material: the mention is stripped from the caption, but the image is now still answered
  - ed2k links are no longer bundled: they come from the local index at `AV_LTX_FILE` (same name and format as `jr_av.py`'s `jr_ltx.json`), refreshed manually with `scripts/ltx-pull.mjs`; when unset the card still renders, just without the ed2k section
  - Link previews are off everywhere (fixed in `config/features.ts`): every send path gets `link_preview_options: { is_disabled: true }`, so commands and normal replies behave the same
  - Collapse whole replies in `<blockquote expandable>` (first 3 lines shown; always on, 100-char threshold)
  - Render tables as lists so `<pre>` no longer blocks folding (always on), which also reads better on phones
  - Send fenced code blocks as a separate message replying to the main one, so prose can fold (always on)
  - Inline citations: trailing "references" lists are rewritten to end-of-sentence `[1](url)`; duplicated bare URLs, marker-only lines and leftover "Source:" labels are cleaned up
  - New default system prompt (conclusion first + citation format), synced across four languages
  - Rich message mode is off (fixed): with mixed client versions outdated clients cannot render it and the server still returns 200
  - Long messages are split by rendered HTML length (markdown→HTML inflates size and caused 400s); on HTML parse failure the expandable wrapper is dropped and retried
  - Entity nesting audit inside blockquotes: `<pre>` is never folded, inner quotes are stripped, `<code>`/bold/italic/links work fine
  - Generic structure repair: malformed model markdown (unclosed inline markers, headings with only a number, unclosed code fences) is auto-completed or merged, and rendered output is checked for visible-text fidelity, falling back to plain text when anything is missing
  - Removed the five rendering switches (`RICH_MESSAGE_MODE`, `EXPANDABLE_REPLY`, `TABLE_AS_LIST`, `SPLIT_CODE_BLOCK`, `ENABLE_LINK_PREVIEW`) and `CUSTOM_MESSAGE_RENDER`: behaviour is fixed in `config/features.ts` (55 → 50 config keys); `sender` split into `render`/`context` modules

- v1.10.7
  - Fixed a typo in "Groq"
  - Added support for independent Xai Agents
  
- v1.10.6
  - Add `DeepSeek` and `Groq` independent Agent support

- v1.10.5
  - Add full support for `Telegram MarkdownV2`

- v1.10.0
  - Switching Models with InlineKeyboards

- v1.9.0
  - Add plugin system

- v1.8.0
  - Support Cohere, Anthropic Ai
  - Support image input.
  - Adapt to group topic mode
  - Remove the role function and use custom commands instead.
  - Fix the bug of failure to send super long text.

- v1.7.0
  - Modify the worker AI invocation method to API invocation, requiring the setting of account_id and token. The original AI binding method is invalid.
  - Add support for worker AI text conversation flow mode.
  - Add functionality for worker AI to generate images from text.
  - Add switch AI providers
  - Add custom commands, which allows for quick model switching
  - Add lock user-defined configurations

- v1.6.0
  - Add workers AI support, please refer to the configuration document for specific settings.
  - Optimize the parser for openai stream mode.

- v1.5.0
  - perf: Adjust command order
  - perf: Send loading message before sending request to OpenAI
  - feat: Add support for streaming output. Enabled by default. Use `STREAM_MODE=false` to disable.
  - feat: Add compatibility for multiple keys, randomly select a key to use.
  - feat: Add shortcut buttons `/new`, `/redo`.

- v1.4.0
  - Support deployment on multiple platforms
  - Added `/redo` command to resend or modify the previous question
  - Added multi-language support. Use the `LANGUAGE` environment variable to set the language. Currently supports `zh-CN`, `zh-TW`, and `en`. The default language is `zh-CN`.

- v1.3.1
    - Optimized history trimming logic
    - Optimized token calculation logic
    - Fixed a bug in edit messages.

- v1.3.0
    - Added command `/usage` to show token usage statistics.
    - Added command `/system` to show system information.
    - Added option to show command menu only in specific scopes.
    - Added environment variable `SYSTEM_INIT_MESSAGE`.
    - Added environment variable `CHAT_MODEL`.
    - Added automatic deployment script using `Github Action`.
    - Improved `/init` page to display more error information.
    - Fixed bug with historical record clipping.

- v1.2.0
    - Fixed critical vulnerability, update is mandatory.
    
- v1.1.0
    - Changed from single file to multiple files for easier maintenance, provided "dist" directory for easier copying and pasting.
    - Removed and added some configurations, provided compatibility code for easier upgrading.
    - Modified KV key generation logic, which may cause data loss, manual modification of keys or reconfiguration is required.
    - Fixed some bugs.
    - Automatically bind all commands.
    - BREAKING CHANGE: Major changes, the group ID must be added to the whitelist "CHAT_GROUP_WHITE_LIST" in order to use it. Otherwise, anyone can add your bot to the group and consume your quota.

- v1.0.0
    - Initial version.
