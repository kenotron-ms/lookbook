// AI response generation — single-player simulation of Sage
// Pattern-matches user input and returns realistic responses with optional artifacts

const THINKING_DELAY_MS = 1400

const CODE_PATTERNS = [
  /\b(refactor|rewrite|implement|fix\s+the|debug|optimize|improve)\b/i,
  /\b(function|class|component|hook|api|endpoint|middleware|schema)\b/i,
  /```/,
]
const EXPLAIN_PATTERNS = [
  /\b(explain|how does|what is|what are|why does|tell me about|describe|understand)\b/i,
  /\b(difference between|compare|versus|vs\.?)\b/i,
]
const CREATE_PATTERNS = [
  /\b(write|create|generate|draft|make|build)\b.{0,30}\b(readme|documentation|spec|proposal|email|letter|essay|report)\b/i,
]
const PLAN_PATTERNS = [
  /\b(plan|roadmap|strategy|approach|steps|outline|breakdown)\b/i,
]

function detectIntent(text) {
  if (CODE_PATTERNS.some(p => p.test(text))) return 'code'
  if (CREATE_PATTERNS.some(p => p.test(text))) return 'document'
  if (EXPLAIN_PATTERNS.some(p => p.test(text))) return 'explain'
  if (PLAN_PATTERNS.some(p => p.test(text))) return 'plan'
  return 'general'
}

// ─── Response bank ────────────────────────────────────────────────────────────

const RESPONSES = {
  code: [
    {
      content: `I'll take a look at this.

A few things stand out right away:

1. **Error handling is too broad** — catching all exceptions with a single handler makes it hard to differentiate user errors from system errors.
2. **Missing input validation** — the function assumes the input matches expectations without checking.
3. **Magic values** — hardcoded strings/numbers should be extracted to named constants.

Here's a refactored version that addresses these issues:`,
      artifact: {
        type: 'code',
        title: 'solution.ts',
        language: 'typescript',
        content: `// Refactored version
// Key changes:
// 1. Explicit error types with specific handling
// 2. Input validation at the entry point
// 3. Named constants for magic values
// 4. Clear separation of concerns

const MAX_RETRIES = 3
const REQUEST_TIMEOUT_MS = 5000

export class ValidationError extends Error {
  constructor(field: string, message: string) {
    super(\`Validation failed for '\${field}': \${message}\`)
    this.name = 'ValidationError'
  }
}

export async function processRequest(input: unknown) {
  // Validate at the boundary
  if (!input || typeof input !== 'object') {
    throw new ValidationError('input', 'must be a non-null object')
  }
  
  const { id, data } = input as Record<string, unknown>
  
  if (typeof id !== 'string' || id.trim() === '') {
    throw new ValidationError('id', 'must be a non-empty string')
  }
  
  // Core logic with specific error handling
  let attempts = 0
  while (attempts < MAX_RETRIES) {
    try {
      const result = await fetchWithTimeout(id, data, REQUEST_TIMEOUT_MS)
      return result
    } catch (err) {
      attempts++
      if (attempts === MAX_RETRIES) throw err
      await delay(100 * Math.pow(2, attempts)) // exponential backoff
    }
  }
}

async function fetchWithTimeout(id: string, data: unknown, timeout: number) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(\`/api/process/\${id}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
    
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
    }
    
    return response.json()
  } finally {
    clearTimeout(timer)
  }
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
`,
      },
    },
  ],

  explain: [
    {
      content: `Great question. Let me break this down from first principles.

## The Core Concept

At its heart, this is about understanding the trade-off between **correctness** and **performance**. Most systems are forced to choose a point on that spectrum rather than achieve both simultaneously.

## Why This Matters

Consider what happens at scale. When you have a single machine, strong consistency is straightforward — you just lock the resource. But when you distribute state across multiple nodes, you face the fundamental challenge of the **CAP theorem**:

- **Consistency**: Every read receives the most recent write
- **Availability**: Every request receives a non-error response
- **Partition tolerance**: The system continues despite network failures

You can only guarantee two of these three properties at once. Most modern distributed systems choose AP (availability + partition tolerance) and accept eventual consistency.

## The Practical Implications

In practice, this means:

1. **Last-write-wins conflicts** are possible — two clients writing simultaneously may have one write silently overwritten
2. **Read-your-own-writes** isn't guaranteed across regions without additional coordination
3. **Stale reads** are a feature, not a bug — they allow reads to be served from local replicas without round-tripping to a primary

The key insight is that for most user-facing operations, **the user doesn't need the very latest state** — they need a response within their attention span (~300ms). Eventual consistency often wins in practice because it lets you serve responses from the nearest data center.

## When To Use Each

| Use Case | Approach |
|----------|----------|
| Bank transfer | Strong consistency (correctness critical) |
| Social media feed | Eventual consistency (staleness acceptable) |
| Inventory system | Depends on business rules for overselling |
| User profile reads | Eventual consistency |
| Authentication tokens | Strong consistency |

The right answer depends on your tolerance for inconsistency, which is ultimately a business decision, not a technical one.`,
      artifact: null,
    },
    {
      content: `This is one of those topics where having a concrete mental model makes everything else click.

## The Simple Explanation

Imagine you have a recipe book that you want 1,000 chefs to read simultaneously. You could:

1. **One physical book** — only one chef can read at a time (serialized, correct but slow)
2. **1,000 photocopies** — everyone reads simultaneously, but if a page is updated, not everyone gets the new version immediately (concurrent, fast but eventually consistent)

Most modern systems are option 2, with sophisticated mechanisms to propagate updates and handle conflicts.

## How It Works Under the Hood

The key mechanism is **vector clocks** (or their cousin, **CRDTs**). Instead of tracking absolute time (which is unreliable across distributed systems), each node tracks the logical order of operations:

\`\`\`
Node A sees: [A:1, B:0, C:0] → "A has done 1 operation, B and C haven't done anything yet"
Node B sees: [A:0, B:1, C:0] → "B has done 1 operation"
After sync:  [A:1, B:1, C:0] → merged state
\`\`\`

When two nodes merge, they can compare vector clocks to determine causality — whether operation A happened before operation B, after it, or concurrently (in which case conflict resolution rules apply).

## A Real Example

When you edit a Google Doc offline and reconnect, the operational transformation algorithm reconciles your changes with others' changes made in parallel. It preserves the *intent* of each edit, not just the final bytes.

That's the beauty of modern distributed systems — they've moved from "detect conflict" to "understand intent and resolve intelligently."`,
      artifact: null,
    },
  ],

  document: [
    {
      content: `Here's a comprehensive document based on what you've described. I've structured it to lead with the most important information first — what it does and how to get started — before going into the full reference.

A few decisions I made:
- Kept the Quick Start section to exactly 3 steps so it's scannable
- Included an examples section since tools like this often have non-obvious usage patterns  
- Added a Configuration Reference with comments inline rather than separate prose documentation

Feel free to adjust the examples to match your actual API surface.`,
      artifact: {
        type: 'document',
        title: 'document.md',
        language: 'markdown',
        content: `# Your Project

A short, specific description of what this does and who it's for.

## Quick Start

\`\`\`bash
npm install your-tool
\`\`\`

\`\`\`js
const tool = require('your-tool')

// Basic usage
const result = await tool.process(input)
console.log(result)
\`\`\`

## Features

- **Feature 1** — short description of the benefit
- **Feature 2** — short description of the benefit
- **Feature 3** — short description of the benefit

## API Reference

### \`tool.process(input, options?)\`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| input | string | required | The input to process |
| options.timeout | number | 5000 | Timeout in milliseconds |
| options.retries | number | 3 | Number of retry attempts |

**Returns:** \`Promise<Result>\`

\`\`\`typescript
interface Result {
  data: string
  metadata: {
    processingTime: number
    source: string
  }
}
\`\`\`

## Contributing

\`\`\`bash
git clone https://github.com/your-org/your-tool
cd your-tool
npm install
npm test
\`\`\`

## License

MIT
`,
      },
    },
  ],

  plan: [
    {
      content: `Here's how I'd approach this.

## Recommended Approach

Before diving into implementation, it's worth spending time on the design phase. The most expensive mistakes in software are the ones made during architecture that only reveal themselves 6 months later.

### Phase 1: Foundation (Weeks 1-2)

Focus on getting the core data model right. Ask yourself:
- What are the fundamental entities?
- What are the invariants that must always hold?
- Where are the consistency boundaries?

**Deliverable:** An ERD or schema that can be reviewed before writing a single line of application code.

### Phase 2: Core Loop (Weeks 3-4)

Build the "walking skeleton" — the thinnest possible slice that exercises every layer of the system:
- API endpoint (even if it returns hardcoded data)
- Data layer (even if the model is incomplete)
- Frontend component (even if it's not styled)

This proves that the pieces connect before you invest heavily in any one layer.

### Phase 3: Feature Completion (Weeks 5-8)

Iterate horizontally across features rather than completing one feature fully before starting the next. This keeps the system in a shippable state and surfaces integration issues early.

### Phase 4: Hardening (Weeks 9-10)

- Error handling and edge cases
- Performance profiling on realistic data volumes
- Security review
- Documentation

## Key Risks

1. **Scope creep** — the skeleton should define the scope boundary. If a feature isn't needed for the core loop, defer it.
2. **Premature optimization** — measure first, optimize second. Most performance problems are in unexpected places.
3. **Integration debt** — the longer you wait to integrate components, the more expensive it becomes.

Want me to go deeper on any of these phases?`,
      artifact: null,
    },
  ],

  general: [
    {
      content: `That's a great question. Let me share my perspective.

The short answer is: it depends on your context and constraints. There's no universally correct answer here, which is why this comes up so often in practice.

The more useful framing is to ask: **what's the actual cost of being wrong?** That often clarifies which approach is appropriate.

If the cost of being wrong is high and hard to reverse (production data loss, security vulnerabilities, customer-facing failures), err on the side of caution — more validation, more testing, slower iteration.

If the cost of being wrong is low and easy to fix (UI experiments, internal tooling, early-stage product), err on the side of speed — ship quickly, learn, iterate.

Most teams get this backwards — they apply excessive process to low-stakes decisions and move too fast on high-stakes ones.

Is there a specific decision you're weighing? I can give more concrete guidance with the context.`,
      artifact: null,
    },
    {
      content: `I think the most important thing here is to separate the *what* from the *how*.

The *what* — the goal, the outcome, the thing that makes this worth doing — should be stable. The *how* should be flexible and revisable as you learn more.

Teams that conflate these often find themselves defending implementation choices as if they were mission-critical, when actually what matters is whether the underlying goal is being served.

With that said, here's how I'd think about your situation specifically:

**Start with the simplest thing that could possibly work.** Not the simplest thing you can imagine building, but the simplest thing that would actually achieve the goal. These are often different.

**Build in a feedback loop from the start.** Whatever you ship should teach you something about whether you're on the right track. If it doesn't, you've built something but haven't actually learned anything.

**Set a date to reassess.** Pick a point in the future where you'll explicitly ask "is this working?" — not just "is it shipped?" but "is it achieving the goal?"

What's the underlying goal you're trying to achieve here?`,
      artifact: null,
    },
  ],
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Generate a response for the given user message.
 * Returns { content, artifact } after THINKING_DELAY_MS milliseconds.
 */
export async function generateResponse(userMessage) {
  await new Promise(r => setTimeout(r, THINKING_DELAY_MS))

  const intent = detectIntent(userMessage)
  const pool = RESPONSES[intent] || RESPONSES.general
  const response = pool[Math.floor(Math.random() * pool.length)]

  return {
    content: response.content,
    artifact: response.artifact ?? null,
  }
}
