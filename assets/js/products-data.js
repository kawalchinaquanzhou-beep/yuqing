/* ============================================================
   YUQING — product data (managed via admin.html)
   ------------------------------------------------------------
   This file is the single source of truth for the catalog.
   admin.html rewrites it through the GitHub API; Cloudflare
   Pages redeploys automatically on every commit.
   Format must stay valid JSON between the markers so the
   admin page can parse it.
   ============================================================ */

/* ---------- Category tree (from 产品分类收集表, English only) ---------- */
const CATEGORY_TREE = {
  faucets: {
    label: "Faucets",
    subs: ["Kitchen Faucets", "Bathtub Faucets", "Basin Faucets", "Shower Faucets", "Toilet Faucets", "Washing Machine Faucets", "Delayed Action Faucets"]
  },
  "toilets-accessories": {
    label: "Toilets & Accessories",
    subs: ["Smart Toilets", "One-piece Toilets", "Two-piece Toilets", "Squatting Pans", "Wall-hung Toilets", "Toilet Seats", "Toilet Tanks", "Toilet Fill Valves", "Flush Valves", "Urinals Valves"]
  },
  "bathroom-vanities": {
    label: "Bathroom Vanities",
    subs: ["Solid Wood Vanities", "PU Paint Vanities", "Stainless Steel Vanities", "Aluminum Vanities", "Aviation Panel Vanities"]
  },
  "sinks-drainage": {
    label: "Sinks & Drainage",
    subs: ["Kitchen Sinks", "Floor Drains", "Basin Drainage", "Kitchen Drainage"]
  },
  "plumbing-shower": {
    label: "Plumbing & Shower Accessories",
    subs: ["Shower Head Sets", "Shower Heads", "Angle Valves", "Hoses"]
  }
};

/* ---------- PRODUCT-DATA-START ---------- */
const PRODUCTS = [
  {
    "slug": "oslo-60-vanity",
    "name": "Oslo 60\" Floating Bathroom Vanity",
    "cat": "bathroom-vanities",
    "catLabel": "Bathroom Vanities",
    "sub": "Solid Wood Vanities",
    "price": 899,
    "img": "assets/images/product-vanity.jpg",
    "badge": "Featured",
    "desc": "Wall-mounted walnut vanity with ceramic countertop basin and soft-close drawers."
  },
  {
    "slug": "nord-40-vanity",
    "name": "Nord 40\" Compact Vanity",
    "cat": "bathroom-vanities",
    "catLabel": "Bathroom Vanities",
    "sub": "PU Paint Vanities",
    "price": 599,
    "img": "assets/images/product-vanity.jpg",
    "badge": "",
    "desc": "Space-saving design for smaller bathrooms, matte oak finish with white ceramic sink."
  },
  {
    "slug": "sfera-smart-toilet",
    "name": "Sfera ONE Smart Toilet",
    "cat": "toilets-accessories",
    "catLabel": "Toilets & Accessories",
    "sub": "Smart Toilets",
    "price": 1290,
    "img": "assets/images/product-smart-toilet.jpg",
    "badge": "New",
    "desc": "Tankless bidet toilet with heated seat, warm-water wash, and auto open/close lid."
  },
  {
    "slug": "rainfall-pro-shower-set",
    "name": "RainFall Pro Shower Set",
    "cat": "plumbing-shower",
    "catLabel": "Plumbing & Shower Accessories",
    "sub": "Shower Head Sets",
    "price": 349,
    "img": "assets/images/product-shower-set.jpg",
    "badge": "",
    "desc": "12\" matte black rainfall head, handheld sprayer, and thermostatic mixer valve."
  },
  {
    "slug": "lume-basin-faucet",
    "name": "Lume Basin Faucet — Brushed Gold",
    "cat": "faucets",
    "catLabel": "Faucets",
    "sub": "Basin Faucets",
    "price": 129,
    "img": "assets/images/product-faucet.jpg",
    "badge": "",
    "desc": "Single-handle solid brass faucet with PVD brushed gold finish and ceramic cartridge."
  }
];
/* ---------- PRODUCT-DATA-END ---------- */
