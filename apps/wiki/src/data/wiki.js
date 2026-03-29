// Starfield Chronicles Wiki — Mock Data

export const wikiMeta = {
  name: "Starfield Chronicles Wiki",
  tagline: "The definitive fan wiki for the Starfield Chronicles universe",
  articleCount: 2847,
  userCount: 14320,
  editCount: 198441,
  foundedYear: 2019,
};

// 15 article stubs
export const articles = [
  { id: 1, title: "Commander Astra Voss", slug: "commander-astra-voss", category: "Characters", thumb: null, stub: true },
  { id: 2, title: "The Nebula Compact", slug: "nebula-compact", category: "Factions", thumb: null, stub: false },
  { id: 3, title: "Station Omega-9", slug: "station-omega-9", category: "Locations", thumb: null, stub: false },
  { id: 4, title: "Kael'drath", slug: "kaeldrath", category: "Characters", thumb: null, stub: true },
  { id: 5, title: "The Void Breach", slug: "void-breach", category: "Events", thumb: null, stub: false },
  { id: 6, title: "Lumivex Prime", slug: "lumivex-prime", category: "Locations", thumb: null, stub: true },
  { id: 7, title: "Hyperdrive Core", slug: "hyperdrive-core", category: "Technology", thumb: null, stub: true },
  { id: 8, title: "Admiral Rhenna Solis", slug: "admiral-rhenna-solis", category: "Characters", thumb: null, stub: false },
  { id: 9, title: "The Fractured Accord", slug: "fractured-accord", category: "Events", thumb: null, stub: false },
  { id: 10, title: "Xerith Collective", slug: "xerith-collective", category: "Factions", thumb: null, stub: true },
  { id: 11, title: "Season 1 Overview", slug: "season-1", category: "Episodes", thumb: null, stub: false },
  { id: 12, title: "Season 2 Overview", slug: "season-2", category: "Episodes", thumb: null, stub: false },
  { id: 13, title: "Echo Station", slug: "echo-station", category: "Locations", thumb: null, stub: true },
  { id: 14, title: "Phaseblade", slug: "phaseblade", category: "Technology", thumb: null, stub: true },
  { id: 15, title: "The Great Silence", slug: "great-silence", category: "Events", thumb: null, stub: false },
];

// Full character article
export const characterArticle = {
  title: "Commander Astra Voss",
  lastEdited: "2 hours ago",
  editors: ["NebulaNerd", "StarScribe99", "VoidWatcher"],
  infobox: {
    name: "Astra Voss",
    age: "34",
    species: "Human",
    affiliation: "Nebula Compact",
    rank: "Commander",
    portrayedBy: "Elena Marchand",
    firstAppearance: "S1E01 – Prologue",
    status: "Active",
  },
  toc: [
    { id: "background", label: "1. Background" },
    { id: "appearance", label: "2. Appearance" },
    { id: "relationships", label: "3. Relationships" },
    { id: "trivia", label: "4. Trivia" },
  ],
  sections: {
    background: `Commander Astra Voss is the central protagonist of the <a href="#" class="wiki-link">Starfield Chronicles</a> series. Born on the colony ship <a href="#" class="wiki-link">Ariadne's Thread</a> during the long voyage to the <a href="#" class="wiki-link">Lumivex system</a>, she grew up knowing nothing but the stars. Her exceptional tactical instincts were identified early by the <a href="#" class="wiki-link">Nebula Compact</a>'s recruitment programs.

After graduating top of her class from the <a href="#" class="wiki-link">Orbital Academy</a>, Voss was assigned to <a href="#" class="wiki-link">Station Omega-9</a> under Admiral <a href="#" class="wiki-link">Rhenna Solis</a>. During <a href="#" class="wiki-link">The Void Breach</a> incident of year 47 Post-Crossing, she single-handedly coordinated the evacuation of 3,000 civilians through the <a href="#" class="wiki-link">Shattered Corridor</a>, earning her field promotion to Commander.`,

    appearance: `Astra Voss is depicted with short-cropped silver hair — a genetic trait common among those born in deep space — and piercing amber eyes. Her Nebula Compact uniform is navy blue with teal trim, bearing the three-star insignia of her rank on the left shoulder.

She carries a <a href="#" class="wiki-link">Phaseblade</a> on her right hip and a compact sidearm on the left. A distinctive scar runs along her jaw, a memento from the <a href="#" class="wiki-link">Battle of Xerith Prime</a>. Off-duty, she is often seen in a worn leather jacket from her days at the Academy.`,

    relationships: `<strong>Admiral Rhenna Solis</strong> — Voss's commanding officer and mentor. Their relationship is defined by mutual respect tinged with ideological tension: Solis believes in institutional order while Voss trusts instinct over protocol. See: <a href="#" class="wiki-link">Solis-Voss Dynamic</a>.

<strong>Kael'drath</strong> — The enigmatic <a href="#" class="wiki-link">Xerith</a> navigator who joins Voss's crew in Season 2. Initially adversarial, their relationship evolves into one of the series' most celebrated character arcs.

<strong>Dr. Pim Okafor</strong> — The ship's physician and Voss's closest confidant. Okafor provides the emotional counterweight to Voss's stoic exterior.`,

    trivia: `• Astra's name is derived from the Latin word for "stars" — a deliberate choice by the showrunners to signal her destiny.
• The character was originally written as male before the creative team decided to cast Elena Marchand.
• Voss's signature fighting style — the "Voss Pivot" — became so iconic that it spawned a real-world martial arts trend among fans.
• In Season 1, Astra drinks synthetic coffee from a mug labeled "Omega-9 Mess Hall" — the same mug appears in every subsequent episode.
• Elena Marchand performed all of her own stunts for the first two seasons.`,
  },
  references: [
    "Starfield Chronicles Official Companion Book, 2021",
    "Interview with showrunner Dex Harlow, FandomCon 2022",
    "Nebula Compact Factsheet – official series website",
  ],
  categories: ["Characters", "Nebula Compact members", "Commanders", "Season 1 characters", "Season 2 characters"],
};

