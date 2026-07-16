# Amin Realty, Inc. — Website

A redesigned, accessible, animated website for **Amin Realty, Inc.** ("Future
Investments") — a national commercial real estate brokerage specializing in
hotel and motel transactions since 2012.

## Highlights

- **Modern, professional design** — navy-and-gold palette, serif/sans pairing,
  tasteful scroll animations, animated stat counters, and hover effects.
- **HVS-style listings section** — a filterable grid of property cards
  (filter by type, status, price, and keyword) with status badges, pricing,
  specs, and inquiry CTAs. Listings are data-driven: edit one array in
  `index.html` to manage them.
- **Accessibility-first (WCAG 2.1 AA / ADA-aligned)** — semantic landmarks,
  skip link, keyboard support with visible focus, AA color contrast, labelled
  forms, and full `prefers-reduced-motion` support. Audited to **0 violations**
  on every page (see `GRADE.md`).
- **Legal & compliance built in** — Privacy Policy, Terms of Use, Accessibility
  Statement, Equal Housing Opportunity notice, and the two Texas-required TREC
  notices (Information About Brokerage Services + Consumer Protection Notice).
- **Portable to GoDaddy and Wix** — self-contained HTML with no build step and
  no external dependencies. See `DEPLOY.md`.

## Project structure

```
index.html          Homepage (hero, about, services, featured listings,
                    process, testimonials, team, FAQ, contact)
listings.html       Full property catalog (filter + sort)
listing.html        Per-listing detail page (one template, driven by ?id=)
documents.html      Secure Document Center (signature-gated downloads)
404.html            Not-found page
robots.txt          Search crawler rules
sitemap.xml         Sitemap
site.webmanifest    Icon / app metadata
assets/
  listings.js       ← EDIT to add/remove LISTINGS (one place, used everywhere)
  documents.js      ← EDIT to add/remove downloadable DOCUMENTS
  config.js         ← SET your signature-log endpoint & options here
  site.css          shared styles for listings/documents pages
  site.js           shared behavior (rendering, filters, NDA modal, logging)
documents/          put your actual downloadable files here
legal/              Privacy, Terms, Accessibility, and TREC notices
DEPLOY.md           How to publish on GoDaddy or Wix (+ the [VERIFY] checklist)
GRADE.md            The accessibility & functional audit and its results
```

## Quick start

1. Open `index.html` in any browser to preview locally (double-click works).
2. Replace every `[VERIFY]` placeholder with real info — see `DEPLOY.md` §0.
3. Edit **`assets/listings.js`** to add your real properties (this one file
   drives the homepage, the catalog, and every listing detail page).
4. Connect the contact form (`DEPLOY.md` §4).
5. Publish (`DEPLOY.md` §2 for GoDaddy, §3 for Wix).

## Managing listings (add / remove)

Edit **`assets/listings.js`** — one file powers the full Listings page, the
homepage "Featured Listings" (the entries marked `featured: true`), **and each
listing's own detail page**. To add a listing, copy a block and edit it; to
remove one, delete its block. Full field docs are at the top of that file.

## Per-listing detail pages

Every listing automatically gets its own page at
**`listing.html?id=<slug>`** — no extra files to create. The homepage cards
and the full catalog both link to it, and each detail page shows the property's
photo/icon, price, status, specs, a description, an optional deal room, and a
few "similar opportunities."

Two optional fields on each listing control the page:

- **`id`** — a short, URL-friendly name used in the page's web address, e.g.
  `id:"houston-85-key"` → `listing.html?id=houston-85-key`. If you leave it
  out, the slug is generated from the title. Setting an explicit `id` keeps the
  link stable even if you later reword the title (good for bookmarks/SEO).
- **`description`** — the write-up on the detail page. Use one string, or an
  array of strings for multiple paragraphs. Omit it and the page shows a
  sensible default line.

If a visitor opens a `listing.html?id=…` that doesn't exist (e.g. a sold
listing you removed), the page shows a friendly "we couldn't find that listing"
message with links back to the catalog and contact form — it never looks broken.

> Optional: the detail-page URLs are also listed in `sitemap.xml` for search
> engines. If you add or remove listings and want the sitemap to stay exact,
> update that list to match. It won't break anything if you don't.

> The homepage also keeps a built-in fallback copy of a few listings so it still
> works if `assets/listings.js` isn't loaded (e.g. inside a single-file Wix
> embed). On normal hosting, `assets/listings.js` is the single source of truth.

## Managing downloadable documents (the Secure Document Center)

1. Put the file in the **`documents/`** folder.
2. Add an entry in **`assets/documents.js`** (title, description, category,
   file path, size).

