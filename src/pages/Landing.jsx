import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  {
    icon: '🧱',
    heading: 'You hit a wall.',
    body: 'You built something in Cursor, Lovable, or Replit. It worked. Then you tried to make it smarter — and didn\'t know what to do next.',
  },
  {
    icon: '🗺️',
    heading: 'You can see the potential. Not the path.',
    body: 'You know agents are the next thing. You can imagine what you\'d build. You just don\'t know how to get from here to there.',
  },
  {
    icon: '📚',
    heading: 'You\'ve started 5 courses. Finished 0.',
    body: 'Generic tutorials. Todo apps. Calculator projects. Nothing that matters to your actual life or business. You lose interest because none of it is real.',
  },
  {
    icon: '🎯',
    heading: 'You have a use case. No clear way to build it.',
    body: 'A dental practice that needs automation. A recruiting pipeline. A personal AI assistant. You can see it. You just can\'t build it. Yet.',
  },
]

const MODULE_PREVIEWS = [
  {
    industry: 'Dental Practice',
    icon: '🦷',
    color: '#14b8a6',
    role: 'Practice owner, 4 chairs',
    m3: 'Patient Recall Research Agent',
    m7: 'Dentally + Xero + SMS Automation',
    m7desc: 'Auto-invoice when treatment completes. SMS recalls for overdue patients. Insurance claims tracked and chased.',
    outcome: 'Your front desk stops chasing. The agent does it.',
  },
  {
    industry: 'Sales & Marketing',
    icon: '📣',
    color: '#f97316',
    role: 'Head of Marketing, B2B SaaS',
    m3: 'Lead Intelligence Research Agent',
    m7: 'Pipeline Automation — HubSpot + LinkedIn + Slack',
    m7desc: 'Qualify inbound leads, research target accounts, draft outreach sequences. Daily briefing in Slack before you open your laptop.',
    outcome: 'Your morning briefing writes itself. Leads qualify themselves.',
  },
  {
    industry: 'HR & Recruitment',
    icon: '💼',
    color: '#f472b6',
    role: 'Talent Acquisition Lead',
    m3: 'Candidate Research Agent',
    m7: 'Recruitment Engine — CV Screening + Interview Scheduling',
    m7desc: '50 CVs arrive. Agent scores them against the JD, surfaces top 5 with reasoning. Sends calendar invite to the shortlist. You just approve.',
    outcome: 'From job brief to shortlisted candidates — without touching your inbox.',
  },
  {
    industry: 'Personal Automation',
    icon: '🏡',
    color: '#a3e635',
    role: 'Builder with a day job',
    m3: 'Personal Research & News Agent',
    m7: 'Personal AI — Email + Finance + Content + Briefings',
    m7desc: 'Morning briefing at 7am. Email triage while you sleep. Personal finance tracked automatically. Side project tasks prioritised.',
    outcome: 'Your life runs on autopilot. You just handle exceptions.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    heading: 'Tell us your world.',
    body: 'Industry, role, tools, and what you want to automate. 5 minutes. No coding knowledge needed.',
    color: '#6366f1',
  },
  {
    step: '02',
    heading: 'Your course gets built.',
    body: 'One AI call generates your MEMORY.md, your Module 7 project brief, and tailored examples for every module. For you, not for a generic learner.',
    color: '#06b6d4',
  },
  {
    step: '03',
    heading: 'You build real things.',
    body: '9 modules. Each one produces a working agent. By Module 7, you have the system you described at step 1. Running. In production.',
    color: '#ec4899',
  },
  {
    step: '04',
    heading: 'It works for you. Every day.',
    body: 'Not a certificate. Not a portfolio project. An agent that runs in your sleep, handles your repetitive work, and answers to you.',
    color: '#10b981',
  },
]

