import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorPrompt({ section }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(section.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="cursor-prompt"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="cursor-prompt-header">
        <div className="cursor-prompt-label-row">
          <span className="cursor-prompt-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </span>
          <span className="cursor-prompt-badge">Cursor Prompt</span>
          <span className="cursor-prompt-label">{section.label}</span>
        </div>
        <button className="cursor-prompt-copy" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy prompt'}
        </button>
      </div>

      {section.description && (
        <p className="cursor-prompt-desc">{section.description}</p>
      )}

      <div className="cursor-prompt-body">
        <div className="cursor-prompt-instruction">
          Press <kbd>Cmd+L</kbd> in Cursor to open the AI chat panel, then paste:
        </div>
        <div className="cursor-prompt-text">
          {section.prompt}
        </div>
      </div>

      <div className="cursor-prompt-footer">
        After Cursor generates the code — <strong>read it before running it.</strong> Ask follow-up questions about anything you don't understand.
      </div>
    </motion.div>
  )
}
