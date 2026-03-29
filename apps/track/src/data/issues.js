// Mock data for Track — ParaNet's Linear clone

export const users = [
  { id: 'u1', name: 'Alex Chen', initials: 'AC', color: '#5e6ad2' },
  { id: 'u2', name: 'Mara Osei', initials: 'MO', color: '#26b5ce' },
  { id: 'u3', name: 'Jin Park', initials: 'JP', color: '#4cb782' },
  { id: 'u4', name: 'Lena Russo', initials: 'LR', color: '#eb5757' },
  { id: 'u5', name: 'Sam Torres', initials: 'ST', color: '#f0820f' },
]

export const projects = [
  { id: 'p1', name: 'Web Platform', color: '#5e6ad2' },
  { id: 'p2', name: 'Mobile App', color: '#26b5ce' },
  { id: 'p3', name: 'Design System', color: '#4cb782' },
]

export const labels = {
  bug: { name: 'Bug', color: '#eb5757', bg: '#eb575720' },
  feature: { name: 'Feature', color: '#5e6ad2', bg: '#5e6ad220' },
  improvement: { name: 'Improvement', color: '#4cb782', bg: '#4cb78220' },
  design: { name: 'Design', color: '#f0820f', bg: '#f0820f20' },
  backend: { name: 'Backend', color: '#26b5ce', bg: '#26b5ce20' },
  frontend: { name: 'Frontend', color: '#f2c94c', bg: '#f2c94c20' },
  performance: { name: 'Performance', color: '#9999a8', bg: '#9999a820' },
  security: { name: 'Security', color: '#eb5757', bg: '#eb575720' },
}

// STATUS: 'in_progress' | 'todo' | 'done' | 'cancelled' | 'backlog'
// PRIORITY: 'urgent' | 'high' | 'medium' | 'low' | 'no_priority'