Every file is gated: a visitor must enter their name, email, and a typed
signature, and check "I agree to keep this confidential," before the download
unlocks. **Every signature is logged.** To get a durable, central record you can
actually access, open **`assets/config.js`** and set `logEndpoint` to a form
endpoint (Formspree, Web3Forms, or a Google Apps Script that writes to a Sheet).
A local backup of signatures is also kept in the browser and can be exported to
CSV by visiting `documents.html#audit`.

> **Two honest caveats** (also shown to visitors): (1) a typed-name click-wrap is
> a common, generally enforceable e-signature under the U.S. ESIGN Act/UETA, but
> for highly sensitive deals use an attorney-drafted NDA or a service like
> DocuSign; (2) on plain static hosting, files in `documents/` are technically
> reachable by direct URL — the gate creates the signed, logged record and deters
> casual access, but to *hard-lock* files you need a small server step (see
> `DEPLOY.md`).

## Editing the homepage's fallback listings

Find the `FALLBACK_LISTINGS` array near the bottom of `index.html`. Each entry looks like:

```js
{ title:"85-Key Franchise Hotel", type:"Franchise Hotel", location:"Houston, TX",
  status:"Available", price:7900000, priceLabel:"$7,900,000", icon:"hotel",
  specs:[["Keys","85"],["Brand","Flagged"],["Year Built","2016"]] }
```

- `status`: `"Available"`, `"Under Contract"`, or `"Sold"`.
- `type` must match a filter option (`Franchise Hotel`, `Independent Motel`,
  `Land / Development`, `Commercial`).
- `icon`: `hotel`, `motel`, `land`, or `commercial`.
- To show a real photo, add `image:"https://.../photo.jpg"` to a listing — the
  card renders the photo (with auto-generated alt text) instead of the icon
  placeholder. No `image` = the branded gradient + icon.

## Other sections you can personalize

- **Testimonials** — replace the three sample quotes (marked "Sample Client")
  with your own approved client quotes and names.
- **FAQ** — an accessible accordion built on native `<details>`; edit the
  questions/answers directly in the markup.

## Disclaimer

The sample listings are illustrative. Legal documents are templates and should
be reviewed by an attorney before launch.

## Deal Rooms (gated files per listing)

Any listing in `assets/listings.js` can have a **Deal Room** — a set of files
(PDFs, Excel, photos, zips, anything) that visitors unlock by entering their
first name, last name, and email. Each access is recorded exactly like the
Document Center signatures (locally, and to `logEndpoint` in
`assets/config.js` when configured — you'll get an email/sheet row per access
with the person's name, email, listing, and timestamp).

To add files to a listing:

1. Upload the files to the `documents/` folder (or host them anywhere and use
   the full `https://` URL).
2. In `assets/listings.js`, add a `dealRoom` array to that listing:

```js
dealRoom: [
  { label: "Offering Memorandum (PDF)", file: "documents/my-om.pdf" },
  { label: "T-12 Financials (Excel)",   file: "documents/my-t12.xlsx" }
]
```

The "View Deal Room" button appears automatically on that listing's card on
both the homepage and the Listings page. Remove the array to remove the
button. Entering first name, last name, and a valid email is **mandatory** —
the file links do not render until the form passes validation (and, if you
set `requireRemoteLog: true`, until the access is successfully logged).

### Confirmation emails (to you AND the client)

Use the included Google Apps Script endpoint — `apps-script/email-endpoint.gs`
(free, ~5 minutes, full instructions in the file). On every deal-room access
it: logs a row to your Google Sheet, emails you a notification, and emails
the client a confirmation containing their file links. Then in
`assets/config.js` set:

```js
logEndpoint: "https://script.google.com/macros/s/.../exec",
sendsConfirmationEmail: true,   // shows "a confirmation email has been sent"
requireRemoteLog: true          // no log = no files (recommended)
```

Formspree/Web3Forms also work as `logEndpoint` but only notify you; leave
`sendsConfirmationEmail: false` with those so the site never claims an email
the client won't get.

Note: this is lead capture with an access log, not real security —
keep truly sensitive files offline and send them manually after reviewing
the log.

## Interactive property map ("Nationwide Reach")

The homepage plots every listing that has coordinates on a custom-designed US
map — gold pins with radar pings, hover/focus dossier cards, a live
coordinates readout, and click-to-jump-to-the-listing. It reads straight from
`assets/listings.js`:

- **Add a point:** give the listing `lat` and `lng` (right-click the property
  in Google Maps and copy the two numbers), e.g. `lat:29.7604, lng:-95.3698`.
- **Remove a point:** delete the `lat`/`lng` fields (or the listing).

No map provider, no API key, no tracking — the map is a self-contained SVG in
the site's own design language, fully keyboard-accessible, and honors reduced
motion. Overlapping pins in dense markets spread apart automatically.
