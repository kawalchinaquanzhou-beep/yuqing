/* ============================================================
   YUQING — site config & interactions
   ------------------------------------------------------------
   This site is a product SHOWCASE (no online payments).
   All quote buttons link to WhatsApp (wa.me). The two link maps
   below are kept empty as future hooks in case an online
   checkout is ever added:
   - PAYMENT_LINKS / PAYPAL_LINKS: payment links per product slug
   ============================================================ */

const SITE_CONFIG = {
  WHATSAPP_NUMBER: "8618359563566",           // real number +86 183 5956 3566
  SUPPORT_EMAIL: "kawalchinaquanzhou@gmail.com",
  PHONE_DISPLAY: "+86 183 5956 3566",
  PHONE_TEL: "+8618359563566",
};

const PAYMENT_LINKS = {
  // "oslo-60-vanity":  "https://buy.stripe.com/xxxx",
  // "sfera-smart-toilet": "https://buy.stripe.com/xxxx",
  // ...one entry per product slug
};

const PAYPAL_LINKS = {
  // "oslo-60-vanity": "https://paypal.me/yourbrand/899",
};

/* ---------- Category tree & product catalog ----------
   Loaded from assets/js/products-data.js (managed via admin.html).
   Pages that render the grid must load products-data.js before main.js. */

/* ---------- Nav toggle (mobile) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Wire WhatsApp floating button with configured number
  document.querySelectorAll("[data-wa-link]").forEach((el) => {
    const n = SITE_CONFIG.WHATSAPP_NUMBER;
    el.href = n && !n.startsWith("000")
      ? `https://wa.me/${n}?text=${encodeURIComponent("Hi! I'm interested in your bathroom products.")}`
      : "#";
  });

  // Wire buy buttons on product cards / PDP
  document.querySelectorAll("[data-buy]").forEach((btn) => {
    const slug = btn.dataset.buy;
    const stripe = PAYMENT_LINKS[slug];
    const paypal = PAYPAL_LINKS[slug];
    const role = btn.dataset.buyType; // "stripe" | "paypal"
    const link = role === "paypal" ? paypal : stripe;
    if (link) {
      btn.href = link;
      btn.target = "_blank";
      btn.rel = "noopener";
    } else {
      // No link configured yet — route to inquiry so no sale is lost
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = `contact.html?product=${encodeURIComponent(slug)}`;
      });
    }
  });

  // Render product grid (products.html) with two-level dropdown filter
  const grid = document.getElementById("product-grid");
  if (grid) {
    const catSel = document.getElementById("filter-cat");
    const subSel = document.getElementById("filter-sub");
    const countEl = document.getElementById("filter-count");

    const render = (items) => {
      if (countEl) countEl.textContent = `${items.length} product${items.length === 1 ? "" : "s"}`;
      if (!items.length) {
        grid.innerHTML = `<p class="empty-state" style="grid-column:1/-1;text-align:center;color:var(--ink-soft);padding:3rem 0">No products in this category yet — <a href="contact.html">send us an inquiry</a> and we'll source it for you.</p>`;
        return;
      }
      grid.innerHTML = items
        .map(
          (p) => `
        <article class="prod-card">
          <a class="thumb" href="product/${p.slug}.html">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
          </a>
          <div class="body">
            <span class="cat">${p.catLabel}${p.sub ? " · " + p.sub : ""}</span>
            <h3><a href="product/${p.slug}.html">${p.name}</a></h3>
            <p style="font-size:.9rem;color:var(--ink-soft)">${p.desc}</p>
            <span class="price">$${p.price.toLocaleString()}</span>
          </div>
        </article>`
        )
        .join("");
    };

    const apply = () => {
      const cat = catSel ? catSel.value : "all";
      const sub = subSel ? subSel.value : "all";
      let items = PRODUCTS;
      if (cat !== "all") items = items.filter((p) => p.cat === cat);
      if (sub !== "all") items = items.filter((p) => p.sub === sub);
      render(items);
    };

    // Rebuild level-2 options based on level-1 choice
    const fillSubs = (catSlug, keep) => {
      if (!subSel) return;
      let subs = [];
      if (catSlug !== "all") {
        subs = (CATEGORY_TREE[catSlug] && CATEGORY_TREE[catSlug].subs) || [];
        // merge any extra subs that exist only in product data
        PRODUCTS.filter((p) => p.cat === catSlug).forEach((p) => {
          if (p.sub && !subs.includes(p.sub)) subs = subs.concat(p.sub);
        });
      }
      subSel.innerHTML =
        `<option value="all">${catSlug === "all" ? "All Sub-categories" : "All sub-categories"}</option>` +
        subs.map((s) => `<option value="${s}"${s === keep ? " selected" : ""}>${s}</option>`).join("");
    };

    if (catSel) {
      // Level-1 options: spreadsheet tree first, then any catalog-only categories
      const treeCats = Object.keys(CATEGORY_TREE);
      const extraCats = [...new Set(PRODUCTS.map((p) => p.cat))].filter((c) => !treeCats.includes(c));
      catSel.innerHTML =
        `<option value="all">All Categories</option>` +
        treeCats.map((k) => `<option value="${k}">${CATEGORY_TREE[k].label}</option>`).join("") +
        extraCats
          .map((k) => {
            const sample = PRODUCTS.find((p) => p.cat === k);
            return `<option value="${k}">${sample ? sample.catLabel : k}</option>`;
          })
          .join("");

      // Deep-link support: products.html?cat=bathroom-vanities
      const urlCat = new URLSearchParams(location.search).get("cat");
      if (urlCat) catSel.value = urlCat;
      fillSubs(catSel.value);

      catSel.addEventListener("change", () => {
        fillSubs(catSel.value);
        apply();
      });
      if (subSel) subSel.addEventListener("change", apply);
      apply();
    } else {
      render(PRODUCTS);
    }
  }

  // Auto year in footer
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
});

/* ============================================================
   PREMIUM MOTION — scroll reveals, nav state, damped parallax
   (skipped entirely when user prefers reduced motion)
   ============================================================ */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const REVEAL_SELECTOR =
    ".section-head, .feature, .prod-card, .cat-card, .pdp-gallery, .pdp-info, .prose, .cta-band > .container, .trust-grid > div, .filter-bar, .form-grid, .curtain, .editorial-text, .banner-content, .stats > div";

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  function markReveals(root = document) {
    root.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
      if (el.classList.contains("reveal") || el.classList.contains("watch")) return;
      // curtain blocks use their own mask-wipe mechanic — observe only, no translateY
      el.classList.add(el.classList.contains("curtain") ? "watch" : "reveal");
      // stagger siblings inside the same parent for a choreographed feel
      const siblings = [...el.parentElement.children].filter(
        (c) => c.classList.contains("reveal") || c.classList.contains("watch")
      );
      el.style.setProperty("--reveal-delay", `${(siblings.indexOf(el) % 6) * 0.09}s`);
      io.observe(el);
    });
  }
  markReveals();

  // product grid re-renders on filter click → re-mark new cards
  const grid = document.getElementById("product-grid");
  if (grid) {
    new MutationObserver(() => markReveals(grid)).observe(grid, { childList: true });
  }

  // header: frosted + compressed once the page scrolls
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // hero: damped parallax — content drifts down & fades as you scroll,
  // smoothed with a lerp loop so movement feels weighted, not glued
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    let target = 0;
    let current = 0;
    let raf = null;
    const loop = () => {
      current += (target - current) * 0.08; // damping factor
      heroContent.style.transform = `translateY(${current * 0.3}px)`;
      heroContent.style.opacity = String(Math.max(0, 1 - current / 640));
      if (Math.abs(target - current) > 0.15) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };
    window.addEventListener(
      "scroll",
      () => {
        target = window.scrollY;
        if (raf === null) raf = requestAnimationFrame(loop);
      },
      { passive: true }
    );
  }
})();

