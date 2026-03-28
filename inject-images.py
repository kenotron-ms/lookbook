#!/usr/bin/env python3
"""
inject-images.py
================
Fills CSS gradient placeholders in all 72 lookbook sites with real images.

Strategy:
  - Unsplash CDN for photography sites (fashion, arch, wellness, wine, etc.)
  - Marks which sites need nano-banana generated images instead

Usage:
  python3 inject-images.py              # inject all sites
  python3 inject-images.py --dry-run    # show what would change, no writes
  python3 inject-images.py --site 01    # inject a specific site only

How it works:
  Appends a <style> block before </head> that overrides CSS gradient backgrounds
  with real background-image URLs. Uses !important to beat existing specificity.
"""

import os, re, sys
from pathlib import Path

SITES = Path(__file__).parent / "sites"
DRY_RUN = "--dry-run" in sys.argv
SITE_FILTER = None
for arg in sys.argv[1:]:
    if not arg.startswith("--"):
        SITE_FILTER = arg

UPL = "https://images.unsplash.com"

def u(photo_id, w=800, h=600, q=80):
    """Build an Unsplash CDN URL."""
    return f"{UPL}/{photo_id}?w={w}&h={h}&fit=crop&auto=format&q={q}"

# ─────────────────────────────────────────────────────────────────────────────
# PHOTO POOLS — curated Unsplash photo IDs per visual category
# ─────────────────────────────────────────────────────────────────────────────
ARCH    = [
    u("photo-1524230572899-a752b3835840", 900, 1100),  # minimalist white arch
    u("photo-1486325212027-8081e485255e", 900, 600),   # modern building exterior
    u("photo-1604014237800-1c9102c219da", 800, 1000),  # arch light/shadow detail
    u("photo-1431576901776-e539bd916ba2", 900, 600),   # geometric building facade
    u("photo-1497366754035-f200968a6e72", 800, 1000),  # minimalist office interior
    u("photo-1497366216548-37526070297c", 900, 600),   # contemporary interior space
    u("photo-1560449752-3f69db9c0ea0",   800, 1000),  # concrete brutalist interior
]
FASHION = [
    u("photo-1483985988355-763728e1935b", 600, 750),   # fashion editorial shoot
    u("photo-1529139574466-a303027c1d8b", 600, 750),   # fashion portrait
    u("photo-1539109136881-3be0616acf4b", 600, 750),   # urban streetwear
    u("photo-1523381210434-271e8be1f52b", 600, 750),   # casual contemporary fashion
    u("photo-1469334031218-e382a71b716b", 600, 750),   # editorial fashion lookbook
    u("photo-1515886657613-9f3515b0c78f", 600, 750),   # dark high-fashion portrait
    u("photo-1568252542512-9fe8fe9c87bb", 600, 750),   # styled fashion close-up
    u("photo-1594938298603-c8148c4dae35", 600, 750),   # fashion product editorial
    u("photo-1611312449408-fcece27cdbb7", 600, 750),   # fashion garment detail
]
DARK_FASHION = [
    u("photo-1509631179647-0177331693ae", 600, 750),   # dark fashion editorial
    u("photo-1519085360753-af0119f7cbe7", 600, 750),   # moody atmospheric portrait
    u("photo-1490481651871-ab68de25d43d", 600, 750),   # atmospheric noir editorial
    u("photo-1492562080023-ab3db95bfbce", 600, 750),   # dark editorial portrait
    u("photo-1492144534655-ae79c964c9d7", 600, 750),   # high-contrast dark fashion
    u("photo-1558888401-3cc1de77652d",   600, 750),   # dramatic black editorial
]
SKINCARE = [
    u("photo-1512290923902-8a9f81dc236c", 600, 600),   # minimal skincare product
    u("photo-1598440947619-2c35fc9aa908", 600, 600),   # beauty product photography
    u("photo-1556228720-195a672e8a03",   600, 600),   # skincare texture close-up
    u("photo-1522338242992-e1a54906a8da", 600, 600),   # wellness flatlay
    u("photo-1571781926291-c477ebfd024b", 600, 600),   # serum product shot
    u("photo-1621452773781-0f992fd1dbca", 600, 600),   # clinical beauty packaging
]
WELLNESS = [
    u("photo-1506126613408-eca07ce68773", 700, 700),   # meditation scene
    u("photo-1544367567-0f2fcb009e0b",   700, 700),   # yoga/movement wellness
    u("photo-1515023115689-589c33041d3c", 700, 700),   # calm wellness lifestyle
    u("photo-1571019613576-24b0e1fb1abb", 700, 700),   # morning wellness ritual
    u("photo-1495474472287-4d71bcdd2085", 700, 700),   # mindful coffee/morning
    u("photo-1607746882042-944635dfe10e", 700, 700),   # clean wellness aesthetic
]
FURNITURE = [
    u("photo-1555041469-a586c61ea9bc", 900, 600),      # luxury sofa interior
    u("photo-1524758631624-e2822e304c36", 900, 600),   # modern furniture space
    u("photo-1538688525198-9b0fd191baa4", 900, 600),   # minimal Scandi interior
    u("photo-1493663284031-b7e3aefcae8e", 900, 1100),  # architectural interior space
    u("photo-1534349762230-e0cadf78f5da", 900, 600),   # design object on surface
    u("photo-1556742049-0cfed4f6a45d",   900, 600),   # luxury interior corner
    u("photo-1586023492125-27b2c045efd7", 900, 1100),  # editorial product composition
]
WINE = [
    u("photo-1510812431401-41d2bd2722f3", 700, 900),   # natural wine glass pour
    u("photo-1474722883778-792e7990302f", 900, 600),   # moody wine cellar
    u("photo-1543109740-4bdb38fda756",   700, 900),   # natural wine bottle
    u("photo-1558618047-45439e30d7a4",   900, 600),   # vineyard golden hour
    u("photo-1569864358642-9d1684040f43", 700, 900),  # dark wine still life
]
HOTEL = [
    u("photo-1551882547-ff40c63fe5fa", 900, 600),      # luxury hotel exterior
    u("photo-1564501049412-61c2a3083791", 900, 600),   # elegant hotel interior
    u("photo-1582719508461-905c673771fd", 900, 600),   # hotel room luxury
    u("photo-1566073771259-6a8506099945", 900, 600),   # resort pool/leisure
    u("photo-1571003123894-1f0594d2b5d9", 900, 600),   # hotel lobby grand
    u("photo-1520250497591-112f2f40a3f4", 900, 600),   # boutique hotel detail
]
NATURE = [
    u("photo-1448375240769-33a7d8b37e87", 900, 600),   # forest path
    u("photo-1540979388789-732da60be47f", 900, 600),   # lush tropical green
    u("photo-1473091534298-04dcbce3278c", 800, 800),   # botanical close-up
    u("photo-1503952429-4e9c64f0e5a7",   800, 800),   # herbs/organic produce
    u("photo-1463936575829-25148e1db1b8", 900, 600),   # open landscape/field
]
AUDIO = [
    u("photo-1505740420928-5e560c06d30e", 700, 700),   # premium headphones
    u("photo-1484704849700-f032a568e944", 900, 600),   # audio equipment room
    u("photo-1545454675-3531b543be5d",   700, 700),   # headphones lifestyle
    u("photo-1614680376739-414d95ff43df", 900, 600),   # audio workspace
]
TECH = [
    u("photo-1498050108814-291261b7f4b4", 900, 600),   # coding/tech workspace
    u("photo-1517694712202-14dd9538aa97", 900, 600),   # laptop workspace clean
    u("photo-1555066931-4365d14bab8c",   900, 600),   # code on terminal
    u("photo-1551650975-87deedd944c3",   900, 600),   # dark tech environment
]
AUTO = [
    u("photo-1503376780353-7e6692767b70", 900, 600),   # luxury car exterior
    u("photo-1583121274602-3e2820c81a0b", 900, 600),   # sports car detail
    u("photo-1494976388531-d1058494cdd8", 900, 600),   # automotive close-up
    u("photo-1555215695-3004980ad54e",   900, 600),   # premium car interior
]
PORTRAIT = [
    u("photo-1534528741775-53994a69daeb", 600, 750),   # editorial portrait
    u("photo-1531746020798-e6953c6e8e04", 600, 750),   # lifestyle portrait
    u("photo-1542596594-649edbc13630",   600, 750),   # moody studio portrait
    u("photo-1488161628813-04466f872be2", 600, 750),   # studio lighting portrait
]
CREATIVE = [
    u("photo-1523474253046-8cd2748b5fd2", 900, 600),   # creative workspace
    u("photo-1561998338-13ad7883b20f",   900, 600),   # design studio
    u("photo-1497032628776-e7a79aed22f3", 900, 600),   # creative tools/process
    u("photo-1590402494682-cd3fb53b1f70", 900, 600),   # abstract creative
]

