import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MODULES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import { useUserProfile } from '../hooks/useUserProfile'
import Checkpoint from '../components/Checkpoint'
import CursorPrompt from '../components/CursorPrompt'
import Diagram from '../components/Diagram'
import CalloutCard from '../components/CalloutCard'
import MilestonePopup from '../components/MilestonePopup'
import { buildDomainContent } from '../utils/buildDomainContent'
import { INDUSTRY_TEMPLATES } from '../data/industryTemplates'

function renderMarkdown(text) {
  if (!text) return null
  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="module-h2">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="module-h3">{line.slice(4)}</h3>)
    } else if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'text'
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <SyntaxHighlighter key={i} language={lang} style={vscDarkPlus} className="module-code-block">
          {codeLines.join('\n')}
        </SyntaxHighlighter>
      )
    } else if (line.startsWith('| ')) {
      const tableLines = []
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      elements.push(
        <div key={i} className="module-table-wrapper">
          <table className="module-table">
            {tableLines.map((row, ri) => {
              if (row.includes('---')) return null
              const cells = row.split('|').filter(Boolean).map(c => c.trim())
              const Tag = ri === 0 ? 'th' : 'td'
              return (
                <tr key={ri}>
                  {cells.map((cell, ci) => <Tag key={ci}>{formatInline(cell)}</Tag>)}
                </tr>
              )
            })}
          </table>
        </div>
      )
      continue
    } else if (line.match(/^\d+\.\s/)) {
      const items = []
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(<ol key={i} className="module-ol">{items.map((it, j) => <li key={j}>{formatInline(it)}</li>)}</ol>)
      continue
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(<ul key={i} className="module-ul">{items.map((it, j) => <li key={j}>{formatInline(it)}</li>)}</ul>)
      continue
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      elements.push(<p key={i} className="module-p">{formatInline(line)}</p>)
    }
    i++
  }

  return <>{elements}</>
}

function formatInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="inline-code">{part.slice(1, -1)}</code>
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    return part
  })
}

