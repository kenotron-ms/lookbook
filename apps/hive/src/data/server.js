export const currentUser = {
  id: 'u0',
  username: 'pixel_ghost',
  displayName: 'pixel_ghost',
  avatar: 'PG',
  avatarColor: '#5b21b6',
  color: '#dbdee1',
  status: 'online',
  role: 'Member',
}

export const users = [
  { id: 'u1', username: 'NeuralNomad', displayName: 'NeuralNomad', avatar: 'NN', avatarColor: '#7c3aed', color: '#f0b232', role: 'Admin', status: 'online' },
  { id: 'u2', username: 'voxel_ryn', displayName: 'voxel_ryn', avatar: 'VR', avatarColor: '#1d4ed8', color: '#5865f2', role: 'Moderator', status: 'online' },
  { id: 'u3', username: 'staticwave', displayName: 'staticwave', avatar: 'SW', avatarColor: '#0f766e', color: '#dbdee1', role: 'Member', status: 'online' },
  { id: 'u4', username: 'drift_echo', displayName: 'drift_echo', avatar: 'DE', avatarColor: '#b45309', color: '#dbdee1', role: 'Member', status: 'online' },
  { id: 'u0', username: 'pixel_ghost', displayName: 'pixel_ghost', avatar: 'PG', avatarColor: '#5b21b6', color: '#dbdee1', role: 'Member', status: 'online' },
  { id: 'u5', username: 'luminary_x', displayName: 'luminary_x', avatar: 'LX', avatarColor: '#be185d', color: '#dbdee1', role: 'Member', status: 'online' },
  { id: 'u6', username: 'neon_cipher', displayName: 'neon_cipher', avatar: 'NC', avatarColor: '#374151', color: '#80848e', role: 'Member', status: 'offline' },
  { id: 'u7', username: 'void_walker', displayName: 'void_walker', avatar: 'VW', avatarColor: '#374151', color: '#80848e', role: 'Member', status: 'offline' },
  { id: 'u8', username: 'quark_99', displayName: 'quark_99', avatar: 'Q9', avatarColor: '#374151', color: '#80848e', role: 'Member', status: 'offline' },
  { id: 'u9', username: 'phase_shift', displayName: 'phase_shift', avatar: 'PS', avatarColor: '#374151', color: '#80848e', role: 'Member', status: 'offline' },
]

export const messages = [
  {
    id: 'm1', userId: 'u1', timestamp: 'Today at 9:02 AM',
    content: 'Gm everyone! Anyone else catch the ParaNet maintenance window last night? Nodes were going wild.',
    reactions: [{ emoji: '😂', count: 3 }, { emoji: '🔥', count: 2 }],
  },
  {
    id: 'm2', userId: 'u2', timestamp: 'Today at 9:04 AM',
    content: 'Yeah I noticed the latency spikes around 2am. Thought my connection was dying lol',
    reactions: [],
  },
  {
    id: 'm3', userId: 'u2', timestamp: 'Today at 9:04 AM',
    content: 'Turns out the relay cluster in sector 7 was being hot-swapped. Makes sense now.',
    reactions: [{ emoji: '👍', count: 5 }],
  },
  {
    id: 'm4', userId: 'u3', timestamp: 'Today at 9:07 AM',
    content: 'Hot-swap on a live cluster?? That\'s bold. Did they post any incident notes?',
    reactions: [],
  },
  {
    id: 'm5', userId: 'u1', timestamp: 'Today at 9:08 AM',
    content: 'Dropped the link in #announcements. Short summary — zero data loss, 4 min degraded window.',
    reactions: [],
  },
  {
    id: 'm6', userId: 'u4', timestamp: 'Today at 9:11 AM',
    content: 'Just joined the server, hey all 👋 Big fan of what you\'ve built here',
    reactions: [{ emoji: '👍', count: 5 }],
  },
  {
    id: 'm7', userId: 'u1', timestamp: 'Today at 9:12 AM',
    content: 'Welcome drift_echo! Make sure to check #rules and grab a role in #introductions.',
    reactions: [],
  },
  {
    id: 'm8', userId: 'u3', timestamp: 'Today at 9:15 AM',
    content: 'Hey @drift_echo! You doing any node dev work or just here for the community?',
    reactions: [],
  },
  {
    id: 'm9', userId: 'u4', timestamp: 'Today at 9:16 AM',
    content: 'Little of both honestly. Working on a custom relay handler. Here\'s the rough skeleton I\'ve got so far:',
    reactions: [],
    code: `class RelayHandler:
    def __init__(self, node_id: str):
        self.node_id = node_id
        self.buffer = []

    async def receive(self, packet):
        await self.buffer.append(packet)
        await self.flush_if_ready()`,
  },
  {
    id: 'm10', userId: 'u2', timestamp: 'Today at 9:18 AM',
    content: 'Nice! You\'ll want to add a timeout guard on flush_if_ready — seen a lot of handlers hang on malformed packets.',
    reactions: [{ emoji: '👍', count: 5 }],
  },
  {
    id: 'm11', userId: 'u4', timestamp: 'Today at 9:19 AM',
    content: 'Good call. I was planning to add circuit breaker logic next anyway.',
    reactions: [],
  },
  {
    id: 'm12', userId: 'u0', timestamp: 'Today at 9:22 AM',
    content: 'This is great stuff. I\'ve been building something similar — dm me drift_echo, would love to compare notes',
    reactions: [],
    hasImage: true,
  },
  {
    id: 'm13', userId: 'u5', timestamp: 'Today at 9:25 AM',
    content: 'Jumping in here — has anyone tested multi-hop routing with the new ParaNet SDK? Seeing some weird behavior on hop 3+',
    reactions: [{ emoji: '🔥', count: 2 }],
  },
  {
    id: 'm14', userId: 'u3', timestamp: 'Today at 9:26 AM',
    content: 'Yes! Same issue. I think it\'s a TTL calculation bug in v2.3.1. Check the GitHub issue tracker.',
    reactions: [],
  },
  {
    id: 'm15', userId: 'u1', timestamp: 'Today at 9:28 AM',
    content: 'Confirmed — fix is in v2.3.2 which drops Tuesday. Pinning this thread for visibility.',
    reactions: [{ emoji: '👍', count: 5 }, { emoji: '🔥', count: 2 }],
  },
]

