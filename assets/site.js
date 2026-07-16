/* ============================================================
   AMIN REALTY, INC. — Shared behavior for listings.html and
   documents.html. Vanilla JS, no dependencies, a11y-aware.
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var CFG = window.AMIN_CONFIG || {};
  var ndaOpen = null; // set by the documents/modal block below; called by the doc grid

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"]/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c];
    });
  }
  function statusClass(s) { return "status-" + String(s).toLowerCase().replace(/\s+/g, "-"); }

  var ICONS = {
    hotel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v15M9 9h.01M12 9h.01M15 9h.01M9 13h.01M12 13h.01M15 13h.01M10 21v-4h4v4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    motel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 17h20M4 17V9l8-4 8 4v8M8 17v-4h3v4M13 13h3v4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    land: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 20h18M5 20l3-9 3 4 3-7 5 12" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    commercial: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M6 21V4h8v17M14 21V9h4v12M9 8h.01M9 12h.01M9 16h.01" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  var FILE_ICONS = {
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h1.5a1.5 1.5 0 0 1 0 3H8zM8 13v5"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8M12 13v8"/></svg>',
    zip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 11v2M12 15v2M12 19v1"/></svg>'
  };
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" style="width:16px;height:16px"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

  /* ---------- header / nav / reveal (shared) ---------- */
  var toggle = $("#navToggle"), links = $("#navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a") && links.classList.contains("open")) {
        links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  var yEl = $("#year"); if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---------- dark / light theme toggle ---------- */
  var themeBtn = $("#themeToggle");
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", String(t === "dark"));
      themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    var mc = document.querySelector('meta[name="theme-color"]');
    if (mc) mc.setAttribute("content", t === "dark" ? "#071120" : "#0a1a2f");
  }
  applyTheme(document.documentElement.getAttribute("data-theme") || "light");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try { localStorage.setItem("aminTheme", t); } catch (e) { /* private mode */ }
    applyTheme(t);
  });

  // Stagger helper: gives each rendered card its animation-delay index.
  function stagger(container) {
    if (!container) return;
    Array.prototype.forEach.call(container.children, function (el, i) {
      el.style.setProperty("--i", i);
    });
  }

  /* ---------- reading progress + back-to-top (one rAF pipeline) ---------- */
  var headerEl = $(".site-header"), toTopBtn = $("#toTop"), scrollTick = false;
  function paintScroll() {
    scrollTick = false;
    var y = window.scrollY || window.pageYOffset;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (headerEl && !reduce) headerEl.style.setProperty("--progress", (max > 0 ? Math.min(y / max, 1) : 0).toFixed(4));
    if (toTopBtn) toTopBtn.classList.toggle("show", y > 600);
  }
  if (headerEl || toTopBtn) {
    window.addEventListener("scroll", function () {
      if (!scrollTick) { scrollTick = true; requestAnimationFrame(paintScroll); }
    }, { passive: true });
    paintScroll();
  }
  if (toTopBtn) toTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  var reveals = $all(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     LISTINGS — shared data + card rendering, used by the catalog
     page (listings.html) and the detail pages (listing.html?id=…)
     ============================================================ */
  var data = (window.AMIN_LISTINGS || []).slice();
  (function () {
    // Every listing gets a stable URL slug for its detail page,
    // generated from `id` (if set in listings.js) or the title.
    var seen = {};
    data.forEach(function (l, i) {
      l._i = i;
      var base = String(l.id || l.title || "").toLowerCase()
        .replace(/&amp;/g, " and ").replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "listing-" + (i + 1);
      var slug = base, n = 2;
      while (seen[slug]) { slug = base + "-" + (n++); }
      seen[slug] = true;
      l._slug = slug;
    });
  })();
  function detailHref(l) { return "listing.html?id=" + encodeURIComponent(l._slug); }
  function priceInRange(price, range) {
    // range values look like "0-2500000" (up to) or "10000000-" (and up)
    if (!range) return true;
    var parts = range.split("-");
    var min = parseFloat(parts[0]) || 0;
    var max = parts[1] ? parseFloat(parts[1]) : Infinity;
    return price >= min && price <= max;
  }

  function cardHTML(l, hLevel) {
    var h = hLevel || 2;
    var plain = String(l.title).replace(/&amp;/g, "and");
    var media = l.image
      ? '<img src="' + encodeURI(l.image) + '" alt="' + esc(plain) + ' in ' + esc(l.location) + '" loading="lazy" decoding="async">'
      : (ICONS[l.icon] || ICONS.commercial);
    var specs = (l.specs || []).map(function (s) {
      return '<span class="listing-spec"><b>' + esc(s[1]) + '</b>' + esc(s[0]) + '</span>';
    }).join("");
    return '<article class="listing">' +
      '<div class="listing-media">' +
        media +
        '<span class="listing-status ' + statusClass(l.status) + '">' + esc(l.status) + '</span>' +
        '<span class="listing-type">' + esc(l.type) + '</span>' +
      '</div>' +
      '<div class="listing-body">' +
        '<span class="listing-price">' + esc(l.priceLabel) + '</span>' +
        '<h' + h + ' class="listing-title"><a href="' + detailHref(l) + '">' + esc(l.title) + '</a></h' + h + '>' +
        '<span class="listing-loc">' + PIN + " " + esc(l.location) + '</span>' +
        '<div class="listing-specs">' + specs + '</div>' +
        '<div class="listing-cta"><a href="' + detailHref(l) + '" aria-label="View details: ' + esc(plain) + '">View details ' + ARROW + '</a>' +
          (l.dealRoom && l.dealRoom.length
            ? '<button type="button" class="deal-btn" data-deal="' + l._i + '" aria-haspopup="dialog">' + LOCK + ' View Deal Room</button>'
            : '') +
        '</div>' +
      '</div></article>';
  }

  // One delegated handler covers deal-room buttons in every grid
  // (catalog, detail page, related listings).
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("button[data-deal]");
    if (btn && window.AMIN_DEAL_ROOM) window.AMIN_DEAL_ROOM.open(data[parseInt(btn.getAttribute("data-deal"), 10)], btn);
  });

  /* ============================================================
     LISTINGS CATALOG PAGE (listings.html)
     ============================================================ */
  var grid = $("#listingGrid");
  if (grid) {
    var fType = $("#filterType"), fStatus = $("#filterStatus"), fPrice = $("#filterPrice"),
        fSearch = $("#filterSearch"), fSort = $("#sortBy"), countEl = $("#listingsCount");

    function render() {
      var t = fType ? fType.value : "", s = fStatus ? fStatus.value : "",
          p = fPrice ? fPrice.value : "", q = fSearch ? fSearch.value.trim().toLowerCase() : "",
          sort = fSort ? fSort.value : "";
      var out = data.filter(function (l) {
        if (t && l.type !== t) return false;
        if (s && l.status !== s) return false;
        if (!priceInRange(l.price, p)) return false;
        if (q && (l.title + " " + l.location + " " + l.type).toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
      if (sort === "price-asc") out.sort(function (a, b) { return a.price - b.price; });
      else if (sort === "price-desc") out.sort(function (a, b) { return b.price - a.price; });
      else if (sort === "title") out.sort(function (a, b) { return a.title.localeCompare(b.title); });

      grid.innerHTML = out.length
        ? out.map(function (l) { return cardHTML(l); }).join("")
        : '<p class="empty">No listings match your filters. <a href="index.html#contact">Contact us</a> about off-market opportunities.</p>';
      stagger(grid);
      if (countEl) countEl.textContent = out.length + (out.length === 1 ? " listing" : " listings");
    }
    [fType, fStatus, fPrice, fSort].forEach(function (el) { if (el) el.addEventListener("change", render); });
    if (fSearch) fSearch.addEventListener("input", render);
    render();
  }

  /* ============================================================
     LISTING DETAIL PAGE (listing.html?id=<slug>)
     Renders one listing from assets/listings.js as its own page.
     ============================================================ */
  var detailRoot = $("#listingDetail");
  if (detailRoot) {
    var slugMatch = location.search.match(/[?&]id=([^&]+)/);
    var wantedSlug = "";
    try { wantedSlug = slugMatch ? decodeURIComponent(slugMatch[1].replace(/\+/g, " ")) : ""; } catch (err) { wantedSlug = ""; }
    var current = null;
    data.forEach(function (l) { if (!current && l._slug === wantedSlug) current = l; });

    if (!current) {
      detailRoot.hidden = true;
      var nf = $("#listingNotFound");
      if (nf) nf.hidden = false;
      document.title = "Listing Not Found | Amin Realty, Inc.";
    } else {
      renderDetail(current);
    }
  }

  function renderDetail(l) {
    var display = String(l.title).replace(/&amp;/g, "&");
    document.title = display + " — " + l.location + " | Amin Realty, Inc.";
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", display + " — " + l.type + " in " + l.location + ", " + l.priceLabel + ", " + l.status + ". Amin Realty, Inc.");

    var crumb = $("#crumbTitle"); if (crumb) crumb.textContent = display;
    var titleEl = $("#detailTitle"); if (titleEl) titleEl.textContent = display;

    var mediaEl = $("#detailMedia");
    if (mediaEl) {
      if (l.image) {
        mediaEl.innerHTML = '<img src="' + encodeURI(l.image) + '" alt="' + esc(display) + ' in ' + esc(l.location) + '" decoding="async">';
        mediaEl.removeAttribute("aria-hidden");
      } else {
        mediaEl.innerHTML = ICONS[l.icon] || ICONS.commercial;
        mediaEl.setAttribute("aria-hidden", "true");
      }
    }

    var badges = $("#detailBadges");
    if (badges) badges.innerHTML =
      '<span class="badge-pill ' + statusClass(l.status) + '">' + esc(l.status) + '</span>' +
      '<span class="badge-pill badge-type">' + esc(l.type) + '</span>';

    var priceEl = $("#detailPrice"); if (priceEl) priceEl.textContent = l.priceLabel;
    var locEl = $("#detailLoc"); if (locEl) locEl.innerHTML = PIN + '<span>' + esc(l.location) + '</span>';

    var specsEl = $("#detailSpecs");
    if (specsEl) specsEl.innerHTML = (l.specs || []).map(function (s) {
      return '<div class="detail-spec"><b>' + esc(s[1]) + '</b><span>' + esc(s[0]) + '</span></div>';
    }).join("");

    var descEl = $("#detailDesc");
    if (descEl) {
      var desc = l.description;
      var paras = desc ? (Object.prototype.toString.call(desc) === "[object Array]" ? desc : [desc])
        : ["Full details for this " + l.type.toLowerCase() + " are available on request. Contact us for financials, brochures, and a confidential conversation about this opportunity."];
      descEl.innerHTML = paras.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    }

    // Deal room button appears only when the listing has gated files.
    if (l.dealRoom && l.dealRoom.length) {
      var cta = $("#detailCta");
      if (cta) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "deal-btn deal-btn-lg";
        btn.setAttribute("data-deal", String(l._i));
        btn.setAttribute("aria-haspopup", "dialog");
        btn.innerHTML = LOCK + " View Deal Room (" + l.dealRoom.length + (l.dealRoom.length === 1 ? " file)" : " files)");
        cta.appendChild(btn);
      }
    }

    // Related listings: same type first, then anything else.
    var related = data.filter(function (r) { return r !== l && r.type === l.type; });
    if (related.length < 3) {
      data.forEach(function (r) {
        if (related.length < 3 && r !== l && related.indexOf(r) === -1) related.push(r);
      });
    }
    related = related.slice(0, 3);
    var relWrap = $("#relatedWrap"), relGrid = $("#relatedGrid");
    if (related.length && relWrap && relGrid) {
      relWrap.hidden = false;
      relGrid.innerHTML = related.map(function (r) { return cardHTML(r, 3); }).join("");
      stagger(relGrid);
    }
  }

  /* ============================================================
     DOCUMENTS PAGE  (gated downloads + signature logging)
     ============================================================ */
  var docGrid = $("#docGrid");
  if (docGrid) {
    var docs = window.AMIN_DOCUMENTS || [];
    docGrid.innerHTML = docs.length ? docs.map(function (d, i) {
      return '<article class="doc">' +
        '<span class="ficon" aria-hidden="true">' + (FILE_ICONS[d.icon] || FILE_ICONS.pdf) + '</span>' +
        '<div>' +
          '<h3>' + esc(d.title) + '</h3>' +
          '<div class="meta"><span class="tag">' + esc(d.category || "Document") + '</span><span>' + esc(d.size || "") + '</span></div>' +
          '<p>' + esc(d.description) + '</p>' +
          '<div class="locked">' + LOCK + ' Confidential — signature required</div><br>' +
          '<button type="button" class="btn btn-outline" data-doc="' + i + '">Request access ' + ARROW + '</button>' +
        '</div></article>';
    }).join("") : '<p class="empty empty-on-light">No documents are available right now. Please <a href="index.html#contact">contact us</a>.</p>';
    stagger(docGrid);

    docGrid.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-doc]");
      if (btn && ndaOpen) ndaOpen(docs[parseInt(btn.getAttribute("data-doc"), 10)], btn);
    });
  }

  /* ---------- NDA modal ---------- */
  var backdrop = $("#ndaBackdrop");
  if (backdrop) {
    var modal = $("#ndaModal"), form = $("#ndaForm"), statusEl = $("#ndaStatus"),
        docNameEl = $("#ndaDoc"), downloadWrap = $("#ndaDownload"), companyEls = $all("[data-company]"),
        currentDoc = null, lastTrigger = null;

    companyEls.forEach(function (el) { el.textContent = CFG.companyName || "Amin Realty, Inc."; });

    function focusable() {
      return $all('a[href],button:not([disabled]),input:not([disabled]),textarea,select,[tabindex]:not([tabindex="-1"])', modal)
        .filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
    }
    ndaOpen = function (doc, trigger) {
      currentDoc = doc; lastTrigger = trigger || null;
      if (docNameEl) docNameEl.textContent = doc.title;
      if (form) { form.reset(); form.style.display = ""; }
      if (downloadWrap) { downloadWrap.hidden = true; downloadWrap.innerHTML = ""; }
      if (statusEl) { statusEl.textContent = ""; statusEl.removeAttribute("data-state"); }
      backdrop.classList.add("open"); backdrop.removeAttribute("inert");
      document.body.style.overflow = "hidden";
      var first = $("#ndaName"); if (first) setTimeout(function () { first.focus(); }, 60);
      document.addEventListener("keydown", onKey, true);
    };
    function closeNda() {
      backdrop.classList.remove("open"); backdrop.setAttribute("inert", "");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey, true);
      if (lastTrigger) lastTrigger.focus();
    }
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); closeNda(); return; }
      if (e.key === "Tab") {
        var f = focusable(); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    $all("[data-nda-close]").forEach(function (b) { b.addEventListener("click", closeNda); });
    backdrop.addEventListener("mousedown", function (e) { if (e.target === backdrop) closeNda(); });

    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    form && form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#ndaName").value.trim(),
          email = $("#ndaEmail").value.trim(),
          company = $("#ndaCompany") ? $("#ndaCompany").value.trim() : "",
          signature = $("#ndaSignature").value.trim(),
          agree = $("#ndaAgree").checked;
      if (!name) return fail("Please enter your full name.");
      if (!validEmail(email)) return fail("Please enter a valid email address.");
      if (!signature) return fail("Please type your full legal name as your signature.");
      if (!agree) return fail("You must agree to the confidentiality terms to continue.");

      var record = {
        id: "SIG-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
        kind: "signature",
        document: currentDoc ? currentDoc.title : "",
        file: currentDoc ? currentDoc.file : "",
        name: name, email: email, company: company, signature: signature,
        agreementVersion: CFG.agreementVersion || "1.0",
        agreedConfidential: true,
        timestamp: new Date().toISOString(),
        timestampLocal: new Date().toLocaleString(),
        page: location.href, userAgent: navigator.userAgent
      };
      saveLocal(record);

      var endpoint = CFG.logEndpoint || "";
      setStatus("Recording your signature…");
      $("#ndaSubmit").disabled = true;

      if (endpoint) {
        var fd = new FormData();
        Object.keys(record).forEach(function (k) { fd.append(k, record[k]); });
        if (CFG.web3formsKey) fd.append("access_key", CFG.web3formsKey);
        fd.append("_subject", "Confidentiality signature: " + record.document + " — " + record.name);
        fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw new Error("bad"); return r; })
          .then(function () { unlock(record); })
          .catch(function () {
            $("#ndaSubmit").disabled = false;
            if (CFG.requireRemoteLog) fail("We couldn't record your signature just now. Please try again, or email " + (CFG.contactEmail || "us") + ".");
            else unlock(record, "Saved locally — the central log could not be reached.");
          });
      } else {
        if (CFG.requireRemoteLog) {
          $("#ndaSubmit").disabled = false;
          fail("Downloads are temporarily unavailable (signature logging is being configured). Please contact " + (CFG.contactEmail || "us") + ".");
        } else {
          unlock(record, "Recorded in this browser only — set a log endpoint in assets/config.js for a central record.");
        }
      }
    });

    function fail(msg) { setStatus(msg, "err"); return false; }
    function setStatus(msg, state) { if (!statusEl) return; statusEl.textContent = msg; if (state) statusEl.setAttribute("data-state", state); else statusEl.removeAttribute("data-state"); }

    function unlock(record, warn) {
      setStatus("Thank you, " + record.name.split(" ")[0] + " — access granted.", "ok");
      if (form) form.style.display = "none";
      if (downloadWrap) {
        downloadWrap.hidden = false;
        downloadWrap.innerHTML =
          '<p class="deal-note">Your agreement has been logged on ' + esc(record.timestampLocal) + '. This file is confidential and may not be shared.</p>' +
          (warn ? '<p class="fineprint deal-warn">⚠ ' + esc(warn) + '</p>' : '') +
          '<a class="btn btn-primary" id="ndaDownloadLink" href="' + encodeURI(record.file) + '" download>Download “' + esc(record.document) + '” ' + ARROW + '</a>' +
          '<button type="button" class="btn btn-outline" data-nda-close style="margin-left:.6rem">Close</button>';
        var dl = $("#ndaDownloadLink", downloadWrap);
        $all("[data-nda-close]", downloadWrap).forEach(function (b) { b.addEventListener("click", closeNda); });
        // Reveal and focus the download button; let the visitor click it themselves
        // (auto-clicking can navigate away for files the browser opens inline).
        if (dl) dl.focus();
      }
    }
  }

  /* ---------- local signature log + CSV export + audit panel ---------- */
  var LOG_KEY = "aminSignatureLog";
  function saveLocal(rec) {
    try {
      var arr = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
      arr.push(rec); localStorage.setItem(LOG_KEY, JSON.stringify(arr));
    } catch (e) { /* storage may be unavailable; remote log still applies */ }
  }
  function getLog() { try { return JSON.parse(localStorage.getItem(LOG_KEY) || "[]"); } catch (e) { return []; } }
  function toCSV(rows) {
    if (!rows.length) return "";
    var cols = ["id", "timestamp", "document", "name", "email", "company", "signature", "agreementVersion", "file", "page"];
    var head = cols.join(",");
    var body = rows.map(function (r) {
      return cols.map(function (c) { return '"' + String(r[c] == null ? "" : r[c]).replace(/"/g, '""') + '"'; }).join(",");
    }).join("\n");
    return head + "\n" + body;
  }
  function renderAudit() {
    var panel = $("#auditPanel"); if (!panel) return;
    var rows = getLog();
    var inner = $("#auditInner");
    if (!rows.length) { inner.innerHTML = "<p style='color:var(--ink-soft)'>No signatures recorded in this browser yet.</p>"; panel.hidden = false; return; }
    var t = '<p style="margin-bottom:1rem;color:var(--ink-soft)">' + rows.length + ' signature(s) recorded in this browser. (For a central, multi-device record, configure a log endpoint.)</p>' +
      '<button type="button" class="btn btn-outline" id="auditCsv">Download CSV</button>' +
      '<button type="button" class="btn btn-outline" id="auditClear" style="margin-left:.6rem">Clear local log</button>' +
      '<div style="overflow-x:auto;margin-top:1rem"><table><thead><tr><th>When</th><th>Document</th><th>Name</th><th>Email</th><th>Company</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + esc(r.timestampLocal) + '</td><td>' + esc(r.document) + '</td><td>' + esc(r.name) + '</td><td>' + esc(r.email) + '</td><td>' + esc(r.company) + '</td></tr>'; }).join("") +
      '</tbody></table></div>';
    inner.innerHTML = t; panel.hidden = false;
    $("#auditCsv").addEventListener("click", function () {
      var blob = new Blob([toCSV(rows)], { type: "text/csv" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "amin-signature-log.csv";
      document.body.appendChild(a); a.click(); a.remove();
    });
    $("#auditClear").addEventListener("click", function () {
      if (confirm("Clear the locally stored signature log on this device? (This does not affect any central log.)")) {
        localStorage.removeItem(LOG_KEY); renderAudit();
      }
    });
  }
  if (location.hash === "#audit") renderAudit();
  window.addEventListener("hashchange", function () { if (location.hash === "#audit") renderAudit(); });
})();
