/**
 * Generates domain-specific content for modules 3–8.
 * Uses generatedContent from the LLM when available,
 * falls back to profile-inferred templates.
 *
 * This is what makes the course genuinely different for a
 * sales & marketing person vs a dental practice owner vs
 * a data scientist looking for jobs.
 */

import { INDUSTRY_TEMPLATES } from '../data/industryTemplates'

// ─── Knowledge source per industry (used in Module 4 RAG prompt) ─────────────
const KNOWLEDGE_SOURCES = {
  'tech-software':   'your GitHub repos (GitHub API), internal wikis, architecture docs, and README files',
  'data-ai':         'your Jupyter notebooks, model documentation, GitHub repos, and research papers you reference',
  'healthcare':      'patient intake forms, treatment protocols, clinical guidelines, and referral letter templates',
  'dental':          'patient records, treatment plan templates, insurance claim forms, and clinical procedure notes',
  'finance':         'chart of accounts, client financial reports, tax templates, and reconciliation records',
  'legal':           'case files, contract templates, precedent documents, and compliance checklists',
  'hr-recruitment':  'job descriptions, CV database, onboarding documents, policy handbook, and employee handbook',
  'sales-marketing': 'CRM contact records, product documentation, sales collateral, competitor research, and campaign briefs',
  'operations':      'process documentation, supplier records, inventory data, SLAs, and operational runbooks',
  'education':       'course materials, assessment rubrics, student records, and curriculum frameworks',
  'real-estate':     'property listings, lease templates, tenant records, maintenance logs, and inspection reports',
  'retail-ecom':     'product catalogue, order history, customer support tickets, and return policies',
  'creative-media':  'project briefs, brand guidelines, content library, client feedback, and asset inventory',
  'consulting':      'client engagement notes, past proposals, research reports, and methodology frameworks',
  'hospitality':     'menu documentation, supplier contracts, reservation records, and staff training materials',
  'personal':        'your personal notes, documents, bookmarks, emails, and any knowledge you want to search',
  'other':           'your key documents, records, and knowledge base relevant to your domain',
}

// ─── What the data analysis agent operates on (Module 5) ─────────────────────
const ANALYSIS_TARGETS = {
  'tech-software':   'application performance metrics, error rates, deployment frequency, and developer productivity data',
  'data-ai':         'model performance logs, feature drift metrics, training run results, and experiment comparisons',
  'healthcare':      'appointment volumes, treatment outcomes, billing data, and patient satisfaction trends',
  'dental':          'patient recall rates, treatment acceptance rates, invoice aging, and procedure revenue breakdown',
  'finance':         'P&L statements, cash flow data, invoice aging, expense categories, and budget vs actual',
  'legal':           'matter billing data, time tracking, case outcomes, and client engagement patterns',
  'hr-recruitment':  'time-to-hire metrics, pipeline conversion rates, offer acceptance rates, and headcount data',
  'sales-marketing': 'campaign performance (clicks, conversions, CAC), lead quality scores, pipeline velocity, and revenue attribution',
  'operations':      'inventory turnover, supplier lead times, defect rates, and fulfilment times',
  'education':       'student assessment scores, attendance patterns, course completion rates, and learning outcomes',
  'real-estate':     'rental yield data, vacancy rates, maintenance costs, and lease expiry schedule',
  'retail-ecom':     'sales by SKU, return rates, conversion funnel, customer LTV, and inventory velocity',
  'creative-media':  'project profitability, client retention, campaign performance metrics, and team utilisation',
  'consulting':      'client revenue, engagement profitability, time tracking, and pipeline conversion',
  'hospitality':     'covers per service, average spend, food cost %, staff labour cost, and table turn times',
  'personal':        'personal finance (spending by category), habit tracking data, and productivity patterns',
  'other':           'your key business or personal metrics and operational data',
}

// ─── What Module 6 "prep agent" prepares (varies by goal track) ──────────────
const PREP_CONTEXTS = {
  career:   'job interview prep — company research, likely interview questions based on JD, STAR answer drafts from your portfolio',
  business: 'client meeting prep — company background, recent news, key stakeholders, open issues, and talking points',
  project:  'stakeholder presentation prep — project status, key decisions needed, risks, and next steps',
  personal: 'event and appointment prep — background research, key questions to ask, and relevant context',
}

// ─── Main function ────────────────────────────────────────────────────────────

