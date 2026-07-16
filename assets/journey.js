/* ============================================================
   AMIN REALTY, INC. — "The Journey" scrollytelling (homepage)
   ------------------------------------------------------------
   Pins the #journeyStage and scrubs a 4-scene cinematic story
   with GSAP ScrollTrigger (self-hosted in assets/vendor/).

   Progressive enhancement, three layers deep:
     • prefers-reduced-motion → never initializes (static section)
     • GSAP missing/failed    → never initializes (static section)
     • no JavaScript at all   → the markup already reads top-to-bottom
   The static section shows all four steps stacked with scene 1 art.
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stage = document.getElementById("journeyStage");
  if (!stage || reduce || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  var section = stage.closest(".journey");
  if (section) section.classList.add("journey-on");

  // Prepare every .draw path/line for a draw-on animation.
  stage.querySelectorAll(".draw").forEach(function (el) {
    var len = 0;
    try { len = el.getTotalLength(); } catch (e) { /* non-geometry element */ }
    if (len) {
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
    }
  });

  var steps = gsap.utils.toArray(".jstep");
  var scenes = gsap.utils.toArray(".jscene");
  var bar = document.getElementById("journeyBar");

  gsap.set(scenes, { autoAlpha: 0 });
  gsap.set(scenes[0], { autoAlpha: 1 });
  gsap.set(steps, { autoAlpha: 0, y: 34 });

  var tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: "+=280%",
      scrub: 0.6,
      pin: true,
      anticipatePin: 1
    }
  });

  if (bar) tl.to(bar, { scaleX: 1, duration: steps.length, ease: "none" }, 0);

  steps.forEach(function (step, i) {
    var at = i; // one timeline unit per scene
    tl.to(step, { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }, at);
    if (i > 0) tl.to(scenes[i], { autoAlpha: 1, duration: 0.2 }, at);

    // Amount-based staggers so every scene finishes building before its
    // outro at +0.8, no matter how many elements it contains.
    var draws = scenes[i].querySelectorAll(".draw");
    if (draws.length) tl.to(draws, { strokeDashoffset: 0, duration: 0.4, stagger: { amount: 0.2 }, ease: "power1.inOut" }, at + 0.05);

    var pops = scenes[i].querySelectorAll(".pop");
    if (pops.length) tl.fromTo(pops,
      { autoAlpha: 0, scale: 0.4, transformOrigin: "center" },
      { autoAlpha: 1, scale: 1, duration: 0.25, stagger: { amount: 0.25 }, ease: "back.out(1.8)" }, at + 0.25);

    if (i < steps.length - 1) {
      tl.to(step, { autoAlpha: 0, y: -26, duration: 0.2, ease: "power2.in" }, at + 0.8);
      tl.to(scenes[i], { autoAlpha: 0, duration: 0.18 }, at + 0.82);
    }
  });
})();
