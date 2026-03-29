# Lookbook

A design lookbook of **72 landing page styles** — every prompt from the [SuperDesign](https://app.superdesign.dev) library, built into a full, self-contained HTML landing page.

**[→ View the Gallery](https://kenotron-ms.github.io/lookbook)**

---

## Credit

All design prompts sourced from **[SuperDesign](https://app.superdesign.dev/library)**, created by **[Jason Zhou](https://aibuilderclub.com)** of [AI Builder Club](https://aibuilderclub.com).

SuperDesign is an open-source AI UI generation tool that lets you design beautiful UIs directly from your editor. The library contains curated design system prompts covering everything from Swiss brutalism to glassmorphism to neo-brutalist SaaS.

- SuperDesign: [superdesign.dev](https://superdesign.dev)
- Jason Zhou: [aibuilderclub.com](https://aibuilderclub.com)
- GitHub: [github.com/superdesigndev/superdesign](https://github.com/superdesigndev/superdesign)

---

## What's in here

```
lookbook/
├── index.html              ← Gallery — browse all 72 sites with thumbnails
├── thumbnails/             ← 72 nano-banana generated preview images
├── images/                 ← Shared image pools (10 categories, 47 images)
│   ├── architecture/       ← Swiss brutalist B&W
│   ├── fashion-warm/       ← Cream/editorial fashion
│   ├── fashion-dark/       ← Dark industrial streetwear
│   ├── hotel/              ← Luxury hospitality
│   ├── furniture/          ← Museum-grade minimal
│   ├── skincare/           ← Clinical beauty
│   ├── automotive/         ← Dark luxury automotive
│   ├── creative/           ← Dark editorial/studio
│   ├── tech/               ← Dark tech workspace
│   └── noir/               ← Cinematic dark fashion
├── sites/                  ← 72 self-contained landing pages
│   ├── 01-high-contrast/
│   │   ├── index.html      ← The generated site
│   │   ├── prompt.txt      ← Full structured design prompt (human-readable)
│   │   └── prompt.json     ← Raw API response from SuperDesign
│   └── ... (72 folders)
├── scrape-prompts.js       ← Scraper — fetches fresh prompts from SuperDesign API
├── inject-images.py        ← Image injection utility
└── CODEGEN-RULES.md        ← Code generation rules used to build the sites
```

---

## The sites

Each landing page is:
- **Self-contained** — single HTML file, no build step, opens directly in browser
- **Full structured prompt** — built from the complete SuperDesign prompt spec (summary + style guide + layout sections + component specs)
- **Lucide icons** — no emoji, no icon fonts, all SVGs via Lucide CDN
- **Shared image pools** — nano-banana generated photography matched to each aesthetic
- **Real copy** — no lorem ipsum, no generic CTAs

Categories:
- **Design Systems** (47 sites) — Full aesthetic landing pages: brutalist, editorial, glassmorphism, cinematic, neo-brutalist, Swiss modernist, luxury, Gen-Z, organic, dark noir, and more
- **Pricing** (6 sites) — Mixpanel-style, ClickUp calculator, single flat-fee, SaaS toggle, comparison tables
- **Components & Interactions** (19 sites) — Bento grids, stacking cards, aurora background, image trail, spotlight mask, marquee testimonials, count-up stats, parallax tilt, horizontal ticker, canvas node animation, text animations

---

## Model comparison

Sites 01–03 were regenerated with three different models for comparison:

| Site | Gemini 3.1 Pro | GPT-5.4 | Claude Opus 4.6 |
|------|---------------|---------|-----------------|
| 01 — High Contrast | `01-high-contrast-gemini/` | `01-high-contrast-openai/` | `01-high-contrast-opus/` |
| 02 — Brutalist E-commerce | `02-brutalist-ecommerce-gemini/` | `02-brutalist-ecommerce-openai/` | `02-brutalist-ecommerce-opus/` |
| 03 — Brutalist Style | `03-brutalist-style-gemini/` | `03-brutalist-style-openai/` | `03-brutalist-style-opus/` |

All four variants (original + 3 model comparisons) are included per site, all given the same full structured prompt.

---

## Refreshing prompts

The SuperDesign API is public. To fetch fresh prompt data for all 72 sites:

```bash
node scrape-prompts.js
```

This hits `https://api.superdesign.dev/v1/prompt-library/by-slug/{slug}` and writes `prompt.txt` and `prompt.json` into each site folder.

---

## License

Site code generated for educational/reference purposes. Design prompts © SuperDesign / Jason Zhou / AI Builder Club.
