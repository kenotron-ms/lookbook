import db from './index.js'

export const MODELS = [
  { id: 'sage-2',        label: 'Sage 2',         description: 'Most intelligent' },
  { id: 'sage-2-sonnet', label: 'Sage 2 Sonnet',  description: 'Most capable for complex tasks' },
  { id: 'sage-1-5',      label: 'Sage 1.5 Haiku', description: 'Fastest' },
]
export const DEFAULT_MODEL = 'sage-2-sonnet'
export const USER = { name: 'Jordan', handle: 'jordanblake', avatar: './user-avatar.jpg' }

// ─── Seed conversations ───────────────────────────────────────────────────────

const CONVOS = [
  {
    id: 1,
    title: 'Explain transformer attention mechanisms',
    model: 'sage-2-sonnet',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2 + 180000,
  },
  {
    id: 2,
    title: 'Refactor Express.js auth middleware',
    model: 'sage-2',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000 + 240000,
  },
  {
    id: 3,
    title: 'Write README for deployfast CLI',
    model: 'sage-2-sonnet',
    createdAt: Date.now() - 3600000 * 5,
    updatedAt: Date.now() - 3600000 * 5 + 120000,
  },
  {
    id: 4,
    title: 'Debug useDebounce hook firing immediately',
    model: 'sage-2',
    createdAt: Date.now() - 3600000 * 2,
    updatedAt: Date.now() - 3600000 * 2 + 90000,
  },
]