export const issues = [
  // IN PROGRESS
  {
    id: 'ENG-042',
    title: 'Implement real-time collaboration cursors in the editor',
    status: 'in_progress',
    priority: 'urgent',
    labels: ['feature', 'backend'],
    assigneeId: 'u1',
    dueDate: 'Mar 31',
    projectId: 'p1',
    teamId: 'engineering',
    cycleId: 'c12',
    estimate: 5,
  },
  {
    id: 'ENG-039',
    title: 'Fix authentication token refresh race condition',
    status: 'in_progress',
    priority: 'high',
    labels: ['bug', 'security'],
    assigneeId: 'u2',
    dueDate: 'Mar 30',
    projectId: 'p1',
    teamId: 'engineering',
    cycleId: 'c12',
    estimate: 3,
  },
  {
    id: 'DES-018',
    title: 'Redesign onboarding flow with new brand guidelines',
    status: 'in_progress',
    priority: 'high',
    labels: ['design', 'feature'],
    assigneeId: 'u3',
    dueDate: 'Apr 2',
    projectId: 'p3',
    teamId: 'design',
    cycleId: 'c12',
    estimate: 8,
  },
  // TODO
  {
    id: 'ENG-047',
    title: 'Add webhook support for third-party integrations',
    status: 'todo',
    priority: 'high',
    labels: ['feature', 'backend'],
    assigneeId: 'u1',
    dueDate: 'Apr 7',
    projectId: 'p1',
    teamId: 'engineering',
    cycleId: 'c12',
    estimate: 5,
  },
  {
    id: 'ENG-045',
    title: 'Optimize bundle size — reduce initial load by 40%',
    status: 'todo',
    priority: 'medium',
    labels: ['performance', 'frontend'],
    assigneeId: 'u4',
    dueDate: 'Apr 5',
    projectId: 'p1',
    teamId: 'engineering',
    cycleId: null,
    estimate: 3,
  },
  {
    id: 'PRD-031',
    title: 'Write PRD for AI-assisted issue triage feature',
    status: 'todo',
    priority: 'medium',
    labels: ['feature'],
    assigneeId: 'u5',
    dueDate: 'Apr 4',
    projectId: 'p2',
    teamId: 'product',
    cycleId: null,
    estimate: 2,
  },
  {
    id: 'ENG-048',
    title: 'Migrate remaining REST endpoints to GraphQL',
    status: 'todo',
    priority: 'low',
    labels: ['improvement', 'backend'],
    assigneeId: 'u2',
    dueDate: 'Apr 10',
    projectId: 'p1',
    teamId: 'engineering',
    cycleId: null,
    estimate: 8,
  },
  {
    id: 'DES-021',
    title: 'Create component documentation for icon library',
    status: 'todo',
    priority: 'low',
    labels: ['design', 'frontend'],
    assigneeId: 'u3',
    dueDate: 'Apr 12',
    projectId: 'p3',
    teamId: 'design',
    cycleId: null,
    estimate: 3,
  },
  // DONE
  {
    id: 'ENG-034',
    title: 'Set up CI/CD pipeline with automated test runs',
    status: 'done',
    priority: 'high',
    labels: ['improvement', 'backend'],
    assigneeId: 'u1',
    dueDate: 'Mar 22',
    projectId: 'p1',
    teamId: 'engineering',
    cycleId: 'c11',
    estimate: 5,
  },
  {
    id: 'DES-015',
    title: 'Finalize dark mode color tokens in design system',
    status: 'done',
    priority: 'medium',
    labels: ['design', 'frontend'],
    assigneeId: 'u3',
    dueDate: 'Mar 20',
    projectId: 'p3',
    teamId: 'design',
    cycleId: 'c11',
    estimate: 3,
  },
  // Additional issues for cycles
  {
    id: 'ENG-043',
    title: 'Implement search indexing with Elasticsearch',
    status: 'in_progress',
    priority: 'high',
    labels: ['feature', 'backend'],
    assigneeId: 'u4',
    dueDate: 'Apr 1',
    projectId: 'p1',
    teamId: 'engineering',
    cycleId: 'c12',
    estimate: 8,
  },
  {
    id: 'ENG-044',
    title: 'Add rate limiting to public API endpoints',
    status: 'todo',
    priority: 'urgent',
    labels: ['security', 'backend'],
    assigneeId: 'u2',
    dueDate: 'Apr 3',
    projectId: 'p1',
    teamId: 'engineering',
    cycleId: 'c12',
    estimate: 3,
  },
  {
    id: 'PRD-029',
    title: 'User research: interview 10 enterprise customers',
    status: 'done',
    priority: 'high',
    labels: ['feature'],
    assigneeId: 'u5',
    dueDate: 'Mar 25',
    projectId: 'p2',
    teamId: 'product',
    cycleId: 'c12',
    estimate: 2,
  },
  {
    id: 'DES-019',
    title: 'Prototype mobile navigation patterns',
    status: 'todo',
    priority: 'medium',
    labels: ['design', 'feature'],
    assigneeId: 'u3',
    dueDate: 'Apr 6',
    projectId: 'p2',
    teamId: 'design',
    cycleId: 'c12',
    estimate: 5,
  },
  {
    id: 'ENG-046',
    title: 'Migrate database schema for multi-tenancy support',
    status: 'in_progress',
    priority: 'urgent',
    labels: ['backend', 'improvement'],
    assigneeId: 'u1',
    dueDate: 'Mar 31',
    projectId: 'p1',
    teamId: 'engineering',
    cycleId: 'c12',
    estimate: 13,
  },
]

// Detailed issue for the Issue Detail page
export const detailedIssue = {
  id: 'ENG-042',
  title: 'Implement real-time collaboration cursors in the editor',
  status: 'in_progress',
  priority: 'urgent',
  labels: ['feature', 'backend'],
  assigneeId: 'u1',
  dueDate: '2026-03-31',
  projectId: 'p1',
  teamId: 'engineering',
  cycleId: 'c12',
  estimate: 5,
  parentId: null,
  description: `## Overview

Implement real-time collaboration cursors so users can see where their teammates are editing. This feature is critical for the Q1 Web Platform milestone.

## Technical Approach

Use **operational transforms** (OT) or CRDT-based approach with our existing WebSocket infrastructure.

\`\`\`typescript
interface CollabCursor {
  userId: string;
  position: { line: number; col: number };
  color: string;
  name: string;
  lastSeen: Date;
}

function broadcastCursor(cursor: CollabCursor): void {
  socket.emit('cursor:update', cursor);
}
\`\`\`

## Acceptance Criteria

- [ ] Cursor positions update within 50ms of movement
- [ ] Each user gets a unique color derived from their user ID
- [ ] Cursors fade out after 3 seconds of inactivity
- [ ] Works with up to 25 simultaneous collaborators
- [ ] Mobile touch events supported`,
  subIssues: [
    { id: 'ENG-042a', title: 'WebSocket cursor event schema', status: 'done' },
    { id: 'ENG-042b', title: 'Cursor rendering component in editor', status: 'in_progress' },
    { id: 'ENG-042c', title: 'Cursor presence timeout logic', status: 'todo' },
  ],
  comments: [
    {
      id: 'cm1',
      userId: 'u2',
      text: 'I looked into the OT approach — it might be overkill here since we\'re only tracking cursor positions, not document state. CRDTs would be cleaner.',
      timestamp: 'Mar 27, 2:14 PM',
    },
    {
      id: 'cm2',
      userId: 'u1',
      text: 'Good point. Switching to CRDT. I\'ll start with the `yjs` library since we already use it for the document sync layer.',
      timestamp: 'Mar 27, 3:42 PM',
    },
    {
      id: 'cm3',
      userId: 'u3',
      text: 'For the cursor colors, I\'ve added 8 distinct colors to the design tokens that are accessible on both light and dark backgrounds. Will share the Figma link.',
      timestamp: 'Mar 28, 9:11 AM',
    },
    {
      id: 'cm4',
      userId: 'u4',
      text: 'Load tested cursor broadcasting with 30 simultaneous connections — latency stays under 40ms. We\'re good on performance.',
      timestamp: 'Mar 28, 11:55 AM',
    },
  ],
}

