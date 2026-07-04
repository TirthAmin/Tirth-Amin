# Design Tools Setup

This project is configured with design-focused MCP servers (`.mcp.json`) and
Claude Code skills (`.claude/skills/`). The Stitch and Nano Banana servers run
via `npx` on demand (Node.js is the only prerequisite); 21st.dev is a hosted
HTTP endpoint with nothing to install. Skills load automatically when you
open this project in Claude Code.

## MCP servers (`.mcp.json`)

| Server | What it does | Required env var |
|---|---|---|
| `stitch` | [Google Stitch](https://stitch.withgoogle.com/docs/mcp/setup/) — pull AI-generated UI designs from Stitch into code | `GOOGLE_CLOUD_PROJECT` — your Google Cloud project ID (Stitch API enabled) |
| `nano-banana-2` | [Nano Banana 2](https://github.com/daveremy/nano-banana-2-mcp) — Gemini image generation/editing (1K/2K/4K, aspect ratios) | `GEMINI_API_KEY` — from [Google AI Studio](https://aistudio.google.com/apikey) |
| `21st` | [21st.dev Magic](https://21st.dev/magic) — generate modern UI components from natural language ("v0 in your IDE"); hosted HTTP endpoint at `https://21st.dev/api/mcp` | `API_KEY_21ST` — from [21st.dev console](https://21st.dev/magic/console) |

Set the env vars in your shell (e.g. `~/.bashrc` / `~/.zshrc`) before starting
Claude Code:

```sh
export GOOGLE_CLOUD_PROJECT="your-gcp-project-id"
export GEMINI_API_KEY="your-gemini-key"
export API_KEY_21ST="your-21st-dev-key"
```

Keys are referenced via `${VAR}` expansion in `.mcp.json`, so no secrets are
committed to the repo. Servers whose key is missing simply fail to start;
the others are unaffected.

Google Stitch also needs a one-time auth setup on each machine:

```sh
npx @_davideast/stitch-mcp init
```

## Skills (`.claude/skills/`)

Installed via [`ui-ux-pro-max-cli`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill):

- **ui-ux-pro-max** — design intelligence: 50+ UI styles, 161 color palettes,
  57 font pairings, anti-pattern validation. Trigger with prompts like
  "Build a landing page…" or "Improve the UI of…".
- **design-system**, **design**, **brand**, **banner-design**, **slides** —
  companion skills bundled by the same installer.

To update the skills later: `npx -y ui-ux-pro-max-cli init --ai claude`.
