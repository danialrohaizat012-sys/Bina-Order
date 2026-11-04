/* Bina Order: shared by index.html and qr.html
   - BINA_THEMES: UI templates the shop owner can choose
   - binaApplyTheme(): writes a template's colours, fonts and layout onto <html>
   - binaStore: localStorage wrapped so private mode or blocked storage never breaks the page */
(function () {
  const THEMES = {
    bina: {
      name: "Bina Klasik", desc: "Kemas dan profesional", layout: "list", scheme: "light",
      pattern: "",
      vars: {
        bg: "#EEF0F5", surface: "#FFFFFF", sunk: "#F5F6FA", ink: "#121A2B", muted: "#5B6478", line: "#DCE0E9",
        brand: "#1B2D5B", "brand-ink": "#FFFFFF", accent: "#D3362A", "accent-ink": "#FFFFFF", "accent-soft": "#FBE6E3",
        ok: "#1D8350", "ok-soft": "#DDF2E6", warn: "#A86200", "warn-soft": "#FBEED6", danger: "#C62F24", "danger-soft": "#FBE4E1",
        radius: "16px", display: '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif', "display-weight": "800",
        "display-case": "none", "display-track": "-0.01em"
      }
    },
    kopitiam: {
      name: "Kopitiam", desc: "Hijau jubin, papan tanda kedai kopi", layout: "list", scheme: "light",
      pattern: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px) 0 0/18px 18px, linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px) 0 0/18px 18px",
      vars: {
        bg: "#EAF0EA", surface: "#FFFFFF", sunk: "#F2F6F1", ink: "#14231A", muted: "#56685C", line: "#D2DED3",
        brand: "#1E5B3A", "brand-ink": "#FFFFFF", accent: "#E3A21A", "accent-ink": "#1A1405", "accent-soft": "#FBF0D2",
        ok: "#1D7A48", "ok-soft": "#DCEFE2", warn: "#9A5A00", "warn-soft": "#FAEDD3", danger: "#C02E22", "danger-soft": "#FADFDB",
        radius: "8px", display: '"Oswald", "Arial Narrow", ui-sans-serif, sans-serif', "display-weight": "700",
        "display-case": "uppercase", "display-track": "0.02em"
      }
    },
    warisan: {
      name: "Warisan Kelantan", desc: "Merah hati dan emas, corak songket", layout: "grid", scheme: "light",
      pattern: "repeating-linear-gradient(45deg, rgba(232,190,104,.16) 0 2px, transparent 2px 15px), repeating-linear-gradient(-45deg, rgba(232,190,104,.16) 0 2px, transparent 2px 15px)",
      vars: {
        bg: "#F3EDE8", surface: "#FFFFFF", sunk: "#F8F2EE", ink: "#2A1416", muted: "#6E5A5B", line: "#E5D7D0",
        brand: "#6B1A1F", "brand-ink": "#FBEFD9", accent: "#9E2A2F", "accent-ink": "#FFFFFF", "accent-soft": "#F6E2DF",
        ok: "#2D7A4B", "ok-soft": "#DFEFE4", warn: "#94600F", "warn-soft": "#F6EBD3", danger: "#B3261E", "danger-soft": "#F8DEDB",
        radius: "14px", display: '"Lora", Georgia, "Times New Roman", serif', "display-weight": "700",
        "display-case": "none", "display-track": "0"
      }
    },
    kafe: {
      name: "Kafe Moden", desc: "Minimal, sesuai kafe dan brunch", layout: "grid", scheme: "light",
      pattern: "",
      vars: {
        bg: "#F2F2EE", surface: "#FFFFFF", sunk: "#F4F4F0", ink: "#161616", muted: "#66665F", line: "#E2E2DC",
        brand: "#161616", "brand-ink": "#FFFFFF", accent: "#3F6E47", "accent-ink": "#FFFFFF", "accent-soft": "#E1ECE2",
        ok: "#2F7A45", "ok-soft": "#E0EEE3", warn: "#93600B", "warn-soft": "#F5ECD8", danger: "#B8322A", "danger-soft": "#F6E0DD",
        radius: "22px", display: '"Unbounded", ui-sans-serif, system-ui, sans-serif', "display-weight": "700",
        "display-case": "none", "display-track": "-0.02em"
      }
    },
    malam: {
      name: "Gerai Malam", desc: "Gelap dan terang, untuk pasar malam", layout: "list", scheme: "dark",
      pattern: "radial-gradient(120% 140% at 100% 0%, rgba(255,176,32,.32), transparent 55%)",
      vars: {
        bg: "#0F0E12", surface: "#1A1920", sunk: "#141318", ink: "#F3EFE6", muted: "#A9A397", line: "#2E2C35",
        brand: "#1F1D26", "brand-ink": "#F3EFE6", accent: "#FFB020", "accent-ink": "#17120A", "accent-soft": "#3A2C0E",
        ok: "#4CCB88", "ok-soft": "#15301F", warn: "#FF9A4D", "warn-soft": "#3A2412", danger: "#FF6155", "danger-soft": "#3D1A18",
        radius: "14px", display: '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif', "display-weight": "800",
        "display-case": "none", "display-track": "-0.01em"
      }
    }
  };

  function applyTheme(key) {
    const t = THEMES[key] || THEMES.bina;
    const root = document.documentElement;
    for (const [k, v] of Object.entries(t.vars)) root.style.setProperty("--" + k, v);
    root.style.setProperty("--head-bg", t.pattern ? t.pattern + ", " + t.vars.brand : t.vars.brand);
    root.style.colorScheme = t.scheme;
    root.dataset.tema = THEMES[key] ? key : "bina";
    root.dataset.layout = t.layout;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = t.vars.brand;
    return t;
  }

  const store = {
    get(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Settings shared by the demo and the QR page. URL params (?kedai=, ?tema=) win over saved ones. */
  function loadSettings() {
    const saved = store.get("bo.settings", {}) || {};
    const s = {
      shop: typeof saved.shop === "string" && saved.shop.trim() ? saved.shop.slice(0, 40) : "Kedai Makan Kak Yah",
      theme: THEMES[saved.theme] ? saved.theme : "bina",
      tables: Number.isInteger(saved.tables) && saved.tables >= 1 && saved.tables <= 50 ? saved.tables : 12
    };
    const p = new URLSearchParams(location.search);
    if (p.get("kedai")) s.shop = p.get("kedai").slice(0, 40);
    if (THEMES[p.get("tema")]) s.theme = p.get("tema");
    return s;
  }

  window.BINA_THEMES = THEMES;
  window.binaApplyTheme = applyTheme;
  window.binaStore = store;
  window.binaEsc = esc;
  window.binaLoadSettings = loadSettings;
})();