export function buildDomainContent(moduleId, profile, generatedContent) {
  const gen = generatedContent || null
  const template = INDUSTRY_TEMPLATES[profile?.industry] || INDUSTRY_TEMPLATES['other']
  const name = profile?.name || 'you'
  const role = profile?.role || `someone in ${template.label}`
  const tools = [...(profile?.tools || []), profile?.customTool].filter(Boolean).join(', ') || 'your existing tools'
  const goal = profile?.automationGoal || 'automate your key workflows'
  const goalTrack = profile?.goalTrack || 'business'
  const industryLabel = template.label

  switch (moduleId) {
    case 3: return buildModule3(gen, name, role, tools, goal, industryLabel, template)
    case 4: return buildModule4(gen, name, role, tools, goal, industryLabel, template, profile)
    case 5: return buildModule5(gen, name, role, tools, goal, industryLabel, template, profile)
    case 6: return buildModule6(gen, name, role, tools, goal, industryLabel, goalTrack, profile)
    case 7: return buildModule7(gen, name, role, tools, goal, industryLabel, template, goalTrack, profile)
    case 8: return buildModule8(gen, name, role, industryLabel, profile)
    default: return null
  }
}

// ─── Module 3: Research Agent ─────────────────────────────────────────────────
function buildModule3(gen, name, role, tools, goal, industryLabel, template) {
  const title = gen?.module3?.title || `${industryLabel} Research Agent`
  const brief = gen?.module3?.projectBrief || `An agent that autonomously researches ${industryLabel.toLowerCase()} topics — competitors, trends, people, and opportunities — and delivers structured briefings.`

  return {
    title,
    brief,
    outcome: `An autonomous research agent tailored to ${industryLabel} — deployed as an OpenClaw skill you can trigger from anywhere.`,
    cursorPrompts: [
      {
        label: `Build the ${title}`,
        mode: 'agent',
        description: `In Cursor, navigate to module-3 in the Explorer. Open Agent (Cmd+I). Full project context — LangGraph, DuckDuckGo, and your domain:`,
        prompt: `Create research_agent.py for: "${title}"

What it researches: ${brief}

Build a LangGraph StateGraph with these nodes:
1. \`decompose\` — LLM breaks the query into 3-4 targeted sub-questions relevant to ${industryLabel}
2. \`search\` — DuckDuckGo searches each sub-question, stores results in state
3. \`read_top_result\` — Fetches and extracts text from the top URL per sub-question
4. \`evaluate\` — LLM decides: "sufficient" or returns a list of gap queries
5. \`synthesise\` — Structured markdown output:
   - Summary (3 sentences)
   - Key Findings (bullet points with source URLs)
   - Relevance to ${role}
   - Recommended next actions

StateGraph edges: decompose → search → read → evaluate → (synthesise if sufficient, else loop with gap queries). MAX_LOOPS=2 to prevent infinite loops.

Accepts query as sys.argv[1]. Saves output to research_outputs/{query}-{date}.md. Prints to stdout. This agent will be imported by later modules — build it reusable.`,
      },
      {
        label: 'Deploy as OpenClaw Skill',
        mode: 'agent',
        description: 'Switch to ~/openclaw/extensions/tools/ in Cursor. Open Agent (Cmd+I) — creates the TypeScript wrapper:',
        prompt: `Create OpenClaw AgentSkill TypeScript file research-agent.ts:
- name: "research_topic"
- description: "Performs deep autonomous web research relevant to ${industryLabel}. Returns a structured brief with key findings, citations, and actionable recommendations. Use for any research request: competitor analysis, market trends, technical research, or investigation."
- parameters: { topic: { type: "string", required: true } }

Handler: spawn Python subprocess running research_agent.py with topic as argument. Wait up to 120s. Return stdout output as markdown.`,
      },
    ],
    checkpoints: [
      { id: `m3-c1`, text: 'research_agent.py runs end-to-end on a topic relevant to your work without crashing' },
      { id: `m3-c2`, text: 'LangGraph state machine has at least 4 nodes with correct conditional edges' },
      { id: `m3-c3`, text: 'Iterative deepening works — agent searches again when first pass is insufficient' },
      { id: `m3-c4`, text: `OpenClaw skill deployed and tested — trigger from Telegram: "research [${industryLabel} topic]"` },
    ],
  }
}

