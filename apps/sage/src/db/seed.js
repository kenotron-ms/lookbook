import db from './index.js'

export const MODELS = [
  { id: 'sage-2',        label: 'Sage 2',         description: 'Most intelligent' },
  { id: 'sage-2-sonnet', label: 'Sage 2 Sonnet',  description: 'Best for complex tasks' },
  { id: 'sage-1-5',      label: 'Sage 1.5 Haiku', description: 'Fastest' },
]
export const DEFAULT_MODEL = 'sage-2-sonnet'
export const USER = { name: 'Jordan', handle: 'jordanblake', avatar: './user-avatar.jpg' }

// ─── Projects ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: 1, name: 'Frontend Architecture',    description: 'Design system and component strategy', color: '#6366f1', starred: true,  createdAt: Date.now() - 864e5 * 14, updatedAt: Date.now() - 864e5 * 1 },
  { id: 2, name: 'API Design Workshop',      description: 'REST and GraphQL API patterns',        color: '#D97757', starred: true,  createdAt: Date.now() - 864e5 * 10, updatedAt: Date.now() - 864e5 * 2 },
  { id: 3, name: 'Documentation Pipeline',  description: 'Automated docs generation workflow',   color: '#059669', starred: false, createdAt: Date.now() - 864e5 * 6,  updatedAt: Date.now() - 864e5 * 4 },
]

// ─── Conversations ─────────────────────────────────────────────────────────────
const CONVOS = [
  { id: 1, projectId: null,      title: 'What\'s new in React 19?',                    model: 'sage-2-sonnet', createdAt: Date.now() - 36e5 * 3,    updatedAt: Date.now() - 36e5 * 2 },
  { id: 2, projectId: null,      title: 'Explain transformer attention mechanisms',     model: 'sage-2-sonnet', createdAt: Date.now() - 864e5 * 2,    updatedAt: Date.now() - 864e5 * 2 + 18e4 },
  { id: 3, projectId: 1,         title: 'Refactor Express.js auth middleware',          model: 'sage-2',        createdAt: Date.now() - 864e5 * 1,    updatedAt: Date.now() - 864e5 * 1 + 24e4 },
  { id: 4, projectId: 2,         title: 'Write README for deployfast CLI',              model: 'sage-2-sonnet', createdAt: Date.now() - 36e5 * 5,     updatedAt: Date.now() - 36e5 * 5 + 12e4 },
  { id: 5, projectId: null,      title: 'Debug useDebounce hook firing immediately',    model: 'sage-2',        createdAt: Date.now() - 36e5 * 2,     updatedAt: Date.now() - 36e5 * 2 + 9e4 },
]

