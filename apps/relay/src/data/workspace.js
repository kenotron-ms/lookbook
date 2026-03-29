export const CURRENT_USER = {
  id: 'u1',
  name: 'Jordan Blake',
  avatar: 'JB',
  status: '🎯 In a meeting',
  statusEmoji: '🎯',
  statusText: 'In a meeting',
  color: '#4a154b',
};

export const CHANNELS = [
  { id: 'c1', name: 'general', description: 'General chatter and announcements', unread: 0, active: true },
  { id: 'c2', name: 'random', description: 'Anything goes', unread: 3, active: false },
  { id: 'c3', name: 'design', description: 'Design team channel', unread: 1, active: false },
  { id: 'c4', name: 'engineering', description: 'Engineering discussions', unread: 7, active: false },
  { id: 'c5', name: 'announcements', description: 'Company-wide announcements', unread: 0, active: false },
  { id: 'c6', name: 'off-topic', description: 'Fun stuff', unread: 2, active: false },
];

export const USERS = [
  { id: 'u1', name: 'Jordan Blake',   avatar: 'JB', color: '#4a154b', online: true  },
  { id: 'u2', name: 'Sam Rivera',     avatar: 'SR', color: '#1264a3', online: true  },
  { id: 'u3', name: 'Alex Chen',      avatar: 'AC', color: '#007a5a', online: false },
  { id: 'u4', name: 'Morgan Kim',     avatar: 'MK', color: '#e01e5a', online: true  },
  { id: 'u5', name: 'Taylor Osei',    avatar: 'TO', color: '#de7802', online: false },
];

export const MESSAGES = [
  {
    id: 'm1', userId: 'u2', channelId: 'c1',
    text: 'Good morning everyone! 👋 Hope you all had a great weekend.',
    timestamp: '9:03 AM', reactions: [{ emoji: '👋', count: 4 }, { emoji: '☀️', count: 2 }],
    replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm2', userId: 'u3', channelId: 'c1',
    text: 'Morning! Reminder that we have the Q2 planning kickoff at 10am in the main conference room.',
    timestamp: '9:07 AM', reactions: [{ emoji: '👍', count: 6 }],
    replies: { count: 5, lastReply: '2 hours ago' }, attachment: null, unfurl: null,
  },
  {
    id: 'm3', userId: 'u4', channelId: 'c1',
    text: 'Thanks @Alex — already on my calendar. Should we do a quick async standup before then?',
    timestamp: '9:09 AM', reactions: [], replies: null, attachment: null, unfurl: null,
    mention: true,
  },
  {
    id: 'm4', userId: 'u2', channelId: 'c1',
    text: 'Great idea. I\'ll drop a thread in #engineering for the eng side.',
    timestamp: '9:11 AM', reactions: [{ emoji: '🎉', count: 3 }],
    replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm5', userId: 'u5', channelId: 'c1',
    text: 'Just pushed the new design system tokens to Figma — take a look when you get a chance.',
    timestamp: '9:15 AM', reactions: [{ emoji: '🔥', count: 5 }, { emoji: '❤️', count: 2 }],
    replies: { count: 3, lastReply: '1 hour ago' }, attachment: null, unfurl: null,
  },
  {
    id: 'm6', userId: 'u5', channelId: 'c1',
    text: 'Here\'s the link to the updated component library:',
    timestamp: '9:15 AM', reactions: [], replies: null,
    attachment: null,
    unfurl: {
      url: 'https://figma.com/design/paranet-ds',
      title: 'ParaNet Design System v2.0',
      description: 'Updated tokens, components, and interaction patterns for the ParaNet product suite.',
      favicon: '🎨',
    },
  },
  {
    id: 'm7', userId: 'u1', channelId: 'c1',
    text: 'This looks amazing @Taylor! The spacing scale is so much cleaner.',
    timestamp: '9:22 AM', reactions: [{ emoji: '💯', count: 4 }],
    replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm8', userId: 'u3', channelId: 'c1',
    text: 'Agreed. Also uploaded the brand refresh PDF if anyone needs the full guidelines.',
    timestamp: '9:28 AM', reactions: [{ emoji: '📎', count: 1 }],
    replies: null,
    attachment: { name: 'ParaNet_Brand_Refresh_2025.pdf', size: '4.2 MB', type: 'pdf', color: '#e01e5a' },
    unfurl: null,
  },
  {
    id: 'm9', userId: 'u4', channelId: 'c1',
    text: 'Has anyone seen the new competitor analysis doc? Worth a read before the planning session.',
    timestamp: '9:34 AM', reactions: [], replies: { count: 2, lastReply: '45 min ago' },
    attachment: null, unfurl: null,
  },
  {
    id: 'm10', userId: 'u2', channelId: 'c1',
    text: 'Quick heads up — the staging environment is back up after last night\'s maintenance window. All clear! ✅',
    timestamp: '9:41 AM', reactions: [{ emoji: '✅', count: 7 }, { emoji: '🙌', count: 3 }],
    replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm11', userId: 'u1', channelId: 'c1',
    text: 'Perfect timing. I was just about to test the new auth flow.',
    timestamp: '9:43 AM', reactions: [], replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm12', userId: 'u5', channelId: 'c1',
    text: 'FYI I\'ve scheduled a design review for Thursday at 2pm. Calendar invite going out shortly.',
    timestamp: '9:50 AM', reactions: [{ emoji: '👍', count: 3 }],
    replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm13', userId: 'u3', channelId: 'c1',
    text: 'Anyone want to grab lunch today? There\'s a new ramen place that opened on Main St.',
    timestamp: '10:05 AM', reactions: [{ emoji: '🍜', count: 5 }, { emoji: '🙋', count: 4 }],
    replies: { count: 8, lastReply: '30 min ago' }, attachment: null, unfurl: null,
  },
  {
    id: 'm14', userId: 'u4', channelId: 'c1',
    text: 'I\'m in! What time are you thinking?',
    timestamp: '10:06 AM', reactions: [], replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm15', userId: 'u3', channelId: 'c1',
    text: 'Let\'s say 12:30? Meet in the lobby.',
    timestamp: '10:08 AM', reactions: [{ emoji: '👍', count: 4 }, { emoji: '🎉', count: 1 }],
    replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm16', userId: 'u2', channelId: 'c1',
    text: 'Wish I could but I have a client call. Save me some leftovers 😂',
    timestamp: '10:09 AM', reactions: [{ emoji: '😂', count: 6 }],
    replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm17', userId: 'u5', channelId: 'c1',
    text: 'Just merged the Relay feature branch. CI is green, ready for review.',
    timestamp: '10:15 AM', reactions: [{ emoji: '🚀', count: 5 }, { emoji: '🙌', count: 2 }],
    replies: { count: 4, lastReply: '10 min ago' }, attachment: null, unfurl: null,
  },
  {
    id: 'm18', userId: 'u1', channelId: 'c1',
    text: 'On it — will leave comments by EOD.',
    timestamp: '10:17 AM', reactions: [{ emoji: '👍', count: 2 }],
    replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm19', userId: 'u4', channelId: 'c1',
    text: 'Also shared the sprint retrospective notes in the #design channel. Lots of good action items.',
    timestamp: '10:22 AM', reactions: [{ emoji: '📝', count: 3 }],
    replies: null, attachment: null, unfurl: null,
  },
  {
    id: 'm20', userId: 'u2', channelId: 'c1',
    text: 'Great sprint everyone — shipping fast and staying quality. That\'s the ParaNet way. 💜',
    timestamp: '10:30 AM', reactions: [{ emoji: '💜', count: 8 }, { emoji: '🎉', count: 5 }, { emoji: '🙌', count: 4 }],
    replies: null, attachment: null, unfurl: null,
  },
];

