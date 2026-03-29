export const recentDocs = [
  {
    id: 1,
    title: 'Product Requirements Document',
    lastEdited: '2 minutes ago',
    owner: 'You',
    gradient: 'linear-gradient(135deg, #e8f0fe 0%, #c5d9ff 100%)',
    accentColor: '#1a73e8',
  },
  {
    id: 2,
    title: 'Q2 Marketing Strategy',
    lastEdited: '1 hour ago',
    owner: 'Sarah K.',
    gradient: 'linear-gradient(135deg, #e6f4ea 0%, #b7dfc5 100%)',
    accentColor: '#34a853',
  },
  {
    id: 3,
    title: 'Engineering Onboarding Guide',
    lastEdited: '3 hours ago',
    owner: 'You',
    gradient: 'linear-gradient(135deg, #fce8e6 0%, #f5c2be 100%)',
    accentColor: '#ea4335',
  },
  {
    id: 4,
    title: 'Sprint Retrospective — March',
    lastEdited: 'Yesterday',
    owner: 'Marcus L.',
    gradient: 'linear-gradient(135deg, #fef7e0 0%, #fbdfa3 100%)',
    accentColor: '#fbbc04',
  },
  {
    id: 5,
    title: 'ParaNet Design System v2',
    lastEdited: 'Yesterday',
    owner: 'You',
    gradient: 'linear-gradient(135deg, #f3e8fd 0%, #ddb9f9 100%)',
    accentColor: '#a142f4',
  },
  {
    id: 6,
    title: 'Annual Performance Review',
    lastEdited: '2 days ago',
    owner: 'You',
    gradient: 'linear-gradient(135deg, #e8f5e9 0%, #a8d5b5 100%)',
    accentColor: '#0f9d58',
  },
  {
    id: 7,
    title: 'Investor Update — April 2025',
    lastEdited: '3 days ago',
    owner: 'Anika R.',
    gradient: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
    accentColor: '#1565c0',
  },
  {
    id: 8,
    title: 'Team Charter & Working Agreements',
    lastEdited: '4 days ago',
    owner: 'You',
    gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)',
    accentColor: '#f57c00',
  },
  {
    id: 9,
    title: 'UX Research Synthesis',
    lastEdited: '5 days ago',
    owner: 'Jamie T.',
    gradient: 'linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)',
    accentColor: '#c62828',
  },
  {
    id: 10,
    title: 'Data Privacy Policy Draft',
    lastEdited: '1 week ago',
    owner: 'Legal Team',
    gradient: 'linear-gradient(135deg, #eceff1 0%, #b0bec5 100%)',
    accentColor: '#546e7a',
  },
  {
    id: 11,
    title: 'Feature Roadmap H2 2025',
    lastEdited: '1 week ago',
    owner: 'You',
    gradient: 'linear-gradient(135deg, #e8eaf6 0%, #9fa8da 100%)',
    accentColor: '#3949ab',
  },
  {
    id: 12,
    title: 'Meeting Notes — Product Sync',
    lastEdited: '10 days ago',
    owner: 'Marcus L.',
    gradient: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)',
    accentColor: '#00838f',
  },
  {
    id: 13,
    title: 'Brand Voice Guidelines',
    lastEdited: '2 weeks ago',
    owner: 'You',
    gradient: 'linear-gradient(135deg, #f9fbe7 0%, #dce775 100%)',
    accentColor: '#827717',
  },
  {
    id: 14,
    title: 'Competitive Analysis Report',
    lastEdited: '2 weeks ago',
    owner: 'Sarah K.',
    gradient: 'linear-gradient(135deg, #ede7f6 0%, #ce93d8 100%)',
    accentColor: '#6a1b9a',
  },
  {
    id: 15,
    title: 'Architecture Decision Records',
    lastEdited: '3 weeks ago',
    owner: 'You',
    gradient: 'linear-gradient(135deg, #e8f5e9 0%, #66bb6a 100%)',
    accentColor: '#2e7d32',
  },
];

export const collaborators = [
  { id: 1, initials: 'SK', name: 'Sarah Kim', color: '#ea4335', cursor: 'Editing paragraph 2' },
  { id: 2, initials: 'ML', name: 'Marcus Lee', color: '#34a853', cursor: 'Viewing table' },
  { id: 3, initials: 'AR', name: 'Anika Rao', color: '#fbbc04', cursor: 'In Goals section' },
];

