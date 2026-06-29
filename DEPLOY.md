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

> **Important:** Have an attorney review the Privacy Policy, Terms, and the two
> TREC notices before launch, and confirm the TREC notice wording against
> [trec.texas.gov](https://www.trec.texas.gov). The IABS and Consumer Protection
> Notice are **required by Texas law** to be readily available from your homepage —
> they are already linked in the footer.

---

## 1. Files in this project

```
index.html                     ← the homepage (everything: hero, listings, contact)
404.html                       ← "page not found" page
robots.txt, sitemap.xml        ← search-engine helpers
site.webmanifest               ← app/icon metadata
legal/
  privacy.html
  terms.html
  accessibility.html
  iabs.html                    ← TREC: Information About Brokerage Services
  consumer-protection.html     ← TREC: Consumer Protection Notice
```

To **edit your listings**, open `index.html`, find the `LISTINGS` array near the
bottom (inside the `<script>` block — it's clearly commented), and add/edit
entries. No coding experience needed beyond copying the existing pattern.

---

## 2. Option A — Hosting on GoDaddy (recommended for full fidelity)

GoDaddy has two different products. Use the one that lets you upload files:

### A1. GoDaddy "Web Hosting" / cPanel (supports file upload — best)
1. Log in → **My Products** → your Web Hosting plan → **cPanel Admin**.
2. Open **File Manager** → go to the `public_html` folder.
3. Upload **all** files and the `legal/` folder, keeping the same structure.
   (You can drag the files in, or upload a `.zip` and "Extract".)
4. Make sure `index.html` is in the root of `public_html`.
5. Visit your domain — you're live.

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
> inside an iframe — replace them with the full Wix page URLs. Because
> everything is inlined and uses no third-party CDNs, the page renders fully
> inside the Wix sandbox.

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
