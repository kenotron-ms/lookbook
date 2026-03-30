/**
 * Agentic AI response generator — simulates Sage's thinking, tool use, and responses.
 * All responses are pre-authored to be high-quality and realistic.
 */

// ─── Intent detection ─────────────────────────────────────────────────────────
const detectIntent = (text) => {
  const t = text.toLowerCase()
  if (/search|look up|find|latest|recent|news|what.s new|current/i.test(text)) return 'web_search'
  if (/run|execute|calculate|compute|math|sort|algorithm/i.test(text)) return 'code_execution'
  if (/refactor|rewrite|fix|debug|error|bug|broken|not work/i.test(text)) return 'code_fix'
  if (/implement|build|create|write.*function|write.*class|write.*component/i.test(text)) return 'code_new'
  if (/explain|how does|what is|what are|why does|understand|describe/i.test(text)) return 'explain'
  if (/write.*readme|write.*doc|write.*spec|write.*proposal|write.*email/i.test(text)) return 'document'
  if (/plan|roadmap|strategy|steps|approach|outline/i.test(text)) return 'plan'
  return 'general'
}

// ─── Thinking blocks ──────────────────────────────────────────────────────────
const THINKING = {
  web_search: (query) => ({
    durationSeconds: Math.floor(6 + Math.random() * 6),
    text: `The user is asking about "${query.slice(0, 60)}..." — this is a factual topic that benefits from current information rather than relying solely on my training data.

Let me search for the most recent and authoritative sources. I'll focus on official documentation, well-known technical blogs, and primary sources rather than aggregators.

Once I have the results, I'll synthesize the key points rather than just summarizing each source individually.`,
  }),

  code_fix: (input) => ({
    durationSeconds: Math.floor(10 + Math.random() * 8),
    text: `Let me carefully analyze this code for issues.

First pass — obvious bugs:
- Looking at control flow and error handling
- Checking for common gotchas (off-by-one, null/undefined, async patterns)
- Examining any security implications

Second pass — the deeper structural issues:
- Is the abstraction layer correct?
- Are side effects isolated appropriately?
- Could this fail in edge cases I haven't considered yet?

I see the core issue now. Let me trace through the execution to confirm before writing the fix.

I'll run the problematic code path first to demonstrate the failure, then provide the corrected version with a clear explanation of what changed and why.`,
  }),

  code_new: (input) => ({
    durationSeconds: Math.floor(8 + Math.random() * 6),
    text: `The user wants me to implement ${input.slice(0, 60)}...

Let me think about the interface before writing any implementation. The key questions:
1. What are the inputs and outputs?
2. What are the edge cases?
3. What's the right level of abstraction?

I should write tests or at minimum document the expected behavior first.

For the implementation, I'll prioritize correctness and clarity over cleverness. The code should be easy to understand and modify later.`,
  }),

  explain: (input) => ({
    durationSeconds: Math.floor(8 + Math.random() * 10),
    text: `The user is asking about ${input.slice(0, 60)}...

I should build up the explanation from first principles rather than jumping straight to the technical details. The most common failure mode in technical explanations is assuming too much prior knowledge.

Structure I'm thinking:
1. Intuitive framing — what problem does this solve?
2. Simple concrete example
3. Mathematical/formal treatment
4. Edge cases and common misconceptions
5. Code to make it tangible

I want to make sure I don't just tell them *what* it does but *why* it works.`,
  }),

  document: () => ({
    durationSeconds: Math.floor(5 + Math.random() * 4),
    text: `Writing documentation. Key principle: optimize for the reader's first 30 seconds.

Structure:
1. What is it + one-line value prop
2. Quick Start (≤3 steps to working state)
3. Configuration reference
4. CLI/API reference
5. Examples for common use cases

I'll make this a document artifact so it renders properly and can be downloaded directly.`,
  }),

  general: () => ({
    durationSeconds: Math.floor(5 + Math.random() * 8),
    text: `Let me think carefully about what the user is asking and what would be most useful here.

The key insight is that I should answer the underlying question, not just the literal question. What are they actually trying to accomplish?

I'll structure my response to be direct and actionable rather than exhaustive. If they need more depth on any point, they can ask.`,
  }),
}

