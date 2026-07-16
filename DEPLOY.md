# Deployment Guide — Amin Realty, Inc. Website

This website is built as **plain, self-contained HTML files**. There is no build
step, no framework, and no external dependencies (fonts, scripts, and icons are
all inlined). That makes it portable to almost any host — including **GoDaddy**
and **Wix**, your two hosting options.

---

## 0. Before you launch — replace every `[VERIFY]` placeholder

Search the project for the text `[VERIFY` and replace each one with real
information. These are intentionally left blank so nothing false is published.

| Placeholder | Where | Replace with |
|---|---|---|
| `[VERIFY-PHONE]` | `index.html` (contact + schema), legal pages | Your business phone, e.g. `(281) 555-0123` |
| `(XXX) XXX-XXXX` / `tel:+1XXXXXXXXXX` | `index.html` contact block | Real phone (display + `tel:` link) |
| `[VERIFY-EMAIL]` / `info@aminrealtyinc.com` | throughout | Your real inbox (confirm `info@…` works) |
| `[VERIFY-LICENSE]` | footer, `legal/iabs.html`, `legal/consumer-protection.html` | TREC broker license number(s) |
| `[VERIFY-NAME]` | `legal/iabs.html` | Designated broker / sales agent names |
| `[VERIFY-DATE]` | legal pages | The date you publish (e.g. "June 2026") |
| `your-form-id` | `index.html` contact form `action` | Your form endpoint (see §3) |
| `logEndpoint` (blank) | `assets/config.js` | Where document signatures are logged (see §6) |
| `contactEmail` | `assets/config.js` | Your real inbox |

