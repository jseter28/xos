/* ============================================================
   XOS Coaching — cinematic.js
   (1) Chapter reveal via IntersectionObserver
   (2) Canvas gold light-beams in CH0 (Arrival)
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

  /* ---------- (2) Canvas light-beams ---------- */
  function initBeams() {
    var canvas = document.getElementById("beams");
    if (!canvas) return;

    var ctx = canvas.getContext && canvas.getContext("2d");

    // Reduced motion or no canvas: static gradient fallback, no rAF.
    if (reduceMotion || !ctx) {
      if (canvas.parentNode) {
        var fb = document.createElement("div");
        fb.className = "beams-fallback";
        canvas.parentNode.insertBefore(fb, canvas);
      }
      canvas.style.display = "none";
      return;
    }

    var dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    var W = 0, H = 0, horizonY = 0;
    var beams = [];

    function makeBeams() {
      var count = Math.max(12, Math.min(20, Math.round(W / 90)));
      beams = [];
      for (var i = 0; i < count; i++) {
        beams.push({
          x: Math.random(),                       // 0..1 across width
          h: 0.18 + Math.random() * 0.42,         // height as fraction of area above horizon
          w: 0.75 + Math.random() * 1.6,          // px width
          base: 0.25 + Math.random() * 0.55,      // base opacity
          drift: (Math.random() - 0.5) * 0.00006, // horizontal drift per ms
          phase: Math.random() * Math.PI * 2,     // flicker phase
          speed: 0.0008 + Math.random() * 0.0012  // flicker speed
        });
      }
    }

    function resize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      horizonY = H * 0.66; // horizon sits at bottom:34%
      makeBeams();
    }

    var last = performance.now();
    function frame(now) {
      if (document.hidden) { rafId = null; return; }
      var dt = Math.min(now - last, 60);
      last = now;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (var i = 0; i < beams.length; i++) {
        var b = beams[i];
        b.x += b.drift * dt;
        if (b.x < -0.05) b.x = 1.05;
        if (b.x > 1.05) b.x = -0.05;
        b.phase += b.speed * dt;

        var flick = 0.65 + 0.35 * Math.sin(b.phase);
        var alpha = b.base * flick;
        var px = b.x * W;
        var topY = horizonY - b.h * horizonY;

        var grad = ctx.createLinearGradient(0, topY, 0, horizonY);
        grad.addColorStop(0, "rgba(245,193,93,0)");
        grad.addColorStop(1, "rgba(245,193,93," + alpha.toFixed(3) + ")");

        ctx.fillStyle = grad;
        ctx.fillRect(px - b.w / 2, topY, b.w, horizonY - topY);
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(frame);
    }

    var rafId = null;
    function start() {
      if (rafId == null && !document.hidden) {
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    }
    function stop() {
      if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; }
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    resize();
    start();
  }

  function init() { initReveal(); initBeams(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