const MSGS = [
  // ── Convo 1: Transformer attention ─────────────────────────────────────────
  {
    id: 1, conversationId: 1, role: 'user', artifact: null,
    timestamp: Date.now() - 86400000 * 2,
    content: "Can you explain how attention mechanisms work in transformers? I've been reading the \"Attention Is All You Need\" paper but I'm struggling to build intuition for why it works so well.",
  },
  {
    id: 2, conversationId: 1, role: 'assistant',
    timestamp: Date.now() - 86400000 * 2 + 3000,
    artifact: {
      type: 'code', title: 'attention.py',
      language: 'python',
      content: `import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Compute scaled dot-product attention.
    
    Args:
        Q: Query matrix  (batch, heads, seq_len, d_k)
        K: Key matrix    (batch, heads, seq_len, d_k)
        V: Value matrix  (batch, heads, seq_len, d_v)
        mask: Optional attention mask
    
    Returns:
        output: Attended values (batch, heads, seq_len, d_v)
        weights: Attention weights for visualization
    """
    d_k = Q.shape[-1]
    
    # Step 1: Compute attention scores
    # Shape: (batch, heads, seq_len, seq_len)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    
    # Step 2: Apply mask (for causal / padding attention)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))
    
    # Step 3: Softmax over last dim → probabilities that sum to 1
    weights = F.softmax(scores, dim=-1)
    
    # Step 4: Weighted sum of values
    output = torch.matmul(weights, V)
    
    return output, weights


def demonstrate_attention():
    """Show attention working on a simple 4-token sequence."""
    batch_size, seq_len, d_model = 1, 4, 64
    d_k = d_model // 8  # 8 attention heads

    # Simulate Q, K, V projections for one head
    Q = torch.randn(batch_size, 1, seq_len, d_k)
    K = torch.randn(batch_size, 1, seq_len, d_k)
    V = torch.randn(batch_size, 1, seq_len, d_k)

    output, weights = scaled_dot_product_attention(Q, K, V)
    
    print(f"Input shape:  {Q.shape}")
    print(f"Output shape: {output.shape}")
    print(f"Attention weights (each row sums to 1.0):")
    print(weights[0, 0].round(decimals=3))
    
    return output, weights


if __name__ == "__main__":
    demonstrate_attention()
`,
    },
    content: `The attention mechanism is one of those ideas that seems complex at first but becomes surprisingly elegant once you see the geometry behind it.

## The Core Intuition

Think of each token in your sequence as asking: *"Which other tokens are relevant to understanding me?"* Attention provides the mechanism to answer that question dynamically — based on content, not just position.

The mechanism works through three projections of each token's embedding:

- **Query (Q)**: "What am I looking for?"
- **Key (K)**: "What information do I advertise?"
- **Value (V)**: "What will I contribute if selected?"

These are learned linear projections. The model learns to use them to route information where it's needed.

## The Mathematics

Given Q, K, and V matrices, attention is computed as:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$

Breaking this down:

1. **$QK^T$** — dot product of queries against all keys. High similarity → high score.
2. **$/ \\sqrt{d_k}$** — scaling prevents vanishing gradients in softmax when $d_k$ is large.
3. **softmax(...)** — converts raw scores to a probability distribution summing to 1.
4. **$\\times V$** — weighted average of value vectors. High-attention tokens contribute more.

## A Worked Example

Say you're processing *"The cat sat on the mat"* and attending from **"sat"**. The attention weights might look like:

| Token | "sat" attends to | Weight |
|-------|-----------------|--------|
| The   | 0.04            |
| cat   | 0.48            | ← high (subject)
| sat   | 0.22            | ← self-attention
| on    | 0.08            |
| the   | 0.06            |
| mat   | 0.12            | ← object

"sat" has learned that "cat" (the subject) and "mat" (the object) are the most relevant context. This wasn't hand-coded — the model learned these weights during training.

## Multi-Head Attention

Running attention once is limiting. Multi-head attention runs $h$ attention operations in parallel, each in a lower-dimensional subspace ($d_k = d_{model}/h$):

$$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, ..., \\text{head}_h) W^O$$

Different heads often specialize — one might capture syntactic relations, another semantic similarity, another coreference. This parallel processing is what makes transformers so expressive.

I've attached a working implementation that you can run to see the weights yourself. Notice how each row of the attention matrix sums to 1 — that's the probability distribution over tokens.`,
  },
  {
    id: 3, conversationId: 1, role: 'user', artifact: null,
    timestamp: Date.now() - 86400000 * 2 + 120000,
    content: "That makes a lot more sense. What's the key architectural difference that makes self-attention more powerful than RNN hidden states for capturing long-range dependencies?",
  },
  {
    id: 4, conversationId: 1, role: 'assistant', artifact: null,
    timestamp: Date.now() - 86400000 * 2 + 180000,
    content: `The fundamental difference comes down to **path length** — how many computation steps information has to travel between two tokens.

## RNNs: Sequential Bottleneck

In an RNN, information from token $t=1$ to reach token $t=100$ must pass through 99 intermediate hidden state updates:

$$h_1 \\rightarrow h_2 \\rightarrow h_3 \\rightarrow \\cdots \\rightarrow h_{100}$$

Each update is a lossy compression. The hidden state has a fixed capacity and must simultaneously:
- Preserve relevant history
- Process the current token
- Predict what future tokens might need

Long-range dependencies get diluted or lost entirely. This is the vanishing gradient problem — gradients flowing backward through 100 sequential steps become exponentially small.

## Self-Attention: Constant Path Length

With self-attention, every token attends directly to every other token in a **single operation**:

$$\\text{token}_1 \\longleftrightarrow \\text{token}_{100} \\quad \\text{(one step)}$$

The path length between any two positions is O(1) regardless of sequence length. "The bank where I deposited money" vs "The bank of the river" — the model can directly compare "bank" with "money" or "river" in a single attention operation, with no information degradation in between.

## The Trade-off

This comes at a cost: self-attention is O(n²) in sequence length because every token attends to every other. For a 1,000-token sequence that's 1,000,000 attention weights per head. This is why long-context transformers require tricks like sparse attention, sliding windows, or linear approximations.

RNNs are O(n) but can't parallelize (each step depends on the previous). Transformers are O(n²) but fully parallelizable — which is why they became practical once hardware (TPUs/GPUs with massive matrix multiply units) caught up.

The paper's title "Attention Is All You Need" was really a claim that the recurrence mechanism of RNNs is unnecessary — and it turned out to be right.`,
  },

  // ── Convo 2: Auth middleware refactor ──────────────────────────────────────
  {
    id: 5, conversationId: 2, role: 'user', artifact: null,
    timestamp: Date.now() - 86400000 + 0,
    content: `I have this Express.js auth middleware that I wrote a year ago. It's working but I know it has issues. Can you review it and refactor it?

\`\`\`javascript
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json({ error: 'No token' })
  }
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
    id: 6, conversationId: 2, role: 'assistant',
    timestamp: Date.now() - 86400000 + 8000,
    artifact: {
      type: 'code', title: 'auth.middleware.js',
      language: 'javascript',
      content: `const jwt = require('jsonwebtoken')

/**
 * JWT authentication middleware.
 *
 * Expects: Authorization: Bearer <token>
 * Sets:    req.user = decoded JWT payload
 */
module.exports = function authMiddleware(req, res, next) {
  // 1. Extract token from Authorization header
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authorization header must be: Bearer <token>',
    })
  }

  const token = authHeader.slice(7) // Remove "Bearer "

  // 2. Verify with environment variable — never hardcode secrets
  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error('[auth] JWT_SECRET environment variable is not set')
    return res.status(500).json({ error: 'Server misconfiguration' })
  }

  // 3. Verify and decode
  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256'],      // Explicitly allowlist algorithm
      complete: false,            // Return payload only, not full decoded object
    })

    req.user = decoded
    next()
  } catch (err) {
    // 4. Return specific error messages for different failure cases
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired',
        expiredAt: err.expiredAt,
      })
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Unexpected error — don't leak details
    console.error('[auth] Unexpected JWT error:', err)
    return res.status(500).json({ error: 'Authentication error' })
  }
}
`,
    },
    content: `Good that you're revisiting this — there are several issues in the original that range from security-critical to maintainability concerns.

