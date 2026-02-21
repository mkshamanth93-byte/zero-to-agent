import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserProfile, EMPTY_PROFILE } from '../hooks/useUserProfile'
import { INDUSTRY_OPTIONS, BUSINESS_TYPES, GOAL_TRACKS, COMMON_TOOLS } from '../data/industryTemplates'

const TOTAL_STEPS = 4

// Tips shown in the guidance panel — one per field on each step
const STEP_TIPS = {
  1: {
    default: {
      heading: 'This course adapts to you.',
      body: 'The more specific you are here, the more your course content, MEMORY.md template, and final project will match your actual world. Take 2 minutes on this — it shapes the next 30 days.',
      examples: [],
    },
    role: {
      heading: 'Be specific about what you actually do.',
      body: 'Not your job title — what you do day-to-day. The agent needs to understand your world to give relevant examples.',
      examples: [
        '"Dental practice owner — I run a 4-chair clinic and deal with patient scheduling, Xero invoicing, and insurance claims"',
        '"HR Manager at a 60-person startup — I own recruitment, onboarding, and engagement surveys"',
        '"Freelance financial consultant — I prep management accounts for SMB clients using QuickBooks"',
        '"Data Scientist at a retail bank — I build ML models but want to move into agentic AI engineering"',
      ],
    },
    industry: {
      heading: 'Pick the closest match.',
      body: 'If you\'re in between — pick the one where you spend most of your automation energy. You can describe nuances in the next step.',
      examples: [],
    },
    businessType: {
      heading: 'How big is the world this agent will operate in?',
      body: 'This affects the complexity of the systems we\'ll connect and the scale of the automation we design.',
      examples: [],
    },
  },
  2: {
    default: {
      heading: 'What do you want this agent to do?',
      body: 'Think about your week. What takes hours but follows the same pattern every time? That\'s your automation target. The clearer you are, the more specific your course becomes.',
      examples: [],
    },
    goalTrack: {
      heading: 'Pick your primary goal.',
      body: 'You can only pick one — but the agent you build will be useful beyond it. Choose where you want the 30-day project to land.',
      examples: [],
    },
    automationGoal: {
      heading: 'The one thing you\'d automate first.',
      body: 'This doesn\'t have to be the final system. Think about the most painful, repeated task in your week — the one you dread doing manually.',
      examples: [
        '"Spend 3 hours every Monday chasing overdue invoices by email — I want the agent to draft and send those for me"',
        '"Screen 50 CVs per week — I want the agent to score them against the JD and surface the top 5"',
        '"Write cover letters for jobs I find — it takes an hour each and I hate it"',
        '"Reconcile bank transactions in Xero every day — flag the unmatched ones and explain what they probably are"',
      ],
    },
    projectDescription: {
      heading: 'Describe your system clearly.',
      body: 'The more specific, the better. Name the software it needs to connect to. Describe what the agent should do, and what the human approves before it acts. This becomes your Module 7-8 project brief.',
      examples: [
        '"Connect my Dentally PMS to Xero — when a treatment is completed, auto-generate an invoice and send it to the patient. Flag any insurance claims over 30 days old."',
        '"Build a recruitment engine — takes a job brief, writes the JD, posts to LinkedIn and Indeed, screens CVs against the spec, and sends me a ranked shortlist in Telegram."',
        '"Automate my monthly management accounts — pull P&L from Xero, generate a 1-page commentary, and format it as a Word doc for my review."',
      ],
    },
  },
  3: {
    default: {
      heading: 'What systems does your agent need to connect to?',
      body: 'Tick everything you currently use. The more you select, the more specific your MEMORY.md template and Module 7 build instructions become. Don\'t worry about how they connect — that\'s what the course teaches.',
      examples: [],
    },
    successVision: {
      heading: 'What does "done" look like for you?',
      body: 'Describe the moment when you know this was worth 30 days. Be specific — what are you able to do that you can\'t do today?',
      examples: [
        '"I wake up and Telegram sends me: 3 new job matches, scored against my profile, with draft applications ready for my review."',
        '"My dental practice runs its daily patient reminders without me touching it. Xero reconciles overnight. I see exceptions only."',
        '"I paste a job description into Telegram and 60 seconds later I have a company brief, skills match score, and draft cover letter."',
      ],
    },
  },
  4: {
    default: {
      heading: 'Your custom course is ready.',
      body: 'Based on your profile, we\'ve personalised your 30-day journey. The module structure is the same for everyone — what changes is the examples, the projects, the MEMORY.md template, and your Module 7 build.',
      examples: [],
    },
  },
}

