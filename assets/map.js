/* ============================================================
   AMIN REALTY, INC. — "Nationwide Reach" interactive map
   ------------------------------------------------------------
   Plots every listing in assets/listings.js that has lat/lng as
   a glowing pin on the homepage map. Add coordinates to add a
   pin; remove them (or the listing) to remove it — nothing else
   to maintain. Hover/focus a pin for the property card; click it
   to jump to that listing in the Featured Listings section.

   The projection matches the Albers USA map the SVG was built
   with (continental US; parallels 29.5/45.5, center 96.6W/38.7N).
   ============================================================ */
(function () {
  "use strict";
  var frame = document.getElementById("mapFrame");
  var pinsWrap = document.getElementById("mapPins");
  var tip = document.getElementById("mapTip");
  var readout = document.getElementById("mapReadoutText");
  if (!frame || !pinsWrap) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var listings = (window.AMIN_LISTINGS || []).filter(function (l) {
    return typeof l.lat === "number" && typeof l.lng === "number";
  });
  var HQ = { lat: 29.6197, lng: -95.6349, label: "Headquarters — Sugar Land, TX" };
  var section = document.getElementById("reach");
  if (!listings.length) { if (section) section.hidden = true; return; }

  /* ---- Albers projection (exact port of the map's projection) ---- */
  var W = 960, H = 500;
  function project(lon, lat) {
    var rad = Math.PI / 180;
    var p1 = 29.5 * rad, p2 = 45.5 * rad;
    var n = (Math.sin(p1) + Math.sin(p2)) / 2;
    var C = Math.cos(p1) * Math.cos(p1) + 2 * n * Math.sin(p1);
    var r0 = Math.sqrt(C) / n;
    function raw(lam, phi) {
      var r = Math.sqrt(C - 2 * n * Math.sin(phi)) / n;
      return [r * Math.sin(lam * n), r0 - r * Math.cos(lam * n)];
    }
    var c = raw(-0.6 * rad, 38.7 * rad);
    var pt = raw((lon + 96) * rad, lat * rad);
    return [480 + 1070 * (pt[0] - c[0]), 250 - 1070 * (pt[1] - c[1])];
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"]/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c];
    });
  }
  function fmtCoord(l) {
    return Math.abs(l.lat).toFixed(2) + "°" + (l.lat >= 0 ? "N" : "S") +
      " · " + Math.abs(l.lng).toFixed(2) + "°" + (l.lng >= 0 ? "E" : "W");
  }

  /* ---- compute positions, then gently spread overlapping pins ---- */
  var pts = listings.map(function (l) {
    var xy = project(l.lng, l.lat);
    return { l: l, x: xy[0], y: xy[1] };
  });
  var MIN = 26; // map units; keeps 26px buttons from overlapping at typical widths
  for (var pass = 0; pass < 40; pass++) {
    var moved = false;
    for (var i = 0; i < pts.length; i++) {
      for (var k = 0; k < i; k++) {
        var dx = pts[i].x - pts[k].x, dy = pts[i].y - pts[k].y;
        var d = Math.sqrt(dx * dx + dy * dy) || 0.001;
        if (d < MIN) {
          var push = (MIN - d) / 2 + 0.2;
          var ux = dx / d, uy = dy / d;
          if (d < 0.01) { ux = Math.cos(i * 2.4); uy = Math.sin(i * 2.4); }
          pts[i].x += ux * push; pts[i].y += uy * push;
          pts[k].x -= ux * push; pts[k].y -= uy * push;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }

  var defaultReadout = pts.length + " active " + (pts.length === 1 ? "market" : "markets") +
    " · HQ Sugar Land, TX";
  if (readout) readout.textContent = defaultReadout;

  function showTip(p, pinEl) {
    if (!tip) return;
    var st = String(p.l.status || "").toLowerCase().replace(/\s+/g, "-");
    tip.innerHTML =
      '<span class="map-tip-status status-' + esc(st) + '">' + esc(p.l.status) + "</span>" +
      '<strong>' + esc(String(p.l.title).replace(/&amp;/g, "&")) + "</strong>" +
      '<span class="map-tip-meta">' + esc(p.l.priceLabel) + " · " + esc(p.l.location) + "</span>";
    tip.hidden = false;
    // place near the pin, flipping when close to an edge
    var xPct = p.x / W * 100, yPct = p.y / H * 100;
    tip.style.left = Math.min(Math.max(xPct, 12), 88) + "%";
    tip.style.top = yPct + "%";
    tip.classList.toggle("below", yPct < 24);
    if (readout) readout.textContent = fmtCoord(p.l) + " — " + p.l.location;
  }
  function hideTip() {
    if (tip) tip.hidden = true;
    if (readout) readout.textContent = defaultReadout;
  }

  pts.forEach(function (p, idx) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "map-pin";
    b.style.left = (p.x / W * 100) + "%";
    b.style.top = (p.y / H * 100) + "%";
    if (!reduceMotion) b.style.setProperty("--pd", ((idx % 6) * 0.45).toFixed(2) + "s");
    b.setAttribute("aria-label",
      String(p.l.title).replace(/&amp;/g, "and") + " — " + p.l.location + ". " +
      p.l.priceLabel + ", " + p.l.status + ". Show this listing.");
    b.addEventListener("mouseenter", function () { showTip(p, b); });
    b.addEventListener("focus", function () { showTip(p, b); });
    b.addEventListener("mouseleave", hideTip);
    b.addEventListener("blur", hideTip);
    b.addEventListener("click", function () {
      var search = document.getElementById("filterSearch");
      var listSection = document.getElementById("listings");
      if (search) {
        // clear other filters so the chosen listing is always visible
        ["filterType", "filterStatus", "filterPrice"].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) { el.value = ""; el.dispatchEvent(new Event("change")); }
        });
        search.value = String(p.l.title).replace(/&amp;/g, "and");
        search.dispatchEvent(new Event("input"));
      }
      if (listSection) listSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
    pinsWrap.appendChild(b);
  });

  /* HQ star (decorative; the office address is in Contact) */
  var hqXY = project(HQ.lng, HQ.lat);
  var hq = document.createElement("span");
  hq.className = "map-hq";
  hq.setAttribute("aria-hidden", "true");
  hq.title = HQ.label;
  hq.style.left = (hqXY[0] / W * 100) + "%";
  hq.style.top = (hqXY[1] / H * 100 + 4.5) + "%";
  hq.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.6 6.2 6.7.5-5.1 4.4 1.6 6.6L12 16l-5.8 3.7 1.6-6.6-5.1-4.4 6.7-.5z"/></svg><i>HQ</i>';
  pinsWrap.appendChild(hq);
})();
