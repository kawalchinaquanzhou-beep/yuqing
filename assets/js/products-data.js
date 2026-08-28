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
    "slug": "h8357c",
    "name": "H8357C Single-Handle Basin Faucet",
    "cat": "faucets",
    "catLabel": "Faucets",
    "sub": "Basin Faucets",
    "price": 15,
    "img": "assets/images/products/h8357c.png",
    "badge": "",
    "desc": "Single-handle basin faucet in gun grey with a slim flat lever and soft-edged spout.",
    "specs": {
      "Material": "Stainless steel",
      "Cartridge": "Ceramic disc",
      "Fitting": "Single-hole deck mount",
      "Other finishes": "Brushed, Black, Chrome, Brushed gold, Rose gold",
      "Warranty": "5 years"
    }
  },
  {
    "slug": "h8359",
    "name": "H8359 Single-Handle Basin Faucet",
    "cat": "faucets",
    "catLabel": "Faucets",
    "sub": "Basin Faucets",
    "price": 15,
    "img": "assets/images/products/h8359.png",
    "badge": "",
    "desc": "Straight-spout single-handle basin faucet in brushed stainless with a slim lever.",
    "specs": {
      "Material": "Stainless steel",
      "Cartridge": "Ceramic disc",
      "Fitting": "Single-hole deck mount",
      "Other finishes": "Black, Gun grey, Chrome",
      "Warranty": "5 years"
    }
  },
  {
    "slug": "h8360",
    "name": "H8360 Curved-Spout Basin Faucet",
    "cat": "faucets",
    "catLabel": "Faucets",
    "sub": "Basin Faucets",
    "price": 15,
    "img": "assets/images/products/h8360.png",
    "badge": "",
    "desc": "Brushed stainless basin faucet with a gently curved spout and single lever.",
    "specs": {
      "Material": "Stainless steel",
      "Cartridge": "Ceramic disc",
      "Fitting": "Single-hole deck mount",
      "Other finishes": "Black, Gun grey, Chrome",
      "Warranty": "5 years"
    }
  },
  {
    "slug": "h8361",
    "name": "H8361 Square-Body Basin Faucet",
    "cat": "faucets",
    "catLabel": "Faucets",
    "sub": "Basin Faucets",
    "price": 15,
    "img": "assets/images/products/h8361.png",
    "badge": "",
    "desc": "Matte black square-body basin faucet with a flat single lever — clean geometric lines.",
    "specs": {
      "Material": "Stainless steel",
      "Cartridge": "Ceramic disc",
      "Fitting": "Single-hole deck mount",
      "Other finishes": "Brushed, Gun grey, Chrome",
      "Warranty": "5 years"
    }
  },
  {
    "slug": "w055",
    "name": "W055 Swan-Neck Kitchen Faucet",
    "cat": "faucets",
    "catLabel": "Faucets",
    "sub": "Kitchen Faucets",
    "price": 15,
    "img": "assets/images/products/w055.jpeg",
    "badge": "",
    "desc": "High swan-neck swivel kitchen faucet in brushed stainless with a single stick handle.",
    "specs": {
      "Material": "Stainless steel",
      "Cartridge": "Ceramic disc",
      "Fitting": "Single-hole deck mount",
      "Warranty": "5 years"
    }
  },
  {
    "slug": "gwp-05",
    "name": "GWP-05 Waterfall Kitchen Faucet",
    "cat": "faucets",
    "catLabel": "Faucets",
    "sub": "Kitchen Faucets",
    "price": 8,
    "img": "assets/images/products/gwp-05.png",
    "badge": "",
    "desc": "Chrome kitchen faucet with a wide waterfall-style spout and single lever.",
    "specs": {
      "Material": "Stainless steel",
      "Cartridge": "Ceramic disc",
      "Fitting": "Single-hole deck mount",
      "Warranty": "5 years"
    }
  },
  {
    "slug": "gwp-07",
    "name": "GWP-07 Waterfall Kitchen Faucet",
    "cat": "faucets",
    "catLabel": "Faucets",
    "sub": "Kitchen Faucets",
    "price": 8,
    "img": "assets/images/products/gwp-07.png",
    "badge": "",
    "desc": "Chrome kitchen faucet with a tall vertical waterfall spout and flat single lever.",
    "specs": {
      "Material": "Stainless steel",
      "Cartridge": "Ceramic disc",
      "Fitting": "Single-hole deck mount",
      "Warranty": "5 years"
    }
  },
  {
    "slug": "1395s",
    "name": "1395S Pull-Out Kitchen Faucet",
    "cat": "faucets",
    "catLabel": "Faucets",
    "sub": "Kitchen Faucets",
    "price": 18,
    "img": "assets/images/products/1395s.png",
    "badge": "",
    "desc": "Gun grey pull-out spray kitchen faucet with high arch spout and single handle.",
    "specs": {
      "Material": "Stainless steel",
      "Cartridge": "Ceramic disc",
      "Fitting": "Single-hole deck mount",
      "Warranty": "5 years"
    }
  }
];
/* ---------- PRODUCT-DATA-END ---------- */
