# HANDOFF — Amin Realty, Inc. Website
*Everything you (or the next developer) need to run, edit, and deploy this site.*

**Repo:** `TirthAmin/Tirth-Amin`, branch `claude/amin-realty-redesign-ju7ti3` (all work is committed and pushed).
**Stack:** plain HTML/CSS/vanilla JS. No build step, no framework, no CDNs, no API keys. Fonts (Fraunces + Archivo) are self-hosted in `assets/fonts/`.

---

## 1. What the site is

| Page | What it does |
|---|---|
| `index.html` | Homepage: animated skyline hero, services, **featured listings with filters**, **interactive US property map**, process, testimonials, team, FAQ, contact form |
| `listings.html` | Full catalog with filter + sort |
| `documents.html` | Secure Document Center — signature-gated downloads with audit log |
| `404.html` | Branded not-found page |
| `legal/*` (5 pages) | Privacy, Terms, Accessibility, TREC IABS + Consumer Protection |

Signature features:
- **Deal Rooms** — listings can gate files behind a mandatory first/last/email form; every access is logged and (when configured) confirmation emails go to you **and** the client.
- **Nationwide Reach map** — custom SVG US map; pins plot automatically from listing coordinates; hover = property card, click = jump to listing.
- **Motion system** — hero entrance, window-by-window skyline lighting, marquee (with accessible pause button), scroll progress, count-ups, smooth FAQ. All disabled for reduced-motion users.

## 2. The ONE file you'll edit 95% of the time

**`assets/listings.js`** controls everything about listings (full field reference is commented at the top of the file):

- Add/remove a **listing**: copy/delete a `{ ... }` block
- Show on homepage: `featured: true`
- Add/remove a **map pin**: add/delete `lat:` + `lng:` (right-click the property in Google Maps to get the numbers)
- Add/remove **Deal Room files**: edit the `dealRoom: [ { label, file } ]` list (upload files to `documents/` first)

Other edit points: `assets/documents.js` (Document Center files), `assets/config.js` (email/logging settings), `documents/` (your PDFs).

## 3. Before going live — the placeholders

Search the project for **`[VERIFY`** and replace: phone number, email confirmation, TREC broker license, IABS names/dates. Also swap the three sample testimonials. Nothing false ships — these are intentionally flagged.

## 4. Hook up the emails (two 5-minute jobs)

1. **Contact form:** create a free form at formspree.io → paste its URL into the `action="...your-form-id"` attribute in `index.html`.
2. **Deal-room / signature logging + confirmation emails:** follow the numbered steps at the top of **`apps-script/email-endpoint.gs`** (free Google Apps Script; logs to a Google Sheet, emails you, emails the client their file links). Then in `assets/config.js` set `logEndpoint` to the `/exec` URL, and set `sendsConfirmationEmail: true` and `requireRemoteLog: true`.

## 5. Deploying

- **GoDaddy cPanel (recommended):** upload everything (incl. the hidden `.htaccess`) into `public_html`, run AutoSSL. Full click-by-click: `DEPLOY.md` §2. The `.htaccess` handles HTTPS redirect, gzip, caching, and the 404 page automatically.
- **WordPress:** use the **`wordpress/`** folder — 8 paste-ready files (one per page) + `START-HERE-WORDPRESS-GUIDE.md` with a step-by-step table. Needs self-hosted WP (or WordPress.com Business+) and an Administrator account.
- **Wix:** `DEPLOY.md` §3 — honest options; pointing the domain at real hosting is strongly preferred over embeds.

## 6. Quality status (last full grading pass)

- **axe accessibility** (WCAG 2.0/2.1/2.2 A+AA + best-practice): **0 violations** on all 9 pages, including with modals/tooltips open
- **html-validate** (stock recommended preset): **0 errors**
- **Lighthouse mobile:** 92 / **100 / 100 / 100** (perf ~97 with gzip on a real host; CLS = 0)
- **Functional suites:** 18/18 site, 22/22 deal room, 12/12 map, 6/6 email endpoint
- **0 unused CSS classes**; single rAF scroll pipeline; fonts subset + preloaded

Full audit history and every fix: **`GRADE.md`**.

## 7. Known limits (by design — don't "fix")

- The homepage keeps its own inline CSS/JS + a listings fallback so it can work as a single-file embed; `assets/listings.js` is still the source of truth.
- Deal Room gating is **lead capture with an audit trail, not security** — file URLs aren't password-protected. Keep truly sensitive documents offline and send manually after checking the log.
- Source is intentionally unminified so a non-developer can edit it; gzip on the host does the compression.
- `documents.html` is deliberately `noindex` (confidential materials).
- Map covers the continental US (Albers projection); AK/HI pins would need a projection change.

## 8. File map

```
.htaccess                 Apache: https redirect, gzip, caching, 404
index.html                homepage (self-contained CSS/JS inline)
listings.html / documents.html / 404.html / legal/
assets/
  listings.js             ← EDIT THIS (listings, pins, deal rooms)
  documents.js            document-center files
  config.js               email/log endpoint settings
  site.css / site.js      shared subpage styles & behavior
  dealroom.js             deal-room modal logic
  map.js                  map pins/tooltip/projection
  fonts/                  Fraunces + Archivo (keep!)
apps-script/email-endpoint.gs   paste into Google Apps Script (emails + sheet log)
wordpress/                paste-ready WordPress kit + guide
documents/                your gated PDFs live here
DEPLOY.md                 hosting instructions (GoDaddy / Wix / WordPress)
GRADE.md                  full audit history
README.md                 feature docs (deal rooms, map, editing)
```

*Questions later? Open GRADE.md for "why is it like this," DEPLOY.md for "how do I ship it," README.md for "how do I change it."*
