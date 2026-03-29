export const CURRENT_USER = {
  name: 'Jordan Blake',
  karma: 15420,
}

export const PROJECTS = [
  { id: 'work',     name: 'Work',        color: '#db4035', taskCount: 7 },
  { id: 'personal', name: 'Personal',    color: '#ff9933', taskCount: 4 },
  { id: 'learning', name: 'Learning',    color: '#4073ff', taskCount: 4 },
  { id: 'health',   name: 'Health',      color: '#25b84c', taskCount: 3 },
  { id: 'finance',  name: 'Finance',     color: '#a970ff', taskCount: 2 },
]

export const FAVORITES = [
  { id: 'work',    name: 'Work',    color: '#db4035' },
  { id: 'health',  name: 'Health',  color: '#25b84c' },
]

export const LABELS = {
  work:    { name: '@work',    color: '#db4035' },
  home:    { name: '@home',    color: '#ff9933' },
  urgent:  { name: '@urgent',  color: '#ff4d4d' },
  waiting: { name: '@waiting', color: '#888888' },
}

// Today = 2026-03-29
const TODAY     = '2026-03-29'
const YESTERDAY = '2026-03-27'
const TWO_AGO   = '2026-03-28'
const TOMORROW  = '2026-03-30'
const APR3      = '2026-04-03'
const APR7      = '2026-04-07'

export const TASKS = [
  // ─── OVERDUE (2) ───────────────────────────────────────────
  {
    id: 101,
    title: 'Submit Q1 expense report',
    priority: 1,
    project: 'work',
    labels: ['work', 'urgent'],
    dueDate: YESTERDAY,
    subtasks: 0,
    comments: 1,
    completed: false,
    section: 'overdue',
  },
  {
    id: 102,
    title: 'Schedule dentist appointment',
    priority: 2,
    project: 'personal',
    labels: ['home'],
    dueDate: TWO_AGO,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'overdue',
  },

  // ─── TODAY — Active (12) ────────────────────────────────────
  {
    id: 1,
    title: 'Finalize Q2 roadmap presentation',
    priority: 1,
    project: 'work',
    labels: ['work', 'urgent'],
    dueDate: TODAY,
    subtasks: 3,
    comments: 4,
    completed: false,
    section: 'today',
  },
  {
    id: 2,
    title: 'Deploy hotfix to production API',
    priority: 1,
    project: 'work',
    labels: ['work', 'urgent'],
    dueDate: TODAY,
    subtasks: 2,
    comments: 6,
    completed: false,
    section: 'today',
  },
  {
    id: 3,
    title: 'Weekly team standup + retro notes',
    priority: 2,
    project: 'work',
    labels: ['work'],
    dueDate: TODAY,
    subtasks: 0,
    comments: 1,
    completed: false,
    section: 'today',
  },
  {
    id: 4,
    title: 'Review open pull requests',
    priority: 2,
    project: 'work',
    labels: ['work'],
    dueDate: TODAY,
    subtasks: 0,
    comments: 2,
    completed: false,
    section: 'today',
  },
  {
    id: 5,
    title: 'Await design approval from client',
    priority: 2,
    project: 'work',
    labels: ['work', 'waiting'],
    dueDate: TODAY,
    subtasks: 0,
    comments: 3,
    completed: false,
    section: 'today',
  },
  {
    id: 6,
    title: 'Pay utility bills',
    priority: 2,
    project: 'personal',
    labels: ['home'],
    dueDate: TODAY,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'today',
  },
  {
    id: 7,
    title: 'Complete React course — Module 4: Suspense',
    priority: 3,
    project: 'learning',
    labels: ['work'],
    dueDate: TODAY,
    subtasks: 2,
    comments: 0,
    completed: false,
    section: 'today',
  },
  {
    id: 8,
    title: 'Read "The Pragmatic Programmer" ch. 5–6',
    priority: 3,
    project: 'learning',
    labels: [],
    dueDate: TODAY,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'today',
  },
  {
    id: 9,
    title: '30 min cardio + stretch',
    priority: 3,
    project: 'health',
    labels: ['home'],
    dueDate: TODAY,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'today',
  },
  {
    id: 10,
    title: 'Buy groceries (see list)',
    priority: 4,
    project: 'personal',
    labels: ['home'],
    dueDate: TODAY,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'today',
  },
  {
    id: 11,
    title: 'Call mom',
    priority: 4,
    project: 'personal',
    labels: ['home'],
    dueDate: TODAY,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'today',
  },
  {
    id: 12,
    title: 'Review monthly budget tracker',
    priority: 3,
    project: 'finance',
    labels: [],
    dueDate: TODAY,
    subtasks: 1,
    comments: 0,
    completed: false,
    section: 'today',
  },

  // ─── TODAY — Completed (3) ──────────────────────────────────
  {
    id: 21,
    title: 'Update project documentation',
    priority: 3,
    project: 'work',
    labels: ['work'],
    dueDate: TODAY,
    subtasks: 0,
    comments: 0,
    completed: true,
    section: 'today',
  },
  {
    id: 22,
    title: 'Take vitamins',
    priority: 4,
    project: 'health',
    labels: ['home'],
    dueDate: TODAY,
    subtasks: 0,
    comments: 0,
    completed: true,
    section: 'today',
  },
  {
    id: 23,
    title: 'Morning journal entry',
    priority: 4,
    project: 'personal',
    labels: [],
    dueDate: TODAY,
    subtasks: 0,
    comments: 0,
    completed: true,
    section: 'today',
  },

  // ─── INBOX (5 — no due date) ────────────────────────────────
  {
    id: 31,
    title: 'Research new project management tools',
    priority: 3,
    project: null,
    labels: ['work'],
    dueDate: null,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'inbox',
  },
  {
    id: 32,
    title: 'Write blog post about async/await patterns',
    priority: 2,
    project: null,
    labels: ['work'],
    dueDate: null,
    subtasks: 0,
    comments: 1,
    completed: false,
    section: 'inbox',
  },
  {
    id: 33,
    title: 'Fix kitchen faucet',
    priority: 3,
    project: null,
    labels: ['home'],
    dueDate: null,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'inbox',
  },
  {
    id: 34,
    title: 'Look into Roth IRA contribution limits for 2026',
    priority: 2,
    project: null,
    labels: [],
    dueDate: null,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'inbox',
  },
  {
    id: 35,
    title: 'Plan summer vacation itinerary',
    priority: 4,
    project: null,
    labels: ['home'],
    dueDate: null,
    subtasks: 3,
    comments: 2,
    completed: false,
    section: 'inbox',
  },

  // ─── UPCOMING ───────────────────────────────────────────────
  {
    id: 41,
    title: 'Client product demo presentation',
    priority: 1,
    project: 'work',
    labels: ['work', 'urgent'],
    dueDate: TOMORROW,
    subtasks: 4,
    comments: 2,
    completed: false,
    section: 'upcoming',
  },
  {
    id: 42,
    title: 'Meal prep for the week',
    priority: 3,
    project: 'health',
    labels: ['home'],
    dueDate: TOMORROW,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'upcoming',
  },
  {
    id: 43,
    title: 'Sprint planning meeting',
    priority: 2,
    project: 'work',
    labels: ['work'],
    dueDate: APR3,
    subtasks: 1,
    comments: 0,
    completed: false,
    section: 'upcoming',
  },
  {
    id: 44,
    title: 'Online webinar: AI trends in 2026',
    priority: 3,
    project: 'learning',
    labels: ['work'],
    dueDate: APR3,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'upcoming',
  },
  {
    id: 45,
    title: 'Annual health checkup',
    priority: 2,
    project: 'health',
    labels: ['home'],
    dueDate: APR7,
    subtasks: 0,
    comments: 0,
    completed: false,
    section: 'upcoming',
  },
]

