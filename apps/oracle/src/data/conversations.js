export const conversationStubs = [
  // Today
  { id: 'c1', title: 'Building a React todo app', group: 'Today' },
  { id: 'c2', title: 'Explain quantum computing simply', group: 'Today' },
  { id: 'c3', title: 'Draft a product requirements doc', group: 'Today' },
  // Yesterday
  { id: 'c4', title: 'Python web scraping with BeautifulSoup', group: 'Yesterday' },
  { id: 'c5', title: 'Beginner workout plan 3 days/week', group: 'Yesterday' },
  // Last 7 days
  { id: 'c6', title: 'Docker compose for Node + Postgres', group: 'Last 7 days' },
  { id: 'c7', title: 'TypeScript generics deep dive', group: 'Last 7 days' },
  { id: 'c8', title: 'Marketing copy for SaaS landing page', group: 'Last 7 days' },
  { id: 'c9', title: 'SQL query optimization techniques', group: 'Last 7 days' },
  // Last 30 days
  { id: 'c10', title: 'Regex cheatsheet for email validation', group: 'Last 30 days' },
  { id: 'c11', title: 'Design system color tokens', group: 'Last 30 days' },
  { id: 'c12', title: 'Kubernetes ingress controller setup', group: 'Last 30 days' },
]

const useStateCode = `import { useState } from 'react';

function useTodos(initialTodos = []) {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    // Create a new todo item
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
}`

const componentCode = `import { useState } from 'react';

export default function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input.trim());
    setInput('');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-3 p-3 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? 'line-through text-gray-400' : ''}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No tasks yet. Add one above!</p>
      )}
    </div>
  );
}`

export const fullConversation = {
  id: 'c1',
  title: 'Building a React todo app',
  messages: [
    {
      role: 'user',
      content: "I want to build a todo app in React. Where should I start?",
    },
    {
      role: 'oracle',
      content: "Great choice for learning React! A todo app covers the core concepts perfectly — state management, event handling, and component composition. Here's the plan:\n\n**1. State** — Use `useState` to store your list of todos\n**2. Add** — An input + form submit to push new items\n**3. Toggle** — Click to mark complete/incomplete\n**4. Delete** — Remove items from the list\n\nLet's start with a custom hook to encapsulate the todo logic cleanly.",
      code: { language: 'typescript', content: useStateCode },
    },
    {
      role: 'user',
      content: "That custom hook pattern looks clean. How do I wire it into a component?",
    },
    {
      role: 'oracle',
      content: "Here's a complete `TodoApp` component that uses the hook. It handles form submission, renders each todo with a checkbox and delete button, and shows an empty state when the list is clear.",
      code: { language: 'tsx', content: componentCode },
    },
    {
      role: 'user',
      content: "How do I persist the todos in localStorage so they survive page refreshes?",
    },
    {
      role: 'oracle',
      content: "Good thinking! Swap `useState` for a custom `useLocalStorage` hook that syncs with `localStorage` automatically. Here's how:",
      code: {
        language: 'typescript',
        content: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

// Usage in useTodos:
const [todos, setTodos] = useLocalStorage('todos', []);`,
      },
    },
    {
      role: 'user',
      content: "Can I add drag-and-drop reordering to the list?",
    },
    {
      role: 'oracle',
      content: "Yes — the easiest production-ready approach is **@dnd-kit/core** + **@dnd-kit/sortable**. Install it:\n\n```bash\nnpm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities\n```\n\nThen wrap your list in `<SortableContext>` and make each item a `<SortableItem>`. Here's the key piece:",
      code: {
        language: 'tsx',
        content: `import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

function TodoList({ todos, setTodos }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over.id);
      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        {todos.map((todo) => (
          <SortableItem key={todo.id} todo={todo} />
        ))}
      </SortableContext>
    </DndContext>
  );
}`,
      },
    },
    {
      role: 'user',
      content: "What's a good way to filter todos by status — all, active, completed?",
    },
    {
      role: 'oracle',
      content: "Add a `filter` state and derive the visible list with `useMemo` — no extra data structures needed:",
      code: {
        language: 'typescript',
        content: `const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

const visibleTodos = useMemo(() => {
  switch (filter) {
    case 'active':    return todos.filter((t) => !t.completed);
    case 'completed': return todos.filter((t) =>  t.completed);
    default:          return todos;
  }
}, [todos, filter]);

// Render filter tabs:
const FILTERS = ['all', 'active', 'completed'];

return (
  <div className="flex gap-3 mb-4">
    {FILTERS.map((f) => (
      <button
        key={f}
        onClick={() => setFilter(f)}
        className={\`capitalize px-3 py-1 rounded \${
          filter === f ? 'bg-blue-600 text-white' : 'text-gray-500'
        }\`}
      >
        {f}
      </button>
    ))}
  </div>
);`,
      },
    },
    {
      role: 'user',
      content: "How should I structure this if it grows into a bigger app?",
    },
    {
      role: 'oracle',
      content: "Once your todo app starts growing, the flat-file structure breaks down. Here's the folder layout I'd use:\n\n```\nsrc/\n├── components/\n│   ├── TodoItem.tsx\n│   ├── TodoList.tsx\n│   └── FilterBar.tsx\n├── hooks/\n│   ├── useTodos.ts\n│   └── useLocalStorage.ts\n├── store/\n│   └── todoStore.ts       ← Zustand or Redux Toolkit\n├── types/\n│   └── todo.ts\n└── App.tsx\n```\n\n**State management at scale:** For a solo app, Zustand is perfect — minimal boilerplate, TypeScript-friendly, and works outside React components (great for persistence middleware).\n\n**For a team app:** Redux Toolkit gives you slice patterns, devtools, and RTK Query for server state. The structure above scales to both.",
    },
    {
      role: 'user',
      content: "This has been super helpful. Any last tips before I ship it?",
    },
    {
      role: 'oracle',
      content: "Before you ship, run through this checklist:\n\n**Accessibility**\n- Every interactive element has an `aria-label` or visible text\n- Keyboard navigation works end-to-end (Tab, Enter, Space, Delete)\n- Color contrast meets WCAG AA (4.5:1 for normal text)\n\n**Performance**\n- Wrap heavy filtered lists in `useMemo`\n- Use `React.memo` on `TodoItem` to prevent re-renders when unrelated state changes\n- Lazy-load any route you add later with `React.lazy + Suspense`\n\n**Testing**\n- Unit test your custom hooks with **@testing-library/react** `renderHook`\n- Smoke test the full flow with a Playwright or Cypress E2E test\n\n**Deployment**\n- `npm run build` → deploy the `dist/` folder to Vercel, Netlify, or GitHub Pages in under 2 minutes\n\nYou're ready to ship. Good luck!",
    },
  ],
}
