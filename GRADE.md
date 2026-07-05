# Self-Audit & Grade — Amin Realty, Inc. Website

## Grading round 2 — blue/white palette conversion (2026-07-05)

The site was converted from navy/gold to a **powerful blue and white** color
system (`--blue-950…700` + `--accent` blues, white/blue-tint surfaces), then
fully re-graded. Every candidate color pairing was verified mathematically
against WCAG before it shipped (contrast script in the build scratch space).

**Results after conversion (all 9 pages):**

- axe-core WCAG 2.1 A/AA (with `.reveal` elements forced visible and
  transitions disabled so nothing is skipped): **0 violations, 0 JS errors**.
- `html-validate` correctness rules: **0 errors** (a phone number was fixed to
  use `&nbsp;`/`&#8209;` so it can't wrap mid-number).
- Functional suite (9 checks): mobile menu open/close, skip-link is first tab
  stop, contact-form invalid-submit blocking, listings filter narrowing
  (12 → 3) and empty state, NDA modal focus management + Esc close, and
  reduced-motion showing all content immediately — **all passing**.

**Contrast fixes made during round 2:**

1. Primary button hover previously darkened (gold-dark); dark-on-`#2f7fe0` is
   only 4.21:1. Hover now goes **lighter** (`--accent-light: #8fc2ff`,
   ≥ 8:1 with dark text) — the idiomatic direction for blue-on-dark UIs.
2. The brand tagline (10.5px, over the translucent sticky header) measured
   3.88:1 with `--accent`; it and the nav hover color now use
   `--accent-light` (≥ 5:1 over the worst-case blended header background).

**Efficiency grade (round 2):**

- Homepage: one self-contained file, **~18.5 KB gzipped**, zero external
  fonts/CDNs/frameworks; only outbound references are the form endpoint and
  required TREC regulatory links.
- Dead CSS removed: `.cols-2`, `.cols-4`, `.spacer` (homepage),
  `.visually-hidden`, `.btn-ghost` (site.css) — verified unused by a
  class-usage scan that also covers classes generated in JavaScript
  (`status-*` classes are dynamic and were kept).
- No further removals possible without changing behavior — grading stopped
  because nothing actionable remains, not because checks were skipped.

---

## Grading round 1 (original build)

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
| `listings.html` | **0** | 0 |
| `documents.html` (incl. modal open) | **0** | 0 |

Rule sets run: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`.

**Audit methodology note:** scroll-revealed elements start at `opacity:0`, and
accessibility engines skip invisible elements. To avoid blind spots, the final
audit pass **forces every `.reveal` element visible first**, then runs axe — so
contrast is checked on all content, not just what happens to be on screen. This
caught and fixed several gold-on-light text elements (`.eyebrow`, `.team-role`,
the document "confidential" labels, and a couple of inline links) that were
~2.9:1; they now use an accessible gold (`#7e6220`, ≥4.5:1 on white and cream).

**HTML structure** was also validated with `html-validate` (recommended ruleset).
All real findings were fixed — every page now passes with **0 errors**:

- Added missing `type="button"` to the menu and back-to-top buttons.
- Converted the listings filter from a `<form>` (which implies a submit) to a
  `role="search"` container, since filtering applies live via JavaScript.
- Gave the IABS contact table a `<tbody>`, a caption, and `scope="row"` on every
  header cell (WCAG H63) so screen readers announce row headers correctly.

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

> Re-audited after adding the Testimonials section, the FAQ accordion, and
> optional listing-photo support — still **0 violations on every page**.

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
- FAQ accordion: keyboard-operable (Enter/Space toggle) via native `<details>`.
- Listing photos: when a listing has an `image`, it renders with descriptive,
  auto-generated alt text; otherwise a decorative icon placeholder is used.
- Contact form: an accessible honeypot field (`_gotcha`, hidden from people and
  assistive tech) blocks bot spam; legitimate submissions are unaffected.
- Listings page: renders 12 sample listings from `assets/listings.js`; filters
  (type/status/price/keyword) and sorting (price asc/desc, name) all verified.
- Document Center NDA modal: verified end-to-end — empty submit is blocked with
  a clear message; a completed signature unlocks the download; the signature is
  recorded (name, email, company, typed signature, agreement version, timestamp)
  to localStorage and POSTed to the configured endpoint; Esc closes the dialog;
  focus moves into the dialog on open and returns to the trigger on close; the
  closed dialog uses `inert` so its fields are not focusable; the `#audit` panel
  lists records and exports CSV.

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