// ─── PROJECT SECTION DATA ────────────────────────────────────────
export const PROJECT_SECTIONS = {
  work: [
    {
      id: 'design',
      name: 'Design',
      tasks: [1, 3, 5],
    },
    {
      id: 'development',
      name: 'Development',
      tasks: [2, 4, 21],
    },
    {
      id: 'review',
      name: 'Review',
      tasks: [41, 43],
    },
  ],
}

export const PRIORITY_COLORS = {
  1: '#db4035',
  2: '#ff9933',
  3: '#4073ff',
  4: '#666666',
}

export const PRIORITY_LABELS = {
  1: 'Priority 1',
  2: 'Priority 2',
  3: 'Priority 3',
  4: 'Priority 4',
}

export function getTaskById(id) {
  return TASKS.find(t => t.id === id)
}

export function formatDueDate(dateStr) {
  if (!dateStr) return null
  const today = new Date('2026-03-29')
  const date  = new Date(dateStr)
  const diff  = Math.floor((date - today) / 86400000)
  const opts  = { month: 'short', day: 'numeric' }
  if (diff < 0)  return { label: date.toLocaleDateString('en-US', opts), type: 'overdue' }
  if (diff === 0) return { label: 'Today', type: 'today' }
  if (diff === 1) return { label: 'Tomorrow', type: 'future' }
  return { label: date.toLocaleDateString('en-US', opts), type: 'future' }
}
