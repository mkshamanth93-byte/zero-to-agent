import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserProfile, EMPTY_PROFILE } from '../hooks/useUserProfile'
import { INDUSTRY_OPTIONS, BUSINESS_TYPES, GOAL_TRACKS, COMMON_TOOLS, INDUSTRY_TEMPLATES } from '../data/industryTemplates'
import { generateCourseProfile } from '../utils/generateCourse'
import { generateWithLLM, GENERATION_STAGES } from '../utils/llmGenerate'
import { PRESETS } from '../data/presets'

const TOTAL_STEPS = 5   // 1=who, 2=what, 3=tools, 4=generate, 5=preview

// ─── Tips panel ──────────────────────────────────────────────────────────────
const TIPS = {
  1: {
    default: {
      heading: 'This course adapts to you.',
      body: 'The more specific you are here, the more your course content, MEMORY.md, and final project will match your actual world. Take 2 minutes — it shapes the next 30 days.',
      examples: [],
    },
    role: {
      heading: 'Be specific about what you actually do.',
      body: 'Not your job title — what you do day-to-day, what software you deal with, what problems land on your desk.',
      examples: [
        '"Dental practice owner — 4-chair clinic, patient scheduling, Xero invoicing, insurance claims"',
        '"HR Manager at a 60-person startup — recruitment, onboarding, engagement surveys"',
        '"Freelance financial consultant — management accounts for SMB clients in QuickBooks"',
        '"Data Scientist at a retail bank — ML models, moving into agentic AI"',
      ],
    },
    industry: { heading: 'Pick the closest match.', body: 'If you\'re between two — pick where you spend most automation energy.', examples: [] },
    businessType: { heading: 'How big is the world this agent operates in?', body: 'This affects the complexity of systems and scale of automation we design.', examples: [] },
  },
  2: {
    default: {
      heading: 'What do you want this agent to do?',
      body: 'Think about your week. What takes hours but follows the same pattern every time? That\'s your target.',
      examples: [],
    },
    goalTrack: { heading: 'One primary goal. The agent builds toward it for 30 days.', body: 'You can only pick one — choose where you want the final project to land.', examples: [] },
    automationGoal: {
      heading: 'The task you\'d automate first.',
      body: 'The most painful, repeated thing in your week. The one you dread doing manually.',
      examples: [
        '"3 hours every Monday chasing overdue invoices by email"',
        '"Screening 50 CVs a week against a job spec — I want the top 5 surfaced"',
        '"Writing cover letters for roles I find — takes an hour each"',
        '"Reconciling bank transactions in Xero and explaining the unmatched ones"',
      ],
    },
    projectDescription: {
      heading: 'Describe your system clearly.',
      body: 'Name the software it connects to. Describe what runs automatically and what you approve before it acts. This becomes your Module 7 brief.',
      examples: [
        '"Connect Dentally PMS to Xero — auto-invoice when treatment completes, flag insurance claims over 30 days old"',
        '"Recruitment engine — takes a job brief, writes JD, screens CVs, sends shortlist to Telegram for my review"',
        '"Monthly management accounts — pull P&L from Xero, generate commentary, save as Word doc for my sign-off"',
      ],
    },
  },
  3: {
    default: {
      heading: 'What systems does your agent need to connect to?',
      body: 'Tick everything in your stack. Your MEMORY.md and Module 7 build will reference these specifically. If it\'s not in the list, add it in the text box.',
      examples: [],
    },
    successVision: {
      heading: 'What does "done" feel like?',
      body: 'Describe the specific moment when you know this was worth 30 days.',
      examples: [
        '"I wake up and Telegram has 3 new job matches, scored and with draft applications ready for my review"',
        '"My practice runs patient reminders without me. Xero reconciles overnight. I just see exceptions."',
        '"I paste a JD and 60 seconds later I have a company brief, skills match, and draft cover letter"',
      ],
    },
  },
  4: {
    default: {
      heading: 'This is the intelligence step.',
      body: 'Your OpenAI key is used for one generation call (~$0.002) to write your personalised MEMORY.md, your specific Module 7 project brief, and tailored examples for every module. The key is never stored.',
      examples: [],
    },
  },
  5: {
    default: {
      heading: 'Your course is ready.',
      body: 'Review what\'s been generated. Everything is editable — your MEMORY.md in Module 2, your project scope in Module 7. This is your starting point.',
      examples: [],
    },
  },
}

