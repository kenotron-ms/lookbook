#!/usr/bin/env node
/**
 * scrape-prompts.js
 * Fetches full structured prompts from https://api.superdesign.dev
 * and writes them into each site folder.
 *
 * Usage:
 *   node scrape-prompts.js            # fetch all 72, save prompt.json + prompt.txt
 *   node scrape-prompts.js --dry-run  # just print slugs + response shape, no writes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_BASE   = 'https://api.superdesign.dev/v1';
const LIST_URL   = `${API_BASE}/prompt-library`;
const SLUG_URL   = (slug) => `${API_BASE}/prompt-library/by-slug/${slug}`;
const SITES_DIR  = path.join(__dirname, 'sites');
const DRY_RUN    = process.argv.includes('--dry-run');
const DELAY_MS   = 300; // polite delay between requests

// ─────────────────────────────────────────────────────────────
// Folder → slug mapping (derived from original scraping)
// Each entry: [folderName, knownSlug | null (auto-derive)]
// ─────────────────────────────────────────────────────────────
const FOLDER_SLUGS = [
  ['01-high-contrast',                   'high-contrast-landing-page'],
  ['02-brutalist-ecommerce',             'brutalist-e-commerce-page'],
  ['03-brutalist-style-ecommerce',       'brutalist-style-ecommerce-page'],
  ['04-saas-landing-developer-tool',     'saas-landing-page-for-developer-tool'],
  ['05-superdesign-editorial-waitlist',  'superdesign-editorial-waitlist'],
  ['06-luxury-design-system',            'luxury-focused-design-system'],
  ['07-lumina-saas',                     'lumina-saas-landing-page'],
  ['08-bold-editorial-style',            'bold-editorial-style'],
  ['09-bold-editorial-design-style',     'bold-editorial-design-style'],
  ['10-super-shampoo',                   'super-shampoo-high-conversion-lp'],
  ['11-archive-form',                    'archive-and-form-updated-hero-image'],
  ['12-laboratory-skincare',             'laboratory-skincare'],
  ['13-terroir-wine',                    'terroir-or-natural-wine-boutique'],
  ['14-aura-regimen-studio',             'aura-regimen-studio'],
  ['15-aura-audio-showroom',             'aura-audio-showroom'],
  ['16-header-hero-refinement',          'header-and-hero-layout-refinement'],
  ['17-mosaic-grid-architecture',        'mosaic-grid-architecture-style'],
  ['18-futuristic-saas',                 'futuristic-sass-landing-page'],
  ['19-aura-os-launch',                  'aura-os-launch-manifesto'],
  ['20-gen-z-social-app',                'gen-z-social-app'],
  ['21-softly-wellness',                 'softly-digital-wellness-app'],
  ['22-enterprise-admin-platform',       'enterprise-admin-platform'],
  ['23-chrome-extension',                'chrome-extension-landing-page'],
  ['24-premium-dark-b2b',                'premium-dark-b2b-service-landing'],
  ['25-neon-velocity-countdown',         'neon-velocity-countdown'],
  ['26-minimalist-beta-capture',         'minimalist-beta-capture'],
  ['27-disruptor-beta-launch',           'disruptor-beta-launch'],
  ['28-architectural-type-system',       'architectural-type-system-style'],
  ['29-neural-noir',                     'neural-noir-interface-style'],
  ['30-cinematic-style',                 'cinematic-style'],
  ['31-nature-inspired',                 'nature-inspired-style'],
  ['32-midnight-editorial-v1',           'midnight-editorial-style-5f0a22'],
  ['33-bold-editorial-studio',           'bold-editorial-studio-style'],
  ['34-midnight-editorial-v2',           'midnight-editorial-style'],
  ['35-cinematic-noir',                  'cinematic-noir-style'],
  ['36-kinetic-orange',                  'kinetic-orange-style'],
  ['37-glassmorphism-style',             'glassmorphism-style'],
  ['38-red-noir',                        'red-noir-style'],
  ['39-warm-industrial-gray',            'warm-industrial-gray-style'],
  ['40-neo-brutalism',                   'neo-brutalism-style'],
  ['41-dark-avant-garde',                'dark-avant-garde-style'],
  ['42-cyber-serif',                     'cyber-serif-style'],
  ['43-red-sun',                         'red-sun'],
  ['44-clean-fluid',                     'clean-fluid'],
  ['45-glassmorphism-card',              'glassmorphism-card'],
  ['46-tech-editorial',                  'tech-editorial'],
  ['47-synapse',                         'synapse'],
  ['48-mixpanel-pricing',                'mixpanel-pricing'],
  ['49-single-pricing',                  'single-pricing'],
  ['50-pricing-saas-framer',             'pricing'],
  ['51-bento-grid',                      'bento'],
  ['52-stacking-cards',                  'the-stacking-cards-effect'],
  ['53-neon-velocity',                   'neon-velocity-countdown'],
  ['54-circular-gallery',                'circular-gallery'],
  ['55-aurora-background',               'aurora-background'],
  ['56-exploded-view',                   'exploded-view-assembly'],
  ['57-spotlight-mask',                  'spotlight-mask'],
  ['58-testimonial-marquee',             'testimonial'],
  ['59-dynamic-data-display',            'dynamic-data-display'],
  ['60-gsap-horizontal-scroll',          'gsap-horizontal-scroll'],
  ['61-image-trail',                     'image-trail'],
  ['62-sticky-content-switch',           'sticky-content-switch'],
  ['63-text-slidedown-animation',        'text-slidedown-animation'],
  ['64-text-blur-animation',             'text-blur-animation'],
  ['65-text-fading-animation',           'text-fading-animation'],
  ['66-scroll-animation',                'scroll-animation'],
  ['67-hover-reveal-effect',             'hover-reveal-effect'],
  ['68-rotating-logos',                  'rotating-logos'],
  ['69-parallax-tilt-grid',              'parallax-tilt-grid'],
  ['70-saas-pricing-comparison',         'pricing-comparison-table'],
  ['71-clickup-pricing-calculator',      'clickup-pricing-calculator'],
  ['72-mixpanel-pricing-comparison',     'pricing-comparison-table'],
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

/**
 * Try a slug; if it 404s, try common variations.
 */