function StepBlock({ section }) {
  const isBash = section.code?.language === 'bash'
  return (
    <motion.div className="step-block"
      initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="step-block-header">
        <span className="step-block-num">Step {section.number}</span>
        <span className="step-block-title">{section.title}</span>
        {isBash && (
          <span className="step-terminal-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}>
              <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
            Cursor Terminal
            <kbd>Ctrl+`</kbd>
          </span>
        )}
      </div>
      {section.code && (
        <SyntaxHighlighter language={section.code.language} style={vscDarkPlus} className="step-code">
          {section.code.content}
        </SyntaxHighlighter>
      )}
    </motion.div>
  )
}

// ─── Domain Brief ─────────────────────────────────────────────────────────────
function DomainBrief({ domain, mod, profile, isCheckpointDone, toggleCheckpoint }) {
  const template = INDUSTRY_TEMPLATES[profile?.industry] || {}
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className="domain-brief"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="domain-brief-header" style={{ borderColor: mod.color }}>
        <div className="domain-brief-eyebrow" style={{ color: mod.color }}>
          <span>✦</span> Your personalised build
        </div>
        <h2 className="domain-brief-title">{domain.title}</h2>
        <p className="domain-brief-brief">{domain.brief}</p>

        {/* Key integrations (Module 7) */}
        {domain.keyIntegrations?.length > 0 && (
          <div className="domain-brief-integrations">
            <div className="domain-brief-int-label">Connects to:</div>
            {domain.keyIntegrations.map((int, i) => (
              <span key={i} className="domain-brief-int-chip" style={{ borderColor: mod.color + '40', color: mod.color }}>{int}</span>
            ))}
          </div>
        )}

        {/* Human approval points (Module 7) */}
        {domain.humanApprovalPoints?.length > 0 && (
          <div className="domain-brief-approvals">
            <div className="domain-brief-approval-label">⚑ Your approval required at:</div>
            {domain.humanApprovalPoints.map((pt, i) => (
              <div key={i} className="domain-brief-approval-item">{pt}</div>
            ))}
          </div>
        )}
      </div>

      {/* Domain Cursor Prompts */}
      {domain.cursorPrompts?.length > 0 && (
        <div className="domain-brief-prompts">
          <div className="domain-brief-prompts-label">Your Cursor prompts for this module:</div>
          {domain.cursorPrompts.map((cp, i) => (
            <CursorPrompt key={i} section={{ ...cp, type: 'cursor-prompt', mode: cp.mode || 'agent' }} />
          ))}
        </div>
      )}

      {/* Domain Checkpoints */}
      {domain.checkpoints?.length > 0 && (
        <div className="domain-brief-checkpoints">
          <div className="domain-brief-checkpoints-label">Your module checkpoints:</div>
          {domain.checkpoints.map(item => (
            <Checkpoint
              key={item.id}
              item={item}
              isDone={isCheckpointDone(item.id)}
              onToggle={toggleCheckpoint}
            />
          ))}
        </div>
      )}

      {/* Divider before universal content */}
      <div className="domain-brief-divider">
        <button className="domain-brief-toggle" onClick={() => setExpanded(e => !e)}>
          {expanded ? '▲ Hide' : '▼ Show'} the framework — how this technique works universally
        </button>
      </div>
    </motion.div>
  )
}

export default function ModulePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const mod = MODULES.find(m => m.slug === slug)
  const { toggleCheckpoint, isCheckpointDone, isModuleDone, completeModule, getModuleProgress } = useProgress()
  const { profile } = useUserProfile()
  const [showMilestone, setShowMilestone] = useState(false)
  const [showUniversal, setShowUniversal] = useState(false)

  // Build domain content for modules 3–8
  const isDomainModule = mod && mod.id >= 3 && mod.id <= 8
  const domainContent = isDomainModule && profile
    ? (() => { try { return buildDomainContent(mod.id, profile, profile.generatedContent) } catch { return null } })()
    : null

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!mod) return <div className="module-not-found">Module not found. <Link to="/">← Back</Link></div>

  const checkpointSection = mod.sections.find(s => s.type === 'checkpoint')
  const progressItems = domainContent?.checkpoints || checkpointSection?.items || []
  const progress = getModuleProgress(progressItems)
  const alreadyDone = isModuleDone(mod.id)

  const prevMod = MODULES[mod.id - 1]
  const nextMod = MODULES[mod.id + 1]

  const handleComplete = () => {
    const isNew = completeModule(mod.id, mod.xp)
    if (isNew) setShowMilestone(true)
  }

  return (
    <div className="module-page">
      {/* Top nav */}
      <div className="module-topbar">
        <button className="module-back" onClick={() => navigate('/')}>← Dashboard</button>
        <div className="module-topbar-progress">
          <div className="module-topbar-fill" style={{ width: `${alreadyDone ? 100 : progress}%`, background: mod.color }} />
        </div>
        <span className="module-topbar-pct">{alreadyDone ? '100' : progress}%</span>
      </div>

      {/* Module header */}
      <div className="module-header" style={{ '--mod-color': mod.color }}>
        <div className="module-header-glow" style={{ background: mod.color }} />
        <div className="module-header-content">
          <div className="module-header-meta">
            <span className="module-header-num">Module {mod.id}</span>
            <span className="module-header-days">Days {mod.days}</span>
            <span className="module-header-xp">+{mod.xp} XP</span>
          </div>
          <div className="module-header-title-row">
            <span className="module-header-emoji">{mod.emoji}</span>
            <h1 className="module-header-title">{domainContent?.title || mod.title}</h1>
          </div>
          <p className="module-header-subtitle">{domainContent?.outcome || mod.subtitle}</p>

          <div className="module-outcomes">
            <div className="module-outcomes-label">After this module you will:</div>
            {mod.outcomes.map((o, i) => (
              <motion.div key={i} className="module-outcome"
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                <span className="outcome-check">✓</span> {o}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="module-content">
        <div className="module-content-main">

          {/* ── Domain layer: personalised content for modules 3–8 ── */}
          {domainContent && (
            <DomainBrief
              domain={domainContent}
              mod={mod}
              profile={profile}
              isCheckpointDone={isCheckpointDone}
              toggleCheckpoint={toggleCheckpoint}
            />
          )}

          {/* ── Universal methodology content ── */}
          {/* Wrapped in a collapsible section when domain content exists */}
          {domainContent && (
            <div className="universal-content-toggle">
              <button
                className="universal-toggle-btn"
                onClick={() => setShowUniversal(v => !v)}
              >
                {showUniversal ? '▲ Hide' : '▼ Show'} the underlying framework — how this technique works
              </button>
            </div>
          )}

          <AnimatePresence>
            {(!domainContent || showUniversal) && (
              <motion.div
                initial={domainContent ? { opacity: 0, height: 0 } : false}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
              >
                {mod.sections.map((section, i) => {
                  // When domain content exists, skip cursor-prompts and domain checkpoints from static content
                  if (domainContent && section.type === 'cursor-prompt') return null
                  if (domainContent && section.type === 'checkpoint') return null

                  if (section.type === 'text') {
                    return (
                      <motion.div key={i} className="module-text-section"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        {renderMarkdown(section.markdown)}
                      </motion.div>
                    )
                  }
                  if (section.type === 'callout') return <CalloutCard key={i} section={section} />
                  if (section.type === 'cursor-prompt') return <CursorPrompt key={i} section={section} />
                  if (section.type === 'diagram') return <Diagram key={i} id={section.id} />
                  if (section.type === 'step') return <StepBlock key={i} section={section} />
                  if (section.type === 'code') {
                    return (
                      <SyntaxHighlighter key={i} language={section.language} style={vscDarkPlus} className="module-code-block">
                        {section.code}
                      </SyntaxHighlighter>
                    )
                  }
                  return null
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Module completion checkpoints (always shown, uses domain if available) ── */}
          {(() => {
            const checkpointSection = mod.sections.find(s => s.type === 'checkpoint')
            if (!checkpointSection && !domainContent?.checkpoints) return null

            const items = domainContent?.checkpoints || checkpointSection?.items || []
            const allDone = items.every(item => isCheckpointDone(item.id))

            return (
              <div className="module-checkpoint-section">
                <div className="checkpoint-section-header">
                  <h3 className="checkpoint-section-title">Module Checkpoints</h3>
                  <span className="checkpoint-section-sub">Complete all before marking the module done</span>
                </div>
                <div className="checkpoint-list">
                  {items.map(item => (
                    <Checkpoint
                      key={item.id}
                      item={item}
                      isDone={isCheckpointDone(item.id)}
                      onToggle={toggleCheckpoint}
                    />
                  ))}
                </div>
                {allDone && !alreadyDone && (
                  <motion.div className="all-done-banner" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <span>🎉 All checkpoints complete!</span>
                    <button className="complete-module-btn" onClick={handleComplete}>
                      Complete Module {mod.id} →
                    </button>
                  </motion.div>
                )}
                {alreadyDone && (
                  <div className="module-already-done">✓ Module {mod.id} complete · {mod.xp} XP earned</div>
                )}
              </div>
            )
          })()}
        </div>
      </div>

      {/* Navigation */}
      <div className="module-navigation">
        {prevMod ? (
          <button className="module-nav-btn module-nav-prev" onClick={() => navigate(`/module/${prevMod.slug}`)}>
            ← Module {prevMod.id}: {prevMod.title}
          </button>
        ) : <div />}
        {nextMod ? (
          <button className="module-nav-btn module-nav-next" onClick={() => navigate(`/module/${nextMod.slug}`)}>
            Module {nextMod.id}: {nextMod.title} →
          </button>
        ) : (
          <button className="module-nav-btn module-nav-next" onClick={() => navigate('/completion')}>
            🎓 View Certificate →
          </button>
        )}
      </div>

      <AnimatePresence>
        {showMilestone && (
          <MilestonePopup
            moduleId={mod.id}
            moduleTitle={mod.title}
            moduleEmoji={mod.emoji}
            onClose={() => {
              setShowMilestone(false)
              if (nextMod) navigate(`/module/${nextMod.slug}`)
              else navigate('/completion')
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
