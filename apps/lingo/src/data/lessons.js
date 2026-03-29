// ── Lesson Path Nodes ────────────────────────────────────────────────────────
export const sections = [
  {
    id: 1,
    title: 'Section 1: Basics',
    color: '#58cc02',
    bgColor: '#d7f0b6',
    nodes: [
      { id: 1,  type: 'completed', icon: '⭐', title: 'Hello & Greetings',   xp: 10 },
      { id: 2,  type: 'completed', icon: '⭐', title: 'Numbers 1–10',         xp: 10 },
      { id: 3,  type: 'completed', icon: '⭐', title: 'Colors',               xp: 10 },
      { id: 4,  type: 'completed', icon: '🏆', title: 'Unit Challenge',       xp: 20 },
    ],
  },
  {
    id: 2,
    title: 'Section 2: Phrases',
    color: '#1cb0f6',
    bgColor: '#c5eafd',
    nodes: [
      { id: 5,  type: 'completed', icon: '⭐', title: 'Common Phrases',       xp: 10 },
      { id: 6,  type: 'completed', icon: '⭐', title: 'Food & Drinks',        xp: 10 },
      { id: 7,  type: 'active',    icon: '⭐', title: 'Travel & Directions',  xp: 10 },
      { id: 8,  type: 'locked',    icon: '🏆', title: 'Unit Challenge',       xp: 20 },
    ],
  },
  {
    id: 3,
    title: 'Section 3: Family',
    color: '#ff9600',
    bgColor: '#ffe5b4',
    nodes: [
      { id: 9,  type: 'locked',    icon: '⭐', title: 'Family Members',       xp: 10 },
      { id: 10, type: 'locked',    icon: '⭐', title: 'Relationships',         xp: 10 },
      { id: 11, type: 'locked',    icon: '⭐', title: 'Descriptions',         xp: 10 },
      { id: 12, type: 'locked',    icon: '🏆', title: 'Unit Challenge',       xp: 20 },
    ],
  },
  {
    id: 4,
    title: 'Section 4: Work',
    color: '#ce82ff',
    bgColor: '#f0d6ff',
    nodes: [
      { id: 13, type: 'locked',    icon: '⭐', title: 'Jobs & Professions',   xp: 10 },
      { id: 14, type: 'locked',    icon: '⭐', title: 'Office Vocabulary',    xp: 10 },
      { id: 15, type: 'locked',    icon: '⭐', title: 'Work Conversations',   xp: 10 },
      { id: 16, type: 'locked',    icon: '🏆', title: 'Unit Challenge',       xp: 20 },
    ],
  },
  {
    id: 5,
    title: 'Section 5: Advanced',
    color: '#ffd900',
    bgColor: '#fff5b4',
    nodes: [
      { id: 17, type: 'locked',    icon: '⭐', title: 'Complex Sentences',    xp: 15 },
      { id: 18, type: 'locked',    icon: '⭐', title: 'Storytelling',         xp: 15 },
      { id: 19, type: 'locked',    icon: '⭐', title: 'Idioms & Slang',       xp: 15 },
      { id: 20, type: 'locked',    icon: '🏆', title: 'Mastery Challenge',    xp: 30 },
    ],
  },
]

// ── Exercises ────────────────────────────────────────────────────────────────
export const exercises = [
  {
    id: 1,
    type: 'multiple_choice',
    instruction: 'TRANSLATE THIS SENTENCE',
    question: '¿Cómo te llamas?',
    questionNote: 'What does this mean?',
    options: [
      { id: 'a', text: 'Where are you from?',  correct: false },
      { id: 'b', text: 'What is your name?',   correct: true  },
      { id: 'c', text: 'How are you today?',   correct: false },
    ],
  },
  {
    id: 2,
    type: 'word_bank',
    instruction: 'TAP THE WORDS IN ORDER',
    question: 'Me llamo María.',
    questionNote: 'Arrange the words to translate:',
    hint: 'My name is María.',
    wordBank: ['name', 'My', 'María', 'is', 'called', 'am'],
    answer: ['My', 'name', 'is', 'María'],
  },
  {
    id: 3,
    type: 'type_answer',
    instruction: 'TYPE WHAT YOU HEAR',
    question: 'Buenos días.',
    questionNote: 'Type the translation in English:',
    answer: 'Good morning',
    hint: 'A morning greeting',
  },
]

// ── Leaderboard ──────────────────────────────────────────────────────────────
export const leaderboard = [
  { rank: 1,  name: 'SofiaR',    xp: 2840, avatar: '🦊', color: '#ff9600' },
  { rank: 2,  name: 'MaxKlein',  xp: 2610, avatar: '🐺', color: '#ce82ff' },
  { rank: 3,  name: 'AnaLuz',    xp: 2380, avatar: '🦁', color: '#ffd900' },
  { rank: 4,  name: 'JinhoK',    xp: 1990, avatar: '🐧', color: '#1cb0f6' },
  { rank: 5,  name: 'PriyaM',    xp: 1760, avatar: '🦋', color: '#ff4b4b' },
  { rank: 6,  name: 'CarlosBR',  xp: 1540, avatar: '🐸', color: '#58cc02' },
  { rank: 7,  name: 'YukiT',     xp: 1320, avatar: '🐼', color: '#4b4b4b' },
  { rank: 8,  name: 'You',       xp: 1180, avatar: '🦉', color: '#58cc02', isMe: true },
  { rank: 9,  name: 'EmiliaF',   xp:  970, avatar: '🦄', color: '#ce82ff' },
  { rank: 10, name: 'TomaszW',   xp:  860, avatar: '🐯', color: '#ff9600' },
  { rank: 11, name: 'RitaOA',    xp:  640, avatar: '🐻', color: '#1cb0f6' },
  { rank: 12, name: 'DaisyL',    xp:  510, avatar: '🦌', color: '#ff4b4b' },
  { rank: 13, name: 'NadjaN',    xp:  390, avatar: '🦩', color: '#ffd900' },
  { rank: 14, name: 'OscarV',    xp:  260, avatar: '🐊', color: '#58cc02' },
  { rank: 15, name: 'BeatrizO',  xp:  140, avatar: '🦚', color: '#ce82ff' },
]

// ── Profile ──────────────────────────────────────────────────────────────────
export const profile = {
  name: 'LingoLearner',
  username: '@lingolover',
  joined: 'March 2024',
  avatar: '🦉',
  streak: 47,
  totalXP: 12340,
  languages: 2,
  league: 'Diamond',
  following: 12,
  followers: 8,
  weeklyXP: [85, 120, 60, 145, 90, 200, 123],
  weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  achievements: [
    { id: 1, icon: '🔥', title: 'On Fire',      desc: '7-day streak',      earned: true  },
    { id: 2, icon: '💎', title: 'Diamond',      desc: 'Reach Diamond League', earned: true },
    { id: 3, icon: '⚡', title: 'Speed Learner', desc: '100 XP in one day', earned: true  },
    { id: 4, icon: '🏆', title: 'Champion',     desc: '30-day streak',     earned: false },
    { id: 5, icon: '🌍', title: 'Polyglot',     desc: 'Learn 3 languages', earned: false },
    { id: 6, icon: '🎯', title: 'Perfect Week', desc: 'All goals met',     earned: false },
  ],
  friends: [
    { name: 'SofiaR',   avatar: '🦊', streak: 63, xp: 2840 },
    { name: 'JinhoK',   avatar: '🐧', streak: 28, xp: 1990 },
    { name: 'PriyaM',   avatar: '🦋', streak: 14, xp: 1760 },
  ],
}