/* ============================================================
   INERTIAL SMOOTH SCROLL — Lenis from CDN (the damping core).
   Gives the whole page weighted, glide-like scrolling.
   Silently degrades to native scroll if CDN is unavailable.
   ============================================================ */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/lenis@1.3.14/dist/lenis.min.js";
  s.onload = () => {
    if (!window.Lenis) return;
    try {
      const lenis = new Lenis({
        lerp: 0.07,          // lower = heavier, more damped glide
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      document.documentElement.style.scrollBehavior = "auto"; // Lenis owns smoothing now
      window.__lenis = lenis;
      (function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      })(performance.now());
    } catch (e) {
      /* keep native scroll */
    }
  };
  s.onerror = () => {}; // offline / blocked CDN → native scroll, no errors
  document.head.appendChild(s);
})();

/* ============================================================
   DAMPED PARALLAX — any element with [data-speed] drifts at a
   fraction of scroll speed, smoothed by a lerp loop.
   data-speed ~0.08 subtle · 0.18 strong
   ============================================================ */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const els = [...document.querySelectorAll("[data-speed]")];
  if (!els.length) return;
  const current = els.map(() => 0);
  function update() {
    const vh = window.innerHeight;
    els.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2 - vh / 2;
      const target = -mid * parseFloat(el.dataset.speed || "0.12");
      current[i] += (target - current[i]) * 0.085; // damping factor
      el.style.transform = `translate3d(0, ${current[i].toFixed(2)}px, 0)`;
    });
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
})();
