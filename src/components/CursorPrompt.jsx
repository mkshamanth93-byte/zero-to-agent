import { useState } from 'react'
import { motion } from 'framer-motion'

const MODE_CONFIG = {
  agent: {
    label: 'Cursor Agent',
    shortcut: 'Cmd+I',
    badge: 'AGENT',
    instruction: 'Open Cursor Agent',
    color: '#6366f1',
    desc: 'Multi-file builds, creating code, implementing features',
    steps: [
      { key: 'Cmd+I', action: 'Open Agent panel' },
      { key: 'Agent ▾', action: 'Make sure "Agent" is selected in the dropdown (not "Ask" or "Edit")' },
      { key: 'Copy prompt →', action: 'Paste the prompt below and hit Enter' },
    ],
  },
  chat: {
    label: 'Cursor Chat',
    shortcut: 'Cmd+L',
    badge: 'CHAT',
    instruction: 'Open Cursor Chat',
    color: '#06b6d4',
    desc: 'Asking questions, understanding errors, quick explanations',
    steps: [
      { key: 'Cmd+L', action: 'Open Chat panel' },
      { key: 'Copy prompt →', action: 'Paste the prompt below and hit Enter' },
    ],
  },
}

export default function CursorPrompt({ section }) {
  const [copied, setCopied] = useState(false)
  const mode = MODE_CONFIG[section.mode || 'agent']

  const handleCopy = () => {
    navigator.clipboard.writeText(section.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className={`cursor-prompt cursor-prompt--${section.mode || 'agent'}`}
      style={{ '--prompt-color': mode.color }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="cursor-prompt-header">
        <div className="cursor-prompt-label-row">
          <span className="cursor-prompt-mode-badge" style={{ background: `${mode.color}22`, border: `1px solid ${mode.color}55`, color: mode.color }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 4 }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            {mode.badge}
          </span>
          <kbd className="cursor-shortcut-key">{mode.shortcut}</kbd>
          <span className="cursor-prompt-label">{section.label}</span>
        </div>
        <button className="cursor-prompt-copy" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy prompt'}
        </button>
      </div>

      {section.description && (
        <p className="cursor-prompt-desc">{section.description}</p>
      )}

      <div className="cursor-prompt-how-to">
        {mode.steps.map((s, i) => (
          <div key={i} className="cursor-how-step">
            <kbd className="cursor-how-key">{s.key}</kbd>
            <span className="cursor-how-action">{s.action}</span>
          </div>
        ))}
      </div>

      <div className="cursor-prompt-body">
        <div className="cursor-prompt-text">
          {section.prompt}
        </div>
      </div>

      <div className="cursor-prompt-footer">
        After Cursor generates the code — <strong>read it before running it.</strong> Use <kbd>Cmd+L</kbd> to ask follow-up questions about anything you don't understand.
      </div>
    </motion.div>
  )
}