// 8 discussion posts
export const discussions = [
  {
    id: 1,
    user: "NebulaNerd",
    avatar: "NN",
    avatarColor: "#7c3aed",
    title: "Is Kael'drath actually the last of the Xerith Collective?",
    preview: "Just rewatched S2E08 and noticed something in the background of the final scene — what looks like another Xerith symbol on the ship. Are we sure Kael is truly the last one?",
    votes: 142,
    comments: 38,
    tag: "Theory",
    time: "2h ago",
    hot: true,
  },
  {
    id: 2,
    user: "StarScribe99",
    avatar: "SS",
    avatarColor: "#0891b2",
    title: "Commander Voss deserves a standalone prequel series",
    preview: "The Orbital Academy years were barely touched in the main series but seem so rich for storytelling. Her time with Rhenna Solis before the Void Breach must have been incredible.",
    votes: 287,
    comments: 61,
    tag: "Discussion",
    time: "5h ago",
    hot: true,
  },
  {
    id: 3,
    user: "VoidWatcher",
    avatar: "VW",
    avatarColor: "#059669",
    title: "POLL: Best episode of Season 2?",
    preview: "Vote for your favorite Season 2 episode! I've included all 12 episodes plus a wildcard for tie-breaking. My personal pick is E06 'The Fracture Point' but E10 is a close second.",
    votes: 94,
    comments: 112,
    tag: "Poll",
    time: "8h ago",
    hot: false,
  },
  {
    id: 4,
    user: "OmegaPilot",
    avatar: "OP",
    avatarColor: "#dc2626",
    title: "Sharing my Station Omega-9 model build!",
    preview: "Finally finished my 1:200 scale model of Station Omega-9 after 6 months. Used the specs from the wiki blueprints page. Check out the teal accent lights!",
    votes: 331,
    comments: 47,
    tag: "Fan Art",
    time: "12h ago",
    hot: true,
  },
  {
    id: 5,
    user: "LoreMaster_X",
    avatar: "LM",
    avatarColor: "#d97706",
    title: "The Great Silence — hidden meaning decoded?",
    preview: "I've been cross-referencing the dates in the series bible with the Fractured Accord timeline. I think the Great Silence wasn't a natural event at all. Thread below...",
    votes: 198,
    comments: 73,
    tag: "Theory",
    time: "1d ago",
    hot: false,
  },
  {
    id: 6,
    user: "AstraFan2019",
    avatar: "AF",
    avatarColor: "#00d6d6",
    title: "New merchandise drop — Nebula Compact insignia pin",
    preview: "The official store just dropped the Nebula Compact enamel pin set! All four ranks are available. Finally got the Commander tier (teal border). Shipping worldwide.",
    votes: 156,
    comments: 29,
    tag: "News",
    time: "1d ago",
    hot: false,
  },
  {
    id: 7,
    user: "PhaseBladeKid",
    avatar: "PB",
    avatarColor: "#8b5cf6",
    title: "Help identifying background alien language in S1E04",
    preview: "Paused at 22:14 and noticed writing on the wall behind Kael'drath. It's not any of the established Xerith scripts in the wiki. Anyone have a translation?",
    votes: 67,
    comments: 44,
    tag: "Help",
    time: "2d ago",
    hot: false,
  },
  {
    id: 8,
    user: "ChroniclesCast",
    avatar: "CC",
    avatarColor: "#e11d48",
    title: "Podcast Ep 88 — Ranking every Voss-Solis scene",
    preview: "This week we ranked all 23 Voss-Solis interactions across the series. Hot takes, cold takes, and a very heated debate about the S2 finale. Listen in the comments!",
    votes: 112,
    comments: 58,
    tag: "Community",
    time: "3d ago",
    hot: false,
  },
];