// Cycle data
export const currentCycle = {
  id: 'c12',
  name: 'Cycle 12',
  startDate: 'Mar 25',
  endDate: 'Apr 7',
  daysRemaining: 9,
  totalDays: 14,
  progress: 35,
  issueIds: ['ENG-042', 'ENG-039', 'DES-018', 'ENG-047', 'ENG-043', 'ENG-044', 'PRD-029', 'DES-019', 'ENG-046'],
}

export const burnupData = [
  { day: 'Mar 25', scope: 10, completed: 0 },
  { day: 'Mar 26', scope: 10, completed: 0 },
  { day: 'Mar 27', scope: 11, completed: 1 },
  { day: 'Mar 28', scope: 12, completed: 2 },
  { day: 'Mar 29', scope: 12, completed: 3 },
  { day: 'Mar 30', scope: 13, completed: 3 },
  { day: 'Mar 31', scope: 13, completed: 4 },
  { day: 'Apr 1', scope: 13, completed: null },
  { day: 'Apr 2', scope: 13, completed: null },
  { day: 'Apr 3', scope: 13, completed: null },
  { day: 'Apr 4', scope: 13, completed: null },
  { day: 'Apr 5', scope: 13, completed: null },
  { day: 'Apr 6', scope: 13, completed: null },
  { day: 'Apr 7', scope: 13, completed: null },
]

// Roadmap initiatives
export const initiatives = [
  {
    id: 'i1',
    name: 'Real-time Collaboration',
    team: 'Engineering',
    teamColor: '#5e6ad2',
    startQ: 1, startWeek: 4,
    endQ: 2, endWeek: 3,
    progress: 45,
    status: 'in_progress',
  },
  {
    id: 'i2',
    name: 'Mobile App v2.0',
    team: 'Product',
    teamColor: '#26b5ce',
    startQ: 1, startWeek: 2,
    endQ: 2, endWeek: 6,
    progress: 20,
    status: 'in_progress',
  },
  {
    id: 'i3',
    name: 'Design System 3.0',
    team: 'Design',
    teamColor: '#4cb782',
    startQ: 1, startWeek: 1,
    endQ: 1, endWeek: 12,
    progress: 80,
    status: 'in_progress',
  },
  {
    id: 'i4',
    name: 'Enterprise SSO & Permissions',
    team: 'Engineering',
    teamColor: '#5e6ad2',
    startQ: 2, startWeek: 1,
    endQ: 2, endWeek: 10,
    progress: 0,
    status: 'planned',
  },
  {
    id: 'i5',
    name: 'AI Issue Triage',
    team: 'Product',
    teamColor: '#26b5ce',
    startQ: 2, startWeek: 4,
    endQ: 3, endWeek: 4,
    progress: 0,
    status: 'planned',
  },
  {
    id: 'i6',
    name: 'Performance Overhaul',
    team: 'Engineering',
    teamColor: '#5e6ad2',
    startQ: 3, startWeek: 1,
    endQ: 3, endWeek: 8,
    progress: 0,
    status: 'planned',
  },
  {
    id: 'i7',
    name: 'Expanded Analytics Dashboard',
    team: 'Product',
    teamColor: '#26b5ce',
    startQ: 3, startWeek: 6,
    endQ: 4, endWeek: 4,
    progress: 0,
    status: 'planned',
  },
]
