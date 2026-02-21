import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { xpMessages } from '../data/wisdom'

export default function Checkpoint({ item, isDone, onToggle }) {
  const [showXP, setShowXP] = useState(false)
  const [xpMsg] = useState(() => xpMessages[Math.floor(Math.random() * xpMessages.length)])

  const handleClick = () => {
    const result = onToggle(item.id)
    if (result?.wasCompleted) {
      setShowXP(true)
      setTimeout(() => setShowXP(false), 2000)
    }
  }

  return (
    <motion.div
      className={`checkpoint ${isDone ? 'checkpoint--done' : ''}`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button className="checkpoint-btn" onClick={handleClick} aria-checked={isDone} role="checkbox">
        <span className="checkpoint-box">
          <AnimatePresence>
            {isDone && (
              <motion.svg
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                width="12" height="12" viewBox="0 0 12 12" fill="none"
              >
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
        <span className="checkpoint-text">{item.text}</span>
      </button>

      <AnimatePresence>
        {showXP && (
          <motion.div
            className="checkpoint-xp-toast"
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -28, scale: 1 }}
            exit={{ opacity: 0, y: -48, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            +20 XP
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
