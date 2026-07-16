# Putting the Amin Realty website into WordPress — the super simple guide

Think of WordPress like a big binder. We are going to add 8 pages to the
binder. For each page, you copy words from a file I gave you, and paste them
into WordPress. That's the whole trick: **open file → copy everything →
paste into WordPress → save.** Eight times.

---

## Before you start (2 things to check)

1. **You need a "real" WordPress** — one installed on hosting (GoDaddy,
   Bluehost, SiteGround, etc.), where you log in at
   `yourdomain.com/wp-admin`. If you use **WordPress.com** instead, pasted
   code only works on their **Business plan or higher** — on cheaper plans
   WordPress.com silently deletes the code when you save.
2. **Log in as an Administrator.** WordPress only lets administrators paste
   code. If your user is an "Editor," the code gets stripped out.

---

## Part 1 — Make the 9 pages (about 25 minutes)

You will repeat the same little dance 9 times. Here is the dance once:

1. In WordPress, on the left menu, click **Pages → Add New Page**.
2. Type the **title** (from the table below).
3. On the right side, find **URL** (or "Permalink") and make the ending
   match the **slug** in the table exactly.
4. Click the **+** button in the editor, type `html`, and choose
   **Custom HTML**.
5. On your computer, open the matching file from this folder in a plain
   text editor (Notepad on Windows, TextEdit on Mac). Press **Ctrl+A**
   (select all), then **Ctrl+C** (copy).
6. Click inside the Custom HTML block in WordPress and press **Ctrl+V**
   (paste). It will look like a huge wall of code — that's correct.
7. Click **Publish** (top right), twice if it asks again.

Now do that dance for each row:

| # | File to copy from            | Page title            | Slug (URL ending)     |
|---|------------------------------|-----------------------|-----------------------|
| 1 | `1-HOMEPAGE-paste-this.html` | Home                  | `home`                |
| 2 | `2-LISTINGS-PAGE-paste-this.html` | Listings         | `listings`            |
| 3 | `3-DOCUMENTS-PAGE-paste-this.html` | Documents       | `documents`           |
| 4 | `4-PRIVACY-paste-this.html`  | Privacy Policy        | `privacy`             |
| 5 | `5-TERMS-paste-this.html`    | Terms of Use          | `terms`               |
| 6 | `6-ACCESSIBILITY-paste-this.html` | Accessibility    | `accessibility`       |
| 7 | `7-IABS-paste-this.html`     | IABS                  | `iabs`                |
| 8 | `8-CONSUMER-PROTECTION-paste-this.html` | Consumer Protection | `consumer-protection` |
| 9 | `9-LISTING-DETAIL-paste-this.html` | Listing | `listing` |

> The slugs matter! The pages link to each other using these exact names.
> If a slug is different, a link will land on "page not found."

### What is page 9 ("Listing")?

It's the magic one: that single page powers **every property's own page**,
exactly like the big brokerage sites. When a visitor clicks a property card
on your homepage or Listings page, they land on
`yoursite.com/listing/?id=that-property` — with the photo, price, specs,
description, deal-room button, and similar properties. You never create
pages per property; the one `listing` page does them all.

> **Editing listings in WordPress:** the property list (`AMIN_LISTINGS`)
> lives inside pages 1, 2, **and** 9 (search the pasted code for
> `AMIN_LISTINGS`). When you add or remove a property, update it in all
> three pages — easiest is to edit once, select that whole block, and
> paste the same block into the other two.

---

## Part 2 — Make "Home" the real homepage (1 minute)

1. Left menu → **Settings → Reading**.
2. Where it says "Your homepage displays," pick **A static page**.
3. Choose **Home** as the Homepage. Click **Save Changes**.

Now going to `yourdomain.com` shows the new website. 🎉

---

## Part 3 — Make it look clean (2 minutes, worth it)

Your WordPress theme puts its own menu bar and footer around every page —
like a picture frame around our picture. The site looks best **without**
the frame:

1. Edit the Home page. On the right side under **Page → Template** (or
   "Design"), look for a template called **Blank**, **Canvas**,
   **Full Width**, or **No Header/Footer**, and pick it. Update.
2. Do the same for Listings and Documents. (The 5 legal pages look fine
   either way.)

No such template in your theme? That's okay — the site still works inside
the frame. If you want it frameless, the free plugin "Blank Canvas
Templates" (Plugins → Add New) adds one.

---

## Part 4 — Your PDFs (deal rooms & document center)

WordPress keeps files in its **Media Library** — that's its toy box:

1. Left menu → **Media → Add New Media File** → upload your PDF.
2. Click the uploaded file and press **Copy URL to clipboard**. It looks
   like `https://yourdomain.com/wp-content/uploads/2026/07/my-om.pdf`.
3. Edit the Home page → click into the Custom HTML block → press
   **Ctrl+F**-style search (use your browser's find) for **`dealRoom`**.
4. You'll see lines like
   `{ label:"Offering Memorandum (sample)", file:"documents/SAMPLE-..." }`.
   Replace the `file:` part with your copied URL, and the `label:` with
   what buyers should see. Add more `{ label, file }` lines for more
   files; delete a line to remove one. Update the page.
5. Do the same in the Documents page's block — search **`AMIN_DOCUMENTS`**.

Same idea for **map pins**: search **`lat:`** in the homepage block —
every listing with `lat` and `lng` numbers gets a pin. Add the two numbers
to add a pin, delete them to remove it. (Right-click a spot in Google Maps
and it shows the numbers.)

---

## Part 5 — Turn on the emails (10 minutes, one time)

Two small jobs so messages actually reach you:

1. **Contact form**: make a free account at formspree.io, create a form,
   copy its link (`https://formspree.io/f/abc123`), then in the homepage
   block find `your-form-id` and replace the whole address with yours.
2. **Deal-room confirmation emails** (to you AND the client): open
   `apps-script/email-endpoint.gs` from the main website zip and follow the
   6 numbered steps written at the top (it's copy-paste into Google, no
   coding). You'll get a web address ending in `/exec`. In the homepage,
   listings, and documents blocks, find `logEndpoint: ""` and paste your
   address between the quotes, and change `sendsConfirmationEmail: false`
   to `true` and `requireRemoteLog: false` to `true`.

---

## Part 6 — Check your work (5 minutes)

Open your website like a visitor and try:

- The gold **map pins** — hover one, then click it.
- **View Deal Room** — it must refuse to show files until you type a
  first name, last name, and a real email.
- The **Listings** and **Documents** pages and a couple of footer links.
- Search the pages for the word **VERIFY** — replace the phone number and
  license placeholders with your real ones (edit the blocks, use your
  browser's find-in-page).

---

## If something looks wrong

| What you see | The fix |
|---|---|
| The code shows as text on the page | You pasted into a *Paragraph* block. Delete it, add a **Custom HTML** block, paste there. |
| Page saves but code disappears | You're not an Administrator, or you're on a WordPress.com cheap plan (see "Before you start"). |
| A link says "page not found" | That page's **slug** doesn't match the table. Edit the page and fix the URL ending. |
| Theme menu/footer looks doubled up | Do Part 3 (blank template). |
| Fonts look different for a second when loading | Normal — they finish loading in under a second. |

That's everything. Eight pastes, one homepage setting, and your toy box of
PDFs. If a step doesn't match what you see on screen, tell me what your
screen says and I'll adjust the directions.