// ─── Tool call generators ─────────────────────────────────────────────────────
const SEARCH_RESULTS_POOL = [
  [
    { title: 'Official Documentation', domain: 'docs.example.com', excerpt: 'The complete reference for this topic, including examples and best practices for modern usage patterns.' },
    { title: 'Deep Dive: Understanding the Core Concepts', domain: 'blog.example.com', excerpt: 'A thorough explanation of the underlying mechanics and when to apply different approaches in production systems.' },
    { title: 'Practical Guide with Real Examples', domain: 'guide.example.com', excerpt: 'Working examples and patterns you can adapt for your own projects, with common pitfalls to avoid.' },
    { title: 'Migration Guide and Breaking Changes', domain: 'changelog.example.com', excerpt: 'What changed in recent versions, how to migrate existing code, and what to watch out for when upgrading.' },
    { title: 'Community Discussion: Best Practices', domain: 'discuss.example.com', excerpt: 'The community has converged on these patterns after extensive real-world usage. Includes counterexamples and why certain approaches fail.' },
  ],
  [
    { title: 'Getting Started Tutorial', domain: 'learn.example.com', excerpt: 'Step-by-step walkthrough from installation to your first working example, with explanations at each stage.' },
    { title: 'Performance Benchmarks and Tradeoffs', domain: 'perf.example.com', excerpt: 'Measured performance characteristics under realistic load, with clear guidance on when the tradeoffs matter.' },
    { title: 'Security Considerations', domain: 'security.example.com', excerpt: 'Common vulnerabilities, how they arise in practice, and the mitigations you should apply in production deployments.' },
    { title: 'Architecture Patterns', domain: 'arch.example.com', excerpt: 'How to structure your system for maintainability and scalability, with worked examples from real codebases.' },
    { title: 'Testing Strategies', domain: 'test.example.com', excerpt: 'Unit, integration, and end-to-end testing approaches with example test suites you can adapt.' },
  ],
]

const CODE_EXECUTION_OUTPUTS = [
  { code: `# Demonstrating the issue
result = process(input_data)
print(f"Input:  {input_data}")
print(f"Output: {result}")
print(f"Expected: {expected}")
print(f"Match: {result == expected}")`, output: `Input:  {'key': 'value', 'nested': {'a': 1}}
Output: {'key': 'value', 'nested': {'a': 1}}
Expected: {'key': 'VALUE', 'nested': {'a': 1}}
Match: False

⚠ The transformation isn't being applied to the expected key. See fix below.` },
  { code: `import time

# Benchmarking the algorithm
sizes = [100, 1000, 10000]
for n in sizes:
    data = list(range(n))
    start = time.perf_counter()
    result = algorithm(data)
    elapsed = (time.perf_counter() - start) * 1000
    print(f"n={n:6d}: {elapsed:.2f}ms")`, output: `n=   100:  0.12ms
n=  1000:  1.47ms
n= 10000: 156.34ms

O(n²) growth confirmed. At n=100K this would take ~15s. See optimized version below.` },
]