export const comments = [
  {
    id: 1,
    author: 'Sarah Kim',
    initials: 'SK',
    color: '#ea4335',
    time: '12 minutes ago',
    text: 'Should we expand on the non-goals? The current list feels too brief for stakeholder review.',
    resolved: false,
    selectionText: 'Non-Goals',
  },
  {
    id: 2,
    author: 'Marcus Lee',
    initials: 'ML',
    color: '#34a853',
    time: '1 hour ago',
    text: 'Great structure! Suggest adding latency benchmarks to the Technical Specs table.',
    resolved: true,
    selectionText: 'Technical Specifications',
  },
];

export const docContent = {
  title: 'Product Requirements Document — Q2 2025',
  sections: [
    {
      type: 'h1',
      text: 'Executive Summary',
    },
    {
      type: 'p',
      text: 'This document outlines the product requirements for the ParaNet platform\'s Q2 2025 milestone. The focus is on collaborative tooling, real-time synchronization, and expanding the enterprise feature set. All engineering teams should treat this as the source of truth for prioritization decisions during the quarter.',
    },
    {
      type: 'p',
      text: 'Stakeholders are expected to review and sign off on the Goals & Non-Goals section by April 15th. Engineering leads will finalize technical specifications no later than April 22nd. Any changes after sign-off require a formal change request and product manager approval.',
    },
    {
      type: 'h1',
      text: 'Goals & Non-Goals',
    },
    {
      type: 'p',
      text: 'The following goals have been approved by product leadership and reflect the Q2 OKR commitments:',
    },
    {
      type: 'ul',
      items: [
        'Launch real-time co-editing across all document types with conflict-free merge support',
        'Reduce document load time by 40% through CDN optimization and incremental hydration',
        'Introduce role-based access controls (RBAC) for enterprise workspace management',
      ],
    },
    {
      type: 'p',
      text: 'Items explicitly excluded from Q2 scope (Non-Goals):',
    },
    {
      type: 'ol',
      items: [
        'Mobile-native application redesign (deferred to Q3)',
        'Third-party OAuth provider expansion beyond Google and Microsoft',
        'Offline-first mode — requires infrastructure work not scheduled this quarter',
        'AI-generated document summaries — pending model evaluation',
      ],
    },
    {
      type: 'h1',
      text: 'Technical Specifications',
    },
    {
      type: 'p',
      text: 'The table below summarizes key technical parameters agreed upon with the infrastructure team. These values represent targets, not hard limits, unless marked with ✦.',
    },
    {
      type: 'table',
      headers: ['Component', 'Target Metric', 'Owner', 'Status'],
      rows: [
        ['Real-time Sync Engine', 'P99 latency < 80ms', 'Platform Eng.', '✦ Required'],
        ['Document Storage', '99.99% uptime SLA', 'Infra', 'In Progress'],
        ['Search Index', 'Full-text index < 500ms', 'Data Eng.', 'Planned'],
      ],
    },
  ],
};

export const templates = [
  { id: 1, name: 'Meeting Notes', category: 'Work', gradient: 'linear-gradient(135deg, #e8f0fe, #c5d9ff)' },
  { id: 2, name: 'Resume', category: 'Personal', gradient: 'linear-gradient(135deg, #e6f4ea, #b7dfc5)' },
  { id: 3, name: 'Cover Letter', category: 'Personal', gradient: 'linear-gradient(135deg, #fce8e6, #f5c2be)' },
  { id: 4, name: 'Project Proposal', category: 'Work', gradient: 'linear-gradient(135deg, #fef7e0, #fbdfa3)' },
  { id: 5, name: 'Lesson Plan', category: 'Education', gradient: 'linear-gradient(135deg, #f3e8fd, #ddb9f9)' },
  { id: 6, name: 'Research Paper', category: 'Education', gradient: 'linear-gradient(135deg, #e3f2fd, #90caf9)' },
  { id: 7, name: 'Business Letter', category: 'Work', gradient: 'linear-gradient(135deg, #fff3e0, #ffcc80)' },
  { id: 8, name: 'Newsletter', category: 'Personal', gradient: 'linear-gradient(135deg, #fce4ec, #f48fb1)' },
  { id: 9, name: 'Class Notes', category: 'Education', gradient: 'linear-gradient(135deg, #e0f7fa, #80deea)' },
  { id: 10, name: 'Invoice', category: 'Work', gradient: 'linear-gradient(135deg, #eceff1, #b0bec5)' },
  { id: 11, name: 'Book Report', category: 'Education', gradient: 'linear-gradient(135deg, #e8eaf6, #9fa8da)' },
  { id: 12, name: 'Journal Entry', category: 'Personal', gradient: 'linear-gradient(135deg, #f9fbe7, #dce775)' },
];