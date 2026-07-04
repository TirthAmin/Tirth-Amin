# Design Tools Setup

This project is configured with a full design-engineering toolchain for
Claude Code: **25 MCP servers** in `.mcp.json` and **13 skills** in
`.claude/skills/`. Most servers run via `npx` on demand (Node.js is the
only prerequisite); 21st.dev is a hosted HTTP endpoint. Skills load
automatically when the project is opened in Claude Code.

## MCP servers (`.mcp.json`)

### Ready out of the box (no API key)

| Server | What it does |
|---|---|
| `shadcn` | Official [shadcn/ui](https://ui.shadcn.com) registry — browse, search, and install components |
| `magicui` | [Magic UI](https://magicui.design) — animated React/Tailwind components (marquees, beams, effects) |
| `heroui` | [HeroUI](https://heroui.com) component library docs and usage |
| `mui` | Official [Material UI](https://mui.com) docs server |
| `antd` | [Ant Design](https://ant.design) component docs, props, and examples |
| `chakra` | Official [Chakra UI](https://chakra-ui.com) component server |
| `tailwind` | [Tailwind CSS](https://tailwindcss.com) utilities and docs |
| `flowbite` | [Flowbite](https://flowbite.com) — Tailwind component blocks |
| `iconify` | [Iconify](https://iconify.design) — search 200k+ open-source icons across all major sets |
| `color-palette` | Generate and evaluate color palettes |
| `context7` | [Context7](https://context7.com) — up-to-date, version-specific docs for any framework/library |
| `playwright` | Official [Playwright MCP](https://github.com/microsoft/playwright-mcp) — drive a real browser: navigate, click, screenshot |
| `chrome-devtools` | Official [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) — inspect live pages, console, network, performance traces |
| `lighthouse` | Run [Lighthouse](https://developer.chrome.com/docs/lighthouse) audits — performance, SEO, best practices scores |
| `a11y` | Accessibility audits via [axe-core](https://github.com/dequelabs/axe-core) — WCAG compliance checks |
| `memory` | Persistent knowledge-graph memory across sessions (stored in `.claude/memory.json`, git-ignored) |
| `sequential-thinking` | Structured step-by-step reasoning for complex design/build planning |

### Need an API key / config

| Server | What it does | Required env var |
|---|---|---|
| `stitch` | [Google Stitch](https://stitch.withgoogle.com/docs/mcp/setup/) — pull AI-generated UI designs from Stitch into code | `GOOGLE_CLOUD_PROJECT` (plus one-time `npx @_davideast/stitch-mcp init`) |
| `nano-banana-2` | [Nano Banana 2](https://github.com/daveremy/nano-banana-2-mcp) — Gemini image generation/editing (1K/2K/4K) | `GEMINI_API_KEY` — from [Google AI Studio](https://aistudio.google.com/apikey) |
| `21st` | [21st.dev Magic](https://21st.dev/magic) — generate modern UI components from natural language; hosted endpoint | `API_KEY_21ST` — from [21st.dev console](https://21st.dev/magic/console) |
| `figma` | [Framelink Figma MCP](https://github.com/GLips/Figma-Context-MCP) — read Figma files/frames and implement designs to code | `FIGMA_API_KEY` — personal access token from Figma settings |
| `unsplash` | [Unsplash](https://unsplash.com/developers) — search high-quality stock photography | `UNSPLASH_ACCESS_KEY` |
| `pexels` | [Pexels](https://www.pexels.com/api/) — free stock photos and videos | `PEXELS_API_KEY` |
| `netlify` | Official [Netlify MCP](https://github.com/netlify/netlify-mcp) — deploy and manage this site on Netlify | `NETLIFY_PERSONAL_ACCESS_TOKEN` — from Netlify user settings |
| `firecrawl` | [Firecrawl](https://firecrawl.dev) — crawl/scrape sites for design research and inspiration | `FIRECRAWL_API_KEY` |

Set the env vars in your Claude Code environment settings (claude.ai/code →
environment → Environment variables) or your shell before starting Claude
Code:

```sh
export GOOGLE_CLOUD_PROJECT="your-gcp-project-id"
export GEMINI_API_KEY="your-gemini-key"
export API_KEY_21ST="your-21st-dev-key"
export FIGMA_API_KEY="your-figma-token"
export UNSPLASH_ACCESS_KEY="your-unsplash-key"
export PEXELS_API_KEY="your-pexels-key"
export NETLIFY_PERSONAL_ACCESS_TOKEN="your-netlify-pat"
export FIRECRAWL_API_KEY="your-firecrawl-key"
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
- **canvas-design** — poster/static-art design in .png and .pdf with design
  philosophy
- **web-artifacts-builder** — elaborate multi-component HTML artifacts
  (React, Tailwind, shadcn/ui)

To update: `npx -y ui-ux-pro-max-cli init --ai claude` for the first set;
re-copy from the anthropics/skills repo for the second.