> **Important:** Have an attorney review the Privacy Policy, Terms, and the two
> TREC notices before launch, and confirm the TREC notice wording against
> [trec.texas.gov](https://www.trec.texas.gov). The IABS and Consumer Protection
> Notice are **required by Texas law** to be readily available from your homepage —
> they are already linked in the footer.

---

## 1. Files in this project

```
.htaccess                      ← Apache config (https redirect, gzip, caching, 404)
index.html                     ← the homepage (hero, featured listings, contact)
listings.html                  ← full property catalog (filter + sort)
listing.html                   ← per-property detail page (auto: listing.html?id=…)
documents.html                 ← Secure Document Center (signature-gated)
404.html                       ← "page not found" page
robots.txt, sitemap.xml        ← search-engine helpers
site.webmanifest               ← app/icon metadata
assets/
  listings.js                  ← edit to add/remove listings, map pins & deal-room files
  documents.js                 ← edit to add/remove downloadable files
  config.js                    ← endpoint + confirmation-email settings
  site.css, site.js            ← shared styles & behavior
  dealroom.js                  ← "View Deal Room" gate (name/email → files)
  map.js                       ← interactive "Nationwide Reach" property map
  fonts/                       ← self-hosted Fraunces & Archivo (keep!)
apps-script/
  email-endpoint.gs            ← paste into Google Apps Script for the
                                 access log + confirmation emails (see §6)
documents/                     ← put your downloadable/deal-room files here
legal/
  privacy.html
  terms.html
  accessibility.html
  iabs.html                    ← TREC: Information About Brokerage Services
  consumer-protection.html     ← TREC: Consumer Protection Notice
```

> **Keep the folder structure intact** when uploading. `index.html`, `listings.html`,
> `listing.html`, and `documents.html` reference the `assets/` and `documents/`
> folders by relative path, so upload the whole tree (not just loose files).

To **edit your listings**, open `assets/listings.js` — one clearly commented
file controls the catalog, the homepage featured cards, the map pins
(`lat`/`lng`: add coordinates to drop a pin, delete them to remove it), and
each listing's Deal Room files. No coding experience needed beyond copying
the existing pattern.

---

## 2. Option A — Hosting on GoDaddy (recommended for full fidelity)

GoDaddy has two different products. Use the one that lets you upload files:

### A1. GoDaddy "Web Hosting" / cPanel (supports file upload — best)
1. Log in at godaddy.com → **My Products** → find **Web Hosting** →
   **Manage** → **cPanel Admin**.
2. Open **File Manager** → double-click the **`public_html`** folder.
3. In File Manager **Settings** (top right), tick **"Show Hidden Files
   (dotfiles)"** — the included `.htaccess` file starts with a dot.
4. Delete any placeholder files GoDaddy put there (`index.html`,
   `coming-soon`, `cgi-bin` can stay).
5. Click **Upload**, upload the site `.zip`, go back, right-click it →
   **Extract** into `public_html`, then delete the zip. If extraction
   created a subfolder, move its *contents* up into `public_html`.
6. Verify `index.html`, `.htaccess`, `assets/`, `documents/`, and `legal/`
   sit directly inside `public_html`.
7. Turn on SSL: cPanel **Security → SSL/TLS Status → Run AutoSSL** (or use
   your GoDaddy SSL). The included `.htaccess` then forces https:// and
   also enables compression, caching, and the branded 404 page for you.
8. Visit your domain — you're live.

### A2. GoDaddy "Websites + Marketing" (the drag-and-drop builder)
This builder does **not** allow uploading a full HTML site. Two paths:
- **Preferred:** switch your plan to **Web Hosting / cPanel** (A1), or
- **Embed:** add an **HTML / Embed** section and paste a single page in, the
  same way as the Wix embed described in §3 below. (You lose multi-page links,
  so A1 is strongly preferred.)

---

## 3. Option B — Using Wix

Wix is a **closed builder**: it does not let you upload a complete multi-file
HTML website as your whole site. You have three realistic choices, best first:

### B1. Point your Wix-managed domain at the GoDaddy-hosted site (cleanest)
If you keep the domain at Wix but host the actual site on GoDaddy (§2 A1),
update the domain's DNS to point to GoDaddy. You get the full site with no
compromises. (Wix → Domains → DNS records, or move the A/CNAME records.)

### B2. Embed the homepage inside a Wix page (keeps you inside Wix)
1. In the Wix Editor: **Add** → **Embed Code** → **Embed HTML** (the
   "HTML iframe" / Custom Element widget).
2. Choose **"Code"** and paste the **entire contents of `index.html`**.
3. Stretch the widget to full width/height.
4. For the legal pages, create normal Wix pages and either paste each legal
   file's content into its own Embed HTML widget, or recreate the text in Wix.
   Then update the footer links in your pasted `index.html` to point to those
   Wix page URLs.

> Notes for Wix embed: relative links like `legal/privacy.html` won't resolve
> inside an iframe — replace them with the full Wix page URLs. The hero,
> animations, and layout are fully inlined and render inside the Wix sandbox;
> the **fonts, property map, Deal Rooms, and shared listings file live in
> `assets/`**, which an embed widget cannot load by relative path. For those,
> either host the `assets/` + `documents/` folders somewhere (e.g. GoDaddy or
> Netlify) and change the `<link>`/`<script src>` paths in your pasted code to
> absolute `https://` URLs — or use option **A/B1**, which is why we recommend
> them: you keep every feature with zero surgery.

### B3. Use Wix Velo (advanced)
Developers can recreate the markup in Velo. Usually unnecessary — B1 or B2 is
faster.

---

## 4. Connecting the contact form

The form works with any standard form service. Two free, no-server options:

- **Formspree** ([formspree.io](https://formspree.io)) — create a form, copy your
  endpoint, and replace `https://formspree.io/f/your-form-id` in `index.html`
  with it.
- **Web3Forms** ([web3forms.com](https://web3forms.com)) — similar; paste your
  access key endpoint into the form `action`.

On **Wix**, you can instead delete the embedded form and drop in a native Wix
**Contact Form** element, which emails you automatically.

Until you configure an endpoint, the form shows a friendly message asking
visitors to email you directly — it never silently fails.

---

## 5. After you go live — re-test

1. Run the page through **Lighthouse** (Chrome DevTools → Lighthouse) and
   **WAVE** ([wave.webaim.org](https://wave.webaim.org)) for a fresh
   accessibility + performance score.
2. Tab through the whole page with the keyboard — every control should show a
   visible gold focus ring.
3. Test on a phone and at 200% browser zoom.
4. Submit the contact form to confirm you receive the email.

See `GRADE.md` for the audit this site already passed locally.

---

## 6. Document Center & signature logging

The **Secure Document Center** (`documents.html`) requires each visitor to sign a
confidentiality agreement before a file downloads, and logs every signature.

### 6.1 Connect the signature log (do this for production)
Signatures are always saved in the visitor's browser, but to get a **central
record you can access**, set an endpoint in **`assets/config.js`**:

- **Formspree** — create a form, paste its URL into `logEndpoint`.
- **Web3Forms** — set `logEndpoint` to `https://api.web3forms.com/submit` and put
  your key in `web3formsKey`.
- **Google Sheet** — deploy a Google Apps Script web app that appends rows, and
  paste its `/exec` URL into `logEndpoint`.

Each signature record includes: document, signer name, email, company, the typed
signature, agreement version, and an ISO timestamp. You (and the signer, via the
`_subject`) receive it immediately. Set `requireRemoteLog: true` to refuse
downloads unless the signature is successfully logged.

You can also view/export signatures stored on a given browser by visiting
`documents.html#audit` (includes a **Download CSV** button).

### 6.2 Add or remove files
Drop the file in `documents/`, then add/remove its entry in `assets/documents.js`.

### 6.3 Important: truly locking files
On plain static hosting (GoDaddy file hosting / any static host), files in
`documents/` are technically reachable by their direct URL if someone guesses it.
The signature gate creates the **signed, logged record** and stops casual access,
which is enough for most brokerage use. To **hard-restrict** a file:

- Email the file *after* signing (e.g., a Formspree autoresponse or an Apps
  Script that emails the attachment), and remove it from the public `documents/`
  folder; **or**
- Serve files through a small serverless function (Cloudflare Workers, Netlify/
  Vercel Functions) that checks for a signature before returning the file; **or**
- Use a dedicated virtual-data-room / e-sign service for sensitive deals.

### 6.4 Wix note
`listings.html` and `documents.html` use multiple files, custom JavaScript, and
file downloads, which the Wix builder does not host natively. For these pages,
host the site on **GoDaddy (cPanel)** or any static host (§2 A1). On Wix, the
homepage can still be embedded (§3 B2); link its "Listings"/"Documents" buttons
to the GoDaddy-hosted pages, or recreate those pages with native Wix elements.