const INDUSTRIES = [
  { icon: '🦷', label: 'Dental Practice' },
  { icon: '💻', label: 'Tech & Software' },
  { icon: '🧠', label: 'Data Science & AI' },
  { icon: '📊', label: 'Finance & Accounting' },
  { icon: '⚖️', label: 'Legal Practice' },
  { icon: '💼', label: 'HR & Recruitment' },
  { icon: '📣', label: 'Sales & Marketing' },
  { icon: '🏥', label: 'Healthcare' },
  { icon: '⚙️', label: 'Operations' },
  { icon: '🏠', label: 'Real Estate' },
  { icon: '🎨', label: 'Creative & Media' },
  { icon: '🎯', label: 'Consulting' },
  { icon: '🛒', label: 'E-commerce' },
  { icon: '📚', label: 'Education' },
  { icon: '🍽️', label: 'Hospitality' },
  { icon: '🏡', label: 'Personal Use' },
]

const OUTCOMES = [
  'A research agent that briefs you on anything in 3 minutes',
  'A knowledge base that knows your work better than you do',
  'An analytics agent that spots what you\'d miss in a spreadsheet',
  'A briefing agent that preps you for every meeting or interview',
  'Your Module 7 system — connected, automated, running',
  'A full orchestration layer that ties everything together',
]