// ─── Module 4: Knowledge Base & RAG ──────────────────────────────────────────
function buildModule4(gen, name, role, tools, goal, industryLabel, template, profile) {
  const title = gen?.module4?.title || `${industryLabel} Knowledge Base Agent`
  const brief = gen?.module4?.projectBrief || `A RAG agent that indexes your ${industryLabel.toLowerCase()} documents and answers domain-specific questions with citations.`
  const knowledgeSource = KNOWLEDGE_SOURCES[profile?.industry] || KNOWLEDGE_SOURCES['other']

  return {
    title,
    brief,
    outcome: `A searchable knowledge base of your ${industryLabel.toLowerCase()} domain — an agent that answers questions about your work with citations.`,
    cursorPrompts: [
      {
        label: 'Build the Knowledge Base',
        mode: 'agent',
        description: 'In Cursor, navigate to module-4. Open Agent (Cmd+I) — this builds your vector database:',
        prompt: `Create build_knowledge_base.py for: "${title}"

Knowledge sources to index: ${knowledgeSource}

1. Load documents from the relevant sources (use API or file system as appropriate)
2. For each document: extract clean text (max 5000 chars each)
3. Combine into structured documents with metadata (title, source, date if available)
4. Also load MEMORY.md from path passed as sys.argv[1]
5. Split: RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
6. Embed: OpenAIEmbeddings(model="text-embedding-3-small")
7. Store: Chroma vector DB persisted to ./knowledge_db
8. Print progress: "Indexing: [document-name]"
9. Final: "Indexed X documents, Y chunks"`,
      },
      {
        label: 'Build the Q&A Agent',
        mode: 'agent',
        description: 'Still in module-4. Run the knowledge base build first. Then open Agent (Cmd+I):',
        prompt: `Create query_agent.py for: "${title}"

Context: ${brief}

1. Load Chroma DB from ./knowledge_db
2. Accept question as sys.argv[1]
3. Retrieve top 3 most relevant chunks
4. LLM answers using ONLY the retrieved context — always cite source documents
5. If insufficient context: "I don't have enough information about this — try rephrasing or check [source]"
6. Output: Answer + Sources used + Confidence (Low/Medium/High)
7. Save to query_outputs/{question-slug}-{date}.md

Role context for the LLM system prompt: "You are a knowledge assistant for ${role}. Answer questions specifically relevant to ${industryLabel} work."`,
      },
    ],
    checkpoints: [
      { id: 'm4-c1', text: 'build_knowledge_base.py indexes your documents without errors' },
      { id: 'm4-c2', text: 'query_agent.py returns accurate answers with source citations' },
      { id: 'm4-c3', text: 'Agent correctly says "I don\'t know" when context is missing (no hallucination)' },
      { id: 'm4-c4', text: `Deployed as OpenClaw skill — test with a real question from your ${industryLabel.toLowerCase()} world` },
    ],
  }
}

// ─── Module 5: Data Analysis Agent ───────────────────────────────────────────
function buildModule5(gen, name, role, tools, goal, industryLabel, template, profile) {
  const title = gen?.module5?.title || `${industryLabel} Data Analysis Agent`
  const brief = gen?.module5?.projectBrief || `An agent that analyses your ${industryLabel.toLowerCase()} data, identifies patterns and anomalies, and produces actionable summaries.`
  const analysisTarget = ANALYSIS_TARGETS[profile?.industry] || ANALYSIS_TARGETS['other']

  return {
    title,
    brief,
    outcome: `An agent that autonomously analyses your ${industryLabel.toLowerCase()} data and delivers plain-English insights with visualisations.`,
    cursorPrompts: [
      {
        label: `Build the ${title}`,
        mode: 'agent',
        description: 'In Cursor, navigate to module-5. Open Agent (Cmd+I) — full data analysis pipeline:',
        prompt: `Create data_analysis_agent.py for: "${title}"

Data to analyse: ${analysisTarget}

1. Load data from CSV/JSON/API (accept file path or connection string as sys.argv[1])
2. Auto-detect data schema — print column names, types, row count, null percentages
3. Run LLM-guided EDA:
   - Summary statistics for numeric columns
   - Distribution analysis
   - Trend detection (if time-series data present)
   - Anomaly flagging (values > 3 std dev from mean)
   - Correlation analysis
4. LLM interprets findings:
   - "Key Insight" (most important finding in plain English)
   - "Action Required" (what needs human attention now)
   - "Trend" (what is changing over time)
   - Confidence: Low/Medium/High for each insight
5. Generate matplotlib charts: save to analysis_outputs/charts/
6. Save full report as analysis_outputs/{date}-report.md

Context: This agent serves ${role}. Frame insights for ${industryLabel} decision-making.`,
      },
    ],
    checkpoints: [
      { id: 'm5-c1', text: 'Agent loads and analyses your actual data without errors' },
      { id: 'm5-c2', text: 'Anomaly detection works — flags outliers you\'d want to investigate' },
      { id: 'm5-c3', text: 'LLM insights are relevant to your domain (not generic statistics)' },
      { id: 'm5-c4', text: 'Report saved as clean markdown with charts embedded' },
    ],
  }
}