export const channels = {
  categories: [
    {
      name: 'INFORMATION',
      collapsed: false,
      channels: [
        { id: 'c1', type: 'text', name: 'announcements', locked: true },
        { id: 'c2', type: 'text', name: 'rules', locked: true },
      ],
    },
    {
      name: 'GENERAL',
      collapsed: false,
      channels: [
        { id: 'c3', type: 'text', name: 'general', active: true },
        { id: 'c4', type: 'text', name: 'random' },
        { id: 'c5', type: 'text', name: 'introductions' },
      ],
    },
    {
      name: 'VOICE CHANNELS',
      collapsed: false,
      channels: [
        { id: 'c6', type: 'voice', name: 'General', members: [
          { avatar: 'NN', avatarColor: '#7c3aed' },
          { avatar: 'VR', avatarColor: '#1d4ed8' },
          { avatar: 'SW', avatarColor: '#0f766e' },
        ]},
        { id: 'c7', type: 'voice', name: 'Gaming', members: [] },
        { id: 'c8', type: 'voice', name: 'Study Room', members: [
          { avatar: 'LX', avatarColor: '#be185d' },
        ]},
      ],
    },
  ],
}

export const servers = [
  { id: 's1', initials: 'HN', label: 'Home Node', active: true, gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)' },
  { id: 's2', initials: 'DS', label: 'Design Space', color: '#1d4ed8' },
  { id: 's3', initials: 'GG', label: 'Game Guild', color: '#16a34a' },
  { id: 's4', initials: 'MX', label: 'Music Exchange', color: '#ea580c' },
  { id: 's5', initials: 'TC', label: 'Tech Collective', color: '#dc2626' },
  { id: 's6', initials: 'RL', label: 'Random Life', color: '#0f766e' },
]

export const dmUsers = [
  { id: 'u2', username: 'voxel_ryn', avatar: 'VR', avatarColor: '#1d4ed8', status: 'online', unread: 2 },
  { id: 'u1', username: 'NeuralNomad', avatar: 'NN', avatarColor: '#7c3aed', status: 'online', unread: 0 },
  { id: 'u3', username: 'staticwave', avatar: 'SW', avatarColor: '#0f766e', status: 'online', unread: 0 },
  { id: 'u4', username: 'drift_echo', avatar: 'DE', avatarColor: '#b45309', status: 'idle', unread: 1 },
  { id: 'u5', username: 'luminary_x', avatar: 'LX', avatarColor: '#be185d', status: 'offline', unread: 0 },
]

export const dmMessages = [
  { id: 'd1', fromMe: false, username: 'voxel_ryn', avatar: 'VR', avatarColor: '#1d4ed8', timestamp: 'Today at 8:44 AM', content: 'Hey! Did you see the relay handler code drift_echo posted in general?' },
  { id: 'd2', fromMe: true, username: 'pixel_ghost', avatar: 'PG', avatarColor: '#5b21b6', timestamp: 'Today at 8:46 AM', content: 'Yeah that\'s exactly what I\'ve been working on too, kind of wild' },
  { id: 'd3', fromMe: false, username: 'voxel_ryn', avatar: 'VR', avatarColor: '#1d4ed8', timestamp: 'Today at 8:47 AM', content: 'We should all get in a voice channel and do a code review session sometime' },
  { id: 'd4', fromMe: false, username: 'voxel_ryn', avatar: 'VR', avatarColor: '#1d4ed8', timestamp: 'Today at 8:47 AM', content: 'I can host in Study Room tonight if you\'re free?' },
  { id: 'd5', fromMe: true, username: 'pixel_ghost', avatar: 'PG', avatarColor: '#5b21b6', timestamp: 'Today at 9:20 AM', content: 'Yeah I\'m down! What time were you thinking?' },
]