// ─── Animated hero preview card ───────────────────────────────────────────────
function HeroPreview() {
  const [activeModule, setActiveModule] = useState(6)

  useEffect(() => {
    const t = setInterval(() => {
      setActiveModule(prev => (prev >= 8 ? 3 : prev + 1))
    }, 1800)
    return () => clearInterval(t)
  }, [])

  const modules = [
    { n: 0, label: 'Foundations', done: true },
    { n: 1, label: 'First Agent', done: true },
    { n: 2, label: 'OpenClaw', done: true },
    { n: 3, label: 'Research Agent', done: false },
    { n: 4, label: 'Knowledge Base', done: false },
    { n: 5, label: 'Data Analysis', done: false },
    { n: 6, label: 'Briefing Agent', done: false },
    { n: 7, label: 'Your Big Build', done: false, big: true },
    { n: 8, label: 'Orchestration', done: false },
  ]

  return (
    <div className="lp-hero-preview">
      <div className="lp-preview-topbar">
        <div className="lp-preview-dots">
          <span /><span /><span />
        </div>
        <div className="lp-preview-url">openlearn.academy</div>
      </div>
      <div className="lp-preview-body">
        <div className="lp-preview-eyebrow">Sales & Marketing · 30-Day Build Programme</div>
        <div className="lp-preview-title">Deepak's Business Automation Playbook</div>
        <div className="lp-preview-xp">
          <span className="lp-preview-xp-bar"><span style={{ width: '38%' }} /></span>
          <span className="lp-preview-xp-label">1,150 XP · Module 4 of 9</span>
        </div>
        <div className="lp-preview-modules">
          {modules.map(m => (
            <motion.div
              key={m.n}
              className={`lp-preview-mod ${m.done ? 'lp-preview-mod--done' : ''} ${activeModule === m.n ? 'lp-preview-mod--active' : ''} ${m.big ? 'lp-preview-mod--big' : ''}`}
              animate={activeModule === m.n ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="lp-preview-mod-n">M{m.n}</span>
              <span className="lp-preview-mod-label">{m.label}</span>
              {m.done && <span className="lp-preview-mod-check">✓</span>}
              {activeModule === m.n && !m.done && <span className="lp-preview-mod-pulse" />}
            </motion.div>
          ))}
        </div>
        <div className="lp-preview-module7">
          <div className="lp-preview-m7-eyebrow">✦ Your Module 7 project</div>
          <div className="lp-preview-m7-title">Pipeline Automation — HubSpot + LinkedIn + Slack</div>
          <div className="lp-preview-m7-chips">
            <span>HubSpot</span><span>LinkedIn API</span><span>Slack</span><span>Telegram review</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Module preview tabs ───────────────────────────────────────────────────────
function ModulePreviewSection() {
  const [active, setActive] = useState(0)
  const preview = MODULE_PREVIEWS[active]

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % MODULE_PREVIEWS.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="lp-section lp-section--dark" id="modules">
      <div className="lp-container">
        <div className="lp-section-eyebrow">What you actually build</div>
        <h2 className="lp-section-heading">
          Module 7 is different for everyone.
          <br />
          <span className="lp-gradient-text">Because you are.</span>
        </h2>
        <p className="lp-section-sub">
          The frameworks and methodology are universal. The project, the Cursor prompts,
          and the system you ship are built around your world.
        </p>

        {/* Industry tabs */}
        <div className="lp-preview-tabs">
          {MODULE_PREVIEWS.map((p, i) => (
            <button
              key={i}
              className={`lp-preview-tab ${active === i ? 'lp-preview-tab--active' : ''}`}
              style={active === i ? { borderColor: p.color, color: p.color } : {}}
              onClick={() => setActive(i)}
            >
              <span>{p.icon}</span> {p.industry}
            </button>
          ))}
        </div>

        {/* Preview card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="lp-module-preview-card"
            style={{ borderColor: preview.color + '40' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <div className="lp-module-preview-left">
              <div className="lp-module-preview-persona">
                <span className="lp-module-preview-icon" style={{ background: preview.color + '20', color: preview.color }}>{preview.icon}</span>
                <div>
                  <div className="lp-module-preview-industry" style={{ color: preview.color }}>{preview.industry}</div>
                  <div className="lp-module-preview-role">{preview.role}</div>
                </div>
              </div>
              <div className="lp-module-preview-modules-list">
                <div className="lp-module-preview-mod-row lp-module-preview-mod-row--done">
                  <span>M3</span> {preview.m3}
                </div>
                <div className="lp-module-preview-mod-row">
                  <span>M4</span> Knowledge base from their data
                </div>
                <div className="lp-module-preview-mod-row">
                  <span>M5</span> Data analysis for their domain
                </div>
                <div className="lp-module-preview-mod-row">
                  <span>M6</span> Briefing agent for their context
                </div>
                <div className="lp-module-preview-mod-row lp-module-preview-mod-row--big" style={{ borderColor: preview.color }}>
                  <span style={{ color: preview.color }}>M7</span>
                  <span style={{ color: preview.color, fontWeight: 700 }}>{preview.m7}</span>
                </div>
              </div>
            </div>
            <div className="lp-module-preview-right">
              <div className="lp-module-preview-build">
                <div className="lp-module-preview-build-label" style={{ color: preview.color }}>✦ Their Module 7 build</div>
                <div className="lp-module-preview-build-title">{preview.m7}</div>
                <div className="lp-module-preview-build-desc">{preview.m7desc}</div>
                <div className="lp-module-preview-outcome">
                  <span className="lp-module-preview-outcome-icon">→</span>
                  {preview.outcome}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Landing page ─────────────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <div className="lp-root">

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-nav-logo">
            <span className="lp-nav-logo-mark">◈</span>
            <span>OpenLearn</span>
          </div>
          <div className="lp-nav-links">
            <a href="#how" className="lp-nav-link">How it works</a>
            <a href="#modules" className="lp-nav-link">What you build</a>
            <a href="#industries" className="lp-nav-link">Industries</a>
          </div>
          <motion.button
            className="lp-nav-cta"
            onClick={() => navigate('/onboarding')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Start building →
          </motion.button>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="lp-hero" ref={heroRef}>
        <div className="lp-hero-bg">
          <div className="lp-hero-glow lp-hero-glow--1" />
          <div className="lp-hero-glow lp-hero-glow--2" />
          <div className="lp-hero-grid" />
        </div>

        <div className="lp-hero-inner">
          <motion.div
            className="lp-hero-left"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="lp-hero-eyebrow">
              <span className="lp-hero-eyebrow-dot" />
              For builders on Cursor · Lovable · Replit
            </div>
            <h1 className="lp-hero-headline">
              You found Cursor.
              <br />
              <span className="lp-gradient-text">Now go further.</span>
            </h1>
            <p className="lp-hero-sub">
              OpenLearn is the 30-day programme that turns vibe coders into agentic engineers.
              Adapted to your industry, your tools, your actual automation goal.
              Real systems — not tutorials that go nowhere.
            </p>

            <div className="lp-hero-ctas">
              <motion.button
                className="lp-cta-primary"
                onClick={() => navigate('/onboarding')}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 40px rgba(99,102,241,0.55)' }}
                whileTap={{ scale: 0.97 }}
              >
                Build my custom course →
              </motion.button>
              <a href="#modules" className="lp-cta-secondary">See what you'll build</a>
            </div>

            <div className="lp-hero-proof">
              <div className="lp-hero-proof-item">
                <span className="lp-hero-proof-num">9</span>
                <span className="lp-hero-proof-label">modules</span>
              </div>
              <div className="lp-hero-proof-divider" />
              <div className="lp-hero-proof-item">
                <span className="lp-hero-proof-num">30</span>
                <span className="lp-hero-proof-label">days</span>
              </div>
              <div className="lp-hero-proof-divider" />
              <div className="lp-hero-proof-item">
                <span className="lp-hero-proof-num">16</span>
                <span className="lp-hero-proof-label">industries</span>
              </div>
              <div className="lp-hero-proof-divider" />
              <div className="lp-hero-proof-item">
                <span className="lp-hero-proof-num">1</span>
                <span className="lp-hero-proof-label">working system built for YOUR world</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lp-hero-right"
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ y: heroY }}
          >
            <HeroPreview />
          </motion.div>
        </div>
      </section>

      {/* ── Pain points ──────────────────────────────────────────────────── */}
      <section className="lp-section lp-section--pain">
        <div className="lp-container">
          <div className="lp-section-eyebrow">Sound familiar?</div>
          <h2 className="lp-section-heading">
            You're not stuck because you're not smart enough.
            <br />You're stuck because no course was built for where you actually are.
          </h2>
          <div className="lp-pain-grid">
            {PAIN_POINTS.map((p, i) => (
              <motion.div
                key={i}
                className="lp-pain-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="lp-pain-icon">{p.icon}</div>
                <h3 className="lp-pain-heading">{p.heading}</h3>
                <p className="lp-pain-body">{p.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="lp-pain-resolution"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="lp-pain-resolution-text">
              OpenLearn is built for exactly this moment.
              <br />
              <span>The course adapts to you. The projects are real. You actually finish it.</span>
            </div>
            <motion.button
              className="lp-cta-primary"
              onClick={() => navigate('/onboarding')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Build my course — it's free →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── What you'll have ─────────────────────────────────────────────── */}
      <section className="lp-section lp-section--outcomes">
        <div className="lp-container">
          <div className="lp-outcomes-layout">
            <div className="lp-outcomes-left">
              <div className="lp-section-eyebrow">30 days from now</div>
              <h2 className="lp-section-heading lp-section-heading--sm">
                You'll have built
                <br />
                <span className="lp-gradient-text">six working systems.</span>
              </h2>
              <p className="lp-outcomes-sub">
                Not projects that live in a tutorial. Systems that run in your actual world.
                Every module ships something deployable.
              </p>
              <motion.button
                className="lp-cta-primary"
                onClick={() => navigate('/onboarding')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start building →
              </motion.button>
            </div>
            <div className="lp-outcomes-right">
              {OUTCOMES.map((o, i) => (
                <motion.div
                  key={i}
                  className="lp-outcome-row"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <span className="lp-outcome-num">M{i + 3}</span>
                  <span className="lp-outcome-text">{o}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it adapts ────────────────────────────────────────────────── */}
      <section className="lp-section lp-section--how" id="how">
        <div className="lp-container">
          <div className="lp-section-eyebrow">The process</div>
          <h2 className="lp-section-heading">
            5 minutes to set up.
            <br />
            <span className="lp-gradient-text">30 days to transform.</span>
          </h2>
          <p className="lp-section-sub">
            The course doesn't ask you to adapt to it. It adapts to you.
            Tell us your world — we build the curriculum around it.
          </p>
          <div className="lp-how-grid">
            {HOW_IT_WORKS.map((h, i) => (
              <motion.div
                key={i}
                className="lp-how-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="lp-how-step" style={{ color: h.color, borderColor: h.color + '40' }}>{h.step}</div>
                <h3 className="lp-how-heading">{h.heading}</h3>
                <p className="lp-how-body">{h.body}</p>
                <div className="lp-how-line" style={{ background: `linear-gradient(90deg, ${h.color}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Module preview ───────────────────────────────────────────────── */}
      <ModulePreviewSection />

      {/* ── Industries ───────────────────────────────────────────────────── */}
      <section className="lp-section" id="industries">
        <div className="lp-container">
          <div className="lp-section-eyebrow">Built for your world</div>
          <h2 className="lp-section-heading">
            16 industries.
            <br />
            <span className="lp-gradient-text">One course. Yours.</span>
          </h2>
          <p className="lp-section-sub">
            Whether you're a dental practice owner, a recruiter, a data scientist, or someone
            who just wants to automate their life — the course builds around your specific context.
          </p>
          <div className="lp-industry-grid">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={i}
                className="lp-industry-chip"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                whileHover={{ scale: 1.06, borderColor: 'rgba(99,102,241,0.5)' }}
              >
                <span>{ind.icon}</span>
                <span>{ind.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="lp-industries-cta">
            <motion.button
              className="lp-cta-primary"
              onClick={() => navigate('/onboarding')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Find your industry →
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── The AI Key ───────────────────────────────────────────────────── */}
      <section className="lp-section lp-section--key">
        <div className="lp-container">
          <div className="lp-key-layout">
            <div className="lp-key-left">
              <div className="lp-section-eyebrow">The intelligence layer</div>
              <h2 className="lp-section-heading lp-section-heading--sm">
                Your OpenAI key.
                <br />
                <span className="lp-gradient-text">One call. Your course.</span>
              </h2>
              <p className="lp-key-body">
                At the end of onboarding, you enter your OpenAI key. We make one API call — about $0.002 — that generates your personalised MEMORY.md, your Module 7 project brief, and tailored examples for every domain module.
              </p>
              <p className="lp-key-body">
                The key is never stored. It's used once and discarded. Everything generated gets saved locally in your browser.
              </p>
              <div className="lp-key-facts">
                <div className="lp-key-fact"><span>~$0.002</span> one generation call</div>
                <div className="lp-key-fact"><span>0 stored</span> key never saved</div>
                <div className="lp-key-fact"><span>100% local</span> your data stays yours</div>
              </div>
            </div>
            <div className="lp-key-right">
              <div className="lp-key-card">
                <div className="lp-key-card-header">
                  <span className="lp-key-card-dot lp-key-card-dot--green" />
                  <span className="lp-key-card-title">Generating your course...</span>
                </div>
                {[
                  'Reading your profile...',
                  'Designing your Module 7 project...',
                  'Writing your MEMORY.md...',
                  'Tailoring your use cases...',
                  'Course ready.',
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    className="lp-key-step"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <span className="lp-key-step-check">✓</span>
                    {step}
                  </motion.div>
                ))}
                <div className="lp-key-result">
                  <div className="lp-key-result-label">✦ Your Module 7 project</div>
                  <div className="lp-key-result-title">Sales Pipeline Automation — HubSpot + LinkedIn + Slack</div>
                  <div className="lp-key-result-chips">
                    <span>HubSpot API</span><span>LinkedIn API</span><span>Slack</span><span>Telegram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="lp-final">
        <div className="lp-final-bg">
          <div className="lp-final-glow" />
        </div>
        <div className="lp-container lp-final-inner">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="lp-final-eyebrow">
              <span className="lp-final-eyebrow-dot" />
              Free · Adapts to you · Starts in 5 minutes
            </div>
            <h2 className="lp-final-heading">
              Stop watching tutorials.
              <br />
              <span className="lp-gradient-text">Start shipping agents.</span>
            </h2>
            <p className="lp-final-sub">
              The gap between vibe coding and agentic engineering is 30 days of the right structure.
              Tell us your world. We'll build the course. You build the system.
            </p>
            <motion.button
              className="lp-cta-primary lp-cta-primary--lg"
              onClick={() => navigate('/onboarding')}
              whileHover={{ scale: 1.04, boxShadow: '0 12px 60px rgba(99,102,241,0.6)' }}
              whileTap={{ scale: 0.97 }}
            >
              Build my custom course — it's free →
            </motion.button>
            <p className="lp-final-note">
              5 minutes to personalise · 30 days to build · No subscription · Your data stays local
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-inner">
          <div className="lp-footer-logo">
            <span className="lp-nav-logo-mark">◈</span> OpenLearn
          </div>
          <div className="lp-footer-note">
            Built for builders. Adapted to your world.
          </div>
        </div>
      </footer>
    </div>
  )
}