## Issues Found

**1. Hardcoded secret** (critical)
\`\`\`js
jwt.verify(token, 'mysecretkey123')  // ❌ Never do this
\`\`\`
Secrets in source code end up in version control, build logs, and container images. Use environment variables.

**2. No Bearer prefix handling**
The \`Authorization\` header conventionally uses the \`Bearer\` scheme: \`Authorization: Bearer <token>\`. Your code reads the entire header value including the "Bearer " prefix, so \`jwt.verify\` is receiving \`"Bearer eyJ..."\` not \`"eyJ..."\`. This is technically broken — it probably "works" because your tokens are generated by code that makes the same mistake.

**3. Algorithm not specified** (security)
Not specifying \`algorithms\` allows the \`none\` algorithm attack — an attacker can craft a token with \`alg: "none"\` and no signature, and some JWT libraries will accept it. Always allowlist the algorithm explicitly.

**4. No error differentiation**
All failures return the same "Invalid token" message. Expired tokens should be distinguishable from malformed ones — clients need this to know whether to prompt re-authentication vs. report a bug.

**5. Missing guard for undefined secret**
If \`JWT_SECRET\` is missing from the environment, \`jwt.verify\` will throw or behave unexpectedly. Fail fast with a clear error.

## Refactored Version

The attached middleware addresses all of the above. Key changes:

- Reads secret from \`process.env.JWT_SECRET\` with a guard
- Properly strips \`Bearer \` prefix
- Passes \`{ algorithms: ['HS256'] }\` to \`jwt.verify\`
- Differentiates \`TokenExpiredError\` from \`JsonWebTokenError\`
- Doesn't leak unexpected error details to the client

Don't forget to add \`JWT_SECRET\` to your \`.env\` file (and \`.env.example\` for teammates):
\`\`\`
JWT_SECRET=<at-least-32-random-bytes-from-openssl-rand-hex-32>
\`\`\``,
  },

  // ── Convo 3: README for deployfast ─────────────────────────────────────────
  {
    id: 7, conversationId: 3, role: 'user', artifact: null,
    timestamp: Date.now() - 3600000 * 5,
    content: "I've built a CLI tool called `deployfast` that can deploy Node.js apps to AWS, GCP, Railway, or Fly.io with a single command. It reads a `deploy.yaml` config file. Can you write a README for it?",
  },
  {
    id: 8, conversationId: 3, role: 'assistant',
    timestamp: Date.now() - 3600000 * 5 + 5000,
    artifact: {
      type: 'document', title: 'README.md',
      language: 'markdown',
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

**1. Initialize your project**

\`\`\`bash
cd my-app
deployfast init
\`\`\`

This creates a \`deploy.yaml\` in your project root.

**2. Configure your deployment**

\`\`\`yaml
# deploy.yaml
app: my-app
region: us-east-1

build:
  command: npm run build
  output: dist/

provider: aws          # aws | gcp | railway | fly

env:
  NODE_ENV: production
  PORT: 3000

# Provider-specific settings
aws:
  service: ecs-fargate
  cpu: 256
  memory: 512
\`\`\`

**3. Deploy**

\`\`\`bash
deployfast up
\`\`\`

---

## Supported Providers

| Provider | Compute | Auth |
|----------|---------|------|
| **AWS** | ECS Fargate, Lambda, EC2 | \`aws configure\` |
| **GCP** | Cloud Run, GKE | \`gcloud auth login\` |
| **Railway** | Managed containers | \`railway login\` |
| **Fly.io** | Fly Machines | \`flyctl auth login\` |

---

## CLI Reference

\`\`\`
deployfast up               Deploy latest build
deployfast up --env staging Deploy to staging environment
deployfast down             Tear down deployment
deployfast status           Show running services
deployfast logs             Tail live logs
deployfast init             Create deploy.yaml interactively
deployfast providers        List authenticated providers
\`\`\`

### Options

| Flag | Description | Default |
|------|-------------|---------|
| \`--env\` | Target environment | \`production\` |
| \`--dry-run\` | Preview without deploying | false |
| \`--no-build\` | Skip build step | false |
| \`--tail\` | Tail logs after deploy | false |
| \`--config\` | Config file path | \`./deploy.yaml\` |

---

## Configuration Reference

\`\`\`yaml
# deploy.yaml — all options
app: string           # Application name (required)
region: string        # Deployment region
provider: string      # aws | gcp | railway | fly (required)

build:
  command: string     # Build command (default: npm run build)
  output: string      # Build output directory

scale:
  min: number         # Minimum instances (default: 1)
  max: number         # Maximum instances (default: 3)
  cpu_threshold: 70   # Scale up at 70% CPU

env:
  KEY: value          # Environment variables (plain text)

secrets:              # Pull from provider's secret store
  - DATABASE_URL
  - API_KEY

health_check:
  path: /health       # HTTP health check path
  interval: 30        # Check interval in seconds
  timeout: 10
\`\`\`

---

## Environments

deployfast supports multiple named environments. Create \`deploy.staging.yaml\` alongside \`deploy.yaml\`:

\`\`\`bash
deployfast up --env staging    # reads deploy.staging.yaml
deployfast up                  # reads deploy.yaml (production)
\`\`\`

---

## CI/CD Integration

**GitHub Actions**

\`\`\`yaml
# .github/workflows/deploy.yml
- name: Deploy
  run: npx deployfast up
  env:
    AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
\`\`\`

---

## Contributing

\`\`\`bash
git clone https://github.com/your-org/deployfast
cd deployfast
npm install
npm test
\`\`\`

PRs welcome. Please open an issue first for major changes.

---

## License

MIT
`,
    },
    content: "Here's a comprehensive README for deployfast. I've structured it around the workflow a new user would follow — install → init → configure → deploy — before going into the full reference material.\n\nA few things worth noting:\n\n- The **Quick Start** section gets someone to a working deploy in 3 steps. This is the most important part of any CLI README — people scan for the fast path first.\n- The **Supported Providers** table with auth commands is useful since provider setup is the most common friction point for tools like this.\n- I included a **CI/CD** section because deploy tools almost always get used in pipelines, and people immediately google for GitHub Actions examples.\n- The config reference uses YAML comments inline rather than a separate prose description — it's easier to scan and copy-paste from.\n\nFeel free to fill in the actual GitHub URL and adjust the scale/compute defaults to match what deployfast actually supports.",
  },

  // ── Convo 4: Debug useDebounce ────────────────────────────────────────────
  {
    id: 9, conversationId: 4, role: 'user', artifact: null,
    timestamp: Date.now() - 3600000 * 2,
    content: `My useDebounce hook is broken — the callback fires immediately instead of waiting. Here's what I have:

\`\`\`typescript
import { useEffect, useRef } from 'react'

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [])

  return (...args: Parameters<T>) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => callback(...args), delay)
  }
}
\`\`\``,
  },
  {
    id: 10, conversationId: 4, role: 'assistant',
    timestamp: Date.now() - 3600000 * 2 + 5000,
    artifact: {
      type: 'code', title: 'useDebounce.ts',
      language: 'typescript',
      content: `import { useCallback, useEffect, useRef } from 'react'

export function useDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Keep a stable ref to the latest callback so we never need it in deps
  const callbackRef = useRef<T>(callback)

  // Update ref on every render so we always call the latest version
  useEffect(() => {
    callbackRef.current = callback
  })

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current)
    }
  }, [])

  // The returned function is stable across renders (useCallback with empty deps)
  return useCallback((...args: Parameters<T>) => {
    if (timerRef.current !== null) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      callbackRef.current(...args)
    }, delay)
  }, [delay]) // re-create only if delay changes
}

// ── Usage example ──────────────────────────────────────────────────────────
//
// const debouncedSearch = useDebounce((query: string) => {
//   fetch(\`/api/search?q=\${query}\`).then(...)
// }, 400)
//
// <input onChange={e => debouncedSearch(e.target.value)} />
//
// The callback fires 400ms after the user stops typing.
`,
    },
    content: `The bug is subtle. Your hook creates a new debounced function on every render — and since React sees a new function reference each time, it's being treated as if it fires immediately.

## Root Cause

\`\`\`typescript
// ❌ This creates a new function object on every render
return (...args: Parameters<T>) => {
  clearTimeout(timer.current)
  timer.current = setTimeout(() => callback(...args), delay)
}
\`\`\`

When you use this in JSX like \`onChange={debouncedSearch}\`, React's reconciler sees a new function on each render and re-attaches the event handler. The setTimeout gets cleared and reset on every render, which is why it never actually waits — components re-render on every keystroke.

## Three fixes needed

**1. Wrap the returned function in \`useCallback\`**

This makes the returned function reference stable across renders (recreating only when \`delay\` changes):

\`\`\`typescript
return useCallback((...args: Parameters<T>) => {
  clearTimeout(timerRef.current)
  timerRef.current = setTimeout(() => callbackRef.current(...args), delay)
}, [delay])
\`\`\`

**2. Store \`callback\` in a ref**

Without this, the \`callback\` would need to be in \`useCallback\`'s deps array, which makes the debounced function re-create whenever the callback changes — reintroducing the problem. The pattern of storing the latest callback in a ref is a standard React escape hatch:

\`\`\`typescript
const callbackRef = useRef<T>(callback)
useEffect(() => { callbackRef.current = callback })
\`\`\`

**3. Initialize \`timerRef\` as \`null\`**

\`useRef<ReturnType<typeof setTimeout>>()\` initializes to \`undefined\`. Typing it as \`null\` and initializing it that way makes intent explicit and avoids a subtle TypeScript strictness issue.

The fixed version is in the attached file. The key invariant: the function returned by the hook has a **stable identity** across renders, so React's reconciler doesn't see a "new" handler on every keystroke.`,
  },
]

export async function seedIfEmpty() {
  const count = await db.conversations.count()
  if (count > 0) return

  await db.transaction('rw', db.conversations, db.messages, async () => {
    await db.conversations.bulkAdd(CONVOS)
    await db.messages.bulkAdd(MSGS)
  })
}
