# Self-Audit & Grade — Amin Realty, Inc. Website

This site was graded with an automated, headless-browser audit (Chromium +
[axe-core](https://github.com/dequelabs/axe-core), the engine behind most
accessibility checkers) and a set of functional/interaction tests, then fixed
and re-graded until no further issues remained.

## Final result

| Page | WCAG 2.1 A/AA violations | JS errors |
|---|---|---|
| `index.html` (home) | **0** | 0 |
| `legal/privacy.html` | **0** | 0 |
| `legal/terms.html` | **0** | 0 |
| `legal/accessibility.html` | **0** | 0 |
| `legal/iabs.html` | **0** | 0 |
| `legal/consumer-protection.html` | **0** | 0 |
| `404.html` | **0** | 0 |

Rule sets run: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`.

## Issues found and fixed during grading

1. **Nav "Contact Us" button — failed color contrast (1.85:1).** The button's
   dark text was being overridden by the nav link color (white on gold). Added a
   higher-specificity rule so the button keeps dark navy text → passes.
2. **Footer disclaimer links not distinguishable / low contrast.** Underlined
   them and switched to the gold accent on the dark footer → passes
   "links must be distinguishable" and contrast.
3. **Legal-page links failed contrast (≈4:1 on white, 3.65:1 on cream).**
   Recomputed an accessible gold (`#7e6220`) that clears 4.5:1 on both white and
   the cream note panels, and underlined links → passes.
4. **Legal-page "Skip to content" link failed contrast (white on gold, 2.9:1).**
   Changed to white on navy → passes.
5. **Stray `</p>` tag** in one legal note block → removed.

## Functional checks (all passing)

- Listings render from the data array (6 sample cards).
- Filters work: selecting "Independent Motel" narrows the grid to 2; an
  unmatched search shows the empty state with a contact prompt.
- Exactly one `<h1>` per page; `lang="en"` set; descriptive `<title>`.
- Keyboard: first Tab focuses the "Skip to main content" link.
- Mobile (390px): hamburger menu opens/closes; layout reflows to one column.
- Reduced motion: with `prefers-reduced-motion: reduce`, all content is visible
  immediately and animations are disabled.
- Contact form: invalid input is blocked with a message; with no endpoint
  configured it shows a graceful "email us directly" fallback instead of failing.

## What the automated grade can't cover (do before launch)

- A manual screen-reader pass (VoiceOver / NVDA).
- Real-content review once `[VERIFY]` placeholders and real listing photos are in.
- Attorney review of the legal pages and confirmation of current TREC notice
  wording.
- Re-run Lighthouse/WAVE on the **live** host (GoDaddy or Wix), since platform
  wrappers can introduce their own markup. See `DEPLOY.md` §5.

## How to reproduce the audit

The audit scripts used live outside the repo (in the build scratch space). To
re-audit after edits, run any accessibility engine against the files — e.g.
open each page in Chrome and run **Lighthouse**, or use the **WAVE** browser
extension. Aim to keep every page at **0 violations**.
