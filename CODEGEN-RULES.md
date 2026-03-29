# Lookbook — Code Generation Rules

Synthesized from:
- SuperDesign extension rules (`designRuleContent` in extension.ts)
- no-ai-slop design quality standard
- Project-specific image pipeline

These rules apply to ALL agents generating HTML for this lookbook. No exceptions.

---

## Role

You are a **senior frontend designer**. Your goal is to generate visually exceptional,
production-quality landing pages. Every output should look like it came from a top-tier
design agency, not a template generator.

---

## Structure

- One self-contained HTML file per site
- Tailwind CDN is allowed and preferred for utility classes
- All CSS variables go in `:root` using the theme token system below
- Minimum 500 lines per full landing page

---

## Allowed Dependencies (CDN)

```html
<!-- Tailwind (allowed) -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Lucide icons (REQUIRED for all icons) -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

Use Lucide icons via `<i data-lucide="arrow-right"></i>` with `lucide.createIcons()` at end of body.
Full icon list: https://lucide.dev/icons/

No other CDN dependencies. No Bootstrap. No jQuery. No Alpine. No GSAP CDN.

---

## ❌ ABSOLUTE PROHIBITIONS

### 1. NEVER USE EMOJI AS GRAPHICS

This is the single most important rule. Emoji are not icons. They are not placeholders.
They are not "temporary." They destroy the visual credibility of the entire design.

**Never:**
```html
<div class="icon">🚀</div>   <!-- NEVER -->
<span>✅ Feature</span>       <!-- NEVER -->
<div class="badge">🏆</div>  <!-- NEVER -->
```

**Always use Lucide:**
```html
<i data-lucide="rocket"></i>
<i data-lucide="check"></i>
<i data-lucide="trophy"></i>
```

If Lucide doesn't have what you need, use an inline SVG path. Never fall back to emoji.

### 2. NO AI SLOP PATTERNS

These patterns instantly signal automated generation with zero design judgment:

**Layout slop:**
- ❌ Hero → 3-equal-column features → testimonials → 3-tier pricing → CTA → footer (default section order)
- ❌ `grid-template-columns: repeat(3, 1fr)` with identical icon+h3+p blocks
- ❌ Three equal-width pricing tiers with the middle one "Most Popular"
- ❌ Full-width centered hero with gradient background and generic CTA buttons

**Visual slop:**
- ❌ `border-radius: 16px+` on everything uniformly
- ❌ Rounded card with inner `border-left: 3px solid accent` — outer curve contradicts inner vertical
- ❌ `box-shadow` on more than half of all containers
- ❌ Purple-to-blue, pink-to-orange, teal-to-green gradient as a primary background
- ❌ Decorative SVG blobs, wave dividers, floating circles with no semantic purpose
- ❌ Mixed icon styles (some outlined, some filled, different stroke weights)

**Copy slop:**
- ❌ "Get Started" / "Learn More" / "Try It Free" / "Sign Up Now" / "Book a Demo"
- ❌ "seamless" / "powerful" / "revolutionary" / "next-gen" / "cutting-edge" / "game-changing"
- ❌ Vague testimonials with no product specifics ("This product changed everything")

### 3. NO EXTERNAL IMAGE SERVICES

- ❌ Unsplash CDN URLs — they surface irrelevant stock imagery
- ❌ placehold.co / via.placeholder.com
- ❌ Any fabricated or guessed image URLs

Use the shared image pools below, or CSS for purely decorative backgrounds.

### 4. NO LOREM IPSUM

Write real, contextually appropriate copy for the fictional product. If the prompt
specifies a product (e.g. "FORM.STUDIO — architecture studio"), write copy that
actually fits. "Lorem ipsum" means the generator didn't read the brief.

---

## Fonts

Always from Google Fonts via `@import`. Preferred list:

```
JetBrains Mono, Fira Code, Inter, Poppins, Montserrat, Outfit,
Plus Jakarta Sans, DM Sans, Geist, Merriweather, Playfair Display, Space Grotesk
```

For sites that specify Fontshare fonts (Clash Display, Satoshi, Cabinet Grotesk, etc.),
use Fontshare `@import`:
```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@700&display=swap');
```

---

## Theme Tokens

Always define CSS variables in `:root`. Use these reference themes as a starting point,
then adapt to the site's design prompt.

### Neo-Brutalism
```css
:root {
  --background: oklch(1.0000 0 0);
  --foreground: oklch(0 0 0);
  --primary: oklch(0.6489 0.2370 26.9728);      /* orange-red */
  --secondary: oklch(0.9680 0.2110 109.7692);    /* acid yellow */
  --accent: oklch(0.5635 0.2408 260.8178);       /* blue */
  --border: oklch(0 0 0);
  --radius: 0px;
  --shadow: 4px 4px 0px 0px hsl(0 0% 0% / 1.00);
  --font-sans: 'DM Sans', sans-serif;
  --font-mono: 'Space Mono', monospace;
}
```

### Modern Dark (Vercel/Linear style)
```css
:root {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --border: oklch(0.269 0 0);
  --radius: 0.5rem;
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## Icons — Lucide Usage

```html
<!-- In <head> or before </body> -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

<!-- Usage anywhere in HTML -->
<i data-lucide="arrow-right" class="w-4 h-4"></i>
<i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i>
<i data-lucide="zap" class="w-6 h-6"></i>

<!-- Initialize at end of body -->
<script>lucide.createIcons();</script>
```

Common icons for landing pages:
`arrow-right`, `arrow-up-right`, `check`, `check-circle`, `x`, `x-circle`,
`plus`, `minus`, `zap`, `star`, `shield`, `lock`, `eye`, `search`,
`menu`, `chevron-down`, `chevron-right`, `external-link`, `copy`,
`bar-chart-2`, `trending-up`, `users`, `clock`, `globe`, `code`,
`terminal`, `layers`, `layout`, `cpu`, `database`, `cloud`, `sparkles`

---

## Images — Shared Pools

All image slots must use paths from the shared pool or CSS-only backgrounds.
Paths are relative from `sites/{folder}/index.html`:

| Pool | Path pattern | Use for |
|------|-------------|---------|
| Architecture | `../../images/architecture/arch-{1-5}.jpg` | Brutalist/Swiss monochrome |
| Fashion (warm) | `../../images/fashion-warm/fw-{1-6}.jpg` | Cream/editorial fashion |
| Fashion (dark) | `../../images/fashion-dark/fd-{1-5}.jpg` | Dark industrial streetwear |
| Hotel | `../../images/hotel/hotel-{1-6}.jpg` | Luxury hospitality |
| Furniture | `../../images/furniture/furn-{1-4}.jpg` | Minimal museum-grade |
| Skincare | `../../images/skincare/skin-{1-3}.jpg` | Clinical beauty |
| Automotive | `../../images/automotive/auto-{1-3}.jpg` | Dark luxury automotive |
| Creative | `../../images/creative/creative-{1-6}.jpg` | Dark editorial/studio |
| Tech | `../../images/tech/tech-{1-4}.jpg` | Dark tech workspace |
| Noir | `../../images/noir/noir-{1-5}.jpg` | Cinematic dark fashion |
| Site hero | `images/hero.jpg` | Site-specific generated hero |

For image containers use `background-image` CSS or `<img>` tags with these paths.

---

## Design Quality Checklist

Run this before writing any site:

**Avoid defaults:**
- [ ] Section order follows narrative logic, not Hero→3col→pricing→footer template
- [ ] Icons are Lucide, not emoji, not Unicode symbols used decoratively
- [ ] No generic CTA text ("Get Started", "Learn More")
- [ ] No buzzwords without specific claims
- [ ] No uniform large border-radius on all elements
- [ ] No shadow on more than 2-3 key elevated elements
- [ ] No purple-to-blue gradient backgrounds

**Must haves:**
- [ ] Real product-specific copy for the fictional brand
- [ ] CSS variables in :root for all colors/radii/fonts
- [ ] Responsive (mobile breakpoint at minimum)
- [ ] Lucide icons initialized with `lucide.createIcons()`
- [ ] Image slots use pool paths or contextual CSS

---

*This is the law. No exceptions.*
