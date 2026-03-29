export const tags = [
  { name: 'javascript', count: 2481932, description: 'For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations.', color: '#f7df1e', textColor: '#000' },
  { name: 'python', count: 2148732, description: 'Python is a multi-paradigm, dynamically typed, multipurpose programming language.' },
  { name: 'react', count: 487203, description: 'React is a JavaScript library for building user interfaces. It uses a declarative approach with components.' },
  { name: 'typescript', count: 392847, description: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.' },
  { name: 'node.js', count: 478293, description: 'Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses JavaScript (V8 Engine).' },
  { name: 'html', count: 1182903, description: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.' },
  { name: 'css', count: 782034, description: 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML or XML.' },
  { name: 'sql', count: 672039, description: 'Structured Query Language (SQL) is a language for querying databases.' },
  { name: 'java', count: 1892034, description: 'Java is a high-level object-oriented programming language.' },
  { name: 'c#', count: 1567834, description: 'C# (pronounced "C sharp") is a high level, statically typed, multi-paradigm programming language developed by Microsoft.' },
  { name: 'php', count: 1389023, description: 'PHP is a widely-used open source general-purpose scripting language for web development.' },
  { name: 'git', count: 89302, description: 'Git is an open source distributed version control system.' },
  { name: 'docker', count: 142034, description: 'Docker is an open-source tool that automates the deployment of applications inside containers.' },
  { name: 'next.js', count: 87234, description: 'Next.js is a React framework that enables functionality such as server-side rendering and static site generation.' },
  { name: 'tailwindcss', count: 43029, description: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.' },
  { name: 'postgresql', count: 134029, description: 'PostgreSQL is an open source object-relational database system.' },
  { name: 'mongodb', count: 89203, description: 'MongoDB is a cross-platform document-oriented NoSQL database program.' },
  { name: 'graphql', count: 34029, description: 'GraphQL is a query language and server-side runtime for APIs.' },
  { name: 'redux', count: 67823, description: 'Redux is an open-source JavaScript library for managing and centralizing application state.' },
  { name: 'api', count: 198234, description: 'Application Programming Interface (API) questions about building or consuming APIs.' },
];

export const questions = [
  {
    id: 1,
    title: 'How do I check if an element is visible in the viewport using JavaScript?',
    excerpt: 'I need to detect when a DOM element becomes visible in the viewport as the user scrolls. I tried using getBoundingClientRect() but it doesn\'t handle all edge cases properly.',
    tags: ['javascript', 'dom', 'scroll'],
    votes: 1482,
    answers: 23,
    hasAccepted: true,
    views: 892304,
    askedAgo: '11 years ago',
    user: { name: 'roryok', reputation: 6842 },
  },
  {
    id: 2,
    title: 'Why does React render twice in development mode with StrictMode?',
    excerpt: 'My useEffect is running twice on mount in React 18. I noticed my API calls are being made twice and my console logs appear twice. Is this a bug or intended behavior?',
    tags: ['react', 'react-hooks', 'strictmode'],
    votes: 847,
    answers: 12,
    hasAccepted: true,
    views: 284923,
    askedAgo: '2 years ago',
    user: { name: 'devmaster99', reputation: 3421 },
  },
  {
    id: 3,
    title: 'TypeScript: Type \'string\' is not assignable to type \'never\' — what does this mean?',
    excerpt: 'I\'m getting a TypeScript error that says "Type \'string\' is not assignable to type \'never\'." I don\'t understand why my variable is inferred as never type.',
    tags: ['typescript', 'types', 'generics'],
    votes: 634,
    answers: 8,
    hasAccepted: true,
    views: 192847,
    askedAgo: '3 years ago',
    user: { name: 'ts_learner', reputation: 1203 },
  },
  {
    id: 4,
    title: 'How to properly handle async/await errors in JavaScript?',
    excerpt: 'What is the best practice for error handling when using async/await in JavaScript? Should I wrap everything in try/catch blocks or is there a cleaner pattern?',
    tags: ['javascript', 'async-await', 'error-handling'],
    votes: 923,
    answers: 18,
    hasAccepted: true,
    views: 347892,
    askedAgo: '4 years ago',
    user: { name: 'codewizard', reputation: 12847 },
  },
  {
    id: 5,
    title: 'CSS Flexbox vs Grid — when should I use each?',
    excerpt: 'I\'m confused about when to use CSS Flexbox versus CSS Grid for layouts. Both seem to accomplish similar things. Are there clear guidelines for choosing between them?',
    tags: ['css', 'flexbox', 'css-grid'],
    votes: 1283,
    answers: 15,
    hasAccepted: true,
    views: 423890,
    askedAgo: '5 years ago',
    user: { name: 'layoutlover', reputation: 4502 },
  },
  {
    id: 6,
    title: 'Next.js 14: How do Server Components differ from Client Components?',
    excerpt: 'With Next.js 14 and the App Router, I\'m struggling to understand when to use Server Components vs Client Components. What are the practical differences and trade-offs?',
    tags: ['next.js', 'react', 'server-components'],
    votes: 312,
    answers: 6,
    hasAccepted: false,
    views: 48923,
    askedAgo: '8 months ago',
    user: { name: 'nextjs_newbie', reputation: 892 },
  },
  {
    id: 7,
    title: 'SQL: How to get the second highest salary from a table?',
    excerpt: 'This is a common SQL interview question. I need to find the second highest salary value from an Employee table. What are the different approaches I can use?',
    tags: ['sql', 'mysql', 'query'],
    votes: 2891,
    answers: 42,
    hasAccepted: true,
    views: 1238904,
    askedAgo: '12 years ago',
    user: { name: 'sqlpro', reputation: 8923 },
  },
  {
    id: 8,
    title: 'Docker: How to copy files from container to host?',
    excerpt: 'I need to copy files from a running Docker container to my host machine. I know docker cp works but I\'m having trouble with the path syntax. What\'s the correct command?',
    tags: ['docker', 'containers', 'devops'],
    votes: 782,
    answers: 14,
    hasAccepted: true,
    views: 823042,
    askedAgo: '8 years ago',
    user: { name: 'dockerdave', reputation: 2340 },
  },
  {
    id: 9,
    title: 'React useState vs useReducer — which should I choose?',
    excerpt: 'I have a component with complex state logic involving multiple sub-values and the next state depends on the previous. When should I use useReducer over useState?',
    tags: ['react', 'react-hooks', 'redux'],
    votes: 567,
    answers: 9,
    hasAccepted: true,
    views: 198234,
    askedAgo: '3 years ago',
    user: { name: 'hooksmaster', reputation: 5621 },
  },
  {
    id: 10,
    title: 'How to implement pagination in PostgreSQL efficiently?',
    excerpt: 'I\'m implementing pagination for a large dataset in PostgreSQL. OFFSET/LIMIT works but gets slow with large offsets. What\'s the most performant approach for cursor-based pagination?',
    tags: ['postgresql', 'sql', 'performance'],
    votes: 489,
    answers: 11,
    hasAccepted: true,
    views: 284023,
    askedAgo: '4 years ago',
    user: { name: 'dboptimizer', reputation: 7834 },
  },
  {
    id: 11,
    title: 'GraphQL: N+1 query problem and how to solve it with DataLoader',
    excerpt: 'My GraphQL API is making too many database queries — one per item in a list. I\'ve heard about the N+1 problem and DataLoader. How does DataLoader batch and cache work exactly?',
    tags: ['graphql', 'node.js', 'performance'],
    votes: 234,
    answers: 5,
    hasAccepted: false,
    views: 87234,
    askedAgo: '2 years ago',
    user: { name: 'gqlguru', reputation: 3291 },
  },
  {
    id: 12,
    title: 'Tailwind CSS: How to extend the default theme with custom colors?',
    excerpt: 'I want to add my brand colors to Tailwind CSS without overriding the defaults. I\'ve read the docs but I\'m confused about the extend vs theme config options in tailwind.config.js.',
    tags: ['tailwindcss', 'css', 'configuration'],
    votes: 178,
    answers: 7,
    hasAccepted: true,
    views: 43892,
    askedAgo: '1 year ago',
    user: { name: 'tailwindtinkerer', reputation: 1560 },
  },
];

export const fullQuestion = {
  id: 2,
  title: 'Why does React render twice in development mode with StrictMode?',
  asked: 'Mar 15, 2022 at 14:23',
  modified: 'Nov 8, 2023 at 09:47',
  views: 284923,
  tags: ['react', 'react-hooks', 'strictmode', 'use-effect'],
  votes: 847,
  body: `I recently upgraded to React 18 and noticed that my **useEffect** is running twice on mount in development mode. My API calls are being duplicated and console logs appear twice.

Here's a minimal example of what I'm seeing:

\`\`\`jsx
function MyComponent() {
  useEffect(() => {
    console.log('Effect ran');
    fetchData(); // This runs twice!
  }, []);

  return <div>Hello World</div>;
}
\`\`\`

I checked the React documentation but I'm not sure if this is expected behavior or a bug in my setup. This only happens in development, not in production.

Why is this happening and should I be concerned about it?`,
  comments: [
    { id: 1, text: 'This was the change that confused so many developers coming from React 17. Worth reading the official docs on Strict Mode.', user: 'reactfan', votes: 42 },
    { id: 2, text: 'Yes, this is intentional. The key insight is your code should be resilient to effects running multiple times.', user: 'concurrent_dev', votes: 28 },
    { id: 3, text: 'Add a cleanup function to your useEffect if you\'re making API calls — it will cancel the first request before remounting.', user: 'effectexpert', votes: 19 },
  ],
  answers: [
    {
      id: 1,
      accepted: true,
      votes: 1203,
      body: `This is **intentional behavior** introduced in React 18 with the new concurrent rendering engine. React's Strict Mode in development now deliberately mounts components twice to help you find bugs related to side effects.

Here's what React 18 does:

\`\`\`
1. Mount component → run effects
2. Unmount component → run cleanup
3. Remount component → run effects again
\`\`\`

The purpose is to simulate what happens in React's future concurrent features where components may be mounted and unmounted multiple times (e.g., when React pauses and resumes rendering).

**How to handle it properly:**

Always return a cleanup function from your effects:

\`\`\`jsx
useEffect(() => {
  let cancelled = false;
  
  async function fetchData() {
    const data = await api.getData();
    if (!cancelled) {
      setData(data);
    }
  }
  
  fetchData();
  
  return () => {
    cancelled = true; // cleanup on unmount
  };
}, []);
\`\`\`

This is only in **development mode**. In production, effects run once as expected. The double-invocation is a feature, not a bug — it ensures your code handles remounting gracefully.`,
      user: { name: 'dan_abramov_fan', avatar: 'DA', reputation: 87234, gold: 12, silver: 89, bronze: 234 },
      answered: 'Mar 15, 2022 at 15:47',
      comments: [
        { id: 1, text: 'This saved my sanity. I spent two hours debugging before finding this answer.', user: 'lostdeveloper', votes: 156 },
        { id: 2, text: 'Worth noting: AbortController is another great way to handle cleanup for fetch() calls.', user: 'webapi_expert', votes: 89 },
      ],
    },
    {
      id: 2,
      accepted: false,
      votes: 234,
      body: `To add to the accepted answer — if you want to **temporarily disable** this behavior to understand your code flow, you can remove \`<StrictMode>\` from your root:

\`\`\`jsx
// Before
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// After (not recommended for production)
root.render(<App />);
\`\`\`

However, this is **not recommended** as a permanent solution. The double-render is there for a reason and you should fix your effects to be idempotent.

A better approach: use React Query or SWR for data fetching, which handles these edge cases automatically.`,
      user: { name: 'pragmatic_dev', avatar: 'PD', reputation: 12034, gold: 3, silver: 24, bronze: 67 },
      answered: 'Mar 16, 2022 at 09:22',
      comments: [
        { id: 1, text: 'Using React Query is definitely the right long-term solution. It handles caching and deduplication automatically.', user: 'reactquery_fan', votes: 45 },
      ],
    },
    {
      id: 3,
      accepted: false,
      votes: 89,
      body: `Another thing worth mentioning: this double-invocation also affects \`useState\` initializer functions and \`useMemo\` in React 18 Strict Mode.

If your state initializer has side effects:

\`\`\`jsx
// This will run twice in dev:
const [state] = useState(() => {
  console.log('initializing'); // logs twice
  return expensiveComputation();
});
\`\`\`

Make sure your initializers are **pure functions** with no side effects. The computation might run twice but the state will only be set once.`,
      user: { name: 'hooks_internals', avatar: 'HI', reputation: 5892, gold: 1, silver: 8, bronze: 23 },
      answered: 'Mar 17, 2022 at 11:04',
      comments: [],
    },
  ],
};

export const profileData = {
  name: 'devmaster99',
  avatar: 'DM',
  memberFor: '6 years',
  location: 'San Francisco, CA',
  website: 'https://devmaster.dev',
  reputation: 48293,
  gold: 8,
  silver: 67,
  bronze: 234,
  stats: {
    questions: 142,
    answers: 891,
    reached: '2.4m',
  },
  topAnswers: [
    {
      id: 1,
      title: 'Why does React render twice in development mode with StrictMode?',
      preview: 'This is intentional behavior introduced in React 18 with the new concurrent rendering engine. React\'s Strict Mode in development now deliberately mounts components twice...',
      score: 847,
      tags: ['react', 'react-hooks'],
    },
    {
      id: 2,
      title: 'How to properly handle async/await errors in JavaScript?',
      preview: 'The best pattern for async error handling depends on your use case. For simple cases, try/catch works well. For more complex scenarios, consider a wrapper utility...',
      score: 312,
      tags: ['javascript', 'async-await'],
    },
    {
      id: 3,
      title: 'Next.js 14: How do Server Components differ from Client Components?',
      preview: 'Server Components render on the server and don\'t include JavaScript in the bundle. Client Components are the traditional React components you\'re familiar with...',
      score: 189,
      tags: ['next.js', 'react'],
    },
  ],
  topTags: [
    { name: 'react', posts: 234, score: 8921 },
    { name: 'javascript', posts: 189, score: 7234 },
    { name: 'typescript', posts: 98, score: 3892 },
    { name: 'next.js', posts: 67, score: 2341 },
    { name: 'node.js', posts: 45, score: 1823 },
  ],
};
