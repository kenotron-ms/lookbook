# Lookbook — Code Generation Rules

These rules apply to ALL agents generating HTML for this lookbook.
Violating them produces amateur output that defeats the purpose of the lookbook.

---

## ❌ ABSOLUTE PROHIBITIONS

### 1. NO EMOJI AS PLACEHOLDER GRAPHICS

**Never. Not once. Not "just for now". Not "as a temporary placeholder".**

Emoji used in place of icons, images, or graphics is pure laziness and instantly
kills the visual credibility of any design. It signals to anyone viewing the site
that the generator gave up and threw in a 🏠 or a ⚡️ instead of doing the work.

**Wrong:**
```html
<div class="feature-icon">🚀</div>
<div class="card-image">📸</div>
<span class="status-icon">✅</span>
<div class="hero-graphic">🎨</div>
```

**Right — use inline SVG:**
```html
<div class="feature-icon">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
  </svg>
</div>
```

**Right — use a CSS shape:**
```html
<div class="feature-icon" style="
  width: 48px; height: 48px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
">
  <!-- geometric CSS shape, not emoji -->
</div>
```

**Right — use a pool image for large placeholders:**
```html
<div class="card-image" style="
  background-image: url('../../images/creative/creative-1.jpg');
  background-size: cover;
  background-position: center;
"></div>
```

**Acceptable icon sources (in order of preference):**
1. Inline SVG paths (zero dependencies, fully customizable)
2. Lucide icon paths (clean, consistent, professional)
3. Heroicons paths
4. CSS geometric shapes (circles, lines, crosses — but only when abstract is appropriate)
5. The shared image pools in `images/` for large image slots

**Never acceptable:**
- Emoji of any kind (🚀 💡 ✨ 📱 🎯 — all banned)
- Unicode symbols used as visual graphics (★ → ⚡ ► — these are text, not icons)
- Font Awesome or similar icon font CDN `<i class="fa fa-...">` tags (external dep)
- Placeholder services like placehold.co or via.placeholder.com

---

### 2. NO LOREM IPSUM IN HERO TEXT

Use real, contextually appropriate copy. Every site has a named product — write
copy that fits that product. "Lorem ipsum dolor sit amet" in a hero section means
the generator didn't read the brief.

---

### 3. NO GENERIC STOCK GRADIENTS FOR IMAGES

If an element needs an image:
- Use the shared pool: `../../images/{pool}/{file}.jpg`
- Or use nano-banana to generate a contextually appropriate image

The acceptable CSS gradient approach is ONLY for decorative backgrounds, not for
elements that are clearly image containers (product cards, showcase grids, etc.).

---

### 4. NO EXTERNAL JS FRAMEWORK DEPENDENCIES

Sites must be self-contained. Allowed:
- Vanilla JS
- Google Fonts via `@import` in `<style>`
- Fontshare via `@import` in `<style>`

Not allowed:
- `<script src="https://cdn.jsdelivr.net/...">`
- `<link rel="stylesheet" href="https://...cdnjs...">`
- Importing React, Vue, Alpine, GSAP, etc. from a CDN

---

## ✅ MANDATORY STANDARDS

### Icons

Every icon must be an inline SVG path. Keep a mental library of common ones:

```html
<!-- Arrow right -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M5 12h14M12 5l7 7-7 7"/>
</svg>

<!-- Check -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="20 6 9 17 4 12"/>
</svg>

<!-- Plus -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
</svg>

<!-- Close/X -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
</svg>

<!-- Search -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
</svg>

<!-- Menu/hamburger -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/>
  <line x1="3" y1="18" x2="21" y2="18"/>
</svg>

<!-- External link / arrow up-right -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
</svg>

<!-- Star -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
</svg>
```

### Image slots

Large image containers must reference the shared image pool or use a CSS gradient
only as a last resort with a clear TODO comment:

```css
/* TODO: Replace with nano-banana generated image from appropriate pool */
.product-card { background: linear-gradient(135deg, #1a1a1a, #2d2d2d); }
```

### Minimum line count

Every full landing page should be at least 400 lines. A site under 400 lines
hasn't implemented all the required sections.

---

## SHARED IMAGE POOLS

Available at `../../images/` (relative from any `sites/{folder}/index.html`):

| Pool | Path | Use for |
|---|---|---|
| Architecture | `../../images/architecture/arch-{1-5}.jpg` | Swiss brutalist, B&W |
| Fashion (warm) | `../../images/fashion-warm/fw-{1-6}.jpg` | Cream/orange editorial fashion |
| Fashion (dark) | `../../images/fashion-dark/fd-{1-5}.jpg` | Dark industrial streetwear |
| Hotel | `../../images/hotel/hotel-{1-6}.jpg` | Luxury hospitality |
| Furniture | `../../images/furniture/furn-{1-4}.jpg` | Museum-grade minimal furniture |
| Skincare | `../../images/skincare/skin-{1-3}.jpg` | Clinical beauty |
| Automotive | `../../images/automotive/auto-{1-3}.jpg` | Dark luxury automotive |
| Creative | `../../images/creative/creative-{1-6}.jpg` | Dark editorial/studio |
| Tech | `../../images/tech/tech-{1-4}.jpg` | Dark tech workspace |
| Noir | `../../images/noir/noir-{1-5}.jpg` | Cinematic dark fashion |

---

*This document is the law. No exceptions.*