export const DM_CONVERSATIONS = [
  {
    id: 'd1',
    userId: 'u2',
    unread: 2,
    messages: [
      { id: 'dm1', userId: 'u2', text: 'Hey Jordan, do you have 5 min to chat about the new onboarding flow?', timestamp: '9:45 AM', reactions: [] },
      { id: 'dm2', userId: 'u1', text: 'Sure! Give me 10, I\'m just finishing up a PR review.', timestamp: '9:46 AM', reactions: [] },
      { id: 'dm3', userId: 'u2', text: 'No rush, just ping me when you\'re free. I\'ll be in the design room.', timestamp: '9:47 AM', reactions: [{ emoji: '👍', count: 1 }] },
      { id: 'dm4', userId: 'u2', text: 'Also, quick question — did you see the Figma comments from the stakeholder review?', timestamp: '9:50 AM', reactions: [] },
      { id: 'dm5', userId: 'u1', text: 'Yes! Some good feedback in there. Let\'s talk about the nav changes.', timestamp: '9:55 AM', reactions: [] },
      { id: 'dm6', userId: 'u2', text: 'Perfect, see you in a bit 🙌', timestamp: '9:56 AM', reactions: [{ emoji: '🙌', count: 1 }] },
    ],
  },
  { id: 'd2', userId: 'u3', unread: 0, messages: [] },
  { id: 'd3', userId: 'u4', unread: 1, messages: [] },
  { id: 'd4', userId: 'u5', unread: 0, messages: [] },
];

export const CANVAS_DOC = {
  title: 'Q2 Product Roadmap',
  lastEdited: 'Today at 9:30 AM',
  author: 'u3',
  blocks: [
    { type: 'heading1', content: 'Q2 2025 Product Roadmap' },
    { type: 'paragraph', content: 'This document outlines our key initiatives and milestones for Q2. All team members are encouraged to add comments and suggestions.' },
    { type: 'heading2', content: '🎯 Goals' },
    { type: 'bullet', content: 'Ship Relay messaging platform MVP' },
    { type: 'bullet', content: 'Complete design system v2.0 rollout' },
    { type: 'bullet', content: 'Onboard 3 new enterprise customers' },
    { type: 'bullet', content: 'Achieve 99.9% uptime SLA' },
    { type: 'heading2', content: '📅 Key Milestones' },
    { type: 'paragraph', content: 'Below are the major milestones broken out by team. Engineering will lead on infrastructure, while design focuses on the user experience refresh.' },
    { type: 'heading2', content: '🚀 Launches' },
    { type: 'bullet', content: 'Relay v1.0 — April 15' },
    { type: 'bullet', content: 'ParaNet mobile app — May 1' },
    { type: 'bullet', content: 'Analytics dashboard — May 20' },
    { type: 'bullet', content: 'Enterprise SSO — June 10' },
    { type: 'heading2', content: '💡 Open Questions' },
    { type: 'paragraph', content: 'These items need team input before we can finalize scope. Please leave comments or jump into the #planning channel thread.' },
    { type: 'bullet', content: 'Should we prioritize mobile or desktop for the analytics dashboard?' },
    { type: 'bullet', content: 'What\'s the rollout strategy for enterprise SSO?' },
  ],
};
