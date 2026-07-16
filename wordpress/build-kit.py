#!/usr/bin/env python3
"""
Regenerates the paste-ready WordPress kit from the live site sources.

For developers/maintainers only — site owners never need to run this.
Whenever the main site files change (index.html, listings.html,
listing.html, documents.html, legal/*.html, assets/*), run:

    python3 wordpress/build-kit.py

and the 9 `*-paste-this.html` fragments are rebuilt in place.

What it does, per page:
  1. extracts the page's CSS and <body> markup,
  2. inlines every `<script src="assets/...">` file,
  3. embeds the four woff2 fonts as base64 data URIs (fully offline),
  4. rewrites internal links to the WordPress slugs
     (listings.html -> /listings/, listing.html?id= -> /listing/?id=, ...).
"""
import base64, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "wordpress")

def read(p):
    with open(os.path.join(ROOT, p), encoding="utf-8") as f:
        return f.read()

# ---- fonts -> data URIs ------------------------------------------------
FONTS = {}
for name in ("fraunces.woff2", "fraunces-italic.woff2", "archivo.woff2", "archivo-italic.woff2"):
    with open(os.path.join(ROOT, "assets", "fonts", name), "rb") as f:
        FONTS[name] = "data:font/woff2;base64," + base64.b64encode(f.read()).decode()

def embed_fonts(css):
    for name, uri in FONTS.items():
        for prefix in ("fonts/", "assets/fonts/", "../assets/fonts/"):
            css = css.replace('url("%s%s")' % (prefix, name), 'url("%s")' % uri)
    return css

# ---- internal links -> WordPress slugs ---------------------------------
LINKS = [
    ('href="../index.html"',                    'href="/"'),
    ('href="index.html#',                       'href="/#'),
    ('href="index.html"',                       'href="/"'),
    ('href="../listings.html"',                 'href="/listings/"'),
    ('href="listings.html"',                    'href="/listings/"'),
    ('href="../documents.html"',                'href="/documents/"'),
    ('href="documents.html"',                   'href="/documents/"'),
    ('href="legal/privacy.html"',               'href="/privacy/"'),
    ('href="legal/terms.html"',                 'href="/terms/"'),
    ('href="legal/accessibility.html"',         'href="/accessibility/"'),
    ('href="legal/iabs.html"',                  'href="/iabs/"'),
    ('href="legal/consumer-protection.html"',   'href="/consumer-protection/"'),
    ('href="privacy.html"',                     'href="/privacy/"'),
    ('href="terms.html"',                       'href="/terms/"'),
    ('href="accessibility.html"',               'href="/accessibility/"'),
    ('href="iabs.html"',                        'href="/iabs/"'),
    ('href="consumer-protection.html"',         'href="/consumer-protection/"'),
    # detail pages: works in markup and inside JS string literals
    ('listing.html?id=',                        '/listing/?id='),
]

def rewrite_links(html):
    for a, b in LINKS:
        html = html.replace(a, b)
    return html

# ---- page assembly ------------------------------------------------------
def body_of(html):
    m = re.search(r"<body>\n?(.*)\n?</body>", html, re.S)
    return m.group(1).strip()

def style_of(html):
    m = re.search(r"<style>\n?(.*?)\n?</style>", html, re.S)
    return m.group(1)

def inline_script_srcs(markup):
    def repl(m):
        return "<script>\n" + read(m.group(1)).strip() + "\n</script>"
    return re.sub(r'<script src="(assets/[\w./-]+\.js)"></script>', repl, markup)

HEADER = """<!-- ================================================================
  AMIN REALTY — paste-ready WordPress fragment (%s)
  HOW TO USE: in WordPress, create/edit the page, add ONE
  "Custom HTML" block, and paste this ENTIRE file into it.
  Use a full-width / blank page template if your theme has one.
%s================================================================= -->
<script>document.documentElement.classList.add("js");
/* theme boot: apply saved or OS-preferred theme before first paint */
(function(){try{var t=localStorage.getItem("aminTheme");if(!t)t=(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();</script>
"""

FILES_NOTE = """  Deal-room and document files: upload your PDFs to the WordPress
  Media Library and put those URLs in the listings/documents config
  near the bottom of this file (search for dealRoom / AMIN_DOCUMENTS).
"""

DETAIL_NOTE = """  This ONE page powers every listing's own page. Create it with the
  slug  listing  and each property is automatically available at
  /listing/?id=... — the homepage and catalog cards link there for you.
  Add/remove listings in the AMIN_LISTINGS config on your Listings page
  AND in the copy near the bottom of this file (keep the two in sync,
  or paste the same block into both).
"""

def build(src, label, note=FILES_NOTE, css_from=None):
    html = read(src)
    # CSS: index + legal pages carry their own <style>; subpages use assets/site.css
    css = embed_fonts(read(css_from) if css_from else style_of(html))
    frag = HEADER % (label, note)
    frag += "<style>\n" + css.strip() + "\n</style>\n\n"
    frag += rewrite_links(inline_script_srcs(body_of(html))) + "\n"
    return frag

PAGES = [
    ("1-HOMEPAGE-paste-this.html",            "index.html",      "Homepage",             FILES_NOTE, None),
    ("2-LISTINGS-PAGE-paste-this.html",       "listings.html",   "listings.html",        FILES_NOTE, "assets/site.css"),
    ("3-DOCUMENTS-PAGE-paste-this.html",      "documents.html",  "documents.html",       FILES_NOTE, "assets/site.css"),
    ("4-PRIVACY-paste-this.html",             "legal/privacy.html",             "Privacy Policy",       "", None),
    ("5-TERMS-paste-this.html",               "legal/terms.html",               "Terms of Use",         "", None),
    ("6-ACCESSIBILITY-paste-this.html",       "legal/accessibility.html",       "Accessibility",        "", None),
    ("7-IABS-paste-this.html",                "legal/iabs.html",                "TREC IABS",            "", None),
    ("8-CONSUMER-PROTECTION-paste-this.html", "legal/consumer-protection.html", "Consumer Protection",  "", None),
    ("9-LISTING-DETAIL-paste-this.html",      "listing.html",    "listing detail page",  DETAIL_NOTE, "assets/site.css"),
]

def main():
    for out_name, src, label, note, css_from in PAGES:
        frag = build(src, label, note, css_from)
        with open(os.path.join(OUT, out_name), "w", encoding="utf-8") as f:
            f.write(frag)
        print("built wordpress/%s  (%d KB)" % (out_name, len(frag) // 1024))

if __name__ == "__main__":
    sys.exit(main())
