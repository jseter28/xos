/* ============================================================
   XOS Coaching — cinematic.js
   (1) Chapter reveal via IntersectionObserver
   No libraries. All motion behind prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- (1) Chapter reveal ---------- */
  function initReveal() {
    var chapters = document.querySelectorAll(".ch");
    if (!chapters.length) return;

    // No IO or reduced motion: reveal everything immediately.
    if (reduceMotion || !("IntersectionObserver" in window)) {
      chapters.forEach(function (ch) { ch.classList.add("in-view"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target); // reveal once, never remove
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });

    chapters.forEach(function (ch) { io.observe(ch); });
  }

  function init() { initReveal(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