// ─── Response bank ────────────────────────────────────────────────────────────
const RESPONSES = {
  web_search: [
    {
      content: `Here's what the latest sources are saying:

## Key Changes

The most significant updates in this release center around three themes: **improved developer experience**, **better defaults**, and **performance gains** that don't require any opt-in.

### What's Actually Different

The core behavior you relied on previously is unchanged — this is a backwards-compatible update. What's new:

1. **The new API surface** — a cleaner, more composable interface that replaces the verbose configuration pattern from v2. Old patterns still work but are deprecated.

2. **Automatic optimization** — the runtime now handles several cases that previously required manual tuning. Most codebases can remove the manual configuration entirely.

3. **Improved error messages** — failed operations now report actionable diagnostics instead of generic errors. This alone has been worth the upgrade for many teams.

### What to Upgrade

\`\`\`bash
npm install package@latest
\`\`\`

No breaking changes in your direct API usage, but check the migration guide if you're using the internal \`_unstable_\` APIs. ^[1]^[3]

### Caveats from the community ^[5]

- The new defaults are better for most cases but may change behavior in edge cases involving concurrent operations
- The TypeScript types were overhauled — if you're using \`as\` casts heavily, expect some type errors to surface
- Testing libraries haven't all updated yet; use \`--legacy-peer-deps\` if you hit peer dependency issues`,
    },
  ],

  code_fix: [
    {
      content: `The bug is confirmed by the execution above. Here's what's happening:

## Root Cause

The issue is in how the function handles the edge case. Tracing through the execution:

1. Input arrives correctly
2. The transformation is applied to the wrong field — it mutates a reference instead of creating a new object
3. The result reflects the unmodified state

This is a classic **mutation bug**: the function modifies the original data structure instead of returning a new one, which means the output reflects the state before the transformation.

## The Fix

\`\`\`javascript
// Before: mutates input
function process(data) {
  data.key = transform(data.key)  // ❌ mutates the argument
  return data
}

// After: returns new object
function process(data) {
  return {
    ...data,
    key: transform(data.key)  // ✅ preserves original, returns transformed copy
  }
}
\`\`\`

The refactored version in the attached file applies this fix consistently throughout and also adds:
- Input validation at the boundary
- Explicit handling of null/undefined inputs
- A clear return type annotation`,
      artifact: {
        type: 'code', title: 'solution.ts', language: 'typescript',
        versions: [],
        content: `// Fixed implementation
// Key change: returns new objects instead of mutating arguments

export function process<T extends Record<string, unknown>>(
  data: T,
  transform: (value: unknown) => unknown
): T {
  if (data === null || data === undefined) {
    throw new TypeError('process: data argument cannot be null or undefined')
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, transform(value)])
  ) as T
}

// Usage
const result = process({ key: 'value', count: 42 }, v => 
  typeof v === 'string' ? v.toUpperCase() : v
)
// → { key: 'VALUE', count: 42 }
`,
      },
    },
  ],

  code_new: [
    {
      content: `Here's the implementation. I've structured it to be readable first, efficient second — it's easier to optimize correct code than to correct optimized code.

**Design decisions:**
- Pure function — no side effects, same input always gives same output
- Input validation at the boundary — fails fast with descriptive errors
- Typed throughout — the TypeScript generics aren't just for show, they prevent a class of bugs at compile time

The attached file includes both the implementation and usage examples.`,
      artifact: {
        type: 'code', title: 'implementation.ts', language: 'typescript',
        versions: [],
        content: `/**
 * Clean implementation with:
 * - Input validation
 * - TypeScript generics  
 * - Pure function design
 * - Comprehensive JSDoc
 */

/**
 * Processes the input and returns a transformed result.
 * 
 * @param input - The data to transform
 * @param options - Configuration options
 * @returns The transformed result
 * @throws {TypeError} If input is null or undefined
 */
export function process<T, R>(
  input: T,
  options: ProcessOptions<T, R> = {}
): R {
  if (input == null) throw new TypeError('Input cannot be null or undefined')

  const {
    transform = (x: T) => x as unknown as R,
    validate = () => true,
    onError,
  } = options

  if (!validate(input)) {
    const error = new Error('Input failed validation')
    if (onError) { onError(error); return null as R }
    throw error
  }

  return transform(input)
}

interface ProcessOptions<T, R> {
  transform?: (input: T) => R
  validate?: (input: T) => boolean
  onError?: (error: Error) => void
}

// Example usage:
// const result = process('hello world', {
//   transform: s => s.toUpperCase().split(' '),
//   validate: s => s.length > 0,
// })
// → ['HELLO', 'WORLD']
`,
      },
    },
  ],

  explain: [
    {
      content: `Let me build up the intuition before the formalism.

## The Problem It Solves

Most complex systems share a fundamental tension: you want things to work correctly *and* to work fast. These goals often conflict. The key insight is that you can usually separate *when* something is computed from *what* is computed — and that separation is where the leverage lives.

## The Core Mechanism

Think of it as a contract between three parties:

1. **The producer** — commits to providing a value when asked
2. **The consumer** — commits to only using the value, not modifying it  
3. **The runtime** — guarantees the value is available when the consumer needs it

When all three parties honor the contract, the runtime can optimize freely — caching, lazy evaluation, parallel execution — without changing the observable behavior.

\`\`\`
Producer → [value] → Runtime → Consumer
                ↑
         (cached / lazy / parallel)
\`\`\`

## Where It Breaks Down

The contract breaks when:
- The producer creates side effects (writes to shared state)
- The consumer holds a reference to a mutable object
- The runtime makes assumptions that don't hold under concurrent access

Most bugs in this space come from violating the "consumer doesn't modify" part of the contract, often accidentally through shared mutable references.

## Practical Implications

In practice, this means:
1. Prefer immutable data structures at boundaries
2. Make side effects explicit (return a description of the side effect, don't perform it inline)
3. When you *must* mutate, scope the mutation to the smallest possible region

Does this framing help? Happy to go deeper on any part.`,
    },
  ],

  document: [
    {
      content: `Here's the document. Structured around the reader's first 30 seconds — Quick Start immediately, reference material after.

A few decisions:
- Quick Start is exactly 3 steps
- Configuration uses inline comments rather than a separate reference section — easier to copy and adapt
- CI/CD example included near the top because tools like this inevitably end up in pipelines`,
      artifact: {
        type: 'document', title: 'document.md', language: 'markdown',
        versions: [],
        content: `# Your Project

A clear, specific description of what this does and for whom.

## Quick Start

\`\`\`bash
npm install your-package
\`\`\`

\`\`\`js
const { create } = require('your-package')

const instance = create({ config: 'value' })
const result = await instance.run()
console.log(result)
\`\`\`

## Configuration

\`\`\`yaml
# config.yaml
option_one: value       # Description of what this controls
option_two: 10          # Numeric options with sensible defaults
option_three: true      # Boolean flags
\`\`\`

## API Reference

### \`create(options)\`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| config | string | required | Configuration value |
| timeout | number | 5000 | Timeout in milliseconds |

**Returns:** Instance object

## CI/CD

\`\`\`yaml
- name: Run
  run: npx your-package
  env:
    API_KEY: \${{ secrets.API_KEY }}
\`\`\`

## License

MIT
`,
      },
    },
  ],

  general: [
    {
      content: `That's a great framing for the problem. Here's how I'd think about it:

The key is to separate what you control from what you don't. Most difficult problems have a core that's genuinely hard and a periphery that looks hard but is actually just unfamiliar. The periphery is where most people spend their time — and where they get stuck.

**On the core:** Be honest about what you're actually optimizing for. The stated goal and the real goal are often different, and solving the stated goal while ignoring the real goal leads to solutions that technically work but feel wrong.

**On the periphery:** Pick one thing that seems hard and spend 20 minutes on it before deciding it's hard. Most things that seem hard are just unfamiliar. Most things that are actually hard become tractable once you've eliminated the unfamiliar parts.

**The practical test:** Can you explain the current state and the desired state in one sentence each? If not, you're probably still in "understanding the problem" mode, not "solving the problem" mode — and those require different approaches.

What's the one thing that feels most stuck right now?`,
    },
    {
      content: `The honest answer is: it depends on your constraints, and the most important constraint is usually the one you haven't explicitly stated yet.

Here's a useful framing: most decisions that feel hard are actually a combination of two easier decisions that got tangled together. Try separating them.

For example: "Should we rewrite this in a new language?" looks like one decision but is actually: (1) "Is the current implementation causing problems we can't solve within it?" and (2) "Is the proposed alternative worth the switching cost?" These have different answers and different people who should weigh in on them.

Once you've untangled the component decisions, each one usually becomes more tractable — either obviously yes, obviously no, or "needs more information" with a clear question to answer.

What does the decision look like when you break it apart?`,
    },
  ],

  plan: [
    {
      content: `Here's how I'd structure this.

## Phase 1 — Foundation (Week 1-2)

Before writing a line of application code, get the data model right. The most expensive mistakes are architectural ones that only reveal themselves 6 months later.

Deliverable: A schema/ERD that answers: what are the entities, what are the relationships, what are the invariants that must always hold?

## Phase 2 — Walking Skeleton (Week 3)

Build the thinnest slice that touches every layer:
- One API endpoint (even if it returns hardcoded data)
- One database operation
- One UI component

This proves the pieces connect before you invest heavily in any one layer.

## Phase 3 — Feature Completion (Week 4-8)

Iterate horizontally across features rather than completing one feature fully before starting the next. Keeps the system shippable and surfaces integration issues early.

## Phase 4 — Hardening (Week 9-10)

- Error handling and edge cases
- Performance profiling on realistic data
- Security review
- Documentation

## Key Risks

1. **Scope creep** — the skeleton defines the scope boundary. If a feature isn't needed for the core loop, defer it.
2. **Premature optimization** — measure first. Most performance problems are in unexpected places.

Want me to go deeper on any phase?`,
    },
  ],
}

