import { motion } from 'framer-motion'

const diagrams = {
  'react-loop': ReactLoopDiagram,
  'agent-anatomy': AgentAnatomyDiagram,
  'openclaw-hub': OpenClawHubDiagram,
  'openclaw-arch': OpenClawArchDiagram,
  'agentskill-anatomy': AgentSkillDiagram,
  'rag-pipeline': RAGPipelineDiagram,
  'langgraph-flow': LangGraphDiagram,
  'interview-prep-flow': InterviewPrepDiagram,
  'job-engine-flow': JobEngineDiagram,
  'multi-agent-hierarchy': MultiAgentDiagram,
  'react-verbose': ReactVerboseDiagram,
}

export default function Diagram({ id }) {
  const Component = diagrams[id]
  if (!Component) return null
  return (
    <div className="diagram-wrapper">
      <Component />
    </div>
  )
}

function ReactLoopDiagram() {
  const steps = [
    { label: 'THINK', icon: '◈', desc: 'LLM reasons about what to do next', color: '#6366f1' },
    { label: 'ACT', icon: '⬡', desc: 'Calls a tool (search, code, API...)', color: '#8b5cf6' },
    { label: 'OBSERVE', icon: '◎', desc: 'Reads what the tool returned', color: '#06b6d4' },
    { label: 'REPEAT', icon: '↺', desc: 'Until goal is complete', color: '#34d399' },
  ]
  return (
    <div className="diagram diagram-react-loop">
      <div className="diagram-title">The ReAct Loop</div>
      <div className="diagram-loop-track">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className="diagram-loop-step"
            style={{ '--step-color': step.color }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="loop-step-icon">{step.icon}</div>
            <div className="loop-step-label">{step.label}</div>
            <div className="loop-step-desc">{step.desc}</div>
          </motion.div>
        ))}
        <div className="diagram-loop-arrow">The loop runs until the goal is achieved or max iterations reached</div>
      </div>
    </div>
  )
}

function AgentAnatomyDiagram() {
  return (
    <div className="diagram diagram-anatomy">
      <div className="diagram-title">Agent Anatomy</div>
      <div className="diagram-ascii">
        <pre>{`
  ┌──────────────────────────────────────────┐
  │               YOUR AGENT                 │
  │                                          │
  │  ┌──────────┐  ┌──────────┐  ┌────────┐ │
  │  │  BRAIN   │  │  TOOLS   │  │ MEMORY │ │
  │  │          │  │          │  │        │ │
  │  │  GPT-4o  │─▶│ search   │  │ convo  │ │
  │  │  Claude  │  │ code     │  │ vector │ │
  │  │  Llama   │  │ files    │  │  DB    │ │
  │  │          │  │ browser  │  │        │ │
  │  └──────────┘  └──────────┘  └────────┘ │
  │                                          │
  └──────────────────────────────────────────┘
        `}</pre>
      </div>
    </div>
  )
}

function OpenClawHubDiagram() {
  const skills = [
    { label: 'web-search', color: '#6366f1' },
    { label: 'memory', color: '#8b5cf6' },
    { label: 'github-profile', color: '#06b6d4' },
    { label: 'job-scorer', color: '#10b981' },
    { label: 'cover-letter', color: '#f59e0b' },
    { label: 'read-file', color: '#ec4899' },
  ]
  return (
    <div className="diagram diagram-hub">
      <div className="diagram-title">OpenClaw — Hub & Spoke Mental Model</div>
      <div className="hub-layout">
        <div className="hub-left">
          <div className="hub-channel-group">
            {['Telegram', 'WhatsApp', 'Discord', 'Web UI'].map((c) => (
              <motion.div key={c} className="hub-channel"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                {c}
              </motion.div>
            ))}
          </div>
          <div className="hub-arrow-label">channels</div>
        </div>
        <div className="hub-arrow">→</div>
        <motion.div className="hub-centre"
          initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="hub-centre-label">OPENCLAW</div>
          <div className="hub-centre-sub">Gateway + Runtime</div>
          <div className="hub-memory-badge">MEMORY.md</div>
        </motion.div>
        <div className="hub-arrow">→</div>
        <div className="hub-right">
          <div className="hub-skills-group">
            {skills.map((s, i) => (
              <motion.div key={s.label} className="hub-skill"
                style={{ '--skill-color': s.color }}
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                {s.label}
              </motion.div>
            ))}
          </div>
          <div className="hub-arrow-label">agentskills</div>
        </div>
      </div>
      <div className="diagram-caption">All of this runs on your Mac. Your data never leaves unless you call an external API.</div>
    </div>
  )
}

function OpenClawArchDiagram() {
  const channels = ['WhatsApp', 'Telegram', 'Discord', 'iMessage', 'Web UI']
  return (
    <div className="diagram diagram-openclaw">
      <div className="diagram-title">OpenClaw Architecture</div>
      <div className="diagram-openclaw-layout">
        <div className="diagram-channels">
          {channels.map((c) => (
            <motion.div key={c} className="diagram-channel-chip"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {c}
            </motion.div>
          ))}
        </div>
        <div className="diagram-arrow-right">→→→</div>
        <motion.div className="diagram-gateway"
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="gateway-label">GATEWAY</div>
          <div className="gateway-sub">Routes & controls</div>
        </motion.div>
        <div className="diagram-arrow-right">→→→</div>
        <motion.div className="diagram-runtime"
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="runtime-label">AGENT RUNTIME</div>
          <div className="runtime-sub">LLM + Skills + Memory</div>
          <div className="runtime-skills">
            <span>research</span><span>portfolio</span><span>jobs</span>
          </div>
        </motion.div>
      </div>
      <div className="diagram-caption">Your Mac. Your data. No cloud required.</div>
    </div>
  )
}

function AgentSkillDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-title">AgentSkill Structure</div>
      <div className="diagram-ascii">
        <pre>{`
export const skill = {
  name: 'tool_name',              ← LLM uses this to call it
  description: 'What it does',   ← LLM reads this to decide WHEN
  parameters: { ... }             ← JSON Schema for inputs
}

export async function handler(params) {
  // Do the work here
  return "result as string"      ← LLM reads this as the output
}
        `}</pre>
      </div>
    </div>
  )
}

function RAGPipelineDiagram() {
  const indexSteps = ['Your docs', '→', 'Split chunks', '→', 'Embed', '→', 'Vector DB']
  const querySteps = ['Question', '→', 'Embed question', '→', 'Find similar chunks', '→', 'LLM answers']
  return (
    <div className="diagram diagram-rag">
      <div className="diagram-title">RAG Pipeline</div>
      <div className="rag-phase">
        <div className="rag-phase-label">INDEX TIME (once)</div>
        <div className="rag-flow">
          {indexSteps.map((s, i) => (
            <span key={i} className={s === '→' ? 'rag-arrow' : 'rag-step'}>{s}</span>
          ))}
        </div>
      </div>
      <div className="rag-divider">↓ stored ↓</div>
      <div className="rag-phase">
        <div className="rag-phase-label">QUERY TIME (every question)</div>
        <div className="rag-flow">
          {querySteps.map((s, i) => (
            <span key={i} className={s === '→' ? 'rag-arrow' : 'rag-step'}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function LangGraphDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-title">LangGraph State Machine</div>
      <div className="diagram-ascii">
        <pre>{`
  decompose → search → read → evaluate ─── (sufficient?) ───▶ synthesise
                  ▲                │
                  │                └── (gaps found?) → search again
                  └─────────────────────────────── (max 2 loops)
        `}</pre>
      </div>
      <div className="diagram-caption">Nodes are functions. Edges are decisions. Conditional edges choose the path at runtime.</div>
    </div>
  )
}

function InterviewPrepDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-title">Interview Prep — Parallel Agent Flow</div>
      <div className="diagram-ascii">
        <pre>{`
  Input (JD + Company)
         │
    ┌────┴─────┐
    │          │  ← runs in PARALLEL
    ▼          ▼
  Research   Analyse
  Company     JD
    │          │
    └────┬─────┘
         │
    Retrieve Experience
    (from your Chroma DB)
         │
    Write Prep Sheet
    (STAR answers, questions, red flags)
        `}</pre>
      </div>
    </div>
  )
}

function JobEngineDiagram() {
  const steps = [
    { n: '01', label: 'Find Jobs', desc: 'Playwright scrapes LinkedIn' },
    { n: '02', label: 'Score Roles', desc: 'LLM scores vs your profile' },
    { n: '03', label: 'Prep Application', desc: 'Cover letter + context' },
    { n: '04', label: 'YOUR REVIEW', desc: 'Telegram YES/SKIP/DETAIL', highlight: true },
    { n: '05', label: 'Apply + Track', desc: 'Submit + Google Sheets' },
  ]
  return (
    <div className="diagram diagram-job-engine">
      <div className="diagram-title">The Job Engine</div>
      <div className="job-engine-steps">
        {steps.map((s, i) => (
          <div key={s.n} className={`job-step ${s.highlight ? 'job-step--highlight' : ''}`}>
            <motion.div className="job-step-content"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="job-step-num">{s.n}</div>
              <div className="job-step-label">{s.label}</div>
              <div className="job-step-desc">{s.desc}</div>
            </motion.div>
            {i < steps.length - 1 && <div className="job-step-connector">↓</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function MultiAgentDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-title">Hierarchical Multi-Agent System</div>
      <div className="diagram-ascii">
        <pre>{`
            ┌──────────────────────┐
            │    ORCHESTRATOR      │
            │  "parse goal, route  │
            │   to right agent"    │
            └──────────┬───────────┘
                       │
      ┌────────┬────────┼────────┬────────┐
      ▼        ▼        ▼        ▼        ▼
  Research  Portfolio  Data   Interview  Jobs
   Agent     Agent    Agent    Agent    Engine
  (mod 3)   (mod 4)  (mod 5)  (mod 6)  (mod 7)
        `}</pre>
      </div>
      <div className="diagram-caption">One interface. Five specialists. The orchestrator decides who does what.</div>
    </div>
  )
}

function ReactVerboseDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-title">What verbose=True Shows You</div>
      <div className="diagram-ascii">
        <pre>{`
  > Entering new AgentExecutor chain...

  Thought: The user wants the UK unemployment rate.
           I should search for this.

  Action: web_search
  Action Input: "UK unemployment rate 2026"

  Observation: UK unemployment fell to 4.2% in Jan 2026
               according to ONS data released Feb 2026...

  Thought: I now have enough information to answer.

  Final Answer: The UK unemployment rate is 4.2% as of
  January 2026 (ONS, February 2026).
        `}</pre>
      </div>
      <div className="diagram-caption">You are watching the AI reason in real time. Thought → Action → Observe → Repeat.</div>
    </div>
  )
}