# ─────────────────────────────────────────────────────────────────────────────
# SITE MAP  —  folder → list of (css-selector, photo_url)
#
# The order of photos in a list maps 1:1 to the order of selectors.
# If more selectors than photos, photos wrap around (modulo).
# nano-banana = True marks sites that need AI-generated images instead.
# ─────────────────────────────────────────────────────────────────────────────
SITE_MAP = {
    "01-high-contrast": {
        "selectors": [".hero-image-fill", ".project-bg-1", ".project-bg-2", ".project-bg-3", ".project-bg-4"],
        "photos": ARCH,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(100%) contrast(1.1);",
    },
    "02-brutalist-ecommerce": {
        "selectors": [".p-bg-1", ".p-bg-2", ".p-bg-3", ".pv-bg-1", ".pv-bg-2", ".pv-bg-3", ".pv-bg-4"],
        "photos": FASHION,
        "extra_css": "background-size: cover; background-position: center top;",
    },
    "03-brutalist-style-ecommerce": {
        "selectors": [".p-visual", ".m-bg-1", ".m-bg-2", ".m-bg-3", ".m-bg-4"],
        "photos": DARK_FASHION,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(100%) contrast(1.2);",
    },
    "06-luxury-design-system": {
        "selectors": [".hero-image-bg", ".about-img-main", ".gimg-1", ".gimg-2", ".gimg-3", ".gimg-4", ".gimg-5", ".gimg-6"],
        "photos": HOTEL,
        "extra_css": "background-size: cover; background-position: center;",
    },
    "08-bold-editorial-style": {
        "selectors": [".grid-bg"],
        "photos": CREATIVE,
        "extra_css": "background-size: cover; background-position: center;",
    },
    "09-bold-editorial-design-style": {
        "selectors": [".hero-grid", ".m-bg-1", ".m-bg-2", ".m-bg-3", ".m-bg-4", ".m-bg-5"],
        "photos": DARK_FASHION,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(20%);",
    },
    "10-super-shampoo": {
        "selectors": [".hero-product-visual", ".cpc-image"],
        "photos": SKINCARE,
        "extra_css": "background-size: cover; background-position: center;",
    },
    "11-archive-form": {
        "selectors": [".hero-img-bg", ".product-img"],
        "photos": FURNITURE,
        "extra_css": "background-size: cover; background-position: center;",
    },
    "16-header-hero-refinement": {
        "selectors": [".hero-img-placeholder", ".hero-garment", ".product-silhouette", ".product-img"],
        "photos": DARK_FASHION,
        "extra_css": "background-size: cover; background-position: center top;",
    },
    "19-aura-os-launch": {
        "selectors": [".hero-grid-bg"],
        "photos": TECH,
        "extra_css": "background-size: cover; background-position: center; opacity: 0.15;",
    },
    "20-gen-z-social-app": {
        "selectors": [".hero-bg-pattern"],
        "photos": [u("photo-1534528741775-53994a69daeb", 1200, 800)],
        "extra_css": "background-size: cover; background-position: center; mix-blend-mode: multiply; opacity: 0.3;",
    },
    "24-premium-dark-b2b": {
        "selectors": [".hero-bg"],
        "photos": AUTO,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(60%);",
    },
    "28-architectural-type-system": {
        "selectors": [".grid-bg", ".project-img"],
        "photos": ARCH,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(100%);",
    },
    "30-cinematic-style": {
        "selectors": [".work-thumb-bg-1", ".work-thumb-bg-2", ".work-thumb-bg-3",
                      ".work-thumb-bg-4", ".work-thumb-bg-5", ".work-thumb-bg-6"],
        "photos": CREATIVE,
        "extra_css": "background-size: cover; background-position: center;",
    },
    "35-cinematic-noir": {
        "selectors": [".bg-1", ".bg-2", ".bg-3", ".bg-4", ".bg-5"],
        "photos": DARK_FASHION,
        "extra_css": "background-size: cover; background-position: center; filter: brightness(0.4) grayscale(40%);",
    },
    "45-glassmorphism-card": {
        "selectors": [".pp-thumb", ".sc-thumb"],
        "photos": TECH,
        "extra_css": "background-size: cover; background-position: center;",
    },
    "52-stacking-cards": {
        "selectors": [".card-image-bg"],
        "photos": CREATIVE + ARCH,
        "extra_css": "background-size: cover; background-position: center;",
    },
    "61-image-trail": {
        "selectors": [".work-image"],
        "photos": CREATIVE + PORTRAIT,
        "extra_css": "background-size: cover; background-position: center;",
    },
    "65-text-fading-animation": {
        "selectors": [".work-card-inner", ".bg1", ".bg2", ".bg3", ".bg4"],
        "photos": CREATIVE + DARK_FASHION,
        "extra_css": "background-size: cover; background-position: center;",
    },
    "69-parallax-tilt-grid": {
        "selectors": [".phil-image", ".phil-image-inner"],
        "photos": CREATIVE,
        "extra_css": "background-size: cover; background-position: center;",
    },
    # ── MODEL COMPARISON VARIANTS ──────────────────────────────────────────
    "01-high-contrast-gemini": {
        "selectors": [".hero-image", ".project-card", ".p-1", ".p-2", ".p-3", ".p-4",
                      ".project-bg-1", ".project-bg-2", ".project-bg-3", ".project-bg-4"],
        "photos": ARCH,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(100%) contrast(1.1);",
    },
    "01-high-contrast-openai": {
        "selectors": [".project-bg-1", ".project-bg-2", ".project-bg-3", ".project-bg-4",
                      ".hero-fill", ".img-fill", ".hero-image"],
        "photos": ARCH,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(100%) contrast(1.1);",
    },
    "01-high-contrast-opus": {
        "selectors": [".project-bg-1", ".project-bg-2", ".project-bg-3", ".project-bg-4",
                      ".hero-fill", ".showcase-img"],
        "photos": ARCH,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(100%) contrast(1.1);",
    },
    "02-brutalist-ecommerce-gemini": {
        "selectors": [".p-bg-1", ".p-bg-2", ".p-bg-3", ".pv-bg-1", ".pv-bg-2", ".pv-bg-3",
                      ".prod-img-1", ".prod-img-2", ".prod-img-3", ".product-img"],
        "photos": FASHION,
        "extra_css": "background-size: cover; background-position: center top;",
    },
    "02-brutalist-ecommerce-openai": {
        "selectors": [".p-bg-1", ".p-bg-2", ".p-bg-3", ".pv-bg-1", ".pv-bg-2", ".pv-bg-3", ".pv-bg-4"],
        "photos": FASHION,
        "extra_css": "background-size: cover; background-position: center top;",
    },
    "03-brutalist-style-gemini": {
        "selectors": [".p-visual", ".m-bg-1", ".m-bg-2", ".m-bg-3", ".m-bg-4",
                      ".product-bg", ".pd-bg-1", ".pd-bg-2"],
        "photos": DARK_FASHION,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(100%) contrast(1.2);",
    },
    "03-brutalist-style-openai": {
        "selectors": [".p-visual", ".m-bg-1", ".m-bg-2", ".m-bg-3", ".m-bg-4"],
        "photos": DARK_FASHION,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(100%) contrast(1.2);",
    },
    "03-brutalist-style-opus": {
        "selectors": [".p-visual", ".m-bg-1", ".m-bg-2", ".m-bg-3", ".hero-img",
                      ".product-bg", ".bg-main"],
        "photos": DARK_FASHION,
        "extra_css": "background-size: cover; background-position: center; filter: grayscale(100%) contrast(1.2);",
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# NANO-BANANA CANDIDATES  — sites where generated imagery beats stock photos
# These are listed here so you can run nano-banana manually or via script
# ─────────────────────────────────────────────────────────────────────────────
NANO_CANDIDATES = {
    "05-superdesign-editorial-waitlist": "Editorial dark cinematic hero — deep matte black, warm beige typography overlay, brutalist editorial magazine aesthetic, atmospheric, no people",
    "13-terroir-wine": "Natural wine bottles in a dark moody cellar, soft candlelight, burgundy and charcoal tones, editorial still life photography",
    "21-softly-wellness": "Soft pastel wellness lifestyle, warm off-white, blurred botanical elements, gentle morning light, no harsh edges, Gen-Z aesthetic",
    "25-neon-velocity-countdown": "Dark navy/black abstract data visualization background, neon green laser grid lines, futuristic tech aesthetic, no people",
    "29-neural-noir": "Dark black background with golden/bronze glowing neural network nodes and connection lines, tech noir aesthetic, no people",
    "37-glassmorphism-style": "Dark obsidian background with neon lime green architectural grid overlay and glowing orbs, glassmorphism aesthetic, no people",
    "43-red-sun": "Coral red ink tones, warm editorial atmospheric background, blurred warm light, no people",
    "47-synapse": "Deep black with violet and cyan glowing neural mesh gradient, encrypted financial aesthetic, no people",
    "32-midnight-editorial-v1": "Pure editorial black background with a single dramatic coral orange typographic graphic element, high-fashion agency aesthetic, no people",
    "44-clean-fluid": "Cream colored organic curved wave shapes, soft mesh gradient, luxury editorial background, no people",
}

# ─────────────────────────────────────────────────────────────────────────────
# AUTO-DETECT additional image classes not in the manual map above
# ─────────────────────────────────────────────────────────────────────────────
IMAGE_HINTS = {'img', 'image', 'photo', 'pic', 'project', 'product', 'showcase',
               'feature', 'hero', 'card', 'thumb', 'visual', 'cover', 'gimg',
               'banner', 'poster', 'grid', 'gallery', 'item', 'work', 'bg',
               'pv', 'cpc', 'about', 'team', 'portfolio', 'case'}
NOT_IMAGE   = {'blob', 'glow', 'orb', 'avatar', 'icon', 'badge', 'bottle',
               'shape', 'text', 'font', 'scroll', 'line', 'divider', 'vignette',
               'nav', 'menu', 'dot', 'reviewer', 'author', 'neck', 'body',
               'lamp', 'chair', 'table', 'obj', 'circle', 'curtain', 'noise',
               'overlay', 'pattern', 'test', 'title', 'featured-tc', 'chart'}

def is_image_class(cls):
    c = cls.lower().lstrip('.')
    return any(h in c for h in IMAGE_HINTS) and not any(n in c for n in NOT_IMAGE)

def auto_detect_classes(html):
    """Find CSS gradient background classes that look like image containers."""
    raw = re.findall(r'(\.[a-z][a-zA-Z0-9_-]*)\s*\{[^}]*(?:linear-gradient|radial-gradient)[^}]*\}', html)
    ar  = re.findall(r'(\.[a-z][a-zA-Z0-9_-]*)\s*\{[^}]*aspect-ratio[^}]*\}', html)
    return [c for c in dict.fromkeys(raw + ar) if is_image_class(c)]

# ─────────────────────────────────────────────────────────────────────────────
# INJECTION LOGIC
# ─────────────────────────────────────────────────────────────────────────────
def build_override_css(selector, photo_url, extra="background-size: cover; background-position: center;"):
    return (
        f"  {selector} {{\n"
        f"    background-image: url('{photo_url}') !important;\n"
        f"    {extra}\n"
        f"  }}"
    )

def inject_site(folder_path, config):
    html_path = folder_path / "index.html"
    if not html_path.exists():
        print(f"  ⚠ skip — no index.html in {folder_path.name}")
        return False

    html = html_path.read_text(encoding="utf-8")

    # Check if already injected
    if "<!-- inject-images -->" in html:
        print(f"  ↩ skip — already injected")
        return False

    selectors = config.get("selectors", [])
    photos    = config.get("photos", [])
    extra     = config.get("extra_css", "background-size: cover; background-position: center;")

    if not selectors or not photos:
        print(f"  ⚠ skip — no selectors or photos configured")
        return False

    # Auto-detect additional classes not already in selectors
    auto = auto_detect_classes(html)
    additional = [c for c in auto if c not in selectors]

    all_selectors = selectors + additional
    css_rules = []
    for i, sel in enumerate(all_selectors):
        photo = photos[i % len(photos)]
        css_rules.append(build_override_css(sel, photo, extra))

    block = (
        "\n<!-- inject-images -->\n"
        "<style>\n"
        + "\n".join(css_rules)
        + "\n</style>\n"
    )

    # Inject just before </head>
    if "</head>" in html:
        new_html = html.replace("</head>", block + "</head>", 1)
    else:
        new_html = html + block

    changed = new_html != html
    if DRY_RUN:
        print(f"  {'✓ would inject' if changed else '- no change'} ({len(all_selectors)} selectors, {len(additional)} auto-detected)")
    else:
        html_path.write_text(new_html, encoding="utf-8")
        print(f"  ✓ injected ({len(all_selectors)} selectors, {len(additional)} auto-detected)")

    return changed

# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────
print(f"\n🖼  Lookbook Image Injector")
print(f"   Sites: {SITES}")
if DRY_RUN: print("   DRY RUN — no files written\n")
print()

stats = {"ok": 0, "skip": 0, "nano": 0}

for folder in sorted(os.listdir(SITES)):
    if SITE_FILTER and SITE_FILTER not in folder:
        continue

    folder_path = SITES / folder
    if not (folder_path / "index.html").exists():
        continue

    in_map   = folder in SITE_MAP
    is_nano  = folder in NANO_CANDIDATES

    if is_nano and not in_map:
        print(f"  🎨 {folder} → nano-banana candidate")
        print(f"     Prompt: {NANO_CANDIDATES[folder][:80]}...")
        stats["nano"] += 1
        continue

    if not in_map:
        # Try auto-detection with a fallback photo pool
        html = (folder_path / "index.html").read_text()
        auto = auto_detect_classes(html)
        if auto:
            config = {"selectors": auto, "photos": CREATIVE,
                      "extra_css": "background-size: cover; background-position: center;"}
            print(f"  🔍 {folder} (auto-detected {len(auto)} classes)")
            if inject_site(folder_path, config):
                stats["ok"] += 1
            else:
                stats["skip"] += 1
        else:
            stats["skip"] += 1
        continue

    print(f"  📸 {folder}")
    if inject_site(folder_path, SITE_MAP[folder]):
        stats["ok"] += 1
    else:
        stats["skip"] += 1

print(f"\n{'─'*50}")
print(f"✓ Injected:         {stats['ok']}")
print(f"⊘ Skipped:          {stats['skip']}")
print(f"🎨 Nano candidates: {stats['nano']}")
if stats['nano']:
    print(f"\nRun nano-banana generation for the 🎨 candidates:")
    print(f"  python3 inject-images.py --nano  (coming soon)")
    print(f"\n  Or generate manually with the prompts above.")
print()