// Recent changes
export const recentChanges = [
  { article: "Commander Astra Voss", editor: "NebulaNerd", time: "2 min ago", type: "edit", bytes: "+342" },
  { article: "The Void Breach", editor: "StarScribe99", time: "18 min ago", type: "new", bytes: "+1,204" },
  { article: "Hyperdrive Core", editor: "TechWiki_J", time: "34 min ago", type: "edit", bytes: "-12" },
  { article: "Lumivex Prime", editor: "VoidWatcher", time: "1h ago", type: "edit", bytes: "+89" },
  { article: "Season 2 Overview", editor: "ChroniclesCast", time: "2h ago", type: "edit", bytes: "+567" },
];

// Category data
export const categoryData = {
  name: "Characters",
  articleCount: 142,
  subcategories: [
    { name: "Nebula Compact Members", count: 34, color: "#1b2a4a" },
    { name: "Xerith Collective", count: 18, color: "#3b1f6e" },
    { name: "Season 1 Characters", count: 47, color: "#1a3a2a" },
    { name: "Season 2 Characters", count: 61, color: "#3a1a1a" },
    { name: "Antagonists", count: 22, color: "#3a2a1a" },
    { name: "Recurring Characters", count: 29, color: "#1a2a3a" },
  ],
  pages: [
    { title: "Admiral Rhenna Solis", initial: "A" },
    { title: "Astra Voss", initial: "A" },
    { title: "Commander Tev Orin", initial: "C" },
    { title: "Dr. Pim Okafor", initial: "D" },
    { title: "Echo-7 (AI)", initial: "E" },
    { title: "Flight Ensign Dara", initial: "F" },
    { title: "General Huxford", initial: "G" },
    { title: "High Arbiter Zenn", initial: "H" },
    { title: "Kael'drath", initial: "K" },
    { title: "Lieutenant Sera Mox", initial: "L" },
    { title: "Mira of the Outer Belt", initial: "M" },
    { title: "Navigator Joss", initial: "N" },
    { title: "Overseer Vault", initial: "O" },
    { title: "Pilot Reena Cho", initial: "P" },
    { title: "Quartermaster Blyte", initial: "Q" },
    { title: "Ranger Cade", initial: "R" },
    { title: "Sentinel Aurax", initial: "S" },
    { title: "Technician Priya", initial: "T" },
    { title: "Ura the Ancient", initial: "U" },
    { title: "Vice Admiral Cross", initial: "V" },
    { title: "Warden Kellach", initial: "W" },
    { title: "Xerith Ambassador", initial: "X" },
    { title: "Yova Dex", initial: "Y" },
    { title: "Zeron Clone-9", initial: "Z" },
  ],
};

// Did you know facts
export const didYouKnow = [
  "The Starfield Chronicles universe spans over 2,000 years of in-universe history across 6 canonical media.",
  "Station Omega-9 was originally designed by the same team that built the ISS interior sets for the 2017 film 'Orbit'.",
  "The Xerith language, Vreth'kal, has over 400 documented words contributed by fans and officially adopted by the production.",
];