// ─── Module 6: Prep & Briefing Agent ─────────────────────────────────────────
function buildModule6(gen, name, role, tools, goal, industryLabel, goalTrack, profile) {
  const title = gen?.module6?.title || `${industryLabel} Briefing Agent`
  const brief = gen?.module6?.projectBrief || `An agent that prepares you for ${PREP_CONTEXTS[goalTrack] || 'any upcoming meeting or event'}.`
  const prepContext = PREP_CONTEXTS[goalTrack] || PREP_CONTEXTS['business']

  return {
    title,
    brief,
    outcome: `Walk into any ${goalTrack === 'career' ? 'interview' : 'meeting or event'} fully briefed — the agent does the research, you focus on the conversation.`,
    cursorPrompts: [
      {
        label: `Build the ${title}`,
        mode: 'agent',
        description: 'In Cursor, navigate to module-6. Open Agent (Cmd+I) — chains your research agent with structured output:',
        prompt: `Create briefing_agent.py for: "${title}"

What it prepares: ${prepContext}

1. Accept subject as sys.argv[1] (e.g. company name, person name, event title)
2. Chain research_agent.py (from module-3) to gather background
3. Also query knowledge_db (from module-4) for any internal context
4. Structure a briefing document:
   ${goalTrack === 'career'
     ? '- Company Overview (what they do, size, recent news)\n   - Role Fit Analysis (how your background matches)\n   - Likely Questions (based on JD and company culture)\n   - STAR Answer Drafts (2-3 from your portfolio context)\n   - Your Questions to Ask'
     : goalTrack === 'personal'
       ? '- Background on the person/event/topic\n   - Key talking points\n   - Questions to ask\n   - Relevant context from your knowledge base'
       : '- Company/Person Background\n   - Recent News and Developments\n   - Open Items and Context (from your knowledge base)\n   - Suggested Talking Points\n   - Key Questions to Address'
   }
5. Save to briefings/{subject}-{date}.md
6. Deploy as OpenClaw skill so you can trigger it from Telegram the night before

Role context: ${role}`,
      },
    ],
    checkpoints: [
      { id: 'm6-c1', text: 'Briefing agent chains research + knowledge base correctly' },
      { id: 'm6-c2', text: 'Output is structured, readable, and actually useful (not generic)' },
      { id: 'm6-c3', text: `Tested on a real upcoming ${goalTrack === 'career' ? 'interview or company' : 'meeting or situation'}` },
      { id: 'm6-c4', text: 'Deployed as OpenClaw skill — trigger from Telegram the night before' },
    ],
  }
}