// ─── Messages ──────────────────────────────────────────────────────────────────
const MSGS = [

  // ══ Convo 1: React 19 — web search + thinking ════════════════════════════════
  {
    id: 1, conversationId: 1, role: 'user', thinking: null, toolCalls: null, artifact: null,
    timestamp: Date.now() - 36e5 * 3,
    content: "Can you look up what's actually new in React 19? I keep seeing announcements but haven't had time to read through them.",
  },
  {
    id: 2, conversationId: 1, role: 'assistant',
    timestamp: Date.now() - 36e5 * 3 + 4e3,
    thinking: {
      durationSeconds: 8,
      text: `The user wants to know what's new in React 19. This is a factual question about a recent release, so I should search for up-to-date information rather than relying on my training data, which might be incomplete for recent releases.

Let me search for "React 19 new features" to get the most accurate and current information. I should focus on the official React blog and reputable sources.

I'll search and then synthesize the key points for Jordan. I should cover: the new hooks, server components changes, actions, and any breaking changes they should be aware of.`,
    },
    toolCalls: [
      {
        type: 'web_search',
        query: 'React 19 new features stable release 2024',
        status: 'done',
        results: [
          { title: 'React 19 – React', domain: 'react.dev', url: 'https://react.dev/blog/2024/12/05/react-19', excerpt: 'React 19 is now stable. This release includes new hooks, improvements to the compiler, and first-class support for Actions in both client and server components.' },
          { title: 'What\'s new in React 19 — Vercel Blog', domain: 'vercel.com', url: 'https://vercel.com/blog/react-19', excerpt: 'React 19 ships the `use` hook, `useActionState`, `useFormStatus`, `useOptimistic`, and the React Compiler as an opt-in feature.' },
          { title: 'React 19 Upgrade Guide', domain: 'react.dev', url: 'https://react.dev/blog/2024/04/25/react-19-upgrade-guide', excerpt: 'This guide will help you upgrade to React 19. Most apps should be able to upgrade without any changes.' },
          { title: 'Deep Dive: React 19 Actions — Kent C. Dodds', domain: 'kentcdodds.com', url: 'https://kentcdodds.com/blog/react-19-actions', excerpt: 'Actions are the biggest new primitive in React 19. They let you mark an async function as an action and React will manage the pending/error/result state for you.' },
          { title: 'React 19 Concurrent Features Explained — LogRocket', domain: 'blog.logrocket.com', url: 'https://blog.logrocket.com/react-19-concurrent-features/', excerpt: 'A comprehensive overview of how React 19 improves the concurrent rendering model, what changed from React 18, and how to migrate existing code.' },
        ],
      },
    ],
    artifact: null,
    content: `React 19 is a significant release. Here's what actually matters for day-to-day development:

## Actions — the biggest change

React 19 introduces **Actions**: async functions that React manages as a unit of work, handling pending, error, and success states automatically.

\`\`\`jsx
// Before React 19
function SubmitButton({ onSubmit }) {
  const [isPending, setIsPending] = useState(false)
  
  const handleSubmit = async () => {
    setIsPending(true)
    try { await onSubmit() } finally { setIsPending(false) }
  }
  
  return <button disabled={isPending} onClick={handleSubmit}>Save</button>
}

// React 19 with useActionState
function SubmitButton({ formAction }) {
  const [state, action, isPending] = useActionState(formAction, null)
  
  return <button formAction={action} disabled={isPending}>Save</button>
}
\`\`\`

## New hooks

| Hook | Purpose |
|------|---------|
| \`useActionState\` | Manage async action state (pending, error, result) |
| \`useFormStatus\` | Read parent form's pending state from any child |
| \`useOptimistic\` | Show optimistic UI while async action runs |
| \`use\` | Read a Promise or Context value directly inside render |

## The \`use\` hook

\`use\` is a new primitive that lets you read a resource — a Promise or Context — directly in render, including inside conditionals and loops:

\`\`\`jsx
// Suspend on a promise directly in render
function UserProfile({ userPromise }) {
  const user = use(userPromise)  // suspends until resolved
  return <div>{user.name}</div>
}
\`\`\`

## React Compiler (opt-in)

The compiler automatically memoizes components and hooks — eliminating most manual \`useMemo\`/\`useCallback\` calls. It's opt-in in 19 and will become the default later.

## ref as a prop

You can now pass \`ref\` directly as a prop without \`forwardRef\`:

\`\`\`jsx
// Before: needed forwardRef wrapper
// React 19: just pass ref directly
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />
}
\`\`\`

The biggest practical impact is Actions + \`useActionState\` — they replace a lot of manual loading state management that's currently boilerplate in most forms. ^[1]^[2]`,
  },

  // ══ Convo 2: Transformer attention — thinking ═════════════════════════════════
  {
    id: 3, conversationId: 2, role: 'user', thinking: null, toolCalls: null, artifact: null,
    timestamp: Date.now() - 864e5 * 2,
    content: "Can you explain how attention mechanisms work in transformers? I've been reading the \"Attention Is All You Need\" paper but I'm struggling to build intuition for why it works so well.",
  },
  {
    id: 4, conversationId: 2, role: 'assistant',
    timestamp: Date.now() - 864e5 * 2 + 3e3,
    thinking: {
      durationSeconds: 14,
      text: `Jordan is asking for intuition about attention mechanisms. This is a conceptual explanation request, not a coding task. I should:

1. Start with the core intuition before the math — what problem is attention solving?
2. Build up to the QKV formulation
3. Include a concrete worked example (ideally with numbers or a table)
4. Explain multi-head attention and why it matters
5. Include code that makes the concept tangible

The key insight to communicate: attention replaces sequential information routing (RNNs) with parallel, content-based routing. Every token can directly attend to every other token — O(1) path length between any two positions.

I should be careful about the scaling factor sqrt(d_k). A lot of explanations skip the intuition for WHY we scale — it's to prevent the dot products from becoming so large that softmax saturates to near-zero gradients.

For the code example, Python with PyTorch is most natural here. Should I make it an artifact? Yes — it's substantive enough code that they'll want to reference it separately.`,
    },
    artifact: {
      type: 'code',
      title: 'attention.py',
      language: 'python',
      versions: [],
      content: `import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Args:
        Q: (batch, heads, seq_len, d_k)
        K: (batch, heads, seq_len, d_k)
        V: (batch, heads, seq_len, d_v)
    Returns:
        output:  (batch, heads, seq_len, d_v)
        weights: (batch, heads, seq_len, seq_len)  ← interpretable!
    """
    d_k = Q.shape[-1]
    
    # 1. How much should each token attend to each other?
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    
    # 2. Causal mask (decoder only — each token can't see the future)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))
    
    # 3. Convert scores → probabilities (each row sums to 1.0)
    weights = F.softmax(scores, dim=-1)
    
    # 4. Weighted average of value vectors
    output = torch.matmul(weights, V)
    
    return output, weights


def demo():
    # 4 tokens, 1 head, d_k=8
    T, d_k = 4, 8
    Q = torch.randn(1, 1, T, d_k)
    K = torch.randn(1, 1, T, d_k)
    V = torch.randn(1, 1, T, d_k)
    
    out, w = scaled_dot_product_attention(Q, K, V)
    print("Attention weights (each row sums to 1.0):")
    print(w[0, 0].round(decimals=3))
    # e.g.:
    # tensor([[0.312, 0.218, 0.287, 0.183],
    #         [0.244, 0.341, 0.198, 0.217],
    #         [0.189, 0.276, 0.354, 0.181],
    #         [0.221, 0.198, 0.244, 0.337]])

demo()
`,
    },
    content: `The attention mechanism is one of those ideas that seems complex at first but becomes surprisingly elegant once you see the geometry behind it.

## The Core Intuition

Think of each token as asking: *"Which other tokens are most relevant to understanding me?"* Attention answers this question dynamically based on content — not just position.

Each token gets projected into three vectors:
- **Query (Q)**: "What am I looking for?"
- **Key (K)**: "What do I offer?"
- **Value (V)**: "What will I contribute if selected?"

## The Mathematics

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$

Step by step:
1. **$QK^T$** — dot product of queries against all keys. High similarity = high score
2. **$/ \\sqrt{d_k}$** — prevents softmax from saturating when $d_k$ is large
3. **softmax** — converts to a probability distribution summing to 1
4. **$\\times V$** — weighted average: high-attention tokens contribute more

## A Concrete Example

For *"The cat sat on the mat"*, attending from **"sat"**:

| Token | Attention weight | Why |
|-------|-----------------|-----|
| cat   | 0.48 | Subject of the verb |
| mat   | 0.22 | Object of the verb |
| sat   | 0.18 | Self-attention |
| other | 0.12 | Context |

The model learns these patterns — they're not hand-coded.

## Multi-Head Attention

Running attention once is limiting. Multi-head runs it $h$ times in parallel, each in a lower-dimensional subspace ($d_k = d_{model}/h$). Different heads often specialize — one captures syntax, another semantics, another coreference.

The attached implementation is runnable — check how the weights change when you modify Q and K.`,
  },

  // ══ Convo 3: Auth refactor — code execution + thinking ════════════════════════
  {
    id: 5, conversationId: 3, role: 'user', thinking: null, toolCalls: null, artifact: null,
    timestamp: Date.now() - 864e5 + 0,
    content: `I have this Express.js auth middleware. Can you review it for security issues and refactor it?

\`\`\`javascript
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    const decoded = jwt.verify(token, 'mysecretkey123')
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
\`\`\``,
  },
  {
    id: 6, conversationId: 3, role: 'assistant',
    timestamp: Date.now() - 864e5 + 8e3,
    thinking: {
      durationSeconds: 11,
      text: `Let me analyze this middleware carefully for security issues.

Issues I can see immediately:
1. **Hardcoded secret** — 'mysecretkey123' is in source code. This ends up in git history, build logs, container images. Critical.
2. **No Bearer prefix handling** — the Authorization header should be "Bearer <token>" but the code reads the raw header, so jwt.verify receives "Bearer eyJ..." which will fail or be passed as-is depending on the library
3. **Algorithm not specified** — missing { algorithms: ['HS256'] }. This opens the "none" algorithm attack where an attacker sends alg:none with no signature
4. **No error differentiation** — expired tokens get the same error as malformed tokens. Clients can't distinguish "re-authenticate" from "bug"
5. **No guard for undefined secret** — if process.env.JWT_SECRET is missing, behavior is undefined

Let me demonstrate the Bearer prefix bug with a code execution to show it failing vs working.

I should write a clear refactored version and also run a quick demo showing the alg:none vulnerability.`,
    },
    toolCalls: [
      {
        type: 'code_execution',
        language: 'javascript',
        status: 'done',
        code: `const jwt = require('jsonwebtoken')

// Demonstrate the Bearer prefix bug
const secret = 'testsecret'
const realToken = jwt.sign({ userId: 42 }, secret, { algorithm: 'HS256' })
const headerValue = 'Bearer ' + realToken  // what the client actually sends

console.log('Raw header value sent by client:')
console.log(headerValue.slice(0, 50) + '...')

// What the BUGGY middleware does:
try {
  const decoded = jwt.verify(headerValue, secret)  // passes "Bearer eyJ..."
  console.log('\\n❌ Bug: somehow passed?', decoded)
} catch (e) {
  console.log('\\n✅ Bug confirmed: jwt.verify fails when given "Bearer eyJ..."')
  console.log('Error:', e.message)
}

// What correct middleware does:
const tokenOnly = headerValue.slice(7)
const decoded = jwt.verify(tokenOnly, secret)
console.log('\\n✅ Correct: parsed after stripping "Bearer ":', decoded)`,
        output: `Raw header value sent by client:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

✅ Bug confirmed: jwt.verify fails when given "Bearer eyJ..."
Error: jwt malformed

✅ Correct: parsed after stripping "Bearer ": { userId: 42, iat: 1711234567 }`,
      },
    ],
    artifact: {
      type: 'code',
      title: 'auth.middleware.js',
      language: 'javascript',
      versions: [],
      content: `const jwt = require('jsonwebtoken')

/**
 * JWT authentication middleware.
 * Expects: Authorization: Bearer <token>
 * Sets:    req.user = decoded JWT payload
 */
module.exports = function authMiddleware(req, res, next) {
  // 1. Extract and validate the Authorization header
  const authHeader = req.headers['authorization']
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authorization header must be: Bearer <token>',
    })
  }

  const token = authHeader.slice(7)  // Remove "Bearer "

  // 2. Guard: fail fast if secret not configured
  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error('[auth] JWT_SECRET environment variable is not set')
    return res.status(500).json({ error: 'Server misconfiguration' })
  }

  // 3. Verify — explicitly allowlist algorithm to prevent "none" attack
  try {
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] })
    req.user = decoded
    next()
  } catch (err) {
    // 4. Return actionable errors so clients can distinguish expiry from malform
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', expiredAt: err.expiredAt })
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' })
    }
    console.error('[auth] Unexpected JWT error:', err)
    return res.status(500).json({ error: 'Authentication error' })
  }
}
`,
    },
    content: `Four issues, one critical. Let me show you the most surprising one first.

## Bug 1: Bearer prefix is never stripped (confirmed above)

The code reads \`req.headers['authorization']\` which gives you the full string \`"Bearer eyJ..."\` — the \`"Bearer "\` prefix included. Passing that to \`jwt.verify\` fails with "jwt malformed" because the library expects the raw token, not the scheme-prefixed version. Your app is probably returning 401 on every authenticated request unless your token generation has the same bug (making the two bugs cancel out).

## Bug 2: Hardcoded secret (critical)

\`\`\`js
jwt.verify(token, 'mysecretkey123')  // ← this is in your git history forever
\`\`\`
Rotate to an environment variable immediately. Generate a proper secret:
\`\`\`bash
openssl rand -hex 32  # 256-bit secret
\`\`\`

## Bug 3: Algorithm not specified

Without \`{ algorithms: ['HS256'] }\`, some JWT libraries accept \`alg: "none"\` — an attacker can strip the signature and forge any payload. Always allowlist the algorithm.

## Bug 4: No error differentiation

All JWT failures return "Invalid token". Clients can't tell if they should re-authenticate (expired) or report a bug (malformed). The refactor distinguishes \`TokenExpiredError\` vs \`JsonWebTokenError\`.

The fixed version is in the attached file.`,
  },

  // ══ Convo 4: README — document artifact with versions ════════════════════════
  {
    id: 7, conversationId: 4, role: 'user', thinking: null, toolCalls: null, artifact: null,
    timestamp: Date.now() - 36e5 * 5,
    content: "I've built a CLI tool called `deployfast` that deploys Node.js apps to AWS, GCP, Railway, or Fly.io with a single command. It reads a `deploy.yaml` config file. Can you write a README for it?",
  },
  {
    id: 8, conversationId: 4, role: 'assistant',
    timestamp: Date.now() - 36e5 * 5 + 5e3,
    thinking: {
      durationSeconds: 6,
      text: `Writing a README for a CLI deploy tool. Key things to structure well:
- Quick Start must be 3 steps or fewer — people scan READMEs
- The supported providers table is important — it's often the first thing people check
- I should include a CI/CD example since deploy tools get used in pipelines
- Configuration reference should use YAML with inline comments (easier to copy/paste)
- Examples section showing common use cases

I'll make this a document artifact so it renders cleanly and can be downloaded.`,
    },
    artifact: {
      type: 'document',
      title: 'README.md',
      language: 'markdown',
      versions: [
        {
          label: 'v1 — initial',
          content: `# deployfast

Deploy your Node.js app to any cloud in one command.

\`\`\`bash
deployfast up
\`\`\`

## Install

\`\`\`bash
npm install -g deployfast
\`\`\`

## Usage

Create a \`deploy.yaml\` at the project root, then run \`deployfast up\`.

## License

MIT
`,
        },
      ],
      content: `# deployfast

**Deploy your Node.js app to any cloud in one command.**

\`\`\`bash
deployfast up
\`\`\`

---

## Installation

\`\`\`bash
npm install -g deployfast
\`\`\`

Requires Node.js 18+.

---

## Quick Start

**1. Initialize**
\`\`\`bash
cd my-app && deployfast init
\`\`\`

**2. Configure** — edit the generated \`deploy.yaml\`
\`\`\`yaml
app: my-app
provider: aws          # aws | gcp | railway | fly
region: us-east-1
build:
  command: npm run build
  output: dist/
env:
  NODE_ENV: production
  PORT: 3000
\`\`\`

**3. Deploy**
\`\`\`bash
deployfast up
\`\`\`

---

## Supported Providers

| Provider | Compute | Auth |
|----------|---------|------|
| **AWS** | ECS Fargate, Lambda | \`aws configure\` |
| **GCP** | Cloud Run, GKE | \`gcloud auth login\` |
| **Railway** | Managed containers | \`railway login\` |
| **Fly.io** | Fly Machines | \`flyctl auth login\` |

---

## CLI Reference

\`\`\`
deployfast up               Deploy latest build
deployfast up --env staging Deploy to staging
deployfast down             Tear down deployment
deployfast status           Show running services
deployfast logs             Tail live logs
deployfast init             Create deploy.yaml
\`\`\`

## CI/CD

\`\`\`yaml
# .github/workflows/deploy.yml
- name: Deploy
  run: npx deployfast up
  env:
    AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
\`\`\`

---

## License

MIT
`,
    },
    content: "Here's a complete README. A few decisions I made:\n\n- **Quick Start is 3 steps** — people scan READMEs, so I kept the fast path tight. Everything else is reference material.\n- **Providers table** shows compute type and auth command together — these are always the first two questions when evaluating a deploy tool.\n- **CI/CD section** is near the top because deploy CLIs almost always end up in pipelines, and people Google for GitHub Actions examples.\n- Config reference uses inline YAML comments — easier to copy and adapt than separate prose descriptions.\n\nI've also saved an initial draft (v1) in the artifact history — you can flip between versions using the arrows in the panel.",
  },

  // ══ Convo 5: useDebounce — thinking block ════════════════════════════════════
  {
    id: 9, conversationId: 5, role: 'user', thinking: null, toolCalls: null, artifact: null,
    timestamp: Date.now() - 36e5 * 2,
    content: `My useDebounce hook isn't working — the callback fires immediately instead of waiting. Here's what I have:

\`\`\`typescript
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T, delay: number
) {
  const timer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => { return () => clearTimeout(timer.current) }, [])
  return (...args: Parameters<T>) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => callback(...args), delay)
  }
}
\`\`\``,
  },
  {
    id: 10, conversationId: 5, role: 'assistant',
    timestamp: Date.now() - 36e5 * 2 + 5e3,
    thinking: {
      durationSeconds: 17,
      text: `Let me trace through what's happening with this hook.

The user says the callback fires "immediately" — that's an interesting description for a debounce bug. Debounce bugs usually fall into one of three categories:
1. The timeout is being cleared prematurely
2. A new function reference is being created on every render, so React sees new event handlers
3. The delay is wrong

Wait. I see it now. The hook returns a NEW function on every render:
\`\`\`
return (...args: Parameters<T>) => {
  clearTimeout(timer.current)
  timer.current = setTimeout(() => callback(...args), delay)
}
\`\`\`

This inline function has a new reference on every render. When this is used in JSX like \`onChange={debouncedFn}\`, React detaches and re-attaches the event handler every render. The component re-renders on every keystroke. So the sequence is:

1. User types "h"
2. State change triggers re-render
3. React sees NEW onChange function reference
4. Detaches old handler, attaches new one
5. The setTimeout from the previous render is cleared by the new render's handler creation (via clearTimeout(timer.current))
6. New setTimeout starts

Actually wait — does the new function clear the old timer? Only if the NEW function is called. So the issue is more subtle: on every keystroke, a new function is returned. Since React sees a new function reference, it doesn't reuse the previous one. But this shouldn't cause IMMEDIATE firing...

Unless they're using it in a way that causes rapid re-renders BEFORE the debounce fires? Like if the component re-renders more often than the delay.

Actually the real problem is simpler: wrap the returned function in useCallback. Without useCallback, the returned function is unstable — it's recreated on every render. If this function is used as a dependency in a useEffect or memo, it'll trigger re-runs on every render. And if React re-attaches event handlers because the function reference changes, the setTimeout never actually waits the full delay — it gets reset on each keystroke AND on any subsequent re-render (like state updates from the onChange handler itself).

So the fix is:
1. useCallback with [delay] deps for the returned function
2. Ref for the callback to avoid stale closures
3. Initialize timer as null not undefined

Let me write this clearly.`,
    },
    artifact: {
      type: 'code',
      title: 'useDebounce.ts',
      language: 'typescript',
      versions: [],
      content: `import { useCallback, useEffect, useRef } from 'react'

export function useDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const callbackRef = useRef<T>(callback)

  // Always call the latest callback — avoids stale closure
  useEffect(() => { callbackRef.current = callback })

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  // Stable reference across renders (recreates only if delay changes)
  return useCallback((...args: Parameters<T>) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => callbackRef.current(...args), delay)
  }, [delay])
}

// Usage:
// const debouncedSearch = useDebounce((q: string) => fetchResults(q), 400)
// <input onChange={e => debouncedSearch(e.target.value)} />
`,
    },
    content: `The bug is that the hook returns a **new function object on every render** — without \`useCallback\`, the returned function has a different reference each time the component re-renders.

## Why this causes immediate firing

Here's the execution sequence on each keystroke:

1. User types → \`onChange\` fires → state update → re-render
2. Your hook returns a new function reference
3. If the debounced function is passed as \`onChange\`, React detaches the old handler and attaches the new one — starting a fresh timer
4. But the component *also* re-renders on any parent state change, which again gives a new function reference and resets the timer

The debounce timer never runs to completion because it's reset not just by typing, but by *any re-render that produces a new function reference* — which is every re-render.

## Three fixes

**1. Wrap in \`useCallback([delay])\`** — makes the returned function stable across renders, only recreating when \`delay\` changes.

**2. Store \`callback\` in a ref** — if \`callback\` were a \`useCallback\` dependency, it would recreate on every call-site render. The ref pattern breaks this cycle: you always get the latest callback without it affecting the debounced function's stability.

**3. Init timer as \`null\`** — minor, but \`undefined\` vs \`null\` is an intentional state distinction worth being explicit about.

Fixed version attached. The invariant: the function your hook returns has a **stable identity** across renders, so React doesn't see a "new" handler on every keystroke.`,
  },
]

// ─── Seed function ─────────────────────────────────────────────────────────────
export async function seedIfEmpty() {
  const count = await db.conversations.count()
  if (count > 0) return

  await db.transaction('rw', db.projects, db.conversations, db.messages, async () => {
    await db.projects.bulkAdd(PROJECTS)
    await db.conversations.bulkAdd(CONVOS)
    await db.messages.bulkAdd(MSGS)
  })
}
