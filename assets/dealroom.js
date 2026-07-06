/* ============================================================
   AMIN REALTY, INC. — Deal Room (gated listing files)
   ------------------------------------------------------------
   Shared by the homepage and the Listings page. A listing with a
   dealRoom array (see assets/listings.js) gets a "View Deal Room"
   button; the visitor enters first name, last name, and email,
   the access is logged (locally + to AMIN_CONFIG.logEndpoint when
   configured), and the file links are revealed.

   NOTE: this is lead capture and an access record, not security.
   Anything truly sensitive should live behind a real login or be
   sent manually after you review the log.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.AMIN_CONFIG || {};
  var LOG_KEY = "aminSignatureLog"; // same log the document-center signatures use

  var backdrop = document.getElementById("dealBackdrop");
  if (!backdrop) return;

  var modal = document.getElementById("dealModal"),
      form = document.getElementById("dealForm"),
      statusEl = document.getElementById("dealStatus"),
      listingEl = document.getElementById("dealListing"),
      downloadWrap = document.getElementById("dealDownload"),
      firstEl = document.getElementById("dealFirst"),
      lastEl = document.getElementById("dealLast"),
      emailEl = document.getElementById("dealEmail"),
      submitBtn = document.getElementById("dealSubmit"),
      current = null, lastTrigger = null;

  var FILE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"]/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c];
    });
  }
  function focusable() {
    return Array.prototype.slice.call(
      modal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
  }
  function onKey(e) {
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key === "Tab") {
      var f = focusable(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  function open(listing, trigger) {
    if (!listing || !listing.dealRoom || !listing.dealRoom.length) return;
    current = listing; lastTrigger = trigger || null;
    listingEl.textContent = listing.title.replace(/&amp;/g, "&");
    var intro = document.getElementById("dealIntro");
    if (intro) intro.hidden = false;
    form.reset(); form.style.display = "";
    // convenience: prefill from the visitor's last recorded access
    try {
      var log = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
      var mine = log.length ? log[log.length - 1] : null;
      if (mine && mine.email) {
        emailEl.value = mine.email;
        if (mine.firstName) { firstEl.value = mine.firstName; lastEl.value = mine.lastName || ""; }
      }
    } catch (e) { /* ignore */ }
    downloadWrap.hidden = true; downloadWrap.innerHTML = "";
    statusEl.textContent = ""; statusEl.removeAttribute("data-state");
    submitBtn.disabled = false;
    backdrop.classList.add("open"); backdrop.removeAttribute("inert");
    document.body.style.overflow = "hidden";
    setTimeout(function () { firstEl.focus(); }, 60);
    document.addEventListener("keydown", onKey, true);
  }
  function close() {
    backdrop.classList.remove("open"); backdrop.setAttribute("inert", "");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey, true);
    if (lastTrigger) lastTrigger.focus();
  }
  Array.prototype.slice.call(document.querySelectorAll("[data-deal-close]")).forEach(function (b) {
    b.addEventListener("click", close);
  });
  backdrop.addEventListener("mousedown", function (e) { if (e.target === backdrop) close(); });

  function setStatus(msg, state) {
    statusEl.textContent = msg;
    if (state) statusEl.setAttribute("data-state", state); else statusEl.removeAttribute("data-state");
  }
  function fail(msg) { setStatus(msg, "err"); submitBtn.disabled = false; }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function saveLocal(rec) {
    try {
      var arr = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
      arr.push(rec); localStorage.setItem(LOG_KEY, JSON.stringify(arr));
    } catch (e) { /* storage unavailable; remote log still applies */ }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var first = firstEl.value.trim(), last = lastEl.value.trim(), email = emailEl.value.trim();
    if (!first) return fail("Please enter your first name.");
    if (!last) return fail("Please enter your last name.");
    if (!validEmail(email)) return fail("Please enter a valid email address.");

    var fileLinks = current.dealRoom.map(function (f) {
      return { label: f.label, url: new URL(f.file, location.href).href };
    });
    var record = {
      id: "DR-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
      kind: "deal-room",
      document: "Deal room: " + current.title.replace(/&amp;/g, "&"),
      listing: current.title.replace(/&amp;/g, "&"),
      file: fileLinks.map(function (f) { return f.url; }).join(" | "),
      filesJson: JSON.stringify(fileLinks),
      name: first + " " + last, firstName: first, lastName: last,
      email: email, company: "", signature: "",
      agreementVersion: CFG.agreementVersion || "1.0",
      timestamp: new Date().toISOString(),
      timestampLocal: new Date().toLocaleString(),
      page: location.href, userAgent: navigator.userAgent
    };
    saveLocal(record);
    setStatus("Checking you in…");
    submitBtn.disabled = true;

    var endpoint = CFG.logEndpoint || "";
    if (endpoint) {
      var fd = new FormData();
      Object.keys(record).forEach(function (k) { fd.append(k, record[k]); });
      if (CFG.web3formsKey) fd.append("access_key", CFG.web3formsKey);
      fd.append("_subject", "Deal room access: " + record.document + " — " + record.name);
      fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error("bad"); })
        .then(function () { unlock(record, null, CFG.sendsConfirmationEmail === true); })
        .catch(function () {
          if (CFG.requireRemoteLog) fail("We couldn't record your access just now. Please try again, or email " + (CFG.contactEmail || "us") + ".");
          else unlock(record, "Saved locally — the central log could not be reached.");
        });
    } else if (CFG.requireRemoteLog) {
      fail("The deal room is temporarily unavailable (access logging is being configured). Please contact " + (CFG.contactEmail || "us") + ".");
    } else {
      unlock(record, "Recorded in this browser only — set a log endpoint in assets/config.js for a central record.");
    }
  });

  function unlock(record, warn, emailed) {
    setStatus("Welcome, " + record.firstName + " — the deal room is open.", "ok");
    var intro = document.getElementById("dealIntro");
    if (intro) intro.hidden = true;
    form.style.display = "none";
    downloadWrap.hidden = false;
    downloadWrap.innerHTML =
      '<p class="deal-note">Your access was logged on ' + esc(record.timestampLocal) + '. These materials are confidential and may not be shared.</p>' +
      (emailed ? '<p class="deal-note deal-emailed">A confirmation email with these links has been sent to <strong>' + esc(record.email) + '</strong>.</p>' : '') +
      (warn ? '<p class="fineprint deal-warn">⚠ ' + esc(warn) + '</p>' : '') +
      '<ul class="deal-files">' +
      current.dealRoom.map(function (f) {
        return '<li><a href="' + encodeURI(f.file) + '" download target="_blank" rel="noopener">' + FILE + '<span>' + esc(f.label) + '</span>' + ARROW + '</a></li>';
      }).join("") +
      '</ul>' +
      '<div class="modal-foot"><button type="button" class="btn btn-outline" data-deal-close>Close</button></div>';
    Array.prototype.slice.call(downloadWrap.querySelectorAll("[data-deal-close]")).forEach(function (b) {
      b.addEventListener("click", close);
    });
    var firstLink = downloadWrap.querySelector(".deal-files a");
    if (firstLink) firstLink.focus();
  }

  window.AMIN_DEAL_ROOM = { open: open, close: close };
})();