async function fetchBySlug(slug) {
  // Variations to try if the canonical slug fails
  const candidates = [
    slug,
    slug.replace(/-v(\d+)$/, '-v-$1'),       // midnight-editorial-style-v1 → v-1?
    slug.replace(/\(v(\d+)\)/, 'v$1'),
    slug + '-landing-page',
    slug.replace(/-landing-page$/, ''),
  ];

  for (const s of candidates) {
    try {
      const data = await fetchJSON(SLUG_URL(s));
      if (data && (data.slug || data.id)) return { data, resolvedSlug: s };
    } catch (e) {
      // try next
    }
  }
  return null;
}

/**
 * Parse the prompt field (which is a JSON string) into a structured object.
 * Falls back gracefully if it's plain text or an unexpected shape.
 */
function parsePromptField(raw) {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;  // already parsed
  try {
    return JSON.parse(raw);
  } catch {
    return { raw };  // plain text fallback
  }
}

/**
 * Render a parsed prompt object as readable plain text.
 */
function renderPromptText(title, description, parsed, meta = {}) {
  const lines = [];
  lines.push(`TITLE: ${title}`);
  lines.push(`SOURCE: https://app.superdesign.dev/library/${meta.slug || ''}`);
  if (meta.creator) lines.push(`CREATOR: ${meta.creator}`);
  if (meta.stats) {
    const s = meta.stats;
    lines.push(`STATS: ${s.copyCount ?? '?'} copies · ${s.tryCount ?? '?'} tries · ${s.previewViewCount ?? '?'} previews`);
  }
  lines.push('');
  lines.push('── DESCRIPTION ─────────────────────────────────────────────────');
  lines.push(description || '(none)');
  lines.push('');

  if (!parsed) {
    lines.push('── PROMPT ──────────────────────────────────────────────────────');
    lines.push('(no structured prompt found)');
    return lines.join('\n');
  }

  // raw fallback
  if (parsed.raw) {
    lines.push('── PROMPT ──────────────────────────────────────────────────────');
    lines.push(parsed.raw);
    return lines.join('\n');
  }

  // summary
  if (parsed.summary) {
    lines.push('── SUMMARY ─────────────────────────────────────────────────────');
    lines.push(parsed.summary);
    lines.push('');
  }

  // style
  if (parsed.style) {
    lines.push('── STYLE ───────────────────────────────────────────────────────');
    if (parsed.style.description) lines.push(parsed.style.description + '\n');
    if (parsed.style.prompt)      lines.push(parsed.style.prompt);
    lines.push('');
  }

  // layout_and_structure
  if (parsed.layout_and_structure) {
    const lay = parsed.layout_and_structure;
    lines.push('── LAYOUT & STRUCTURE ──────────────────────────────────────────');
    if (lay.description) lines.push(lay.description + '\n');
    if (Array.isArray(lay.prompts)) {
      for (const section of lay.prompts) {
        lines.push(`  ▸ ${section.part || section.name || 'Section'}`);
        lines.push(`    ${(section.prompt || section.description || '').replace(/\n/g, '\n    ')}`);
        lines.push('');
      }
    }
  }

  // special_ui_components
  if (Array.isArray(parsed.special_ui_components) && parsed.special_ui_components.length) {
    lines.push('── SPECIAL UI COMPONENTS ───────────────────────────────────────');
    for (const comp of parsed.special_ui_components) {
      lines.push(`  ▸ ${comp.component || comp.name || 'Component'}`);
      if (comp.description) lines.push(`    ${comp.description}`);
      if (comp.prompt)      lines.push(`    ${comp.prompt}`);
      lines.push('');
    }
  }

  // catch-all for any other top-level keys we didn't handle
  const handled = new Set(['summary','style','layout_and_structure','special_ui_components','raw']);
  const extras = Object.keys(parsed).filter(k => !handled.has(k));
  for (const key of extras) {
    const val = parsed[key];
    lines.push(`── ${key.toUpperCase().replace(/_/g,' ')} ──────────────────────────────────────────────`);
    lines.push(typeof val === 'string' ? val : JSON.stringify(val, null, 2));
    lines.push('');
  }

  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────
// STEP 1: optionally fetch the full library listing to
//         discover correct slugs we might have guessed wrong
// ─────────────────────────────────────────────────────────────
async function discoverSlugsFromAPI() {
  const endpoints = [
    `${LIST_URL}?limit=200`,
    `${LIST_URL}?limit=200&tag=landing+page`,
    `${LIST_URL}?limit=200&category=landing-page`,
    `${LIST_URL}/list?limit=200`,
  ];

  for (const url of endpoints) {
    try {
      const data = await fetchJSON(url);
      // handle various response shapes: array, {items:[]}, {data:[]}, {prompts:[]}
      const items = Array.isArray(data) ? data
        : data.items ?? data.data ?? data.prompts ?? data.results ?? null;
      if (items && items.length > 0) {
        console.log(`✓ Found library list at: ${url} (${items.length} items)`);
        return items.map(i => ({ slug: i.slug, title: i.title, tags: i.tags || [] }));
      }
    } catch { /* try next */ }
  }
  console.log('  Library list endpoint not found — using hardcoded slug map.');
  return null;
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
(async () => {
  console.log(`\n🔍 Superdesign prompt scraper`);
  console.log(`   API: ${API_BASE}`);
  console.log(`   Sites dir: ${SITES_DIR}`);
  if (DRY_RUN) console.log('   DRY RUN — no files will be written\n');
  console.log('');

  // Try to get an authoritative slug list from the API first
  console.log('Step 1: Trying to discover slugs from API listing...');
  const apiList = await discoverSlugsFromAPI();
  console.log('');

  // Build a slug lookup keyed by rough title match, if we got a list
  const apiSlugByTitle = {};
  if (apiList) {
    for (const item of apiList) {
      apiSlugByTitle[item.title?.toLowerCase().trim()] = item.slug;
    }
  }

  const results = { ok: [], failed: [], skipped: [] };

  console.log(`Step 2: Fetching full prompts for ${FOLDER_SLUGS.length} items...\n`);

  for (let i = 0; i < FOLDER_SLUGS.length; i++) {
    const [folder, guessedSlug] = FOLDER_SLUGS[i];
    const folderPath = path.join(SITES_DIR, folder);

    if (!fs.existsSync(folderPath)) {
      console.log(`  [${String(i+1).padStart(2,'0')}] ⚠ skip — folder not found: ${folder}`);
      results.skipped.push(folder);
      continue;
    }

    // prefer API-discovered slug if title matches
    const slug = guessedSlug;
    process.stdout.write(`  [${String(i+1).padStart(2,'0')}] ${folder} → /${slug} ... `);

    try {
      const result = await fetchBySlug(slug);

      if (!result) {
        console.log('✗ not found (all slug variants failed)');
        results.failed.push({ folder, slug });
        continue;
      }

      const { data, resolvedSlug } = result;
      const parsed = parsePromptField(data.prompt);

      const meta = {
        slug: resolvedSlug,
        creator: data.creator?.name,
        stats: data.stats,
      };

      const promptText = renderPromptText(data.title, data.description, parsed, meta);

      if (!DRY_RUN) {
        // write prompt.txt (human-readable)
        fs.writeFileSync(path.join(folderPath, 'prompt.txt'), promptText, 'utf8');
        // write prompt.json (raw API response for programmatic use)
        fs.writeFileSync(path.join(folderPath, 'prompt.json'), JSON.stringify(data, null, 2), 'utf8');
      }

      const sectionCount = (parsed?.layout_and_structure?.prompts?.length ?? 0);
      const compCount    = (parsed?.special_ui_components?.length ?? 0);
      console.log(`✓  (${sectionCount} layout sections, ${compCount} components)`);
      results.ok.push({ folder, slug: resolvedSlug, sectionCount, compCount });

    } catch (err) {
      console.log(`✗  ERROR: ${err.message}`);
      results.failed.push({ folder, slug, error: err.message });
    }

    if (i < FOLDER_SLUGS.length - 1) await sleep(DELAY_MS);
  }

  // ── Summary ──
  console.log('\n─────────────────────────────────────────────────');
  console.log(`✓ Success: ${results.ok.length}`);
  console.log(`✗ Failed:  ${results.failed.length}`);
  console.log(`⊘ Skipped: ${results.skipped.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed items (slug may need correction):');
    for (const f of results.failed) {
      console.log(`  ${f.folder}  →  tried: ${f.slug}`);
    }
    console.log('\nTo fix: edit FOLDER_SLUGS in scrape-prompts.js with the correct slug.');
    console.log('Find correct slugs at: https://app.superdesign.dev/library/<slug>');
  }

  if (!DRY_RUN && results.ok.length > 0) {
    console.log('\nFiles written to each site folder:');
    console.log('  prompt.txt  — human-readable full prompt');
    console.log('  prompt.json — raw API response (full structured data)');
  }

  console.log('');
})();
