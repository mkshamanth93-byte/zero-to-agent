import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MODULES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import Checkpoint from '../components/Checkpoint'
import CursorPrompt from '../components/CursorPrompt'
import Diagram from '../components/Diagram'
import CalloutCard from '../components/CalloutCard'
import MilestonePopup from '../components/MilestonePopup'

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

export default function ModulePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const mod = MODULES.find(m => m.slug === slug)
  const { toggleCheckpoint, isCheckpointDone, isModuleDone, completeModule, getModuleProgress } = useProgress()
  const [showMilestone, setShowMilestone] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!mod) return <div className="module-not-found">Module not found. <Link to="/">← Back</Link></div>

  const checkpointSection = mod.sections.find(s => s.type === 'checkpoint')
  const allCheckpointsDone = checkpointSection?.items.every(item => isCheckpointDone(item.id))
  const progress = getModuleProgress(checkpointSection?.items || [])
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
            <h1 className="module-header-title">{mod.title}</h1>
          </div>
          <p className="module-header-subtitle">{mod.subtitle}</p>

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
          {mod.sections.map((section, i) => {
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
            if (section.type === 'checkpoint') {
              return (
                <div key={i} className="module-checkpoint-section">
                  <div className="checkpoint-section-header">
                    <h3 className="checkpoint-section-title">Module Checkpoints</h3>
                    <span className="checkpoint-section-sub">
                      Complete all before marking the module done
                    </span>
                  </div>
                  <div className="checkpoint-list">
                    {section.items.map(item => (
                      <Checkpoint
                        key={item.id}
                        item={item}
                        isDone={isCheckpointDone(item.id)}
                        onToggle={toggleCheckpoint}
                      />
                    ))}
                  </div>
                  {allCheckpointsDone && !alreadyDone && (
                    <motion.div
                      className="all-done-banner"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <span>🎉 All checkpoints complete!</span>
                      <button className="complete-module-btn" onClick={handleComplete}>
                        Complete Module {mod.id} →
                      </button>
                    </motion.div>
                  )}
                  {alreadyDone && (
                    <div className="module-already-done">
                      ✓ Module {mod.id} complete · {mod.xp} XP earned
                    </div>
                  )}
                </div>
              )
            }
            return null
          })}
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