function TipsPanel({ step, activeField, profile }) {
  const stepTips = TIPS[step] || {}
  const tip = (activeField && stepTips[activeField]) || stepTips.default || TIPS[1].default
  const industryTemplate = profile.industry && INDUSTRY_TEMPLATES[profile.industry]

  return (
    <div className="ob-tips-col">
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

      {step >= 1 && industryTemplate && profile.industry !== 'other' && (
        <motion.div
          className="ob-tips-use-cases"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="ob-tips-use-cases-label">What {industryTemplate.label} teams automate:</div>
          {(industryTemplate.useCases || []).slice(0, 3).map((uc, i) => (
            <div key={i} className="ob-tips-use-case-item">→ {uc}</div>
          ))}
        </motion.div>
      )}
    </div>
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

// ─── Step 1: Who You Are ──────────────────────────────────────────────────────
function Step1({ form, onChange, onFocus }) {
  return (
    <div className="ob-step">
      <div className="ob-step-heading">
        <h2>Tell us about your world.</h2>
        <p>The more specific you are, the more your course adapts to what you actually do.</p>
      </div>
      <div className="ob-field">
        <label className="ob-label">Your name</label>
        <input className="ob-input" type="text" placeholder="e.g. Deekshita" value={form.name}
          onChange={e => onChange('name', e.target.value)} onFocus={() => onFocus('name')} />
      </div>
      <div className="ob-field">
        <label className="ob-label">What do you do? <span className="ob-label-hint">Your role, context, and what you deal with day-to-day</span></label>
        <textarea className="ob-textarea" rows={3}
          placeholder='"Dental practice owner — 4-chair clinic, patient scheduling, Xero invoicing, insurance claims"'
          value={form.role} onChange={e => onChange('role', e.target.value)} onFocus={() => onFocus('role')} />
      </div>
      <div className="ob-field">
        <label className="ob-label">Your industry</label>
        <div className="ob-pill-grid" onFocus={() => onFocus('industry')}>
          {INDUSTRY_OPTIONS.map(opt => (
            <button key={opt.id} type="button"
              className={`ob-pill ${form.industry === opt.id ? 'ob-pill--selected' : ''}`}
              onClick={() => onChange('industry', opt.id)}>
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
            <button key={bt.id} type="button"
              className={`ob-segment-btn ${form.businessType === bt.id ? 'ob-segment-btn--active' : ''}`}
              onClick={() => onChange('businessType', bt.id)}>
              <span className="ob-segment-label">{bt.label}</span>
              <span className="ob-segment-desc">{bt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Step 2: What to Build ────────────────────────────────────────────────────
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
            <button key={track.id} type="button"
              className={`ob-track-card ${form.goalTrack === track.id ? 'ob-track-card--selected' : ''}`}
              onClick={() => onChange('goalTrack', track.id)}>
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
        <label className="ob-label">The one thing you'd automate first <span className="ob-label-hint">— what repeated task takes the most of your time?</span></label>
        <textarea className="ob-textarea" rows={3}
          placeholder='"I spend 3 hours every Monday chasing overdue invoices by email. I want the agent to draft those for me."'
          value={form.automationGoal} onChange={e => onChange('automationGoal', e.target.value)} onFocus={() => onFocus('automationGoal')} />
      </div>
      {form.goalTrack === 'project' && (
        <motion.div className="ob-field" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
          <label className="ob-label">Describe your project <span className="ob-label-hint">— what connects to what, what runs automatically, what you approve</span></label>
          <textarea className="ob-textarea ob-textarea--large" rows={5}
            placeholder={'"Connect my Dentally PMS to Xero — when a treatment is completed, auto-generate an invoice. Flag insurance claims over 30 days old. I want to approve each invoice before it\'s sent."'}
            value={form.projectDescription} onChange={e => onChange('projectDescription', e.target.value)} onFocus={() => onFocus('projectDescription')} />
          <div className="ob-field-note">💡 Name the software. Describe the flow. This becomes your Module 7 project brief.</div>
        </motion.div>
      )}
    </div>
  )
}

// ─── Step 3: Tools ────────────────────────────────────────────────────────────
function Step3({ form, onChange, onFocus }) {
  const toggleTool = (id) => {
    const current = form.tools || []
    onChange('tools', current.includes(id) ? current.filter(t => t !== id) : [...current, id])
  }
  const grouped = COMMON_TOOLS.reduce((acc, t) => { (acc[t.category] = acc[t.category] || []).push(t); return acc }, {})
  const labels = { accounting: 'Accounting & Finance', crm: 'CRM & Sales', comms: 'Communication', productivity: 'Productivity', dev: 'Development', ecommerce: 'E-commerce', payments: 'Payments' }
  return (
    <div className="ob-step">
      <div className="ob-step-heading">
        <h2>What tools do you already use?</h2>
        <p>Tick everything in your stack. Your MEMORY.md and project build will reference these specifically.</p>
      </div>
      <div className="ob-field" onFocus={() => onFocus('default')}>
        {Object.entries(grouped).map(([cat, tools]) => (
          <div key={cat} className="ob-tool-group">
            <div className="ob-tool-group-label">{labels[cat] || cat}</div>
            <div className="ob-tool-chips">
              {tools.map(tool => (
                <button key={tool.id} type="button"
                  className={`ob-tool-chip ${(form.tools || []).includes(tool.id) ? 'ob-tool-chip--selected' : ''}`}
                  onClick={() => toggleTool(tool.id)}>{tool.label}</button>
              ))}
            </div>
          </div>
        ))}
        <div className="ob-tool-group">
          <div className="ob-tool-group-label">Other / Custom</div>
          <input className="ob-input" type="text" placeholder="e.g. Dentally, Practice Panther, Cin7, your in-house software..."
            value={form.customTool} onChange={e => onChange('customTool', e.target.value)} />
        </div>
      </div>
      <div className="ob-field">
        <label className="ob-label">What does success look like? <span className="ob-label-hint">— the moment you know this was worth 30 days</span></label>
        <textarea className="ob-textarea" rows={3}
          placeholder="&quot;I wake up and Telegram has already sent me today's priority exceptions, drafted invoice chasers, and queued 3 job applications. I just review and approve.&quot;"
          value={form.successVision} onChange={e => onChange('successVision', e.target.value)} onFocus={() => onFocus('successVision')} />
      </div>
    </div>
  )
}

// ─── Step 4: Generate ─────────────────────────────────────────────────────────
function Step4({ form, onGenerated, onSkip }) {
  const [apiKey, setApiKey] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'validating' | 'generating' | 'done' | 'error'
  const [error, setError] = useState('')
  const [currentStage, setCurrentStage] = useState(null)
  const [completedStages, setCompletedStages] = useState([])

  const handleGenerate = async () => {
    if (!apiKey.trim().startsWith('sk-')) {
      setError('API key should start with sk-. Get yours at platform.openai.com/api-keys')
      return
    }
    setError('')
    setStatus('validating')
    setCompletedStages([])

    try {
      // Animate through stages while generation runs
      let stageIndex = 0
      const advanceStage = () => {
        if (stageIndex < GENERATION_STAGES.length) {
          const stage = GENERATION_STAGES[stageIndex]
          setCurrentStage(stage.id)
          stageIndex++
          setTimeout(() => {
            setCompletedStages(prev => [...prev, stage.id])
            advanceStage()
          }, stage.duration)
        }
      }

      setStatus('generating')
      advanceStage()

      const generated = await generateWithLLM(apiKey.trim(), form, (stageId) => {
        setCurrentStage(stageId)
      })

      setStatus('done')
      setTimeout(() => onGenerated(generated), 600)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Try again.')
    }
  }

  return (
    <div className="ob-step">
      <div className="ob-step-heading">
        <h2>Generate your personalised course.</h2>
        <p>One API call writes your MEMORY.md, designs your Module 7 project, and tailors every module to your world.</p>
      </div>

      {status === 'idle' || status === 'error' ? (
        <>
          <div className="ob-generate-card">
            <div className="ob-generate-what">
              <div className="ob-generate-what-label">What gets generated:</div>
              {[
                'Your MEMORY.md — pre-filled with your role, tools, and context',
                'Your Module 7 project brief — specific to your actual software',
                'Tailored use cases for modules 3, 4, 5, 6',
                'A Day 1 message written for your specific situation',
              ].map((item, i) => (
                <div key={i} className="ob-generate-item">
                  <span className="ob-generate-item-dot">✦</span> {item}
                </div>
              ))}
            </div>
            <div className="ob-generate-cost">~$0.002 · one call · key never stored</div>
          </div>

          <div className="ob-field">
            <label className="ob-label">
              Your OpenAI API key
              <a className="ob-apikey-link" href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                Get yours →
              </a>
            </label>
            <input
              className={`ob-input ob-apikey-input ${error ? 'ob-input--error' : ''}`}
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={e => { setApiKey(e.target.value); setError('') }}
            />
            {error && <div className="ob-input-error">{error}</div>}
            <div className="ob-field-note">Used once for generation. Not stored anywhere. You'll add it to your .env in Module 0.</div>
          </div>

          <div className="ob-generate-actions">
            <motion.button
              className={`ob-next-btn ${!apiKey.trim() ? 'ob-next-btn--disabled' : ''}`}
              onClick={apiKey.trim() ? handleGenerate : undefined}
              whileHover={apiKey.trim() ? { scale: 1.02 } : {}}
              whileTap={apiKey.trim() ? { scale: 0.98 } : {}}
            >
              Generate my course →
            </motion.button>
            <button className="ob-skip-btn" onClick={onSkip}>
              Skip — use template content instead
            </button>
          </div>
        </>
      ) : (
        <div className="ob-generating">
          <div className="ob-generating-stages">
            {GENERATION_STAGES.map((stage) => {
              const isDone = completedStages.includes(stage.id)
              const isActive = currentStage === stage.id && !isDone
              return (
                <motion.div
                  key={stage.id}
                  className={`ob-gen-stage ${isDone ? 'ob-gen-stage--done' : ''} ${isActive ? 'ob-gen-stage--active' : ''}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: isDone || isActive ? 1 : 0.3, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="ob-gen-stage-icon">
                    {isDone ? '✓' : isActive ? <span className="ob-gen-spinner">◌</span> : '○'}
                  </span>
                  <span className="ob-gen-stage-label">{stage.label}</span>
                </motion.div>
              )
            })}
          </div>
          {status === 'done' && (
            <motion.div className="ob-gen-done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Course generated. Opening preview...
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Step 5: Preview ──────────────────────────────────────────────────────────
function Step5({ form, generatedContent }) {
  const courseData = (() => {
    try {
      const profileWithGen = { ...form, generatedContent }
      return generateCourseProfile(profileWithGen)
    } catch { return null }
  })()

  const template = INDUSTRY_TEMPLATES[form.industry] || INDUSTRY_TEMPLATES['tech-career']
  const isGenerated = Boolean(generatedContent)

  return (
    <div className="ob-step">
      <div className="ob-step-heading">
        <h2>Your course is personalised.</h2>
        <p>{isGenerated ? 'Generated from your profile. Review below — everything is editable in the course.' : 'Using template content. You can regenerate with an API key anytime.'}</p>
      </div>

      {isGenerated && (
        <div className="ob-preview-generated-badge">
          <span>✦</span> AI-generated from your profile
        </div>
      )}

      {courseData && (
        <>
          <div className="ob-preview-card">
            <div className="ob-preview-course-title" style={{ color: template.color }}>
              {courseData.courseTitle}
            </div>
            <div className="ob-preview-subtitle">{courseData.subtitle}</div>
            {isGenerated && courseData.whyThisMatters && (
              <div className="ob-preview-why">{courseData.whyThisMatters}</div>
            )}
          </div>

          <div className="ob-preview-section">
            <div className="ob-preview-section-label">Your Module 7 project</div>
            <div className="ob-preview-project">
              <div className="ob-preview-project-title">{courseData.module7.title}</div>
              <div className="ob-preview-project-desc">{courseData.module7.subtitle || courseData.module7.description}</div>
              {isGenerated && courseData.module7.keyIntegrations?.length > 0 && (
                <div className="ob-preview-integrations">
                  {courseData.module7.keyIntegrations.map((int, i) => (
                    <span key={i} className="ob-preview-integration-chip">{int}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ob-preview-section">
            <div className="ob-preview-section-label">Use cases you'll build toward</div>
            <div className="ob-preview-use-cases">
              {(courseData.useCases || []).slice(0, 5).map((uc, i) => (
                <div key={i} className="ob-preview-use-case">
                  <span className="ob-preview-use-case-dot" style={{ background: template.color }} />
                  {uc}
                </div>
              ))}
            </div>
          </div>

          {isGenerated && courseData.memoryMdDraft ? (
            <div className="ob-preview-section">
              <div className="ob-preview-section-label">Your MEMORY.md — ready to use</div>
              <div className="ob-preview-memory-draft">
                <div className="ob-preview-memory-draft-note">Pre-filled with your context. Copy this into OpenClaw in Module 2 — just review and top up.</div>
                <pre className="ob-preview-memory-draft-content">{courseData.memoryMdDraft.slice(0, 400)}...</pre>
              </div>
            </div>
          ) : (
            <div className="ob-preview-section">
              <div className="ob-preview-section-label">Your MEMORY.md will cover</div>
              <div className="ob-preview-memory">
                {(courseData.memoryMdGuide?.sections || []).map((s, i) => (
                  <div key={i} className="ob-preview-memory-section">✦ {s}</div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="ob-preview-note">
        Modules 0–2 are universal foundations — environment, OpenClaw, first agent. Modules 3–8 are built around your specific domain and project.
      </div>
    </div>
  )
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────
export default function Onboarding() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { saveProfile } = useUserProfile()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(() => {
    // Pre-fill from ?for=<preset> query param if present
    const presetKey = searchParams.get('for')
    const preset = presetKey && PRESETS[presetKey.toLowerCase()]
    return preset ? { ...EMPTY_PROFILE, ...preset } : { ...EMPTY_PROFILE }
  })
  const [activeField, setActiveField] = useState(null)
  const [generatedContent, setGeneratedContent] = useState(null)
  const isPreset = Boolean(searchParams.get('for') && PRESETS[searchParams.get('for')?.toLowerCase()])

  const onChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const onFocus = (field) => setActiveField(field)

  const canProceed = () => {
    if (step === 1) return form.name.trim() && form.role.trim() && form.industry && form.businessType
    if (step === 2) return form.goalTrack && form.automationGoal.trim()
    return true
  }

  const handleNext = () => {
    if (step === 0) { setStep(1); return }
    if (step < TOTAL_STEPS) { setStep(s => s + 1); setActiveField(null); return }
    // Final submit
    saveProfile(form, generatedContent)
    navigate('/')
  }

  const handleBack = () => {
    if (step <= 1) { setStep(0); return }
    setStep(s => s - 1)
    setActiveField(null)
  }

  const handleGenerated = (content) => {
    setGeneratedContent(content)
    setStep(5) // advance to preview
  }

  const handleSkipGeneration = () => {
    setGeneratedContent(null)
    setStep(5)
  }

  // ── Landing ───────────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="ob-landing">
        <div className="ob-landing-bg" />
        <motion.div className="ob-landing-content"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>

          <div className="ob-landing-eyebrow">Agentic AI · 30-Day Build Programme</div>
          {isPreset ? (
            <>
              <h1 className="ob-landing-title">
                Hey {form.name}. Your course<br />is waiting.
              </h1>
              <p className="ob-landing-desc">
                Your profile is pre-filled. Review it in the next step, adjust anything that's off, then generate your personalised course — your MEMORY.md, your project brief, your tailored examples.
              </p>
            </>
          ) : (
            <h1 className="ob-landing-title">Build your personal AI.<br />Tailored to your world.</h1>
          )}
          {!isPreset && (
            <p className="ob-landing-desc">
              This isn't a generic AI course. Answer a few questions about your industry, your tools, and what you want to automate — and the course adapts: the examples, the projects, your MEMORY.md, and your final 30-day build.
            </p>
          )}

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
            <div className="ob-promise-item"><span className="ob-promise-num">9</span><span className="ob-promise-label">modules</span></div>
            <div className="ob-promise-item"><span className="ob-promise-num">30</span><span className="ob-promise-label">days</span></div>
            <div className="ob-promise-item"><span className="ob-promise-num">1</span><span className="ob-promise-label">working system built for your world</span></div>
          </div>

          <motion.button className="ob-landing-cta" onClick={handleNext}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {isPreset ? `Review my profile →` : 'Build my custom course →'}
          </motion.button>
          <p className="ob-landing-note">
            {isPreset ? 'Takes 2 minutes to review. Then generate your course.' : '5 minutes to set up. 30 days to transform how you work.'}
          </p>
        </motion.div>
      </div>
    )
  }

  // ── Form steps ────────────────────────────────────────────────────────────
  const showTipsPanel = step >= 1 && step <= 3

  return (
    <div className="ob-page">
      <div className="ob-page-bg" />
      <div className={`ob-layout ${!showTipsPanel ? 'ob-layout--single' : ''}`}>

        <div className="ob-form-col">
          <div className="ob-form-header">
            <button className="ob-back-btn" onClick={handleBack}>← Back</button>
            <ProgressBar step={step} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {step === 1 && <Step1 form={form} onChange={onChange} onFocus={onFocus} />}
              {step === 2 && <Step2 form={form} onChange={onChange} onFocus={onFocus} />}
              {step === 3 && <Step3 form={form} onChange={onChange} onFocus={onFocus} />}
              {step === 4 && <Step4 form={form} onGenerated={handleGenerated} onSkip={handleSkipGeneration} />}
              {step === 5 && <Step5 form={form} generatedContent={generatedContent} />}
            </motion.div>
          </AnimatePresence>

          {/* Show next button for steps 1-3 and 5 (not 4 — it has its own CTA) */}
          {step !== 4 && (
            <div className="ob-form-footer">
              <motion.button
                className={`ob-next-btn ${!canProceed() ? 'ob-next-btn--disabled' : ''}`}
                onClick={canProceed() ? handleNext : undefined}
                whileHover={canProceed() ? { scale: 1.02 } : {}}
                whileTap={canProceed() ? { scale: 0.98 } : {}}>
                {step === TOTAL_STEPS ? 'Start my course →' : 'Continue →'}
              </motion.button>
              {!canProceed() && step < TOTAL_STEPS && (
                <p className="ob-required-note">Fill in the required fields above to continue.</p>
              )}
            </div>
          )}
        </div>

        {showTipsPanel && (
          <TipsPanel step={step} activeField={activeField} profile={form} />
        )}
      </div>
    </div>
  )
}
