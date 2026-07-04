# Design Tools Setup

This project is configured with a full design-engineering toolchain for
Claude Code: MCP servers in `.mcp.json` and skills in `.claude/skills/`.
Most servers run via `npx` on demand (Node.js is the only prerequisite);
21st.dev is a hosted HTTP endpoint. Skills load automatically when the
project is opened in Claude Code.

## MCP servers (`.mcp.json`)

### Ready out of the box (no API key)

| Server | What it does |
|---|---|
| `shadcn` | Official [shadcn/ui](https://ui.shadcn.com) registry — browse, search, and install components |
| `magicui` | [Magic UI](https://magicui.design) — animated React/Tailwind components (marquees, beams, effects) |
| `heroui` | [HeroUI](https://heroui.com) component library docs and usage |
| `mui` | Official [Material UI](https://mui.com) docs server |
| `iconify` | [Iconify](https://iconify.design) — search 200k+ open-source icons across all major sets |
| `context7` | [Context7](https://context7.com) — up-to-date, version-specific docs for any framework/library |
| `playwright` | Official [Playwright MCP](https://github.com/microsoft/playwright-mcp) — drive a real browser: navigate, click, screenshot |
| `chrome-devtools` | Official [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) — inspect live pages, console, network, performance traces |
| `lighthouse` | Run [Lighthouse](https://developer.chrome.com/docs/lighthouse) audits — performance, SEO, best practices scores |
| `a11y` | Accessibility audits via [axe-core](https://github.com/dequelabs/axe-core) — WCAG compliance checks |

### Need an API key / config

| Server | What it does | Required env var |
|---|---|---|
| `stitch` | [Google Stitch](https://stitch.withgoogle.com/docs/mcp/setup/) — pull AI-generated UI designs from Stitch into code | `GOOGLE_CLOUD_PROJECT` (plus one-time `npx @_davideast/stitch-mcp init`) |
| `nano-banana-2` | [Nano Banana 2](https://github.com/daveremy/nano-banana-2-mcp) — Gemini image generation/editing (1K/2K/4K) | `GEMINI_API_KEY` — from [Google AI Studio](https://aistudio.google.com/apikey) |
| `21st` | [21st.dev Magic](https://21st.dev/magic) — generate modern UI components from natural language; hosted endpoint | `API_KEY_21ST` — from [21st.dev console](https://21st.dev/magic/console) |
| `figma` | [Framelink Figma MCP](https://github.com/GLips/Figma-Context-MCP) — read Figma files/frames and implement designs to code | `FIGMA_API_KEY` — personal access token from Figma settings |

Set the env vars in your Claude Code environment settings (claude.ai/code →
environment → Environment variables) or your shell before starting Claude
Code:

```sh
export GOOGLE_CLOUD_PROJECT="your-gcp-project-id"
export GEMINI_API_KEY="your-gemini-key"
export API_KEY_21ST="your-21st-dev-key"
export FIGMA_API_KEY="your-figma-token"
```

Keys are referenced via `${VAR}` expansion in `.mcp.json`, so no secrets are
committed. Servers whose key is missing simply fail to start; the others are
unaffected.

## Skills (`.claude/skills/`)

### From [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (via `ui-ux-pro-max-cli`)

- **ui-ux-pro-max** — design intelligence: 67 UI styles, 161 color palettes,
  57 font pairings, anti-pattern validation
- **design-system** — three-layer design tokens, component specs
- **design** — logos (55 styles), corporate identity, icons, banners, social
- **brand** — brand voice, visual identity, messaging frameworks
- **banner-design** — social/ad/hero/print banners
- **slides** — strategic HTML presentations with Chart.js
- **ui-styling** — shadcn/ui + Tailwind styling patterns

### From [anthropics/skills](https://github.com/anthropics/skills) (official)

- **frontend-design** — distinctive, intentional visual design direction;
  avoids templated-default aesthetics
- **theme-factory** — 10 preset themes + on-the-fly theme generation for any
  artifact
- **webapp-testing** — Playwright-driven testing of local web apps:
  verify UI behavior, capture screenshots, read browser logs
- **algorithmic-art** — p5.js generative art: flow fields, particle systems,
  seeded randomness

To update: `npx -y ui-ux-pro-max-cli init --ai claude` for the first set;
re-copy from the anthropics/skills repo for the second.
