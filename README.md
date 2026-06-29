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
index.html          Homepage (hero, about, services, listings, process, team, contact)
404.html            Not-found page
robots.txt          Search crawler rules
sitemap.xml         Sitemap
site.webmanifest    Icon / app metadata
legal/              Privacy, Terms, Accessibility, and TREC notices
DEPLOY.md           How to publish on GoDaddy or Wix (+ the [VERIFY] checklist)
GRADE.md            The accessibility & functional audit and its results
```

## Quick start

1. Open `index.html` in any browser to preview locally (double-click works).
2. Replace every `[VERIFY]` placeholder with real info — see `DEPLOY.md` §0.
3. Edit the `LISTINGS` array in `index.html` to add your real properties.
4. Connect the contact form (`DEPLOY.md` §4).
5. Publish (`DEPLOY.md` §2 for GoDaddy, §3 for Wix).

## Editing listings

Find the `LISTINGS` array near the bottom of `index.html`. Each entry looks like:

```js
{ title:"85-Key Franchise Hotel", type:"Franchise Hotel", location:"Houston, TX",
  status:"Available", price:7900000, priceLabel:"$7,900,000", icon:"hotel",
  specs:[["Keys","85"],["Brand","Flagged"],["Year Built","2016"]] }
```

- `status`: `"Available"`, `"Under Contract"`, or `"Sold"`.
- `type` must match a filter option (`Franchise Hotel`, `Independent Motel`,
  `Land / Development`, `Commercial`).
- `icon`: `hotel`, `motel`, `land`, or `commercial`.
- To show real photos, swap the card's gradient placeholder for an `<img>` with
  descriptive `alt` text (a code comment marks the spot).

## Disclaimer

The sample listings are illustrative. Legal documents are templates and should
be reviewed by an attorney before launch.