// ─── Public API ───────────────────────────────────────────────────────────────
const THINKING_DELAY_MS = 1600

export async function generateResponse(userMessage) {
  await new Promise(r => setTimeout(r, THINKING_DELAY_MS))

  const intent = detectIntent(userMessage)
  const thinking = (THINKING[intent] ?? THINKING.general)(userMessage)

  let toolCalls = null

  // Web search conversations
  if (intent === 'web_search') {
    const results = SEARCH_RESULTS_POOL[Math.floor(Math.random() * SEARCH_RESULTS_POOL.length)]
    toolCalls = [{ type: 'web_search', query: userMessage.slice(0, 60), status: 'done', results }]
  }

  // Code execution for fix/benchmark intents (50% of the time)
  if ((intent === 'code_fix') && Math.random() > 0.3) {
    const exec = CODE_EXECUTION_OUTPUTS[Math.floor(Math.random() * CODE_EXECUTION_OUTPUTS.length)]
    toolCalls = [{ type: 'code_execution', language: 'python', ...exec, status: 'done' }]
  }

  const pool = RESPONSES[intent] ?? RESPONSES.general
  const response = pool[Math.floor(Math.random() * pool.length)]

  return { content: response.content, thinking, toolCalls, artifact: response.artifact ?? null }
}