function TipsPanel({ step, activeField, profile }) {
  const stepTips = STEP_TIPS[step] || {}
  const tip = (activeField && stepTips[activeField]) || stepTips.default || STEP_TIPS[1].default

  return (
    <motion.div
      className="ob-tips-panel"
      key={tip.heading}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="ob-tips-header">
        <span className="ob-tips-icon">◈</span>
        <span className="ob-tips-label">Guidance</span>
      </div>
      <h3 className="ob-tips-heading">{tip.heading}</h3>
      <p className="ob-tips-body">{tip.body}</p>
      {tip.examples.length > 0 && (
        <div className="ob-tips-examples">
          <div className="ob-tips-examples-label">Example answers:</div>
          {tip.examples.map((ex, i) => (
            <div key={i} className="ob-tips-example">{ex}</div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function ProgressBar({ step }) {
  return (
    <div className="ob-progress">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} className={`ob-progress-dot ${i < step ? 'ob-progress-dot--done' : ''} ${i === step - 1 ? 'ob-progress-dot--active' : ''}`} />
      ))}
      <span className="ob-progress-label">Step {step} of {TOTAL_STEPS}</span>
    </div>
  )
}

// ─── Step 1: Who You Are ─────────────────────────────────────────────────────
function Step1({ form, onChange, onFocus }) {
  return (
    <div className="ob-step">
      <div className="ob-step-heading">
        <h2>Tell us about your world.</h2>
        <p>The more specific you are, the more your course adapts to what you actually do.</p>
      </div>

      <div className="ob-field">
        <label className="ob-label">Your name</label>
        <input
          className="ob-input"
          type="text"
          placeholder="e.g. Deekshita"
          value={form.name}
          onChange={e => onChange('name', e.target.value)}
          onFocus={() => onFocus('name')}
        />
      </div>

      <div className="ob-field">
        <label className="ob-label">
          What do you do? <span className="ob-label-hint">Be specific — your role, your context, what you deal with day-to-day</span>
        </label>
        <textarea
          className="ob-textarea"
          rows={3}
          placeholder='e.g. "Dental practice owner — 4-chair clinic, I manage scheduling, Xero invoicing, and patient comms"'
          value={form.role}
          onChange={e => onChange('role', e.target.value)}
          onFocus={() => onFocus('role')}
        />
      </div>

      <div className="ob-field">
        <label className="ob-label">Your industry</label>
        <div className="ob-pill-grid" onFocus={() => onFocus('industry')}>
          {INDUSTRY_OPTIONS.map(opt => (
            <button
              key={opt.id}
              type="button"
              className={`ob-pill ${form.industry === opt.id ? 'ob-pill--selected' : ''}`}
              onClick={() => onChange('industry', opt.id)}
            >
              <span className="ob-pill-icon">{opt.icon}</span>
              <span className="ob-pill-label">{opt.label}</span>
              <span className="ob-pill-desc">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="ob-field">
        <label className="ob-label">Business scale</label>
        <div className="ob-segment" onFocus={() => onFocus('businessType')}>
          {BUSINESS_TYPES.map(bt => (
            <button
              key={bt.id}
              type="button"
              className={`ob-segment-btn ${form.businessType === bt.id ? 'ob-segment-btn--active' : ''}`}
              onClick={() => onChange('businessType', bt.id)}
            >
              <span className="ob-segment-label">{bt.label}</span>
              <span className="ob-segment-desc">{bt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Step 2: What You Want to Build ──────────────────────────────────────────
function Step2({ form, onChange, onFocus }) {
  return (
    <div className="ob-step">
      <div className="ob-step-heading">
        <h2>What do you want to build?</h2>
        <p>This shapes your Module 7 project and the examples throughout the course.</p>
      </div>

      <div className="ob-field" onFocus={() => onFocus('goalTrack')}>
        <label className="ob-label">Your primary goal</label>
        <div className="ob-track-grid">
          {GOAL_TRACKS.map(track => (
            <button
              key={track.id}
              type="button"
              className={`ob-track-card ${form.goalTrack === track.id ? 'ob-track-card--selected' : ''}`}
              onClick={() => onChange('goalTrack', track.id)}
            >
              <div className="ob-track-icon">{track.icon}</div>
              <div className="ob-track-label">{track.label}</div>
              <div className="ob-track-desc">{track.desc}</div>
              <div className="ob-track-examples">
                {track.examples.map((ex, i) => <span key={i} className="ob-track-example-chip">{ex}</span>)}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="ob-field">
        <label className="ob-label">
          The one thing you'd automate first
          <span className="ob-label-hint"> — what repeated task takes the most of your time?</span>
        </label>
        <textarea
          className="ob-textarea"
          rows={3}
          placeholder='e.g. "I spend 3 hours every Monday chasing overdue invoices by email. I want the agent to draft those for me."'
          value={form.automationGoal}
          onChange={e => onChange('automationGoal', e.target.value)}
          onFocus={() => onFocus('automationGoal')}
        />
      </div>

      {form.goalTrack === 'project' && (
        <motion.div
          className="ob-field"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <label className="ob-label">
            Describe your project
            <span className="ob-label-hint"> — what systems need to connect, what should the agent do, what does the human approve?</span>
          </label>
          <textarea
            className="ob-textarea ob-textarea--large"
            rows={5}
            placeholder={`e.g. "Connect my Dentally PMS to Xero — when a treatment is completed, auto-generate an invoice and send to the patient. Flag any insurance claims over 30 days old. I want to approve each invoice before it's sent."`}
            value={form.projectDescription}
            onChange={e => onChange('projectDescription', e.target.value)}
            onFocus={() => onFocus('projectDescription')}
          />
          <div className="ob-field-note">
            💡 Name the software. Describe the flow. Say what you want to approve vs what runs automatically. This becomes your 30-day project brief.
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ─── Step 3: Your Tools ───────────────────────────────────────────────────────
function Step3({ form, onChange, onFocus }) {
  const toggleTool = (id) => {
    const current = form.tools || []
    const next = current.includes(id) ? current.filter(t => t !== id) : [...current, id]
    onChange('tools', next)
  }

  const grouped = COMMON_TOOLS.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = []
    acc[tool.category].push(tool)
    return acc
  }, {})

  const categoryLabels = {
    accounting: 'Accounting & Finance',
    crm: 'CRM & Sales',
    comms: 'Communication',
    productivity: 'Productivity & Project Mgmt',
    dev: 'Development',
    ecommerce: 'E-commerce',
    payments: 'Payments',
  }

  return (
    <div className="ob-step">
      <div className="ob-step-heading">
        <h2>What tools do you already use?</h2>
        <p>Select everything in your stack. Your MEMORY.md template and Module 7 build will reference these specifically.</p>
      </div>

      <div className="ob-field" onFocus={() => onFocus('default')}>
        {Object.entries(grouped).map(([cat, tools]) => (
          <div key={cat} className="ob-tool-group">
            <div className="ob-tool-group-label">{categoryLabels[cat] || cat}</div>
            <div className="ob-tool-chips">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  type="button"
                  className={`ob-tool-chip ${(form.tools || []).includes(tool.id) ? 'ob-tool-chip--selected' : ''}`}
                  onClick={() => toggleTool(tool.id)}
                >
                  {tool.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="ob-tool-group">
          <div className="ob-tool-group-label">Other / Custom</div>
          <input
            className="ob-input"
            type="text"
            placeholder="e.g. Dentally, Practice Panther, Cin7, custom in-house software..."
            value={form.customTool}
            onChange={e => onChange('customTool', e.target.value)}
          />
        </div>
      </div>

      <div className="ob-field">
        <label className="ob-label">
          What does success look like for you?
          <span className="ob-label-hint"> — describe the moment when you know this was worth 30 days</span>
        </label>
        <textarea
          className="ob-textarea"
          rows={3}
          placeholder={`e.g. "I wake up and Telegram has already sent me today's priority exceptions, drafted the overdue invoice chasers, and queued 3 job applications for my approval. I just review and approve."`}
          value={form.successVision}
          onChange={e => onChange('successVision', e.target.value)}
          onFocus={() => onFocus('successVision')}
        />
      </div>
    </div>
  )
}

// ─── Step 4: Preview & Confirm ───────────────────────────────────────────────
function Step4({ form }) {
  const { INDUSTRY_TEMPLATES } = require('../data/industryTemplates')
  const { generateCourseProfile } = require('../utils/generateCourse')

  let courseData = null
  try {
    courseData = generateCourseProfile(form)
  } catch (e) {
    courseData = null
  }

  const template = INDUSTRY_TEMPLATES[form.industry] || INDUSTRY_TEMPLATES['tech-career']

  return (
    <div className="ob-step">
      <div className="ob-step-heading">
        <h2>Your course is personalised.</h2>
        <p>Here's what's been adapted based on your profile. You can always edit this later from settings.</p>
      </div>

      {courseData && (
        <>
          <div className="ob-preview-card">
            <div className="ob-preview-course-title" style={{ color: template.color }}>
              {courseData.courseTitle}
            </div>
            <div className="ob-preview-subtitle">{courseData.subtitle}</div>
          </div>

          <div className="ob-preview-section">
            <div className="ob-preview-section-label">Your Module 7 project</div>
            <div className="ob-preview-project">
              <div className="ob-preview-project-title">{courseData.module7.title}</div>
              <div className="ob-preview-project-desc">{courseData.module7.subtitle || courseData.module7.description}</div>
            </div>
          </div>

          <div className="ob-preview-section">
            <div className="ob-preview-section-label">Use cases you'll build toward</div>
            <div className="ob-preview-use-cases">
              {(courseData.useCases || []).slice(0, 4).map((uc, i) => (
                <div key={i} className="ob-preview-use-case">
                  <span className="ob-preview-use-case-dot" style={{ background: template.color }} />
                  {uc}
                </div>
              ))}
            </div>
          </div>

          <div className="ob-preview-section">
            <div className="ob-preview-section-label">Your MEMORY.md will cover</div>
            <div className="ob-preview-memory">
              {(courseData.memoryMdGuide?.sections || []).map((s, i) => (
                <div key={i} className="ob-preview-memory-section">✦ {s}</div>
              ))}
            </div>
          </div>

          {form.goalTrack === 'project' && form.projectDescription && (
            <div className="ob-preview-section ob-preview-project-callout">
              <div className="ob-preview-section-label">Your custom project brief</div>
              <div className="ob-preview-project-brief">{form.projectDescription}</div>
            </div>
          )}
        </>
      )}

      <div className="ob-preview-note">
        The 9-module teaching structure is the same for everyone. What adapts is the examples, the projects, your MEMORY.md template, and your final build. The foundations are universal — the destination is yours.
      </div>
    </div>
  )
}

// ─── Main Onboarding Component ────────────────────────────────────────────────
export default function Onboarding() {
  const navigate = useNavigate()
  const { saveProfile } = useUserProfile()
  const [step, setStep] = useState(0) // 0 = landing, 1-4 = form steps
  const [form, setForm] = useState({ ...EMPTY_PROFILE })
  const [activeField, setActiveField] = useState(null)

  const onChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const onFocus = (field) => setActiveField(field)

  const canProceed = () => {
    if (step === 1) return form.name.trim() && form.role.trim() && form.industry && form.businessType
    if (step === 2) return form.goalTrack && form.automationGoal.trim()
    if (step === 3) return true // tools optional
    return true
  }

  const handleNext = () => {
    if (step === 0) { setStep(1); return }
    if (step < TOTAL_STEPS) { setStep(s => s + 1); setActiveField(null); return }
    // Final submit
    saveProfile(form)
    navigate('/')
  }

  const handleBack = () => {
    if (step <= 1) { setStep(0); return }
    setStep(s => s - 1)
    setActiveField(null)
  }

  // ── Landing screen ────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="ob-landing">
        <div className="ob-landing-bg" />
        <motion.div
          className="ob-landing-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="ob-landing-eyebrow">Agentic AI · 30-Day Build Programme</div>
          <h1 className="ob-landing-title">
            Build your personal AI.<br />Tailored to your world.
          </h1>
          <p className="ob-landing-desc">
            This isn't a generic AI course. You'll answer 3 minutes of questions about your industry, your tools, and what you want to automate — and the course adapts: the examples, the projects, your final build, and your AI's starting knowledge base.
          </p>

          <div className="ob-landing-tracks">
            {GOAL_TRACKS.map(track => (
              <div key={track.id} className="ob-landing-track">
                <span className="ob-landing-track-icon">{track.icon}</span>
                <div>
                  <div className="ob-landing-track-label">{track.label}</div>
                  <div className="ob-landing-track-examples">{track.examples.slice(0, 2).join(' · ')}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ob-landing-industries">
            {INDUSTRY_OPTIONS.slice(0, 6).map(ind => (
              <div key={ind.id} className="ob-landing-industry-chip">
                <span>{ind.icon}</span> {ind.label}
              </div>
            ))}
          </div>

          <div className="ob-landing-promise">
            <div className="ob-promise-item">
              <span className="ob-promise-num">9</span>
              <span className="ob-promise-label">modules</span>
            </div>
            <div className="ob-promise-item">
              <span className="ob-promise-num">30</span>
              <span className="ob-promise-label">days</span>
            </div>
            <div className="ob-promise-item">
              <span className="ob-promise-num">1</span>
              <span className="ob-promise-label">working system, built for your world</span>
            </div>
          </div>

          <motion.button
            className="ob-landing-cta"
            onClick={handleNext}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Build my custom course →
          </motion.button>

          <p className="ob-landing-note">3 minutes to set up. 30 days to transform how you work.</p>
        </motion.div>
      </div>
    )
  }

  // ── Form steps ────────────────────────────────────────────────────────────
  return (
    <div className="ob-page">
      <div className="ob-page-bg" />

      <div className="ob-layout">
        {/* Left column — form */}
        <div className="ob-form-col">
          <div className="ob-form-header">
            <button className="ob-back-btn" onClick={handleBack}>← Back</button>
            <ProgressBar step={step} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <Step1 form={form} onChange={onChange} onFocus={onFocus} />}
              {step === 2 && <Step2 form={form} onChange={onChange} onFocus={onFocus} />}
              {step === 3 && <Step3 form={form} onChange={onChange} onFocus={onFocus} />}
              {step === 4 && <Step4 form={form} />}
            </motion.div>
          </AnimatePresence>

          <div className="ob-form-footer">
            <motion.button
              className={`ob-next-btn ${!canProceed() ? 'ob-next-btn--disabled' : ''}`}
              onClick={canProceed() ? handleNext : undefined}
              whileHover={canProceed() ? { scale: 1.02 } : {}}
              whileTap={canProceed() ? { scale: 0.98 } : {}}
            >
              {step === TOTAL_STEPS ? 'Start my course →' : 'Continue →'}
            </motion.button>
            {!canProceed() && step < TOTAL_STEPS && (
              <p className="ob-required-note">Fill in the required fields above to continue.</p>
            )}
          </div>
        </div>

        {/* Right column — live tips panel */}
        <div className="ob-tips-col">
          <TipsPanel step={step} activeField={activeField} profile={form} />

          {/* Industry use cases preview (shown after industry is selected) */}
          {step >= 1 && form.industry && form.industry !== 'other' && (
            <motion.div
              className="ob-tips-use-cases"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="ob-tips-use-cases-label">What people in your field automate:</div>
              {(INDUSTRY_OPTIONS.find(i => i.id === form.industry) ?
                Object.values(require('../data/industryTemplates').INDUSTRY_TEMPLATES[form.industry]?.useCases || []).slice(0, 3) : []
              ).map((uc, i) => (
                <div key={i} className="ob-tips-use-case-item">→ {uc}</div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
