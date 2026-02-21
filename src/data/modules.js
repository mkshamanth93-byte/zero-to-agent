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
        title: 'Welcome to Zero → Agent.',
        text: 'In 30 days you\'re going to build five AI systems, deploy them to your phone, and become someone who can walk into any agentic AI interview and talk from real experience. Not theory. Not tutorials you half-finished. Real, working systems you built yourself. Let\'s start.',
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
        label: 'Your First Cursor Prompt',
        description: 'Open ~/agent-course in Cursor. Press Cmd+L. Paste this:',
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
          { id: 'm0-c5', text: 'You can explain in one sentence what a "tool" is in agent context' },
          { id: 'm0-c6', text: 'You understand the difference between an agent and a script' },
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
        description: 'In ~/agent-course/module-1, open Cursor (Cmd+L) and paste:',
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
        description: 'Now create the agent itself:',
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
        description: 'Improve your agent\'s capabilities:',
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
        description: 'Give your agent memory that survives restarts:',
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
    title: 'OpenClaw & Your First AgentSkill',
    subtitle: 'Your agent moves from terminal to your phone.',
    days: '6–8',
    xp: 300,
    color: '#06b6d4',
    outcomes: [
      'OpenClaw running on your Mac, connected to Telegram',
      'Your MEMORY.md filled with personal context',
      'First custom AgentSkill deployed',
      'Able to talk to your agent from your phone',
    ],
    sections: [
      {
        type: 'callout',
        variant: 'welcome',
        title: 'This module changes the game.',
        text: 'Right now your agent lives in a terminal. After this module, it lives on your phone. You can message it from bed, from a coffee shop, from a job interview waiting room. OpenClaw is the infrastructure that makes your agent a 24/7 assistant.',
      },
      { type: 'diagram', id: 'openclaw-arch' },
      {
        type: 'text',
        markdown: `## Day 6: Install OpenClaw

OpenClaw is a **self-hosted** AI agent platform. It runs on your Mac, not in the cloud. Your data never leaves your machine unless you explicitly send it somewhere.`,
      },
      {
        type: 'step',
        number: 1,
        title: 'Clone and install OpenClaw',
        code: { language: 'bash', content: `git clone https://github.com/openclaw/openclaw.git ~/openclaw\ncd ~/openclaw\nnpm install -g pnpm\npnpm install\npnpm start setup` },
      },
      {
        type: 'step',
        number: 2,
        title: 'Get a Telegram bot token',
        code: { language: 'bash', content: `# On your phone:\n# 1. Open Telegram → search @BotFather\n# 2. Send: /newbot\n# 3. Name it: DeekshitaAgent\n# 4. BotFather sends you a token like: 7234567890:AAF...\n# 5. Copy it — enter it when OpenClaw setup asks` },
      },
      {
        type: 'step',
        number: 3,
        title: 'Start OpenClaw',
        code: { language: 'bash', content: `cd ~/openclaw\npnpm dev\n\n# You should see:\n# ✓ Gateway running on ws://127.0.0.1:18789\n# ✓ Telegram connected  \n# ✓ Agent ready\n\n# Open Telegram → find your bot → send: Hello` },
      },
      {
        type: 'callout',
        variant: 'aha',
        title: '⚡ You Just Did Something Real',
        text: 'You are now talking to an AI running on your own Mac from your phone. No cloud subscription. No data leaving your machine to a third-party service. This is self-hosted AI. This is what "infrastructure" means in the agentic world.',
      },
      {
        type: 'text',
        markdown: `## Your MEMORY.md — The Most Important File

This file is what your agent reads to know who it's working for. The more detail you put in, the smarter every agent becomes.`,
      },
      {
        type: 'cursor-prompt',
        label: 'Build Your MEMORY.md',
        description: 'Open ~/.openclaw/workspaces/default/MEMORY.md in Cursor. Use this prompt:',
        prompt: 'Write a comprehensive MEMORY.md for my OpenClaw agent. Include these sections:\n\n**IDENTITY**: Name Deekshita Sridhar, Data Scientist & Agentic AI Engineer, location, LinkedIn URL\n\n**CAREER_GOALS**: Actively seeking roles in agentic AI and data science, preference for remote/hybrid, interested in companies using LLMs in production\n\n**TECHNICAL_PROFILE**: Full skills list — Python, LangChain, LangGraph, AutoGen, CrewAI, OpenClaw, scikit-learn, TensorFlow, PyTorch, SQL, PySpark, Tableau, Power BI\n\n**JOB_SEARCH_PROFILE** (as YAML): target_roles, must_have requirements, deal_breakers, nice_to_have, target_salary, locations, company_size\n\n**COMMUNICATION_STYLE**: Direct, concise, no fluff. Flag important items. Ask clarifying questions when ambiguous.\n\nFormat as clean markdown. Add placeholder comments where I should fill in real values.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: '💡 The MEMORY.md Compound Effect',
        text: 'Every time you add a detail to MEMORY.md — a company you interviewed with, a skill you just learned, a preference you discovered — every agent in your system gets smarter. It\'s the brain of your entire career AI stack.',
      },
      {
        type: 'text',
        markdown: `## Day 7: Build Your First AgentSkill

An AgentSkill is a TypeScript plugin that extends what your OpenClaw agent can do. Every new capability you build goes here.`,
      },
      { type: 'diagram', id: 'agentskill-anatomy' },
      {
        type: 'cursor-prompt',
        label: 'Build the GitHub Profile Skill',
        description: 'Create ~/openclaw/extensions/tools/github-profile.ts:',
        prompt: 'Create a TypeScript OpenClaw AgentSkill file at ~/openclaw/extensions/tools/github-profile.ts\n\nThe skill:\n- name: "get_github_profile"\n- description: "Fetches Deekshita\'s GitHub profile and recent public repositories. Returns formatted summary of repos, languages, stars, and descriptions. Use when asked about her projects or technical work."\n- parameters: { username: { type: "string", required: true, description: "GitHub username" } }\n\nThe handler:\n1. Fetch https://api.github.com/users/{username}\n2. Fetch https://api.github.com/users/{username}/repos?sort=pushed&per_page=10\n3. Filter out forks\n4. Return formatted markdown: profile summary + repo list with name, description, language, stars\n5. Handle API errors gracefully\n\nUse Node.js native fetch. Add type annotations. Export both `skill` and `handler`.',
      },
      {
        type: 'step',
        number: 4,
        title: 'Register and test the skill',
        code: { language: 'bash', content: `# Restart OpenClaw\ncd ~/openclaw && pnpm dev\n\n# Test in Telegram:\n# "What projects do I have on GitHub?"\n# → Agent calls get_github_profile\n# → Returns your actual repos` },
      },
      {
        type: 'callout',
        variant: 'wisdom',
        title: '🔮 Words of Wisdom',
        text: 'The skill\'s description field is everything. Test this: change it to something vague and the agent stops using the skill at the right time. Change it back to specific and precise — it works perfectly. You\'re writing prompts inside your code. Always be specific.',
      },
      {
        type: 'checkpoint',
        items: [
          { id: 'm2-c1', text: 'OpenClaw installed and running (`pnpm dev` shows "Agent ready")' },
          { id: 'm2-c2', text: 'Telegram bot connected — agent responds to messages on your phone' },
          { id: 'm2-c3', text: 'MEMORY.md filled in with your real details and job preferences' },
          { id: 'm2-c4', text: 'github-profile skill built and deployed' },
          { id: 'm2-c5', text: 'Tested from Telegram: "What are my GitHub projects?" → real repos returned' },
          { id: 'm2-c6', text: 'You understand what the skill `description` field does' },
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
        description: 'In ~/agent-course/module-3, open Cursor and paste:',
        prompt: 'Create `research_agent.py` using LangGraph StateGraph. Build these nodes:\n\n1. `decompose` — LLM breaks the question into 3-4 specific sub-questions\n2. `search` — DuckDuckGo searches each sub-question, stores results in state\n3. `read_top_result` — Fetches and extracts text from the top URL for each sub-question\n4. `evaluate` — LLM decides: "sufficient" or returns list of gap queries\n5. `synthesise` — Produces structured markdown: Summary, Key Findings (with source URLs), Limitations, Further Reading\n\nStateGraph edges: decompose→search→read→evaluate→(synthesise if sufficient, else search with gap queries). Add MAX_LOOPS=2 to prevent infinite loops.\n\nAccepts topic as sys.argv[1]. Saves output to research_outputs/{slugified-topic}-{date}.md. Prints to stdout.',
      },
      {
        type: 'cursor-prompt',
        label: 'Add the \'What This Means For You\' Section',
        description: 'Make the output personally relevant:',
        prompt: 'Update the `synthesise` node in research_agent.py. After Key Findings, add a section "What This Means For You" — using the context that this is for Deekshita Sridhar, a Data Scientist actively seeking agentic AI roles, make the findings personally relevant. Also add: a Confidence Score (Low/Medium/High) with one sentence explaining why, and three "Suggested Follow-up Questions" to go deeper.',
      },
      {
        type: 'cursor-prompt',
        label: 'Deploy as OpenClaw Skill',
        description: 'Create ~/openclaw/extensions/tools/research-agent.ts:',
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
        description: 'In ~/agent-course/module-4:',
        prompt: 'Create `build_knowledge_base.py`:\n\n1. GitHub API: fetch all public repos for GITHUB_USERNAME from .env\n2. For each repo: fetch README.md + list of files + top 3 .py files (max 5000 chars each)\n3. Combine into one document per repo: name + description + README + code\n4. Also load MEMORY.md from path passed as sys.argv[1]\n5. Split all docs: RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)\n6. Embed: OpenAIEmbeddings(model="text-embedding-3-small")\n7. Store: Chroma vector DB persisted to ./portfolio_db\n8. Print progress: "Indexing: [repo-name]"\n9. Final: "Indexed X documents, Y chunks"',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Q&A Agent',
        description: 'Now create the conversational agent over your portfolio:',
        prompt: 'Create `portfolio_agent.py`:\n\n1. Load Chroma DB from ./portfolio_db\n2. Retriever: top 5 most relevant chunks per query\n3. ConversationalRetrievalChain with:\n   - ChatOpenAI gpt-4o-mini\n   - System prompt: "You are Deekshita\'s portfolio assistant. Answer questions about her projects, skills, and experience using ONLY the provided context. Be specific — name actual projects. If the answer isn\'t in the context, say so clearly."\n   - ConversationBufferMemory\n4. After each answer, print "📎 Sources: [list of source documents used]"\n5. Interactive main() loop',
      },
      {
        type: 'cursor-prompt',
        label: 'Generate STAR Interview Answers',
        description: 'Add automated interview prep:',
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
        description: 'In ~/agent-course/module-5:',
        prompt: 'Create `code_executor.py`. Build a safe Python code execution environment:\n\n1. Accepts: a string of Python code + a pandas DataFrame as context\n2. Available in the execution environment: pandas as pd, numpy as np, matplotlib.pyplot as plt, scipy.stats, and the variable `df`\n3. Captures stdout output\n4. Saves any matplotlib figures to analysis_outputs/ as PNG files\n5. Returns dict: { output: str, figures: [filename], error: str|None }\n6. Hard 30-second timeout\n7. Blocks network calls and writes outside analysis_outputs/\n\nAdd a function `safe_exec(code, df)` as the main interface.',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Analysis Agent',
        description: 'Now the full LangGraph pipeline:',
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
        description: 'In ~/agent-course/module-6:',
        prompt: 'Create `interview_prep_agent.py` using LangGraph:\n\nNodes (run decompose→research+analyse in parallel→assemble→write):\n1. `parse_input` — extract company name, job title, JD text\n2. `research_company` (parallel) — web search: "[company] tech stack", "[company] engineering culture", "[company] recent news 2026", "[company] glassdoor". Synthesise into 3-bullet company brief.\n3. `analyse_jd` (parallel) — extract: must-have skills, nice-to-have, seniority level, 5 likely interview questions\n4. `retrieve_experience` — query Chroma DB from module-4 for each required skill. Collect top matches.\n5. `write_prep_sheet` — generate markdown:\n   - Company Overview (3 bullets from research)\n   - Role Fit Analysis (skills match % + gaps)\n   - 5 STAR answers (each grounded in a NAMED project from Chroma results)\n   - 5 Questions To Ask Them\n   - Salary Note\n   - Red Flags to probe\n\nSave to prep_sheets/{company}-{date}.md\nCLI: `--company "Name" --jd "paste JD"`',
      },
      {
        type: 'cursor-prompt',
        label: 'Deploy as OpenClaw Skill',
        description: 'Create interview-prep.ts in OpenClaw extensions:',
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
        description: 'In ~/agent-course/module-7:',
        prompt: 'Create `job_finder.py` using Playwright async:\n\n1. Launch Chromium in non-headless mode (visible browser)\n2. Load saved LinkedIn cookies from linkedin_session.json (if exists) to stay logged in\n3. Build a LinkedIn Jobs search URL from: keywords, location, date_posted (last 7 days), remote filter\n4. Scroll to load all jobs (max 25)\n5. Extract per job: title, company, location, URL, Easy Apply available (bool)\n6. Save to found_jobs.json\n7. Function `fetch_job_description(url)`: navigate to job, click "See more", extract full JD text, return clean string plus applicant count if shown\n8. If not logged in: print "Log in to LinkedIn in the browser window, then press Enter". After Enter: save cookies to linkedin_session.json (one-time setup)',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Job Scorer',
        description: 'Now score each job against your profile:',
        prompt: 'Create `job_scorer.py`:\n\n1. Load found_jobs.json + JOB_SEARCH_PROFILE YAML section from MEMORY.md\n2. For each Easy Apply job: fetch full JD using job_finder.py\n3. LLM scores each job 1-10 against profile. Return JSON: { score: int, reasoning: str, deal_breakers_hit: list, strengths: list, gaps: list }\n4. Filter: score >= 7 only\n5. Sort descending by score\n6. Save filtered to scored_jobs.json\n7. Print summary table: Company | Role | Score | Top Reason',
      },
      {
        type: 'cursor-prompt',
        label: 'Build Application Prep',
        description: 'Generate tailored application packages:',
        prompt: 'Create `application_prep.py`:\n\nFor each job in scored_jobs.json:\n1. Research company (call research_agent.py subprocess)\n2. Retrieve relevant portfolio experience (Chroma DB from module-4)\n3. Generate cover letter: "3 paragraphs. Para 1: Why this specific company (cite company research). Para 2: Why I\'m a strong fit — reference 2 NAMED projects from portfolio context. Para 3: Forward-looking. Tone: confident, specific, human. No clichés. Under 300 words."\n4. Save application package: applications/{company}-{role}-{date}.json with job details, score, company brief, cover letter, portfolio snippets',
      },
      {
        type: 'cursor-prompt',
        label: 'Build the Telegram Review Flow',
        description: 'Create the human-in-the-loop review:',
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
        description: 'In ~/agent-course/module-8 — the capstone build:',
        prompt: 'Create `career_orchestrator.py` using LangGraph StateGraph.\n\nState includes: user_goal, routing_decision, active_agents, results (dict), final_output, iteration_count\n\nNodes:\n1. `parse_goal` — LLM classifies goal into: RESEARCH | PORTFOLIO_QA | DATA_ANALYSIS | INTERVIEW_PREP | JOB_SEARCH | COMPOUND\n2. `route` — conditional router dispatching to the right handler node\n3. `research_handler` — calls module-3/research_agent.py as subprocess\n4. `portfolio_handler` — calls module-4/portfolio_agent.py as subprocess\n5. `analysis_handler` — calls module-5/analysis_agent.py as subprocess  \n6. `interview_handler` — calls module-6/interview_prep_agent.py as subprocess\n7. `job_handler` — calls module-7 pipeline\n8. `compound_handler` — identifies which agents needed, runs them in PARALLEL using concurrent.futures.ThreadPoolExecutor, combines results\n9. `format_output` — synthesises all agent outputs into one clean response\n\nCompile with StateGraph. Accept goal as sys.argv[1].',
      },
      {
        type: 'cursor-prompt',
        label: 'Add Shared Memory',
        description: 'Connect all agents with a shared memory store:',
        prompt: 'Create `shared_memory.py` — a SQLite-backed memory store all agents share:\n\n1. Database: ~/.openclaw/workspaces/default/shared_memory.db\n2. `remember(key: str, value: str, agent_name: str)` — stores with timestamp\n3. `recall(query: str, limit=10)` — fuzzy text search, returns most relevant facts\n4. `get_context(agent_name: str)` — returns last 10 facts for that agent\'s domain\n5. `get_recent(hours=24)` — all facts from last N hours\n\nUpdate career_orchestrator.py to: call shared_memory.remember() with key findings after each agent runs, call shared_memory.get_context() at the start of each agent invocation.',
      },
      {
        type: 'cursor-prompt',
        label: 'Deploy as Master OpenClaw Skill',
        description: 'One skill to rule them all:',
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
        text: 'You started this course knowing Python and ML. You\'re finishing it knowing how to architect systems where AI does the work. That\'s not a skill upgrade — that\'s a paradigm shift. The website we built for you says "Agentic AI Engineer." It was aspirational on Day 1. It\'s accurate on Day 30.',
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
