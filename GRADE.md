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

---

## Round 2 — Award-level design elevation + re-grade (July 2026)

The site was redesigned to a significantly higher visual standard and then
re-graded from scratch with a stricter bar than Round 1.

### What changed (design)

- **Typography**: self-hosted variable fonts — *Fraunces* (display serif) and
  *Archivo* (text/UI) in `assets/fonts/` (~220 KB total, latin subset,
  `font-display: swap`, preloaded). No external CDN calls; GDPR-safe.
- **Signature hero**: a generated skyline of 21 hotel silhouettes with 112
  windows that light up on a staggered schedule, a pulsing rooftop beacon, a
  slow "dawn" gradient, faint stars, and a gold horizon hairline. Subtle
  parallax on scroll; a cursor-following "lantern" glow on fine pointers.
- **Motion system** (all gated behind `html.js` and fully disabled under
  `prefers-reduced-motion`): orchestrated hero entrance (clipped line lifts,
  staggered fade-rise), infinite trust-bar marquee **with an accessible
  pause/play button (WCAG 2.2.2)**, reading-progress hairline in the header,
  scrollspy underline in the nav, count-up stats, drawing process line with
  staggered steps, card top-border sweeps + icon lifts, button sheen sweeps,
  smooth FAQ expand/collapse (Web Animations API on top of native
  `<details>`), listing-media zoom on hover, back-to-top button with a
  scroll-progress ring.
- **No-JS safety**: content is never hidden without JavaScript — all
  animation-hidden initial states apply only under an `html.js` class.

### Round 2 grades

| Check | Result |
|---|---|
| axe-core (WCAG 2.0/2.1/**2.2** A+AA **+ best-practice**), 9 pages, reveals forced visible | **0 violations** |
| html-validate (recommended; only allowance: `--d` CSS custom property carriers on skyline windows) | **0 errors** |
| Lighthouse (mobile, throttled, local server) | **Perf 96 · A11y 100 · Best-practices 100 · SEO 100** |
| Functional/interaction suite | **18/18 pass** |
| JS console errors across all pages | **0** |

### Issues found and fixed in Round 2

1. **Skip link peeked into the viewport** (bottom 2px visible at the top of
   every page) — `top:-48px` did not fully hide it; now `-90px`.
2. **Footer heading order** (`h2 → h4` skip) — footer group headings are now
   `h3` (axe best-practice `heading-order`).
3. **Label-in-name mismatches (WCAG 2.5.3)** — listing CTAs had
   `aria-label="Inquire about …"` on links whose visible text is "Request
   details" (screen-reader users saying "click Request details" would fail);
   now `aria-label="Request details: …"`. Redundant `aria-label` removed from
   the brand links.
4. **ARIA roles replaced with native elements** — hero stats are a real
   `<ul>/<li>`, the marquee and the scrollable NDA agreement box are
   `<section>` elements.
5. **A corrupted `style` attribute** on `legal/consumer-protection.html`
   (nested quotes) found by html-validate's parser — replaced with a class.
6. **All inline styles migrated to utility classes** (26 across the site) and
   all self-closed void elements normalized (77) — passes the strict
   `no-inline-style` / `void-style` rules.
7. **Phone number wrapping** — non-breaking space/hyphen in the tel link.
8. **Font loading** — preload hints for the three above-the-fold font files
   (FCP 2.7 s → 1.5 s on throttled mobile; Lighthouse perf 92 → 96).

### Functional suite (Round 2, all passing)

Hero entrance completes; marquee animates, pauses via button
(`aria-pressed`), and is static with the duplicate list hidden under reduced
motion; skyline windows light; scroll progress + back-to-top ring track
scroll; scrollspy highlights the active section; FAQ opens/closes smoothly by
mouse **and** Enter key; first Tab focuses the skip link; listings filter to
2 cards for "Independent Motel"; mobile nav opens with correct
`aria-expanded`; zero horizontal overflow at 390 px; reduced-motion leaves
every element visible and every animation off (cursor glow removed entirely).

### Remaining Lighthouse notes (server-side, not fixable in static files)

Text compression, cache lifetimes, and document latency are host
configuration (the audit ran against a bare `python3 -m http.server`);
enable gzip/brotli + far-future caching for `assets/` on the production host.
CSS/JS are intentionally left unminified so the owner can edit listings and
copy directly, per `DEPLOY.md`.

### Desktop Lighthouse (subpages)

`listings.html`: **100 / 100 / 100 / 100**. `documents.html`: 100 / 100 / 100
with SEO flagged only for `is-crawlable` — the Document Center is
**deliberately `noindex, follow`** because it gates confidential deal
materials; that flag is policy, not a defect.
