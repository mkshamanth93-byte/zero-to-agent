export const MODULES = [
  {
    id: 0,
    slug: 'foundations',
    emoji: '🧠',
    title: 'Foundations & Mental Models',
    subtitle: 'Understand the paradigm before you touch the code.',
    days: '1–2',
    xp: 150,
    color: '#6366f1',
    outcomes: [
      'Know exactly what an agent is (and why it\'s different from a script)',
      'Understand tools, memory, and the ReAct reasoning loop',
      'Have your dev environment fully set up and verified',
      'Be able to explain agentic AI to anyone in 30 seconds',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'You already have the hard part.',
        text: 'You know Python. You know how ML systems are built. You know how to think analytically and ship code. This course gives you the agentic layer on top of that — the architecture, the frameworks, the infrastructure, and the working systems. 30 days from now you\'ll have five real projects, a personal AI agent on your phone, and a job application engine. In Cursor. Let\'s build.',
      },
      {
        type: 'text',
        markdown: `## What Is an Agent? (The Real Answer)

In your master's, you built **models**: input → output, done. A script ran top to bottom. A pipeline had a fixed sequence you designed in advance.

An **agent** is fundamentally different. You give it a **goal**, not a procedure. It figures out the steps itself.

Here's what happens under the hood every time an agent runs:`,
      },
      { type: 'diagram', id: 'react-loop' },
      {
        type: 'callout',
        variant: 'aha',
        title: '⚡ Aha Moment',
        text: 'The LLM isn\'t just producing text anymore — it\'s the control flow. The brain AND the decision-maker. When you really understand this, you\'ll see potential agents everywhere.',
      },
      {
        type: 'text',
        markdown: `## The Three Building Blocks

Every agent you will ever build has exactly three parts:

| Block | What It Is | Example |
|-------|-----------|---------|
| **Brain** | The LLM that reasons and decides | GPT-4o, Claude Sonnet |
| **Tools** | Functions the LLM can choose to call | web_search, read_file, call_api |
| **Memory** | Context it carries across turns | Conversation history, vector DB |

That's it. Every agent in this course — no matter how complex — is those three things combined.`,
      },
      {
        type: 'text',
        markdown: `## Traditional Code vs Agent Code

\`\`\`python
# Traditional: YOU define every path
if user_asks_about_weather:
    call_weather_api()
elif user_asks_about_news:
    call_news_api()
else:
    return "I don't know"

# Agentic: LLM decides the path
agent.run("What's the weather and top news in London today?")
# Agent decides: use weather tool, then news tool, combine results
\`\`\`

The second approach handles questions you never anticipated. It adapts.`,
      },
      {
        type: 'callout',
        variant: 'tip',
        title: '💡 Power Tip',
        text: 'Both approaches have their place. Use traditional code for known, fixed workflows (payment processing, database writes). Use agents for open-ended, multi-step reasoning. Knowing which to use is senior-engineer judgment.',
      },
      { type: 'diagram', id: 'agent-anatomy' },
      {
        type: 'callout',
        variant: 'welcome',
        title: 'Before we write code — let\'s understand the infrastructure.',
        text: 'You\'re about to see OpenClaw when you install it. It has 50+ skills listed. It\'ll look like a lot. Before you touch any of it, you need the mental model. Read the next section carefully — everything in this course sits on top of it.',
      },
      {
        type: 'text',
        markdown: `## OpenClaw — The Full Mental Model

### The Problem Without OpenClaw

When you build an agent in Python (Module 1), it lives in a terminal window. To use it, you:
1. Open your laptop → navigate to the folder → run \`python agent.py\` → type your question → wait → close terminal.

That's not a personal AI assistant. That's a script with extra steps.

For an agent to be useful in daily life, it needs to be **always on**, **accessible from anywhere**, and **aware of who it's working for**.

That's exactly what OpenClaw solves.`,
      },
      {
        type: 'callout',
        variant: 'aha',
        title: '⚡ Mental Model: The Smart Home Hub',
        text: 'Think of Philips Hue. The hub doesn\'t produce light — it orchestrates all your smart bulbs. It knows what\'s connected, routes commands to the right device, and remembers your scenes. OpenClaw is that hub, but for AI agents. The LLMs and skills are the bulbs. You are the designer of the scenes.',
      },
      { type: 'diagram', id: 'openclaw-hub' },
      {
        type: 'text',
        markdown: `## What OpenClaw Actually Is

\`\`\`
                    ┌──────────────────────────────────────┐
                    │         OPENCLAW PROCESS             │
                    │  (running on your Mac, always on)    │
                    │                                      │
  Your Phone ──────►│  GATEWAY                             │
  (Telegram)        │  Routes messages, manages sessions   │
                    │           │                          │
                    │           ▼                          │
                    │  AGENT RUNTIME                       │
                    │  Loads MEMORY.md → calls LLM →       │
                    │  executes skills → returns response  │
                    │           │                          │
                    │           ▼                          │
                    │  YOUR AGENTSKILLS (your code)        │
                    │  [github-profile.ts]                 │
                    │  [job-scorer.ts]                     │
                    │  [linkedin-apply.ts]                 │
                    └──────────────────────────────────────┘
                               │
                               ▼
                    OpenAI API (only your API key sent)
                    GitHub API, LinkedIn, etc.
\`\`\`

**Your Mac becomes a server.** When you send "Find me jobs" from Telegram in a coffee shop, your message goes to Telegram's servers → forwarded to OpenClaw running on your Mac → agent reasons and calls skills → answer goes back to your phone. No cloud subscription. No monthly fee. No data going to a third party.`,
      },
      {
        type: 'text',
        markdown: `## Three Things You Control (Most AI Products Lock Two Away)

| What | ChatGPT | OpenAI API | OpenClaw |
|------|---------|-----------|----------|
| Which LLM | ✗ OpenAI only | ✗ | ✓ GPT, Claude, Llama, Gemini |
| What agent knows about you | ✗ cleared on logout | Partial | ✓ MEMORY.md — you own it |
| What tools it can use | ✗ predefined | Partial | ✓ build any AgentSkill |

OpenClaw gives you full control of all three. **You are the architect.**`,
      },
      {
        type: 'callout',
        variant: 'tip',
        title: '💡 The Most Important File: MEMORY.md',
        text: 'One file makes your OpenClaw agent smart about you: ~/.openclaw/workspaces/default/MEMORY.md — a plain markdown file you write. Every request, the agent reads it first. Career goals, job preferences, skills, deal-breakers, communication style. A good MEMORY.md turns a generic AI assistant into one that knows you\'re a Data Scientist who won\'t relocate and only wants agentic AI roles. You\'ll write yours in Module 2.',
      },
      {
        type: 'text',
        markdown: `## AgentSkills — Apps for Your Agent

When you install OpenClaw, you'll see 50+ built-in skills. Don't be overwhelmed. Here's how to think about them:

\`\`\`
┌─────────────────────────────────────────────────────────┐
│         BUILT-IN AGENTSKILLS (already there)            │
│                                                         │
│  PRODUCTIVITY         DATA & RESEARCH                   │
│  • Google Calendar    • Web search (DuckDuckGo)         │
│  • Gmail read/send    • URL reader / scraper            │
│  • Notion pages       • Wikipedia lookup                │
│  • Todoist tasks      • GitHub repos                    │
│                       • Weather                         │
│  FILES & SYSTEM                                         │
│  • Read/write files   MEMORY                            │
│  • Run shell cmds     • Save notes to MEMORY.md         │
│  • List directories   • Daily memory log                │
│  • Screenshots        • Search past memories            │
└─────────────────────────────────────────────────────────┘
\`\`\`

**You install them like apps.** Enable in config.json. Done — your agent can now do that thing.

**Custom AgentSkills are what you BUILD.** TypeScript files you write. Job scorer. LinkedIn scraper. Cover letter writer. Portfolio reader. That's what this course teaches.

The four types of extensions you can build:

| Type | What It Does | When You'd Build One |
|------|-------------|---------------------|
| **AgentSkill (Tool)** | Adds a new capability the LLM can call | LinkedIn scraper, job scorer |
| **Memory** | Swaps out how the agent stores things | Replace SQLite with Postgres |
| **Provider** | Adds a new LLM | Self-hosted Ollama, company LLM |
| **Channel** | Adds a new messaging platform | Custom internal chat tool |

For this course, you'll build **AgentSkills (Tools)**. Everything else is covered by what OpenClaw ships with.`,
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Why This Matters For Your Career',
        text: 'The companies hiring for agentic AI roles are building exactly this kind of infrastructure — LLMs with tools, connected to real systems, aware of business context. You\'re not just learning to use OpenClaw. You\'re learning the pattern: agent + memory + skills + orchestration. Every serious agentic AI stack is a variation of this.',
      },
      {
        type: 'text',
        markdown: `## What You'll Have Built by Day 30

\`\`\`
Your Phone
    │ "Find me senior DS jobs, prep me for Stripe"
    ▼
OpenClaw (your Mac)
    │
    ├── MEMORY.md — knows your profile, preferences, deal-breakers
    ├── Skill: job-finder      → scrapes LinkedIn for matching roles
    ├── Skill: job-scorer      → evaluates fit 1-10 against your profile
    ├── Skill: cover-letter    → writes tailored application
    ├── Skill: company-research → researches the company
    ├── Skill: interview-prep  → STAR answers from your portfolio
    └── Skill: tracker         → logs everything to Google Sheets
    │
    │ "Found 3 matches. Stripe: 9/10.
    │  Cover letter ready. Apply? YES / SKIP"
    ▼
You approve from your phone → Application submitted.
\`\`\`

**This is where you're going. Every module builds one more piece of this system.**`,
      },
      {
        type: 'text',
        markdown: `## Environment Setup

Before you write any agent code, your environment needs to be ready. Do this once — you'll use it for all 8 modules.`,
      },
      {
        type: 'step',
        number: 1,
        title: 'Create your workspace',
        code: { language: 'bash', content: `mkdir ~/agent-course\ncd ~/agent-course\nmkdir module-1 module-2 module-3 module-4 module-5 module-6 module-7 module-8\npython3 -m venv venv\nsource venv/bin/activate` },
      },
      {
        type: 'step',
        number: 2,
        title: 'Install all dependencies at once',
        code: { language: 'bash', content: `pip install langchain langchain-openai langchain-anthropic langchain-community langgraph openai anthropic python-dotenv duckduckgo-search requests beautifulsoup4 pandas playwright chromadb\nplaywright install chromium` },
      },
      {
        type: 'step',
        number: 3,
        title: 'Create your .env file',
        code: { language: 'bash', content: `# Create ~/agent-course/.env\nOPENAI_API_KEY=sk-...your-key-here...\nANTHROPIC_API_KEY=sk-ant-...optional...\nGITHUB_USERNAME=dsridhar2110` },
      },
      {
        type: 'cursor-prompt',
        label: 'Verify Your Setup',
        description: 'In Cursor, open the agent-course workspace root. Open Agent (Cmd+I), make sure "Agent" is selected in the dropdown, then paste:',
        prompt: 'Create a file called `verify_setup.py`. It should: (1) Load environment variables from .env using python-dotenv. (2) Check that OPENAI_API_KEY is set and print "OpenAI key: ✓". (3) Make a simple OpenAI API call asking "Say hello in one sentence" and print the response. (4) Print "🚀 Setup complete! You\'re ready to build agents." Handle errors with clear messages.',
      },
      {
        type: 'step',
        number: 4,
        title: 'Verify everything works',
        code: { language: 'bash', content: `python verify_setup.py\n# You should see:\n# OpenAI key: ✓\n# Hello! I'm GPT-4o and I'm happy to help.\n# 🚀 Setup complete! You're ready to build agents.` },
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Words of Wisdom',
        text: 'The setup phase is where most people lose momentum. You\'ve done it. That\'s the hardest invisible step. Everything from here is visible progress.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm0-c1', text: 'Python 3.11+ confirmed (`python3 --version`)' },
          { id: 'm0-c2', text: 'Virtual environment created and activated — you see `(venv)` in your terminal' },
          { id: 'm0-c3', text: 'All packages installed without errors' },
          { id: 'm0-c4', text: '`verify_setup.py` runs and prints "Setup complete!"' },
          { id: 'm0-c5', text: 'You can explain what a "tool" is in agent context (one sentence)' },
          { id: 'm0-c6', text: 'You understand why OpenClaw is "self-hosted" and why that matters' },
          { id: 'm0-c7', text: 'You can explain what MEMORY.md is and why it makes an agent smart' },
          { id: 'm0-c8', text: 'You can draw (roughly) the OpenClaw hub-and-spoke architecture' },
        ],
      },
    ],
  },

  {
    id: 1,
    slug: 'first-agent',
    emoji: '⚡',
    title: 'Your First Python Agent',
    subtitle: 'Build, run, and watch it think. The moment everything clicks.',
    days: '3–5',
    xp: 250,
    color: '#8b5cf6',
    outcomes: [
      'Build a working ReAct agent from scratch with LangChain',
      'Create custom tools using the @tool decorator',
      'Add conversation memory and a persona via system prompt',
      'Watch the ReAct loop in action and understand every step',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'This is where it gets real.',
        text: 'You\'re going to write a working AI agent today. Not a chatbot. Not a prompt wrapper. An agent that decides what to do, uses tools, reads results, and reasons to an answer. When you run it for the first time, you\'ll feel something shift.',
      },
      {
        type: 'text',
        markdown: `## Day 3: Building the Tools

Tools are just Python functions with a special decorator. The docstring is what the LLM reads to understand what the tool does — **it's part of the prompt**. Write docstrings like you're explaining to a smart colleague who can't see your code.`,
      },
      {
        type: 'cursor-prompt',
        label: 'Build Your Tools',
        description: 'In Cursor, navigate to the module-1 folder in the Explorer (left panel). Open Agent (Cmd+I), select "Agent" mode, then paste:',
        prompt: 'Create a file called `tools.py`. Define three LangChain tools using the @tool decorator:\n\n1. `web_search(query: str)` — uses DuckDuckGo to search and returns the top 3 results as formatted text with title, URL, and snippet.\n\n2. `calculate(expression: str)` — safely evaluates a math expression using Python eval with restricted namespace. Returns the result as a string.\n\n3. `get_today_date()` — returns today\'s date as a formatted string with day name.\n\nAdd descriptive docstrings to each — the LLM reads these to decide when to use the tool.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: '💡 Why Docstrings Matter',
        text: 'Test this: change a docstring to be vague ("does something useful") and watch your agent stop using that tool correctly. The docstring IS the interface between your code and the LLM\'s decision-making. Treat them like documentation for a genius who can\'t run your code.',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Agent',
        description: 'Still in module-1 in Cursor Agent (Cmd+I). Cursor already has context from tools.py — paste this next:',
        prompt: 'Create `agent.py`. Using LangChain, build a ReAct agent:\n\n1. Use ChatOpenAI with model "gpt-4o-mini" (cheaper for learning)\n2. Load OPENAI_API_KEY from .env with python-dotenv\n3. System prompt: "You are DS — a sharp research assistant built for Deekshita Sridhar, a Data Scientist and Agentic AI Engineer. You are direct, precise, and always cite sources. You flag when you\'re uncertain. You have a slight dry sense of humour."\n4. Include all three tools from tools.py\n5. Add ConversationBufferWindowMemory (last 5 exchanges)\n6. Set verbose=True so reasoning steps are visible\n7. main() loop: user types → agent responds → repeat until "quit"',
      },
      {
        type: 'step',
        number: 1,
        title: 'Run your agent for the first time',
        code: { language: 'bash', content: `cd ~/agent-course/module-1\nsource ../venv/bin/activate\npython agent.py` },
      },
      {
        type: 'callout',
        variant: 'aha',
        title: '⚡ Watch This Carefully',
        text: 'When you ask "What\'s the unemployment rate in the UK?", don\'t look at the answer yet. Look at the output ABOVE the answer:\n\n`Thought: I should search for UK unemployment rate...\nAction: web_search\nAction Input: "UK unemployment rate 2026"\nObservation: [results]\nThought: I now have enough to answer...`\n\nThat\'s the ReAct loop. That\'s the AI deciding what to do. You built the infrastructure that makes this possible.',
      },
      { type: 'diagram', id: 'react-verbose' },
      {
        type: 'text',
        markdown: `## Day 4: Break It On Purpose

The best way to understand a system is to break it. Try these inputs and observe:

1. Ask about something very recent: *"What happened in the news 2 hours ago?"*
2. Ask something ambiguous: *"Who won?"*
3. Ask it to do something it can't: *"Book me a flight to London"*`,
      },
      {
        type: 'cursor-prompt',
        label: 'Add Error Handling & Webpage Reading',
        description: 'Open tools.py and agent.py in Cursor, then open Agent (Cmd+I). Cursor will see both files and apply changes to both:',
        prompt: 'In tools.py, add a fourth tool: `read_webpage(url: str)`. It should use `requests` to fetch the URL, `BeautifulSoup` to extract text (strip scripts, styles, nav, footer), truncate to 2500 characters, and return clean text. Docstring: "Fetches and reads the full text content of a webpage URL. Use after web_search when you need more detail than the snippet provides."\n\nAlso update the system prompt in agent.py to handle these edge cases: (1) For recent events, note search results may be a few days old. (2) For ambiguous queries, ask one clarifying question. (3) For impossible tasks, clearly explain what it can and cannot do.',
      },
      {
        type: 'text',
        markdown: `## Day 5: Memory and Persistence

Your agent currently forgets everything when you restart it. Let's fix that.`,
      },
      {
        type: 'cursor-prompt',
        label: 'Add Persistent Memory',
        description: 'Open agent.py in Cursor. Use Cursor Agent (Cmd+I) — it will edit agent.py directly and create the new file:',
        prompt: 'Update agent.py to add conversation persistence:\n\n1. At startup, load conversation history from `conversation_history.json` if it exists\n2. After each exchange, append the user/agent pair to this file\n3. Print at startup: "Loaded X previous conversations"\n4. Command `/clear` wipes the history file\n5. Command `/history` prints the last 5 exchanges\n6. Command `/help` lists all commands\n\nBonus: add a `/save [label]` command that saves the current conversation with a label for future reference.',
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Words of Wisdom',
        text: 'You just ran your first agent. You watched it reason, use tools, and answer from real current information. Most people who use AI daily have never seen this layer. You built the layer. That\'s the difference between a user and an engineer.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm1-c1', text: 'tools.py created with 3+ tools, each with descriptive docstrings' },
          { id: 'm1-c2', text: 'agent.py runs and responds to questions about current events' },
          { id: 'm1-c3', text: 'You\'ve watched the verbose ReAct output and understand Thought/Action/Observation' },
          { id: 'm1-c4', text: 'read_webpage tool added and tested on a real URL' },
          { id: 'm1-c5', text: 'Conversation history persists between restarts' },
          { id: 'm1-c6', text: 'Push module-1/ to a new GitHub repo called `agent-projects`' },
        ],
      },
    ],
  },

  {
    id: 2,
    slug: 'openclaw',
    emoji: '🔗',
    title: 'OpenClaw: Install, Orient & Build',
    subtitle: 'From terminal script to 24/7 phone assistant in 4 days.',
    days: '6–9',
    xp: 350,
    color: '#06b6d4',
    outcomes: [
      'OpenClaw running on your Mac, connected to Telegram',
      'Built-in skills activated — web search, memory, file access',
      'MEMORY.md filled in with your real career context',
      'Three custom AgentSkills built and deployed',
      'Can build new skills in under 20 minutes going forward',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'This module changes what "assistant" means.',
        text: 'Right now your agent lives in a terminal. After this module, it lives on your phone. You\'ll message it from anywhere — and it\'ll respond with real information about your own life. You\'ll also see ~50 built-in skills when you open OpenClaw. Don\'t be overwhelmed. This module is your full orientation.',
      },
      { type: 'diagram', id: 'openclaw-arch' },
      {
        type: 'text',
        markdown: `## Day 6: Install & Connect

OpenClaw is a **self-hosted** AI agent platform. It runs on your Mac, not in the cloud. Your data never leaves your machine unless you explicitly call an external API.`,
      },
      {
        type: 'step',
        number: 1,
        title: 'Clone and install OpenClaw',
        code: { language: 'bash', content: `git clone https://github.com/openclaw/openclaw.git ~/openclaw\ncd ~/openclaw\nnpm install -g pnpm\npnpm install\npnpm start setup` },
      },
      {
        type: 'text',
        markdown: `The setup wizard asks 4 things:

| Question | What to Enter |
|----------|--------------|
| Which messaging platform? | **Telegram** (easiest, free) |
| Which LLM provider? | **OpenAI** → paste your API key |
| Where to store workspace? | Press Enter (accept \`~/.openclaw/\`) |
| Create default workspace? | **Yes** |`,
      },
      {
        type: 'step',
        number: 2,
        title: 'Create your Telegram bot (60 seconds)',
        code: { language: 'bash', content: `# On your phone:\n# 1. Open Telegram → search @BotFather → open it\n# 2. Send: /newbot\n# 3. Name: DeekshitaAgent\n# 4. Username: deekshita_agent_bot (add numbers if taken)\n# 5. BotFather sends a token: 7234567890:AAFxxxxxx...\n# 6. Copy it — you'll need it in the next step` },
      },
      {
        type: 'cursor-prompt',
        label: 'Configure OpenClaw',
        description: 'In Cursor, open ~/.openclaw/config.json (File → Open File). Use Cursor Chat (Cmd+L) to generate the config, then paste it into the file:',
        mode: 'chat',
        prompt: 'Show me how to configure ~/.openclaw/config.json with: (1) Telegram channel enabled with my bot token [PASTE TOKEN HERE], (2) OpenAI provider with gpt-4o model, (3) these built-in skills enabled: web-search, url-reader, memory-write, memory-read, read-file, run-python. Show me the complete config.json structure.',
      },
      {
        type: 'step',
        number: 3,
        title: 'Start OpenClaw and test it',
        code: { language: 'bash', content: `cd ~/openclaw\npnpm dev\n\n# You should see:\n# ✓ Gateway running on ws://127.0.0.1:18789\n# ✓ Telegram channel connected\n# ✓ Agent Runtime ready\n# ✓ Loaded 6 skills\n\n# Open Telegram → find your bot → send: Hello` },
      },
      {
        type: 'callout',
        variant: 'aha',
        title: '⚡ You Just Did Something Real',
        text: 'You are now talking to an AI running on your own Mac from your phone. No cloud subscription. No data going to a third-party service. This is self-hosted AI. This is what the agentic AI industry actually runs on.',
      },
      {
        type: 'text',
        markdown: `## Orienting Yourself: The 50+ Built-In Skills

When you first look at OpenClaw, you'll see many skills listed. Here's how to think about them:

- **Most are disabled by default** — you turn them on in config.json
- **You don't need all of them** — activate only what you'll use
- **They're like apps** — install when needed, ignore the rest

**Skills worth activating RIGHT NOW:**

| Skill | Why |
|-------|-----|
| \`web-search\` | Every agent you build will search the web |
| \`url-reader\` | Reading job postings, company pages |
| \`memory-write\` | Agent can save notes between conversations |
| \`memory-read\` | Agent can recall what it saved |
| \`read-file\` | Reading your MEMORY.md, local documents |
| \`run-python\` | Executing data processing on demand |

**Save these for when you need them:**
- Google Calendar — set up in Module 7 (needs OAuth)
- Slack, Email — set up with the job application workflow
- Code execution shells — set up in Module 5

> 💡 **The key insight:** You didn't write a single line of code to get web search. You edited a config. That's the power of the skill system — common capabilities are pre-built. You only write custom skills for things specific to you.`,
      },
      {
        type: 'step',
        number: 4,
        title: 'Test the built-in skills in Telegram',
        code: { language: 'bash', content: `# Send these to your bot in Telegram:\n\n"Search the web for: agentic AI engineer jobs in London 2026"\n# → Should perform a real DuckDuckGo search\n\n"What is LangGraph? Give me a 3-sentence summary"\n# → Should search and summarise\n\n"Remember: Today I started the zero-to-agent course"\n# → Should save to memory\n\n"What did I note recently?"\n# → Should recall what it just saved` },
      },
      {
        type: 'text',
        markdown: `## Day 7: Writing Your MEMORY.md

This is the most important thing you'll do this module. **Everything your agent does draws from this file.** The more specific you are, the smarter every interaction becomes.`,
      },
      {
        type: 'cursor-prompt',
        label: 'Write Your MEMORY.md',
        description: 'In Cursor, open ~/.openclaw/workspaces/default/MEMORY.md (File → Open File, or Cmd+P and type MEMORY). Open Cursor Agent (Cmd+I) and let it write the whole file:',
        prompt: 'Write a comprehensive MEMORY.md for my OpenClaw personal AI agent. This file is read before every conversation — it must contain everything the agent needs to help me effectively.\n\nSections to include:\n\n**1. Identity** — Name: Deekshita Sridhar, Data Scientist & Agentic AI Engineer, GitHub: dsridhar2110\n\n**2. Career Status** — Currently job hunting. Target: Senior DS or ML Engineer with agentic AI components. Remote-first or hybrid. Open to contract or permanent.\n\n**3. Job Preferences (be very specific):**\n- Must-haves (e.g. agentic AI in tech stack, Python-first, remote-first culture)\n- Deal-breakers (no pure banking/insurance, no BI-only roles, no relocation)\n- Salary: [my minimum — non-negotiable]\n- Target industries: tech, fintech, healthtech, AI-native startups\n\n**4. Technical Skills** — Group by: core strengths, growing skills, tools/platforms\n\n**5. Communication Style** — How the agent should talk to me: direct, concise, bullet points for lists, ask clarifying questions before big tasks\n\n**6. My Projects** — Brief description of each GitHub project\n\nAdd [FILL IN] placeholders where I need to add real values. Format as clean markdown with clear headings.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: '💡 The MEMORY.md Compound Effect',
        text: 'Here\'s the difference between good and great:\n\nBad: "I\'m looking for data science roles."\nGood: "Must-haves: agentic AI in tech stack, Python-first, remote-first (not remote-optional). Immediately disqualify: pure BI/dashboard roles, banking/insurance sector, roles requiring relocation, roles where Excel is a key skill."\n\nThe second version makes every agent interaction 10x more useful. Be specific. Be opinionated. Update it whenever your preferences evolve.',
      },
      {
        type: 'step',
        number: 5,
        title: 'Test that MEMORY.md is working',
        code: { language: 'bash', content: `# Send these to your Telegram bot:\n\n"What are my job deal-breakers?"\n# → Should list your actual deal-breakers from MEMORY.md\n\n"If someone offered me a BI Analyst role at a bank, should I apply?"\n# → Should reason from your preferences and say no with explanation\n\n"What are my core technical strengths?"\n# → Should list your real skills` },
      },
      {
        type: 'text',
        markdown: `## Day 8: Build Your First Custom AgentSkill

You've activated built-in skills and written your MEMORY.md. Now you go beyond what OpenClaw ships with. Every custom skill follows this pattern:`,
      },
      { type: 'diagram', id: 'agentskill-anatomy' },
      {
        type: 'text',
        markdown: `## The AgentSkill Interface (Memorise This)

\`\`\`typescript
// Export 1: DEFINITION — the LLM reads this to decide WHEN to call your skill
export const skill = {
  name: 'tool_name',
  description: 'Use this when the user asks about X or wants to do Y. ' +
               'Returns Z formatted as markdown. Do NOT use for...',
  parameters: {
    type: 'object',
    properties: {
      username: { type: 'string', description: 'The GitHub username' }
    },
    required: ['username']
  }
}

// Export 2: HANDLER — the function that runs when the LLM calls your skill
export async function handler(params: Record<string, unknown>): Promise<string> {
  const { username } = params as { username: string }
  // Do the work, return a string
  // The LLM reads this string as the tool result
  return \`Result: ...\`
}
\`\`\`

**The single most important thing:** The \`description\` field is a prompt to the LLM. It decides whether the agent uses your skill or ignores it. Vague description = agent won't know when to call it.`,
      },
      {
        type: 'cursor-prompt',
        label: 'Skill 1: GitHub Profile Reader',
        description: 'In Cursor, navigate to ~/openclaw/extensions/tools/ in the Explorer. Open Cursor Agent (Cmd+I) — it will create the file directly in that folder:',
        prompt: 'Create a TypeScript OpenClaw AgentSkill at ~/openclaw/extensions/tools/github-profile.ts\n\nexport const skill:\n- name: "get_github_profile"\n- description: "Use this when the user asks about their GitHub projects, repositories, code portfolio, or technical work. Fetches real profile data and repos. Returns formatted markdown with profile summary and top 10 non-forked repos including name, description, language, and star count."\n- parameters: { username: { type: "string", required: true, description: "GitHub username" } }\n\nexport async function handler:\n1. Fetch https://api.github.com/users/{username}\n2. Fetch https://api.github.com/users/{username}/repos?sort=pushed&per_page=15\n3. Filter out forks\n4. Return formatted markdown: profile summary (name, bio, location, followers, repo count) + numbered list of top 10 repos\n5. Handle 404 (user not found), rate limit, network errors\n6. Use Node.js native fetch (v22+)\n\nComment at top: // OpenClaw AgentSkill — GitHub Profile Reader',
      },
      {
        type: 'cursor-prompt',
        label: 'Skill 2: Profile Context Loader',
        description: 'Still in the openclaw/extensions/tools/ folder in Cursor. Open Agent (Cmd+I) and create the next skill:',
        prompt: 'Create a TypeScript OpenClaw AgentSkill at ~/openclaw/extensions/tools/profile-context.ts\n\nexport const skill:\n- name: "get_my_profile"\n- description: "Use this when you need detailed information about the user — their career goals, job preferences, skills, deal-breakers, or background. Reads their personal profile document. Use proactively when making recommendations about jobs or career decisions."\n- parameters: empty object (no inputs needed)\n\nexport async function handler:\n- Use Node.js fs/promises to read ~/.openclaw/workspaces/default/MEMORY.md (use os.homedir() + path.join)\n- Return the full file content\n- If file missing: return helpful error message explaining how to create it\n\nComment at top: // OpenClaw AgentSkill — Profile Context Loader',
      },
      {
        type: 'cursor-prompt',
        label: 'Skill 3: Memory Journal (Save + Recall)',
        description: 'Same folder in Cursor. Open Agent (Cmd+I). This creates a file with two exported skills — Cursor Agent handles multi-export files cleanly:',
        prompt: 'Create ~/openclaw/extensions/tools/memory-journal.ts with TWO AgentSkills.\n\nSkill 1 — add_memory:\n- name: "add_memory"\n- description: "Use when the user says \'remember\', \'note this\', \'save this\', or after any important interaction worth recording (interview, job application, insight, decision). Saves timestamped note to daily log."\n- parameters: { note: { type: "string", required: true } }\n- handler: Append "[HH:MM] {note}" to ~/.openclaw/workspaces/default/memory/YYYY-MM-DD.md (today\'s date). Create file/dirs if needed. Return "Memory saved."\n\nSkill 2 — recall_memory:\n- name: "recall_memory"\n- description: "Use when user asks what was noted recently, what happened today/yesterday, or to recall something specific. Returns notes from a given date."\n- parameters: { date: { type: "string", description: "Date in YYYY-MM-DD format, defaults to today" } }\n- handler: Read ~/.openclaw/workspaces/default/memory/{date}.md. Return content or "No notes for {date}."\n\nExport all four: skill1, handler1, skill2, handler2 (adjust to OpenClaw\'s multi-skill file format if needed).',
      },
      {
        type: 'step',
        number: 6,
        title: 'Register all skills and run the full test suite',
        code: { language: 'bash', content: `# Add to ~/.openclaw/config.json skills section:\n# get_github_profile, get_my_profile, add_memory, recall_memory\n# Then restart:\ncd ~/openclaw && pnpm dev\n\n# Full test suite in Telegram:\n# "Tell me about my GitHub projects"\n# "What are my job deal-breakers?"\n# "Remember: I started building my first AgentSkill today"\n# "What did I note today?"\n# "I'm looking at a Google DeepMind ML role — should I apply?"` },
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 The Skill-Building Pattern',
        text: 'Memorise this loop — you\'ll repeat it for every skill you build:\n\n1. Define the goal: "I want my agent to be able to [X]"\n2. Write the skill file: description + handler\n3. Register in config.json\n4. Restart: pnpm dev\n5. Test with a natural language message in Telegram\n6. Iterate: if agent doesn\'t call it → improve description. If output isn\'t useful → improve handler.\n\nBy Module 7, you\'ll do this in 15 minutes per skill. Right now it takes an hour. That\'s fine.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm2-c1', text: 'OpenClaw starts with `pnpm dev` and shows "Agent ready"' },
          { id: 'm2-c2', text: 'Telegram bot responds — you\'ve had a real conversation with it' },
          { id: 'm2-c3', text: 'At least 5 built-in skills activated (web-search, url-reader, memory-write, memory-read, read-file)' },
          { id: 'm2-c4', text: 'Web search works — asked "what agentic AI companies are hiring?" and got real results' },
          { id: 'm2-c5', text: 'MEMORY.md is filled in with your real details (no [FILL IN] placeholders remaining)' },
          { id: 'm2-c6', text: 'get_github_profile works — "tell me about my projects" returns your actual repos' },
          { id: 'm2-c7', text: 'add_memory works — saved a note, then recall_memory returned it' },
          { id: 'm2-c8', text: 'You can write a new AgentSkill from scratch without looking at a reference' },
        ],
      },
    ],
  },

  {
    id: 3,
    slug: 'research-agent',
    emoji: '🔍',
    title: 'Research Agent',
    subtitle: 'Build an agent that searches deeper than any human would.',
    days: '9–11',
    xp: 350,
    color: '#10b981',
    outcomes: [
      'A LangGraph state machine with conditional loops',
      'Iterative deepening search (searches until it has enough)',
      'Structured research briefs with citations',
      'Deployed as an OpenClaw skill',
      'First portfolio case study ready to add to your website',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'Portfolio Case Study #1 starts here.',
        text: 'Everything you build from Module 3 onward goes on your portfolio. This isn\'t a tutorial anymore — it\'s your professional work. The Research Agent is used in almost every other agent you\'ll build. Get it right.',
      },
      {
        type: 'text',
        markdown: `## New Concept: LangGraph

LangGraph is to agents what a state machine is to business logic. Instead of a fixed chain (A→B→C), you get **nodes** connected by **edges** — including conditional edges that decide at runtime which node to go to next.`,
      },
      { type: 'diagram', id: 'langgraph-flow' },
      {
        type: 'text',
        markdown: `## The Iterative Deepening Pattern

A naive research agent searches once and answers. A **good** research agent:

1. Breaks the question into sub-questions
2. Searches each sub-question  
3. Evaluates: "Do I have enough?" 
4. If not — searches the gaps
5. Synthesises everything into a structured brief

This is called **iterative deepening**. It's how a good analyst actually researches.`,
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Research Agent',
        description: 'In Cursor, navigate to module-3 in the Explorer. Open Agent (Cmd+I). This is a multi-file build — Agent mode handles the LangGraph state machine and all imports:',
        prompt: 'Create `research_agent.py` using LangGraph StateGraph. Build these nodes:\n\n1. `decompose` — LLM breaks the question into 3-4 specific sub-questions\n2. `search` — DuckDuckGo searches each sub-question, stores results in state\n3. `read_top_result` — Fetches and extracts text from the top URL for each sub-question\n4. `evaluate` — LLM decides: "sufficient" or returns list of gap queries\n5. `synthesise` — Produces structured markdown: Summary, Key Findings (with source URLs), Limitations, Further Reading\n\nStateGraph edges: decompose→search→read→evaluate→(synthesise if sufficient, else search with gap queries). Add MAX_LOOPS=2 to prevent infinite loops.\n\nAccepts topic as sys.argv[1]. Saves output to research_outputs/{slugified-topic}-{date}.md. Prints to stdout.',
      },
      {
        type: 'cursor-prompt',
        label: 'Add the \'What This Means For You\' Section',
        description: 'Open research_agent.py in Cursor. Use Cursor Agent (Cmd+I) — it will edit the synthesise node in place:',
        prompt: 'Update the `synthesise` node in research_agent.py. After Key Findings, add a section "What This Means For You" — using the context that this is for Deekshita Sridhar, a Data Scientist actively seeking agentic AI roles, make the findings personally relevant. Also add: a Confidence Score (Low/Medium/High) with one sentence explaining why, and three "Suggested Follow-up Questions" to go deeper.',
      },
      {
        type: 'cursor-prompt',
        label: 'Deploy as OpenClaw Skill',
        description: 'In Cursor, switch to the openclaw/extensions/tools/ folder. Open Agent (Cmd+I) — it creates the TypeScript wrapper that calls your Python agent as a subprocess:',
        prompt: 'Create an OpenClaw AgentSkill TypeScript file `research-agent.ts`.\n- name: "research_topic"\n- description: "Performs deep autonomous web research on any topic using iterative search. Returns a structured brief with key findings, citations, and personal relevance. Use for any research request, market analysis, technical learning, or company investigation."\n- parameters: { topic: { type: "string", required: true } }\n\nHandler: spawn Python subprocess running research_agent.py with topic as argument. Wait up to 120s. Return stdout output.',
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Words of Wisdom',
        text: 'Test your research agent on: "What agentic AI companies are hiring right now?" You\'ll get a briefing that would take a junior analyst 2 hours to compile. In 3 minutes. This is your first portfolio piece. Add it to projectCaseStudies.js in your portfolio repo today.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm3-c1', text: 'research_agent.py runs end-to-end on any topic without crashing' },
          { id: 'm3-c2', text: 'LangGraph state machine has at least 4 nodes with correct edges' },
          { id: 'm3-c3', text: 'Iterative deepening works — agent searches twice when first pass isn\'t enough' },
          { id: 'm3-c4', text: 'OpenClaw skill deployed and tested from Telegram' },
          { id: 'm3-c5', text: 'Case study entry written and added to portfolio repo (projectCaseStudies.js)' },
          { id: 'm3-c6', text: 'Committed to agent-projects GitHub repo' },
        ],
      },
    ],
  },

  {
    id: 4,
    slug: 'portfolio-agent',
    emoji: '📚',
    title: 'Portfolio Q&A Agent (RAG)',
    subtitle: 'Build an agent that knows your work better than you do.',
    days: '12–14',
    xp: 400,
    color: '#f59e0b',
    outcomes: [
      'Understand RAG end-to-end — the most important enterprise AI pattern',
      'A vector database indexed with all your GitHub repos',
      'An agent that answers recruiter questions about your work with citations',
      'STAR-format interview answers generated from your real projects',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'This module teaches the pattern behind every enterprise AI product.',
        text: 'RAG — Retrieval-Augmented Generation — is how ChatGPT Enterprise works, how Notion AI works, how every "ask your documents" product works. You\'re going to build it from scratch. Once you understand it, you\'ll see it everywhere.',
      },
      { type: 'diagram', id: 'rag-pipeline' },
      {
        type: 'callout',
        variant: 'aha',
        title: '⚡ Why RAG Exists',
        text: 'An LLM doesn\'t know your projects. You could put everything in the prompt — but that\'s expensive and hits context limits. RAG solves this: index your documents once, retrieve only the relevant chunks at query time, put just those in the prompt. Fast, cheap, accurate.',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Knowledge Base',
        description: 'In Cursor, navigate to module-4 in the Explorer. Open Agent (Cmd+I) — this script fetches from GitHub API and builds a Chroma vector DB:',
        prompt: 'Create `build_knowledge_base.py`:\n\n1. GitHub API: fetch all public repos for GITHUB_USERNAME from .env\n2. For each repo: fetch README.md + list of files + top 3 .py files (max 5000 chars each)\n3. Combine into one document per repo: name + description + README + code\n4. Also load MEMORY.md from path passed as sys.argv[1]\n5. Split all docs: RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)\n6. Embed: OpenAIEmbeddings(model="text-embedding-3-small")\n7. Store: Chroma vector DB persisted to ./portfolio_db\n8. Print progress: "Indexing: [repo-name]"\n9. Final: "Indexed X documents, Y chunks"',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Q&A Agent',
        description: 'Still in module-4 in Cursor. The knowledge base script must run first (Step 1 above). Then open Agent (Cmd+I) — it will see build_knowledge_base.py in context:',
        prompt: 'Create `portfolio_agent.py`:\n\n1. Load Chroma DB from ./portfolio_db\n2. Retriever: top 5 most relevant chunks per query\n3. ConversationalRetrievalChain with:\n   - ChatOpenAI gpt-4o-mini\n   - System prompt: "You are Deekshita\'s portfolio assistant. Answer questions about her projects, skills, and experience using ONLY the provided context. Be specific — name actual projects. If the answer isn\'t in the context, say so clearly."\n   - ConversationBufferMemory\n4. After each answer, print "📎 Sources: [list of source documents used]"\n5. Interactive main() loop',
      },
      {
        type: 'cursor-prompt',
        label: 'Generate STAR Interview Answers',
        description: 'Open portfolio_agent.py in Cursor. Use Agent (Cmd+I) — it edits the existing file and adds the new CLI mode:',
        prompt: 'Add function `generate_star_answers(job_description: str)` to portfolio_agent.py:\n1. Extract 5 key technical requirements from the JD using LLM\n2. For each requirement: retrieve relevant portfolio context from Chroma\n3. Generate STAR-format answer (Situation/Task/Action/Result) grounded in real project details\n4. Keep each answer to ~90-120 seconds of speaking time\n5. After each answer: add "Likely follow-up: [most probable follow-up question]"\n6. Save to interview_preps/{company}-{date}.md\n\nCLI: `python portfolio_agent.py --prep "paste JD here"`',
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Words of Wisdom',
        text: 'Ask it: "What\'s my most technically complex project?" and "Do I have experience with recommender systems?" Compare the answers to what you\'d say off the top of your head. The agent will be more specific, cite exact details, and won\'t undersell you. That\'s not AI replacing you — it\'s AI remembering everything you built.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm4-c1', text: 'build_knowledge_base.py indexes all repos without errors' },
          { id: 'm4-c2', text: 'portfolio_agent.py answers 10+ different project questions accurately' },
          { id: 'm4-c3', text: 'Answers cite specific source documents (not hallucinated)' },
          { id: 'm4-c4', text: 'STAR answers generated for a real job description you want' },
          { id: 'm4-c5', text: 'OpenClaw skill deployed and tested from Telegram' },
          { id: 'm4-c6', text: 'Case study added to portfolio site' },
        ],
      },
    ],
  },

  {
    id: 5,
    slug: 'data-analysis-agent',
    emoji: '📊',
    title: 'Data Analysis Agent',
    subtitle: 'An agent that writes code, runs it, and interprets results.',
    days: '15–18',
    xp: 400,
    color: '#ef4444',
    outcomes: [
      'An agent that autonomously explores any CSV and produces an executive report',
      'LLM-generated pandas code that runs safely in a sandboxed environment',
      'Iterative error recovery — if the code fails, it rewrites and retries',
      'Portfolio case study demonstrating code execution + LLM interpretation',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'This is what Code Interpreter actually does.',
        text: 'You know ChatGPT\'s Code Interpreter? You\'re building your own version. Give it a CSV — any CSV. It explores the data, writes analysis code, runs it, reads the output, interprets the findings, and delivers an executive report. A junior analyst\'s full day of work in 3 minutes.',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Code Executor',
        description: 'In Cursor, navigate to module-5. Open Agent (Cmd+I) — the executor sandbox is the most security-sensitive part of this module, let Cursor handle all the safe-exec boilerplate:',
        prompt: 'Create `code_executor.py`. Build a safe Python code execution environment:\n\n1. Accepts: a string of Python code + a pandas DataFrame as context\n2. Available in the execution environment: pandas as pd, numpy as np, matplotlib.pyplot as plt, scipy.stats, and the variable `df`\n3. Captures stdout output\n4. Saves any matplotlib figures to analysis_outputs/ as PNG files\n5. Returns dict: { output: str, figures: [filename], error: str|None }\n6. Hard 30-second timeout\n7. Blocks network calls and writes outside analysis_outputs/\n\nAdd a function `safe_exec(code, df)` as the main interface.',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Analysis Agent',
        description: 'Still in module-5. Open code_executor.py first so Cursor has it in context, then open Agent (Cmd+I) to build the LangGraph pipeline on top:',
        prompt: 'Create `analysis_agent.py` using LangGraph:\n\nNodes:\n1. `load_data` — pandas read_csv, stores df in state, produces data summary (shape, dtypes, nulls, head(5), describe())\n2. `plan_analysis` — LLM sees the summary, produces 5-7 specific analyses as a numbered list\n3. `execute` — for each planned analysis: LLM writes the pandas/matplotlib code → safe_exec runs it → stores results\n4. `retry_failed` — if code fails: LLM sees the error + original code, rewrites once. If fails again: skip with a note.\n5. `interpret` — LLM reads ALL outputs and writes plain-English interpretations with confidence scores\n6. `report` — assembles markdown executive report: Data Overview, Key Findings (numbered, with confidence), Visualisations list, Recommended Actions, Data Quality Notes\n\nSave report to analysis_outputs/report-{filename}-{date}.md\nAccept CSV path as sys.argv[1]',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: '💡 Test With Messy Data',
        text: 'Generate a test CSV with missing values, mixed types, and outliers. Ask Cursor: "Create a 500-row synthetic sales dataset with realistic messiness: 15% null values, two outlier spikes, one discontinued product, inconsistent date formats." A good data analysis agent handles real-world data, not toy datasets.',
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Words of Wisdom',
        text: 'This module teaches the most transferable skill in enterprise AI: letting the LLM be the analyst, not just the summariser. Once you understand how to safely execute LLM-generated code, you can apply this to SQL generation, R analysis, shell scripts — any language.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm5-c1', text: 'code_executor.py safely runs pandas code with timeout protection' },
          { id: 'm5-c2', text: 'analysis_agent.py runs on 3 different CSV files without crashing' },
          { id: 'm5-c3', text: 'Error recovery works — failed code is rewritten and retried' },
          { id: 'm5-c4', text: 'Reports are saved as readable markdown with confidence scores' },
          { id: 'm5-c5', text: 'OpenClaw skill deployed and tested' },
          { id: 'm5-c6', text: 'Case study added to portfolio site' },
        ],
      },
    ],
  },

  {
    id: 6,
    slug: 'interview-prep-agent',
    emoji: '🎯',
    title: 'Interview Prep Agent',
    subtitle: '60 seconds from job description to full personalised prep sheet.',
    days: '19–21',
    xp: 450,
    color: '#8b5cf6',
    outcomes: [
      'A multi-node pipeline combining three previous agents',
      'Company research + JD analysis + portfolio retrieval in parallel',
      'STAR answers grounded in your real project data',
      'First taste of multi-agent architecture',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'You\'re about to use three agents you built to build a fourth.',
        text: 'The Interview Prep Agent doesn\'t do everything itself. It calls your research agent for company info, your portfolio agent for relevant experience, and its own LLM reasoning for STAR answer writing. This is multi-agent design. You\'re experiencing it before Module 8 formally teaches it.',
      },
      { type: 'diagram', id: 'interview-prep-flow' },
      {
        type: 'cursor-prompt',
        label: 'Build the Full Prep Pipeline',
        description: 'In Cursor, navigate to module-6 in the Explorer. Open Agent (Cmd+I) — this is a multi-node LangGraph build that calls your previous agents as subprocesses. Agent mode handles the multi-file wiring:',
        prompt: 'Create `interview_prep_agent.py` using LangGraph:\n\nNodes (run decompose→research+analyse in parallel→assemble→write):\n1. `parse_input` — extract company name, job title, JD text\n2. `research_company` (parallel) — web search: "[company] tech stack", "[company] engineering culture", "[company] recent news 2026", "[company] glassdoor". Synthesise into 3-bullet company brief.\n3. `analyse_jd` (parallel) — extract: must-have skills, nice-to-have, seniority level, 5 likely interview questions\n4. `retrieve_experience` — query Chroma DB from module-4 for each required skill. Collect top matches.\n5. `write_prep_sheet` — generate markdown:\n   - Company Overview (3 bullets from research)\n   - Role Fit Analysis (skills match % + gaps)\n   - 5 STAR answers (each grounded in a NAMED project from Chroma results)\n   - 5 Questions To Ask Them\n   - Salary Note\n   - Red Flags to probe\n\nSave to prep_sheets/{company}-{date}.md\nCLI: `--company "Name" --jd "paste JD"`',
      },
      {
        type: 'cursor-prompt',
        label: 'Deploy as OpenClaw Skill',
        description: 'In Cursor, switch to ~/openclaw/extensions/tools/. Open Agent (Cmd+I) to create the TypeScript skill wrapper:',
        prompt: 'Create OpenClaw AgentSkill `interview-prep.ts`:\n- name: "prep_for_interview"\n- description: "Prepares a full interview prep sheet for a specific company and role. Researches the company, analyses the JD, and generates STAR answers from real portfolio experience. Use when preparing for any interview or screening call."\n- parameters: { company_name: string (required), job_description: string (required) }\n\nHandler: spawn interview_prep_agent.py subprocess, pass args, return prep sheet content.',
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Words of Wisdom',
        text: 'Run this against three companies you\'re genuinely interested in. Read every STAR answer it generates. You\'ll notice it picks details from your actual projects you\'d forgotten about. It\'s not making things up — it\'s reading your GitHub repos and your MEMORY.md. This is the compound effect of good data about yourself.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm6-c1', text: 'Prep sheet generated for 3 different companies/roles' },
          { id: 'm6-c2', text: 'Every STAR answer names a specific, real project' },
          { id: 'm6-c3', text: 'Company research is accurate and relevant' },
          { id: 'm6-c4', text: 'Parallel nodes run correctly (company research + JD analysis simultaneously)' },
          { id: 'm6-c5', text: 'OpenClaw skill deployed and tested from Telegram' },
          { id: 'm6-c6', text: 'Case study added to portfolio site' },
        ],
      },
    ],
  },

  {
    id: 7,
    slug: 'job-engine',
    emoji: '🚀',
    title: 'LinkedIn Job Application Engine',
    subtitle: 'Semi-automated. Human-in-the-loop. The job search reimagined.',
    days: '22–26',
    xp: 600,
    color: '#f472b6',
    outcomes: [
      'A job finder that searches LinkedIn and extracts JDs with Playwright',
      'A scorer that evaluates each role against your MEMORY.md profile',
      'AI-written tailored cover letters using your real portfolio context',
      'Telegram review flow — you approve before anything is submitted',
      'Google Sheets application tracker',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'This is the module you\'ll use every day.',
        text: 'You\'ve built the components. Now they come together. The job engine is the reason this course exists. By the end of Day 26, you will have applied to at least one real job through a system you built yourself. That\'s not a project — that\'s a tool.',
      },
      { type: 'diagram', id: 'job-engine-flow' },
      {
        type: 'callout',
        variant: 'tip',
        title: '⚠️ Why Semi-Automated (Not Fully Automated)',
        text: 'LinkedIn bans accounts that apply too fast or from obvious automation. This is your personal LinkedIn — protect it. More importantly: applications that a human has reviewed get dramatically higher response rates. The agent does the 95% grunt work. You do the 5% quality gate. That 5% is what gets you interviews.',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Job Finder',
        description: 'In Cursor, navigate to module-7. Open Agent (Cmd+I) — this uses Playwright which Cursor can scaffold correctly including async patterns and cookie handling:',
        prompt: 'Create `job_finder.py` using Playwright async:\n\n1. Launch Chromium in non-headless mode (visible browser)\n2. Load saved LinkedIn cookies from linkedin_session.json (if exists) to stay logged in\n3. Build a LinkedIn Jobs search URL from: keywords, location, date_posted (last 7 days), remote filter\n4. Scroll to load all jobs (max 25)\n5. Extract per job: title, company, location, URL, Easy Apply available (bool)\n6. Save to found_jobs.json\n7. Function `fetch_job_description(url)`: navigate to job, click "See more", extract full JD text, return clean string plus applicant count if shown\n8. If not logged in: print "Log in to LinkedIn in the browser window, then press Enter". After Enter: save cookies to linkedin_session.json (one-time setup)',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Job Scorer',
        description: 'Still in module-7. Open job_finder.py and MEMORY.md in Cursor so they\'re in context, then open Agent (Cmd+I):',
        prompt: 'Create `job_scorer.py`:\n\n1. Load found_jobs.json + JOB_SEARCH_PROFILE YAML section from MEMORY.md\n2. For each Easy Apply job: fetch full JD using job_finder.py\n3. LLM scores each job 1-10 against profile. Return JSON: { score: int, reasoning: str, deal_breakers_hit: list, strengths: list, gaps: list }\n4. Filter: score >= 7 only\n5. Sort descending by score\n6. Save filtered to scored_jobs.json\n7. Print summary table: Company | Role | Score | Top Reason',
      },
      {
        type: 'cursor-prompt',
        label: 'Build Application Prep',
        description: 'In Cursor, have job_scorer.py open alongside module-4/portfolio_agent.py (you\'ll import it). Open Agent (Cmd+I) — it spans two module folders:',
        prompt: 'Create `application_prep.py`:\n\nFor each job in scored_jobs.json:\n1. Research company (call research_agent.py subprocess)\n2. Retrieve relevant portfolio experience (Chroma DB from module-4)\n3. Generate cover letter: "3 paragraphs. Para 1: Why this specific company (cite company research). Para 2: Why I\'m a strong fit — reference 2 NAMED projects from portfolio context. Para 3: Forward-looking. Tone: confident, specific, human. No clichés. Under 300 words."\n4. Save application package: applications/{company}-{role}-{date}.json with job details, score, company brief, cover letter, portfolio snippets',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Telegram Review Flow',
        description: 'Switch to ~/openclaw/extensions/tools/ in Cursor. This is the most important skill you\'ll build — the human-in-the-loop gate. Open Agent (Cmd+I):',
        prompt: 'Create OpenClaw AgentSkill `job-review.ts`:\n- name: "present_job_for_review"\n- Reads application package JSON\n- Sends formatted Telegram message:\n  "🎯 Job Match\\n\\n{Company} — {Role}\\n📊 Score: {X}/10\\n💡 {top reason}\\n\\n✅ Strengths: {list}\\n⚠️ Gaps: {list}\\n\\n📝 Cover letter: \\"{first 150 chars}...\"\\n\\nReply YES to apply, SKIP to pass, DETAIL for full letter"\n- YES → call applicator_skill\n- DETAIL → send full cover letter, ask again\n- SKIP → ask "Why? (salary/role/company/other)" → log to SKIP_LOG.md',
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Words of Wisdom',
        text: 'The first time you get a message on your phone saying "Job match found — 9/10 — Stripe" and you read a cover letter the agent wrote in 45 seconds that genuinely references your recommender system project and ties it directly to their personalisation team... you\'ll understand why you spent 26 days building this.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm7-c1', text: 'job_finder.py finds and saves 10+ jobs — LinkedIn session saved' },
          { id: 'm7-c2', text: 'job_scorer.py filters correctly — deal-breaker jobs score below 5' },
          { id: 'm7-c3', text: 'Cover letters are company-specific, reference named projects' },
          { id: 'm7-c4', text: 'Telegram review flow works — YES/SKIP/DETAIL all function' },
          { id: 'm7-c5', text: 'Google Sheets tracker updates after each application action' },
          { id: 'm7-c6', text: 'You have actually applied to at least one real job through the engine 🎯' },
        ],
      },
    ],
  },

  {
    id: 8,
    slug: 'multi-agent',
    emoji: '🌐',
    title: 'Multi-Agent Orchestration',
    subtitle: 'Connect everything. Build the Career Intelligence System.',
    days: '27–30',
    xp: 700,
    color: '#6366f1',
    outcomes: [
      'A hierarchical orchestrator that delegates to your 4 specialist agents',
      'Parallel agent execution — multiple agents running simultaneously',
      'Persistent shared memory across all agents via SQLite',
      'A single Telegram interface for all career intelligence',
      'Your graduation: the complete Agentic AI Engineer portfolio piece',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'The final module. Four days. One system to rule them all.',
        text: 'You\'ve built four specialist agents. Now you\'re building the orchestrator that sits above them — reads your intent, decides which agents to deploy, runs them in parallel when possible, combines their outputs, and delivers one coherent response. This is the architecture used in every serious agentic AI product.',
      },
      { type: 'diagram', id: 'multi-agent-hierarchy' },
      {
        type: 'text',
        markdown: `## The Three Orchestration Patterns

| Pattern | When to Use | How It Looks |
|---------|-------------|-------------|
| **Sequential** | Tasks must happen in order | A→B→C |
| **Parallel** | Tasks are independent | A+B+C → combine |
| **Hierarchical** | Tasks are conditional, complex | Orchestrator decides |

Your Career Intelligence System uses all three. The orchestrator decides (hierarchical). Compound tasks run in parallel. The job engine runs sequentially.`,
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Career Orchestrator',
        description: 'In Cursor, open module-8. This is the capstone. Open all five previous agent files as tabs first so Cursor Agent has full context — then open Agent (Cmd+I):',
        prompt: 'Create `career_orchestrator.py` using LangGraph StateGraph.\n\nState includes: user_goal, routing_decision, active_agents, results (dict), final_output, iteration_count\n\nNodes:\n1. `parse_goal` — LLM classifies goal into: RESEARCH | PORTFOLIO_QA | DATA_ANALYSIS | INTERVIEW_PREP | JOB_SEARCH | COMPOUND\n2. `route` — conditional router dispatching to the right handler node\n3. `research_handler` — calls module-3/research_agent.py as subprocess\n4. `portfolio_handler` — calls module-4/portfolio_agent.py as subprocess\n5. `analysis_handler` — calls module-5/analysis_agent.py as subprocess  \n6. `interview_handler` — calls module-6/interview_prep_agent.py as subprocess\n7. `job_handler` — calls module-7 pipeline\n8. `compound_handler` — identifies which agents needed, runs them in PARALLEL using concurrent.futures.ThreadPoolExecutor, combines results\n9. `format_output` — synthesises all agent outputs into one clean response\n\nCompile with StateGraph. Accept goal as sys.argv[1].',
      },
      {
        type: 'cursor-prompt',
        label: 'Add Shared Memory',
        description: 'In Cursor, open career_orchestrator.py alongside the module files. Open Agent (Cmd+I) — it creates shared_memory.py and edits the orchestrator to use it:',
        prompt: 'Create `shared_memory.py` — a SQLite-backed memory store all agents share:\n\n1. Database: ~/.openclaw/workspaces/default/shared_memory.db\n2. `remember(key: str, value: str, agent_name: str)` — stores with timestamp\n3. `recall(query: str, limit=10)` — fuzzy text search, returns most relevant facts\n4. `get_context(agent_name: str)` — returns last 10 facts for that agent\'s domain\n5. `get_recent(hours=24)` — all facts from last N hours\n\nUpdate career_orchestrator.py to: call shared_memory.remember() with key findings after each agent runs, call shared_memory.get_context() at the start of each agent invocation.',
      },
      {
        type: 'cursor-prompt',
        label: 'Deploy as Master OpenClaw Skill',
        description: 'Switch to ~/openclaw/extensions/tools/ in Cursor. Open Agent (Cmd+I). This one skill becomes the single entry point for your entire system:',
        prompt: 'Create OpenClaw AgentSkill `career-intelligence.ts`:\n- name: "career_intelligence"\n- description: "The master orchestrator for all career-related tasks. Routes requests to the right specialist agent: research, portfolio Q&A, data analysis, interview prep, or job search. Use this for ANY career, job, project, research, or professional development request. This is the primary skill."\n- parameters: { goal: { type: "string", required: true } }\n- Handler: spawn career_orchestrator.py, timeout 180s, return output.\n\nThis replaces all individual skills as the first entry point.',
      },
      {
        type: 'callout',
        variant: 'aha',
        title: '⚡ The Graduation Test',
        text: 'Send to Telegram: "It\'s Monday morning. What should I focus on for my job search this week?" — Your system should check application statuses, find new matches, surface follow-ups, and deliver a Monday brief. If it does that, you\'re done. You\'re an Agentic AI Engineer.',
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Final Words of Wisdom',
        text: 'You came in knowing Python and ML — which is more than most. You\'re leaving knowing how to architect systems where AI agents do the work, at scale, autonomously, connected to real systems. That\'s a different engineering discipline entirely. The portfolio we built for you says "Agentic AI Engineer." Today, every project in this course is the evidence.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm8-c1', text: 'Orchestrator correctly routes all goal types to right specialist' },
          { id: 'm8-c2', text: 'Compound goals run agents in parallel (check with timing)' },
          { id: 'm8-c3', text: 'Shared memory persists across agent runs (check the SQLite DB)' },
          { id: 'm8-c4', text: 'Monday morning brief test works end-to-end from Telegram' },
          { id: 'm8-c5', text: 'Capstone case study written and added to portfolio site' },
          { id: 'm8-c6', text: 'All 8 modules committed and pushed to agent-projects GitHub repo' },
          { id: 'm8-c7', text: 'You can explain this entire system in a 5-minute interview answer without notes' },
        ],
      },
    ],
  },
]
