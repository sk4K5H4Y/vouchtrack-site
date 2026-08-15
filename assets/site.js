/* VouchTrack — shared behaviors (progressive enhancement only).
   Everything motion-related respects prefers-reduced-motion. */
(function () {
  "use strict";

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header shadow on scroll (not motion; always on) ---------- */
  var header = document.querySelector("header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Nav dropdowns (functional — runs regardless of motion pref) ---------- */
  var menuItems = document.querySelectorAll(".nav-links li.has-menu");
  menuItems.forEach(function (li) {
    var trigger = li.querySelector(".menu-trigger");
    if (!trigger) return;
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", function (ev) {
      // On narrow screens the trigger opens the submenu instead of navigating.
      if (window.innerWidth > 820) return;
      ev.preventDefault();
      var isOpen = li.classList.toggle("open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  // Close any open desktop menu on Escape.
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    menuItems.forEach(function (li) {
      li.classList.remove("open");
      var t = li.querySelector(".menu-trigger");
      if (t) {
        t.setAttribute("aria-expanded", "false");
        if (li.contains(document.activeElement)) t.focus();
      }
    });
  });

  /* ---------- Copyable prompt boxes ---------- */
  document.querySelectorAll(".prompt-copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.querySelector(btn.getAttribute("data-copy"));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.textContent.trim()).then(function () {
        var original = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 2000);
      });
    });
  });

  /* ---------- CTA events for GTM (data-cta / data-loc) ---------- */
  document.addEventListener("click", function (ev) {
    var el = ev.target && ev.target.closest ? ev.target.closest("[data-cta]") : null;
    if (!el) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cta_click",
      ctaType: el.getAttribute("data-cta"),
      ctaLoc: el.getAttribute("data-loc") || ""
    });
  });

  /* ---------- Sticky mobile CTA (homepage) ---------- */
  var sticky = document.getElementById("sticky-cta");
  if (sticky) {
    sticky.hidden = false;
    document.body.classList.add("has-sticky");
    var stickyTick = function () {
      sticky.classList.toggle("on", window.scrollY > 620);
    };
    window.addEventListener("scroll", stickyTick, { passive: true });
    stickyTick();
  }

  if (reduce || !("IntersectionObserver" in window)) return;

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".card, .post-card, .stat, .step, .site-cat, .vt-item, .tn-panel, .sk-panel"
  );
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("rv-in");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );
  revealTargets.forEach(function (el, i) {
    // Stagger siblings slightly within their row.
    var idx = 0, sib = el;
    while ((sib = sib.previousElementSibling) && idx < 5) idx++;
    el.style.transitionDelay = Math.min(idx * 70, 280) + "ms";
    el.classList.add("rv");
    io.observe(el);
  });

  /* ---------- Number helpers ---------- */
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function animateNumber(el, from, to, ms, fmt) {
    var t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / ms, 1);
      el.textContent = fmt(from + (to - from) * ease(p));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Stat count-ups (simple numeric stats only) ---------- */
  var statRe = /^(\$?)(\d{1,4})(%|\+)?$/;
  var bigs = document.querySelectorAll(".stat .big");
  var statIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        statIO.unobserve(e.target);
        var m = e.target.textContent.trim().match(statRe);
        if (!m) return;
        var pre = m[1] || "", val = parseInt(m[2], 10), suf = m[3] || "";
        if (!val) return;
        animateNumber(e.target, 0, val, 900, function (v) {
          return pre + Math.round(v) + suf;
        });
      });
    },
    { threshold: 0.4 }
  );
  bigs.forEach(function (el) { statIO.observe(el); });

  /* ---------- Hero duel: before/after results card (homepage) ---------- */
  var duel = document.getElementById("duel");
  if (duel) {
    var FRAME = document.getElementById("duel-frame");
    var paused = false;
    duel.addEventListener("mouseenter", function () { paused = true; });
    duel.addEventListener("mouseleave", function () { paused = false; });

    var SCENES = [
      {
        mode: "pack", loc: "Chattanooga, TN", q: "dentist near me",
        you: { name: "Riverbend Family Dental", cat: "Family & Cosmetic Dentistry",
               sub: "0.4 mi &middot; <b class=\"d-open\">Open now</b> &middot; (423) 555-0148",
               img: "dentist", init: "R", pct: 96 },
        before: [
          { name: "Scenic City Smiles", pct: 92, meta: "4.6 (180) &middot; Dentist", sub: "1.2 mi &middot; Open now", t: 1, init: "S" },
          { name: "Lookout Family Dentistry", pct: 90, meta: "4.5 (143) &middot; Dentist", sub: "2.0 mi &middot; Closes 5 PM", t: 2, init: "L" },
          { name: "Market Street Dental", pct: 88, meta: "4.4 (97) &middot; Dentist", sub: "0.8 mi &middot; Open now", t: 3, init: "M" }
        ]
      },
      {
        mode: "ai", brand: "ChatGPT", skin: "dp-gpt", glyph: "\u25CF",
        q: "Best plumber in Des Moines? Give me your top three.",
        introBefore: "Here are three well-reviewed options:",
        introAfter: "Here are the three I'd call first:",
        you: { name: "Cedar Ridge Plumbing", why: "praised for fast response and clear pricing", img: "plumber", init: "C" },
        before: ["Capitol Drain & Pipe", "Two Rivers Plumbing Co.", "Ingersoll Pipeworks"]
      },
      {
        mode: "ai", brand: "Perplexity", skin: "dp-pplx", glyph: "\u25C9",
        q: "best hair salon in Greenville, SC",
        introBefore: "Based on recent reviews, three stand out:",
        introAfter: "Based on recent reviews, one clearly leads:",
        you: { name: "Studio Marlowe", why: "top rated on Google and Booksy, every review answered", img: "salon", init: "S" },
        before: ["The Gilded Comb", "Main & Vine Salon", "Falls Park Hair Co."]
      },
      {
        mode: "ai", brand: "Gemini", skin: "dp-gem", glyph: "\u2726",
        q: "Who should I call for AC repair in Tulsa?",
        introBefore: "Three companies come up consistently:",
        introAfter: "One company stands out right now:",
        you: { name: "Prairie Air Heating & Cooling", why: "complete profile and fast, personal replies", img: "hvac", init: "P" },
        before: ["Route 66 Air Co.", "Redbud Heating & Cooling", "Greenline Mechanical"]
      }
    ];

    var CHIP = "<div class=\"d-chip\"><span class=\"d-chip-star\" aria-hidden=\"true\">\u2605</span>+87 reviews in 6 months &middot; every review answered &middot; profile complete</div>";

    function thumb(img, init, cls) {
      return "<span class=\"d-thumb " + (cls || "") + "\">" +
        (img ? "<img src=\"/assets/hero/" + img + ".jpg\" alt=\"\" onerror=\"this.remove()\">" : "") +
        "<span class=\"d-init\">" + init + "</span></span>";
    }

    function packRow(r, isYou) {
      if (isYou) {
        return "<li class=\"d-row d-you-row\">" + thumb(r.img, r.init) +
          "<span class=\"d-main\"><span class=\"d-name\">" + r.name +
          " <span class=\"d-badge\">Recommended</span></span>" +
          "<span class=\"d-meta\"><span class=\"d-stars\"><i></i></span> <b>4.8</b> (<span class=\"d-cnt\">47</span>) &middot; " + r.cat + "</span>" +
          "<span class=\"d-sub\">" + r.sub + "</span></span></li>";
      }
      return "<li class=\"d-row\">" + thumb(null, r.init, "d-tile d-t" + r.t) +
        "<span class=\"d-main\"><span class=\"d-name\">" + r.name + "</span>" +
        "<span class=\"d-meta\"><span class=\"d-stars\"><i style=\"width:" + r.pct + "%\"></i></span> " + r.meta + "</span>" +
        "<span class=\"d-sub\">" + r.sub + "</span></span></li>";
    }

    function aiRow(name, i) {
      return "<li class=\"d-row\"><span class=\"d-rank\">" + (i + 1) + "</span>" +
        "<span class=\"d-main\"><span class=\"d-name\">" + name + "</span></span></li>";
    }

    function aiYouRow(you) {
      return "<li class=\"d-row d-you-row\"><span class=\"d-rank\">1</span>" +
        thumb(you.img, you.init, "d-avatar") +
        "<span class=\"d-main\"><span class=\"d-name\">" + you.name +
        " <span class=\"d-badge\">Recommended</span></span>" +
        "<span class=\"d-why\"><span class=\"d-stars\"><i></i></span> <b>4.8</b> (<span class=\"d-cnt\">47</span> reviews), " + you.why + "</span></span></li>";
    }

    function strip(name, word) {
      return "<div class=\"d-strip\"><span class=\"d-strip-label\">Your business: " + name + "</span><b>" + word + "</b></div>";
    }

    function head(sc) {
      if (sc.mode === "pack") {
        return "<div class=\"duel-head dh-google\"><span class=\"d-search\">" +
          "<span class=\"d-glass\" aria-hidden=\"true\">\u26B2</span><span class=\"d-q\" id=\"d-q\"></span><span class=\"d-cursor\" id=\"d-cursor\"></span></span>" +
          "<span class=\"d-loc\">" + sc.loc + "</span></div>";
      }
      return "<div class=\"duel-head dh-" + sc.skin.slice(3) + "\"><span><span class=\"d-glyph\" aria-hidden=\"true\">" + sc.glyph + "</span>" +
        "<span class=\"d-brand\">" + sc.brand + "</span></span></div>";
    }

    function wait(ms, cb) {
      var left = ms;
      (function step() {
        if (!paused) left -= 80;
        if (left <= 0) return cb();
        setTimeout(step, 80);
      })();
    }

    function typeInto(el, cur, text, cb) {
      var i = 0;
      el.textContent = "";
      if (cur) cur.hidden = false;
      (function tick() {
        if (paused) return setTimeout(tick, 120);
        if (i <= text.length) {
          el.textContent = text.slice(0, i); i++;
          setTimeout(tick, 24);
        } else {
          if (cur) cur.hidden = true;
          cb();
        }
      })();
    }

    function stagger(els, gap, cb) {
      els.forEach(function (el, i) {
        setTimeout(function () { el.classList.add("d-in"); }, 140 + i * gap);
      });
      wait(140 + els.length * gap + 120, cb);
    }

    function playScene(idx) {
      var sc = SCENES[idx % SCENES.length];
      duel.classList.add("out");
      setTimeout(function () {
        duel.className = "duel d-anim" + (sc.mode === "ai" ? " duel-dark " + sc.skin : "");

        var body = "";
        if (sc.mode === "pack") {
          body = "<ol class=\"d-rows\">" + sc.before.map(function (r) { return packRow(r, false); }).join("") +
            "</ol>" + strip(sc.you.name, "Not shown");
        } else {
          body = "<div class=\"d-userq\"><span id=\"d-q\"></span><span class=\"d-cursor\" id=\"d-cursor\"></span></div>" +
            "<p class=\"d-intro\">" + sc.introBefore + "</p>" +
            "<ol class=\"d-rows\">" + sc.before.map(aiRow).join("") + "</ol>" +
            strip(sc.you.name, "Not mentioned");
        }
        FRAME.innerHTML = head(sc) + "<div class=\"duel-body\">" + body + "</div>";
        duel.classList.remove("out");

        var qEl = FRAME.querySelector("#d-q");
        var cur = FRAME.querySelector("#d-cursor");

        typeInto(qEl, cur, sc.q, function () {
          var steps = [].slice.call(FRAME.querySelectorAll(".d-intro, .d-row, .d-strip"));
          stagger(steps, 240, function () {
            wait(1900, function () { swapToAfter(sc, idx); });
          });
        });
      }, idx === 0 ? 60 : 360);
    }

    function swapToAfter(sc, idx) {
      var bodyEl = FRAME.querySelector(".duel-body");
      bodyEl.style.opacity = "0";
      setTimeout(function () {
        var body = "";
        if (sc.mode === "pack") {
          body = "<ol class=\"d-rows\">" + packRow(sc.you, true) +
            packRow(sc.before[0], false) + packRow(sc.before[1], false) + "</ol>" + CHIP;
        } else {
          body = "<div class=\"d-userq d-in\">" + sc.q + "</div>" +
            "<p class=\"d-intro\">" + sc.introAfter + "</p>" +
            "<ol class=\"d-rows\">" + aiYouRow(sc.you) +
            aiRow(sc.before[0], 1) + aiRow(sc.before[1], 2) + "</ol>" + CHIP;
        }
        bodyEl.innerHTML = body;
        bodyEl.style.opacity = "";

        var steps = [].slice.call(bodyEl.querySelectorAll(".d-intro, .d-row, .d-chip"));
        stagger(steps, 220, function () {
          var cnt = bodyEl.querySelector(".d-cnt");
          var star = bodyEl.querySelector(".d-you-row .d-stars i");
          if (cnt) animateNumber(cnt, 47, 212, 1000, function (v) { return String(Math.round(v)); });
          if (star) requestAnimationFrame(function () { star.style.width = "96%"; });
          wait(3300, function () { playScene(idx + 1); });
        });
      }, 200);
    }

    var duelPlayed = false;
    var duelIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || duelPlayed) return;
        duelPlayed = true;
        duelIO.unobserve(duel);
        playScene(0);
      });
    }, { threshold: 0.35 });
    duelIO.observe(duel);
  }

  /* ---------- Inbox mockup: approve micro-moment (homepage) ---------- */
  var inbox = document.getElementById("mock-inbox");
  if (inbox) {
    var inboxIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        inboxIO.unobserve(inbox);
        var btn = inbox.querySelector(".mi-approve");
        var posted = inbox.querySelector(".mi-posted");
        setTimeout(function () {
          if (btn) btn.classList.add("pressed");
          setTimeout(function () {
            if (btn) btn.classList.remove("pressed");
            if (posted) posted.hidden = false;
          }, 260);
        }, 1100);
      });
    }, { threshold: 0.5 });
    inboxIO.observe(inbox);
  }

  /* ---------- GBP bar + rank grid micro-reveals (homepage) ---------- */
  var gbpBar = document.querySelector(".mg-bar i");
  if (gbpBar) {
    gbpBar.style.width = "24%";
    var gbpIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        gbpIO.unobserve(e.target);
        requestAnimationFrame(function () { e.target.style.width = "100%"; });
      });
    }, { threshold: 0.6 });
    gbpIO.observe(gbpBar);
  }
  var rankCells = document.querySelectorAll(".rank-grid i");
  if (rankCells.length) {
    rankCells.forEach(function (c) {
      c.style.opacity = "0";
      c.style.transition = "opacity 0.5s ease";
    });
    var gridIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        gridIO.unobserve(e.target);
        rankCells.forEach(function (c, i) {
          setTimeout(function () { c.style.opacity = ""; }, i * 45);
        });
      });
    }, { threshold: 0.5 });
    gridIO.observe(rankCells[0].parentElement);
  }

  /* ---------- Gap bar fills (pillar page) ---------- */
  var fills = document.querySelectorAll(".gb-fill[data-w]");
  if (fills.length) {
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        barIO.unobserve(e.target);
        var w = Math.max(parseFloat(e.target.dataset.w), 1.2);
        requestAnimationFrame(function () { e.target.style.width = w + "%"; });
      });
    }, { threshold: 0.5 });
    fills.forEach(function (el) { barIO.observe(el); });
  }

  /* ---------- Calculator output tick (free-tools pages) ---------- */
  var outs = document.querySelectorAll(".calc-line strong");
  if (outs.length) {
    var mo = new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        var el = m.target.nodeType === 3 ? m.target.parentElement : m.target;
        if (!el || !el.classList) return;
        el.classList.remove("calc-tick");
        void el.offsetWidth; // restart animation
        el.classList.add("calc-tick");
      });
    });
    outs.forEach(function (el) {
      mo.observe(el, { childList: true, characterData: true, subtree: true });
    });
  }
})();