// ─── Module 7: The Big Build ──────────────────────────────────────────────────
function buildModule7(gen, name, role, tools, goal, industryLabel, template, goalTrack, profile) {
  const title = gen?.module7?.title || template.module7Goal?.split(' — ')[0] || 'Your Automation System'
  const brief = gen?.module7?.fullBrief || profile?.projectDescription || template.module7Goal || `An end-to-end automation system for ${industryLabel} built specifically around your workflow.`
  const integrations = gen?.module7?.keyIntegrations || []
  const approvalPoints = gen?.module7?.humanApprovalPoints || []

  const integrationsText = integrations.length
    ? integrations.map(i => `- ${i}`).join('\n')
    : `- Your primary ${industryLabel.toLowerCase()} software\n- Notification channel (Telegram/Slack/email)\n- Any data stores or APIs you use`

  const approvalText = approvalPoints.length
    ? approvalPoints.map(p => `- ${p}`).join('\n')
    : `- Before any external communication is sent\n- Before any data is written to your production systems\n- Before any financial transaction or commitment is created`

  return {
    title,
    brief,
    outcome: `Your specific system: ${title}. Built, deployed, and running.`,
    keyIntegrations: integrations,
    humanApprovalPoints: approvalPoints,
    cursorPrompts: [
      {
        label: 'Design the System Architecture',
        mode: 'chat',
        description: 'Before writing any code, design the full system. Open Cursor Chat (Cmd+L) with your MEMORY.md open:',
        prompt: `I'm building this system: "${title}"

Here's the full brief: ${brief}

Tools and software involved: ${tools}

Help me design the architecture:
1. What are the key components/agents in this system?
2. What data flows between them?
3. What are the human-in-the-loop decision points?
4. What APIs or integrations does each component need?
5. What can go wrong and how should we handle failures?

Produce a clear component diagram in ASCII and a step-by-step build plan (which component to build first, second, etc.)`,
      },
      {
        label: 'Build the Core Automation',
        mode: 'agent',
        description: 'In Cursor, create module-7/ folder. Open Agent (Cmd+I) — build the first component based on your architecture design:',
        prompt: `Build the core automation system for: "${title}"

Full system description: ${brief}

Key integrations needed:
${integrationsText}

Human approval points (do NOT automate past these):
${approvalText}

Start with the most important component. Import from earlier modules where possible:
- research_agent.py from module-3 for any research tasks
- query_agent.py from module-4 for knowledge lookups
- data_analysis_agent.py from module-5 for data work

Build production-quality code: error handling, logging, retry logic on API failures. Save outputs to module-7/outputs/.`,
      },
      {
        label: 'Build the Notification & Approval Flow',
        mode: 'agent',
        description: 'Switch to ~/openclaw/extensions/tools/ in Cursor. This is the human-in-the-loop gate. Open Agent (Cmd+I):',
        prompt: `Create an OpenClaw AgentSkill for the notification and approval flow of: "${title}"

When the system needs human approval, it should send a Telegram message with:
- What the agent has done / found
- What it wants to do next
- Key data to review
- Clear approve/reject/modify options (reply YES / NO / EDIT)

On YES → continue with the next automated step
On NO → log the rejection and reason, stop
On EDIT → ask for the modification, apply it, then re-confirm

This is the most important part of the system — it's what makes this safe to use in your real ${industryLabel} work.`,
      },
    ],
    checkpoints: [
      { id: 'm7-c1', text: `Core system built and runs end-to-end without crashing` },
      { id: 'm7-c2', text: 'Human approval gate works — system stops and waits for your decision at the right moments' },
      { id: 'm7-c3', text: 'System has been tested on a real scenario from your actual work' },
      { id: 'm7-c4', text: 'Error handling in place — system fails gracefully, not silently' },
      { id: 'm7-c5', text: `You have used it to do something real in your ${industryLabel.toLowerCase()} work 🎯` },
    ],
  }
}

// ─── Module 8: Orchestration ──────────────────────────────────────────────────
function buildModule8(gen, name, role, industryLabel, profile) {
  const capstoneTitle = gen?.module8?.capstoneTitle || `${industryLabel} Intelligence System`
  const capstoneDesc = gen?.module8?.capstoneDescription || `All your agents working together as one orchestrated system.`

  return {
    title: capstoneTitle,
    brief: capstoneDesc,
    outcome: `Your complete, orchestrated system — all agents connected, all tools integrated, running as one.`,
    cursorPrompts: [
      {
        label: 'Build the Orchestrator',
        mode: 'agent',
        description: 'In Cursor, create module-8/. Open Agent (Cmd+I) — this connects everything:',
        prompt: `Build the master orchestrator for: "${capstoneTitle}"

${capstoneDesc}

This orchestrator should:
1. Accept a high-level instruction from the user (via Telegram or command line)
2. Decide which agents to call and in what sequence (use LangGraph for the routing)
3. Pass outputs between agents (research feeds into analysis feeds into action)
4. Maintain a shared state across the session
5. Return a final structured summary to the user with: what was done, what needs review, what's next

Import and wire together:
- research_agent from module-3
- query_agent from module-4  
- data_analysis_agent from module-5
- briefing_agent from module-6
- core system from module-7

Build a simple natural language router so you can say "${name === 'you' ? 'run my morning briefing' : name + ', run my morning briefing'}" and the right agents fire in sequence.`,
      },
    ],
    checkpoints: [
      { id: 'm8-c1', text: 'Orchestrator routes correctly — the right agents fire for the right requests' },
      { id: 'm8-c2', text: 'Agents share state — outputs from one feed correctly into the next' },
      { id: 'm8-c3', text: 'End-to-end test: trigger a complex task and watch all agents collaborate' },
      { id: 'm8-c4', text: 'System deployed to OpenClaw — accessible from Telegram' },
      { id: 'm8-c5', text: `${name === 'you' ? 'You' : name} used the full system for something real and valuable` },
    ],
  }
}
